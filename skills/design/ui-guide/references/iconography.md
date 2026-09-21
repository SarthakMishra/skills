# Iconography

Use the project's icon set, then choose a glyph that matches the action and stays
recognizable at its rendered size. This reference owns glyph choice, weight,
alignment, state, and direction. [Motion](motion-design.md#example-filter-panel-treatment)
owns the transition between glyphs.

## Match size and weight

1. Keep one icon family per control group. Do not mix incompatible stroke styles
   in a toolbar or import a new library for a single glyph.
2. Use the set's intended size, usually 16, 20, or 24px. For inline icons, start
   at the text's cap-height scale and inspect the pair at its smallest actual size.
3. When the set supports adjustable strokes on a 24px grid, start at 1.5px beside
   regular text and 2px beside semibold text. Otherwise retain its native stroke.
4. Fix optical alignment in the SVG or wrapper. Make a 1px correction, inspect,
   and keep it only when it corrects visible imbalance. Do not shift the hit target.

Use an SVG or the existing library component. Prefer a simplified glyph at small
sizes over shrinking detailed artwork. Keep intended viewboxes and inspect
fractional scaling; a larger source grid does not justify changing the set's paths
without seeing the rendered result.

| Bad                                                              | Good                                                                                   |
| ---------------------------------------------------------------- | -------------------------------------------------------------------------------------- |
| A thin custom icon sits beside semibold labels from another set. | Use the established family and match optical weight.                                   |
| A 48px illustration is shrunk into a 16px toolbar slot.          | Use the family's small-size glyph.                                                     |
| A play triangle looks left-heavy despite geometric centering.    | Adjust the presentation optically, keeping the button centered and its hit area fixed. |

## Make state and meaning explicit

- Use `currentColor` for monochrome strokes and fills. Drive hover, selected, and
  unavailable colors through the control's CSS. Preserve deliberate brand artwork.
- Use outline for default and filled for selected when the family supplies that
  pair. Keep the semantic state even if the glyph does not change.
- Give icon-only actions an accessible name. Hide decorative glyphs from assistive
  technology; the button or adjacent text supplies the meaning.
- Keep unfamiliar or consequential actions labeled. A tooltip supplements a label;
  it must not be the only way to discover what an action does.

| Bad                                                              | Good                                                                                    |
| ---------------------------------------------------------------- | --------------------------------------------------------------------------------------- |
| An icon-only Search action has no accessible name.               | Name the action Search and treat the glyph as decoration.                               |
| A monochrome icon embeds a gray that ignores its selected state. | Let the icon use the control's current color while preserving deliberate brand artwork. |

Use [interaction design](interaction-design.md) for recognizable controls, visible
focus, target expectations, and pending feedback.

## Mirror by meaning

| Mirror with reading direction                             | Preserve direction                                       |
| --------------------------------------------------------- | -------------------------------------------------------- |
| Back/forward navigation and directional disclosure glyphs | Logos, checkmarks, and physical objects                  |
| Indent and reading-order glyphs                           | Media playback symbols following the platform convention |

Follow the icon family's RTL guidance for ambiguous or composite glyphs. Do not
apply a blanket mirror to every SVG, and never reverse digits inside an icon.
Keep a badge or slash in its intended position when only the base glyph mirrors.

## Apply to the filter panel

Keep the search glyph decorative inside the labeled field. If an active-filter
count appears on the trigger, make it available as text. A pending spinner is
decorative feedback beside a persistent status; it does not replace the field's
name. A success glyph appears only after a confirmed operation.

Continue with the [filter-panel design](interaction-design.md#example-filter-panel).
For a state icon swap, specify its treatment with [motion](motion-design.md).
Inspect weight, alignment, focus, and semantics with animation disabled as well
as enabled.
