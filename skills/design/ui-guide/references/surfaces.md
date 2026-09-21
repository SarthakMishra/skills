# Surfaces

Use a boundary to explain a relationship and elevation to explain a layer.
Keep static sections flat. Read [layout](layout.md) before adding a container and
[color](color.md) before choosing its foreground/background pair.

## Match nested radii

For closely nested rounded rectangles with an even inset, use:

```text
outer radius = inner radius + inset
```

The inset is the visible distance between the two curves, including a border
when it contributes to that distance. Preserve independent component tokens when
the layers do not visually share an edge, the padding is asymmetric, or the
inset is wide enough that the shapes read independently.

```css
/* Bad: identical radii produce uneven-looking corners at a small inset. */
.preview {
  padding: 8px;
  border-radius: 12px;
}
.preview img {
  border-radius: 12px;
}

/* Good: an 8px inset connects 12px inner and 20px outer curves. */
.preview {
  padding: 8px;
  border-radius: 20px;
}
.preview img {
  border-radius: 12px;
}
```

Check the visible curves rather than applying the formula to every card in the
product. A pill button inside a large rectangular panel is an independent shape.

## Distinguish structure from elevation

| Situation                                           | Default treatment                               |
| --------------------------------------------------- | ----------------------------------------------- |
| Static section                                      | Spacing; no shadow                              |
| Dense table row or divider                          | A separator border                              |
| Input or selected boundary needed to identify state | A contrast-tested border or outline             |
| Menu, dialog, or dragged item                       | Raised surface and a restrained elevation token |

Do not replace focus outlines or structural dividers with shadows. For a border
used only to suggest depth, a transparent layered shadow can fit varied surfaces
better. Respect forced-colors mode, where shadows can disappear.

Without elevation tokens, this is a starting recipe for overlays, not every card:

```css
.raised-panel {
  color: var(--ui-text);
  background: var(--ui-raised);
  box-shadow:
    0 0 0 1px rgb(0 0 0 / 0.08),
    0 2px 4px rgb(0 0 0 / 0.08),
    0 8px 24px rgb(0 0 0 / 0.12);
}
[data-theme="dark"] .raised-panel {
  box-shadow:
    0 0 0 1px rgb(255 255 255 / 0.14),
    0 8px 24px rgb(0 0 0 / 0.3);
}
@media (forced-colors: active) {
  .raised-panel {
    outline: 1px solid CanvasText;
    box-shadow: none;
  }
}
```

Adapt the theme selector to the app. Keep a small shared elevation family instead
of inventing a shadow for each component. A shadow is decoration, not proof of
control contrast or a replacement for modal semantics.

## Frame real images

1. Preserve aspect ratio and choose the focal crop from the actual content.
2. Handle missing images without collapsing the surrounding layout.
3. Where an image edge disappears into the surface, use an inset 1px outline.
   Default to neutral black at 10% opacity in light mode and white at 10% in dark.
4. Put overlaid text on a tested scrim or solid surface. A text shadow alone
   cannot guarantee contrast across different images.

```css
.framed-image {
  outline: 1px solid rgb(0 0 0 / 0.1);
  outline-offset: -1px;
}
[data-theme="dark"] .framed-image {
  outline-color: rgb(255 255 255 / 0.1);
}
```

Keep deliberate existing image framing. Do not add a tinted outline merely to
match an accent; it changes the apparent image edge.

## Check stable geometry

| Bad                                                 | Good                                                                        |
| --------------------------------------------------- | --------------------------------------------------------------------------- |
| Add a border only on selection, shifting the label. | Reserve border width before selection or use an outline.                    |
| Hover lifts every nested card.                      | Reserve elevation changes for a draggable or layered object.                |
| Scale the entire table row when pressed.            | Keep its geometry fixed and change the control's state cue.                 |
| Dark mode reverses every shadow color.              | Use dark surface separation and a restrained ring, then inspect the result. |

For the filter panel, use a raised surface, a bounded radius, and a stable input
boundary. Use [motion](motion-design.md) for entrance and exit; use
[interaction design](interaction-design.md) for focus and dismissal expectations.
Apply them in the [filter-panel design](interaction-design.md#example-filter-panel).
