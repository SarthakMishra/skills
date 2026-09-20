# Motion design

Contents: purpose and frequency; timing; curves; springs; choreography; reduced motion; diagnosing feel.

## Choose what deserves to move

State what the motion should communicate: acknowledged input, a changed state, an object's destination, a relationship, a preview of consequences, or a specific brand quality. "Make it delightful" is an aspiration; convert it into a concrete experience.

| Context                                                 | Default posture                                                                           |
| ------------------------------------------------------- | ----------------------------------------------------------------------------------------- |
| Typing, keyboard traversal, scrubbing, pointer tracking | Keep input direct and immediate; animate only supporting changes that aid orientation     |
| Repeated toggles, menus, common navigation              | Small distance, short timing, no ornamental sequence; instant is valid                    |
| Occasional disclosure, panel, dialog                    | A short transition can establish origin and hierarchy                                     |
| Reordering, insertion, removal                          | Preserve identity and show where things moved when that helps                             |
| Rare meaningful success or introductory explanation     | Allow more expression, with a clear end and no blocked next action                        |
| Live measurements or data being compared                | Keep values truthful and readable; avoid a count-up through fictional intermediate values |

Do not infer frequency from input method alone. A keyboard-triggered change may still benefit from orientation cues; it must never delay focus, selection, or the next keystroke. Do not animate every row because a list exists.

## Distinguish time variables

**Response latency** is the time until the UI first acknowledges input. **Delay** is the time before an animation starts. **Duration** is how long it runs. **Easing** distributes change through that duration. **Spring settling** depends on the simulation and thresholds. **Dwell time** is how long a message remains readable. These are not interchangeable.

A 150ms entrance does not justify dismissing a confirmation after 150ms. A slow request does not justify delaying the pressed state. Starting the operation must not wait for its animation.

Keep units explicit: CSS accepts milliseconds or seconds; Motion duration/delay examples use seconds. A CSS token of 180ms becomes 0.18 seconds in such an API, not 180. Verify the receiving API rather than copying numbers blindly.

Use existing motion tokens. If there are none, these are starting values for typical web-app components, not laws or timings claimed verbatim from a book:

| Interaction                     | Starting range                                 | Useful initial choice              |
| ------------------------------- | ---------------------------------------------- | ---------------------------------- |
| Press acknowledgment            | Immediate onset; 80–120ms visual settling      | 100ms                              |
| Hover/color change              | 100–180ms                                      | 150ms                              |
| Small anchored menu/popover     | 120–220ms                                      | 180ms                              |
| Small overlay exit              | 80–180ms                                       | 120ms                              |
| Accordion or local expansion    | 180–280ms                                      | 220ms                              |
| Dialog entrance                 | 180–280ms                                      | 220ms                              |
| Large drawer/spatial relocation | 220–400ms                                      | 280ms                              |
| Rare expressive moment          | Depends on meaning, distance, and choreography | Prototype a short, finite sequence |

Tune duration together with distance and easing. A full-height drawer needs a different treatment from a 4px hint. If large motion feels slow, shorten its travel or reduce sequential stages before increasing its speed. If it is too fast to read, simplify the motion or allow more time. Long transitions need a reason; a fixed sub-300ms prohibition is not a substitute for judgment.

Exits often need less time because users are finished with the element, but continuity may justify equal timings. A deliberate hold and its release are a separate interaction; their timing should reflect the decision and recovery, not a general rule that all presses are slow.

## Choose an easing curve

A CSS cubic Bézier has fixed endpoints (0,0) and (1,1), with control points `(x1,y1,x2,y2)`. Horizontal position is normalized time; vertical position is normalized progress. The curve's slope represents rate of change. CSS requires x control values between 0 and 1; y may extend outside that range for overshoot.

| Intended feel                                     | Curve family              | Starting example                 |
| ------------------------------------------------- | ------------------------- | -------------------------------- |
| Start promptly and slow near the end              | Ease-out                  | `cubic-bezier(0.16, 1, 0.3, 1)`  |
| Move between two visible resting positions        | Ease-in-out               | `cubic-bezier(0.65, 0, 0.35, 1)` |
| Quiet color/opacity response                      | Mild easing               | `ease`                           |
| Constant rate, e.g. a rotating activity indicator | Linear                    | `linear`                         |
| Deliberately accelerate out of view               | Ease-in, used selectively | `cubic-bezier(0.4, 0, 1, 1)`     |

Treat these as fallback candidates. Do not replace a cohesive project curve because its numbers differ. Built-in curves are valid; custom curves give more control, not automatic quality.

Ease-out is a strong default for input-driven entrances. Avoid a long slow start that appears to ignore the action. Ease-in can serve a short departing object; assess its perceived delay. A transition between resting positions often benefits from smooth acceleration and deceleration. Linear spatial motion can feel mechanical but is correct for some continuous processes.

Tune in a curve editor or working preview. If adjusting numbers, compare one variable at a time: shape, then duration, then distance. Keep a small set of named curves instead of inventing one for each component.

Do not use an overshooting progress curve for opacity, progress values, or other properties whose meaningful range must remain bounded. Give different properties separate transitions where necessary.

## Springs

Use a spring when continuity of position and velocity matters: drag release, interruption, retargeting, or a tactile response. Use a tween when the precise timeline and choreography matter more. A spring is not synonymous with bounce.

Physical parameters:

- Stiffness controls restoring force. A higher value generally produces a faster response.
- Damping dissipates motion. A higher value generally reduces oscillation, but excessive damping slows the response.
- Mass affects inertia. A higher value generally slows the response if stiffness and damping stay unchanged.
- Initial velocity carries the gesture's direction and speed into release.
- Rest thresholds decide when the animation can finish. Poorly chosen thresholds can keep it running after visible movement stops.

For an ideal linear spring, the damping ratio is `damping / (2 * sqrt(stiffness * mass))`: below 1 oscillates, 1 is critical, above 1 is overdamped. Libraries use different APIs and stopping criteria; this is a tuning model, not a promise of identical rendered motion.

For Motion for React, an illustrative calm physical starting point is `{ type: "spring", stiffness: 400, damping: 40, mass: 1 }`. A duration-based alternative is `{ type: "spring", duration: 0.28, bounce: 0 }`. Choose one parameterization. In Motion, physical parameters override duration/bounce; do not imply that specifying both guarantees an exact duration. Verify against the installed version. See [Motion transitions](https://motion.dev/docs/react-transitions).

Keep direct manipulation under the pointer. Do not make an object lag behind the pointer while the person is placing it. Use elasticity at boundaries and a spring on release when useful. Preserve current position/velocity when retargeting; do not remount the object to restart its entrance.

## Spatial continuity and choreography

Anchor motion to its cause. A popover should expand from the trigger-side origin, including after collision placement flips. A centered dialog can use a centered origin. Avoid scaling text-heavy surfaces from zero; a tiny scale change such as 0.98 to 1 or a short translation with opacity is usually enough. A pure fade is also valid when spatial information is unnecessary.

Use consistent object identities and directional relationships. An overlay that appears above content should not inexplicably exit through an unrelated plane. An exit need not mechanically reverse every entrance, but it should preserve the model or express a meaningful destination.

Coordinate with restraint:

- Start with the container's animation. Its content can begin animating before the container finishes.
- Use stagger only when order/grouping deserves emphasis. A starting offset of 20–40ms with a capped total delay around 120ms can work for a small group. Do not apply index × delay to an unbounded list.
- Do not defer focus or useful content until the last stagger ends. If visible controls must wait, reconsider the choreography.
- Avoid shifting targets under a pointer while people try to select them. Keep exits and replacements stable enough to preserve place.
- Anticipation prepares for an action; do not add theatrical anticipation after input that should respond immediately.
- Follow-through and a little overshoot can express energy. Reserve squash/stretch for appropriate accents; do not distort readable text or every button.
- Shared-element transitions must preserve an object's identity and destination. Crossfade unrelated content rather than pretending it is the same object.

## Reduced motion is a designed variant

Honor the user's reduced-motion preference from the start, including during hydration and preference changes when applicable. Replace large translation, zoom, parallax, rotation, and elastic movement with an instant update or a brief, low-intensity opacity/color change only when helpful. No animation at all is a valid reduced-motion treatment.

Preserve feedback, state, focus, and final layout. Never make completion depend on `animationend` or `transitionend` firing. Reducing duration while retaining a large zoom is not sufficient.

Avoid unsolicited continuous motion near reading or working areas. Where automatic animation is useful, provide relevant pause/stop controls; reduced motion is not a substitute for them. See [W3C animation from interactions](https://www.w3.org/WAI/WCAG22/Understanding/animation-from-interactions.html) and [pause, stop, hide](https://www.w3.org/WAI/WCAG22/Understanding/pause-stop-hide.html).

## Translate vague feedback into a repair

| "Feels…"          | Inspect                                                    | Try                                                   |
| ----------------- | ---------------------------------------------------------- | ----------------------------------------------------- |
| Sluggish          | Start delay, slow initial curve, travel, serialized stages | Immediate response, shorter travel, overlap           |
| Abrupt            | Missing continuity, hard cut, wrong origin                 | Short fade/translation tied to the cause              |
| Floaty            | Excessively soft spring or long settling tail              | More appropriate stiffness/damping; reduce distance   |
| Jumpy on reversal | Remounts, stale frames, queued keyframes                   | Retarget from current state; stabilize identity       |
| Chaotic           | Too many simultaneous focal points                         | Keep one dominant motion; quiet the rest              |
| Cheap or bouncy   | Overshoot where precision is expected                      | Critically damped response or a tween                 |
| Lifeless          | Missing state feedback or bland uniformity                 | Strengthen useful feedback, then add a fitting accent |

Judge the repair at normal speed, with repeated use and realistic workload.
