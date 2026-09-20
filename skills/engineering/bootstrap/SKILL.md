---
name: bootstrap
description: Bootstrap a fresh TypeScript repository from an agreed spec, with a stack interview, agent setup, verified tooling, and optional publication and infrastructure provisioning.
disable-model-invocation: true
compatibility: Requires shell access, Git, a JavaScript toolchain, and current official documentation. Requires setup-matt-pocock-skills for the engineering configuration handoff; optional remote operations require authenticated access to the selected providers.
---

# Bootstrap

Produce a working repository foundation from an existing PRD or spec. Settle the
bootstrap choices with the user before writing files. Finish with an exercised
build and smoke test, consistent development commands, and engineering skill
configuration.

Support TypeScript web apps, APIs, CLIs, and libraries. Use React when a frontend
is needed. Python and Rust bootstrapping are not supported yet; explain that
boundary instead of generating a guessed setup. Product definition, original
design, and feature implementation belong outside this skill. Default to local
configuration. Provision selected infrastructure only when agreed during the
interview; an initial deployment of the verified foundation is a separate choice
within that plan.

## 1. Establish the starting point

Inspect the target directory, Git state, existing instructions, manifests, spec,
design documents, and domain docs. Read relevant ADRs. Preserve existing work;
resume a partial bootstrap rather than regenerating over it. An established
application needs a scoped maintenance or migration task, not a fresh bootstrap.

Accept a spec in a file, a linked issue, or the current conversation. It must
identify the project type, intended behavior, and constraints well enough to
choose a foundation. If these are missing, explain the gap and suggest the user
select `grill-me` or `grill-with-docs` to clarify it, `wayfinder` for work spanning
many decisions, or `to-spec` to capture an already settled conversation. These
are [Matt Pocock's skills](https://github.com/mattpocock/skills). Do not invent the
product or silently invoke these user-invoked workflows. Resume after the spec
exists.

Locate an established design system when there is a frontend. Use the
model-invoked `design-system` skill to establish missing conventions from an
approved shadcn preset or adapt the existing system to the foundation. Check its
availability during planning; installation guidance is in
[companion skills](README.md#companion-skills). Keep this work to the foundation
and its minimal entry point; product screens and features remain outside bootstrap.

If per-repo engineering skill configuration is still needed, check whether
`setup-matt-pocock-skills` is available now. If it is missing, explain the
dependency and use the installation guidance in this skill's
[README](README.md#companion-skills). Resolve availability before scaffolding.

## 2. Grill the bootstrap decisions

Use the model-invoked `grilling` skill when available. Otherwise interview in
rounds: ask the independent unresolved questions, give a recommendation with its
reason, wait for answers, then ask the questions those answers unlock. Discover
facts from files and tools yourself. Reuse choices already settled in the spec
or conversation; ask about conflicts rather than restarting the interview.

Cover the decisions that affect this project:

- Target directory and project name; app, API, CLI, or library; actual deployables;
  rendering, SEO, offline, and hosting constraints that affect framework choice.
- Package manager and production runtime as separate choices. Default to pnpm;
  allow Bun or npm for a single project. Monorepos use pnpm workspaces. Resolve a
  request for both a monorepo and another manager explicitly before proceeding.
- Single project or monorepo, framework and rendering mode, and the domain
  boundaries already justified by the spec.
- Preferred coding agents: Claude Code, Codex, both, or another agent. Agree on
  project instruction files, the recommended shared skill set, and any necessary
  project-specific skills or rules. Read [agent setup](references/agent-setup.md)
  for the file layout, installation scope, and recommended skills.
- Existing design system or a shadcn preset, using Base UI and Tailwind CSS for
  the frontend. Use `design-system` to plan the missing foundations, motion, and
  documentation. Surface any conflict with an existing component library.
- Git hosting, private or public visibility, license when relevant, and whether
  this run includes remote creation and the first push. Recommend private when
  visibility is undecided. Default to local preparation without a commit or push;
  include those operations only when agreed. Repository visibility and package
  publication are separate decisions.
- Verification needs beyond the baseline in step 5, and any spec-required local
  service configuration. When persistence or hosting is needed, use the defaults
  and interview criteria in [database and hosting](references/database-and-hosting.md).
  Leave auth and observability vendors unselected unless the spec or user selects
  them.
- Local-only configuration or optional infrastructure provisioning. For remote
  work, agree on the provider/account, resources, region, cost expectations, and
  whether an initial deployment or remote migrations are included. Authorization
  to push source code does not by itself authorize cloud provisioning.

For a public repository, read [public repository preparation](references/public-repository.md)
now so its requirements enter the plan before any publication.

### Choose the stack by its requirements

Check current official documentation and CLI help before choosing versions,
adapters, presets, or generator flags. Pin the selected package manager, document
the runtime version, and retain one matching lockfile. Bun as a package manager
does not imply Bun as the production runtime.

| Requirement                                            | Starting recommendation                                                                                                        |
| ------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------ |
| Content site with limited interactivity                | Astro with its React integration; hydrate React islands where needed.                                                          |
| Client-rendered app with typed routes and search state | Vite, React, and TanStack Router.                                                                                              |
| App suited to React Router conventions                 | React Router; choose declarative, data, or framework mode from the routing and rendering requirements.                         |
| Integrated React server rendering and server functions | TanStack Start when its runtime and adapter fit the hosting constraints. Compare React Router framework mode when appropriate. |
| API, CLI, or library without a UI                      | TypeScript with only the runtime and build tools needed by the spec; omit frontend dependencies.                               |

Framework choice is not a size ranking. A complex SPA may need no server
framework. Different deployables may need different choices. Verify the chosen
mode against the [React Router docs](https://reactrouter.com/start/modes),
[TanStack Router docs](https://tanstack.com/router/latest/docs/framework/react/overview),
[TanStack Start docs](https://tanstack.com/start/latest/docs/framework/react/overview),
or [Astro React guide](https://docs.astro.build/en/guides/integrations-guide/react/).

Start with one project unless there are actual separate deployables or packages
with independent consumers. A `pnpm-workspace.yaml` containing only build
permissions does not establish a monorepo. Use native pnpm workspace commands
first. Add Turborepo only for a concrete task graph or caching need those commands
do not meet, and record the reason.

Propose a directory tree using the spec's domain names. Keep framework routes
in their required locations and domain logic in cohesive modules. For a single
app, these can live under `src/<domain>/`; use `apps/` and `packages/` when actual
workspace boundaries justify them. Extract shared UI or other packages only for
real consumers. Plan future boundaries in prose rather than creating empty
packages, placeholder layers, or speculative APIs.

Present the chosen stack, proposed tree, agent configuration, database/hosting
choices when relevant, verification commands, and publication scope together.
Include the exact provisioning actions when selected.
Proceed when the user confirms this concrete plan. Prior confirmation still
counts; revisit only changed decisions.

## 3. Build the foundation

Use current official generators where they fit the plan. Inspect their output;
remove unneeded demos and reconcile their defaults with the agreed stack. Keep
one minimal entry point that can prove the foundation works, without implementing
product features. Initialize Git if absent, preserving any existing history.
Keep generator commits and remote setup within the agreed publication scope.

- Enable strict TypeScript. Align any aliases across TypeScript, the build tool,
  and tests. In a workspace, define explicit package exports and dependencies;
  keep shared configuration at the root only where it is actually shared.
- Configure Oxlint and Oxfmt. Check their coverage for the chosen file types,
  especially Astro and MDX. Use the smallest framework-specific supplement for
  uncovered files and explain it; do not quietly skip them or retain a duplicate
  lint/format stack. Type checking remains a separate check.
- For a frontend, follow the current [shadcn installation guide](https://ui.shadcn.com/docs/installation)
  and [CLI reference](https://ui.shadcn.com/docs/cli). Select Base UI explicitly,
  preserve existing design tokens, and configure Tailwind and component aliases.
  Apply `design-system` to the components needed to exercise the foundation,
  including registry discovery, shadcn authoring, and adaptation to shared tokens
  and motion. Establish `DESIGN.md` and an agent-instruction pointer; follow the
  skill's consultation requirement before adding Storybook. Inspect generator
  output for unwanted Radix dependencies or Turborepo configuration.
- Provide `dev` where applicable, `build`, `format`, `format:check`, `lint`,
  `typecheck`, `check`, and `test:smoke`. Make `check` run the non-mutating format,
  lint, and type checks. Keep scripts, documentation, CI, and lockfile consistent
  with the selected package manager. Root workspace commands must cover every
  applicable member and propagate failures.
- Ignore dependency/build output, caches, local state, `.env` and `.env.*`, and
  runtime-specific secret files such as `.dev.vars*`. Permit only sanitized
  example files. When configuration is needed, document variable names and
  validate required values at the relevant entry point. Keep server secrets out
  of client imports and browser-exposed variables. Do not require production
  credentials for baseline verification.
- Keep nonpublishable packages `private: true`, including in public Git repos.
  Package publishing setup is needed only when the spec calls for a library
  distribution.

For selected persistence and hosting, follow the local setup and verification
requirements in the database and hosting reference. Local wiring may include a
runtime adapter, safe environment examples, or service configuration. Keep
deployment, migrations, paid API calls, and external content generation out of
normal build and check commands.

## 4. Configure the companion skills and docs

Follow the agreed [agent setup](references/agent-setup.md). Create or update the
selected instruction file and install the accepted missing skills for the chosen
agents. Preserve existing installations and user edits. For a fresh dual-agent
repo, let companion setup edit the canonical `AGENTS.md` before adding the Claude
entry file.

If setup has already completed for this target, verify its tracker and domain
docs, optional triage configuration, and agent instruction pointers. Preserve
valid setup and proceed without another invocation.

Otherwise, at the scaffolded repo root, have the user explicitly select
`$setup-matt-pocock-skills` in Codex or `/setup-matt-pocock-skills` in Claude Code.
If they already explicitly invoked it for this target
in the session, carry out that request. Otherwise pause this stage with the exact
invocation and a short resume note containing the accepted plan and completed
work. Resume bootstrap after setup finishes. Do not emulate its templates or
silently invoke it; it owns the tracker, optional triage labels, domain-doc
layout, and the `Agent skills` block.

Pass the existing choices into setup so they are not asked again. Let it select
`AGENTS.md` or `CLAUDE.md` according to the files present and the user's preference.
Afterward, finish the other agent's entry file when both agents were selected,
and verify both can reach the same engineering conventions.
A local-only bootstrap can still choose GitHub Issues for a future remote; record
that dependency without creating a remote or tickets implicitly.

Verify setup's output and preserve its conventions. Record the agreed domain
terms and bootstrap decisions in the selected glossary/ADR layout when there is
substance to record. Workspace membership alone does not require multiple domain
contexts. Link to the source spec and design system rather than rewriting them.
Keep private specs and notes out of published docs.

Write a project README with the actual install, development, check, build, and
smoke commands. Explain the chosen module boundaries and any required local
configuration. Add relevant conventions and spec/design pointers to the selected
agent instruction file without duplicating or overwriting existing guidance.

## 5. Exercise the result

Every bootstrap needs a successful strict type check, Oxlint/Oxfmt checks with any
necessary supplements, production build, and one repeatable smoke test. Test the
generated entry point: browser rendering and a keyboard interaction for a UI,
a local health endpoint for an API, a command and exit status for a CLI, or an
import of the built entry point for a library. Cover each deployable in a
monorepo. A build alone or a test command accepting zero tests is insufficient.

Use the smallest test tool that verifies this behavior. Add Vitest, Playwright,
and commit hooks only when the project needs them. Do not write product behavior
just to obtain a test. Keep verification local and reproducible, without live
customer data or external service side effects.

When GitHub is selected, add GitHub Actions running a frozen-lockfile install,
`check`, `build`, and the smoke test with the same toolchain as local development.
Use read-only default token permissions, verified full-SHA action pins, and
secret-free PR checks. See [GitHub's secure use guidance](https://docs.github.com/en/actions/reference/security/secure-use).

Run the documented install and verification commands from a clean temporary copy
of the proposed repo files. This must include newly created files, but exclude
dependencies, caches, and local secrets. Fix failures rather than weakening the
checks. Inspect the final diff and file list for leftover demos, unrelated work,
or sensitive material. If tooling or network access prevents a check, report the
specific gap and leave that check incomplete.

Verify the selected agents' instruction loading and skill discovery using the
checks in the agent setup reference. Distinguish a configuration inspection from
a successful fresh-session check when an agent is unavailable.

## 6. Publish or provision only as agreed

For local-only work, hand off the verified files without creating a remote,
pushing, or provisioning infrastructure. Report remote settings as pending when
there is no remote to configure. Git publication and infrastructure provisioning
are independent choices; perform only the selected operations.

When creation or push was agreed, verify the destination owner, repository name,
visibility, and exact files/history being sent. Apply the public preparation
reference before a public push or visibility change. For any visibility, inspect
the staged content for secrets before committing and pushing. Existing
authorization is sufficient for the agreed operation; ask only when its scope
changes. Never replace an existing remote or force-push as part of bootstrap.

Read back remote visibility and the pushed commit, and check the first CI result
when a push occurred. For agreed provisioning, follow
[provisioning and verification](references/database-and-hosting.md#provisioning-and-verification)
after the local checks pass. Respect any dependency on remote creation or CI
without treating that dependency as authorization for an unselected operation.

Report the stack and layout, checks actually passed, agent and companion setup,
Git status, and infrastructure state separately. A prepared workflow is not a
passed CI run; a provisioned host is not a deployed app. Leave unverified items
explicit. Stop at the foundation; product implementation remains a separate task.
