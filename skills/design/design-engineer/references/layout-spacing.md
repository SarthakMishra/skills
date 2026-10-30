# Layout and spacing

Use this reference when a component feels cramped, stretched, loose, or when it is
unclear which elements belong together. Examples use Tailwind's spacing scale;
use the project's scale when it differs.

## Start with too much space

Space is usually added until something stops looking bad, which leaves it just
short of looking good. Work the other way: give the component clearly too much
padding and gap, then remove space one scale step at a time until it looks right.
What feels slightly generous on one component usually looks right once it sits in
the full screen.

Bad: a card at `p-3 gap-1` because that was the first value that stopped the text
touching the edges.

Good: try `p-8 gap-4`, then step down to `p-6 gap-3` when `p-8` looks loose.

Dense layouts are a valid choice for dashboards, tables, and tools where people
compare many values at once. Make density a decision for that view, not the
default for everything.

## Use a scale with real steps

Pick spacing and sizes from a fixed scale whose neighboring steps differ enough to
tell apart. At small sizes, a few pixels is a big change (12px to 16px is 33%);
at large sizes, it is invisible (500px to 520px is 4%). A useful scale is tight at
the bottom and spreads out as it grows, with neighbors roughly 25% or more apart.

Tailwind's default scale already works this way at the steps most components use:
`1, 2, 3, 4, 6, 8, 12, 16, 24, 32` (4px to 128px). Prefer those steps over the
in-between ones for new work. Without a scale in the project, define one in the
theme before styling; a base of 16px with steps such as 4, 8, 12, 16, 24, 32, 48,
64, 96, 128 is a practical start.

Bad: `mt-[18px]`, `gap-[22px]`, `p-[13px]`. Arbitrary values nobody will reuse.

Good: `mt-4`, `gap-6`, `p-3`. When `mt-4` is not enough, try `mt-6`, not `mt-5`.

The same rule applies to widths, heights, icon sizes, radius, border widths,
shadows, and opacity: choose from a short list, not a continuous range.

## Make groups obvious

When nothing draws a box around a group, spacing alone shows what belongs
together. Keep more space around a group than inside it.

- A form field: the gap between label, input, and help text is smaller than the
  gap to the next field (`gap-2` inside, `gap-6` between fields).
- An article or settings page: more space above a section heading than below it,
  so the heading attaches to its content.
- A list: the gap between items is larger than the line spacing inside an item.
- A toolbar: related buttons sit closer together than unrelated groups.

Bad:

```tsx
<div className="space-y-4">
  <Label>Email</Label>
  <Input />
  <Label>Password</Label>
  <Input />
</div>
```

Every gap is equal, so each label floats between two inputs.

Good:

```tsx
<div className="space-y-6">
  <div className="space-y-2">
    <Label>Email</Label>
    <Input />
  </div>
  <div className="space-y-2">
    <Label>Password</Label>
    <Input />
  </div>
</div>
```

## Use the width the content needs

A wide screen does not need to be filled. Give each element the width that suits
its content, with a `max-w-*` so it does not grow past it, and let it shrink only
when the screen is narrower than that.

- A login card: `w-full max-w-md`, centered. It never gets narrower on a large
  screen than on a medium one, which percentage-based grid columns can cause.
- A sidebar: a fixed width that fits its contents (`w-64`), with the main area
  `flex-1`. A percentage-width sidebar wastes space on wide screens and squeezes
  its labels on narrow ones.
- A narrow form inside a wide page: keep the form at its best width and move its
  description into a side column (`md:grid md:grid-cols-[1fr_2fr]`) instead of
  stretching the inputs.

Use percentages and grid fractions only for elements that should actually scale
with the screen. Designing the narrow layout first (about 400px) and then
widening it often shows how little needs to change.

## Scale sizes independently

Proportions that work at one size rarely hold at another, so do not tie every size
to one base with `em` or a fixed ratio.

- Across screens: large elements shrink faster than small ones. A 48px desktop
  heading over 18px body copy might become 24px over 16px on mobile, a different
  ratio entirely.
- Within a component: a large button gets more generous padding than its font
  size implies, and a small one gets tighter padding, so they feel like different
  sizes rather than zoomed copies.

Bad: button padding in `em` so every size is a scaled copy.

Good, independent steps in the atom:

```ts
size: {
  sm: 'h-8 px-3 text-sm',
  default: 'h-9 px-4 text-sm',
  lg: 'h-11 px-6 text-base',
}
```
