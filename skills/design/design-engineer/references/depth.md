# Depth

Use this reference when a component looks flat, when shadows look fake, or when
borders make it busy. Use the theme's shadow scale; add or change shadows in the
theme, not per component.

## Light comes from above

People read depth from how light falls on an object, and in interfaces light comes
from above. Decide whether the element should look raised or inset, then copy what
overhead light would do to that shape.

- **Raised** (buttons, cards): the top edge catches light, so give it a slightly
  lighter edge, such as an inset top highlight. The element blocks light below
  it, so add a small, sharp, dark shadow offset downward.

  ```css
  box-shadow:
    inset 0 1px 0 hsl(220 80% 70%),
    0 1px 3px hsl(0 0% 0% / 0.2);
  ```

  Pick the highlight color by hand from the element's hue; white at low opacity
  drains its saturation.

- **Inset** (inputs, wells, checkboxes, progress tracks): the lip above blocks
  light, so add a small dark inset shadow at the top; the bottom edge catches
  light, so make it slightly lighter.

  ```css
  box-shadow:
    inset 0 2px 2px hsl(0 0% 0% / 0.1),
    0 -1px 0 hsl(0 0% 100% / 0.05);
  ```

Keep these effects subtle. A hint of light gives depth; chasing realism makes the
interface busy.

## Use elevation to place elements on the z-axis

Shadow size says how close an element is to the user, and closer elements draw
more attention. Instead of choosing a shadow, choose the element's z-position and
use the matching step of a small scale (about five steps; Tailwind's
`shadow-xs` to `shadow-xl` works):

| Element                       | Elevation              |
| ----------------------------- | ---------------------- |
| Buttons, inputs, flat cards   | Smallest (`shadow-xs`) |
| Raised cards, sticky headers  | Small (`shadow-sm`)    |
| Dropdowns, popovers, tooltips | Medium (`shadow-md`)   |
| Drawers, floating panels      | Large (`shadow-lg`)    |
| Modal dialogs                 | Largest (`shadow-xl`)  |

Change elevation with interaction: a dragged list item lifts to a larger shadow,
which also tells people it can move; a pressed button drops to a smaller shadow or
none, as if pushed into the page.

## Build shadows from two layers

A convincing shadow often has two parts:

1. A larger, softer shadow with a bigger offset and blur: the shadow cast by a
   direct light.
2. A tighter, darker shadow with a small offset and blur: the dark area just under
   the object where ambient light cannot reach.

As elevation grows, the tight shadow fades. Make it distinct at the lowest
elevation and nearly invisible at the highest.

```css
--shadow-sm: 0 1px 3px hsl(0 0% 0% / 0.12), 0 1px 2px hsl(0 0% 0% / 0.24);
--shadow-xl: 0 20px 40px hsl(0 0% 0% / 0.2), 0 2px 4px hsl(0 0% 0% / 0.05);
```

## Get depth without shadows

Flat designs still need depth:

- **Color:** lighter surfaces feel closer, darker ones feel further away. A card a
  shade lighter than the page looks raised; a well a shade darker looks inset.
- **Solid shadows:** a short vertical offset with no blur (`0 4px 0`) lifts an
  element while staying flat.
- **Overlap:** let an element cross the boundary between two backgrounds (a card
  pulled up into a colored header with a negative margin), or extend beyond its
  parent, to suggest layers. When images overlap, give each a border in the
  background color (`ring-4 ring-background` on stacked avatars) so they do not
  clash.

## Use fewer borders

Borders separate things, but too many make a component cluttered. Before adding
one, try:

1. **Spacing.** More space between groups often separates them enough.
2. **A background difference.** Adjacent areas with slightly different
   backgrounds (`bg-muted` beside `bg-background`) need no line. If both a
   background difference and a border exist, remove the border.
3. **A shadow.** A small shadow outlines an element more softly than a border,
   when the element differs from the background color.

Keep borders that identify controls such as inputs, and keep a border or outline
for forced-colors mode when a shadow is the only boundary.

Bad: a settings card with a border, each row with a bottom border, and each row's
action with an outlined button.

Good: the card on `bg-card` with `shadow-sm`, rows separated by `gap-4`, and only
the inputs bordered.
