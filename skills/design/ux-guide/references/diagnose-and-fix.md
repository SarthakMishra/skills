# Diagnose and fix flows

Use for existing UX problems, including flows that function technically but remain confusing or exhausting.

## Reconstruct before prescribing

Start with a realistic job and entry point. Traverse the current path with representative data and the relevant role. Trace from route to visible control to state change to actual result. Inspect loading, failures, and interruption paths that matter to this job. If access is unavailable, inspect what exists and label the limit; do not claim a reproduced defect.

Record the first mismatch between the person's likely expectation and what the app offers. Separate downstream symptoms from causes. A high abandonment rate identifies a place to investigate, not why people leave.

## Classify the breakdown

Use this table to choose an investigation and a repair. Several causes can coexist.

| Signal                                                    | Likely breakdown                     | Check                                                                      | Candidate repair                                                           |
| --------------------------------------------------------- | ------------------------------------ | -------------------------------------------------------------------------- | -------------------------------------------------------------------------- |
| People do not know where to begin                         | Goal or orientation                  | Can they identify the page purpose, current object, and available work?    | Organize around the job, expose an entry path, clarify location and scope. |
| People repeatedly open the wrong destination              | Discoverability or information scent | Does the expected destination match what actually opens?                   | Correct grouping, placement, or the destination relationship.              |
| People understand each field but stall on the form        | Decision burden                      | Which choice requires unavailable information or comparison?               | Supply context, defer unnecessary decisions, show comparisons together.    |
| People know what to do but cannot operate it              | Execution barrier                    | Keyboard, touch, target acquisition, hidden control, permissions?          | Provide an operable control and a discoverable alternative.                |
| People repeat an action while waiting                     | Missing acknowledgment               | Can they see that their input was received?                                | Show pending state at the action and prevent duplicate effects.            |
| People finish but cannot tell whether it worked           | Evaluation gap                       | Does visible state correspond to authoritative completion?                 | Show the changed object or durable result; distinguish queued from done.   |
| People act on the wrong workspace or item                 | Mapping, scope, or mode error        | Which object does the control appear to affect?                            | Make scope perceptible at the decision; separate confusable controls.      |
| People return to find work gone                           | Memory/interruption failure          | What reset, navigation, refetch, or timeout discarded state?               | Preserve supported drafts and resume context; expose persistence limits.   |
| People keep correcting the same rejection                 | Input or conceptual mismatch         | Is the format arbitrary, or is meaning genuinely ambiguous?                | Normalize harmless variation; clarify ambiguous meaning before committing. |
| People understand the interface but choose the wrong plan | Mistaken mental model                | What do they believe save, publish, send, or delete means?                 | Reveal consequences and distinctions, possibly with a preview.             |
| Experienced people keep making an accidental action       | Slip                                 | Does habit target a nearby control or a hidden mode?                       | Reduce confusability, add appropriate constraints and recovery.            |
| People cannot recover after partial success               | Transaction/recovery gap             | Which operations completed and what can be retried safely?                 | Expose per-item outcomes and retry only unresolved work.                   |
| People see value but resist setup                         | Ability or timing                    | Is time, effort, cost, trust, or unfamiliar routine the limiting resource? | Deliver first value earlier; defer optional investment.                    |
| People finish but have no reason to return                | Value or cadence mismatch            | Is there a recurring need, and does stored work improve the next visit?    | Support the next real need; do not default to reminders or streaks.        |

These categories adapt Norman's action cycle and error distinctions, Krug's common observed problems, and Eyal's ability constraints. Use the principle reference when the underlying distinction is unclear.

## Record an actionable finding

Use one finding per distinct cause, consolidating repeated symptoms. A compact table or short structured block can contain:

- **ID and flow/node:** `UX-01`, `F02 / N03`.
- **Evidence:** observed sequence, screenshot/code location, or reported behavior; label inference explicitly.
- **User difficulty:** what the person cannot understand, do, or verify, and the consequence.
- **Cause and confidence:** likely mechanism; what evidence is missing.
- **Proposed change:** concrete behavior, scope, dependencies, and tradeoff.
- **Acceptance check:** an observable result for the original problem plus relevant recovery.
- **Priority and status:** consequence-based priority; proposed, selected, implemented, verified, or deferred.

Prioritize by harm, exposure, and recovery cost. Use **critical** for serious unintended effects or unrecoverable loss; **high** for a blocked core job or frequent substantial rework; **medium** for material friction with a workable route; **low** for modest improvement. Do not invent frequency or multiply unsupported scores. Confidence and severity are separate: an uncertain high-impact risk needs investigation.

## Choose the smallest effective repair

Try removing a needless requirement, relocating a decision, supplying missing context, improving mapping, or restoring feedback before redesigning the whole surface. Small is about behavioral scope, not line count. A root-cause change can be larger than a tooltip and still be the smallest effective fix.

Avoid treating training, a tour, a generic confirmation, or more explanation as the default. A warning can catch a slip but will not necessarily change an incorrect mental model. When the user expects the wrong consequence, make the actual consequence visible at commitment.

Compare at the same scope:

| Before                                                       | After                                                              | Why it addresses the cause           | Check                                                          |
| ------------------------------------------------------------ | ------------------------------------------------------------------ | ------------------------------------ | -------------------------------------------------------------- |
| Closing an edit panel silently discards inputs               | Retain the draft during panel navigation; provide explicit discard | Removes an interruption failure      | Close, inspect another item, reopen; original draft remains.   |
| A failed batch invites everyone again on retry               | Show recipient outcomes; retry only unresolved recipients          | Makes partial completion recoverable | Completed invitations are not sent again.                      |
| A wizard forces users to remember values from previous pages | Keep the relevant comparison summary beside the choice             | Removes memory work                  | The choice can be made without backtracking to collect values. |

Verify each proposed capability against the system. If persistence or idempotency does not exist, identify the dependency rather than claiming a frontend-only repair provides it.
