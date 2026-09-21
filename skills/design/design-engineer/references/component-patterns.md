# Component patterns

Implement the control's approved interaction contract with the existing accessible
component. Use `ui-guide` for control choice, visible states, layout, and feedback.
This reference owns activation, focus, presence, request ownership, and cleanup.

## Buttons and toggles

### Preserve activation and focus

Use native buttons for actions and anchors for navigation. Set button type
explicitly inside forms. Preserve the component's keyboard contract and expose its
actual state. Keep focus immediate and visible in forced colors; motion must not
delay activation or remove the hit target.

### Handle pending and unavailable actions

- For async actions, show pending status and keep label and indicator dimensions
  stable.
- Keep the button accessible to assistive technology. Make decorative outgoing
  layers noninteractive and hide only those layers from the accessibility tree.
- Default to native `disabled` for unavailable actions that should leave the tab
  order. Use `aria-disabled` for an unavailable action that must remain reachable
  to explain a prerequisite or retain focus during a pending request. Guard its
  activation handler; ARIA alone does not stop clicks or submissions. Guard the
  submission path too, including Enter from a form field.
- Explain meaningful prerequisites near the control, not solely in a tooltip.
  Disable for a real state constraint, not while a cosmetic transition runs.

| Bad                                                             | Good                                                                   |
| --------------------------------------------------------------- | ---------------------------------------------------------------------- |
| A clickable `div` styled as Save.                               | A `button` with native keyboard behavior and the correct submit type.  |
| `aria-disabled` changes appearance but the handler still saves. | Guard the handler and form submission while unavailable.               |
| A spinner replaces the button and removes keyboard focus.       | Keep the button mounted, preserve its size, and expose pending status. |

## Inputs and form presentation

### Arrange fields

- Preserve visible labels and the association of hints and errors with their fields.
- Use full available width for general text fields within the form's width bound.
  Give short structured values, such as a verification code, a content-sized width.
  Allow realistic content and responsive reflow.
- Default to one column. Share a row only for a single composite value, such as
  city and postal code, and stack it when either field or label stops fitting.

### Show validation feedback

- Keep focus and invalid states distinct. An error must not erase the focus indicator.
- Avoid shifting all fields when a short hint or validation message appears.
  Reserve space where practical, but allow longer content to expand.
- Follow existing validation conventions. Without one, validate on submit, then
  revalidate invalid fields as the user edits them. Do not show an error for an
  incomplete value on its first keystroke.
- State what the feedback must communicate without imposing a new writing style.

| Bad                                                      | Good                                                                 |
| -------------------------------------------------------- | -------------------------------------------------------------------- |
| Show "Invalid email" after typing the first letter.      | Validate on submit, then update that error during correction.        |
| Failed submission clears the form.                       | Retain entered values and associate each field error with its input. |
| Collapsing a section leaves focus inside a hidden field. | Move focus to the disclosure control before hiding the section.      |

### Reveal and collapse fields

- Preserve labels, associations, and keyboard order during animated reveals.
- Keep hidden fields nonfocusable. On collapse, move focus safely if it
  was inside the collapsing content.
- Make the reveal immediate for reduced motion.

## Menus, popovers, dialogs, and drawers

Use the project's established accessible component before building overlay
mechanics. A generic popover is not automatically a menu or dialog.

Verify which behaviors the component supplies:

- Placement and portal rendering.
- Keyboard navigation, Escape, and outside interaction.
- Focus restoration and an inert background.
- Scroll management.

### Open and reverse

1. Start an anchored overlay's animation at its trigger. Check placement near
   viewport edges and after collision flipping.
2. Set focus or selection immediately according to the component pattern. Do not
   wait for the visual entrance.
3. Support close or reversal during entrance. A closing animation must not later
   remove a newly reopened instance.
4. Keep exiting presentation inert and absent from the tab order. Avoid duplicate
   active dialogs or invisible layers that intercept clicks.

### Close and adapt safely

- Coordinate modal focus and background inertness through close. Keep modal
  behavior until visual removal, or return focus when closing and retain only a
  nonblocking decorative exit. Do not leave an invisible active focus trap.
- Make scroll lock, focus return, listeners, and portal cleanup independent of a
  single animation event. Handle canceled motion and zero-duration variants.
- For drawers, distinguish content scrolling from drawer dragging. Account for
  browser navigation gestures, the on-screen keyboard, safe areas, and viewport
  changes.
- Preserve the interaction model when changing geometry. A modal should not become
  a hover card on small screens just to fit.

Use the motion reference's overlay defaults. Keep focus management independent
of the visual entrance and exit.

| Bad                                                                   | Good                                                                     |
| --------------------------------------------------------------------- | ------------------------------------------------------------------------ |
| The dialog receives focus after a 220ms entrance timeout.             | The dialog receives focus on open; its presentation animates separately. |
| An old exit callback removes a reopened menu.                         | Cancel or invalidate that removal when the menu reopens.                 |
| A zero-duration exit never fires cleanup and leaves scrolling locked. | Closing state triggers cleanup even without an animation-end event.      |

## Tooltips and hover content

### Show supplementary information

- Use a tooltip to supplement an already understandable control. Do not hide
  critical instructions or the only accessible name there.
- Show tooltips on keyboard focus as well as hover. Apply the library's timing or
  the chosen `ui-guide` treatment. Clear obsolete timers when focus, hover, or
  visibility changes so a delayed tooltip cannot reopen after dismissal.
- Keep keyboard feedback prompt. It should not inherit a frustrating pointer delay.

### Support interaction and different inputs

- Keep transient hover content dismissible and reachable where applicable.
- Use an interactive popover for content with links or controls.
- Give touch users a visible or explicit alternative for essential information.
- Gate hover-only effects by actual hover capability. Hybrid devices may support
  both touch and mouse; screen width does not establish the input model.

## Lists, tabs, and changing data

### Preserve list identity and focus

- Preserve stable item identity during insertion, removal, and reorder. Keep scroll
  position and keyboard focus meaningful.
- If the focused item is removed, focus the equivalent control in the next item,
  or the previous item when the last item was removed. If the list is now empty,
  focus its remaining task control or empty-state heading.
- Animate displacement when it helps track a user's action. Do not replay the whole
  list entrance on every filter change or data refresh.
- Skip motion in virtualized lists when identity or measurement cannot be
  guaranteed. These lists recycle DOM nodes.

### Keep tabs responsive

- Distinguish selected state from keyboard focus.
- Update semantics and content immediately according to the established activation
  model. The underline or highlight can move independently.
- Measure the highlight's target from the actual tabs, including wrapping and
  localization.

### Show current data

- For async search or filtering, keep input responsive and indicate when results
  are stale or loading.
- Do not show an old response as the result of a new query. A transition cannot
  repair a request race.
- For counters and financial or operational data, show the actual value directly.
  Highlight updates with a restrained local indicator instead of cycling through
  fabricated values. Respect users selecting or comparing text.

| Bad                                                       | Good                                                                          |
| --------------------------------------------------------- | ----------------------------------------------------------------------------- |
| Filter refresh replays every row's entrance.              | Update the result set without replaying entrances.                            |
| A late response for "ca" replaces results for "cat".      | Commit only results for the current query and mark retained results as stale. |
| A balance counts through invented values on every update. | Show the confirmed value immediately and briefly highlight the changed cell.  |

## Dragging and direct manipulation

### Show the source and destination

- Expose what is draggable and where it can go.
- During drag, separate the active item visually, indicate a destination, and
  preserve its relationship to the source.

### Handle the pointer lifecycle

1. Track the initiating pointer and ignore additional pointers. Use pointer capture
   and keep the grabbed object under the pointer.
2. Preserve native scrolling outside the necessary gesture axis.
3. Clean up on release, cancellation, lost capture, unmount, or Escape where
   relevant. Prevent an accidental click after a genuine drag.

For dismissal thresholds and release motion, read
[gesture tuning](animation-implementation.md#gesture-tuning).

### Provide alternatives to dragging

Offer equivalent keyboard controls and a single-pointer alternative that does not
require dragging, such as move-up/down buttons or a destination menu. Keyboard
support alone does not provide the non-dragging pointer alternative required by
[W3C dragging movements](https://www.w3.org/WAI/WCAG22/Understanding/dragging-movements.html).

## Loading, empty, error, and completion states

### Choose a loading indicator

- Use skeletons when the expected structure is known and they meaningfully preserve
  layout. Keep them noninteractive and hide decorative details from assistive
  technology. Prefer static skeletons for reduced motion. Stop shimmering when a
  request has failed.
- Use a spinner for unknown progress with a meaningful persistent status.
- Use a progress bar for actual measured progress.
- Expose cancellation for cancelable work and retry after a known failure. Offer
  background continuation only when the operation actually survives closing the
  view. The operation's real state controls completion.

### Preserve layout and recovery

- Maintain layout continuity across empty, populated, error, and loaded states.
- Give errors a stable recovery path.
- Preserve filter controls when they caused an empty result.

### Keep notification actions available

- Use the existing notification system for transient notifications. Respect its
  timing controls and pause behavior.
- Keep important outcomes and recovery actions available after a toast vanishes.
  A fleeting toast must not be the only way to undo a consequential action.
- Keep focused notifications present until the interaction completes.

| Bad                                           | Good                                                    |
| --------------------------------------------- | ------------------------------------------------------- |
| Empty search results remove the filters.      | Keep filters and offer a clear-filter action.           |
| The only undo action disappears with a toast. | Keep undo or recovery reachable after the toast closes. |

## Accessible state and announcements

Expose the actual state with semantics such as `aria-pressed`, `aria-expanded`,
and `aria-selected`. Keep those separate from announcements. Announce meaningful
async status once through an appropriate live region; do not narrate every frame,
keystroke, or decorative transition. Preserve useful status after an animation ends.

Use the existing component's semantics rather than adding competing live regions
or focus effects. Keep the live pending message outside a busy result region.

## Async operations

Separate interaction state from presentation state. A pending request and an
entering spinner are different things. The UI must work if motion takes zero time,
is interrupted, or never emits a completion event.

### Acknowledge input and show real progress

- Guard repeated submission when duplication would be harmful. Keep unrelated
  controls usable. A visual disabled treatment alone is not request deduplication.
- Keep the control's size and location stable as its contents change. Reserve
  reasonable space without clipping longer labels.
- Use determinate progress only with a meaningful measurement. Distinguish upload
  bytes from server processing when they are separate stages. Do not invent
  percentages or simulated processing steps.

### Avoid flashing busy indicators

1. Acknowledge input immediately.
2. Apply the busy-indicator delay selected from project conventions or `ui-guide`.
   Delay only the spinner, not the operation, pending semantics, or protection
   against duplicate submissions. The worked example below uses 150ms.
3. Clear the timer when the operation settles. Never postpone useful content or
   completion to satisfy a minimum animation duration.

### Reconcile, cancel, and recover

- Use optimistic updates for reversible, predictable operations when the
  application contract supports reconciliation. Preserve the last confirmed value
  and make failure recoverable. A network timeout does not prove a mutation failed.
- For overlapping requests, show only results for the current input or request.
  Use the project's cancellation or versioning pattern. Retargeting an animation
  does not prevent stale data.
- On cancellation, define whether work stops or only the view closes. Aborting a
  client request does not prove the server rolled back. Reflect what is known.
- Make failure recovery available without erasing the user's work. Never let an
  old success or reset timer clear a newer pending or error state.

Inspect the existing data layer rather than inventing new backend guarantees.

### Choose request behavior explicitly

| Operation                                         | Default behavior                                                                                                 |
| ------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------- |
| Search or filtering                               | Keep input enabled. Replace the current query and ignore responses for older queries.                            |
| Save or another non-repeatable submission         | Accept one submission while pending. Keep unrelated controls enabled.                                            |
| Reversible preference with reconciliation support | Update optimistically, retain the confirmed value, and offer retry or restoration on failure.                    |
| Mutation with uncertain outcome                   | Show an unknown status and reconcile with the server before offering a retry that could duplicate the operation. |

| Before                                                                                | After                                                                                              |
| ------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------- |
| Search for "ca", then "cat". The slower "ca" response overwrites the current results. | Only "cat" can update the result list. Existing results remain labeled stale until it resolves.    |
| Save times out; the UI reports "Not saved" and silently retries.                      | The UI reports that confirmation is unavailable and checks the operation's status before retrying. |

## Example filter search

Use the [filter-panel spec](interaction-specs.md#example-filter-panel) and
[controlled React/Tailwind view](react-tailwind.md#filter-panel-view).

| Event                          | Query layer behavior                                                    | View props and feedback                                                   |
| ------------------------------ | ----------------------------------------------------------------------- | ------------------------------------------------------------------------- |
| Input changes to `ca`          | Start request A; mark A current.                                        | `query="ca"`; pending message appears immediately.                        |
| Input changes to `cat`         | Start B; make A obsolete. Abort A if the layer supports it.             | `query="cat"`; input remains enabled; retained results are labeled stale. |
| B finishes before 150ms        | Commit B and clear its spinner timer.                                   | Current result count and rows replace pending; spinner never appears.     |
| A finishes later               | Ignore A because it no longer owns the current query.                   | No change to B's results or status.                                       |
| A slower current request fails | Clear its timer, retain query and filters, enable retry for that query. | Error text remains visible; Retry is available.                           |

Bad: delay the query update to avoid a spinner flash, or let an old callback clear
the current pending state. Good: delay only the decorative spinner and guard every
result, error, and reset callback by the query layer's ownership rule.

Keep pending/error text in the same layout slot. Let it wrap and grow, keep its
contrast readable, and expose it once through the status region. A decorative
spinner is not the accessible status. Put the live status outside a result region
marked busy so the pending message is not held with the results.

## Example save feedback

| Operation state             | Persistent feedback                                                | Recovery                                                              |
| --------------------------- | ------------------------------------------------------------------ | --------------------------------------------------------------------- |
| Pending                     | "Saving" plus pending semantics; delayed spinner if still pending. | Guard another submission; preserve input and focus.                   |
| Confirmed                   | "Saved" with a checkmark if the product uses one.                  | Leave the confirmed values visible.                                   |
| Known rejection             | Error explanation associated with the form or field.               | Preserve values and allow correction and retry.                       |
| Unknown after lost response | Explain that confirmation is unavailable.                          | Reconcile before offering a retry that could duplicate the operation. |

These labels illustrate state meaning; follow the product's writing conventions.
Do not reset a newer error because an old success animation finishes. The
[contextual icon recipe](react-tailwind.md#contextual-icon-recipe) changes
presentation only; it cannot establish that a save or toggle succeeded.

## Repetition, modes, and interruption

### Keep repeated use predictable

- Evaluate initial and repeated use. Remembered settings can reduce setup;
  repeated decorative effects can interrupt work.
- Do not silently remove labels or relocate controls because a person used them often.
- Name each loop's start, stop, and reset conditions. Stop unnecessary activity
  when its component is no longer relevant.
- Clean up timers, observers, subscriptions, and pointer capture. Prevent stacked
  retries or animation replay on unrelated rerenders.

### Make modes and interruptions explicit

- Make bulk selection, editing, and dragging visibly communicate changed behavior.
  Give each mode a clear exit and preserve place and focus when returning.
- Do not let the same click unexpectedly change from "open" to "delete" because an
  invisible mode is active.
- Decide how new input affects current work. It may reverse a disclosure, update a
  drag target, replace a search request, or guard an irreversible submission.
  Never discard valid input to let a visual sequence finish.
