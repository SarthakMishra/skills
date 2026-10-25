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
