# Use motion in shadcn components

Read this file when creating a motion foundation or changing an animated React
interaction. Start with the installed shadcn component, Tailwind tokens, and
state attributes. Keep motion only when it improves the user's task.

## Decide whether motion earns its cost

Ask these questions before writing animation code:

1. What state, relationship, or feedback does the movement explain?
2. How often will the user see it?
3. Does it make the next action feel faster or slower?

Use instant feedback for keyboard navigation, command menus, repeated list
selection, and interactions used throughout the day. A rare confirmation or
feature explanation can use motion for orientation or delight.

Bad: animate every hover in a dense table. The repeated delay slows scanning.

Good: animate a dialog entering from its trigger so the user can follow where it
came from, then make repeated tooltip changes instant after the first tooltip opens.

## Use fast, named recipes

Keep UI motion under 300ms unless the movement represents a larger state change.
Use a named recipe in the Tailwind theme or the component's existing shadcn
styles. Start UI entry with `ease-out` so the response begins quickly.

| Interaction              | Default                                                    |
| ------------------------ | ---------------------------------------------------------- |
| Press feedback           | `:active { transform: scale(0.97); }`                      |
| Input feedback           | instant or 120ms color/opacity                             |
| Disclosure               | 180ms with a fast entry                                    |
| Dialog, popover, or menu | 180ms to 220ms with a small translation and opacity change |
| Exit                     | about 140ms; keep removal responsive                       |

Bad: use a 400ms `ease-in` entry for a menu. It delays the first useful frame.

Good: use a 180ms `ease-out` entry, then check it at normal speed and during
rapid reopening.

Do not add a separate duration for every component. Reuse the project's motion
tokens and keep the recipe beside the shadcn component contract.

## Connect movement to its origin

When an overlay opens, make it appear to come from its trigger. Set
`transform-origin` from the positioning library's variable when available. For
Radix-backed shadcn components, use the provided origin variable. For Base UI,
use its equivalent. Do not hardcode `center` when the overlay can open from
different sides.

If an element scales, start at `0.9` or higher. Never animate an interface
control from `scale(0)`, which makes it appear from nowhere.

```css
/* Good: use the library's origin and named properties. */
.popover {
  transform-origin: var(--radix-popover-content-transform-origin, center);
  transition:
    opacity 180ms ease-out,
    transform 180ms ease-out;
}

/* Bad: every popover grows from the center with an unbounded transition. */
.popover {
  transform-origin: center;
  transition: all 400ms ease-in;
}
```

The variable name is illustrative. Use the variable exposed by the installed
Radix or Base UI component.

## Keep repeated interactions instant

Give a tooltip a small initial delay to avoid accidental activation. Once one
tooltip in the group is open, remove the delay and animation for the next
tooltip. Follow the installed library's instant-state attribute when it provides
one, such as `data-instant`.

Do the same for keyboard-driven state changes. The highlight, selection, or
menu update should follow the key press without an animated lag.

Bad: animate every arrow-key movement in a command menu.

Good: animate the first menu opening, then update the active item immediately for
each arrow key.

## Keep state independent of animation

Use CSS transitions or keyframes for simple state changes. Use an installed
animation library for gestures or coordinated layout when it already solves the
problem. Change React state immediately. Do not wait for a timeout or animation
event to complete the user's action.

```tsx
// Good: state changes now; CSS controls presentation.
setOpen(false);

// Bad: cosmetic timing controls application state.
setTimeout(() => setOpen(false), 400);
```

Transition named properties. Prefer opacity and transform. Avoid competing CSS
and JavaScript animations on the same property.

Treat animation as presentation. Application state determines pending, success,
error, and recovery; a spinner or completed animation never proves an operation
succeeded. Keep status, focus, and recovery understandable with motion disabled.

If a short crossfade still looks harsh after tuning duration and easing, test a
small blur as a last resort. Remove it if it reduces text or icon clarity.

## Support reduced motion and interruption

For `prefers-reduced-motion`, remove spatial travel, parallax, repeated pulses,
and long staggers. Keep the state change and a static cue. Scope the override to
the affected recipe. Do not globally zero every animation if a component library
needs lifecycle events.

Check focus, keyboard input, pointer input, rapid reversal, unmounting, and input
during entry and exit. An exiting control must not remain keyboard reachable.

## Verify the recipe

1. Confirm the animation has a purpose and an appropriate interaction frequency.
2. Test normal speed, reduced motion, and repeated keyboard input.
3. Reverse or repeat the action before the first transition finishes.
4. Check origin, focus, accessible state, and content during entry and exit.
5. Confirm the component feels responsive in its real layout and theme.
