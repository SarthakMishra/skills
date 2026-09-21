# Color

Assign a role to every color before adding shades. Reuse the project's theme,
create missing state variants, then measure the foreground/background pairs.
Use [surfaces](surfaces.md) for layering and [interaction design](interaction-design.md)
for what a status color is allowed to communicate.

## Build related variants

Erik D. Kennedy's [practical framework](https://www.learnui.design/blog/color-in-ui-design-a-practical-framework.html)
starts with variations of a base color. In an HSB picker, try lower brightness
and higher saturation for a darker variant; reverse those adjustments for a
lighter one. Adjust hue only after those two controls. This is a palette-building
heuristic, not a guarantee of contrast or a universal description of light.

1. Keep the existing brand/action hue. Add another hue only for a distinct semantic
   status or data category.
2. Create default, hover, and pressed action variants plus a light selection tint.
3. Export the chosen colors into the project's supported format. HSB picker values
   are not CSS `hsl()` values or OKLCH coordinates; do not copy numbers between them.
4. Measure each state with its text and adjacent surface before accepting it.

| Bad                                              | Good                                                                              |
| ------------------------------------------------ | --------------------------------------------------------------------------------- |
| Each button state uses an unrelated blue.        | Use related action variants with one foreground color that passes in every state. |
| Lower a whole card's opacity to make it quieter. | Use a muted text token and a separate surface token.                              |
| A pleasant palette is treated as accessible.     | Check the actual pairs, including opacity and overlays.                           |

## Separate roles from palette values

| Role group  | Tokens to identify                                 |
| ----------- | -------------------------------------------------- |
| Backgrounds | Canvas, surface, raised surface                    |
| Content     | Primary text, supporting text, text on actions     |
| Structure   | Decorative separator, required control boundary    |
| Interaction | Action, hover, pressed, selection, focus           |
| Status      | Success, warning, error, pending or neutral status |

Give the preferred action the strongest action treatment within its task region.
Keep equally valid choices equal. Static decoration must not look like a control.
Use a non-color cue for selection and status: text, an icon, an underline, or a
shape, together with the component's semantic state. Keep inline links underlined.

## Example role tokens

This blue/neutral example is a fallback for a project with no theme. These are
design role values; substitute existing roles instead of creating a second palette.
The implementation maps these roles to its styling system.

### Backgrounds and content

| Role           | Light     | Dark      |
| -------------- | --------- | --------- |
| `--ui-canvas`  | `#f8fafc` | `#0f172a` |
| `--ui-surface` | `#ffffff` | `#111827` |
| `--ui-raised`  | `#ffffff` | `#1f2937` |
| `--ui-text`    | `#0f172a` | `#f9fafb` |
| `--ui-muted`   | `#475569` | `#cbd5e1` |

### Actions and selection

| Role                  | Light     | Dark      |
| --------------------- | --------- | --------- |
| `--ui-action`         | `#1d4ed8` | `#93c5fd` |
| `--ui-action-hover`   | `#1e40af` | `#bfdbfe` |
| `--ui-action-pressed` | `#1e3a8a` | `#60a5fa` |
| `--ui-on-action`      | `#ffffff` | `#111827` |
| `--ui-selection`      | `#dbeafe` | `#1e3a8a` |

### State cues and boundaries

| Role                  | Light     | Dark      |
| --------------------- | --------- | --------- |
| `--ui-on-selection`   | `#1e3a8a` | `#dbeafe` |
| `--ui-focus`          | `#1d4ed8` | `#93c5fd` |
| `--ui-error`          | `#b91c1c` | `#fca5a5` |
| `--ui-separator`      | `#e2e8f0` | `#334155` |
| `--ui-control-border` | `#64748b` | `#94a3b8` |

The separator is decorative. Use the stronger control boundary when the outline
is necessary to identify an input. Add success and warning pairs only when the
component uses those states; test them like the other pairs.

## Measure contrast

Measure the composite background, including opacity, images, and overlays.
Apply the criterion's definitions and exceptions:

| Content                                                                   | WCAG 2.2 AA contrast                                                         |
| ------------------------------------------------------------------------- | ---------------------------------------------------------------------------- |
| Ordinary text                                                             | At least 4.5:1                                                               |
| Large text, at least 24 CSS px regular or approximately 18.67 CSS px bold | At least 3:1                                                                 |
| Visual information required to identify a control or state                | Generally 3:1 against adjacent colors, subject to the criterion's exceptions |

An 18px bold label is not large text under that definition. A decorative card
border is different from the only visible outline of an input. Never lower
necessary contrast to soften hierarchy. Check
[text contrast](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html)
and [non-text contrast](https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast.html).

## Design both themes

- Select dark-theme foreground and surface pairs explicitly; do not invert the
  light theme mechanically. Recheck saturation, unavailable states, and elevation.
- Respect forced colors. Keep focus outlines and control borders that survive
  when background fills and shadows disappear.
- A timeout is not an error confirmation. Use the status defined by the operation,
  not a red or green treatment chosen because an animation finished.

For the filter example, keep the panel and input readable in both themes, the
status muted, and an error both textual and colored. Continue with the
[interaction-design example](interaction-design.md#example-filter-panel).
