# React and Tailwind implementation

Contents: inspect first; state and identity; styling and tokens; choosing motion tools; performance; implementation checks.

## Inspect before choosing an implementation

Use this reference when the task includes React or Tailwind. Read the app's
package versions, components, styling conventions, theme, router, and async state
patterns. Use examples for the relevant tool only. Follow the project's stack;
this reference does not require a framework migration or a new dependency.

Keep the stack's current versions authoritative. Tailwind v4 CSS-first tokens and v3 configuration differ. Motion imports and APIs may differ across installed versions. Check official documentation when compatibility matters.

## Keep state coherent

- Represent mutually exclusive states with a single state value or discriminated union when that simplifies the component. A small reducer can express nontrivial transitions; an FSM library is optional, not a prerequisite for a polished button.
- Separate domain/request status from presentation presence. An operation can succeed while an exit is still playing. Do not hide a failed operation because an animation callback says "done."
- Preserve stable component identity and keys. Do not use changing/random keys to replay entrances; remounting can erase input and focus. Avoid array indices for reorderable item identity. See [React state preservation](https://react.dev/learn/preserving-and-resetting-state).
- Read current values in asynchronous callbacks and prevent old requests/timers from updating a newer interaction. Reuse the existing query/mutation layer's contract.
- Keep gesture-frame values out of broad React render state when an imperative ref or existing motion value fits. Keep semantic state in React.
- Clean up animations, timers, observers, media-query listeners, and pointer handlers. Effect setup/cleanup must tolerate React development checks.
- Keep focus changes tied to the interaction, not to an arbitrary timeout. Inspect the primitive's behavior before adding another focus effect.
- Make completion safe when motion is canceled or disabled. Never rely only on transition/animation end events to commit data, unlock controls, or remove interaction blockers.

## Tailwind: style roles and states

Use existing utilities and tokens for layout, colors, radius, type, and elevation. Prefer shared component variants over duplicated long class lists. Keep class names statically discoverable; use CSS variables or explicit variant maps for runtime values, not constructed fragments such as `bg-${color}-500`.

Choose exact animated properties. Tailwind's plain `transition` can cover a broad list; `transition-all` is broader still. Use `transition-colors`, `transition-transform`, or an explicit property list matching the intended change. Tailwind v4's scale/translate/rotate utilities can use individual transform properties; include those if writing a custom list. Inspect computed styles. See [Tailwind transitions](https://tailwindcss.com/docs/transition-property).

Express keyboard focus, pressed, data/ARIA states, reduced motion, and supported hover explicitly. State cues should exist without motion. A focus ring should not fade in after focus arrives. See [Tailwind state variants](https://tailwindcss.com/docs/hover-focus-and-other-states).

A small Tailwind v4 token example, only if equivalent tokens do not already exist:

```css
@import "tailwindcss";

@theme {
  --ease-ui-out: cubic-bezier(0.16, 1, 0.3, 1);
  --ease-ui-move: cubic-bezier(0.65, 0, 0.35, 1);
}

:root {
  --ui-duration-fast: 120ms;
  --ui-duration-enter: 180ms;
  --ui-duration-exit: 120ms;
}
```

Use theme namespaces for generated utilities and ordinary custom properties for values that do not need them. Do not globally override defaults for a local task. See [Tailwind theme variables](https://tailwindcss.com/docs/theme).

This illustrative button keeps focus immediate and limits motion to users who have not requested reduction. Substitute the app's own component and color tokens:

```tsx
<button
  type="button"
  className="
    inline-flex min-h-11 items-center justify-center gap-2 rounded-md
    bg-slate-900 px-4 py-2 text-sm font-semibold text-white
    hover:bg-slate-800 active:bg-slate-950
    focus-visible:outline-2 focus-visible:outline-offset-2
    focus-visible:outline-slate-700
    motion-safe:transition-[background-color,scale]
    motion-safe:duration-[120ms] motion-safe:ease-ui-out
    motion-safe:active:scale-[0.98]
  "
>
  Apply filters
</button>
```

In Tailwind v4 the `hover:` variant is capability-gated. Check that assumption for older versions or handwritten selectors. A CSS fallback is `@media (hover: hover)`. A touch device with an attached mouse may still support hover; essential controls must work by focus and tap.

The scale here is optional and targets a compact control. Do not reuse it on dense rows by default. This is a visual example, not an async submission or disabled-state implementation.

For a controlled toggle, connect appearance and semantics to the same value:

```tsx
<button
  type="button"
  aria-pressed={muted}
  onClick={() => setMuted((value) => !value)}
  className="rounded-md border px-3 py-2
    aria-pressed:bg-slate-900 aria-pressed:text-white
    focus-visible:outline-2 focus-visible:outline-offset-2"
>
  Mute alerts
</button>
```

Keep the accessible name stable for a toggle with `aria-pressed`; the pressed state communicates whether it is on. Add the project's complete border, contrast, and state styling.

## Choose the lightest suitable motion mechanism

| Need                                                 | Usual choice                            | Watch for                                           |
| ---------------------------------------------------- | --------------------------------------- | --------------------------------------------------- |
| Two-state hover, press, color, disclosure            | CSS transition                          | Property scope and interruptible reversal           |
| Simple entry without custom mounting effects         | CSS with `@starting-style` if supported | Entry support does not solve exit presence          |
| Deliberate finite sequence or looping indicator      | CSS keyframes                           | Repetition, cancellation, reduced motion            |
| Programmatic timeline/control without a library      | Web Animations API                      | Cancel/finish handling and durable final styles     |
| Gesture release, spring, shared layout, managed exit | Existing motion library                 | Bundle cost, identity, focus and presence lifecycle |

For entry/exit through `display: none`, newer CSS features can require `transition-behavior: allow-discrete` and additional properties. Do not assume a fade handles unmounting, top-layer overlays, or focus. Check support and provide a usable static fallback. See [MDN starting style](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/@starting-style).

A CSS transition can retarget smoothly from its current value. A restarted keyframe can jump; keyframes are not inherently forbidden, but interruption must be managed. CSS transitions do not generally preserve velocity like a physical spring.

For Motion, preserve stable keys and let its presence/layout mechanisms do their intended job, while separately maintaining semantics and input. A presence animation is not a focus trap. Verify its API against the installed version before copying a recipe.

## Performance is an observed property

Prefer transforms and opacity for movement when they express the intended layout truthfully. They are often compositor-friendly, but hardware acceleration is not guaranteed by syntax, CSS versus JavaScript, or a library name.

Layout animation can be justified when surrounding content must actually move, as in an accordion. Keep its scope small, avoid layout thrashing, and profile it. A scale transform that crushes text and leaves empty layout space is not an adequate substitute.

Keep geometry reads separate from writes; avoid measuring every item on every pointer event. For changing dimensions, account for fonts, images, responsive layouts, and content updates. Do not force one fixed measured height forever.

Large blur, backdrop filters, shadows, clipping, huge surfaces, and many promoted layers can cost paint or memory. Do not use blur to conceal an underlying state/race problem. Add `will-change` only for a measured need and remove it when no longer useful.

Motion's independent transform values can have different acceleration characteristics from animating a full transform string. Check the installed library, browser, property, and actual animation; do not promise a rewrite will fix all dropped frames. See [Motion performance](https://motion.dev/docs/performance).

Test under realistic rendering and network work, and on representative hardware when available. A smooth isolated demo does not prove the production screen is smooth.

## Before finishing

Confirm that the implementation still works with zero animation duration, rapid reversal, component unmount, keyboard input, touch input where relevant, and the relevant loading/failure state. Run the project's existing type/build checks when code changes warrant them. Add focused behavioral tests for meaningful state risks; do not add tests that merely assert a timing token's spelling.
