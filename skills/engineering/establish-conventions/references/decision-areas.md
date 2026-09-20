# Decisions to establish

Use this reference during the interview and when writing the proposal. Inspect
each area, then pursue only the branches supported by the spec or existing code.
Record what is settled, unresolved, or not applicable. The questions below guide
investigation; they are not defaults to impose on every project.

## Architecture and organization

- Identify executable entry points, consumers, supported environments, and who
  owns each kind of data. Keep external systems and trust boundaries explicit.
- Group code by the domain decisions that change together. Define allowed import
  direction, public entry points, and internal implementation boundaries. Follow
  framework-required locations without forcing all business logic into them.
- Decide whether separate processes or packages solve a real deployment, scaling,
  ownership, or consumer need. Prefer one deployable when it meets the spec.
  Do not infer microservices from a long feature list or create empty packages.
- Trace one representative operation from input validation to result. Include
  authorization where relevant, state changes, external effects, error propagation,
  cancellation, and recovery. Record which module enforces each invariant.
- Define persistence, transaction boundaries, migrations, serialization, caching,
  and consistency only where needed. Distinguish authoritative state from derived
  state. Specify failure behavior before choosing an abstraction or service.
- Identify compatibility obligations for APIs, data, files, protocols, and foreign
  callers. For native or embedded work, include ownership, allocation, ABI, unsafe
  operations, hardware limits, and measurement or calibration requirements.

Document the architecture with views that answer actual questions. A context
view names users and external dependencies; a module view explains responsibilities
and allowed dependencies; a sequence explains an important success or failure
path. Add deployment views only for meaningful runtime boundaries. A directory
tree is useful but cannot establish data flow or ownership on its own.

## Complexity and change

Ask which expected changes should remain local and which complexity is intrinsic
to the product. Inspect repeated logic, long dependency chains, overlapping state,
pass-through wrappers, generic helpers, and broad configuration options.

Keep a module's interface smaller than the implementation details callers would
otherwise need to understand. Centralize invariants and repeated decisions where
they belong. Keep short one-use code inline when extraction only adds navigation.
Do not demand a second implementation before introducing a boundary justified by
testing, platform isolation, or correctness.

Distinguish duplication of one business rule from superficially similar code.
Share the former; allow the latter to evolve separately. Choose functions, types,
objects, composition, or inheritance according to the language and contract.
Avoid universal bans or mandates for classes, dependency injection, generics,
repository layers, or design patterns.

Agree on review signals for complexity. File size, parameter count, and complexity
scores can prompt inspection but are not proof of poor design. Require profiling
before performance-driven complexity. Preserve necessary validation, diagnostics,
accessibility, and recovery even when they add code.

## Code style and patterns

Research the actual language edition, compiler, formatter, and library versions.
Use their supported defaults unless a project requirement justifies a difference.
Agree on naming, file layout, imports, visibility, dependency direction, and
public API shape. Record only choices that configuration or idiomatic language
usage does not already settle.

Define patterns for the applicable cases:

| Area                       | Questions the convention must answer                                                                        |
| -------------------------- | ----------------------------------------------------------------------------------------------------------- |
| Types and validation       | Where does unknown data become trusted? Which states must types exclude? Where may assertions occur?        |
| Errors and absence         | What is expected absence, recoverable failure, or a bug? Who adds context, handles failures, or terminates? |
| State and ownership        | Who may mutate a value? What survives navigation, reload, retries, or process restart?                      |
| Concurrency and async work | Who owns tasks, cancellation, ordering, retries, and cleanup? What makes repeated work safe?                |
| Boundaries                 | How are transport, storage, environment, and domain representations converted?                              |
| Resources                  | Who acquires and releases connections, files, locks, memory, or foreign handles?                            |
| Observability              | Which failures and operations need logs or measurements? How are context and redaction handled?             |

Provide a representative good example and explain a likely violation when prose
leaves ambiguity. Reference canonical helpers by real paths and names after they
exist. Never invent package exports or enforce another repository's private APIs.

## Documentation

Decide who reads each document and what decision it supports:

- The README explains purpose, supported use, setup, and verified development
  commands. Link to deeper material rather than copying it.
- Architecture docs describe the implemented system and distinguish planned
  changes. ADRs preserve consequential decisions, alternatives, reasons, and
  conditions for revisiting them. Use the existing ADR and domain-doc conventions.
- API docs explain caller obligations, errors, side effects, examples, ownership,
  and compatibility that signatures do not express. Use executable examples or
  documentation tests where the language supports them.
- Comments explain non-obvious reasons, invariants, safety arguments, workarounds,
  and evidence. Avoid narrating ordinary control flow. Keep useful proofs near
  the code rather than extracting helpers solely to remove comments.
- Work markers name the unresolved issue and a removal or review condition. Use
  the real tracker; do not invent issue numbers or create tickets without scope.
- Runbooks cover actual operational duties and recovery. A local library may
  need no runbook; a service with migrations or backups usually needs instructions
  that someone can exercise.

Choose where permanent docs and temporary research live, how contributors find
them, and what code changes require updates. Require plain Markdown and unslop
when available. Keep secrets, personal paths, and private sample data out of
published examples. Let formatting tools own wrapping and syntax.

## Testing and verification

Map requirements and invariants to observable checks rather than prescribing a
universal test pyramid or coverage percentage. Decide which behavior needs a unit,
integration, contract, end-to-end, property, fuzz, snapshot, documentation, or
benchmark test. Select the types that resolve actual risks.

Test stable behavior through public or meaningful module interfaces. Internal
tests are useful for invariants callers cannot isolate. Avoid tests that merely
repeat implementation details or assert a helper was called. Verify regressions
fail against the original behavior where feasible.

Define fixtures, placement, naming, and failure diagnostics. Control clocks,
randomness, environment, temporary files, scheduling, and external responses.
Keep behavior-specific setup readable. Share expensive construction or a protocol
when it helps; do not require every test to use a fixture framework.

Use real local dependencies when their behavior is the contract being tested.
Use fakes at external boundaries when determinism or isolation requires them, and
check that the fake does not hide an important integration assumption. Test
invalid input, failure, cancellation, partial completion, and retry where relevant.
Keep routine verification independent of production credentials or customer data.

Agree on fast local checks, broader CI checks, and criteria for running each.
Include changed consumers and supported environments. Define how to handle flaky,
ignored, or unavailable tests without silently treating them as passing. Decide
when snapshots may change and who reviews them. Existing baseline failures need
an explicit record and bounded migration plan, not weaker tests.

## Tools, libraries, and custom code

For an actual gap, follow [research-and-adoption.md](research-and-adoption.md).
Choose formatter, linter, compiler settings, build tools, test tools, and dependency
management together so they do not overlap or disagree. Connect agreed checks to
the commands contributors and CI run. Keep language-specific rules scoped to the
paths where they apply.

Record exceptions with a reason and revisit condition. A new tool or dependency
that changes accepted patterns must update the project skill and examples.
Routine version bumps that leave conventions unchanged need compatibility checks,
not a new architecture interview.
