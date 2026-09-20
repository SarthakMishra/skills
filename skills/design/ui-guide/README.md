# UI guide

Use `/ui-guide` in Claude Code or `$ui-guide` in Codex with a specific request:

```text
Review this settings panel for spacing, focus states, and loading feedback.
Suggest fixes without changing the code.
```

The agent can also select this skill automatically when a task fits.

## When to use it

| You need to improve    | It covers                                               |
| ---------------------- | ------------------------------------------------------- |
| Layout and readability | Spacing, grouping, typography, and color.               |
| Component states       | Hover, focus, selection, loading, and errors.           |
| Motion and gestures    | Timing, interruption, repeated use, and reduced motion. |

It uses the project's stack, tokens, and components. React and Tailwind are
optional. The agent adds motion only when it helps the interaction.

## Give it enough context

1. Point to the screen or component and describe the problem.
2. Say whether you want a review, a fix, or a proposal before implementation.

Include a screenshot for visual issues. Interaction problems need the running
app, a recording, or a description of what happens. State what should stay unchanged.

## What you get

A review returns prioritized findings and proposed repairs. A fix includes code
changes and checks of the affected states. If you ask for a proposal before
implementation, the agent pauses for your feedback. Small styling changes stay
within the component you named.

## Check the result

- The primary information and action are easy to identify.
- Keyboard focus and feedback remain clear while loading or after an error.
- Repeated input and reduced motion leave the component usable.
- The response names what was tested and what remains unverified.

For journeys across the app, use [ux-guide](../ux-guide/README.md). For interface
copy, use [ux-writer](../ux-writer/README.md). These skills work independently.
See the [design index](../README.md) for the collection.
