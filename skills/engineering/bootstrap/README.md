# Bootstrap

Use `$bootstrap` in Codex or `/bootstrap` in Claude Code to create a working
TypeScript repository with verified tooling. Bring an existing project basis or
start with a grilling session to establish one.

```text
$bootstrap Create a fresh repo at ../my-project from this SPEC.md.
Use the design tokens in DESIGN.md. Keep the result local.
Interview me about unresolved stack and structure choices first.
```

This skill runs only when you select it. It supports web apps, APIs, CLIs, and
libraries. It does not yet support Python or Rust.

## Bring a project basis or establish one

Provide a PRD, spec, or architecture document, or share decisions from an
earlier conversation such as `grill-me` or `wayfinder`. If no adequate basis
exists, bootstrap grills the missing requirements and writes one PRD, spec, or
architecture document before making dependent choices. It reuses settled answers
and reviews the written decisions with you. An architecture document needs
product goals and behavioral requirements as well as technical choices.

Bootstrap establishes the missing brief and sets up the repository and tooling.
It does not implement product screens or features. Infrastructure provisioning
is optional and agreed during the interview, including whether to deploy the
verified foundation. Local configuration remains the default.

## Defaults and choices

| Area         | Policy                                                                                                                              |
| ------------ | ----------------------------------------------------------------------------------------------------------------------------------- |
| Tooling      | pnpm by default; Bun or npm for a single project; strict TypeScript, Oxlint, and Oxfmt.                                             |
| Frontend     | React, Tailwind CSS, and shadcn with Base UI. Framework follows rendering and hosting needs.                                        |
| Layout       | One project unless actual deployables or shared consumers justify pnpm workspaces. Turbo needs a concrete reason.                   |
| Design       | Optional. Choose whether `design-system` should establish or adapt the foundation's system. Preserve existing styling when skipped. |
| Conventions  | Use `establish-conventions` to research architecture and engineering rules and create the repo-specific coding skill.               |
| Verification | Checks, build, and a repeatable smoke test; GitHub Actions when GitHub is selected.                                                 |
| Commits      | Explicit requests by default. Offer the `commit` skill and optional automatic local checkpoints.                                    |
| Publication  | Local by default. Choose private/public visibility and optional remote creation and push during the interview.                      |

### What the interview settles

The interview ends with an agreed stack, directory tree, and verification plan.
It also selects Claude Code, Codex, or both, with the appropriate instruction
files, scoped rules where needed, and an adjustable [recommended skill
set](references/agent-setup.md#recommended-skills-for-every-repo). For public
repositories, the agent also reviews files and history, scans for secrets, and
configures repository protections before completing publication.

### Database, hosting, and provisioning

When persistence is needed, recommend D1 with Drizzle for basic Cloudflare apps
that fit D1, and Postgres with Drizzle otherwise. User choices take precedence.
PlanetScale Postgres is the preferred independent host,
with provider-managed or user-selected self-hosted Postgres considered according
to the app's requirements. Basic apps start with a Cloudflare Workers hosting
recommendation. Complex apps get a provider and region discussion. See
[database and hosting](references/database-and-hosting.md) for the decision and
local verification rules.

Optional provisioning follows the agreed provider, account, resources, region,
and cost expectations. It can configure managed databases or user-selected
self-hosted Postgres. Git publication, infrastructure creation, and an initial
deployment are separate choices.

## Optional design-system setup

For a frontend, bootstrap offers to invoke `design-system` to establish a system
from an approved shadcn preset or adapt an existing one. If selected, it uses
the accepted project basis to choose tokens, components, motion, documentation,
and checks. It implements the minimal foundation and records the rules in
`DESIGN.md` with an agent pointer.

If you skip this work, bootstrap preserves existing styling and builds the
minimal frontend scaffold. It does not require the companion or add system
documentation, enforcement, or Storybook. The `design-system` skill remains
available for automatic and explicit invocation in later work; the choice
applies to this bootstrap run.

## Architecture and the custom coding skill

Bootstrap invokes `establish-conventions` to establish a missing project basis
and fill engineering gaps. It researches alternatives and interviews you about
architecture, complexity, documentation, language patterns, testing, tools, and
libraries. It reuses decisions from discovery and the bootstrap interview.

The resulting repo-specific skill, usually `code-conventions`, guides later coding
and review. It includes relevant references, canonical patterns, required checks,
and instructions to update the skill when conventions change. Existing projects
keep their established skill names and document locations. Architecture decisions
and executable configuration remain in their own canonical files.

Planning happens before scaffolding. The workflow creates and validates the custom
skill after the foundation and companion setup establish the files and docs layout.
It does not implement product features to demonstrate an architecture.

## Optional automatic commits

During the interview, choose whether the agent should commit only when asked or
commit completed, checked units as it works. Automatic checkpoints avoid a large
commit containing unrelated work at the end of a session. Related code, tests,
and documentation stay together.

If you opt in, bootstrap installs or reuses `commit` and records the policy in
`AGENTS.md`, or the selected `CLAUDE.md` for a Claude-only project. The policy
applies during bootstrap and future sessions. Installing the skill alone does
not enable it. You can leave it off, disable it later, or ask to leave a
particular task uncommitted. Local checkpoints do not enable pushing or releases.

## Companion skills

### Architecture and conventions

Include
[`establish-conventions`](https://github.com/SarthakMishra/skills/tree/main/skills/engineering/establish-conventions)
for discovery, architecture, and the custom coding skill. Install it if missing:

```sh
pnpm dlx skills add SarthakMishra/skills --skill establish-conventions
```

It is model-invoked and can run within the accepted bootstrap plan. Its interview
and research process works without optional companion skills.

### Commits

The proposed engineering set includes
[`commit`](https://github.com/SarthakMishra/skills/tree/main/skills/engineering/commit).
It works with explicit commit requests even when automatic checkpoints are off.
If accepted and missing, install it for the selected agents:

```sh
pnpm dlx skills add SarthakMishra/skills --skill commit
```

### Optional design-system setup

When frontend design-system setup is selected, include
[`design-system`](https://github.com/SarthakMishra/skills/tree/main/skills/design/design-system).
It handles shared tokens, component sourcing and authoring, motion,
documentation, and enforcement. Bootstrap uses it for the minimal foundation;
full product design remains a separate task. Install it if missing for that
selected work:

```sh
pnpm dlx skills add SarthakMishra/skills --skill design-system
```

Choose the coding agents agreed during the interview. This model-invoked companion
can run within the accepted bootstrap plan without a separate explicit invocation.

### Engineering configuration

Install [Matt Pocock's skills](https://github.com/mattpocock/skills) if they are
not already available:

```sh
pnpm dlx skills add mattpocock/skills
```

Choose `setup-matt-pocock-skills` and the other skills you use in the installer.
Avoid installing duplicate copies if a plugin already supplies them. The
model-invoked `grilling` skill is optional; bootstrap includes an interview
fallback.

During bootstrap, explicitly select `$setup-matt-pocock-skills` in Codex or
`/setup-matt-pocock-skills` in Claude Code at the new repo root. It configures
the issue tracker, optional triage vocabulary, and domain docs. Then resume
bootstrap with its accepted plan. This handoff respects the companion's
user-only invocation policy. On a resumed run, bootstrap preserves and verifies
existing setup.

The interview and companion workflow are informed by
[Matt Pocock's collection](https://github.com/mattpocock/skills). Those skills
remain separate dependencies; their procedures are not bundled here.

## Recognize a completed bootstrap

1. Install with the chosen package manager and run the documented checks, build,
   and smoke test without production credentials.
2. Check that the directory layout follows your spec's domain terms.
3. Read the handoff for passed checks, companion setup, the custom coding skill
   and convention verification, and design-system status.
4. Check the commit policy, created commits, and whether the repo remains local
   or was published.
5. Check the infrastructure state: local configuration, provisioned resources, or
   a verified initial deployment. Missing tools, failed checks, and pending remote
   protections must be explicit.
