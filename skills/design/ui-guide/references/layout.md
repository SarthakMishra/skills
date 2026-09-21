# Layout

Put the primary information and action first. Use spacing and shared edges to
show relationships, then test the layout with long content and narrow containers.
Use [typography](typography.md) for text sizing and [surfaces](surfaces.md) for
boundaries and depth. This reference owns placement, density, and reflow.

## Establish hierarchy

1. Identify what the user needs to notice first, second, and only on request.
2. Reduce competing emphasis before enlarging the primary element. Check bright
   sidebars, badges, heavy icons, repeated borders, and equally filled buttons.
3. Give the preferred action prominence within its task region. Keep equally valid
   choices equal; independent task regions can each have a primary action.
4. Judge the component in its surrounding screen. A reduced-scale view helps spot
   competing emphasis, but does not prove that users understand the interface.

| Bad                                                       | Good                                                                                 |
| --------------------------------------------------------- | ------------------------------------------------------------------------------------ |
| Save, Cancel, and Delete are equally filled and adjacent. | Fill Save, make Cancel secondary, and separate Delete from routine actions.          |
| A balance is buried below account metadata.               | Lead with the value; keep its identifying label beside it.                           |
| Every subsection gets another card.                       | Use spacing until a boundary adds information, such as selection or a separate task. |

## Group with spacing

Reuse the project's spacing and density tokens. If none exist, use 4, 8, 12, 16,
24, 32, 48, and 64 CSS px expressed through rem-based tokens.

| Relationship                               | Default                    |
| ------------------------------------------ | -------------------------- |
| Label, field, and associated hint          | 8px within the field group |
| Separate field groups                      | 24px                       |
| Sections within a form                     | 32px                       |
| Adjacent filled or bordered action buttons | 12px; allow wrapping       |
| Nested content                             | One 16px indent step       |

Keep headings closer to their following content than the preceding section.
Align labels, fields, and section edges. Keep row actions beside their row.
Use a background for a unit that must read as selectable or draggable. Use
separators for dense rows where extra space would impair comparison.

```css
/* Bad: equal gaps hide the field-group boundaries. */
.form > * {
  margin-block-end: 1rem;
}

/* Good: separate internal spacing from spacing between groups. */
.form {
  display: grid;
  gap: 1.5rem;
}
.field {
  display: grid;
  gap: 0.5rem;
}
.actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
}
```

Preserve compact tables and expert workspaces. Check readable rows and distinct,
nonoverlapping hit areas instead of converting them into spacious cards. Use
[validation](review-and-validation.md#check-usability-constraints) for target checks.
Keep introductory or infrequent decisions in a simple form, not a dense toolbar.

## Fit content before choosing breakpoints

- Bound a single-column form at 32rem when no width token exists. Keep its width
  at or below its container. Prose measure belongs to typography; comparison
  tables and workspaces do not inherit the form bound.
- Let navigation fit its labels and the work area flex. Avoid a universal percentage
  split that truncates navigation or wastes space.
- Choose the breakpoint where content stops fitting. For reusable components,
  use container queries when supported; use a wrapping layout as the fallback.
- Test the smallest and largest supported sizes, then resize between them. Retain
  readable text and usable targets; reduce outer whitespace before shrinking them.

```css
/* Bad: a fixed box assumes one language and viewport. */
.settings {
  width: 512px;
  height: 480px;
  overflow: hidden;
}

/* Good: content grows inside a bounded column. */
.settings {
  inline-size: 100%;
  max-inline-size: 32rem;
  min-inline-size: 0;
}
```

Test long names, translated labels, large values, empty collections, and many rows.
Use `min-inline-size: 0` for flex or grid children that must shrink. Let labels and
rows wrap. Give two-dimensional tables deliberate horizontal scrolling. Keep a
critical action reachable when the keyboard opens or the pane shrinks.

## Preserve order, direction, and safe areas

- Keep DOM reading and focus order aligned with visual order. Do not repair a
  confused source order with CSS `order`.
- Use logical spacing and `text-align: start` for reading direction. Reserve
  physical offsets for physical geometry such as safe-area insets.
- Let media bleed to an edge only when the layout calls for it. Keep text and
  controls inside content margins; default to 16px inline on small screens.
- Add safe-area padding to fixed or sticky controls. Reserve room for that chrome
  in scrollable content so it cannot cover the final row or action.

| Bad                                                    | Good                                                                                           |
| ------------------------------------------------------ | ---------------------------------------------------------------------------------------------- |
| `margin-left` hardcodes an indent in a localized form. | `margin-inline-start` follows document direction.                                              |
| A fixed footer covers the final result.                | Reserve its occupied space and include the bottom safe-area inset.                             |
| Hidden filters have no visible entry point.            | Keep a labeled disclosure and show the active filter count.                                    |
| A scroller ends flush with no overflow cue.            | Preserve the project's cue, or reveal 24px of the next item. Verify the peek at actual widths. |

## Apply to the filter panel

Use one column: heading, search field, results, and action row. Keep the field
group at 8px, task groups at 24px, and actions wrapping at 12px when no tokens
exist. Keep filters visible when results are empty. Do not move the search input
when pending feedback appears.

Continue with the [interaction-design example](interaction-design.md#example-filter-panel).
Check reflow, long strings, focus order, and placement in the surrounding screen.
