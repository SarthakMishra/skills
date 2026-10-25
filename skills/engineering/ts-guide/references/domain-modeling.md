# Domain modeling and boundaries

Start with the invalid combination the model must prevent. Strengthen the shape
only where the current shape forces checks, casts, or ambiguous behavior.
Examples are independent runnable type-check fixtures for TS 4.9+ with `strict`
unless a section states otherwise; negative cases use `@ts-expect-error`.

## Make variants carry their own data

Use a discriminated union when fields depend on a mode. Narrow the whole value
before reading dependent fields. Keep independent flags as booleans.

```ts
// Bad: success can exist without data, or with an unrelated error.
type LooseResult<T> = { ok: boolean; data?: T; error?: Error };
const invalid: LooseResult<string> = { ok: true };

// Good: each branch carries exactly the evidence its consumer needs.
type Result<T> = { ok: true; data: T } | { ok: false; error: Error };
// @ts-expect-error A successful result requires data.
const rejected: Result<string> = { ok: true };

function describe(result: Result<string>): string {
  switch (result.ok) {
    case true:
      return result.data;
    case false:
      return result.error.message;
    default: {
      const unreachable: never = result;
      return unreachable;
    }
  }
}
```

The `never` check exposes unhandled variants when the union changes. It does not
validate a network response. Parse that response before treating it as a union.
For mutually exclusive object options, `other?: never` can forbid the other
property; rejecting explicit `other: undefined` requires
`exactOptionalPropertyTypes`.

## Model stages by the evidence they establish

Use distinct input and output types when a stage establishes an invariant the
next stage requires. Prefer concrete discriminated states to a generic builder
or pipeline framework. Different alias names alone do not distinguish identical
structures; an unused phantom type parameter does not distinguish them either.

```ts
// Bad: renaming the same shape cannot enforce stage order.
type Raw = { text: string };
type Checked = { text: string };
const raw: Raw = { text: '' };
const skipped: Checked = raw;

// Good: validation constructs the state consumed by the next operation.
type Draft = { readonly stage: 'draft'; readonly text: string };
type Validated = { readonly stage: 'validated'; readonly text: string };
type Validation =
  | { ok: true; value: Validated }
  | { ok: false; error: 'EMPTY' };

function validate(draft: Draft): Validation {
  const text = draft.text.trim();
  return text.length === 0
    ? { ok: false, error: 'EMPTY' }
    : { ok: true, value: { stage: 'validated', text } };
}
function render(value: Validated): string {
  return value.text;
}
const draft: Draft = { stage: 'draft', text: 'Hello' };
const checked = validate(draft);
if (checked.ok) render(checked.value);
// @ts-expect-error A draft has not passed validation.
render(draft);
```

A public structural state can still be fabricated. Use the owning module's
validated constructor and a private brand when construction provenance matters.
Brands add static distinction, not runtime assurance. Revalidate untrusted or
deserialized input. Preserve validated facts by copying mutable input or otherwise
controlling mutation; a readonly view alone does not protect against aliases.

Typestate does not consume the old reference or prevent calling a transition
twice. Check persisted state atomically when correctness depends on current
state; types do not establish authorization, transactions, or exactly-once effects.
Test both rejected stage order and runtime validation failures. Only introduce a
generic pipeline when real callers need it, preserving each stage's output and
failure union instead of hiding mismatches with assertions.

## Distinguish expected failures from thrown exceptions

Use a discriminated result for expected failures callers must handle; reuse the
project's result convention. Keep error variants specific enough for exhaustive
handling. A `Promise<Result<T, E>>` describes fulfilled values, not every possible
rejection. TypeScript does not check thrown exception types.

Bad: catch every database error and return `NOT_FOUND`, hiding outages and bugs.
Good: return `NOT_FOUND` for an actual missing record; map known provider failures
at the adapter and preserve unexpected failures through the established error
path. Test an expected failure and an unexpected rejection separately. Do not
convert every exception into a result merely to make the signature look total.

## Construct the invariant you consume

Use tuples when position or minimum length matters. Accept readonly inputs when
the operation does not mutate them. A non-empty tuple protects reads only while
the actual array remains non-empty; mutable aliases can invalidate that claim.

```ts
// Bad: a cast hides the empty-input case.
function unsafeHead<T>(values: readonly T[]): T {
  return values[0] as T;
}

// Good: this operation requires a first element.
function head<T>(values: readonly [T, ...T[]]): T {
  return values[0];
}
const first: number = head([1, 2]);
// @ts-expect-error Empty input cannot satisfy the contract.
head([]);
```

Keep an ordinary array and return `T | undefined` if empty input is valid.
Validate or construct a non-empty tuple when converting dynamic input; an
assertion alone does not establish length. `readonly` restricts writes through
that reference, not through other aliases, and is not a deep runtime freeze.

## Brand only meaningful identities or validated facts

Introduce a brand when structurally identical primitives must not be exchanged.
Keep the symbol and constructor in the owning module; export the type and parser.
Revalidate after deserialization. A brand disappears at runtime and does not
prove facts such as authorization or database existence.

```ts
// Bad: these aliases cannot prevent swapping identifiers.
type LooseUserId = string;
type LooseOrderId = string;
const swapped: LooseUserId = 'order_12' as LooseOrderId;

// Good: the constructor owns both the validation and the assertion.
declare const userIdBrand: unique symbol;
type UserId = string & { readonly [userIdBrand]: true };

function parseUserId(value: unknown): UserId {
  if (typeof value !== 'string' || !/^user_[0-9]+$/.test(value)) {
    throw new Error('Invalid user ID');
  }
  return value as UserId;
}

const id: UserId = parseUserId('user_12');
// @ts-expect-error Unvalidated strings are not user IDs.
const unchecked: UserId = 'user_12';
```

Reuse a schema library already in the project for structured input and derive
its output type. If it transforms or defaults values, distinguish its input
type from its parsed output type. Test the brand constructor or schema with
valid input, malformed input, and the wrong primitive type.

## Keep absence distinct from explicit values

For patch contracts, decide what omitted, `undefined`, and `null` each do before
using `Partial<T>`. With `exactOptionalPropertyTypes`, `x?: string` permits
omission but rejects explicitly assigning `undefined`; reads can still be
undefined. It does not make the runtime parser enforce that rule.

Runnable with `strict` and `exactOptionalPropertyTypes`:

```ts
// Bad for a patch where null means clear: undefined has no defined meaning.
type LoosePatch = { name?: string | undefined };
const ambiguous: LoosePatch = { name: undefined };

// Good: omitted means keep, null means clear, string means replace.
type Patch = { name?: string | null };
const keep: Patch = {};
const clear: Patch = { name: null };
// @ts-expect-error The patch protocol does not accept explicit undefined.
const rejected: Patch = { name: undefined };
```

Without that flag, use an explicit operation union if the distinction must be
enforced statically. Finish by checking the parser and update behavior for each
operation; static optionality cannot establish serialization semantics.

## Let simple checks infer their predicates

On TS 5.5+, prefer an inferred predicate for a simple refinement. Check the
inferred result at its consumer; annotating the return as `boolean` prevents
predicate inference. On older supported compilers, use a tested explicit
predicate when narrowing is required.

Independent runnable type-check fixture, TS 5.5+, `strict`:

```ts
const values: (number | undefined)[] = [0, 1, undefined];
// Bad: truthiness drops a valid zero and does not establish number[].
const loose = values.filter((value) => !!value);
// @ts-expect-error Truthiness cannot exclude only undefined.
const stillOptional: number[] = loose;

// Good: remove precisely the absent value and retain zero.
const present = values.filter((value) => value !== undefined);
const numbers: number[] = present;
// @ts-expect-error The result no longer accepts undefined.
present.push(undefined);
```

An explicit `value is T` promises both that true establishes T and that false
excludes T. Test both branches: a check for positive numbers must not claim
`value is number`, since zero and negative numbers also fail. Use a boolean for
that policy check or return a validated value instead. Explicit predicates are
not verified against their implementations.
