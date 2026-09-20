# Make motion a system foundation

Read this when creating the system or changing an interaction or motion contract.
Motion communicates feedback, location, relationships, or progress. An instant
response is a valid recipe for frequent actions. Decorative movement needs an
explicit product purpose and must not compete with the task.

## Define shared motion decisions

Keep timing, easing, travel distance, and any spring configurations beside the
other foundations. Give recipes semantic names such as feedback, disclosure,
overlay entry, overlay exit, and reorder. Components consume those recipes rather
than choosing durations independently.

If no convention exists, these are provisional starting values for testing in the
product, not values prescribed by Atomic Design, Refactoring UI, Uber, or Dropbox:

| Role                    | Starting treatment                                 | When to tune                                           |
| ----------------------- | -------------------------------------------------- | ------------------------------------------------------ |
| Frequent input feedback | Instant, or a 120 ms color/opacity transition      | Remove animation if repetition makes it distracting    |
| Small disclosure        | 180 ms with a decelerating entry                   | Tune for size and travel; preserve a clear origin      |
| Overlay entry           | 220 ms, brief opacity change and small translation | Tune in the page context, including backdrop and focus |
| Exit                    | 140 ms with acceleration                           | Keep removal responsive and interruption correct       |

A candidate entry curve is `cubic-bezier(0.2, 0, 0, 1)` and a candidate exit curve
is `cubic-bezier(0.4, 0, 1, 1)`. Choose a small travel distance from the spacing
scale. Commit only the values the chosen feature uses. Springs are optional;
document their parameter units and purpose when the existing runtime supports
them. Avoid applying playful overshoot to every control.

Keep one authoritative definition for CSS and JavaScript consumers. Prefer CSS
transitions and keyframes for simple state changes. Use an existing animation
library for interruption, gestures, or coordinated layout when it solves a real
need. Adding motion does not automatically require a dependency.

## Specify a recipe as behavior

For every changed interaction, record:

- Trigger and state transition, including what happens on rapid repeated input.
- Animated element and properties, origin, travel, duration, easing or spring.
- Entry, exit, interruption or reversal, and any coordination with related elements.
- Reduced-motion treatment and how the same information remains available.
- Focus, pointer, keyboard, and mounting behavior during the transition.

For a popover, start movement at its trigger and use the shared entry and exit
recipes. Allow closing or reopening mid-transition. Let the accessible control
manage focus and open state. If an exiting element remains mounted, ensure
hidden controls are not still reachable. Reduced motion can make the transition
instant while preserving the same open state and focus behavior.

## Implement reduced motion and interruption

Honor `prefers-reduced-motion` in CSS and the installed library's equivalent for
JavaScript animation. Remove spatial motion, parallax, repeated pulses, and stagger
where appropriate. Use an immediate state change or a restrained opacity change
when it still helps. Loading must remain understandable through text or another
static cue when a spinner stops.

Scope overrides to the affected recipes. Globally setting every animation to zero
can break libraries that wait for lifecycle events. Application success, cleanup,
focus restoration, and user input must not depend on a cosmetic timeout or on
`animationend`/`transitionend` firing. Respect the underlying control's supported
presence and reduced-motion behavior.

Transition named properties rather than `transition-all`. Prefer transform and
opacity when they express the intended change. Animate layout only when that
movement improves understanding, then measure its cost. Avoid competing CSS and
JavaScript animations on the same property. A long list must not accumulate an
unbounded stagger before the final items become usable.

## Verify recipes, not just screenshots

Test at normal speed and with reduced motion. Toggle or reverse the animation
rapidly, provide input during entry and exit, and unmount the component during
animation. Check keyboard focus and pointer access throughout. Verify JavaScript
motion against server rendering and preference changes when relevant. Use slow
playback to locate a discontinuity, then judge the result at normal speed.

Document representative recipes in Storybook when adopted, or link to concrete
app examples from `DESIGN.md`. Screenshots cover resting states; they cannot prove
timing, interruption, or reduced-motion behavior.
