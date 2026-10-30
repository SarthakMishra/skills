---
name: design-engineer
description: Make a UI component or screen look better, or design a new one, using a cheat sheet of visual design rules for hierarchy, spacing, type, color, depth, images, and finishing touches. Stays inside the existing design system and atomic design ownership, extending it only when a fix needs it. Use when something looks plain, cluttered, unbalanced, or "off". Skip user-flow design, product copy, backend work, and building or migrating a whole design system.
---

# Design engineer

Make the component look designed. Render it, name what looks wrong with a rule
from the cheat sheet below, fix it with the project's own tokens at the atomic
level that owns the problem, and compare the result with the original. A finished
change looks better in its real consumer, uses the design system, and keeps every
state working.

For a review-only request, report findings and leave files unchanged.

## 1. Read the system and place the component

Read `DESIGN.md` or its equivalent, the theme (Tailwind config or theme CSS),
`components.json`, `components/ui`, the target component, and two consumers.
Record what the system already offers:

- type scale and weights, text color roles, spacing scale, radius, shadows,
  and color ramps;
- the existing atoms and variants the target uses or could use.

Name the target's atomic level and what it owns:

| Level    | Owns                                                                | Example                    |
| -------- | ------------------------------------------------------------------- | -------------------------- |
| Atom     | Its padding, radius, type role, colors, border, shadow, and states. | `Button`, `Input`, `Badge` |
| Molecule | Spacing and alignment between its atoms, label/value treatment.     | `FormField`, `StatCard`    |
| Organism | Hierarchy between molecules, section layout, width, empty state.    | `InvoiceTable`, `Toolbar`  |
| Page     | Page width, columns, and section rhythm.                            | `SettingsPage`             |

Done means you can name the target's level, its consumers, and the scales you
will choose values from. Without a design system, define a small type scale,
spacing scale, grey ramp, primary ramp, and three shadows in the project's theme
first; see [layout and spacing](references/layout-spacing.md#use-a-scale-with-real-steps)
and [color](references/color.md#build-the-palette-before-the-component).

## 2. Render and diagnose

Render the component with real content: the longest realistic text, an empty
value, many items, and each state (hover, focus, disabled, error, loading,
selected). Use the project's dev server, Storybook, or a test page, and take a
screenshot when the host supports it.

Walk the cheat sheet in order. Hierarchy problems hide every other improvement, so
fix them first. For each finding, write:

- the observation ("the price and the SKU have the same weight and color"),
- the rule from the cheat sheet,
- the fix, the token it uses, and the atomic level that owns it.

Done means every finding has a rule and an owner. Read the linked reference for
any rule you apply.

## 3. Fix at the owning level

Fix the problem where it is owned, using this order of preference:

1. **Use an existing token or variant.** `text-muted-foreground`, `size="sm"`,
   `variant="outline"`.
2. **Compose existing atoms differently** inside the molecule or organism.
3. **Add a variant or size to the atom** with `cva` when two or more consumers
   need the same treatment.
4. **Add a token** to the theme when no step in the scale fits, and record it
   with its reason in `DESIGN.md`. Keep new values on the scale's spacing (steps
   about 25% apart).

Keep a one-off treatment in the consumer until a second consumer needs it.

Bad: override a button's padding and radius from a page: `<Button
className="px-[13px] rounded-[3px]">`. The atom's contract now has a page-level
fork.

Good: add `size="lg"` to `Button` when several pages need a larger button, or
use the existing size and fix the spacing around it in the molecule.

For a change to the theme itself (new palette, new scale, migration), use the
`design-system` skill when it is installed.

When choosing between values, choose by elimination: try your best guess, then
the steps on either side on the scale. Keep the middle one if the neighbors look
worse; otherwise repeat from the better neighbor.

## 4. Compare and verify

Render the same content and states again and compare with the original, side by
side when possible. Check:

- every finding is resolved, and nothing else got worse;
- each state still renders, including focus rings and disabled styles;
- changed text and background pairs meet contrast (4.5:1 for body text, 3:1 for
  large text and essential UI boundaries);
- the narrowest supported width and dark mode, when the project supports it;
- the component's other consumers, when an atom or token changed.

Report the findings, the fixes with their files, the tokens or variants added and
why, and any check that could not run. A design change you could not render is
`Not verified`.

## Cheat sheet

Find the symptom, apply the rule, read the reference for the details and examples.

| Symptom                                                        | Rule                                                                                                           | Read                                                                               |
| -------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------- |
| Everything competes; nothing is clearly first                  | Pick the one thing that matters. Emphasize it with weight and color, then de-emphasize the rest.               | [Hierarchy](references/hierarchy.md#decide-what-matters-first)                     |
| Headings are huge and supporting text is tiny                  | Use weight and color for hierarchy before size. Two weights and three text colors cover most UIs.              | [Hierarchy](references/hierarchy.md#use-weight-and-color-before-size)              |
| Data reads as a form: "Label: value" everywhere                | Drop the label when the format or context says what it is; merge label into value; otherwise mute labels.      | [Hierarchy](references/hierarchy.md#treat-labels-as-a-last-resort)                 |
| Several buttons look equally important                         | One primary (solid), secondary (outline or soft), tertiary (link style). Destructive is not automatically red. | [Hierarchy](references/hierarchy.md#rank-actions)                                  |
| Icon next to text looks too heavy; thin border looks too faint | Balance weight with contrast: soften heavy icons, thicken faint borders.                                       | [Hierarchy](references/hierarchy.md#balance-weight-and-contrast)                   |
| Grey text looks dirty on a colored background                  | Pick a lighter or darker tint of the background hue instead of grey or white at low opacity.                   | [Hierarchy](references/hierarchy.md#tint-secondary-text-on-color)                  |
| Looks cramped                                                  | Start with too much space and remove it until it looks right.                                                  | [Layout and spacing](references/layout-spacing.md#start-with-too-much-space)       |
| Unclear what belongs to what                                   | Put more space around a group than inside it.                                                                  | [Layout and spacing](references/layout-spacing.md#make-groups-obvious)             |
| Stretched across the screen                                    | Give it the width it needs with a max-width; split into columns instead of widening.                           | [Layout and spacing](references/layout-spacing.md#use-the-width-the-content-needs) |
| Small and large sizes look like zoomed copies                  | Size each step independently: big things shrink faster; large buttons get more generous padding.               | [Layout and spacing](references/layout-spacing.md#scale-sizes-independently)       |
| Too many font sizes                                            | Use the type scale only; pick by elimination.                                                                  | [Typography](references/typography.md#stay-on-the-type-scale)                      |
| Paragraphs are hard to read                                    | 45 to 75 characters per line; taller line-height for small or wide text.                                       | [Typography](references/typography.md#set-measure-and-line-height-together)        |
| Mixed font sizes on one line look misaligned                   | Align by baseline, not center.                                                                                 | [Typography](references/typography.md#align-mixed-sizes-by-baseline)               |
| Uppercase labels or big headings look off                      | Add tracking to all-caps text; tighten tracking on large headings.                                             | [Typography](references/typography.md#adjust-letter-spacing-in-two-cases)          |
| Colors look washed out or muddy                                | Raise saturation toward the ends of a ramp; rotate hue toward a bright hue to lighten.                         | [Color](references/color.md#keep-light-and-dark-shades-vivid)                      |
| Interface feels cold or sterile                                | Tint the greys warm or cool, consistently across the ramp.                                                     | [Color](references/color.md#tint-the-greys)                                        |
| A colored badge or alert shouts                                | Flip it: dark colored text on a light tint of the same hue.                                                    | [Color](references/color.md#flip-contrast-on-colored-elements)                     |
| State shown only by color                                      | Add an icon, label, or shape; use lightness differences in charts.                                             | [Color](references/color.md#never-use-color-alone)                                 |
| Flat and lifeless, or shadows look fake                        | Light comes from above: lighter top edge, small dark shadow below. Use the elevation scale by z-position.      | [Depth](references/depth.md#light-comes-from-above)                                |
| Too many borders                                               | Separate with spacing, a background difference, or a shadow instead.                                           | [Depth](references/depth.md#use-fewer-borders)                                     |
| Text over an image is unreadable in places                     | Even out the image: overlay, lower its contrast, colorize it, or add a soft text glow.                         | [Images](references/images.md#make-text-over-images-readable)                      |
| Icons look chunky or blurry                                    | Use icons near their drawn size; enclose a small icon in a tinted shape to fill space.                         | [Images](references/images.md#respect-intended-sizes)                              |
| User images break the layout or bleed into the background      | Fixed aspect-ratio frames with `object-cover`; a subtle inner ring instead of a border.                        | [Images](references/images.md#contain-user-uploaded-images)                        |
| Correct but plain                                              | Supercharge defaults, add an accent border, decorate a background, rethink the component's shape.              | [Finishing touches](references/finishing.md)                                       |
| Empty list shows nothing useful                                | Design the empty state: an illustration or icon, one sentence, and the primary action; hide unusable filters.  | [Finishing touches](references/finishing.md#design-the-empty-state)                |
| Doesn't feel like the rest of the product                      | Match the product's personality: font, color, radius, and density stay consistent.                             | [Finishing touches](references/finishing.md#keep-one-personality)                  |
