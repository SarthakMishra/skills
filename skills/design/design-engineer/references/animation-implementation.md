# Animation implementation

Load the design treatment from `design-system`'s motion guidance. This reference owns
mechanisms, spring parameters, gesture release, and rendering cost. Keep design
tokens authoritative; the examples below implement a chosen treatment.

## Preserve timing units

CSS accepts milliseconds or seconds. APIs such as Motion express duration and
delay in seconds: 180ms becomes 0.18 seconds, not 180. Verify the receiving API and
keep response latency, delay, animation duration, and status dwell time separate.
Starting an operation and assigning focus must not wait for its animation.

## Choose the lightest suitable motion mechanism

| Need                                                 | Usual choice                            | Watch for                                           |
| ---------------------------------------------------- | --------------------------------------- | --------------------------------------------------- |
| Hover, press, color, or disclosure with two states   | CSS transition                          | Property scope and interruptible reversal           |
| Simple entry without custom mounting effects         | CSS with `@starting-style` if supported | Entry support does not solve exit presence          |
| Deliberate finite sequence or looping indicator      | CSS keyframes                           | Repetition, cancellation, reduced motion            |
| Programmatic timeline/control without a library      | Web Animations API                      | Cancel/finish handling and durable final styles     |
| Gesture release, spring, shared layout, managed exit | Existing motion library                 | Bundle cost, identity, focus and presence lifecycle |

### Check presence and interruption

- Entry and exit through `display: none` can require
  `transition-behavior: allow-discrete` and additional properties. A fade does not
  automatically handle unmounting, top-layer overlays, or focus. Check support and
  provide a usable static fallback. See
  [MDN starting style](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/@starting-style).
- A CSS transition can retarget smoothly from its current value, but generally
  does not preserve velocity like a physical spring.
- A restarted keyframe can jump. Keyframes are valid when interruption is managed.
- For Motion, preserve stable keys and use its presence and layout mechanisms.
  Maintain semantics and input separately. A presence animation is not a focus
  trap. Verify the API against the installed version before copying a recipe.

## Springs

Use a spring when continuity of position and velocity matters, such as drag
release, interruption, retargeting, or a tactile response. Use a tween when precise
timing and choreography matter more. A spring does not require bounce.

### Tune physical parameters

- Stiffness controls restoring force. A higher value generally produces a faster
  response.
- Damping dissipates motion. A higher value generally reduces oscillation, but
  excessive damping slows the response.
- Mass affects inertia. A higher value generally slows the response if stiffness
  and damping stay unchanged.
- Initial velocity carries the gesture's direction and speed into release.
- Rest thresholds decide when the animation can finish. Poorly chosen thresholds
  can keep it running after visible movement stops.

For an ideal linear spring, the damping ratio is
`damping / (2 * sqrt(stiffness * mass))`:

- Below 1 oscillates.
- At 1, damping is critical.
- Above 1 is overdamped.

Libraries use different APIs and stopping criteria. This model helps with tuning;
it does not promise identical rendered motion.

### Choose one Motion parameterization

| Starting approach     | Example                                                    |
| --------------------- | ---------------------------------------------------------- |
| Calm physical spring  | `{ type: "spring", stiffness: 400, damping: 40, mass: 1 }` |
| Duration-based spring | `{ type: "spring", duration: 0.28, bounce: 0 }`            |

Default to the physical spring for drag release and interrupted retargeting.
Use the duration-based spring for a fixed presentation sequence. Keep bounce at
zero for routine controls; add overshoot only for an explicitly chosen expressive
treatment. An exact clock deadline needs a tween, not a spring settling estimate.

In Motion, physical parameters override duration and bounce. Specifying both does
not guarantee an exact duration. Verify against the installed version. See
[Motion transitions](https://motion.dev/docs/react-transitions).

### Preserve direct manipulation

- Keep the object under the pointer while the person places it.
- Default to clamping movement at boundaries. Retain elasticity when the existing
  gesture pattern uses it; use a spring to return an undismissed object on release.
- Preserve current position and velocity when retargeting. Do not remount the
  object to restart its entrance.

## Gesture tuning

- Use distance and recent directional velocity. A single average velocity since
  pointer-down can misread a pause or reversal.
- Specify units, such as CSS pixels per millisecond, and tune thresholds for the
  component size. Do not copy an unexplained threshold between components.
- Return the component to its starting position when the gesture falls below the
  dismissal threshold.

## Performance is an observed property

### Choose properties and measure layout

- Prefer transforms and opacity when they express the intended layout truthfully.
  They are often compositor-friendly, but syntax, CSS versus JavaScript, or a
  library name does not guarantee hardware acceleration.
- Use layout animation when surrounding content must move, as in an accordion.
  Keep its scope small, avoid layout thrashing, and profile it. Scaling that crushes
  text and leaves empty layout space is not an adequate substitute.
- Separate geometry reads from writes. Avoid measuring every item on every pointer
  event.
- Account for fonts, images, responsive layouts, and content updates when measuring
  changing dimensions. Do not force one fixed measured height forever.

### Verify rendering cost

- Large blur, backdrop filters, shadows, clipping, huge surfaces, and many promoted
  layers can cost paint or memory. Do not use blur to conceal a state bug or request
  race.
- Add `will-change` only for a measured need and remove it when no longer useful.
- Motion's independent transform values can have different acceleration
  characteristics from a full transform string. Check the installed library,
  browser, property, and actual animation before promising a fix for dropped frames.
  See [Motion performance](https://motion.dev/docs/performance).
- Test under realistic rendering and network work, and on representative hardware
  when available. A smooth isolated demo does not prove the production screen is
  smooth.

## Example filter panel motion

Apply this to the [filter-panel spec](interaction-specs.md#example-filter-panel).
Keep the overlay library's accessibility and placement logic. These values assume
no project motion tokens.

| Part              | Treatment                                                                                      | Interruption / reduced motion                                                |
| ----------------- | ---------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------- |
| Panel entrance    | 180ms, opacity 0 to 1, scale 0.98 to 1, trigger-side origin, ease-out default curve, no delay. | Retarget from the current position; instant final state for reduced motion.  |
| Panel exit        | Reverse opacity and scale over 120ms.                                                          | Reopen invalidates removal; instant removal still performs cleanup.          |
| Focus and typing  | Immediate; not part of the visual timeline.                                                    | Preserve the component's focus contract through reversal and closure.        |
| Pending indicator | Display after the microinteraction delay; use a 700ms linear rotation while pending.           | Stop on settlement or unmount; keep the spinner static under reduced motion. |

Bad: a 180ms timeout starts the query or moves focus only after the entrance.
Good: open state and the query layer run immediately; the panel presentation
animates independently. The spinner's duration describes a decorative rotation,
not a request deadline or required waiting time.

Use the [view and spinner CSS](react-tailwind.md#filter-panel-view). The host overlay
must supply presence and transform origin; copying that view does not implement
focus trapping, collision placement, or an exit lifecycle.

## Example contextual icon change

Use a quiet 150ms opacity cross-fade for a user-triggered state change when the
project has no icon-motion pattern. Keep the 20px icon slot fixed. Use the same
ease-out default curve for both glyphs and no delay, blur, bounce, or scale.

The new icon represents an actual state, such as muted or unmuted. For a save,
the checkmark represents server confirmation. Keep the control's accessible name
and state meaningful independently of the glyph.

| Bad                                                          | Good                                                                            |
| ------------------------------------------------------------ | ------------------------------------------------------------------------------- |
| Remount the whole button with a new key to animate its icon. | Keep the button and focus; cross-fade decorative glyphs in one fixed slot.      |
| Mount a success glyph before the operation is confirmed.     | Derive the glyph from the confirmed state supplied by the data layer.           |
| Apply a large blur and scale to every icon hover.            | Leave static and frequent hover icons still; animate a meaningful state change. |

See the [CSS icon recipe](react-tailwind.md#contextual-icon-recipe). It starts at
the correct initial state without playing an entrance. Under reduced motion,
swap immediately and retain the static state cue. Keep an established expressive
icon treatment if it passes the same state, focus, and reduced-motion checks.
