---
name: ux-guide
description: Design, diagnose, and repair web-app user flows. Use for confusing navigation, difficult forms, lost work, unclear feedback or recovery, onboarding and return experiences, new flows, or app-wide UX reviews. Excludes isolated copy edits, visual polish, animation tuning, and backend work without user-facing behavior.
---

# Improve user flows

Find where a person's journey breaks down, design a better path, and verify the
repair when implementation is requested. Cover the task through completion,
including interruptions, recovery, and returning later. Preserve the product's
visual conventions and vocabulary. This skill works independently of other
skills and external services.

## Choose the scope

| Request                 | Scope                                                                                                                                                             |
| ----------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Repair an existing flow | Reconstruct the journey, diagnose the first breakdown, and check the repair.                                                                                      |
| Design a new flow       | Define the job, transitions, and connections to the surrounding app.                                                                                              |
| Audit the app           | Inventory journeys across discovery, first value, recurring work, recovery, account/settings, and exit where they exist. Include roles and external entry points. |
| Make a narrow change    | Inspect the affected journey and immediate neighbors. Reuse an existing map.                                                                                      |

Keep implementation within the user's request. A review or design request alone
does not authorize changing the app.

## Establish the job and evidence

Read relevant project instructions, domain vocabulary, decisions, routes,
components, and requirements. Inspect available screens and actual behavior.
Identify the person, intended outcome, entry point, usage frequency, input
methods, permissions, and cost of error. Record constraints and unknowns.

Label evidence as **observed**, **code-supported**, **reported**, or **inferred**.
Screenshots cannot establish behavior, code cannot prove comprehension, and an
agent walkthrough is not participant research. Keep usage data, personas,
business rules, and backend capabilities grounded in evidence. Ask when missing
information changes the proposal; otherwise state assumptions and proceed.

## Map the journey

Read [flow-mapping.md](references/flow-mapping.md) for scope, document storage,
stable identifiers, and the feedback loop. Keep current and proposed behavior
separate. Include commitment, waiting, failure, recovery, and re-entry. Mark areas
that have not been inspected.

Show the overview and changed branching flows as Mermaid diagrams in the
conversation. Use a table or prose for trivial linear actions. Explain the change
and the decisions that affect implementation. Honor a requested review checkpoint;
otherwise continue already-authorized work without adding an approval gate.

## Diagnose and design

For reviews and repairs, read [diagnose-and-fix.md](references/diagnose-and-fix.md).
Find the first point where the person cannot choose an action, predict its effect,
execute it, interpret feedback, or recognize completion. Connect the evidence to
the difficulty, cause, smallest effective change, and verification. Prioritize
blocked outcomes, lost work, and consequential mistakes.

Remove unnecessary decisions, repeated entry, hidden dependencies, and context
switching. Keep comparison information together and essential consequences visible.
Optimize understandable effort rather than a fixed click count.

For each consequential action, specify the trigger, affected object and scope,
state change, feedback, next actions, preserved work, recovery, and focus
destination. Distinguish draft, saved, submitted, accepted, and completed when
these differ. Promise undo, autosave, cancellation, and safe retries only when the
system supports them.

Read the reference that matches the decision:

| Decision                                                    | Reference                                                   |
| ----------------------------------------------------------- | ----------------------------------------------------------- |
| Resolve a design tradeoff                                   | [decision-principles.md](references/decision-principles.md) |
| Choose navigation, form, list, dialog, or recovery behavior | [flow-patterns.md](references/flow-patterns.md)             |
| Improve first value, engagement, or return use              | [engagement.md](references/engagement.md)                   |
| Implement React state, navigation, focus, or async behavior | [react-interactions.md](references/react-interactions.md)   |
| Choose checks or assess evidence                            | [validation.md](references/validation.md)                   |

Match engagement to the user's need and natural cadence. Useful previews,
reusable setup, discovery, and growing competence can make a task satisfying.
Reliable completion may be all an occasional task needs.

## Implement and verify

When requested, implement the scoped behavior with the existing router, data
layer, components, forms, and task runner. Read the React reference for React
implementation. Justify any new dependency through a concrete task requirement.

Carry flow decisions into acceptance checks. Preserve completion through keyboard,
touch, assistive technology, narrow viewports, and interrupted sessions. Match
client feedback to the real server contract and name any missing backend support.
Update the map when implementation changes an assumption.

Read the validation reference when planning checks or judging an uncertain design.
Re-run the original task and the relevant failure, backtracking, or interruption
path. Use behavioral tests or browser checks proportional to risk. Report the
checks actually performed; a heuristic recommendation remains a hypothesis.

For an audit, report prioritized findings and fixes. For a design, show the
proposed flow and open decisions. For a repair, report implemented behavior,
verification evidence, and limitations. Follow the mapping reference's lifetime
rules for scratch notes; create external tickets only when explicitly requested.
