# Design engineer

Make a component or screen look designed. The skill renders the component, names
what looks wrong using a visual design cheat sheet, fixes each problem with the
project's own tokens at the atomic level that owns it, and compares the result
with the original.

Invoke `/design-engineer` in Claude Code or `$design-engineer` in Codex. The agent
can also select it when you ask to improve how something looks or to design a new
component. A review-only request returns findings without editing files.

## What it covers

The [SKILL.md](SKILL.md) cheat sheet maps common symptoms to rules. Each rule links
to a focused reference with Bad/Good examples in Tailwind and shadcn terms:

- [Hierarchy](references/hierarchy.md): ranking content, weight and color before
  size, labels, document versus visual hierarchy, action ranks, balancing weight
  and contrast, secondary text on color.
- [Layout and spacing](references/layout-spacing.md): generous starting space,
  scales with real steps, grouping by space, widths and max-widths, independent
  sizing.
- [Typography](references/typography.md): the type scale, font choice, measure and
  line-height, baseline alignment, text alignment, links, letter-spacing.
- [Color](references/color.md): building ramps, vivid light and dark shades,
  tinted greys, flipped contrast, never color alone.
- [Depth](references/depth.md): overhead light, elevation, two-layer shadows,
  flat depth, fewer borders.
- [Images](references/images.md): text over photos, intended sizes,
  user-uploaded images.
- [Finishing touches](references/finishing.md): personality, supercharged
  defaults, accent borders, backgrounds, empty states, rethinking components.

## How it stays in the system

The skill reads `DESIGN.md`, the theme, and `components/ui` first, then fixes each
problem in this order of preference: an existing token or variant, a different
composition of existing atoms, a new variant on the atom when several consumers
need it, and finally a new token recorded in `DESIGN.md`. A button's padding is
fixed in `Button`, not overridden on a page. Without a design system, it defines
small type, spacing, color, and shadow scales in the theme before styling.

For theme-wide changes or migrations, use `design-system`. For user flows, use
`ux-guide`; for interface copy, use `ux-writer`.

## Example requests

```text
/design-engineer The invoice card looks cluttered. Make it look better without
changing the data it shows.
```

```text
/design-engineer Design a pricing plan picker for the checkout page using our
existing components.
```

```text
/design-engineer Review the settings page and list what makes it look plain.
Don't change any files.
```

## Check the result

- Each fix names the rule it applies and the file and level that own it.
- The result uses existing tokens and variants, and any new one is recorded in
  `DESIGN.md` with its reason.
- The before and after were rendered with real content and every state.
- Changed text and background pairs meet contrast.

## Source

The cheat sheet adapts ideas from _Refactoring UI_ by Adam Wathan and Steve
Schoger, restated for components built with Tailwind and shadcn/ui. The book's
text and images are not reproduced here.
