# Interface implementation with React and Tailwind

Read the `react-guide` skill for React render, state, Effects, Actions, data,
composition, refs, transitions, memoization, and server/client boundaries. This
reference adds interface-specific Tailwind integration and controlled-view
recipes.

Read the installed React and Tailwind versions and local component conventions
before choosing an API. Use only the sections relevant to the project's stack.

Use the relevant visual and interaction guidance from `design-system`.
Define operation ownership with [component patterns](component-patterns.md#async-operations)
and implement the motion treatment with [animation implementation](animation-implementation.md).
This file translates those decisions into code; it does not replace the app's query,
theme, or accessible overlay system.

Use the project's canonical component imports from the design-system work and
apply the UX writer's reviewed strings, variables, and localization conventions.
Labels in these recipes are examples, not product-ready copy. If a final string
does not fit, revisit its layout or wording with the owning companion instead of
silently truncating it or changing its consequence.

## Inspect before choosing an implementation

1. Read the app's package versions, components, styling conventions, theme, router,
   and async state patterns.
2. Use examples for the relevant tool only. Follow the project's stack; this
   reference does not require a framework migration or a new dependency.
3. Check official documentation when compatibility matters. Tailwind v4 CSS-first
   tokens and v3 configuration differ. Motion imports and APIs may also differ
   across installed versions.

Treat installed versions as authoritative.

## Tailwind: style roles and states

### Reuse tokens and scope transitions

- Use existing utilities and tokens for layout, colors, radius, type, and elevation.
  Prefer shared component variants over duplicated long class lists.
- Keep class names statically discoverable. Use CSS variables or explicit variant
  maps for runtime values, not constructed fragments such as `bg-${color}-500`.
- Choose exact animated properties. Plain `transition` can cover a broad list;
  `transition-all` is broader still. Use `transition-colors`, `transition-transform`,
  or an explicit list matching the intended change.
- Tailwind v4 scale, translate, and rotate utilities can use individual transform
  properties. Include those in custom lists and inspect computed styles. See
  [Tailwind transitions](https://tailwindcss.com/docs/transition-property).

`transition-colors` includes outline color. When focus changes the outline color,
use an explicit list such as `transition-[background-color]` to keep focus instant.

### Keep state cues immediate

Express keyboard focus, pressed, data and ARIA states, reduced motion, and supported
hover explicitly. Keep state cues available without motion. A focus ring should
not fade in after focus arrives. See
[Tailwind state variants](https://tailwindcss.com/docs/hover-focus-and-other-states).

### Good: add only missing tokens

A small Tailwind v4 token example, only if equivalent tokens do not already exist:

```css
@import "tailwindcss";

@theme {
  --ease-ui-out: cubic-bezier(0.16, 1, 0.3, 1);
  --ease-ui-move: cubic-bezier(0.65, 0, 0.35, 1);
}

:root {
  --ui-duration-color: 150ms;
  --ui-duration-enter: 180ms;
  --ui-duration-exit: 120ms;
}
```

Use theme namespaces for generated utilities and ordinary custom properties for
values that do not need them. Do not globally override defaults for a local task.
See [Tailwind theme variables](https://tailwindcss.com/docs/theme).

### Bad: animate every property and delay focus feedback

```tsx
<button
  type="button"
  className="outline-2 outline-transparent transition-all duration-300 focus-visible:outline-slate-700"
>
  Apply filters
</button>
```

This also transitions properties unrelated to the intended color feedback. Use a
specific property list so focus appearance does not wait for that transition.

### Good: change color and show focus immediately

This example keeps focus immediate and limits motion to users who have not
requested reduction. Substitute the app's own component and color tokens:

```tsx
<button
  type="button"
  className="
    inline-flex min-h-11 items-center justify-center gap-2 rounded-md
    bg-slate-900 px-4 py-2 text-sm font-semibold text-white
    hover:bg-slate-800 active:bg-slate-950
    focus-visible:outline-2 focus-visible:outline-offset-2
    focus-visible:outline-slate-700
    motion-safe:transition-[background-color]
    motion-safe:duration-[150ms] motion-safe:ease-[ease]
  "
>
  Apply filters
</button>
```

- In Tailwind v4, `hover:` is capability-gated. Check older versions or handwritten
  selectors. A CSS fallback is `@media (hover: hover)`.
- A touch device with an attached mouse may support hover. Essential controls must
  work by focus and tap.
- The default uses color feedback without scale. If the project's control uses
  press scale, apply the motion reference's treatment to an inner presentation
  element while the outer button retains its hit target.

This is a visual example, not an async submission or disabled-state implementation.

### Good: connect toggle appearance and semantics

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

Keep the accessible name stable for a toggle with `aria-pressed`. The pressed state
communicates whether it is on. Add the project's complete border, contrast, and
state styling.

Bad: toggle only the color class while leaving `aria-pressed` unchanged, or change
the accessible name from "Mute alerts" to "Unmute alerts" while also using
`aria-pressed`. Keep the label stable and let the pressed state communicate the
toggle's value.

## Map approved color roles into CSS

Load the foundation guidance through `design-system` and use the project's actual palette.
This concrete example implements the reference's sample light/dark role values;
it is not a second design-default catalog. Use the app's theme selector rather
than assuming that it uses `data-theme`.

```css
:root {
  --ui-canvas: #f8fafc;
  --ui-surface: #ffffff;
  --ui-raised: #ffffff;
  --ui-text: #0f172a;
  --ui-muted: #475569;
  --ui-separator: #e2e8f0;
  --ui-control-border: #64748b;
  --ui-action: #1d4ed8;
  --ui-action-hover: #1e40af;
  --ui-action-pressed: #1e3a8a;
  --ui-on-action: #ffffff;
  --ui-selection: #dbeafe;
  --ui-on-selection: #1e3a8a;
  --ui-focus: #1d4ed8;
  --ui-error: #b91c1c;
}

[data-theme="dark"] {
  --ui-canvas: #0f172a;
  --ui-surface: #111827;
  --ui-raised: #1f2937;
  --ui-text: #f9fafb;
  --ui-muted: #cbd5e1;
  --ui-separator: #334155;
  --ui-control-border: #94a3b8;
  --ui-action: #93c5fd;
  --ui-action-hover: #bfdbfe;
  --ui-action-pressed: #60a5fa;
  --ui-on-action: #111827;
  --ui-selection: #1e3a8a;
  --ui-on-selection: #dbeafe;
  --ui-focus: #93c5fd;
  --ui-error: #fca5a5;
}
```

## Icon semantics

Choose glyphs and visual weight with `design-system`; expose the action's name on
the control and keep decorative glyphs out of its accessible name.

```tsx
// Bad: no accessible name, and color is embedded in the asset.
<button type="button"><svg fill="#666" viewBox="0 0 24 24">...</svg></button>

// Good: use the project's SearchIcon and name the action on the control.
<button type="button" aria-label="Search" className="text-[color:var(--ui-text)]">
  <SearchIcon aria-hidden="true" focusable="false" className="size-5" />
</button>
```

`SearchIcon` is the existing project component, not a required dependency.
Verify that it forwards accessibility and sizing props.

## Theme changes

For theme transitions, prefer the existing theme provider's supported option. If
none exists and the smear is reproduced, suppress transitions for that theme
commit and restore them after the new styles apply. Do not inject a second theme
listener or leave suppression active for subsequent interactions.

Keep data identity stable across a theme change. Do not change component keys or
reset a pending operation to suppress a visual transition.

## Filter panel view

Implement the [filter-panel spec](interaction-specs.md#example-filter-panel) as a
controlled view inside the project's existing accessible overlay. This example
uses Tailwind layout utilities and the role tokens chosen with `design-system`.
Use equivalent project tokens; the classes assume unmodified Tailwind defaults.

The existing query layer supplies the following contract. Do not invent a hook
with these names and assume the application already implements it:

| Prop or state                   | Owner and requirement                                                                            |
| ------------------------------- | ------------------------------------------------------------------------------------------------ |
| `query`, `onQueryChange`        | Update input immediately; request ownership follows the current query.                           |
| `state.status`, `state.message` | Expose pending, ready, error, or idle state; label retained results stale while pending.         |
| `state.showSpinner`             | The current request's delayed decorative indicator; clear on settlement or obsolescence.         |
| `onRetry`, `onClear`            | Retry the current failed query; clear filters through the existing controller.                   |
| `children`                      | The current result list, or explicitly stale cached results; never silently commit an old query. |

### Good: stable field, separate status, existing controllers

```tsx
import { useId, useRef, type ReactNode } from "react";

type FilterPanelViewProps = {
  query: string;
  onQueryChange: (query: string) => void;
  state: {
    status: "idle" | "pending" | "ready" | "error";
    message: string;
    showSpinner: boolean;
  };
  onRetry: () => void;
  onClear: () => void;
  children: ReactNode;
};

export function FilterPanelView(props: FilterPanelViewProps) {
  const fieldId = useId();
  const inputRef = useRef<HTMLInputElement>(null);
  const statusId = `${fieldId}-status`;
  const { query, onQueryChange, state, onRetry, onClear, children } = props;

  return (
    <section className="filter-panel grid w-full max-w-lg gap-6 rounded-xl p-4">
      <h2 className="text-xl font-semibold leading-[1.2]">Filter results</h2>
      <div className="grid min-w-0 gap-2">
        <label htmlFor={fieldId}>Search results</label>
        <input
          id={fieldId}
          ref={inputRef}
          type="search"
          value={query}
          onChange={(event) => onQueryChange(event.currentTarget.value)}
          aria-describedby={statusId}
          className="min-h-11 w-full min-w-0 rounded-md border px-3 py-2 text-base leading-normal focus-visible:outline-2 focus-visible:outline-offset-2"
        />
        <div className="flex min-w-0 items-start gap-2">
          <span
            className="filter-spinner"
            aria-hidden="true"
            hidden={state.status !== "pending" || !state.showSpinner}
          />
          <p
            id={statusId}
            role="status"
            aria-atomic="true"
            data-error={state.status === "error"}
            className="filter-status min-h-6 min-w-0 text-sm leading-normal"
          >
            {state.message}
          </p>
        </div>
      </div>
      <div aria-busy={state.status === "pending"}>{children}</div>
      <div className="flex flex-wrap gap-3">
        <button type="button" className="filter-action" onClick={onClear}>
          Clear filters
        </button>
        <button
          type="button"
          className="filter-action"
          hidden={state.status !== "error"}
          onClick={() => {
            inputRef.current?.focus();
            onRetry();
          }}
        >
          Retry
        </button>
      </div>
    </section>
  );
}
```

Keep the status outside the busy result region. Search failure does not make the
query an invalid form value, so do not add `aria-invalid` for a network error.
Retry returns focus to the search input before the controller changes state and
hides the Retry button. Check this with keyboard activation, not only a click.
Use the existing icon family if a decorative search glyph is added; do not change
the input's label. Integrate the heading level and accessible overlay name with
the host component's structure.
Place interactive recipes inside the framework's client-rendered boundary when
one is required. `useId` keeps multiple mounted views' label and status
associations distinct; use the version-compatible API described in
the `react-guide` skill.

```css
.filter-panel {
  color: var(--ui-text);
  background: var(--ui-raised);
}
.filter-panel input {
  color: var(--ui-text);
  background: var(--ui-surface);
  border-color: var(--ui-control-border);
  outline-color: var(--ui-focus);
}
.filter-status {
  color: var(--ui-muted);
  overflow-wrap: break-word;
}
.filter-status[data-error="true"] {
  color: var(--ui-error);
}
.filter-action {
  min-block-size: 2.75rem;
  padding: 0.5rem 1rem;
  border: 1px solid var(--ui-control-border);
  border-radius: 0.375rem;
  color: var(--ui-text);
  background: var(--ui-surface);
}
.filter-action:focus-visible {
  outline: 2px solid var(--ui-focus);
  outline-offset: 2px;
}
.filter-spinner {
  display: inline-block;
  flex: none;
  inline-size: 1rem;
  block-size: 1rem;
  margin-block-start: 0.25rem;
  border: 2px solid currentColor;
  border-inline-end-color: transparent;
  border-radius: 50%;
}
.filter-panel [hidden] {
  display: none;
}
@media (prefers-reduced-motion: no-preference) {
  .filter-spinner:not([hidden]) {
    animation: filter-spin 700ms linear infinite;
  }
}
@keyframes filter-spin {
  to {
    transform: rotate(360deg);
  }
}
```

The overlay host supplies elevation, constrained viewport placement, transform
origin, presence, and focus restoration. Reuse its existing recipes and use
the foundation guidance in `design-system` only for missing visual tokens. The view contains
no network or popup lifecycle logic. Verify those integrations with the
[query event trace](component-patterns.md#example-filter-search) and
[motion checks](animation-implementation.md#example-filter-panel-motion).

Bad: disable this search input while pending, replace it with a spinner, or make
its key depend on the result count. Those changes prevent typing or reset focus.

## Contextual icon recipe

Implement the [quiet icon treatment](animation-implementation.md#example-contextual-icon-change)
without another animation dependency. Keep both decorative glyphs in one fixed
slot and derive the pressed state from the controller. Supply icons from the
project's existing family with `focusable="false"`.

```tsx
import type { ReactNode } from "react";

type MuteButtonProps = {
  muted: boolean;
  onMutedChange: (muted: boolean) => void;
  unmutedIcon: ReactNode;
  mutedIcon: ReactNode;
};

export function MuteButton({ muted, onMutedChange, unmutedIcon, mutedIcon }: MuteButtonProps) {
  return (
    <button
      type="button"
      aria-label="Mute alerts"
      aria-pressed={muted}
      onClick={() => onMutedChange(!muted)}
      className="ui-icon-button"
    >
      <span className="ui-icon-slot" aria-hidden="true">
        <span className="ui-icon-off">{unmutedIcon}</span>
        <span className="ui-icon-on">{mutedIcon}</span>
      </span>
    </button>
  );
}
```

```css
.ui-icon-button {
  display: inline-grid;
  place-items: center;
  min-inline-size: 2.75rem;
  min-block-size: 2.75rem;
  border: 1px solid var(--ui-control-border);
  border-radius: 0.375rem;
  color: var(--ui-text);
  background: var(--ui-surface);
}
.ui-icon-button[aria-pressed="true"] {
  color: var(--ui-on-selection);
  background: var(--ui-selection);
}
.ui-icon-button:focus-visible {
  outline: 2px solid var(--ui-focus);
  outline-offset: 2px;
}
.ui-icon-slot {
  display: grid;
  inline-size: 1.25rem;
  block-size: 1.25rem;
}
.ui-icon-slot > span {
  grid-area: 1 / 1;
  display: grid;
  place-items: center;
}
.ui-icon-slot svg {
  inline-size: 100%;
  block-size: 100%;
}
.ui-icon-off {
  opacity: 1;
}
.ui-icon-on {
  opacity: 0;
}
.ui-icon-button[aria-pressed="true"] .ui-icon-off {
  opacity: 0;
}
.ui-icon-button[aria-pressed="true"] .ui-icon-on {
  opacity: 1;
}
@media (prefers-reduced-motion: no-preference) {
  .ui-icon-slot > span {
    transition: opacity 150ms cubic-bezier(0.16, 1, 0.3, 1);
  }
}
```

The correct glyph is visible on first render; there is no entrance animation.
Reduced motion swaps it instantly. The semantic state and fixed button remain
usable during reversal. If this toggle persists remotely, use the existing
optimistic-update and reconciliation contract; this view does not implement it.

Bad: change the button key, name, and glyph on every frame. Good: update one
controlled value and leave focus and the accessible name stable.

For CSS, WAAPI, or library selection and performance diagnosis, read
[animation implementation](animation-implementation.md).

## Before finishing

1. Apply the relevant `react-guide` completion checks for any React behavior you
   changed.
2. Confirm the interface with zero animation duration, rapid reversal, component
   unmount, keyboard input, touch input where relevant, and loading or failure
   states.
3. Run the project's existing type and build checks when code changes warrant
   them. Add one focused behavioral test for a meaningful state risk, not for a
   timing token's spelling.

Done means the React checks, interface checks, and project checks are either
verified or reported as not verified.
