# Database and hosting

Read this reference when the spec needs persistence or an application deployment
target. Select an architecture during the interview, then configure and verify it
locally. Default to local-only work; optionally provision the agreed resources
after verification. Selecting a provider alone does not authorize remote changes.
Libraries and local CLIs may need neither a database nor hosting.

## Persistence

Use Postgres and Drizzle ORM when a database is needed. For a basic Cloudflare
app whose requirements fit D1, recommend D1 with Drizzle as the explicit exception.
An engine or ORM specified by the user takes precedence over these defaults.
Preserve an explicit choice in the spec and resolve conflicts with the user.
Add no database to an app that does not need persistence.

Choose the database engine, ORM driver, and database host separately. For hosted
Postgres, recommend [PlanetScale Postgres](https://planetscale.com/docs/postgres)
by default. Compare a managed Postgres product from the chosen application host
when available and suitable. Respect a request to self-host Postgres on the
user's VM. Do not substitute PlanetScale's Vitess/MySQL product for Postgres.

When recommending D1 for a basic Cloudflare application, explain that
[D1 uses SQLite semantics](https://developers.cloudflare.com/d1/), not Postgres.
With the default ORM, use [Drizzle's D1 driver](https://orm.drizzle.team/docs/sqlite/connect-cloudflare-d1)
and SQLite schema/migrations. A user-selected alternative must support D1.
Do not use PostgreSQL migrations or imply a future
engine migration will require only a connection-string change. Keep Postgres
when the requirements depend on its capabilities.

Verify the current database driver's runtime compatibility, supported extensions,
transaction needs, connection limits, and pooling approach against official docs.
For Workers with external Postgres, evaluate a supported driver and
[Hyperdrive](https://developers.cloudflare.com/hyperdrive/) where appropriate;
do not add a connection service without a concrete need.

## Application hosting

For a basic app, recommend Cloudflare Workers and
[Workers Static Assets](https://developers.cloudflare.com/workers/static-assets/).
Basic means its rendering, compute, storage, and background work fit the supported
runtime and limits. A small codebase with unsupported runtime dependencies is
not automatically a basic Workers deployment.

Prefer relevant Cloudflare services where the requirements justify them, such as
R2 for object storage, Queues for background delivery, or Durable Objects for
stateful coordination. Add only the services the spec needs. Use the available
Cloudflare, Workers, and Wrangler skills or current official docs to verify the
chosen framework adapter, bindings, local development, and limits.

For a complex app or a mismatch with Workers, discuss the deployment topology
with the user before choosing it. Consider Vercel, Render, AWS, GCP, Azure, a
self-hosted VM such as DigitalOcean, or another provider that fits the needs.
Cloudflare remains an option if it fits. Do not choose by project size alone.

Compare only the plausible options against the relevant constraints:

- Framework/runtime support, request duration, background jobs, stateful services,
  containers, and persistent storage.
- User regions, application/database proximity, latency, and data residency.
  Check actual product region support; an edge network is not a residency guarantee.
- Expected workload, current pricing, scaling, private networking, and egress.
- Managed operations versus the user's willingness to maintain a VM and database.

For Postgres hosting, compare PlanetScale with the selected provider's managed
Postgres on those same requirements. Recommend a suitable provider-native option
when locality or operational simplicity makes it a better fit. Self-hosting is a
user choice, with an identified owner for upgrades, backups, recovery, and access
control. Verify current products and region availability rather than assuming
every application provider offers managed Postgres.

## Local setup and verification

Record the selected engine, ORM, driver, application host, database host, intended
regions, and the reasons behind them. Record only choices relevant to the app.
Keep runtime and database credentials server-side.

For Postgres, configure the selected ORM and supported driver and provide an
isolated local Postgres development/test path, such as the project's agreed
container setup. For D1, use local Wrangler bindings and the selected dialect.
Include migration configuration and explicit local migration commands. Only
add domain tables already defined by the spec; do not invent schema or seed real
data to demonstrate that the connection works.

Exercise a connection or harmless query against a disposable local database.
If migrations exist, apply them to that database and verify they succeed. Never
fall back to a production connection when local verification fails. Keep remote
migrations and deployments separate from install, build, check, and smoke tests.

Add only the configuration needed for the chosen target, such as Wrangler
bindings, a supported framework adapter, or the agreed container configuration.
Use documented placeholders for remote resource identifiers, and report them as
pending. Do not fabricate account IDs or claim a successful cloud deployment.

For local-only work, document the remaining remote setup without creating the
service or configuring a live VM. Continue below only when provisioning was
agreed. Keep local verification independent of the provisioned infrastructure.

## Provisioning and verification

During the interview, define the target account/project, provider, region,
resources, service tier, and expected ongoing costs using current provider docs.
Identify existing resources to reuse and whether this run includes DNS changes,
an initial deployment of the verified foundation, or applying reviewed migrations
to the intended database. Include those actions in the concrete plan. Preserve
prior authorization; ask again only for a change in scope, cost, or destination.

Use the chosen provider's current tools and applicable installed skills. Verify
the authenticated account before writing, inventory existing resources, and
resume partial work without creating duplicates. Create only resources in the
agreed plan. Do not repurpose a production database or replace existing services
to make the starter run. Credentials and human-only account/billing steps can be
handed to the user while independent local work continues.

For managed Postgres, provision the selected provider's Postgres product in the
agreed region with appropriate access controls and backup settings. For D1,
provision D1 and wire its actual binding and migration target. Store credentials
through the provider's secret facility; commit safe configuration and resource
identifiers only where appropriate. Use separate application credentials from
administrative credentials.

For user-selected self-hosted Postgres, configure the agreed VM and Postgres
version, persistent storage, service startup, and restricted network access.
Bind to localhost/private networking where possible and configure encrypted
remote access when needed. Set up application roles, automated backups, and a
restore check against an isolated target. Record who owns patches, monitoring,
and recovery. A running database process alone is not a completed VM setup.
Use a provider-managed option instead only if the user changes that decision.

Before connecting a Git repository to hosting, inspect its automatic deployment
behavior. Keep releases disabled unless deployment was included in the plan.
If an initial deployment was agreed, deploy only the verified foundation to the
specified environment and check its health. Apply remote migrations only to the
agreed target and only when included in scope. Keep migration and release
commands separate from routine checks.

Read back resource type, account/project, region, access settings, and bindings.
Verify database connectivity with a harmless query. For a deployed foundation,
verify the URL, health or rendering, and runtime configuration without exposing
secrets. Record created resource IDs and safe configuration, test results,
pending steps, and how to remove the resources later. Do not delete resources
automatically after a partial failure. Report what exists before retrying.

Distinguish local configuration, provisioned resources, and a verified initial
deployment in the handoff. If access or a manual step blocks provisioning, retain
the completed local foundation and name the exact remaining operation.
