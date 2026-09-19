# Agent skills

Personal collection of reusable skills for AI agents, using the
[Agent Skills format](https://agentskills.io/specification).

Each skill lives at `skills/<skill-name>/SKILL.md`, a layout supported by the
[Skills CLI](https://github.com/vercel-labs/skills).

## Skills

- [ux-writer](skills/ux-writer/SKILL.md)
- [ux-guide](skills/ux-guide/SKILL.md)

Both skills were copied from the `wekeep` project's `.agents/skills/` directory.

## Development

Use Node.js 22.13 or newer and the pnpm version pinned in `package.json`.

```sh
pnpm install
pnpm format
pnpm check
```

`pnpm check` runs [Oxfmt](https://oxc.rs/docs/guide/usage/formatter) for formatting
and [Oxlint](https://oxc.rs/docs/guide/usage/linter) for JavaScript and TypeScript
helpers. Oxlint allows an empty collection with no code files. These checks do
not validate skill behavior or the full Agent Skills specification. GitHub
Actions runs the same checks.

## Add a skill

Create `skills/<skill-name>/SKILL.md`. Start with this template and replace its
example name, description, and instructions with the actual workflow:

```markdown
---
name: my-skill
description: Describe what this skill does and when an agent should use it.
---

# My skill

Write the task-specific instructions here, including how to verify the result.
```

The name must match its directory, use 1–64 lowercase letters, digits, or hyphens,
and have no leading, trailing, or consecutive hyphens. The description must be
non-empty and at most 1024 characters.

Keep resources inside the skill directory so it can be installed independently.
Add `scripts/`, `references/`, or `assets/` only when the skill needs them, and link
supporting documents from `SKILL.md`. State required tools or agent-specific
features in the optional `compatibility` frontmatter field. Add optional agent
metadata, such as `agents/openai.yaml`, within the skill directory when needed.

When importing someone else's skill, retain its license and attribution and record
its source URL. Keep credentials and private examples out of published skills.

After adding a skill, check discovery without installing anything:

```sh
pnpm dlx skills add . --list
```

To try it in selected agents, run this from the repo root, replacing `my-skill`:

```sh
pnpm dlx skills add . --skill my-skill --agent codex claude-code
```

Then exercise a representative task in each intended agent and check the result.

## Share the collection

Once the repository is on GitHub, replace `OWNER/REPO` with its actual location.
Users can list its skills and install the ones they choose:

```sh
pnpm dlx skills add OWNER/REPO --list
pnpm dlx skills add OWNER/REPO
```

Skills remain hosted in the GitHub repository. According to the
[skills.sh FAQ](https://www.skills.sh/docs/faq), skills appear in its directory
through installation telemetry. There is no site build or npm publishing step.
The package is marked private because it only manages development tooling.

## License

[MIT](LICENSE) for original content. Imported skills retain their own license
notices where applicable.
