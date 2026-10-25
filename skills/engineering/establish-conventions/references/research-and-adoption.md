# Research choices and adopt tools

Write the requirement and acceptance criteria before researching an architecture
or convention decision, tool, library, replacement, or custom implementation.
Research should resolve the project's questions, not produce a technology catalog.

## Establish the evidence

For each consequential choice, inspect the current implementation,
constraints, prior decisions, and installed versions. Separate user requirements,
language requirements, local conventions, and recommendations.

Read the source that owns each claim. Use official documentation for supported
APIs and behavior, source and tests for unclear details, release notes and
migration guides for version differences, and measured experiments for performance
or integration. Compare more than one viable approach for substantial decisions,
including keeping the current approach. A single primary source can settle a
specific syntax question; architecture tradeoffs usually need several kinds of
evidence. Do not impose a citation count as a substitute for coverage.

### Record evidence beside the decision

Record the exact version or revision, source URL, date checked, relevant finding,
and limitation. Label conclusions drawn from sources as recommendations. A blog
can suggest a candidate; verify consequential claims against its implementation
or documentation. Compare contradictory guidance by context and versions. Search
snippets, stars, and generic best-practice lists do not establish fit.

Keep the research note organized by decision:

| Decision | Requirement | Options and evidence | Trial result | Recommendation | Open question |
| -------- | ----------- | -------------------- | ------------ | -------------- | ------------- |

Include rejected alternatives and why they fail or cost more. Retain the final
evidence beside the relevant decision or ADR; follow the project's policy for
temporary notes. Do not publish a private spec to obtain recommendations.

## Research composition and decomposition

Start with a representative operation and a likely change from the spec or code.
Identify the coupling that would make that change difficult: shared decisions,
broad dependencies, invalid states, competing state owners, ordering assumptions,
or subscriptions that update unrelated consumers. For a new project, label these
as anticipated pressures rather than measured defects.

Select candidate patterns by the problem and the actual language and framework.
Use the following as research prompts, not a required pattern inventory:

| Pressure                                           | Candidates to investigate                                                  | Evidence that matters                                                                                                  |
| -------------------------------------------------- | -------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| Business rules require infrastructure to test      | Pure calculations and transitions, narrow capabilities, ports and adapters | Core behavior runs independently; adapters preserve the real failure contract.                                         |
| One feature change crosses unrelated layers        | Feature-local modules or vertical slices, explicit public APIs             | Trace the change through callers and allowed dependencies; account for shared invariants.                              |
| Values permit invalid states or skipped stages     | Discriminated variants, validated constructors, typed stages               | Valid and invalid usage checks, runtime validation, and ordering or stale-state tests.                                 |
| UI behavior, lifetime, and rendering are entangled | State colocation, cohesive controllers, slots, scoped context              | Preserve state identity, interaction and accessibility behavior; measure subscription costs before adding stores.      |
| Workflow effects need planning or coordination     | Event or mutation handlers, pure transition models, command interpreters   | Establish ownership of execution, cancellation, retries, and partial failure; test replay before claiming reliability. |

Investigate other approaches when the project's ecosystem or constraints suggest
them. Verify consequential language, framework, and library claims against their
primary documentation and installed versions. Distinguish an API guarantee from
an architectural recommendation: types may constrain callers without validating
runtime data, a Hook may extract logic without isolating renders, and a loader
may move code without establishing a server-only boundary.

Compare the current approach, a direct local refactor, and more elaborate
abstractions only where viable. Account for navigation and indirection, public
surface area, ownership, migration, debugging, and runtime or build overhead.
Do not infer improvement from file count, pattern names, or hypothetical reuse.

Bad: prescribe repositories for every query and a controller Hook for every
component because the stack supports them. Good: isolate a calculation that
currently requires database mocks, or move an editor's local draft out of shared
page state, then verify the affected operation and consumers. Keep direct code
where a new boundary adds no useful independence.

Record adopt, retain, or defer for each investigated candidate, with the relevant
scope, rejected alternative, evidence limit, and revisit condition. Use the
[deciding experiment](#run-a-deciding-experiment) when an uncertain assumption
could change the recommendation. Put accepted usage rules in the project skill
and their rationale in the existing architecture or decision docs; leave the
research catalog out of routine coding instructions.

## Compare complete costs

First check whether the need already has a suitable solution in the repo, standard
library, platform, or installed dependencies. Then compare a new dependency with a
custom implementation if both are plausible.

For libraries and tools, inspect:

- Required behavior and edge cases, API clarity, extension points, and failure
  semantics. Verify the needed capability rather than relying on a demo.
- Compatibility with the pinned language, runtime, framework, build system,
  deployment target, and supported platforms. Inspect transitive dependencies,
  native binaries, installation scripts, and generated output where relevant.
- Maintenance evidence, release and migration history, issue handling, known
  advisories, licensing, and provenance. Recent activity alone does not prove
  quality; low activity can also describe a stable, complete library.
- Runtime, memory, bundle, startup, and build costs that matter to this product.
  Measure the relevant workload instead of comparing unrelated benchmark claims.
- Team familiarity, debugging, configuration, upgrades, operations, data portability,
  replacement cost, and any service or licensing costs.

### Compare the cost of custom code

For custom code, identify who will maintain it, the bounded behavior it must
support, failure cases, test strategy, and when to replace it. Include the costs
of specifications, interoperability, security updates, and uncommon inputs.
Do not casually replace cryptography, authentication protocols, complex parsers,
or accessible interaction behavior with an untested small implementation.
Conversely, a dependency is not justified when a supported built-in meets the
contract with less maintenance.

Prefer direct use of a small, stable API. Add an adapter only when it isolates a
real domain, compatibility, test, or replacement concern. Do not wrap every library
in a speculative interface. Explain the chosen compromise and its limits.

## Run a deciding experiment

Identify what could disprove the recommendation and exercise that behavior in a
temporary workspace. Compile against the target versions when possible. Include
an ordinary case and relevant invalid or failure cases; use realistic data sizes
for performance questions. Record commands, results, and missing checks.

A comparison should hold inputs and conditions constant. A tiny example proves
API compatibility, not production scalability. A mock proves behavior against
that mock, not the real provider's contract. If the needed environment is
unavailable, leave that claim unverified and avoid making it an enforced premise.

## Adopt within the agreed scope

Propose the exact configuration, dependencies, affected callers, replacement or
migration steps, validation, and recovery path. Reuse established authorization.
Resolve a change to the chosen stack, compatibility, costs, or external resources
before acting on it. Installing a development package does not authorize creating
a paid service, deploying code, or migrating production data.

### Apply and verify the accepted choice

For an accepted change, use the project's package manager, update its manifest and
lockfile together, remove obsolete configuration within scope, and verify actual
consumers. Start new checks on adopted paths or an explicit baseline when needed;
do not silently increase an allowlist or rewrite unrelated code to make CI pass.

Update the repo-specific skill with the approved usage pattern, canonical example,
checks, exceptions, and revisit condition. Record what remains unmigrated and how
to detect it. Do not claim completion from installation alone.
