# Research choices and adopt tools

Use this reference for architecture or convention decisions, new tooling and
libraries, replacements, or a custom implementation. Research should resolve the
project's questions, not produce a catalog of technologies.

## Establish the evidence

For each consequential choice, write the requirement and acceptance criteria
before looking for a preferred solution. Inspect the current implementation,
constraints, prior decisions, and installed versions. Separate user requirements,
language requirements, local conventions, and recommendations.

Read the source that owns each claim. Use official documentation for supported
APIs and behavior, source and tests for unclear details, release notes and
migration guides for version differences, and measured experiments for performance
or integration. Compare more than one viable approach for substantial decisions,
including keeping the current approach. A single primary source can settle a
specific syntax question; architecture tradeoffs usually need several kinds of
evidence. Do not impose a citation count as a substitute for coverage.

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

For an accepted change, use the project's package manager, update its manifest and
lockfile together, remove obsolete configuration within scope, and verify actual
consumers. Start new checks on adopted paths or an explicit baseline when needed;
do not silently increase an allowlist or rewrite unrelated code to make CI pass.

Update the repo-specific skill with the approved usage pattern, canonical example,
checks, exceptions, and revisit condition. Record what remains unmigrated and how
to detect it. Do not claim completion from installation alone.
