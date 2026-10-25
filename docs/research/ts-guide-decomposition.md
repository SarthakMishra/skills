# TypeScript decomposition research

Recommend focused additions to `ts-guide` for workflow contracts, dependency
contracts, and narrowing; success means valid calls remain useful and invalid
stage transitions or adapter substitutions fail the compiler checks.

Research date: 2026-10-25. This note records the adoption decision outside the
installed skill package. Recommendations below are judgments about the skill's
scope, informed by the cited primary sources.

## Decisions on the supplied patterns

| Pattern                                | Recommendation for `ts-guide`                                                                                                                                |
| -------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Functional core, imperative shell      | Keep general decomposition advice outside this skill. Use a pure stage transformation as an example of an enforceable type contract.                         |
| Ports and adapters                     | Adopt the narrow structural function contract and adapter checks; omit repository layers and framework architecture recipes.                                 |
| Vertical slices                        | Outside scope. Directory organization does not itself establish a TypeScript invariant.                                                                      |
| Capability-based dependencies          | Adopt consumer-owned operation types, safe function substitution, and preservation of method receivers.                                                      |
| Typestate                              | Add stage-specific inputs and outputs, with explicit runtime and aliasing limits.                                                                            |
| Algebraic data types and Results       | Unions and exhaustiveness already exist. Extend the example to distinguish domain failure variants and explain untyped exception channels.                   |
| Data-oriented interpreters             | Existing union guidance covers command descriptions. Do not prescribe an interpreter framework or imply that command arrays supply transactional guarantees. |
| Type-state pipelines                   | Combine with typestate; prefer explicit transformations before a generic pipeline abstraction.                                                               |
| Dependency closure and packages        | Keep build and package policy outside scope. Retain existing public declaration and consumer compatibility checks.                                           |
| Axes of change and stable dependencies | Architecture judgment, outside scope. Preserve the existing rule that separately owned contracts need not be derived from one another.                       |

## Add the missing type-design constraints

### Workflow stages describe evidence, not ownership

Discriminated unions narrow reliably when each variant owns its required data.
State-specific function parameters can therefore reject the wrong stage. Naming
two identical object aliases does not distinguish them: TypeScript compares
structure. Prefer distinct required fields or discriminants; use an existing
brand constructor when provenance itself matters. These are consequences of
the documented [narrowing rules](https://www.typescriptlang.org/docs/handbook/2/narrowing.html#discriminated-unions)
and [structural compatibility](https://www.typescriptlang.org/docs/handbook/type-compatibility.html).

An accepted call does not establish that the value is still current in a
database or that an old reference has been consumed. A readonly view also
cannot prevent mutations through aliases. The proposed skill rule should
require runtime validation at ingress and keep state freshness and atomic
updates in runtime tests. The aliasing limit is explicit in the
[object handbook](https://www.typescriptlang.org/docs/handbook/2/objects.html#readonly-properties);
the ownership and persistence recommendations are engineering consequences,
not additional compiler guarantees.

### Narrow dependencies and check their substitutions

For injected operations, prefer a property such as
`save: (invoice: Invoice) => Promise<void>` when substitutability matters.
With `strictFunctionTypes`, parameter checking rejects a callback that accepts
only a narrower invoice subtype. Method declarations have an exception to that
checking. This is a concrete missing warning for ports and capability objects,
documented in the [TypeScript 2.6 release notes](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-6.html#strict-function-types).

Passing `repository.save` can lose the receiver when the implementation uses
`this`; forward through `(invoice) => repository.save(invoice)` or bind it.
Exercise the adapter at runtime because its ordinary signature may not expose
the receiver requirement. The [classes handbook](https://www.typescriptlang.org/docs/handbook/2/classes.html#this-at-runtime-in-classes)
documents that `this` depends on how a function is called.

Using `Pick` narrows the static view, not the object itself. Passing an explicit
small object makes the supplied surface clearer, but is not a runtime sandbox.
This follows from [structural compatibility](https://www.typescriptlang.org/docs/handbook/type-compatibility.html),
which permits values with additional members.

### Results need an explicit exception policy

Use a discriminated error union for expected failures callers must handle,
following the repository's existing conventions. A `Promise<Result<T, E>>`
describes fulfillment; it does not constrain rejection to `E`. TypeScript's
[Promise declaration](https://github.com/microsoft/TypeScript/blob/v5.9.3/src/lib/es5.d.ts)
has one type parameter for fulfillment and an `any` rejection reason. Therefore
keep operational exceptions distinct, or deliberately translate known errors
at an adapter boundary. Avoid silently mapping every thrown value to a domain
failure. This recommendation does not require a Result library.

## Independently researched modern guidance

The strongest additional gap is inferred type predicates in TS 5.5+. A simple
check such as `value !== undefined` can infer a predicate without a handwritten
assertion. Predicates promise both the true and false cases; a positive-number
test cannot safely claim that every false result is a non-number. Explicit
predicates are not verified against their annotations. Add a positive/negative
fixture and runtime boundary cases, including zero, rather than teaching
truthiness-based filtering. See the
[TypeScript 5.5 release notes](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-5-5.html#inferred-type-predicates).

The existing skill already covers `satisfies`, const type parameters, `NoInfer`,
correlated tuples, non-distributive conditionals, brands, exact optional fields,
and consumer compiler checks. Preserve these instead of adding another catalog.
TS 5.8 improves checks of conditional return branches against explicit return
types, supporting the existing advice to annotate stable public boundaries.
TS 6.0 improves contextual inference for function expressions without `this`.
Neither warrants a new architectural pattern or a blanket upgrade requirement.
See [TS 5.8](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-5-8.html#granular-checks-for-branches-in-return-expressions)
and [TS 6.0](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-6-0.html#less-context-sensitivity-on-this-less-functions).

Package export maps control resolvable entry points but are not strong security
encapsulation; project references organize compilation and declarations.
Those are useful architecture tools, not reasons to broaden this type-design
skill into build-system setup. See [Node package exports](https://nodejs.org/api/packages.html#main-entry-point-export)
and [TypeScript project references](https://www.typescriptlang.org/docs/handbook/project-references.html).

## Acceptance checks for the update

- Compile valid stage transitions and reject skipped stages; test the real
  constructor against malformed input.
- Accept a compatible injected operation and reject an implementation with a
  narrower parameter; exercise a receiver-dependent adapter.
- Exhaustively handle domain error variants while separately exercising
  operational rejection.
- On TS 5.5+, verify inferred narrowing and both outcomes of explicit guards;
  retain compatible guidance for older consumer compilers.
- Run `pnpm check`. Compiler fixtures validate examples; automatic skill
  selection remains a separate behavioral evaluation.
