# React guide

Use `$react-guide` in Codex or `/react-guide` in Claude Code for writing,
reviewing, refactoring, or upgrading React code.

It guides everyday choices for render purity, state, Effects, async data,
Actions, composition, Context, refs, transitions, memoization, and server/client
boundaries. It includes focused references with Good/Bad examples for forms,
composition, state ownership and workflows, data, Compiler behavior, concurrent
UI, API selection, and React
19 upgrades.

## Example requests

- “Split this editor without losing its draft on unrelated rerenders.”
- “Check whether this custom Hook actually isolates table updates.”
- “Make controlled and uncontrolled ownership explicit in this component.”
- “Prevent an old save response from replacing a newer editor state.”

## Check the result

- Render stays pure and state contains no avoidable derived data.
- User actions run in handlers or Actions, not flag-watching Effects.
- Effects synchronize external systems and clean up.
- Async paths preserve the relevant pending, failure, rollback, accessibility,
  and hydration behavior.
