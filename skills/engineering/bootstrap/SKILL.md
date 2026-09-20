---
name: bootstrap
description: Bootstrap a fresh TypeScript repository, using an existing project basis or grilling the user to establish one. Includes researched architecture and conventions, a custom coding skill, agent configuration, verified tooling, and optional design-system setup, commit checkpoints, publication, and infrastructure provisioning.
disable-model-invocation: true
compatibility: Requires shell access, Git, a JavaScript toolchain, and current official documentation. Requires establish-conventions for architecture and the custom coding skill, and setup-matt-pocock-skills for the engineering configuration handoff. Optional remote operations require authenticated access to the selected providers.
---

# Bootstrap

Find the agreed PRD, spec, or architecture basis. If it is missing, grill the
unresolved requirements and write the basis before scaffolding.

Finish with a working repository, researched architecture and conventions, a
repo-specific coding skill, and verified development commands and engineering
skill configuration. Run the build and smoke test before handoff.

Support TypeScript web apps, APIs, CLIs, and libraries. Use React when a
frontend is needed. Python and Rust bootstrapping are not supported yet; explain
that boundary instead of generating a guessed setup. Include the discovery
needed to establish a missing project basis. Full product implementation remains
outside this skill. Default to local configuration. Provision selected
infrastructure only when agreed during the interview; an initial deployment of
the verified foundation is a separate choice within that plan.

## 1. Establish the starting point

Inspect the target directory, Git state, existing instructions, manifests, spec,
design documents, and domain docs. Read relevant ADRs. Preserve existing work;
resume a partial bootstrap rather than regenerating over it. An established
application needs a scoped maintenance or migration task, not a fresh bootstrap.

Check that the model-invoked `establish-conventions` skill is available before
planning architecture and engineering rules. Install it if missing using the
[companion guidance](README.md#companion-skills). It researches unresolved choices
and produces the project-specific skill; do not substitute a generic style list.

Look for an existing PRD, spec, or architecture document with enough product
goals, behavior, and constraints to guide setup. Reuse requirements from linked
issues or the current conversation. If the basis is missing, incomplete, or only
exists in conversation, invoke `establish-conventions` for its project-basis
stage. Grill unresolved requirements and write the appropriate document using
the project's layout. Confirm its decisions before choosing dependent
architecture or design-system conventions. Do not send the user away to create a
spec or require them to invoke `grill-me` or `wayfinder`; reuse those sessions
when they exist.

Record the accepted document path and use it throughout the remaining interview,
design-system setup, architecture, and custom coding skill. A technology list or
folder diagram without product requirements is not an adequate basis.

### Decide whether to include design-system work

Locate an established design system when there is a frontend. Offer to use the
model-invoked `design-system` skill to establish one from an approved shadcn
preset or adapt the existing system to the foundation. Include this work only
when the user selects it; an earlier explicit request counts. If not selected,
preserve existing styling and use the minimal frontend scaffold without starting
a system or requiring the companion. Keep selected work to the foundation and
its minimal entry point; product screens and features remain outside bootstrap.

For selected design-system work, check availability during planning and install
the skill if missing using [companion skills](README.md#companion-skills). Keep
automatic invocation enabled. Skipping setup for this run does not disable the
skill or remove existing design conventions.

### Check the engineering setup dependency

If per-repo engineering skill configuration is still needed, check whether
`setup-matt-pocock-skills` is available now. If it is missing, explain the
dependency and use the installation guidance in this skill's
[README](README.md#companion-skills). Resolve availability before scaffolding.

## 2. Settle the bootstrap decisions

Use the model-invoked `grilling` skill when available. Otherwise interview in
rounds. Ask independent unresolved questions and explain each recommendation.
Wait for answers before asking follow-up questions that depend on them. Discover
facts from files and tools yourself. Reuse choices already settled in the spec
or conversation; ask about conflicts rather than restarting the interview.

Cover only unresolved decisions that affect this project. Group the interview
by the choices below.

### Project and toolchain

- Target directory and project name; app, API, CLI, or library; actual deployables;
  rendering, SEO, offline, and hosting constraints that affect framework choice.
- Package manager and production runtime as separate choices. Default to pnpm;
  allow Bun or npm for a single project. Monorepos use pnpm workspaces. Resolve a
  request for both a monorepo and another manager explicitly before proceeding.
- Single project or monorepo, framework and rendering mode, and the domain
  boundaries already justified by the spec.

### Agents and optional design setup

- Preferred coding agents: Claude Code, Codex, both, or another agent. Agree on
  project instruction files, the recommended shared skill set, and any necessary
  project-specific skills or rules. Read [agent setup](references/agent-setup.md)
  for the file layout, installation scope, and recommended skills.
- Include `commit` in the proposed skill set. Choose whether commits require an
  explicit request or the agent should make automatic local checkpoints after
  each completed, checked unit. Default to explicit requests for a new repo.
  Installing the skill does not enable automatic commits. Preserve an existing
  choice and use the [commit policy](references/agent-setup.md#optional-automatic-commits)
  when the user opts in.
- Whether to establish or adapt a design system during this run, using the
  existing system or an approved shadcn preset. If selected, invoke `design-system`
  to plan foundations, motion, and documentation from the accepted project basis.
  If skipped, retain existing conventions and the agreed frontend stack without
  adding system documentation or enforcement. Identify any conflict with the
  selected Base UI and Tailwind CSS setup.

### Verification and external operations

- Git hosting, private or public visibility, license when relevant, and whether
  this run includes remote creation and the first push. Recommend private when
  visibility is undecided. Local commit policy, remote creation, and pushing are
  separate choices. Default to no commit or push unless authorized. Repository
  visibility and package publication are also separate decisions.
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

### Establish architecture and conventions

Invoke `establish-conventions` for its planning stages with the PRD or spec,
earlier discovery decisions, existing code and conventions, and the choices
already settled in this interview. Share one decision record. Let it research
and grill the remaining architecture, complexity, documentation, code-pattern,
testing, and tool or library choices. Do not repeat settled questions.

Keep bootstrap's supported languages, selected stack, foundation scope, and
publication policy as constraints. Use the recommendations below as starting
points for unresolved choices. Investigate conflicts and alternatives rather
than silently replacing an accepted decision. Include a custom implementation
when research shows that it meets the requirement better than a dependency.

Fold the resulting architecture, convention decisions, evidence, and enforcement
plan into bootstrap's proposal. Agree where the custom coding skill and permanent
docs will live, coordinating with companion setup's existing domain-doc layout.
Record artifact creation and validation as pending until step 4 resumes the
workflow. Research notes alone do not complete convention setup.

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
choices when relevant, architecture and conventions, custom skill location,
design-system choice and scope, verification commands, local commit policy, and
publication scope together. Include the exact provisioning actions when
selected. Proceed when the user confirms this concrete plan. Prior confirmation
still counts; revisit only changed decisions.

## 3. Build the foundation

Use current official generators where they fit the plan. Inspect their output;
remove unneeded demos and reconcile their defaults with the agreed stack. Keep
one minimal entry point that can prove the foundation works, without implementing
product features. Initialize Git if absent, preserving any existing history.
Keep generator commits within the agreed local commit policy and remote setup
within the agreed publication scope. When automatic checkpoints are enabled,
use `commit` for complete, checked batches during this work. If the skill is
missing, install the accepted companion before the first checkpoint. Keep
dependent setup files together until they can pass their required checks.

Use the accepted architecture and convention decisions from `establish-conventions`
for module boundaries, code patterns, documentation, and verification configuration.
Keep examples limited to the foundation or a disposable trial.

### Configure the toolchain and frontend

- Enable strict TypeScript. Align any aliases across TypeScript, the build tool,
  and tests. In a workspace, define explicit package exports and dependencies;
  keep configuration at the root only when multiple packages use it.
- Configure Oxlint and Oxfmt. Check their coverage for the chosen file types,
  especially Astro and MDX. Use the smallest framework-specific supplement for
  uncovered files and explain it; do not quietly skip them or retain a duplicate
  lint/format stack. Type checking remains a separate check.
- For a frontend, follow the current [shadcn installation guide](https://ui.shadcn.com/docs/installation)
  and [CLI reference](https://ui.shadcn.com/docs/cli). Select Base UI explicitly,
  preserve existing design tokens, and configure Tailwind and component aliases.
  When design-system setup was selected, invoke `design-system` for the components
  needed to exercise the foundation, including registry discovery, shadcn authoring,
  and adaptation to shared tokens and motion. Establish `DESIGN.md` and an agent
  pointer; follow the skill's consultation requirement before adding Storybook.
  Otherwise preserve existing styles and keep the entry point minimal. Inspect
  generator output for unwanted Radix dependencies or Turborepo configuration.

### Configure checks, secrets, and package visibility

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
requirements in the database and hosting reference. Local setup may include a
runtime adapter, safe environment examples, or service configuration. Keep
deployment, migrations, paid API calls, and external content generation out of
normal build and check commands.

## 4. Configure the companion skills and docs

Follow the agreed [agent setup](references/agent-setup.md). Create or update the
selected instruction file and install the accepted missing skills for the chosen
agents. Preserve existing installations and user edits. For a fresh dual-agent
repo, let companion setup edit the canonical `AGENTS.md` before adding the Claude
entry file.

### Complete or resume the explicit setup handoff

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

Pass the existing choices into setup so it does not ask the same questions
again. Let it select `AGENTS.md` or `CLAUDE.md` according to the files present
and the user's preference. Afterward, finish the other agent's entry file when
both agents were selected, and verify both can reach the same engineering
conventions. A local-only bootstrap can still choose GitHub Issues for a future
remote; record that dependency without creating a remote or tickets implicitly.

### Finish conventions and commit policy

Resume `establish-conventions` to create or update the repo-specific coding
skill and its references, architecture docs, agreed enforcement, and agent
pointers. Pass the actual scaffold, design-system choice, and companion setup's
selected docs layout. Do not use convention setup to add design-system work that
was skipped. Keep existing local skill names and canonical documents; do not
create duplicate convention, glossary, or ADR files. Verify that the local skill
explains how to update its rules and checks whenever conventions change. Make it
available to each selected agent alongside the shared engineering skills.

Apply the agreed [commit policy](references/agent-setup.md#optional-automatic-commits)
to the selected instruction file after companion setup. Verify it survives setup
without duplication and that every selected agent can read it. Installation alone
must not add an automatic-commit instruction.

### Write the project documentation

Verify setup's output and preserve its conventions. Record agreed domain terms
in the selected glossary and bootstrap decisions in the selected ADR layout when
there is something to record. Workspace membership alone does not require
multiple domain contexts. Link to the project basis and any existing design
system rather than rewriting them. Keep private specs and notes out of published
docs.

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

### Verify CI and a clean installation

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

### Verify agent and companion behavior

Verify the selected agents' instruction loading and skill discovery using the
checks in the agent setup reference. Distinguish a configuration inspection from
a successful fresh-session check when an agent is unavailable.

Complete the convention workflow's representative and non-triggering trials using
the foundation or temporary examples. Check the generated local skill's routing,
maintenance instructions, and enforcement. Report proposed rules separately from
implemented checks and leave unavailable agent trials explicitly unverified.

For selected design-system work, complete its relevant component, motion,
accessibility, and documentation checks against the foundation. If skipped,
report it as skipped rather than claiming that the scaffold establishes a
system.

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

Report the result in these groups:

- Stack, layout, and checks actually passed.
- Agent and companion setup, custom coding skill, and convention verification.
- Design-system status.
- Local commit policy, created commits, and remaining Git changes.
- Infrastructure state.

A prepared workflow is not a passed CI run; a provisioned host is
not a deployed app. Name any unverified items. Stop at the foundation; product
implementation remains a separate task.
