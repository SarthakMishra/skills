# Color

Use this reference when colors look dull, muddy, loud, or when a palette is
missing. Use the project's semantic roles in components; the advice here is about
choosing and applying values. Contrast measurement belongs to the `design-system`
color guidance.

## Think in hue, saturation, and lightness

Pick and adjust colors in a perceptual model (HSL, or OKLCH when the theme uses
it), not hex. Related colors look related in the numbers, and "lighter", "more
muted", or "warmer" become single changes. Design tools often show HSB, which is
not HSL: in HSB, 100% brightness is only white when saturation is 0.

## Build the palette before the component

A five-color generator palette is not enough to build an interface. A real palette
has three groups, each with a fixed set of shades defined in advance:

| Group   | Shades          | Used for                                                               |
| ------- | --------------- | ---------------------------------------------------------------------- |
| Greys   | 8 to 10         | Text, backgrounds, panels, borders, controls. Most of the interface.   |
| Primary | 5 to 10 per hue | Primary actions, active states, links, brand moments.                  |
| Accents | 5 to 10 per hue | Status (red, amber, green), highlights, categories in charts and tags. |

Never derive shades on the fly with `lighten()`, `color-mix()`, or opacity in each
component; that produces dozens of near-identical colors. Use the theme's ramp.

To build a missing ramp:

1. Pick the middle shade (500): one that works as a button background.
2. Pick the darkest (900), used for text on a light tint, and the lightest (100),
   used as a tinted background. An alert component is a good place to choose
   both.
3. Fill 700 and 300 as the midpoints, then 800, 600, 400, 200.
4. Adjust by eye in real components. Add shades rarely.

For greys, the darkest is the darkest text color, the lightest is a subtle
off-white background. Avoid pure black; start from a very dark grey.

## Keep light and dark shades vivid

Saturation looks weaker near very light and very dark values. Increase saturation
as shades move away from the middle, or the ends of the ramp look washed out or
grey-brown.

Hue also changes perceived brightness: yellow, cyan, and magenta look brighter
than red, green, and blue at the same lightness. To lighten a shade without losing
intensity, rotate its hue a little toward the nearest bright hue (60°, 180°, 300°);
to darken it, rotate toward the nearest dark hue (0°, 120°, 240°). Keep the rotation
under about 20 to 30 degrees or it reads as a different color. This is how a yellow
ramp gets warm, rich dark shades instead of olive ones: shift toward orange as it
darkens.

## Tint the greys

True greys have zero saturation. Most interfaces look better with slightly tinted
greys: blue for a cool, technical feel, yellow or orange for a warm one. Keep the
tint consistent across the ramp and raise saturation slightly at the light and
dark ends, as with any ramp. Change the grey ramp in the theme only; never tint
greys per component.

## Flip contrast on colored elements

White text on a colored fill needs a dark fill to reach 4.5:1, and a dark fill
draws more attention than a secondary element should. Flip it: dark text from the
same hue on a light tint.

Bad: a status badge with `bg-green-700 text-white`. Readable, but shouts in a
table.

Good: `bg-green-100 text-green-800` (or the theme's success roles). Still clearly
green, and quiet.

For secondary text on a dark colored panel, lightening the same hue quickly
approaches white. Rotate the hue toward a bright hue instead to gain contrast while
staying colorful, then measure the pair.

## Never use color alone

About one in twelve men has some form of color blindness. Pair color with
something else:

- Trends: an up or down arrow beside the green or red number.
- Status: an icon or text label in the badge.
- Charts: vary lightness as well as hue, or add patterns or direct labels, so
  lines differ in light and dark, not only in color.

Use color to support what the design already says, never as the only signal.
