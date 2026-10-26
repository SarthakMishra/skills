---
name: code-smell
description: Audit TypeScript and React code for code smells, unnecessary complexity, unsafe contracts, and maintenance risks. Use for a codebase or scoped code-quality review with prioritized findings and brief alternatives. Skip implementing fixes, formatting-only reviews, and dedicated security or runtime-performance audits.
compatibility: Repository read access and a shell with rg. Optional npx scans require Node.js 22.13+, npm, package access, and the tool-specific prerequisites in references/tools.md.
---

# Code smell

Read the repository instructions, package manifests, and source layout first.
Produce a read-only audit that explains every supported issue in scope, its
consequence, and a short suggestion for what to do instead.

Keep source, manifests, lockfiles, configuration, and dependencies unchanged.
Use temporary paths outside the repository for scan artifacts. Do not apply
fixes, initialize tooling, install agent hooks, or create tracker issues.

## 1. Establish scope and coverage

1. Resolve the requested repository, directories, files, or diff. Default to the
   supplied codebase, excluding dependencies, generated code, and build output.
   Include tests and configuration as evidence. For a diff, record the base and
   inspect affected callers; identify introduced findings only after comparing
   the base. Keep existing issues separate from introduced ones.
2. Read local conventions, workspace manifests, export maps, TypeScript options,
   lint configuration, and installed React/framework versions. Record the current
   revision and dirty worktree state when Git is available. Use the project's
   contracts as the standard rather than imposing a new architecture.
3. Inventory relevant files with `rg --files` and map entry points, public APIs,
   feature boundaries, and tests. Track which areas were read, tool-scanned,
   sampled, or excluded. In a large repository, work through areas in batches;
   name unfinished areas instead of implying complete coverage.

This step is complete when the target, exclusions, versions, and review areas
are explicit. If a required contract is missing, state the assumption and
continue with evidence the available code can support.

## 2. Inspect the code independently

Read source before treating scanner output as findings. Trace each in-scope
area's normal path from its entry point through its state or domain logic and
external boundary; inspect error paths and relevant tests. Search neighboring
implementations and consumers to distinguish a local quirk from a recurring
design problem. This review is required even when every tool reports zero issues.

Use these categories for both investigation and reporting:

| Category         | Inspect                                                                                                                                                                                                                            | Brief alternative to consider                                                                                                                             |
| ---------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Complexity       | Functions, components, or hooks mixing independent responsibilities; nested branching; flag-driven modes; stateful inheritance that obscures ownership. Size and complexity metrics locate candidates, but do not prove a problem. | Split at a named responsibility or compose focused functions/components while keeping the workflow visible.                                               |
| Abstraction      | Pass-through layers, speculative extension points, generic APIs that force casts, wrappers or inheritance that hide behavior without protecting a contract.                                                                        | Inline a layer or use direct composition. Retain boundaries that isolate external systems, enforce invariants, or support real consumers.                 |
| Coupling         | Feature internals imported across boundaries, hidden mutable singletons, import-time I/O, runtime import cycles, or barrels pulling unrelated code across server/client boundaries.                                                | Depend on the owning public API; move shared policy to its owner or pass a focused dependency at the boundary.                                            |
| Duplication      | Repeated business rules, validation, or JSX with the same ownership and reason to change; divergent copies of one contract.                                                                                                        | Share the policy or composition at its owning boundary. Keep coincidentally similar code separate.                                                        |
| Dead code        | Unreachable branches, obsolete exports/files/dependencies, unused modes, or reachable placeholders that claim success.                                                                                                             | Remove obsolete paths or make unsupported behavior explicit after checking all entry points and consumers.                                                |
| Type contracts   | `any` propagation, unchecked casts or predicates, non-null assertions hiding missing data, optional-property combinations that admit invalid states, or generic relationships lost at call sites.                                  | Narrow `unknown` at external boundaries, derive from the source of truth, or model actual variants with a discriminated union.                            |
| Async and errors | Floating promises, swallowed failures, success-shaped fallbacks, duplicate writes, partial updates, and missing cancellation or stale-result handling.                                                                             | Return/await the operation, expose a meaningful failure, and give overlapping work an explicit ownership or cancellation rule.                            |
| Configuration    | Package scripts, module resolution, JSX transforms, or environment assumptions that disagree with the actual runtime or supported consumers.                                                                                       | Align the existing build and runtime contracts, then exercise the affected entry point in its supported environment.                                      |
| React behavior   | State ownership, Effects, identity, rendering, accessible interactions, and framework boundaries.                                                                                                                                  | Read [React review](references/react-review.md) whenever React components or hooks are in scope. It defines the evidence and exceptions for these checks. |

Read full implementations and affected consumers before deciding that an
abstraction or duplication is wasteful. A single implementation can still need
an interface for an external contract or test seam. Directly constructing a
value object or a service at the composition root is not a coupling defect.

Bad: report a component solely because it exceeds 50 lines, or propose a
repository interface for every service constructor.
Good: name the independent responsibilities or hidden lifetime dependency,
show its consumers and concrete maintenance cost, and suggest a smaller seam.

Check TypeScript's effective options before claiming a compiler guarantee.
Assertions and `satisfies` do not validate runtime input. Distinguish runtime
imports from type-only relationships. ES module exports and `package.json`
export maps define public boundaries; a missing barrel file is not a smell.

This step is complete when every reviewed area has source evidence for its
applicable categories, including paths that tools do not cover. Mark unread or
sampled areas explicitly.

## 3. Add targeted static analysis

Read [tool selection and commands](references/tools.md) before running scans.
It selects existing project checks and optional, versioned `npx` tools for
specific coverage gaps without adding project dependencies.

Use tools to find additional candidates and cross-check manual discoveries.
Inspect actual analyzed paths, enabled rules, configuration hints, and incomplete
results. A successful exit or a health score is not proof of code quality.
If a tool cannot run with the existing runtime or dependencies, record the exact
failure and continue source inspection for that category.

This step is complete when useful tools have run or have a recorded reason for
being skipped, and their candidates have been traced back to source.

## 4. Validate and reconcile candidates

1. For each candidate, identify the exact source location, triggering condition,
   affected consumer, and behavior or maintenance cost. Read tests and intentional
   exceptions. Use an existing focused check when it resolves uncertainty without
   changing the project; otherwise describe the check needed.
2. Confirm a finding only when source or exercised evidence supports the problem.
   Maintainability findings need a concrete change burden, such as one policy
   maintained in several places. Keep plausible but unresolved candidates in
   **Needs verification**, with the missing evidence. Discard refuted alerts.
3. Merge tool/manual duplicates and downstream symptoms of one root cause.
   List all known affected occurrences under that finding. Keep independent
   causes separate, even when one tool rule catches them all. Include every
   confirmed finding, including lower-priority ones; do not impose a top-N cap.
4. Assign priority from demonstrated impact, not tool severity or metric cutoffs.
   Keep suggestions to one or two sentences about the smallest useful direction.
   Preserve error handling, accessibility, and public contracts; leave complete
   patches and replacement implementations for a separate implementation task.

Bad: paste three hook warnings as three findings, or call an inline callback a
performance bug without examining its consumer.
Good: report one hook-order violation with all supporting diagnostics; put an
unmeasured rendering concern in **Needs verification** with a profiling step.

This step is complete when each retained candidate is either a supported finding
or an explicitly unresolved question, and duplicates have one owning finding.

## 5. Return the report

Read and follow [the report format](references/report-format.md). It owns the
section order, priority definitions, required finding fields, and empty-result
behavior. Report source-traced evidence separately from checks actually run.

Before returning, reconcile finding totals and occurrence lists, include all
coverage gaps and unavailable checks, and verify that the audit left the working
tree unchanged. A clean scan supports only the paths and rules it analyzed.
