# Bootstrap

Use `$bootstrap` in Codex or `/bootstrap` in Claude Code to turn an agreed spec
into a verified TypeScript repository foundation.

```text
$bootstrap Create a fresh repo at ../my-project from this SPEC.md.
Use the design tokens in DESIGN.md. Keep the result local.
Interview me about unresolved stack and structure choices first.
```

This skill runs only when you select it. It supports web apps, APIs, CLIs, and
libraries. Python and Rust support are deferred.

## Bring a spec

Provide a PRD/spec as a file, issue, or settled conversation. Bring an established
design system for a frontend, or choose a shadcn preset during the interview and
use `design-system` to establish the foundation's conventions.
If the product is still undefined, start with Matt Pocock's `grill-me`,
`grill-with-docs`, or `wayfinder`; use `to-spec` to capture settled decisions.

Bootstrap chooses the repository foundation. It does not define the product,
design screens, or implement features. Infrastructure provisioning is optional
and agreed during the interview, including whether to deploy the verified
foundation. Local configuration remains the default.

## Defaults and choices

| Area         | Policy                                                                                                            |
| ------------ | ----------------------------------------------------------------------------------------------------------------- |
| Tooling      | pnpm by default; Bun or npm for a single project; strict TypeScript, Oxlint, and Oxfmt.                           |
| Frontend     | React, Tailwind CSS, and shadcn with Base UI. Framework follows rendering and hosting needs.                      |
| Layout       | One project unless actual deployables or shared consumers justify pnpm workspaces. Turbo needs a concrete reason. |
| Design       | Use `design-system` to preserve or establish conventions from the agreed system or shadcn preset.                 |
| Verification | Checks, build, and a repeatable smoke test; GitHub Actions when GitHub is selected.                               |
| Publication  | Local by default. Choose private/public visibility and optional remote creation and push during the interview.    |

The interview ends with an agreed stack, directory tree, and verification plan.
It also selects Claude Code, Codex, or both, with the appropriate instruction
files, scoped rules where needed, and an adjustable
[recommended skill set](references/agent-setup.md#recommended-skills-for-every-repo).
Public repositories receive an additional file/history review, secret scan, and
repository protection setup before publication is considered complete.

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

## Companion skills

For a frontend, include
[`design-system`](https://github.com/SarthakMishra/skills/tree/main/skills/design/design-system).
It handles shared tokens, component sourcing and authoring, motion, documentation,
and enforcement. Bootstrap uses it for the minimal foundation; full product design
remains a separate task. Install it if missing:

```sh
pnpm dlx skills add SarthakMishra/skills --skill design-system
```

Choose the coding agents agreed during the interview. This model-invoked companion
can run within the accepted bootstrap plan without a separate explicit invocation.

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
`/setup-matt-pocock-skills` in Claude Code at the new repo root. It configures the
issue tracker, optional triage vocabulary, and domain docs. Then resume bootstrap
with its accepted plan. This handoff respects the companion's user-only
invocation policy. Existing setup is preserved and verified on a resumed run.

The interview and companion workflow are informed by
[Matt Pocock's collection](https://github.com/mattpocock/skills). Those skills
remain separate dependencies; their procedures are not bundled here.

## Recognize a completed bootstrap

You should be able to install with the chosen package manager, run the documented
checks, build, and exercise the smoke test without production credentials. The
directory layout should follow your spec's domain terms. The handoff names what
passed, whether companion setup finished, and whether the repo remains local or
was published. It also distinguishes local configuration, provisioned resources,
and a verified initial deployment. Missing tools, failed checks, and pending
remote protections are reported explicitly.
