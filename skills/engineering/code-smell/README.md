# Code smell

Use `$code-smell` in Codex or `/code-smell` in Claude Code for a TypeScript/React
code-quality audit. The agent can also select it for matching review requests.

It reads the code and its consumers, checks relevant static-analysis results,
and reports unnecessary complexity, weak boundaries, unsafe contracts, and
React behavior risks. It leaves project files and dependencies unchanged and
gives brief alternatives for each finding.

## Example requests

- “Audit this TypeScript/React codebase for code smells. Report all supported
  issues and short suggestions, without implementing fixes.”
- “Review `src/checkout` for duplicated policy, unnecessary abstractions, and
  error-handling problems.”
- “Review the changes against `origin/main` for code smells, and distinguish new
  issues from existing ones.”
- “Inspect our hooks and state ownership even if lint passes. Use cached tools
  only; report unavailable checks.”

For feature implementation, formatting, or a dedicated security or performance
audit, choose the workflow for that task instead.

## Tools and prerequisites

Existing project checks come first. Optional scans use pinned `npx` commands for
Oxlint, Knip, React Doctor, and jscpd according to missing coverage. They require
Node.js 22.13+, npm, network access or cached packages, and their existing project
prerequisites. No package is added to the project. If a scan cannot run, the
manual review continues and the report names the missing coverage.

See [tool selection](references/tools.md) for commands and limitations.

## Check the result

The [report format](references/report-format.md) includes scope and coverage,
prioritized findings, unresolved candidates, and the checks actually run. Each
finding names its source locations, evidence, impact, brief alternative, and a
check for a future fix. Tool alerts are reconciled with source inspection;
confirmed findings are complete within the stated review coverage.

## Source

Adapted from rysweet/amplihack's
[`code-smell-detector` skill](https://github.com/rysweet/amplihack/blob/84424457d588fce4e492abfebfd03432ec647a56/.claude/skills/code-smell-detector/SKILL.md).
The instructions are rewritten for TypeScript/React, independent source review,
optional analysis tools, and consistent reporting. The source package at that
revision supplied no separate license notice.
