# Generic APIs and inference

Start from call sites, including union-valued arguments. Keep a type parameter
when it relates positions in the contract. Prefer a concrete or union parameter
when a generic would only rename a type without preserving information.
Examples are independent runnable type-check fixtures with `strict`, TS 5.4+;
individual feature minimums are noted below. Ambient declarations specify APIs
for type tests, not runnable implementations.

## Relate the key to the selected value

Constrain the key by the object and return its indexed type. Returning a union
of all property types discards the relationship that the caller provided.

```ts
// Bad: a known key still returns every possible property type.
declare function looseGet<T>(value: T, key: keyof T): T[keyof T];
const row = { name: 'Ada', age: 37 };
// @ts-expect-error name is widened to string | number.
const lost: string = looseGet(row, 'name');

// Good: K connects the argument to the result.
function get<T, K extends keyof T>(value: T, key: K): T[K] {
  return value[key];
}
const name: string = get(row, 'name');
// @ts-expect-error Only existing keys are accepted.
get(row, 'missing');
```

An unconstrained `parse<T>(text): T` lets the caller choose an unproved result.
Good: accept a parser `(input: unknown) => T` and actually invoke it, or return
`unknown`. The parser, not the type argument, supplies runtime evidence.

## Give inference an authoritative input

Use `const` type parameters (TS 5.0+) for APIs that should capture literals from
inline values. Use readonly constraints for readonly tuple inference. Already
widened variables cannot recover their original literals.

Use `NoInfer<T>` (TS 5.4+) when a dependent argument must be checked against a
type inferred elsewhere, rather than helping widen it. On older compilers,
infer the first input in a separate curried call instead of introducing an
opaque compatibility trick.

```ts
// Bad: fallback participates in inference and admits an unintended choice.
declare function looseChoice<C extends string>(choices: readonly C[], fallback: C): C;
looseChoice(['small', 'large'], 'huge');

// Good: choices alone establish the domain.
function choose<const C extends readonly string[]>(
  choices: C,
  fallback: NoInfer<C[number]>,
): C[number] {
  return choices[0] ?? fallback;
}
const size: 'small' | 'large' = choose(['small', 'large'], 'small');
// @ts-expect-error fallback cannot expand the choices.
choose(['small', 'large'], 'huge');
```

## Keep dependent arguments together

Separate unions allow invalid combinations. Even a generic key can be a union,
so test more than literal keys. A mapped union of tuples preserves each valid
pair for a finite event or command map.

```ts
type Events = { saved: { id: string }; failed: { error: Error } };

// Bad: the name and payload are independent unions.
declare function looseEmit(name: keyof Events, payload: Events[keyof Events]): void;
looseEmit('saved', { error: new Error('wrong payload') });

// Good: each tuple is one valid call.
type EventArgs = {
  [K in keyof Events]: [name: K, payload: Events[K]];
}[keyof Events];
declare function emit(...args: EventArgs): void;
emit('saved', { id: '1' });
// @ts-expect-error Payload does not belong to this event.
emit('saved', { error: new Error('wrong payload') });
declare const uncertain: keyof Events;
// @ts-expect-error An uncertain event needs a correspondingly correlated payload.
emit(uncertain, { id: '1' });
```

For the implementation, narrow the discriminant before using its payload.
Do not cast a heterogeneous handler registry to make an uncorrelated dispatch
compile; use an explicit switch or preserve the mapped relationship throughout.

## Preserve function contracts through wrappers

Use tuple type parameters for ordinary argument lists instead of `unknown[]` or
`any[]`. Preserve optional and rest parameters and the result. Handle `this`
explicitly when wrapping methods.

```ts
// Bad: every call is allowed and every result becomes any.
declare function looseWrap(fn: (...args: any[]) => any): (...args: any[]) => any;

// Good for a single non-generic call signature without a this requirement.
function wrap<A extends unknown[], R>(fn: (...args: A) => R): (...args: A) => R {
  return (...args) => fn(...args);
}
const length = wrap((value: string, extra: number = 0) => value.length + extra);
const result: number = length('abc');
// @ts-expect-error The wrapper retains the argument contract.
length(123);
```

Annotate callback parameters when contextual typing through a generic constraint
would otherwise infer `unknown`; check defaulted parameters as well as required
ones. Here the explicit `number` keeps the optional second argument useful.

`Parameters` and `ReturnType` do not reconstruct a generic function's input/output
relationship and use the last signature for overloads. Test generic and
overloaded inputs separately if the wrapper promises to support them. Prefer a
dedicated signature or explicit overloads to asserting that arbitrary behavior
returns the original function type. Overloads also need runtime branch tests:
a permissive implementation signature can hide incorrect branch results.
