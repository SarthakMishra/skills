# Final UI polish

Run this pass after hierarchy, content, and interaction state work. Inspect the
actual component at rest and during use. Fix one root cause at a time; do not add
a signature effect to every control.

## Choose the repair

| Observed problem                                | Action                                                    | Reference                     |
| ----------------------------------------------- | --------------------------------------------------------- | ----------------------------- |
| Misaligned content, equal gaps, crowded actions | Restore shared edges and relationship-based spacing.      | [Layout](layout.md)           |
| Weak hierarchy or clipped text                  | Restore type roles, wrapping, and full-text access.       | [Typography](typography.md)   |
| An icon looks heavier or off-center             | Match the family's weight and correct its presentation.   | [Iconography](iconography.md) |
| Muted text or a state is hard to distinguish    | Check role pairs and add a non-color cue.                 | [Color](color.md)             |
| Nested curves or image edges look uneven        | Inspect radii, framing, and the purpose of each boundary. | [Surfaces](surfaces.md)       |

## Refine state changes

| Bad                                                        | Good                                                                                |
| ---------------------------------------------------------- | ----------------------------------------------------------------------------------- |
| Every icon animates when the screen first appears.         | Show the initial state at rest; animate a later meaningful state change.            |
| A theme change transitions every background and border.    | Specify an immediate theme change without a page-wide cross-fade.                   |
| A button shrinks when its label becomes a spinner.         | Keep its dimensions and accessible name; show status without replacing the control. |
| An icon swap creates a new focal point on every keystroke. | Keep routine input immediate; animate only a meaningful state change.               |

Use [motion](motion-design.md) for timing and reduced-motion treatments. Keep a
contextual icon swap local to the glyph; the button, label, and focus remain stable.
Implementation details for theme commits, presence, and state ownership belong to
the engineering workflow, not this visual pass.

## Keep states complete

1. Inspect default, hover, focus, pressed, pending, error, empty, and selected
   states that the component defines. Keep static cues when motion is disabled.
2. Preserve useful structure in empty and error states. Keep a recovery action and
   filters after a zero-result search; remove only controls with no purpose there.
3. Judge motion at normal speed and after repeated use. Use slow playback to locate
   a timing defect, then return to normal speed before accepting the repair.
4. Check geometry in both themes, narrow layouts, long content, and forced colors.
   Report observed stutter for runtime investigation; appearance alone does not
   identify its technical cause.

Give the product character through consistent type, color, geometry, and a few
intentional moments. Gradients, glass, bounce, or blur need a reason tied to the
task. Do not manufacture an improvement when the existing treatment works.

Report concrete before/after behavior using [review and validation](review-and-validation.md).
Mark unexercised checks `Not verified`; a polish pass is not an app-wide
accessibility or performance certification.
