# Typography

Use this reference when text looks inconsistent, hard to read, or awkwardly
aligned. Font loading, wrapping behavior, and numeric stability belong to the
`design-system` typography guidance; this reference covers how text looks.

## Stay on the type scale

Interfaces drift into using every size from 10px to 24px. Use the project's type
scale only, and choose between neighboring sizes by elimination. A hand-picked
scale suits UI better than a strict ratio, which produces fractional sizes and
gaps where you need a size. Tailwind's `text-xs` to `text-4xl` (12, 14, 16, 18,
20, 24, 30, 36px) is a good hand-picked scale.

Define sizes in `px` or `rem`, never `em`. Nested `em` sizes multiply, so a
`0.875em` label inside a `1.25em` card renders at 17.5px, which is on no scale.

Bad: `text-[15px]` on one card title and `text-[17px]` on another.

Good: `text-base` on both, with weight and color doing the rest of the hierarchy.

## Choose fonts that hold up

When a component needs a new typeface (rare; prefer the system's), use these
filters:

- A neutral sans-serif or the system font stack is the safe default for UI.
- Families with many weights (five or more) are usually more carefully made.
- For UI text, prefer a tall x-height and normal width. Condensed faces with
  short lowercase letters are built for headlines and read poorly at small sizes.
- Popular families on a font directory are popular for a reason.

## Set measure and line-height together

Keep paragraphs between 45 and 75 characters per line. In Tailwind, `max-w-prose`
(65ch) or `max-w-[60ch]` does this. When a content area holds wide images or
tables, limit the paragraphs, not the whole area; mixed widths look more polished
than over-long lines.

Line-height depends on two things:

| Text            | Line-height                                      |
| --------------- | ------------------------------------------------ |
| Small text      | Taller, around 1.5 to 1.75 (`leading-relaxed`).  |
| Wide paragraphs | Taller, up to 2, so the eye finds the next line. |
| Narrow columns  | Around 1.5 (`leading-normal`).                   |
| Large headings  | Close to 1 (`leading-tight` or `leading-none`).  |

Bad: one `leading-relaxed` for every element, so a `text-4xl` heading has huge
gaps between its lines.

Good: `text-4xl leading-tight` for the heading, `text-base leading-7` for body.

## Align mixed sizes by baseline

When text of different sizes shares a line, such as a card title on the left and
small actions on the right, align their baselines, not their centers. Centered
text of different sizes sits at different heights and looks off.

Bad: `flex items-center` for a `text-xl` title beside a `text-sm` link.

Good: `flex items-baseline justify-between`.

## Align for reading

- Left-align text in left-to-right languages. Center only headings and short
  blocks of two or three lines. If one block in a centered group runs longer,
  shorten the copy rather than mixing alignments.
- Right-align numbers in tables so decimals and digits line up, and use
  `tabular-nums`.
- Justify only for a print-like look, and turn on hyphenation (`hyphens-auto`)
  when you do.

## Give links the emphasis they need

Inside a paragraph, a link needs to stand out: color, underline, or both. In UI
where almost everything is clickable (navigation, tables, cards), full link styling
everywhere is overwhelming. Use a heavier weight or darker color, and for
secondary links show the underline or color only on hover.

## Adjust letter-spacing in two cases

Trust the font's default tracking, except:

- **Large headings** in a family with loose default spacing: tighten slightly
  (`tracking-tight`).
- **All-caps text**, such as small labels or eyebrows: add spacing
  (`uppercase tracking-wide`), because capitals have fewer shapes that tell them
  apart.

Bad: `text-xs uppercase font-semibold` table headers that blur together.

Good: `text-xs uppercase font-medium tracking-wide text-muted-foreground`.
