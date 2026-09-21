# Diagnose and fix flows

Reproduce the user's task from a realistic entry point before proposing a fix.
Use this reference even when the flow works technically but remains confusing
or exhausting.

## Reconstruct before prescribing

1. Establish a realistic job, entry point, role, and representative data from the
   request or existing requirements.
2. Trace route, visible control, state change, and authoritative result. Include
   the loading, failure, and interruption paths that can change this outcome.
3. Record the first mismatch between expected and actual behavior. Label an
   expectation as inferred unless it comes from supplied requirements or observation.
4. Separate the original cause from downstream symptoms. If access is unavailable,
   inspect the available code or screenshots and mark behavior `Not verified`.

A high abandonment rate identifies a place to investigate, not why people leave.
Do not report a reproduced defect from analytics or a static screenshot alone.

## Classify the breakdown

Use this table to choose an investigation and a repair. Several causes can coexist.

### Find and start the task

| Signal                                             | Likely breakdown                     | Check                                                                   | First repair to evaluate                                                   |
| -------------------------------------------------- | ------------------------------------ | ----------------------------------------------------------------------- | -------------------------------------------------------------------------- |
| People do not know where to begin                  | Goal or orientation                  | Can they identify the page purpose, current object, and available work? | Organize around the job, expose an entry path, clarify location and scope. |
| People repeatedly open the wrong destination       | Discoverability or information scent | Does the expected destination match what opens?                         | Correct grouping, placement, or the destination relationship.              |
| People understand each field but stall on the form | Decision burden                      | Which choice requires unavailable information or comparison?            | Supply context, defer unnecessary decisions, show comparisons together.    |
| People know what to do but cannot operate it       | Execution barrier                    | Keyboard, touch, target acquisition, hidden control, permissions?       | Provide an operable control and a discoverable alternative.                |

### Understand feedback and preserve context

| Signal                                          | Likely breakdown              | Check                                                        | First repair to evaluate                                                 |
| ----------------------------------------------- | ----------------------------- | ------------------------------------------------------------ | ------------------------------------------------------------------------ |
| People repeat an action while waiting           | Missing acknowledgment        | Can they see that their input was received?                  | Show pending state at the action and prevent duplicate effects.          |
| People finish but cannot tell whether it worked | Evaluation gap                | Does visible state correspond to authoritative completion?   | Show the changed object or durable result; distinguish queued from done. |
| People act on the wrong workspace or item       | Mapping, scope, or mode error | Which object does the control appear to affect?              | Make scope perceptible at the decision; separate confusable controls.    |
| People return to find work gone                 | Memory/interruption failure   | What reset, navigation, refetch, or timeout discarded state? | Preserve supported drafts and resume context; expose persistence limits. |

### Correct mistakes and recover

| Signal                                                    | Likely breakdown             | Check                                                      | First repair to evaluate                                                      |
| --------------------------------------------------------- | ---------------------------- | ---------------------------------------------------------- | ----------------------------------------------------------------------------- |
| People keep correcting the same rejection                 | Input or conceptual mismatch | Is the format arbitrary, or is the meaning ambiguous?      | Normalize harmless variation; clarify ambiguous meaning before committing.    |
| People understand the interface but choose the wrong plan | Mistaken mental model        | What do they believe save, publish, send, or delete means? | Reveal consequences and distinctions, possibly with a preview.                |
| Experienced people keep making an accidental action       | Slip                         | Does habit target a nearby control or a hidden mode?       | Reduce confusability, add appropriate constraints and recovery.               |
| People cannot recover after partial success               | Transaction/recovery gap     | Which operations completed and what can be retried safely? | Expose per-item outcomes; retry known failures safely and reconcile unknowns. |

### Reach value and return

| Signal                                     | Likely breakdown          | Check                                                                      | First repair to evaluate                                            |
| ------------------------------------------ | ------------------------- | -------------------------------------------------------------------------- | ------------------------------------------------------------------- |
| People see value but resist setup          | Ability or timing         | Is time, effort, cost, trust, or unfamiliar routine the limiting resource? | Deliver first value earlier; defer optional investment.             |
| People finish but have no reason to return | Value or cadence mismatch | Is there a recurring need, and does stored work improve the next visit?    | Support the next real need; do not default to reminders or streaks. |

Use [decision rules](decision-principles.md) to distinguish a slip, an incorrect
mental model, missing feedback, or an ability obstacle. Select a repair only after
checking the actual cause; the table is not evidence that the cause exists.

## Record an actionable finding

Use one finding per distinct cause and consolidate repeated symptoms. Record
the evidence and proposed repair in a compact table or structured block.

### Capture the evidence

- Identify the finding and its flow and node, such as `UX-01` and `F02 / N03`.
- Record the sequence and its screenshot, code location, or reported source.
  Label inferences separately.
- Describe what the person cannot understand, do, or verify, and the consequence.
- Explain the likely cause, confidence in it, and missing evidence.

### Define the repair and its status

- Propose concrete behavior with its scope, dependencies, and tradeoff.
- Define an acceptance check for the original problem and relevant recovery.
- Assign priority by consequence. Mark status as proposed, selected, implemented,
  verified, or deferred. Selected identifies the chosen treatment, not evidence of
  user approval; record actual agreement separately.

| Priority | Consequence                                                 |
| -------- | ----------------------------------------------------------- |
| Critical | Serious unintended effects or unrecoverable loss.           |
| High     | A blocked core job or observed frequent substantial rework. |
| Medium   | Material friction with a workable route.                    |
| Low      | Isolated improvement after the task works.                  |

Use evidence for exposure and frequency; do not invent scores. Keep confidence
separate from priority. Investigate an uncertain high-impact risk instead of
downgrading its potential consequence or presenting it as reproduced.

## Choose the smallest effective repair

1. Repair the identified cause: remove an unnecessary requirement, place a decision
   beside its evidence, expose scope, restore feedback, or preserve work.
2. Check whether the repair covers the same failure in adjacent paths within scope.
   A tooltip on one screen does not fix shared state loss.
3. Compare the proposed behavior with the original at the same scope and define
   a check that would fail if the cause remained.

Follow the agreed intervention approach. Limited refinement preserves working
structure. First-principles work can reassess the plan within the agreed boundary,
but neither approach authorizes unrelated redesign.

Do not default to training, tours, generic confirmations, or extra explanation.
When the user expects the wrong consequence, show the actual consequence at
commitment. A cause-level repair can require more code than a cosmetic workaround.

Compare at the same scope:

| Before                                                       | After                                                              | Why it addresses the cause           | Check                                                              |
| ------------------------------------------------------------ | ------------------------------------------------------------------ | ------------------------------------ | ------------------------------------------------------------------ |
| Closing an edit panel silently discards inputs               | Retain the draft during panel navigation; provide explicit discard | Removes an interruption failure      | Close, inspect another item, reopen; original draft remains.       |
| A failed batch invites everyone again on retry               | Show recipient outcomes; retry known failed recipients safely      | Makes partial completion recoverable | Confirmed successes are not resent; unknowns await reconciliation. |
| A wizard forces users to remember values from previous pages | Keep the relevant comparison summary beside the choice             | Removes memory work                  | The choice can be made without backtracking to collect values.     |

Verify persistence, cancellation, idempotency, and status lookup against the actual
system. A temporarily missing record does not prove an earlier request cannot
complete later. If a required capability is absent, name the dependency and a safe
current-state fallback instead of claiming a frontend-only repair supplies it.

For a review, finish with findings and acceptance checks. For an authorized repair,
implement the selected behavior and use [validation](validation.md) to exercise
the original failure and changed recovery paths.
