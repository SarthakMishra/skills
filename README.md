# Skills

My agent skills that I use every day.

```sh
npx skills add SarthakMishra/skills
```

Choose the skills and agents during installation. Add `--list` to preview the collection.

## Skills

### Design · model-invoked

| Skill                                                 | Use it to                                        |
| ----------------------------------------------------- | ------------------------------------------------ |
| [design-system](skills/design/design-system/SKILL.md) | Build, adopt, and enforce a React design system. |
| [ui-guide](skills/design/ui-guide/SKILL.md)           | Design interfaces and component interactions.    |
| [ux-guide](skills/design/ux-guide/SKILL.md)           | Design or repair user flows.                     |
| [ux-writer](skills/design/ux-writer/SKILL.md)         | Write labels, errors, and confirmations.         |

The agent uses these when a task fits. To invoke one directly, use `/skill-name`
in Claude Code or `$skill-name` in Codex, such as `/ui-guide` or `$ui-guide`.
See the [design-system usage guide](skills/design/design-system/README.md) for
creation, adoption, and component enforcement examples.

### Engineering · model-invoked

| Skill                                                                      | Use it to                                                                      |
| -------------------------------------------------------------------------- | ------------------------------------------------------------------------------ |
| [commit](skills/engineering/commit/SKILL.md)                               | Create focused commits using the repository's conventions.                     |
| [establish-conventions](skills/engineering/establish-conventions/SKILL.md) | Research architecture and conventions and create a repo-specific coding skill. |

Use `$commit` in Codex or `/commit` in Claude Code, or ask the agent to commit.
Automatic checkpoints require an explicit opt-in. See the
[commit usage guide](skills/engineering/commit/README.md).

Use `establish-conventions` when creating or revising project rules. It can
grill missing requirements and write the project basis first. See the
[conventions usage guide](skills/engineering/establish-conventions/README.md)
for research, interviews, generated skills, and maintenance.

### Engineering · user-invoked

| Skill                                              | Use it to                                                                |
| -------------------------------------------------- | ------------------------------------------------------------------------ |
| [bootstrap](skills/engineering/bootstrap/SKILL.md) | Establish the project basis and create a verified TypeScript foundation. |

Select `/bootstrap` in Claude Code or `$bootstrap` in Codex explicitly.
See the [bootstrap usage guide](skills/engineering/bootstrap/README.md) for
prerequisites and companion skills.

Bootstrap can grill missing requirements into a PRD, spec, or architecture
document. Design-system setup is optional for frontends.

## Development

Use Node.js 22.13+ and the pnpm version in `package.json`.

```sh
pnpm install
pnpm format
pnpm check
```

After the initial push, updates to `main` require a passing `check` workflow.
Push changes to a branch and open a pull request. CI runs from external
contributors require maintainer approval.

See the [security policy](.github/SECURITY.md) for private vulnerability reporting
and guidance on reviewing skills before installation.

## License

[MIT](LICENSE). Imported skills retain their own notices.
See [sources and attribution](docs/authoring.md#attribution).
