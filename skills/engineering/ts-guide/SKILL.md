---
name: ts-guide
description: Guide TypeScript type design, review, and refactoring. Use for preserving inference, modeling domain invariants, designing generic APIs, transforming types, or testing type contracts. Skip introductory syntax, framework behavior, and build-tool setup without a type-design problem.
---

# TypeScript guide

Read the installed TypeScript version, effective tsconfig, and affected call
sites first. Build types that preserve useful information and reject invalid
programs; prove the contract with accepted and rejected usage.

Assume TypeScript basics. Use advanced machinery when it expresses a real
relationship or removes an unsafe operation, not simply to make types narrower.
Keep reviews read-only unless implementation is requested.

## Establish the contract

1. Identify the source of truth: a domain contract, runtime schema, generated
   client, or value declaration. Inspect existing type-test conventions and, for
   libraries, the minimum supported consumer compiler. If these are missing,
   state the assumption and keep changes local rather than inventing a project policy.
2. Write one valid use and one invalid use the change must distinguish. Identify
   which facts need runtime validation. This is the acceptance criterion before
   choosing a type technique.
3. Apply the relevant guidance below. Preserve runtime behavior unless the task
   calls for changing it. Do not enable project-wide compiler flags or add a
   schema dependency just to make a local example work.
4. Run the project's type check and exercise the changed contract. Report what
   the compiler proves, what runtime tests prove, and any unavailable checks.
   A review ends with supported findings and examples, without editing files.

## Preserve information at its source

Infer implementation-local values. Annotate a public boundary when its contract
must remain stable independently of the implementation. Use `satisfies` (TS 4.9+)
to check a value's shape while keeping its useful inferred structure; use
`as const` when literal values and readonly properties are intentional.
`satisfies` provides contextual typing, so it is not a promise that inference is
unchanged. Neither operation validates external data or freezes objects at runtime.

Runnable type-check example, TS 4.9+, `strict`; no omitted setup:

```ts
type Command = 'save' | 'load';
type Route = { path: string };

// Bad: the annotation discards the exact path literals.
const broad: Record<Command, Route> = {
  save: { path: '/save' },
  load: { path: '/load' },
};
// @ts-expect-error The annotation widened path to string.
const lost: '/save' = broad.save.path;

// Good: check completeness and retain literal paths.
const routes = {
  save: { path: '/save' },
  load: { path: '/load' },
} as const satisfies Record<Command, Route>;
const saved: '/save' = routes.save.path;
```

Derive a type from an existing value or schema when they represent the same
contract. Keep independently owned domain and transport contracts separate even
when their fields happen to match today.

Bad: manually repeat a command union beside the authoritative command registry.
Good: use `keyof typeof registry` and check that adding a registry entry updates
the accepted command set. If an external protocol owns that set, check the
registry against the protocol instead, as above.

## Choose the branch that owns the relationship

- For state variants, validated values, optional fields, and identity, read
  [domain modeling and boundaries](references/domain-modeling.md). It decides
  what can be constructed and what still needs runtime evidence.
- For generic functions, wrappers, callbacks, and literal inference, read
  [generic APIs and inference](references/generic-apis.md). It keeps inputs,
  outputs, and dependent arguments related at call sites.
- For mapped, conditional, template literal, and recursive types, read
  [type transformations](references/type-transformations.md). It makes union
  distribution, key correlation, and recursion deliberate.
- When changing a reusable type or investigating checker cost, read
  [type tests and checker cost](references/type-tests.md). It defines evidence
  for inference, rejection, compatibility, and performance.

## Keep the proof honest

Treat `any`, non-null assertions, and type assertions as gaps to explain. Prefer
narrowing or a better contract; retain a localized assertion when a documented
invariant is true but the compiler cannot express it. Test that invariant.
Do not replace an assertion with an unchecked predicate and call it safer.

Bad: `JSON.parse(text) as Settings` claims a contract without checking the data.
Good: assign the parsed result to `unknown`, then pass it through the existing
settings parser and test malformed input as well as valid input.

Read the actual compiler options before relying on their guarantees. `strict`
does not include `noUncheckedIndexedAccess` or `exactOptionalPropertyTypes`.
Without those flags, model missing lookups and absent-versus-undefined fields
explicitly where the contract requires them. If stronger checking is requested,
assess its callers before changing configuration.
