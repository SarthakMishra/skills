# Visual design

Contents: hierarchy; grouping and layout; typography; color and depth; details; repair examples.

## Establish hierarchy before decoration

Identify the primary information and action for the current task. Decide what should be noticed first, second, and only when needed. Judge the component in its surrounding screen, not just in isolation.

- Create emphasis with weight, contrast, spacing, placement, and size together. Avoid oversized headings paired with unreadably tiny secondary text.
- When the primary element is weak, first reduce competing emphasis: strong sidebar backgrounds, bright badges, heavy icons, excessive borders, equally filled buttons.
- Give one action clear prominence within a task region when the task has a preferred action. Several independent regions may each need an action. Give equally valid choices equal emphasis; do not fabricate a preferred choice.
- Choose document semantics independently from visual size. A page heading can be visually modest; keep its semantic role.
- For data display, emphasize what the user scans for. A balance may dominate its label; a technical specification may require prominent labels. Preserve labels needed to distinguish similar values, units, dates, or statuses. Form controls still need accessible names and usually visible labels.
- Inspect at reduced scale or squint to check whether the intended hierarchy remains visible. This is a quick diagnostic, not evidence that people understand the UI.

## Group through relationships

Use proximity, alignment, similarity, and common boundaries intentionally. Containers are strong grouping signals; reserve them for relationships that need that strength.

Keep label-to-field gaps smaller than gaps between field groups. Keep a heading closer to its following content than the preceding section. Keep row actions near the row they affect. Avoid nested cards that merely repeat an already obvious grouping.

Use a constrained spacing scale already present in the project. For a new system, a useful starting subset is 4, 8, 12, 16, 24, 32, 48, and 64 CSS px, represented through the project's rem-based tokens. These are choices, not a requirement to replace another coherent scale. Start with small internal gaps and increase separation as relationships weaken. Fine optical corrections can be justified; do not create near-identical tokens for every correction.

Choose density for the task. Comparison tables and expert workspaces can be compact while maintaining readable type, distinct rows, and usable targets. Do not turn every dense screen into spacious cards that destroy scanability. Conversely, do not pack introductory or infrequent decisions into a control panel just because there is room.

Use content-aware widths:

- Let a sidebar fit its labels and let the work area flex; a universal percentage split can waste space or truncate navigation.
- Bound forms and prose with a sensible maximum width. Do not fill an ultrawide monitor with a single line of text.
- Let content determine when the layout reflows. Keep small text and targets usable as the viewport narrows; larger headings and outer whitespace can shrink more.
- Keep DOM reading and focus order aligned with visual order. Avoid using CSS ordering to disguise an incoherent source order.
- Test long names, translated strings, large values, wrapping, empty collections, and many rows. Use `min-width: 0` or appropriate wrapping where flex or grid content would overflow. Use deliberate horizontal scrolling for two-dimensional data.
- Truncate only when the omitted detail is safely retrievable. Do not conceal the distinguishing portion of two similar items.

## Typography

Use a small set of type roles tied to font size, weight, line height, and purpose. Inspect the actual font: x-height, numeral shapes, weight, and available glyphs matter more than the nominal size alone.

A practical new-app starting point is 16px body text, 14px supporting/control text where legible, and a modest heading scale such as 20, 24, and 32px. Long reading passages may benefit from 18px. Preserve a well-working existing system; no single size is universally correct. Avoid essential information at very small sizes simply to make the layout fit.

- Use roughly 45–75 characters per line for sustained reading as an initial target, not a rule for tables or labels.
- Give body text around 1.5 line height initially; adjust for width, font, language, and wrapping. Larger headings usually need tighter leading.
- Align mixed-size text on a shared baseline where they form one textual unit. Center an icon/button only where optical alignment calls for it.
- Align prose to its language's start edge. Center short titles or short standalone messages when appropriate; avoid long centered paragraphs.
- Align comparable numbers by their numeric end/decimal conventions and use tabular numerals where supported. Keep units and precision consistent within comparisons.
- Prefer normal and one stronger weight initially. Add weights for real roles, not incidental variety.
- Adjust tracking carefully for display text or all-caps labels; leave ordinary body letter spacing near the typeface's intended design. Test other scripts before imposing Latin typography assumptions.
- Preserve zoom, text resizing, and user spacing overrides. Prefer wrapping/min-height over fixed text boxes.

## Color, contrast, and depth

Define roles before choosing shades: canvas, surface, raised surface, primary/secondary text, subtle separator, control boundary, action, selection, focus, and semantic status. Supply foreground/background pairs, including relevant hover and pressed states. Map those roles to existing colors; do not create a second palette alongside the app's theme.

Use accent color intentionally. Avoid giving static decoration the same complete visual treatment as actionable controls. Color is one affordance among shape, placement, underlining, labels, and familiar patterns. Inline links need a recognizable non-color cue; established navigation need not imitate links in prose.

Measure contrast on the actual composite background, including opacity, images, and overlays. For WCAG 2.2 AA text contrast, ordinary text requires 4.5:1; large text requires 3:1. Large means at least 24 CSS px regular or approximately 18.67 CSS px bold, with the criterion's definitions and exceptions. Do not round an 18px bold label into the large-text category. See [W3C text contrast](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html).

Visual information needed to identify controls and their states generally needs 3:1 contrast against adjacent colors under WCAG 2.2 AA, subject to its exceptions. Use the [non-text contrast criterion](https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast.html) to judge which boundary actually conveys information. A decorative card border is different from the only visible outline of an input. Never lower necessary text contrast to make hierarchy softer. Do not use color as the sole status/selection signal.

Dark mode needs its own foreground/surface decisions, not a simple inversion. Recheck saturation, disabled appearance, shadows, and elevation against dark surfaces. Respect forced-colors settings; outlines and borders can survive where shadows and backgrounds do not.

Use elevation to explain layering: an anchored menu sits above content, a dragged item separates from its list, and a modal introduces a blocking layer. Keep a small consistent shadow/elevation family. Subtle shadows can combine a tight contact shadow and a softer ambient one. Avoid making every card float.

## Finish with restraint and specificity

Balance icon weight against nearby text; avoid a heavy filled icon overpowering a label. Use icons near their intended optical size, with consistent strokes and viewboxes. Keep decorative SVGs out of the accessible name; name icon-only controls.

Account for real images: preserve aspect ratio, choose a focal crop, handle missing images, and ensure text contrast across possible content. Use a scrim or solid text surface when needed; a text shadow alone cannot guarantee contrast.

Design empty and error states alongside populated states. Preserve useful structure, show an appropriate action, and remove controls that have no purpose in that state. A filtered zero-result state still needs a way to change or clear the filter.

Give the product character through coherent type, color, geometry, elevation, and a few expressive moments. Do not automatically add gradients, glass panels, decorative icons, or motion to every surface. Check details such as baseline alignment and buttons that change size while loading.

## Diagnose and repair

| Symptom                           | Likely cause                               | First repair to try                                            |
| --------------------------------- | ------------------------------------------ | -------------------------------------------------------------- |
| Everything competes               | Too many equally strong treatments         | Reduce secondary emphasis and identify the actual primary task |
| Clean but cryptic                 | Necessary labels/affordances removed       | Restore cues and explicit selected states                      |
| Form feels disconnected           | Equal spacing within and between groups    | Tighten each field group, separate groups                      |
| Layout feels boxed in             | Redundant nested containers                | Replace an unnecessary boundary with spacing/alignment         |
| Calm palette is hard to read      | Secondary contrast sacrificed              | Use a readable muted token, not global opacity                 |
| Desktop looks good, mobile breaks | Fixed dimensions or proportional shrinkage | Reflow and preserve target/type size                           |
| New component looks foreign       | One-off visual decisions                   | Map it to neighboring component roles and tokens               |
