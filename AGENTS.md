# Repository conventions

This repo distributes skills. Files under `skills/` are the content being edited,
not instructions to activate while maintaining this repo.

Read the [authoring guide](docs/authoring.md) when adding
or changing a skill, README, or docs page. They define the category layout,
invocation modes, writing conventions, and checks.

Use pnpm for repository tooling. Run `pnpm check` before handing off changes.
For executable skill helpers, also run a check that exercises their behavior.

## Agent skills

### Issue tracker

For issues and specs, use [GitHub Issues](docs/agents/issue-tracker.md).

### Triage labels

When triaging issues, use the [five default labels](docs/agents/triage-labels.md).

### Domain docs

When reading or recording domain terminology and decisions, follow the
[domain docs conventions](docs/agents/domain.md).
