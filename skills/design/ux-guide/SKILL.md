---
name: ux-guide
description: Design, diagnose, and repair web-app user flows. Use for confusing navigation, difficult forms, lost work, unclear feedback or recovery, onboarding and return experiences, new flows, or app-wide UX reviews. Excludes isolated copy edits, visual polish, animation tuning, and backend work without user-facing behavior.
---

# Make user flows understandable and recoverable

Identify the person, intended outcome, and entry point. Define what successful
completion looks like, then trace the path through commitment, waiting, failure,
recovery, and returning later. Preserve the product's vocabulary and actual system
capabilities.

Use the rules below as defaults. Depart for an explicit requirement, supported
product constraint, or observed failure; state the replacement and reason.
Distinguish proposed behavior from implemented and exercised behavior.

## Bound the task

| Request              | Work to cover                                                                                            |
| -------------------- | -------------------------------------------------------------------------------------------------------- |
| Repair a flow        | Reconstruct the named journey, find the first breakdown, and repair its cause and affected paths.        |
| Design a new flow    | Specify the job, transitions, recovery, and connections to the surrounding app.                          |
| Audit the app        | Inventory journeys, roles, entry points, completion, recovery, and re-entry across the agreed app scope. |
| Make a narrow change | Inspect the affected journey and immediate dependencies; reuse existing maps and decisions.              |

A review or design request alone does not authorize implementation. When working
under design-engineer, inherit its agreed mode, intervention approach, readiness,
and exclusions. Do not restart its interview or expand its scope. This skill also
works independently.

## Work through the journey

1. Read project requirements, routes, components, domain terms, and relevant service
   contracts. Establish outcome, scope, permissions, and cost of error. Look up
   facts yourself; ask before a missing product decision changes the proposed flow.
2. Map current and proposed behavior with the mapping reference. For an existing
   flow, diagnose the first breakdown before choosing a repair. For a new flow,
   define the transitions and completion contract directly.
3. Choose one concrete treatment using the relevant pattern or decision rule.
   Specify each consequential action's object, scope, effect, feedback, preserved
   work, recovery, and focus destination. Do not promise unsupported persistence,
   undo, delivery, cancellation, or safe retry.
4. Implement only when requested and authorized, using the existing stack. Exercise
   the original task and changed failure paths with the validation reference.
   Reconcile the map with the result and report remaining limits.

## Map and choose behavior

| Reference                                              | Read for and apply                                                                                              |
| ------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------- |
| [Flow mapping](references/flow-mapping.md)             | Scope, current/proposed maps, stable IDs, storage, and handoffs. Keep maps and transitions consistent.          |
| [Diagnosis and repair](references/diagnose-and-fix.md) | Existing confusing or failing flows. Tie each repair to evidence and a root cause.                              |
| [Flow patterns](references/flow-patterns.md)           | Navigation, forms, containers, lists, permissions, and recovery. Choose the pattern and its explicit exception. |
| [Decision rules](references/decision-principles.md)    | Competing choices, memory demands, mistakes, or excess friction. Give a testable reason for the treatment.      |

## Engagement, implementation, and verification

| Reference                                              | Read for and apply                                                                                               |
| ------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------- |
| [Useful engagement](references/engagement.md)          | First value, repeated work, and return use. Improve the real outcome at its natural cadence.                     |
| [React interactions](references/react-interactions.md) | React implementation of navigation, state, focus, or async behavior. Follow the installed router and data layer. |
| [Validation](references/validation.md)                 | Every review, proposal, or repair. Match evidence and checks to the claimed result.                              |

Use screenshots for visible structure, code for implementation evidence, and the
running app for behavior. Neither an agent walkthrough nor attractive output proves
user comprehension. Mark unavailable checks `Not verified`. Finish with the
requested flow, findings, or repair and one concrete next action if work remains.
