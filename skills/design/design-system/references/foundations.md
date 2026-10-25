# Choose shadcn foundations

Read this file before changing the Tailwind theme, shadcn roles, radius, spacing,
typography, elevation, or shared tokens. Start with the installed defaults and
test the smallest change in a real feature.

Read the matching branch even when the existing tokens suffice:

- [Typography](typography.md): type roles, fonts, wrapping, and changing numbers.
- [Layout](layout.md): grouping, responsive composition, overflow, and content recovery.
- [Color](color.md): semantic color use, rendered contrast, and theme/state pairs.

Use this file for shared ownership and surface geometry; keep one-off compositions
in feature code and test shared changes in their real consumers.

## Start with the installed shadcn system

Read `components.json`, the theme CSS or Tailwind config, and representative
files in `components/ui`. Preserve the chosen shadcn style, control library,
semantic roles, radius, and spacing scale.

Change a default only when a product requirement, accessibility issue, or repeated
consumer need shows a real gap. Record the reason and affected consumers.

A requested polish pass is a product requirement to improve the named area.
Identify a concrete weakness, such as uneven optical alignment or an abrupt state
change, and refine it through the existing contract. Record shared changes and
check affected consumers; one local improvement does not authorize a theme rewrite.

Good: keep `bg-primary text-primary-foreground` and add one missing semantic
role that several components need.

Bad: replace the shadcn theme with a new palette after viewing one card. It
creates token churn before the system has a tested requirement.

## Name tokens by role

Use stable names that describe what a value means. Keep primitive values separate
from semantic aliases. Components consume semantic roles.

| Use     | Good name           | Bad name         |
| ------- | ------------------- | ---------------- |
| Surface | `surface-default`   | `gray-50`        |
| Text    | `text-muted`        | `text-gray-500`  |
| Action  | `action-primary`    | `button-blue`    |
| Space   | `space-control-md`  | `card-padding`   |
| Radius  | `radius-control-md` | `input-radius-7` |

Use the DTCG convention as a naming idea only. Group tokens in a readable tree
by category, primitive value, and semantic role. Keep the project's existing CSS
variable names and Tailwind mapping. Do not write a DTCG file or translate the
tree into a new token format.

```text
color
├── base
│   └── neutral
│       └── 0
└── semantic
    ├── surface
    │   └── default
    ├── text
    │   └── muted
    └── action
        └── primary
```

Use semantic roles in shadcn components. A primitive value belongs in the theme
or token source and flows into roles such as `--primary` and `--muted-foreground`.
Do not expose the primitive name in component classes.

Bad: `bg-blue-600`, `--card-padding`, and a new raw hex value in each component.
Good: `bg-primary`, `p-4`, and a shared `--primary` role whose theme value can
change without editing consumers.

## Keep visual roles and geometry stable

Use semantic roles for type, color, spacing, radius, and elevation. Follow
[color](color.md) for actual pair measurements, non-color state cues, and
appearance-specific checks.

Use spacing and shared edges to show relationships. Use boundaries for structure
and elevation for layered surfaces such as menus and dialogs. Reserve border
space or use an outline when a state changes so labels and controls do not move.

| Bad                                   | Good                                                                       |
| ------------------------------------- | -------------------------------------------------------------------------- |
| Show an error with a red border only. | Use the semantic error state, a readable message, and a tested color pair. |
| Add a border only after selection.    | Reserve the border width or use an outline so geometry stays stable.       |

## Refine surface geometry

For close-fitting nested surfaces intended to be concentric, relate the outer
radius to the inner radius plus the actual inset, including intervening border
widths. Inspect computed values rather than assuming a Tailwind radius name has
a fixed pixel value. Choose compatible existing tokens first. Judge widely
separated or asymmetrically padded surfaces independently.

Bad: give a tightly inset panel the same radius as its parent despite visibly
pinched corners. Good: adjust the component-owned radius or inset so the curves
follow each other, then compare the corners at the actual rendered size.

Correct optical alignment where mathematical centering looks uneven. Adjust the
asset or component-owned presentation, preserving the control's target and focus
geometry. Compare leading and trailing icons with real labels and supported RTL.

Bad: shrink the whole button's hit area to center an asymmetric glyph.
Good: adjust the glyph within the unchanged control and recheck alignment beside
neighboring buttons. Use the icon checks in
[component authoring](react-tailwind-shadcn.md#keep-icons-and-state-cues-semantic).

Use elevation for layered surfaces and retain borders needed for structure or
state. When a shadow supplies an essential boundary, provide a forced-colors
fallback such as a reserved transparent border that can take a system color;
verify it with forced colors enabled. Shadows alone cannot supply that fallback.

Bad: remove an input's identifying border because a faint shadow looks softer.
Good: retain a tested control boundary and use a shadow only for the intended
depth. Preserve a coherent flat treatment where the product uses one.

For content images whose edges disappear into the surface, compare a subtle
neutral inset outline in the supported appearances. Skip transparent artwork and
logos unless their own asset contract calls for an edge. Treat the outline as a
contextual preference, and keep it only if it improves separation without a fringe.

Bad: outline every image, including transparent logos, to make them consistent.
Good: compare an outline only on a content image whose edge disappears into its
surface, then check that the treatment works in both supported appearances.

Done means the refinement improves the observed detail while preserving state
cues, targets, theme behavior, and neighboring component cohesion.

## Test the foundation

Use a form, list, dashboard, or dialog with real text. Check a second composition
and the relevant empty, loading, error, disabled, selected, and long-content
states. Let content wrap rather than clipping it to a fixed height; check
translated labels, narrow and wide containers, text zoom, DOM and focus order,
logical direction, every supported theme, forced colors, and contrast pairings
before promoting a value to the shared theme.

Add a token only when it represents a repeated meaning or an independently
supported theme choice. Do not create one token for every CSS declaration.

Done means the changed role has a named meaning, uses the installed theme
mechanism, works in two real compositions, and has its supported states and
contrast checked.
