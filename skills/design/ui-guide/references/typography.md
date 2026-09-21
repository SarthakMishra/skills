# Typography

Choose text roles before individual sizes. Preserve the project's font family,
then fix measure, wrapping, weight, and alignment at real content lengths.
Use [layout](layout.md) for placement and [color](color.md) for contrast.

## Keep a small type system

- Keep the installed typeface unless the task requests a change. For a new product
  without a family, default to the system sans-serif stack. Do not introduce a
  paid font to satisfy a polish rule.
- Use the font's text variant at reading sizes and its display variant for large
  headings when those variants exist. Inspect x-height, numerals, and glyph coverage.
- Start with regular 400 and semibold 600. Use a loaded weight; do not assume the
  browser's synthesized bold or italic matches the design.
- For new webfont assets, prefer WOFF2. Keep a fallback stack and test loading failure.
  Do not disable all font synthesis until required emphasis survives that fallback.

## Map roles to sizes

Reuse project roles. Without them, use the following sizes through rem-based tokens.
Pick semantic heading elements from the document structure, not their default size.

| Role                      | Size                                  | Weight / line-height |
| ------------------------- | ------------------------------------- | -------------------- |
| Page and section headings | 32, 24, 20px in descending prominence | 600 / 1.2            |
| Body                      | 16px                                  | 400 / 1.5            |
| Supporting text           | 14px                                  | 400 / 1.5            |
| Form inputs               | 16px                                  | 400 / 1.5            |
| Long reading passages     | 18px                                  | 400 / 1.5            |

Use line-height 1.4 when a heading wraps to three or more lines. Increase it if
the actual font or script clips marks or makes lines collide. Do not shrink
essential text to make a box fit. Default text below 18px to weight 400 or heavier.

| Bad                                                    | Good                                                                   |
| ------------------------------------------------------ | ---------------------------------------------------------------------- |
| Change `h2` to `h4` to make a heading smaller.         | Keep `h2` and apply the intended type role.                            |
| A child heading overpowers its parent.                 | Reduce its visual role while preserving the document hierarchy.        |
| A three-line description uses heading line-height.     | Use the body role and let the container grow.                          |
| Remove every visible field label to simplify the form. | Keep labels and their associations; reduce competing emphasis instead. |

Give controls accessible names. Omit a visible field label only when the purpose
is already explicit in the surrounding UI, such as a search field beside Search.
Never use placeholder text as the only label.

## Control wrapping without hiding information

- Bound prose at 65ch and inspect actual lines. `ch` is a font metric, not an exact
  count of characters. Aim for roughly 45 to 75 characters in sustained reading.
- Align prose to its language's start edge. Reserve centering for short standalone
  titles or messages. Align mixed-size text on a shared baseline.
- Use `text-wrap: balance` for short headings. Use `pretty` for short descriptions
  when supported; keep ordinary wrapping as a usable fallback. Do not require
  either feature for long-form text or editable input to work.
- Let long URLs and identifiers break. Truncate only when the full distinguishing
  value is reachable by keyboard and touch, such as an expanded view.

```css
/* Bad: fixed height hides real text. */
.description {
  height: 2rem;
  overflow: hidden;
  line-height: 1.1;
}

/* Good: limit the reading line and let the block grow. */
.description {
  max-inline-size: 65ch;
  line-height: 1.5;
  overflow-wrap: break-word;
  text-wrap: pretty;
}
```

For single-line truncation, use `overflow: hidden`, `white-space: nowrap`, and
`text-overflow: ellipsis` together. Multi-line clamping also needs a full-text
recovery path. Never truncate the part that distinguishes two similar records.
See [MDN text wrapping](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/text-wrap)
for support and behavior of the newer wrapping values.

## Use font features through CSS properties

| Bad                                                                 | Good                                                                  |
| ------------------------------------------------------------------- | --------------------------------------------------------------------- |
| Set weight only with `font-variation-settings: "wght" 600`.         | Use `font-weight: 600`; keep raw axis tags for supported custom axes. |
| Timers shift sideways as digits change.                             | Apply `font-variant-numeric: tabular-nums` when the font supplies it. |
| Use `font-synthesis: none` globally without testing fallback fonts. | Load intended faces and verify emphasis before disabling synthesis.   |

Use `font-optical-sizing: auto` for a font with optical sizing. Use
`font-variant-*` for standard OpenType features and raw feature tags only when no
property exists. Check the actual font's supported axes and features.

Align comparable numbers to the numeric end or decimal convention. Keep units
and precision consistent. Use monospace for code and identifiers; tabular numerals
do not require replacing a table's font with monospace.

## Preserve language and reader controls

- Set `lang` and `dir` at the document or content boundary. Use `<bdi>` around
  mixed-direction values; never reverse the digit order to imitate RTL.
- Keep normal body tracking. Adjust display or uppercase tracking only after
  inspecting the actual font and other supported scripts. Keep kerning enabled.
- Keep text selectable unless selection demonstrably conflicts with a drag gesture.
  Preserve zoom, text resizing, and user spacing overrides.
- Keep inline links visibly underlined. Start with font-derived underline metrics,
  then adjust offset if it crosses glyphs. Preserve product copy and punctuation
  conventions; this reference changes presentation, not writing style.

Use the project's font-smoothing choice. Do not impose macOS smoothing globally
without comparing the actual font and platform rendering.

## Apply to the filter panel

Use a 20px heading, 16px input, and 14px supporting status when no roles exist.
Let status and error text wrap without moving focus or clipping the message.
Preserve identifying result names and units.

Continue with the [interaction-design example](interaction-design.md#example-filter-panel).
Verify long labels, fallback fonts, translation, 200% zoom, and actual contrast pairs.
