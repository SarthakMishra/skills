---
name: ux-guide
description: Design, diagnose, or repair web-app user flows with textual use cases, state transitions, and recovery contracts. Use for navigation, forms, onboarding, async actions, lost work, and unclear feedback. Skip isolated copy, visual polish, animation, and backend-only work.
---

# Design recoverable user flows

Read the project basis and affected implementation first, then produce or
reconcile a textual use case that names the person's goal, Main flow,
Extensions, completion, and recovery.

For audits and reviews, inspect and report findings. Edit files only when the
request includes implementation. Keep proposed, implemented, and verified
behavior separate.

## Set the scope

| Request              | Work to cover                                                                             |
| -------------------- | ----------------------------------------------------------------------------------------- |
| Review or audit      | Reconstruct the agreed journey, report evidence-backed findings, and propose repairs.     |
| Design a new flow    | Define the job, textual flow, states, recovery, handoffs, and acceptance checks.          |
| Repair a flow        | Find the first breakdown, repair its cause, and check affected paths in the agreed scope. |
| Make a narrow change | Inspect the named journey and immediate dependencies; preserve adjacent decisions.        |

When `design-engineer` coordinates the work, inherit its scope, approach,
readiness, and exclusions. Do not restart its requirements interview. Ask only
when a missing product decision changes the proposed behavior.

## Workflow

1. **Inspect and bound the job.** Read repository instructions, the accepted
   PRD or spec, domain terms, routes, relevant components, service contracts,
   and available screenshots or runtime evidence. Identify the person, goal,
   entry points, permissions, commitment boundary, cost of error, scope,
   exclusions, and evidence limits.

   Done means you can name the authoritative files, affected journey, requested
   result, and checks that the available evidence can support.

2. **Map and diagnose the journey.** Read [flow mapping](references/flow-mapping.md).
   For an existing flow, record the current textual use case and find the first
   mismatch between the person's expected and actual path before choosing a
   treatment. For a new flow, define the proposed use case directly. Use stable
   flow-step and transition IDs.

   Done means the flow records Intent, a linear Main flow, Extensions for
   relevant branches, and explicit completion, recovery, and unknown outcomes.

3. **Choose and specify one treatment.** Read [flow patterns](references/flow-patterns.md)
   and [decision rules](references/decision-principles.md) for the relevant
   branch. For each consequential action, specify its object, scope, effect,
   feedback, preserved work, recovery, and focus destination. Add a state table,
   cross-path rule, or Given/When/Then scenario only when it exposes behavior the
   Main flow cannot express. Do not promise unsupported persistence, undo,
   delivery, cancellation, or safe retry.

   Done means the selected treatment addresses the cause, names dependencies,
   and has acceptance checks that would fail if the original problem remained.

4. **Implement only when authorized.** Use the existing router, data layer,
   components, and terminology. Keep feature behavior aligned with the flow's
   action and transition contracts.

   Done means the implementation and textual use case describe the same behavior
   when implementation was authorized. Otherwise, the artifact states that no
   implementation was requested and marks the proposal as proposed.

5. **Verify and hand off.** Read [validation](references/validation.md). Exercise
   the original task and the changed failure, interruption, recovery, focus, and
   return paths that apply. For a proposal, record these as acceptance checks
   instead of claiming that they ran. Use code for implementation evidence,
   screenshots for visible structure, and the running app for behavior. Mark
   unavailable browser, device, assistive-technology, or user-research checks
   `Not verified`.

   Done means the handoff lists the current or proposed behavior, checks actually
   run, results, unresolved limits, and one concrete next check when work remains.

## Reference map

- [Flow mapping](references/flow-mapping.md): canonical textual use cases,
  Extensions, state transitions, stable IDs, storage, and handoffs.
- [Diagnosis and repair](references/diagnose-and-fix.md): investigate the first
  breakdown, separate cause from symptom, and choose a scoped repair.
- [Flow patterns](references/flow-patterns.md): navigation, forms, containers,
  lists, permissions, and recovery treatments.
- [Decision rules](references/decision-principles.md): resolve competing choices,
  memory demands, mistakes, and friction with testable reasons.
- [Engagement](references/engagement.md): first value, repeated work, and return use.
- [Validation](references/validation.md): acceptance checks, runtime evidence,
  user observation, and verification limits.
