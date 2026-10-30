# Finishing touches

Use this reference when a component is correct, clear, and well spaced, and still
looks plain. Apply one or two touches per view; finishing touches stack into noise
quickly. Fix hierarchy and spacing first.

## Keep one personality

A product's personality comes from a few concrete choices that must stay
consistent across components:

| Choice   | Effect                                                                                                         |
| -------- | -------------------------------------------------------------------------------------------------------------- |
| Typeface | Serif reads elegant or classic; rounded sans reads playful; neutral sans leaves personality to other elements. |
| Color    | Blue reads safe and familiar; gold or deep tones read premium; pink or bright accents read fun.                |
| Radius   | None reads formal; small reads neutral; large reads friendly or playful.                                       |
| Words    | Formal wording reads official; casual wording reads friendly.                                                  |

Never mix square and rounded corners, or formal and playful details, in one
interface. A new component takes the radius, type, and color of its neighbors,
even when another style looks better in isolation.

## Supercharge the defaults

Improve what is already there before adding new elements:

- Replace list bullets with icons that fit the content: checks for features,
  a lock for security items, arrows for steps.
- Turn the quotation marks of a testimonial into a large, colored visual element.
- Give in-text links a custom underline: thicker, colored, offset
  (`underline decoration-primary/40 decoration-2 underline-offset-4`).
- Give checkboxes, radios, and switches the brand color in their selected state
  instead of the browser default.

## Add an accent border

A strip of brand or accent color adds personality without illustration:

- across the top of a card (`border-t-4 border-t-primary`);
- on the side of an alert, in its status color (`border-l-4`);
- under the active navigation item;
- as a short bar under a heading;
- across the top of the whole layout.

## Decorate a background

Break up a plain page without changing the layout:

- Change a section or panel's background color to set it apart.
- Use a subtle gradient between two hues no more than about 30 degrees apart.
- Add a low-contrast repeating pattern, across the background or along one edge.
- Place one simple shape or illustration in a corner, also at low contrast.

Keep decoration quiet enough that text contrast is unaffected.

## Design the empty state

For anything built on user content, the empty state is the first thing a new user
sees. Design it as a feature:

1. An illustration or a large icon in a tinted shape.
2. One sentence on what will appear here.
3. The primary action to create the first item, styled as primary.

Hide tabs, filters, sorting, and bulk actions until there is content they can act
on.

Bad: a table header row above "No results."

Good: a centered icon, "Invoices you send will appear here.", and a `Create
invoice` button, with the filter bar hidden until the first invoice exists.

## Rethink the component's shape

Familiar components do not have to take their familiar form:

- **Dropdown menus** can have sections, headings, icons, descriptions, or several
  columns.
- **Tables** can merge related columns into one cell with its own hierarchy (a
  name with the email muted below it), and include avatars, badges, or color
  where they help. Keep separate columns where people sort.
- **Radio groups** for an important choice, such as a plan or shipping method,
  can become selectable cards with a title, description, and price.

Bad: a plan picker as three radio buttons with one-line labels.

Good: three cards in a `RadioGroup`, each with the plan name, price, and two key
limits, the selected card with a primary ring.

## Learn from designs you admire

When a design looks good, look for the choice you would not have made: a
background inverted on the selected date, a button inside an input, a headline in
two colors. Rebuilding a favorite interface without inspecting its code reveals
details such as tighter heading line-height, tracked uppercase labels, and layered
shadows.
