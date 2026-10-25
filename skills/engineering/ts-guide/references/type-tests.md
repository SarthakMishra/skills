# Type tests and checker cost

Start with the existing type-test runner and compiler range. Tests must fail
when inference widens or invalid inputs become accepted. A type alias that
evaluates to `false` is not a failing test.

## Exercise the call-site contract

Use the project's type assertion library if it has one. Otherwise, ordinary
assignments and `@ts-expect-error` are sufficient for focused compiler fixtures.
Compile them with the project's effective options; ensure the normal type-check
command actually includes the fixture. Do not run intentional error cases as
runtime tests.

Independent runnable type-check fixture, TS 4.9+, `strict`; the ambient
declaration describes the API under test and has no runtime implementation:

```ts
declare function lookup<K extends 'name' | 'age'>(key: K): { name: string; age: number }[K];

// Bad: this is legal whether it evaluates to true or false.
type Unchecked = ReturnType<typeof lookup> extends string ? true : false;

// Good: valid calls compile and their results retain useful precision.
const name: string = lookup('name');
const age: number = lookup('age');
// @ts-expect-error Unknown keys are rejected.
lookup('email');
// @ts-expect-error The name result must not be any or a number.
const wrong: number = lookup('name');
```

`@ts-expect-error` fails when the next line has no error, but it does not assert
which diagnostic occurred. Keep that line limited to the intended violation.
For type-level assertions, constrain the result, for example
`type Expect<T extends true> = T`; use the established equality helper rather
than assuming mutual assignability detects every difference involving `any`,
overloads, readonly properties, or intersections.

## Check the edges the abstraction claims to support

- Test a concrete literal and a union-valued argument where correlation matters.
- Test widened input and readonly input where inference or mutation matters.
- For conditional types, cover `never`, unions, and `unknown`; handle `any`
  explicitly if it is part of the supported input domain.
- For boundaries, separately run malformed-input tests against the real parser.
- For published types, compile consumer fixtures on the minimum supported
  TypeScript version and inspect declaration output for leaked private types or
  newer syntax. A local pass on a newer compiler does not prove compatibility.

Readonly views and structural object types are not exact runtime shapes.
Excess-property checking catches fresh object-literal mistakes but does not seal
objects. Bad: cast `Object.keys(value)` to `(keyof T)[]` for arbitrary structural
`T`, assuming it cannot have extra runtime keys. Good: iterate an owned key list
checked against the contract, or validate runtime keys before indexing. Exercise
a value that carries extra properties before accepting a typed-key helper.

## Measure checker cost before changing the design

If the change introduces recursive types, large unions, or reported editor
slowness, compare the same project and compiler before and after with
`tsc --noEmit --extendedDiagnostics` using the project's config. Keep incremental
cache state comparable. Use `--generateTrace` when aggregate timings cannot
locate the expensive type.

Bad: respond to an instantiation-depth error by adding `any` or skipping the
type check. Good: reproduce the problematic consumer, simplify its expansion,
and rerun both the consumer fixture and diagnostics.

Name repeated conditional computations, prefer named object relationships over
large intersection chains where equivalent, and reduce unnecessary union
cross-products. Change one suspected source of cost at a time. Keep the simpler
version only when it preserves the tested contract and improves the measured
problem. Do not disable checks or publish an arbitrary performance threshold.

Finish with the actual commands, compiler versions, and outcomes. Distinguish
static rejection, runtime validation, and measured checker cost; mark evidence
that could not be collected as unverified.
