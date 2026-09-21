# Orchestrate an interface task

Use one task brief and one implementation outcome. Resolve and apply the companion
skills yourself through the skill catalog or installed registry. Skill composition
does not require separate agents, separate user commands, or a pause after each
companion's output.

First complete [scoping and requirements](scoping.md). Carry one agreed primary
mode, a bounded target, and the existing-work approach through this workflow.
Orchestration starts no implementation until the readiness check passes.

## 1. Establish shared context

Read the user's request and existing product requirements, routes, system guidance,
components, vocabulary, and backend contracts. Keep these facts available to every
selected companion:

| Shared input           | What to establish                                                                                              |
| ---------------------- | -------------------------------------------------------------------------------------------------------------- |
| Outcome and scope      | The primary mode, person, task, entry point, completion, in-scope targets, and exclusions.                     |
| Existing constraints   | Stack, design system, tone, accessibility, permissions, and preserved behavior.                                |
| Evidence               | What was observed, supplied, inferred, or not inspected.                                                       |
| State and consequences | What changes, who is affected, what survives failure, and supported recovery.                                  |
| Decisions              | Accepted requirements, chosen approach, interview confirmation when required, open questions, and checkpoints. |

Reuse the existing PRD, glossary, DESIGN.md, and task notes. Do not create a new
document solely to pass context between skills. For a small repair, the working
context can remain in the conversation. For larger work, follow the companions'
existing document conventions and link their artifacts rather than duplicating them.

If requirements remain uncertain, follow the scoping reference's grilling rounds.
Look up environment facts yourself; ask user decisions at the current frontier.
Carry accepted answers between companions. A companion's design subtask does not
add another approval gate, but it cannot bypass unresolved scope, approach, or the
confirmation required after an interview.

## 2. Understand and refine the UX

Use `ux-guide` before committing to a new screen or changed journey. Follow its
mapping and diagnosis workflow at the requested scope. Include entry, primary
action, commitment, waiting, completion, recovery, and return behavior.

For reuse and refinement, identify the first evidenced breakdown and preserve
working paths. For first-principles work, reassess the problem and flow assumptions
within the same agreed target before selecting repairs. Neither approach expands
the boundary. A new settings screen needs its entry and return paths understood;
it does not require an audit of every journey in the app.

The UX output supplies the action and transition contract for system components,
visual treatment, copy, and implementation. If copy reveals an unsupported promise,
revisit that contract before changing wording or code.

Done when the in-scope path, consequential actions, recovery expectations, and
unresolved dependencies are explicit. Show branching changes using ux-guide's
format. Pause only for a requested checkpoint or a decision that requires input.

## 3. Establish the system, UI, and copy together

Use all three companions for an app or feature interface build:

| Companion       | Input from the shared task                                                     | Required contribution                                                                                            |
| --------------- | ------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------- |
| `design-system` | Existing system, product requirements, and UX states.                          | Retain a usable system; extend missing variants; establish the minimum foundations needed when no system exists. |
| `ui-guide`      | UX contract, system tokens, real content, and visual constraints.              | A concrete treatment for layout, typography, icons, color, surfaces, feedback, and motion.                       |
| `ux-writer`     | Actions, consequences, vocabulary, permissions, recovery, and intended layout. | Final in-context copy for the primary path and applicable alternate states.                                      |

Have design-system inspect the existing system before choosing new values. Its
shared tokens and component contracts become the implementation basis. Use
ui-guide's fundamentals to resolve missing visual decisions, then record shared
choices through design-system. Reuse an accepted brief when establishing a system;
do not restart product discovery without a real gap.

Preserve the installed framework. Scope a companion's stack-specific material to
the tools actually used. A non-React app does not become a React/Tailwind/shadcn
migration because design-system contains those recipes. Use applicable system
principles and the project's supported component conventions; identify unsupported
implementation guidance rather than pretending it applies.

Write copy before layout is treated as final. Include labels, helper text,
accessible names, validation, empty states, pending status, confirmations, errors,
and permission or destructive states that the product can actually produce.
Preserve localization keys, variables, pluralization, and existing terminology.
Revise the layout when meaningful copy does not fit; do not truncate away a
consequence or replace the reviewed wording with placeholder strings.

Done when the selected components, visual treatment, and copy describe the same
actions and states. No duplicate token catalogs, competing component definitions,
or contradictory promises should remain.

## 4. Implement one coherent result

Confirm that the selected mode, target, approach, and readiness decision still
apply. A design companion's recommendation outside that boundary is a proposed
scope change, not an instruction to implement it. Audit-only work stops at findings.

Use this skill's component, specification, framework, and animation references to
implement the integrated decisions. Companions that include implementation steps
may contribute within this same change; do not implement the same component twice
or treat each skill's local completion as completion of the app interface.

- UX owns journey decisions and recovery expectations.
- Design-system owns canonical shared tokens, variants, and component contracts.
- UI guidance owns visual and interaction design choices; UX writer owns the words.
- Design-engineer integrates those decisions with routing, state, data, focus,
  animation, and the rendered screens.

Follow dependencies rather than a rigid one-pass sequence. A system primitive can
be needed before the screen; real copy can change layout; an API limitation can
change recovery. Update the affected decision and its consumers together.

For larger work, keep UX maps, component specs, and system documentation in their
existing locations under the same task context. Link the flow's action to its
component and copy state. Preserve existing artifacts and identifiers. Do not
create external tickets, publish previews, or deploy merely because the work is
orchestrated.

## 5. Verify the complete interface

Combine the companions' acceptance criteria with [runtime verification](verification.md).
Exercise the actual path from entry through completion, including the relevant
failure, backtracking, and recovery paths. Check the system's changed consumers,
the UI at real content lengths, and final copy in the rendered states.

Reuse a check that supplies evidence for several concerns; do not rerun it once
per skill. If a check fails, revisit the owning concern, apply the correction to
the implementation, and repeat the affected check. Report one integrated result
with explicit coverage limits.

## Scale the workflow to the request

| Request                                     | Orchestration                                                                                                                   |
| ------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| Create from scratch: a new app interface    | Establish the agreed first usable outcome with all four companions. Build only the system and flows needed for that scope.      |
| Bounded implementation: a component or flow | Establish the intervention approach, reuse system contracts, and integrate the named part. Consult companions at that scope.    |
| Audit and repair: an existing area          | Establish the target, evaluation criteria, and approach, then investigate and implement the authorized repairs.                 |
| Audit and repair, read-only restriction     | Report findings using the chosen approach; no implementation or system-documentation changes.                                   |
| Audit and repair: only one error message    | Honor the explicit limited-change boundary. Use ux-writer; involve UX guidance only if the actual recovery contract is unclear. |

Bad: deliver a flow map, a token sheet, and a copy table, then ask the user to invoke
another skill to build the interface.

Good: use those decisions to implement the requested screen, exercise its journey,
and report what works and what remains unverified. Specialized skills still work
independently when the user chooses to invoke them directly.
