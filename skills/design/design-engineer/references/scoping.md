# Scope the invocation

Choose one primary mode, establish the intended outcome, and settle the approach
before implementation. Inspect existing material first so the user decides goals
and tradeoffs rather than answering questions the repository can resolve.

## 1. Select the mode and boundary

| Mode                     | Establish before starting                                                                                                |
| ------------------------ | ------------------------------------------------------------------------------------------------------------------------ |
| Create from scratch      | The new app or interface area, its first usable outcome, and the system, flows, and components needed for that scope.    |
| Implement a bounded part | The named component, screen, or flow, its host system, reused components, integration points, and affected consumers.    |
| Audit and repair         | The existing area to inspect, the problem or evaluation criteria, and whether the user wants fixes or a read-only audit. |

Select the mode from an unambiguous request. Ask when multiple readings would
change the deliverable. A new component in an established app is normally bounded
implementation, not permission to rebuild the app's foundations. Verification of
new work is part of its original mode, not a second audit project.

Identify in-scope screens, component families, flows, and affected consumers.
Name exclusions such as unchanged navigation, copy, backend behavior, or system
tokens. Inspect adjacent code only to understand dependencies and prevent regressions;
proximity does not authorize editing it. Audit-only means no implementation or
system-documentation changes unless subsequently requested.

## 2. Choose an approach for existing work

For work on an existing implementation, including an audit, establish these choices
before approach-dependent design or code changes. Recommend one using the inspected
evidence, then wait for the user's choice:

| Approach         | What it permits within the agreed scope                                                                                                                                         |
| ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Reuse and refine | Preserve the existing architecture, components, and working behavior. Make limited interventions or build the requested new version by composing and extending existing pieces. |
| First principles | Revisit the user's problem, assumptions, and intended outcome. Reassess the flow and component choices, then implement justified corrections within the agreed boundary.        |

Example question:

> How should I approach the invitation flow: reuse the current implementation with
> limited changes, or reassess the problem and flow from first principles? I recommend
> reuse and refinement because the observed failure is isolated to retry handling.

An explicit instruction such as "change only focus restoration; keep the flow"
already chooses limited intervention. "Rethink this flow from first principles"
already chooses reassessment. Reuse those choices; do not ask again. A constraint
such as "keep our design tokens" alone does not settle the approach to the flow.

Do not silently choose the recommended option if the user has not answered.
Read-only inspection can proceed while the choice is pending. First-principles
work questions assumptions, not ownership or authority: it does not authorize a
new framework, unrelated system migration, backend promises, or a whole-app rewrite.
It can still conclude that the existing implementation is the best basis.

## 3. Grill uncertain requirements

The user-invoked `grill-me` skill delegates to the model-invoked `grilling` skill.
Resolve and apply `grilling` directly through the skill catalog or installed
registry; do not require the user to invoke the wrapper separately. If it is
unavailable, use the interview procedure below and state that fallback. Do not
silently install a skill or treat the missing package as a reason to skip clarification.

Use this procedure when the user is unsure, the outcome is vague, or unresolved
decisions would materially change the implementation. A complete, explicit brief
does not require a ceremonial interview.

1. Map the task as a design tree. Record settled decisions and the decisions that
   depend on them. Keep the tree within the requested problem, not every possible
   product or implementation preference.
2. Find facts yourself. Read requirements, routes, components, vocabulary, and
   contracts. Following `grilling`, delegate bounded read-only fact checks to an
   available sub-agent; if delegation is unavailable, inspect directly. A pending
   fact blocks only the questions that depend on it.
3. Ask the whole current frontier: all user decisions whose prerequisites are
   settled. Number the questions, give each a title and a recommended answer with
   its tradeoff, and ask them in one round. Split a long round into labeled groups
   without hiding ready decisions. Do not ask downstream questions prematurely.
4. Wait for answers. Update the tree, carry accepted answers forward, and ask the
   newly unblocked frontier. Recommendations and elapsed time are not answers.
   Continue until every relevant branch is settled; do not stop after an arbitrary
   number of rounds or silently fill material gaps with assumptions.
5. Present the shared-understanding summary below and obtain the user's explicit
   confirmation before implementation. If the user corrects it, reopen the affected
   branches and resolve them. Silence is not confirmation.

Use the host's question tool when available; otherwise present numbered questions
in the conversation. The requirements are complete rounds, visible recommendations,
dependency-aware sequencing, and waiting for answers. Keep the process consistent
with the host's rendering and accessibility conventions.

Bad: "Make it better" becomes an unsolicited redesign of the entire app.

Good: first establish whose task is failing, the outcome to improve, the area that
can change, and the intervention approach. Then ask the newly relevant questions
about recovery or flow structure. The user does not have to name the right skill.

## 4. Check readiness

Before implementation, state the agreed scope concisely:

- Mode and exact target, including affected consumers.
- User outcome and observable completion checks.
- Existing-work approach when applicable, and preserved constraints.
- Exclusions, known dependencies, and unresolved limits.
- Authorization for implementation or audit-only work, plus requested checkpoints.

For a clear request with an already-selected approach, its explicit instructions
can supply this agreement; state the scope and proceed without asking for duplicate
approval. For an interview, the user's confirmation of shared understanding is
required. Do not implement while the mode, target, outcome, applicable approach,
or a material product decision remains unsettled. No companion may start edits
before readiness.

Pass this scope to every design companion. Reuse accepted answers so a design-system
or UX subtask does not restart the interview or reinterpret the task's limits.

## 5. Keep the boundary during work

If new evidence changes an agreed assumption, name the affected decision and ask
only the newly necessary questions. Continue independent work inside the settled
scope. If the essential repair needs a broader change, show the reason, affected
area, and proposed scope adjustment before making it.

First-principles reasoning, companion recommendations, and a discovered adjacent
issue do not expand authorization. A user-requested scope change updates the shared
brief and mode explicitly. Finish by checking the deliverable against that brief.

Done means the mode, target, outcome, approach, exclusions, and authorization are
explicit enough that implementation will not require an unapproved scope choice.
