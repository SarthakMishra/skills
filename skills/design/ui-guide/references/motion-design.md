# Motion design

Name what the motion should communicate before choosing timing or easing. Use
the repair table at the end when diagnosing an existing animation.

Read [interaction design](interaction-design.md) first for pending, confirmed,
error, or unknown state. Use [surfaces](surfaces.md) for the geometry being moved
and [iconography](iconography.md) for the glyph being swapped. This reference owns
the design treatment, not animation libraries, request state, or DOM cleanup.

## Choose what deserves to move

Write one sentence naming what motion communicates: input received, a changed
state, origin or destination, a preview, or an explicitly requested brand effect.
If no sentence ties the effect to the task, keep the change instant.

### Direct input and common changes

| Context                                                 | Default posture                                                                       |
| ------------------------------------------------------- | ------------------------------------------------------------------------------------- |
| Typing, keyboard traversal, scrubbing, pointer tracking | Keep input direct and immediate; animate only supporting changes that aid orientation |
| Repeated toggles and common navigation                  | Change state immediately; no stagger or decorative entrance                           |
| Menus, disclosures, panels, dialogs                     | Use the corresponding duration and movement defaults below                            |
| Reordering, insertion, removal                          | Animate displacement after a direct user action; skip it on background refresh        |

### Expression and live data

| Context                                             | Default posture                                                                           |
| --------------------------------------------------- | ----------------------------------------------------------------------------------------- |
| Rare meaningful success or introductory explanation | Allow more expression, with a clear end and no blocked next action                        |
| Live measurements or data being compared            | Keep values truthful and readable; avoid a count-up through fictional intermediate values |

Do not infer frequency from input method alone. A keyboard-triggered change may
benefit from orientation cues, but must never delay focus, selection, or the next
keystroke. Do not animate every row because a list exists.

## Distinguish time variables

| Term             | Meaning                                        |
| ---------------- | ---------------------------------------------- |
| Response latency | Time until the UI first acknowledges input     |
| Delay            | Time before an animation starts                |
| Duration         | How long the animation runs                    |
| Easing           | How change is distributed through the duration |
| Dwell time       | How long a message remains readable            |

Spring settling depends on the simulation and stopping thresholds. These
measurements are not interchangeable.

- A 150ms entrance does not justify dismissing a confirmation after 150ms.
- A slow request does not justify delaying the pressed state. Start the operation
  without waiting for its animation.
- Record durations in milliseconds and keep them distinct from feedback dwell
  time and response latency. Implementation must preserve those values when
  converting to the receiving API's units.

### Use exact defaults when tokens are missing

Use the equivalent project token first. Otherwise use the values below without
selecting a new number from a range. These are this guide's design defaults, not
accessibility thresholds. Depart for an explicit user requirement, an
accessibility or platform constraint, or a defect reproduced in a preview.
Record the replacement and reason.

#### Controls and small overlays

| Interaction                             | Duration | Treatment                                                                 |
| --------------------------------------- | -------- | ------------------------------------------------------------------------- |
| Press scale, when the component uses it | 100ms    | Scale inner presentation from 1 to 0.98; keep the outer hit target fixed. |
| Hover or pressed color                  | 150ms    | Transition background color; show focus immediately without a transition. |
| Anchored menu or popover entrance       | 180ms    | Opacity 0 to 1 and scale 0.98 to 1 from the trigger-side origin.          |
| Anchored menu or popover exit           | 120ms    | Reverse opacity and scale; reopen interrupts the exit.                    |

#### Expansion and larger movement

| Interaction                   | Entrance / exit | Treatment                                                                            |
| ----------------------------- | --------------- | ------------------------------------------------------------------------------------ |
| Accordion                     | 220ms / 220ms   | Animate measured block size so neighboring content follows.                          |
| Dialog                        | 220ms / 150ms   | Opacity and scale 0.98 to 1 around the center; reverse on exit.                      |
| Drawer                        | 280ms / 220ms   | Translate from its off-screen edge to its resting position; reverse on exit.         |
| User-driven list displacement | 180ms           | Move surviving items from their previous to current positions; keep stable identity. |

Use no entrance delay and no blur for these defaults. For a requested expressive
sequence, write a separate treatment with exact values, a finite end, and no
blocked controls. Do not apply it to routine interactions.

### Tune for the actual movement

- Tune duration with distance and easing. A full-height drawer needs a different
  treatment from a 4px hint.
- If large motion feels slow, shorten its travel or reduce sequential stages
  before increasing speed. If it is too fast to read, simplify it or allow more time.
- Give long transitions a reason. A fixed sub-300ms prohibition does not replace
  judgment.
- Use the exit duration in the table. Preserve equal timings for accordion
  expansion and collapse because the surrounding layout moves in both directions.
- Treat a deliberate hold and release as a separate interaction. Set its timing
  for the decision and recovery, not a general rule that all presses are slow.

## Choose an easing curve

Read a CSS cubic Bézier as follows:

- Endpoints are fixed at `(0,0)` and `(1,1)`. Control points are `(x1,y1,x2,y2)`.
- Horizontal position is normalized time; vertical position is normalized progress.
  The curve's slope represents rate of change.
- CSS requires x control values between 0 and 1. The y values may extend outside
  that range for overshoot.

| Intended feel                                     | Curve family              | Default curve                    |
| ------------------------------------------------- | ------------------------- | -------------------------------- |
| Start promptly and slow near the end              | Ease-out                  | `cubic-bezier(0.16, 1, 0.3, 1)`  |
| Move between two visible resting positions        | Ease-in-out               | `cubic-bezier(0.65, 0, 0.35, 1)` |
| Quiet color/opacity response                      | Mild easing               | `ease`                           |
| Constant rate, e.g. a rotating activity indicator | Linear                    | `linear`                         |
| Deliberately accelerate out of view               | Ease-in, used selectively | `cubic-bezier(0.4, 0, 1, 1)`     |

Use the matching project curve. Without one, apply the curve in the table.
Use the ease-out curve for the overlay entrances and exits above, the ease-in-out
curve for accordion and list displacement, and `ease` for color changes.

### Match the curve to the action

- Default to ease-out for input-driven entrances. Avoid a long slow start that
  appears to ignore the action.
- Use ease-in selectively for a short departing object. Assess its perceived delay.
- Use ease-in-out between two visible resting positions.
- Linear spatial motion can feel mechanical but is correct for some continuous
  processes.

### Tune and constrain the curve

1. Compare shape, then duration, then distance in a curve editor or working preview.
   Change one variable at a time.
2. Keep a small set of named curves instead of inventing one for each component.
3. Keep opacity, progress values, and other bounded properties free of overshooting
   progress curves. Give different properties separate transitions where necessary.

## Choose spring-like or timed movement

Use spring-like movement when a release or reversal should preserve momentum.
Keep direct manipulation under the pointer; a decorative trailing effect must not
make the object being placed lag behind input. Keep routine controls calm, without
visible bounce. Use an explicitly timed treatment when a sequence needs a fixed
duration.

Default to firm boundaries. Preserve an existing elastic gesture when it explains
the boundary without losing control. An undismissed object returns to its starting
position. The implementation chooses physics parameters and cancellation mechanics;
the design specifies the intended response, destination, and interruption behavior.

## Spatial continuity and choreography

### Establish origin and destination

- Anchor motion to its cause. A popover should expand from the trigger-side origin,
  including after collision placement flips. A centered dialog can use a centered
  origin.
- Avoid scaling text-heavy surfaces from zero. A scale change such as 0.98 to 1 or
  a short translation with opacity is usually enough. Use a pure fade when spatial
  information is unnecessary.
- Keep object identities and directional relationships consistent. An overlay
  above content should not exit through an unrelated plane without explanation.
  An exit can differ from its entrance if it preserves the model or communicates
  a meaningful destination.

### Coordinate with restraint

- Start with the container's animation. Its content can begin animating before the
  container finishes.
- Default to no stagger. For an infrequent explanatory sequence where each group
  introduces the next, use 30ms offsets and cap total delay at 120ms. Do not apply
  index × delay to an unbounded list.
- Do not defer focus or useful content until the last stagger ends. If visible
  controls must wait, reconsider the choreography.
- Avoid shifting targets under a pointer while people try to select them. Keep
  exits and replacements stable enough to preserve place.

### Add expression only when it helps

- Anticipation prepares for an action. Do not add theatrical anticipation after
  input that should receive an immediate response.
- Follow-through and a little overshoot can express energy. Reserve squash and
  stretch for appropriate accents. Do not distort readable text or every button.
- Shared-element transitions must preserve an object's identity and destination.
  Crossfade unrelated content rather than pretending it is the same object.

## Reduced motion is a designed variant

1. Honor the user's preference from the start, including during hydration and
   preference changes when applicable.
2. Make the default reduced-motion treatment instant. Remove translation, zoom,
   parallax, rotation, and elastic movement. Retain a static color or icon cue.
   Use a fade only if the project's reduced-motion pattern explicitly calls for it.
3. Preserve feedback, state, focus, and final layout. Completion and input must work without any animation. Shortening a large zoom is not sufficient.

Avoid unsolicited continuous motion near reading or working areas. Where automatic
animation is useful, provide relevant pause and stop controls. Reduced motion does
not replace them. See
[W3C animation from interactions](https://www.w3.org/WAI/WCAG22/Understanding/animation-from-interactions.html)
and [pause, stop, hide](https://www.w3.org/WAI/WCAG22/Understanding/pause-stop-hide.html).

## Example filter-panel treatment

Use the menu/popup defaults above for the panel from
[interaction design](interaction-design.md#example-filter-panel). Place the origin
at its trigger and preserve the visual relationship after placement changes.
Typing and focus remain immediate during entrance, exit, and reversal. Pending
status is independent of the visual transition.

For a contextual icon, default to a quiet 150ms opacity cross-fade, the ease-out
curve above, no delay, and a fixed 20px slot. Use no blur, bounce, or scale unless
the established design calls for that expression. Keep the first visible state
at rest and swap instantly under reduced motion. The new glyph represents actual
state; a success glyph requires a confirmed result.

## Good and bad motion decisions

| Bad                                                 | Good                                                                                      |
| --------------------------------------------------- | ----------------------------------------------------------------------------------------- |
| "Use something between 120 and 220ms for the menu." | "Use the project's menu token; otherwise 180ms, ease-out, no delay, trigger-side origin." |
| Focus waits for the menu entrance to complete.      | Move focus on open; animate only its presentation.                                        |
| Add blur and bounce to every settings toggle.       | Update the selected state immediately and use the existing color transition.              |
| Reduced motion runs the same drawer slide in 20ms.  | Place the drawer at its final position immediately, with focus and dismissal intact.      |

## Translate vague feedback into a repair

### Timing and continuity

| Feels             | Inspect                                                    | Try                                                  |
| ----------------- | ---------------------------------------------------------- | ---------------------------------------------------- |
| Sluggish          | Start delay, slow initial curve, travel, serialized stages | Immediate response, shorter travel, overlap          |
| Abrupt            | Missing continuity, hard cut, wrong origin                 | Short fade/translation tied to the cause             |
| Floaty            | Excessively soft spring or long settling tail              | More appropriate stiffness/damping; reduce distance  |
| Jumpy on reversal | Visual resets, delayed reversal, queued movement           | Reverse from the current position; preserve identity |

### Emphasis and expression

| Feels           | Inspect                                    | Try                                                   |
| --------------- | ------------------------------------------ | ----------------------------------------------------- |
| Chaotic         | Too many simultaneous focal points         | Keep one dominant motion; quiet the rest              |
| Cheap or bouncy | Overshoot where precision is expected      | Critically damped response or a tween                 |
| Lifeless        | Missing state feedback or bland uniformity | Strengthen useful feedback, then add a fitting accent |

Judge the repair at normal speed, with repeated use and realistic workload.
