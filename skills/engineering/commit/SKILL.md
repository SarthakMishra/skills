---
name: commit
description: Create focused Git commits and write messages that follow the repository's conventions. Use when asked to commit changes, split work into commits, draft a commit message, or make a completed checkpoint under an explicitly enabled automatic-commit policy. A coding task alone does not authorize commits.
metadata:
  author: wekeep
---

# Commit completed work

Create one commit per logical change. Follow the repository's instructions,
message format, checks, and release requirements. This skill works with any
language or toolchain and does not require a release tool.

## 1. Establish scope and authorization

Read project instructions, contribution guidance, commit validation configuration,
and recent history. Inspect the branch, `git status --short`, staged and unstaged
diffs, and untracked files relevant to the task. Identify which changes belong to
this work before staging anything. For an initial commit, inspect files directly
when there is no `HEAD` to compare against.

If a merge, rebase, cherry-pick, or conflict resolution is in progress, defer
ordinary checkpoints and follow that operation's instructions. Do not complete
or abort it as a side effect of batching changes.

Commit when the user requests it or the project has an explicitly enabled policy
for automatic local checkpoints. An installed skill or a request to change code
does not grant that permission. A message-only or review request must leave Git
unchanged. Respect a later instruction to stop committing or leave work uncommitted.

Use existing authorization without asking again for each covered batch. A local
commit does not authorize a push, tag, release, deployment, history rewrite, or
change to repository settings. Leave these operations out unless requested.

## 2. Choose a complete batch

Group files and hunks by the behavior or decision they implement. Keep code,
relevant tests, required generated files, and documentation together. A change
across several packages can be one commit. Separate unrelated changes, even when
they share a file. Do not batch by file count, extension, or elapsed time.

When automatic checkpoints are enabled, commit after a coherent unit is complete
and checked, before starting unrelated work. Do not wait until the session ends
to commit several finished units. Do not create incomplete commits just to meet
a cadence. A small task may need only one commit.

Preserve pre-existing work and other contributors' changes. Include them only
when the user explicitly puts them in scope. Never discard changes to obtain a
clean tree. If ownership or a safe split is unclear, leave that batch pending and
explain what needs clarification. Continue independent work where possible.

## 3. Verify and select the content

Run the repository's required checks and those relevant to the batch. Follow
its package manager and tooling. Verify the proposed commit without depending
on unrelated uncommitted changes. Do not report a whole-tree test as proof of
an isolated batch if excluded edits affect the result.

Inspect the selected content for secrets, private data, unintended generated
output, and unrelated changes. Stage explicit paths or selected hunks. Avoid
`git add -A` and `git commit -a` in a mixed tree.

- If the index contains only this batch, review `git diff --cached` and
  `git diff --cached --check` before committing it.
- If unrelated work is already staged, preserve it. For files whose entire
  current contents belong to this batch, `git commit --only -- <paths>` can
  exclude unrelated staged paths. Review `git diff HEAD -- <paths>` and the
  corresponding whitespace check first. Stage selected new files before using
  this form. It commits the selected files' working-tree contents, not just
  their staged hunks.
- If a file mixes selected and excluded hunks, do not use `--only` for it.
  Stage selected hunks only when the rest of the index is within scope.
  Otherwise leave the batch pending rather than unstaging someone else's work.

Inspect hook behavior and honor required hooks and signing. If a check or hook
fails, fix problems within scope and rerun the affected checks. Review any files
the hook changed before staging them. Do not bypass checks to force a checkpoint.
If a required check cannot run, report the limit and follow the repository's
exception policy; otherwise leave the batch uncommitted.

## 4. Write the message

Use the repository's established format. If none exists, use this
[Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) fallback:

```text
<type>(<optional-scope>): <description>

<optional body explaining why or a non-obvious consequence>

<optional issue reference or breaking-change footer>
```

Choose the type by the change:

| Type       | Use for                                              |
| ---------- | ---------------------------------------------------- |
| `feat`     | New functionality                                    |
| `fix`      | A bug fix                                            |
| `perf`     | A performance improvement                            |
| `refactor` | A code change without new functionality or a bug fix |
| `docs`     | Documentation                                        |
| `test`     | Tests                                                |
| `build`    | Build tools or dependencies                          |
| `ci`       | Continuous integration configuration                 |
| `style`    | Formatting without behavior changes                  |
| `chore`    | Other maintenance                                    |

Use an existing scope for a package, module, or area. Omit it when no single area
fits. Default to a lowercase type, an imperative description without a trailing
period, and a subject under 72 characters. Preserve proper names and identifiers.
Add a body only when it explains something the subject and diff do not. Wrap
prose around 72 characters without breaking URLs or identifiers.

For a breaking contract change, use `!` before the colon and a `BREAKING CHANGE:`
footer explaining the impact and migration. The specification accepts either
marker; using both makes the message easier to notice and act on. Follow any
stricter repository rules. Do not assume a version bump or generate release
artifacts without checking the project's release configuration and task scope.

```text
fix(parser): reject dates with trailing characters
```

```text
feat(api)!: require a cursor for pagination

BREAKING CHANGE: Page numbers are no longer accepted. Pass the cursor
returned by the previous response.
```

Reference issues using the repository's tracker syntax. Add a closing reference
only when this change resolves the issue. Preserve required trailers and do not
invent authorship, approvals, or test results.

## 5. Commit and inspect the result

Create the commit with the reviewed message. For a multiline body, write the
exact message to a temporary file and pass it with `git commit --file` rather
than interpolating it into shell syntax. Keep required hooks and signing enabled.
Do not change Git identity or amend existing commits unless authorized.

Read back the commit hash, subject, and changed paths. Compare the remaining
staged and unstaged work with the intended batch. Confirm that unrelated work
remains intact. If there is nothing to commit, say so without creating an empty
commit. Report the commits created, checks performed, and any work left pending.

See [Git's commit reference](https://git-scm.com/docs/git-commit) for path selection
and index behavior. Source attribution is in [README.md](README.md#source).
