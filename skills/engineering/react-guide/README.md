# React guide

Use `$react-guide` in Codex or `/react-guide` in Claude Code for writing,
reviewing, refactoring, or upgrading React code.

It guides everyday choices for render purity, state, Effects, async data,
Actions, composition, Context, refs, transitions, memoization, and server/client
boundaries. It includes focused references with Good/Bad examples for forms,
composition, data, Compiler behavior, concurrent UI, API selection, and React
19 upgrades.

## Check the result

- Render stays pure and state contains no avoidable derived data.
- User actions run in handlers or Actions, not flag-watching Effects.
- Effects synchronize external systems and clean up.
- Async paths preserve the relevant pending, failure, rollback, accessibility,
  and hydration behavior.
