# Agent setup

Use this reference during the interview and when configuring the selected coding
agents. Ask for Claude Code, Codex, both, or another agent; the agent currently
running bootstrap is not necessarily the user's only choice. Keep changes in
the project unless the user requests a global installation.

## Instruction files and rules

| Selected agents | Fresh-repo layout                                                                                                                                         |
| --------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Claude Code     | `CLAUDE.md` for project instructions.                                                                                                                     |
| Codex           | `AGENTS.md` for project instructions.                                                                                                                     |
| Both            | `AGENTS.md` as the shared source; after companion setup, add a `CLAUDE.md` containing `@AGENTS.md`. Keep any Claude-specific additions below that import. |

Check the installed agents' behavior against the current
[Claude memory documentation](https://code.claude.com/docs/en/memory) and
[Codex instruction documentation](https://learn.chatgpt.com/docs/agent-configuration/agents-md).
The Claude import provides compatibility across installations that do not load
`AGENTS.md` directly. Use a relative in-repo import rather than an absolute path
to the user's machine.

Preserve existing instruction files and keep shared guidance in its current
file. When adding a second agent, give its entry file an explicit route to that
guidance rather than copying it. Codex instructions can tell the agent to read
an existing `CLAUDE.md`; Claude's `@` import syntax is not a Codex import
feature. If both files exist, reconcile conflicting instructions with the user
and keep each shared rule in one place. Companion setup owns its `Agent skills`
block; check that both agents can read the file it updates.

Record the conventions an agent needs for this repo: domain boundaries, spec and
design pointers, checks required before handoff, generated files to leave to
their tools, and restrictions on migrations, publication, or deployment. Link
to configuration for discoverable values instead of repeating it. Do not create
a product roadmap or copy a generic coding manifesto into the instruction file.

Add scoped rules only when a subtree has different requirements. Claude can use
path-scoped `.claude/rules/*.md`; Codex can use nested `AGENTS.md` files. Shared
rules must remain reachable by both selected agents. A `.claude/rules` file alone
does not configure Codex. Use ordinary linked project docs when automatic scope
loading is unnecessary. Create no empty rule directories.

Add agent settings, hooks, custom skills, or MCP configuration only for an agreed
need. Keep tokens and personal account settings out of version control. Do not
change global settings, disable sandbox/approval protections, or preapprove broad
commands as a bootstrap convenience. Permission rules are not coding conventions.

## Recommended skills for every repo

Propose this shared set from [Matt Pocock's skills](https://github.com/mattpocock/skills).
It is a recommendation across project types, not a mandate to invoke every skill
on every task. Let the user adjust the selection during the bootstrap interview.

| Skills                     | Purpose                                                                                                      |
| -------------------------- | ------------------------------------------------------------------------------------------------------------ |
| `setup-matt-pocock-skills` | Configure the tracker, triage conventions, and domain docs. Required when per-repo setup remains incomplete. |
| `grill-me`, `grilling`     | Resolve decisions through an interview; include the reusable skill the wrapper needs.                        |
| `domain-modeling`          | Maintain domain vocabulary and architectural decisions.                                                      |
| `codebase-design`          | Choose module boundaries and interfaces.                                                                     |
| `tdd`                      | Develop behavior through tests when implementation work begins.                                              |
| `diagnosing-bugs`          | Diagnose failures before changing code.                                                                      |
| `code-review`              | Review changes against conventions and the spec.                                                             |
| `writing-for-agents`       | Maintain agent instructions and skills.                                                                      |
| `handoff`                  | Carry decisions and unfinished work into another session.                                                    |

Offer `grill-with-docs`, `to-spec`, `to-tickets`, and `wayfinder` when the
project's planning workflow needs them; include `triage` only when the project
will use its issue workflow. Keep stack-specific skills conditional. For
example, recommend relevant React skills for a React frontend and
Cloudflare/Workers/Wrangler skills for a Workers target. Do not install UI or
cloud skills into every CLI or library.

For a React frontend, include the model-invoked `design-system` skill from
[SarthakMishra/skills](https://github.com/SarthakMishra/skills). It establishes the
foundation's design conventions and guides later component changes. Check its
availability before frontend setup; see the [companion installation guidance](../README.md#companion-skills).

## Install and verify the accepted set

Inventory project, user-level, and plugin-provided skills first. Reuse suitable
installations; avoid duplicate names and conflicting copies. Check current source
repositories and skill dependencies before selecting names. Install only accepted
missing skills, including the selected wrappers' required skills and references.

Use the `skills` CLI, available through `pnpm dlx skills`. Inspect its current
help and preview upstream names with `pnpm dlx skills add mattpocock/skills --list`.
Install with explicit `--skill` and `--agent` selections; avoid an unfiltered
installation of the entire collection. Agent identifiers are `codex` and
`claude-code`.
Prefer a project installation for shared repo conventions. An existing personal
or plugin installation can satisfy a dependency; document any onboarding
requirement for collaborators without copying the user's home directory.

Verify the resulting paths against the current [Codex skills
documentation](https://learn.chatgpt.com/docs/build-skills) and [Claude skills
documentation](https://code.claude.com/docs/en/skills). Codex project skills use
`.agents/skills`; Claude project skills use `.claude/skills`. Let the installer
manage supported shared copies or links. Check that references inside each
installed skill resolve and retain source and license information. Exclude
machine-local state and credentials from the commit.

Installing a user-invoked skill does not invoke it. Preserve its invocation
controls and the explicit companion setup handoff in the main workflow.

Inspect files and links, then use each selected agent's fresh session to verify
which instructions and skills it sees. Ask it to identify the project's checks
and spec/domain pointers without changing files. Confirm a selected skill is
discoverable and a user-only skill is not automatically invoked by a nearby task.
For example, ask how to fix a README typo without invoking bootstrap and without
editing files; it should describe a scoped edit, not start a bootstrap interview.
If an agent is unavailable, report that live discovery remains unverified;
configuration inspection alone is not an executed check.
