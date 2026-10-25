# Compose layouts that hold up

Read this file when changing grouping, alignment, responsive structure, or
content overflow. Inspect the real container, content, source order, and existing
spacing and density conventions first. Finish with reachable content and actions
at the supported sizes, directions, and zoom levels.

Use these decisions for shared layout contracts. Keep a one-off screen composition
in feature code until another consumer proves it should be shared.

## Make relationships visible

Use shared alignment edges and the existing spacing scale. Make the gap between
groups visibly larger than the gap within a group; add a surface or separator
when space alone does not communicate the relationship. Preserve the established
density rather than enforcing a fixed spacing ratio.

Bad: helper text sits as close to the next field as to its own input.
Good: tighten the field group and separate it from the next group using existing
spacing steps. Check the association with real wrapping helper text.

Keep controls recognizable through the project's established shape, underline,
state treatment, or placement. Keep the primary action visually identifiable
without imposing an arbitrary limit on secondary actions.

## Repair intrinsic sizing before shrinking text

Inspect the overflowing element and its ancestors. Apply the repair at the owner
of the constraint, using the project's styling system:

| Observed failure                                  | Candidate repair                                                                                      | Acceptance check                                                         |
| ------------------------------------------------- | ----------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------ |
| A flexible grid track expands around a long value | Use `minmax(0, 1fr)` for the track that should shrink, then wrap or intentionally scroll its content. | The value no longer pushes actions outside the container.                |
| A flex child's content prevents shrinking         | Give that child `min-inline-size: 0` and a deliberate wrapping or overflow treatment.                 | Long text remains available and neighboring controls fit.                |
| Text clips inside a fixed-height box              | Use content-driven height or a minimum height; constrain and scroll only when the task needs it.      | Longer labels and errors remain reachable.                               |
| A toolbar runs out of room                        | Wrap related controls or collapse into the established compact composition.                           | Order and actions remain understandable on both sides of the breakpoint. |

These are diagnostic choices, not blanket replacements. A data table may need
horizontal scrolling; a decorative region may intentionally clip.

## Adapt where the content stops fitting

Test the smallest and largest supported containers, then the widths where content
fails. Preserve established breakpoints that work. Use container queries when a
reusable component's layout depends on its allocated width and the supported
stack provides them; give its query container a viable size. Use viewport queries
for page-level changes that depend on the viewport.

Bad: switch a sidebar card at a phone breakpoint even when it is narrow on a
wide desktop page. Good: adapt to the card's container and verify it in both the
sidebar and main column, including translated labels.

Match visual reading order to sensible DOM and focus order. Use logical properties
where placement follows reading direction; keep physical geometry such as device
safe-area edges physical. Test supported RTL layouts rather than mirroring every
graphic or swapping the source order.

## Keep content and actions reachable

Give necessary content beyond a scroll edge or disclosure a visible cue. When a
value is truncated, provide an expand action, detail view, or other full-text path
that works with the relevant keyboard and touch inputs. A hover-only title is not
a reliable recovery path.

Account for sticky chrome in anchor and focus positioning, using scroll padding
or margins in the owning scroll container. Check the last field and action with
the mobile keyboard open. Dynamic viewport units and safe-area insets are tools,
not proof that the keyboard or browser chrome cannot obscure a control.

Bad: an anchor target and its focused action land beneath a sticky header.
Good: account for the header's actual height and check anchor navigation and
keyboard focus after the header wraps or changes size.

## Verify the composition

Use real and long content, a long-label locale or pseudo-localization, supported
RTL, narrow and wide containers, and 200% zoom. Check shared edges, grouping,
overflow, source/focus order, hidden-content recovery, and critical actions.

Done means content remains understandable and necessary actions are reachable
without unintended clipping or overlap. Label unavailable browser, locale, or
device checks `Not verified`; a differing spacing value alone is not a defect.
