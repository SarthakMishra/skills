# GitHub Issues

Keep issues and specs in GitHub Issues. Use `gh` from this clone so it selects the
repository from the remote. If no remote is configured, use an explicitly supplied
`--repo OWNER/REPO` or ask which repository to use.

## Work with an issue

| Task                    | Command                                                               |
| ----------------------- | --------------------------------------------------------------------- |
| Create                  | `gh issue create --title "..." --body-file <file>`                    |
| Read discussion         | `gh issue view <number> --comments`                                   |
| Read labels and details | `gh issue view <number> --json number,title,body,labels,comments`     |
| List                    | `gh issue list --state open --json number,title,body,labels,comments` |
| Comment                 | `gh issue comment <number> --body-file <file>`                        |
| Add or remove a label   | `gh issue edit <number> --add-label "..."` or `--remove-label "..."`  |
| Close                   | `gh issue close <number> --comment "..."`                             |

Write the exact Markdown body to a temporary file before creating an issue or
posting a comment. Use `--label`, `--state`, and `--jq` to narrow issue listings.
Follow the [triage label conventions](triage-labels.md).

When a skill says "publish to the issue tracker," create a GitHub issue. When it
says "fetch the relevant ticket," read the issue and its comments.

## Pull requests

**PRs as a request surface: no.** The installed triage workflow reads this flag.

GitHub shares a number space across issues and pull requests. If the type of a
reference is unclear, try `gh pr view <number>` and fall back to
`gh issue view <number>`.

## When using wayfinder

The map is one issue; its child issues hold the work. Use these conventions when
an installed wayfinder skill needs them.

- Create the map with the `wayfinder:map` label. Its body holds Notes,
  Decisions-so-far, and Fog.
- Link each child as a GitHub sub-issue. If sub-issues are unavailable, put the
  child in the map's task list and add `Part of #<map>` to the child's body.
  Use `wayfinder:research`, `wayfinder:prototype`, `wayfinder:grilling`, or
  `wayfinder:task` to identify the work.
- Represent blockers with GitHub's native issue dependencies. Add an edge with
  `gh api --method POST repos/<owner>/<repo>/issues/<child>/dependencies/blocked_by -F issue_id=<blocker-db-id>`.
  Get the blocker's numeric database ID with
  `gh api repos/<owner>/<repo>/issues/<number> --jq .id`; an issue number or node ID
  is not a database ID. If dependencies are unavailable, add
  `Blocked by: #<number>, #<number>` at the top of the child body.
- To find the next ticket, list the map's open children and exclude assigned
  tickets or those with open blockers. The native
  `issue_dependencies_summary.blocked_by` counts open blockers; for the fallback,
  check the linked issues. Choose the first remaining ticket in map order.
- Claim the ticket with `gh issue edit <number> --add-assignee @me` as the
  wayfinder session's first write.
- Resolve it by posting the result, closing the ticket, and adding a short
  finding and link to the map's Decisions-so-far section.
