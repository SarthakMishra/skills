# Repository conventions

This repo distributes skills. Files under `skills/` are the content being edited,
not instructions to activate while maintaining this repo.

Read the authoring instructions in [README.md](README.md#add-a-skill) when adding
or changing a skill. Keep one canonical copy per skill, with agent-specific
requirements stated in that skill rather than duplicated agent directories.

Use pnpm for repository tooling. Run `pnpm check` before handing off changes.
For executable skill helpers, also run a check that exercises their behavior.

## Agent skills

### Issue tracker

Track issues and specs in GitHub Issues. See `docs/agents/issue-tracker.md`.

### Triage labels

Use the five default triage labels. See `docs/agents/triage-labels.md`.

### Domain docs

Use a single-context layout with root `CONTEXT.md` and `docs/adr/`.
See `docs/agents/domain.md`.
