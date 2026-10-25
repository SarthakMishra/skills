# Type transformations

Start from the consumer's required result. Reuse built-in utilities before
creating a new transformation. Name a custom type after the relationship it
expresses, and test its supported input domain.
Examples are independent runnable type-check fixtures for TS 4.9+ with `strict`.

## Decide whether to transform each union member

A conditional whose checked side is a naked type parameter distributes over
unions. Wrap both sides in tuples when the decision is about the union as a
whole. Treat `never` deliberately: distributive evaluation over it has no members.

```ts
// Bad for an all-members check: this answers once per union member.
type LooseAllStrings<T> = T extends string ? true : false;
const ambiguous: LooseAllStrings<string | number> = true;

// Good: mixed unions fail as a whole; this contract rejects never too.
type AllStrings<T> = [T] extends [never] ? false : [T] extends [string] ? true : false;
const mixed: AllStrings<string | number> = false;
const empty: AllStrings<never> = false;
// @ts-expect-error Not every union member is a string.
const rejected: AllStrings<string | number> = true;
```

When transforming a discriminated union, distribution may be exactly what is
needed. Built-in `Pick` and `Omit` do not automatically preserve each member's
variant-specific fields.

```ts
type Message =
  | { kind: 'text'; body: string; internal: number }
  | { kind: 'image'; url: string; internal: number };

// Bad: only the shared surface survives.
type LoosePublic = Omit<Message, 'internal'>;
const missingData: LoosePublic = { kind: 'text' };

// Good: remove internal from each member separately.
type PublicMember<T> = T extends unknown ? Omit<T, 'internal'> : never;
type PublicMessage = PublicMember<Message>;
const text: PublicMessage = { kind: 'text', body: 'Hello' };
// @ts-expect-error The text variant still requires its body.
const rejected: PublicMessage = { kind: 'text' };
```

Use `infer` to extract information rather than redeclaring it. Match readonly
tuples when readonly input is supported, for example
`T extends readonly [infer H, ...unknown[]] ? H : never`. Define the fallback
for ordinary arrays and empty tuples explicitly; do not silently promise that
every array has a head. Use built-in `Awaited<T>` for promise unwrapping.

## Preserve key and value correlation in mapped types

Index by the current key `T[K]` inside the mapping. Use key remapping and
template literals for bounded vocabularies, not unbounded string parsing.
State how number and symbol keys are treated.

```ts
type Model = { title: string; count: number };

// Bad: every handler accepts the union of all values.
type LooseChanges<T> = {
  [K in keyof T as `${K & string}Changed`]: (value: T[keyof T]) => void;
};

// Good: each string-keyed handler receives its own property's value.
type Changes<T> = {
  [K in keyof T as `${K & string}Changed`]: (value: T[K]) => void;
};
const handlers: Changes<Model> = {
  titleChanged: (value) => {
    value.toUpperCase();
  },
  countChanged: (value) => {
    value.toFixed();
  },
};
handlers.countChanged(1);
// @ts-expect-error countChanged accepts numbers only.
handlers.countChanged('1');
```

This mapping drops number and symbol keys. Test those keys if callers can supply
them. Decide whether optional and readonly modifiers should survive or be
removed with `-?` or `-readonly`; an optional source property can otherwise
produce an optional handler whose value type includes `undefined`.

## Define the domain before recursing

Avoid a universal `DeepPartial<T>` or path generator until its consumers require
it. Functions, arrays, tuples, maps, dates, unions, and recursive objects need
different semantics. Treat supported built-ins as leaves or handle them
explicitly. Bound recursion for recursive models and document the cutoff result.

Bad for an update API: recursively make every field optional, allowing an ID to
change and leaving array replacement versus element updates undefined.
Good: define a patch with only mutable fields and explicit array operations;
accept a representative valid patch and reject ID changes and ambiguous updates.

If a reusable recursive transformation is required, add fixtures for its real
leaf types, readonly tuples, unions, and cutoff behavior before generalizing.
Use code generation or a simpler explicit contract when a large template
literal cross-product or recursion becomes expensive; measure using
[type tests and checker cost](type-tests.md).
