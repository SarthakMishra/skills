# Tool selection and commands

Read this before executing analysis. Run existing project checks first after
inspecting their scripts for writes. Reuse the installed compiler and configured
ESLint, typescript-eslint, React Hooks, accessibility, SonarJS, Biome, or Oxlint
rules where available. Do not run a lint script that applies fixes.

## Execution contract

- Use the repository's package manager for existing scripts. For optional tools,
  the commands below use `npx --yes` to fetch a pinned package into npm's cache;
  this does not add it to project manifests or lockfiles. Installed project
  dependencies must already be available. Verify the host's Node/npm versions,
  network or package cache, and execution permissions before running.
- Prefer an existing compatible tool version and configuration. The examples
  target Node.js 22.13+ and pin a known CLI contract. Check `--version` and
  `--help` when substituting a version, and record the resolved version.
- Run from the owning workspace or repository root as specified below. Replace
  `src` with the actual source paths; an empty or unmatched scope is not a clean
  result. Respect generated/vendor/build exclusions, but inspect tests separately
  where they explain a contract.
- Put JSON, logs, caches, and temporary configuration outside the repository.
  Inspect tool configuration because it can load code or enable output/cache
  writes. Use scan commands without fix, init, install, or CI setup subcommands.
  Preserve exit codes and inspect diagnostics: a nonzero result can mean findings,
  a configuration error, or an incomplete scan.
- Choose tools by missing coverage. Avoid running overlapping scanners just to
  collect scores. If unavailable, continue manual review and report the gap;
  do not add packages or change project configuration to make a scan succeed.

## Existing type-aware checks

Use the project's existing type-check script when it runs without emitting
artifacts, or invoke its installed TypeScript compiler with the appropriate
project and `--noEmit --incremental false`. Project-reference/build configurations
may need their established check command; do not rewrite tsconfig for an audit.
Never use bare `npx tsc` to fetch a compiler: the npm package named `tsc` is not
TypeScript, and a freshly downloaded compiler may differ from the project.

Configured [typescript-eslint typed rules](https://typescript-eslint.io/getting-started/typed-linting/)
can catch unsafe assignments, floating promises, and misused promises that a
syntax-only pass misses. Reuse the project's type-aware linting when present.
Oxlint's `--type-aware` needs the separate `oxlint-tsgolint` runtime and compatible
TypeScript support. Verify both against the
[type-aware prerequisites](https://oxc.rs/docs/guide/usage/linter/type-aware.html).
The Oxlint command below is a syntax/rule scan; it does not claim typed coverage.

## Oxlint: additional lint candidates

Use this when existing lint coverage leaves a JavaScript/TypeScript or React
gap. From the package root, with the automatic JSX runtime (`react-jsx` or
`react-jsxdev`):

```sh
npx --yes oxlint@1.88.0 --react-plugin --jsx-a11y-plugin --import-plugin -W correctness -W suspicious -D react/rules-of-hooks -D react/exhaustive-deps -A react/react-in-jsx-scope -f json src
```

For the classic JSX runtime, omit `-A react/react-in-jsx-scope`. For a package
without React, omit the React/accessibility plugins and React rule overrides.
These are additional candidate rules, not a replacement for repository policy.
Check enabled rules and effective configuration before claiming coverage; see
the [Oxlint CLI](https://oxc.rs/docs/guide/usage/linter/cli).

Accept a diagnostic only after checking its source path, runtime assumptions,
and consumer. Merge overlapping compiler/Hook diagnostics into one finding.

## Knip: unused code and dependency graph

Use [Knip](https://knip.dev/overview/getting-started) when reachability, unused
exports, or dependencies need investigation. Version 6 expects the project's
`typescript` and `@types/node` dependencies to be available. Run from the workspace
root so plugins and cross-package consumers can be discovered:

```sh
npx --yes knip@6.43.0 --reporter json
```

For import-cycle candidates, run a separate focused pass:

```sh
npx --yes knip@6.43.0 --cycles --reporter json
```

Use `--workspace <name-or-path>` for a monorepo subset while preserving root
configuration. Read configuration hints and check entry points, framework routes,
scripts, tests, dynamic imports, generated registrations, and public package
exports before accepting an unused result. Do not enable
`--include-entry-exports` for a library just because its external consumers are
absent locally. See [resolving Knip issues](https://knip.dev/guides/handling-issues)
when a whole subtree unexpectedly appears unused.

Bad: suggest deleting every file in an unrecognized file-based route directory.
Good: check the router's discovery convention, correct only a temporary scan
configuration if needed, and leave uncertain reachability in **Needs verification**.

For cycles, inspect the entire import chain and distinguish runtime from
type-only edges. Report the initialization risk or ownership violation, not
the existence of a cycle alone. Knip 6.43.0 can report cycles with exit code 0;
inspect the JSON results even when the command succeeds.

## React Doctor: React-specific diagnostics

Use this when React components or hooks need checks beyond existing lint rules.
From the owning React project root:

```sh
npx --yes react-doctor@0.9.18 . --yes --scope full --no-score --no-supply-chain --no-cache --json
```

The flags skip the score API, share URL, crash reporting, dependency supply-chain
checks, and persistent scan caches. This keeps the command focused on local
source diagnostics. npm can still need network access to fetch the CLI. See the
[CLI reference](https://www.react.doctor/docs/reference/cli-reference) for the
version's behavior.

For an explicitly requested diff review, substitute
`--scope changed --base <verified-ref>` for `--scope full`. In a monorepo, select
the intended `--project <name-or-path>`; `--yes` otherwise scans all detected
projects. Inspect `complete`, analyzed files, and skipped checks in JSON output.
Check framework/version assumptions manually and corroborate each diagnostic.

## jscpd: repeated implementations

Use [jscpd](https://github.com/kucherenko/jscpd) when a duplication pass can find
copies beyond the areas already read. Create an output directory outside the
repository, then run from the package root. Runnable POSIX-shell example:

```sh
smell_output=$(mktemp -d)
npx --yes jscpd@5.4.2 src --format typescript,tsx,javascript,jsx --ignore '**/node_modules/**,**/dist/**,**/build/**,**/coverage/**,**/*.generated.*' --reporters console,json --output "$smell_output"
```

Adapt exclusions to the repository and inspect the analyzed-file count. Small
files and blocks below the tool's token/line thresholds are not covered. jscpd
5.4.2 does not accept the older `--gitignore` flag; use the documented flags for
the resolved version. Use the default token scan, without semantic-model
downloads or embedding services.

Open both sides of every relevant clone and trace their owners. Recommend a
shared abstraction only when they express the same policy or composition and
should change together. Similar test setup, generated clients, and unrelated
features can intentionally resemble each other. A duplication percentage alone
does not establish an issue.
