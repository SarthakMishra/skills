# Choose and verify typography

Read this file when changing text hierarchy, font treatment, wrapping, or numeric
presentation, even when the existing tokens suffice. Inspect the installed type
roles, loaded fonts, and real content first. Finish with readable, stable text in
the affected consumers and their supported states.

## Choose a role before a value

Reuse a role's size, weight, line-height, and tracking together. If no role exists,
choose the smallest set needed to distinguish headings, body, labels, and
supporting text. Promote a new role only when consumers share its meaning.
Keep semantic heading levels tied to document structure; choose visual emphasis
within the surrounding section rather than imposing one global size per level.

For a missing treatment, start body copy with a unitless line-height near 1.5
and short headings near 1.2. Let wrapping descriptions use body-like leading.
Prefer relative font sizes and preserve a working project scale. These are
starting treatments, not reasons to report an otherwise readable design as broken.

Bad: use a tightly spaced heading style for a four-line card description.
Good: use the body role and let the card grow; check the longest description at
the narrowest supported width and 200% zoom.

## Check the face that actually renders

Inspect font declarations, loaded files, supported weights and styles, and the
fallback stack. Use a shipped face or supported variable-font range before
requesting another weight. Prefer `font-weight` and `font-variant-*` properties
to low-level OpenType settings when they express the same choice. Leave optical
sizing at its default unless a tested design requires a different treatment.

Bad: request a semibold face that is absent and assume the browser rendered it.
Good: use an available weight or load the required face; inspect the rendered
font and repeat the check while that font is unavailable. Avoid blanket synthesis
or font-smoothing overrides as a substitute for that check.

## Wrap for the content's job

| Content                          | Treatment and acceptance check                                                                                       |
| -------------------------------- | -------------------------------------------------------------------------------------------------------------------- |
| Short heading                    | Consider balanced wrapping when supported; check the actual line breaks at narrow and wide widths.                   |
| Reading-heavy prose              | Start with a measure around 60–75 characters when no convention exists; adjust for the typeface and reading context. |
| Labels and descriptions          | Let meaningful text wrap and its container grow before reducing size or clipping.                                    |
| Long IDs, URLs, and user content | Allow breaks and inspect the containing flex/grid sizing; use [layout](layout.md) for overflow repairs.              |
| Truncated previews               | Keep a deliberate route to the full value through the layout contract.                                               |

Use `text-wrap: pretty` only as an enhancement where supported; ordinary wrapping
must still work. Keep text selectable unless selection interferes with a specific
gesture. Preserve document language and direction; isolate mixed-direction user
values with appropriate `bdi` or `dir` markup. Copy and punctuation remain with
the project's content owner.

Bad: force a translated action label onto one line inside a fixed-height row.
Good: let the label and row grow, then check the complete action remains visible
and operable. Use compact wording only when it preserves the intended meaning.

## Stabilize changing numbers

Use supported `font-variant-numeric: tabular-nums` for changing counters, timers,
or aligned numeric columns. Leave prose figures proportional unless the font
contract says otherwise. Equal digit widths do not reserve space for more digits,
signs, separators, currency symbols, or changing units.

Bad: add tabular figures and assume a counter changing from 99 to 100 cannot
move its neighboring action. Good: also allocate room for the expected formatted
range in the component layout. Check same-length changes, digit-count changes,
negative values where supported, and locale-specific formatting. See
[numeric font features](https://developer.mozilla.org/en-US/docs/Web/CSS/font-variant-numeric)
when checking font support.

## Verify the treatment

Inspect real content, fallback fonts, long translations, supported directions,
and 200% zoom in the affected consumers. For inputs, check readable text and focus
behavior on supported mobile browsers; prefer ordinary readable sizing over
transforming smaller-looking text and preserve user zoom.

Done means the role reads clearly, content remains recoverable, and changed
values do not disturb neighboring controls. Record unavailable rendering or
device checks as `Not verified`; declared CSS alone does not prove readability.
