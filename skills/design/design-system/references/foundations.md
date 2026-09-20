# Establish the foundations

Use this reference when starting a system or changing its visual foundations.
These rules adapt _Refactoring UI_ to a reusable system; the source map is in
[sources.md](sources.md).

## Start with a feature

Select a feature that tests the system's constraints, such as an editable
settings form or a searchable list. Use realistic text and the first-use,
populated, and failure states. Establish hierarchy and grouping before refining
decoration. Validate shared choices on another relevant composition before
applying them across the system.

For selected bootstrap work, use the agreed minimal entry point. Check content,
density, and state variations in that entry point or a disposable composition
instead of implementing product screens. Record broader product validation as
pending; foundation checks do not establish that every future feature will fit.

Derive the visual direction from the product and existing brand. Translate words
like "restrained" or "expressive" into concrete choices for type, density, color,
shape, imagery, and motion. Preserve established identity during consolidation.
Uber Base and Dropbox illustrate coherent systems; their appearance is not a
default theme to copy.

## Make a finite set of useful choices

| Foundation         | Decision to capture                                                                          | Proof in the interface                                                         |
| ------------------ | -------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------ |
| Color              | Neutral and brand palettes; semantic surface/text, action, border, focus, and feedback roles | Readable foreground/background pairs in each supported theme and state         |
| Typography         | Families and fallbacks; a small size, weight, leading, and tracking scale; prose width       | Hierarchy, wrapped labels, long headings, and readable dense content           |
| Spacing and sizing | Approved scale, control sizes, content widths, grouping and density rules                    | Related items group clearly; small screens and zoom remain usable              |
| Shape and depth    | Radius, border, shadow, and stacking roles                                                   | Consistent containment; overlays remain distinguishable and correctly layered  |
| Icons and imagery  | Existing icon family, optical sizes, stroke style, crop and fallback rules                   | Balanced icons beside text; missing and user-supplied media behave predictably |
| Motion             | Shared timing, easing, distance, and interaction recipes                                     | Consistent feedback and continuity, including reduced motion                   |

Prefer the installed scale or an approved subset when it works. Choose finer steps
for small spacing and more separated choices for large spacing. A rule that every
number is divisible by four still leaves too many indistinguishable choices.
Avoid generating a huge palette or a mathematically perfect type scale without
testing the values in the feature.

Keep base values in one place. Give repeated meanings semantic names such as
surface, muted text, destructive action, or overlay entry. Add a component-specific
token only when that component has an independently meaningful decision. Do not
create aliases for every individual padding declaration.

For each new token, establish its role, definition, consumers, and applicable theme
or density overrides. Separate stable design choices from runtime values such as
chart data, measured positions, and user-selected colors.

## Turn visual judgment into conventions

- Assign emphasis through weight, space, and contrast as well as size. Secondary
  text must remain readable; lowering opacity is not a substitute for a tested
  text/background pairing.
- Separate heading semantics from visual size. Keep labels and accessible names
  for controls even when surrounding data can be understood without extra labels.
- Put more space between groups than within a group. Define compact density only
  where the task benefits from it, preserving usable targets and focus indicators.
- Tune typography and component padding for each size. Scaling
  every dimension proportionally rarely produces useful small and large variants.
- Constrain prose width and choose line height for the actual font and line length.
  Let layouts respond to content; a fixed column count is not a universal rule.
- Use depth to explain layering and interactivity. Prefer spacing or contrasting
  surfaces when extra borders repeat the same grouping information.
- Check palettes in use, including feedback and focus. Retain supported HSL or
  OKLCH conventions; the book's color-space advice is not a reason to rewrite a
  working theme. Meaning needs text, shape, or an icon in addition to color.
- Define useful empty and error states alongside populated examples. Include long
  translations and unusual image aspect ratios where the product supports them.

The result is a small set of implemented decisions with named uses, not a catalog
of every possible design value. Document which themes and density modes are
supported; do not invent extra modes to make the system look complete.
