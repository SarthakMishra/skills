# Hierarchy

Use this reference when a component feels noisy, flat, or confusing. Hierarchy is
how important each element looks next to the others, and it does more to make an
interface look designed than any color or font choice. Examples use Tailwind with
shadcn semantic tokens; replace them with the project's own roles.

## Decide what matters first

Before styling, rank the content. For a card, that is usually one primary item
(a name, a price, a title), two or three supporting items, and the rest. Then make
the ranking visible. A component where every element has the same weight and
color reads as a wall of text, even with good fonts and spacing.

Bad, everything at the same level:

```tsx
<div className="text-foreground text-sm">
  <p className="font-semibold">Acme Corp</p>
  <p className="font-semibold">Invoice #1042</p>
  <p className="font-semibold">$4,200.00</p>
  <p className="font-semibold">Due Mar 3</p>
</div>
```

Good, one primary item and muted supporting items:

```tsx
<div>
  <p className="text-muted-foreground text-sm">Acme Corp · #1042</p>
  <p className="text-2xl font-semibold tracking-tight">$4,200.00</p>
  <p className="text-muted-foreground text-sm">Due Mar 3</p>
</div>
```

When the primary element still does not stand out, mute what competes with it
instead of making it louder. An active navigation item becomes obvious when the
inactive items get a softer color; a sidebar stops competing with the content when
it loses its background and sits on the page.

## Use weight and color before size

Relying on font size alone makes primary text too big and secondary text too
small. Use weight and color first:

- Text colors: three roles cover most interfaces. Primary (`text-foreground`) for
  the main content, secondary (`text-muted-foreground`) for supporting content,
  and a lighter tertiary role for metadata such as timestamps or footers, if the
  system has one.
- Weights: two cover most UI. A normal weight (400 or 500) for most text and a
  heavier one (600 or 700) for emphasis. Avoid weights under 400 in UI text; to
  de-emphasize, use a softer color or smaller size instead.

Bad: `text-xs text-foreground` for a supporting date. Tiny and still loud.

Good: `text-sm text-muted-foreground`. Readable and clearly secondary.

## Treat labels as a last resort

Displaying data as `Label: value` gives every piece equal weight. Before adding a
label, try these in order:

1. **No label.** The format already says what it is: an email, a phone number,
   a price, a date. Context says the rest: a department under a person's name
   needs no "Department:".
2. **Merge label and value.** "12 left in stock" instead of "In stock: 12";
   "3 bedrooms" instead of "Bedrooms: 3". The merged phrase can be styled as one
   unit.
3. **Mute the label.** On dashboards and stat cards where similar values sit side
   by side, keep labels but make them supporting: smaller, softer color, or both.
   The value is the content.

Emphasize the label instead when readers scan for it, such as a specification
table where people look for "Weight", not "182 g". Even then, keep the value
readable: a darker label and a slightly softer value is enough.

Bad: `<dt>Status:</dt><dd>Active</dd>` repeated for six fields in a profile header.

Good: a status `Badge` beside the name, the email and phone without labels, and
a muted label only on the two values whose meaning is not obvious.

## Separate visual hierarchy from document hierarchy

Pick heading elements for structure and accessibility, then style them for the
hierarchy you need. In application UI, section titles often act as labels: the
content below matters more than the title. A `<h2>` for "Billing" can be
`text-sm font-medium text-muted-foreground`. A title can even be visually hidden
(`sr-only`) when the content makes it obvious.

Bad: every `<h1>` is `text-4xl` because it is an `<h1>`, so a settings page title
dwarfs the settings.

Good: `<h1 className="text-xl font-semibold">Account</h1>` above the form.

## Balance weight and contrast

Heavy elements (bold text, solid icons) cover more pixels and feel emphasized.
Light elements (thin borders, hairline icons) can disappear.

- **Heavy element too loud:** lower its contrast. A solid icon beside a label gets
  `text-muted-foreground` while the label stays `text-foreground`.
- **Light element too faint:** add weight instead of darkening it. A 1px border
  that vanishes in a soft color becomes `border-2` in the same color, rather than
  a darker 1px line that looks harsh.

## Rank actions

Most screens have one primary action, a few secondary ones, and some rarely used
tertiary ones. Style by rank, not by meaning:

| Rank      | Treatment                                      | shadcn variant           |
| --------- | ---------------------------------------------- | ------------------------ |
| Primary   | Solid, high-contrast fill. One per view.       | `default`                |
| Secondary | Visible but quiet: outline or soft fill.       | `outline` or `secondary` |
| Tertiary  | Discoverable but unobtrusive: looks like text. | `ghost` or `link`        |

A destructive action that is not the main thing on the page gets a secondary or
tertiary treatment. Save the solid destructive style for the confirmation dialog,
where deleting is the primary action.

Bad: "Save", "Duplicate", "Export", and a red "Delete" as four solid buttons in a
row.

Good: `Save` as default, `Duplicate` and `Export` as outline, and `Delete` as a
ghost button with destructive text, which opens a dialog whose primary button is
`variant="destructive"`.

## Tint secondary text on color

Grey text works on white because it lowers contrast. On a colored background, grey
or white at reduced opacity looks dirty or disabled, and on images it lets the
background show through. Choose a color with the background's hue and adjust
saturation and lightness until the contrast is lower but still readable.

Bad: `text-white/60` on a `bg-primary` banner.

Good: a theme role such as `--primary-muted-foreground`, defined as a light tint
of the primary hue and checked for 4.5:1 against `bg-primary`, used as
`text-primary-muted-foreground`. Add the role only if the system lacks one, and
record it in `DESIGN.md`.
