# Commit

Use `$commit` in Codex or `/commit` in Claude Code to create focused Git commits
using the repository's message format and checks. The skill supports any language
or repository layout and falls back to Conventional Commits when needed.

## When to use it

The agent can also select this skill for a commit request or an authorized
automatic checkpoint.

```text
$commit Commit the parser fix and its tests. Leave the unrelated README edit alone.
```

```text
$commit Draft a message for the staged changes without creating a commit.
```

The skill inspects existing changes, groups related work, runs the required checks,
and reports the resulting hashes and remaining work. Existing staged changes are
not automatically part of the request. It leaves ambiguous or inseparable work
pending rather than committing someone else's changes.

Git and access to the repository's verification tools are required. Existing
hooks, signing, commit conventions, and release rules take precedence over the
skill's defaults.

## Optional automatic checkpoints

Installing the skill does not enable automatic commits. Opt in through
the `bootstrap` skill or explicitly ask the agent to add the policy to your
project's agent instructions. If `bootstrap` is unavailable, install it with:

```sh
npx skills add SarthakMishra/skills --skill bootstrap
```

With that policy enabled, the agent commits completed, checked units as it works.
Related implementation, tests, and documentation stay together. It does not wait
until the end of a long session to commit several unrelated changes, and it does
not split work merely to keep each commit under a file limit.

You can ask it to leave a task uncommitted or turn the policy off. Automatic local
commits do not enable pushes, releases, or history rewrites.

## Check the result

- Each commit contains one complete change and passes its required checks.
- The message follows local conventions and describes the committed diff.
- Unrelated staged and unstaged changes remain intact.
- The handoff names the commits, verification results, and pending work.

## Source

Adapted from the wekeep project's
[`commit` skill](https://github.com/wekeep-in/wekeep/blob/a5a5ac8e1498b6ef532fdf559db3954db9c5b84e/.agents/skills/commit/SKILL.md),
originally authored by wekeep, and its
[checkpoint instruction](https://github.com/wekeep-in/wekeep/blob/a5a5ac8e1498b6ef532fdf559db3954db9c5b84e/AGENTS.md).
The adaptation removes product-specific scopes, release commands, and version
rules. The supplied skill had no separate license notice.
