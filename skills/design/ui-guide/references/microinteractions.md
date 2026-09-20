# Microinteractions

Define the trigger, rules, feedback, and loops before adding animation. Check
asynchronous and repeated use as well as the first successful interaction.

## Define behavior before animating it

Use four questions from Dan Saffer's model to design or diagnose a local interaction. The model applies to something as small as a toggle or as involved as adding an attachment.

| Part            | Questions to resolve                                                                                       | Frequent defect                                                       |
| --------------- | ---------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------- |
| Trigger         | What starts it? Can people recognize and reach that control? Is important state visible before opening it? | Gesture-only control; button styling on static content                |
| Rules           | What can happen, in which states? What constraints, cancellation, and alternative inputs apply?            | Contradictory states; hidden mode; lost input                         |
| Feedback        | How does the person know input registered, work is ongoing, and the result is known?                       | No acknowledgment; duplicate toasts; success before confirmation      |
| Loops and modes | What repeats, stops, resets, or persists? What changes on later use?                                       | Endless loading; repeated celebration; stale timer affecting new work |

Show useful information on the trigger. A selected filter count, mute state, upload progress, or current setting may save the user from opening a panel to check it. Do not crowd every button with metadata.

Keep familiar controls consistent. A switch generally applies an on/off setting immediately; a checkbox may select something to be submitted later. If the app uses a different model, make it explicit rather than relying on appearance alone.

For each relevant object, cover idle, available input, engaged/pressed, changed, and resulting state. Async work may also require pending, failed, succeeded, canceled, or unknown outcome. These need not all become independent React booleans; describe the meaningful states and legal transitions first.

Use known, appropriate context to improve defaults. Remember an explicit user preference when useful. Do not infer consequential choices or add behavioral tracking merely to make an interaction feel personalized. Show defaults with meaningful consequences and let the user correct them.

## Feedback that belongs to the interaction

Start with what the person must understand, then choose the smallest sufficient feedback channel.

| Need                      | Useful feedback                                                                      |
| ------------------------- | ------------------------------------------------------------------------------------ |
| Input registered          | Immediate pressed/selected state or local acknowledgment                             |
| Operation in progress     | Persistent pending state near the initiating control or affected object              |
| Operation completed       | Updated content, a stable resulting state, and confirmation when otherwise ambiguous |
| Operation failed          | Persistent local explanation and recovery action; preserve usable input              |
| Limit reached             | Constraint communicated at the control; explain what remains possible                |
| Background update matters | A contextual indicator without stealing focus or shifting the task                   |

Distinguish received input, requested work, and a confirmed result. A checkmark must have a defined meaning. Do not signal saved, paid, uploaded, or deleted just because a decorative animation finished.

Show feedback in existing components: the button, row, input, or affected object. Add a toast when the result would otherwise be missed or belongs outside the current region. Do not emit a toast, banner, icon, live announcement, and modal for the same ordinary success.

Show feedback when the state changes and give consequential outcomes more emphasis than routine updates. Use text or accessible state for essential meaning; motion and color can reinforce it. Keep a persistent status available after a temporary animation ends. Avoid aggressive shaking or celebratory treatment for stressful failures.

For assistive technology, distinguish state semantics, such as `aria-pressed`, `aria-expanded`, and `aria-selected`, from announcements. Announce meaningful async status once through an appropriate live region; do not narrate every animation frame, every keystroke, or decorative transition.

## Asynchronous behavior

Separate interaction state from presentation state. A pending request and an entering spinner are different things. The UI must work if motion takes zero time, is interrupted, or never emits a completion event.

### Acknowledge input and show real progress

- Guard repeated submission when duplication would be harmful. Keep unrelated controls usable. A visual disabled treatment alone is not request deduplication.
- Keep the control's size and location stable as its contents change. Reserve reasonable space without clipping longer labels.
- Delay a busy indicator only to avoid a distracting flash on a fast operation; give immediate acknowledgment regardless. As a starting point, try a 150–200ms delay for the indicator, then tune with actual latency. Clear that timer when the operation settles; never postpone useful content or completion to satisfy a minimum animation duration.
- Use determinate progress only with a meaningful measurement. Distinguish upload bytes from server processing when they are separate stages. Do not invent percentages or simulated processing steps.

### Reconcile, cancel, and recover

- Use optimistic updates for reversible, predictable operations when the application contract supports reconciliation. Preserve the last confirmed value and make failure recoverable. Do not silently treat a network timeout as proof a mutation failed.
- For overlapping requests, show only results that correspond to the current input or request. Retargeting an animation is not enough to prevent stale data. Use the project's cancellation/versioning pattern.
- On cancellation, define whether work stops or only the view closes. Aborting a client request is not proof the server rolled back. Let UI feedback reflect what is known.
- Make failure recovery available without erasing the user's work. Never let an old success/reset timer clear a newer pending or error state.

These are local interaction requirements; inspect the existing data layer rather than inventing new backend guarantees.

## Repetition, modes, and interruption

Evaluate initial and repeated use. Remembered settings can reduce setup, while repeated decorative effects can interrupt work. Do not silently remove labels or relocate controls merely because a person used them often.

For any loop, name its start, stop, and reset conditions. Stop unnecessary activity when its component is no longer relevant. Clean up timers, observers, subscriptions, and pointer capture. Prevent stacked retries or replaying animation on unrelated rerenders.

Make temporary modes obvious. Bulk selection, editing, and dragging must visibly communicate changed behavior and have a clear exit. Preserve place and focus when returning. Do not let the same click unexpectedly change from "open" to "delete" because an invisible mode is active.

Decide how new input affects work already underway: reverse a disclosure, update a drag target, replace a search request, or deliberately guard an irreversible submission. Never discard valid input merely to let a visual sequence finish.

## Improve repeated use

Make the trigger recognizable, tie feedback to the action, keep content stable, and show when the operation finishes. Reserve distinctive effects for meaningful events, such as completing a creative task or reaching a milestone. Match its intensity to context and repetition.

For a dull interaction, first ask whether it can expose useful state, remove repeated effort, preview a consequence, or make a transition easier to follow. Then consider a small visual accent, tactile press response, or expressive motion. More animation is only one possible improvement.
