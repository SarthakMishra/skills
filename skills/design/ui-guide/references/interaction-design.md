# Interaction design

Choose a recognizable control, make its state visible, and explain the result and
recovery. These expectations apply even when animation is disabled. Use
[layout](layout.md) for placement, [typography](typography.md) for readable feedback,
and [motion](motion-design.md) for how a state change appears.

## Define meaning before an effect

Use Dan Saffer's trigger, rules, feedback, and loops/modes model:

| Part            | Decide                                                                      |
| --------------- | --------------------------------------------------------------------------- |
| Trigger         | What starts the action, and how can the person recognize and reach it?      |
| Rules           | Which actions are available, unavailable, reversible, or consequential?     |
| Feedback        | How are received input, pending work, and a confirmed result distinguished? |
| Loops and modes | What repeats, persists, resets, or changes on later use?                    |

Show useful state on the trigger, such as an active-filter count or mute state.
Remember explicit preferences when they reduce repeated setup. Show consequential
defaults and allow correction; do not infer consequential choices or add tracking
merely to personalize an interaction.

## Choose controls with recognizable behavior

- Use buttons for actions and links for navigation. Keep the primary action
  prominent within its task region; danger styling does not make every delete
  action primary.
- Use a switch for an on/off setting applied immediately and a checkbox for a
  selection submitted with a form. Explain an established different model.
- Keep labels, hints, and errors associated with their fields. Preserve separate
  focus and invalid appearances. Default to one column; share a row only for a
  composite value that remains readable when narrow.
- Use tooltips for supplementary information. Keep essential instructions visible
  and provide an explicit alternative on touch. Interactive content needs a
  popover rather than a tooltip.

| Bad                                                              | Good                                                                                       |
| ---------------------------------------------------------------- | ------------------------------------------------------------------------------------------ |
| A control looks identical to nearby static text.                 | Use its established button, link, or toolbar treatment.                                    |
| A switch appears to apply a setting but silently waits for Save. | Use the form's checkbox pattern or explicitly show deferred application.                   |
| A disabled action explains its prerequisite only on hover.       | Explain the prerequisite beside the action.                                                |
| Dragging is the only way to move an item.                        | Also provide move buttons or a destination menu usable with a single pointer and keyboard. |

## Make states legible

Define the states the control actually has: default, hover, focus, pressed,
selected, unavailable, pending, result, and error. A selected state must remain
visible without motion. Combine shape, text, or an icon with [color](color.md);
never make color the only signal.

- Show focus and acknowledge input immediately. Cosmetic effects must not make a
  control appear unresponsive or prevent the next action.
- Preserve entered content, meaningful selection, and the user's place after an
  error or a changed result set. Keep unrelated controls available.
- Give temporary modes such as bulk selection a visible indicator and clear exit.
  Do not silently change a row's action from Open to Delete.
- Keep a popup's interaction model consistent across screen sizes. A modal should
  not become a hover card merely to fit. Focus must remain meaningful through open,
  close, collapse, and removal of a focused item.

## Place feedback at its cause

| State            | Visible expectation                                                      |
| ---------------- | ------------------------------------------------------------------------ |
| Input received   | Immediate local acknowledgment or pressed/selected state.                |
| Pending          | Persistent status near the initiating control or affected content.       |
| Confirmed result | Updated content and confirmation when the result is otherwise ambiguous. |
| Known failure    | Persistent explanation, retained input, and a recovery action.           |
| Unknown outcome  | Say confirmation is unavailable; do not claim success or failure.        |

Use measured progress only when a meaningful measurement exists. Otherwise use a
spinner or status; never fabricate percentages. A completed animation does not
prove that a save, upload, payment, or deletion succeeded.

Use the existing button, field, or row for feedback. Add a notification only when
the result would otherwise be missed or belongs outside that region. Keep important
results and recovery reachable after a toast disappears. Avoid celebratory or
aggressive shaking effects for stressful failures.

| Bad                                           | Good                                                                                 |
| --------------------------------------------- | ------------------------------------------------------------------------------------ |
| One save produces a toast, banner, and modal. | Show one local result, with a notification only if that region is no longer visible. |
| A spinner replaces the search field.          | Keep the field usable and show status beside it.                                     |
| Empty search results remove the filters.      | Preserve filters and offer Clear filters.                                            |
| A balance counts through invented values.     | Show the confirmed value directly and use a restrained local highlight.              |

## Use predictable timing and repetition

Use project conventions first. Without them, use these interaction defaults:

| Situation             | Default                                                                                                    |
| --------------------- | ---------------------------------------------------------------------------------------------------------- |
| Form validation       | Validate on submit; update invalid fields during correction. Do not reject the first incomplete keystroke. |
| Pending indicator     | Acknowledge pending immediately; delay only the decorative spinner by 150ms.                               |
| Initial tooltip hover | 500ms delay; keyboard focus receives immediate feedback.                                                   |
| Neighboring tooltip   | Skip hover delay if another tooltip closed within 300ms, when the component supports grouping.             |

Do not prolong an operation's visible completion to finish a decorative sequence.
Stop looping motion when it is no longer relevant. Frequent actions receive quiet,
immediate feedback; reserve expression for meaningful milestones. Keep repeated
use predictable rather than silently hiding labels or moving familiar controls.

## Example filter panel

Design one column with heading, labeled search field, status, results, and actions.
Use [layout](layout.md)'s spacing, [typography](typography.md)'s text roles,
[iconography](iconography.md)'s decorative search glyph, [color](color.md)'s state
pairs, and [surfaces](surfaces.md)'s raised panel treatment.

Before: the field disappears during search, a late result is presented as current,
and zero results hide the filters.

After: typing stays available; retained results are clearly marked stale; only
current results are presented as current; errors preserve the query and offer
Retry; an empty result keeps filters and Clear filters. Retrying returns the user
to a meaningful focus position. Specify the experience, not its request machinery.

For save feedback, distinguish Saving, confirmed Saved, known rejection, and an
unknown outcome. A checkmark belongs to confirmation. The same design must make
sense with a static icon and no animation.
