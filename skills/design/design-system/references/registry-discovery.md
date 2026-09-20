# Find components before building them

Search local components first. If a capability is missing, use the registry
workflow below before creating or importing a component. Check each candidate
against the project's design-system contract before adopting it.

## Search the local system, then the registries

1. Search the repo for matching components, variants, and feature compositions.
   Reuse a suitable local implementation. An existing component edit does not
   require a new external search unless a capability is missing.
2. Describe the missing behavior using concrete search terms, such as faceted
   filtering, PDF review, map markers, or streaming tool output. Select every
   relevant specialist from the shortlist below and any project registries.
3. Search those namespaces with the shadcn CLI. Include the default registry for
   baseline controls, but do not stop there when the requirement needs a richer
   pattern. Search alternate terms and the unfiltered specialist catalog when
   naming is ambiguous. Read further pages before declaring no match.
4. If the shortlist misses the domain, consult the current
   [registry directory](https://ui.shadcn.com/docs/directory) and broaden the search.
   It is not a closed allowlist. Avoid querying every registry for an ordinary
   control already present locally.
5. Inspect the strongest candidates and choose reuse, adaptation, or new code.
   Record the namespaces and terms searched, candidate item addresses, and the
   concrete fit or rejection reason. If searches fail, name that limitation;
   unavailable results are not proof that no component exists.

## CLI workflow

Use the project's pinned CLI when available; otherwise use `pnpm dlx shadcn@latest`.
Search, pagination, and `view` were verified with CLI 4.21.0 on 2026-09-20;
`add --dry-run` was verified against a downloaded item in a temporary consumer.
Check `search --help` and `add --help` if the project's version differs. Use its
package manager in other projects.

```sh
pnpm dlx shadcn@latest search @bklit @evilcharts @dashboardcn --query chart --limit 10 --json
pnpm dlx shadcn@latest search @extend --query viewer --limit 10 --json
pnpm dlx shadcn@latest search @mapcn --limit 10 --json
pnpm dlx shadcn@latest view @mapcn/map
pnpm dlx shadcn@latest add @mapcn/map --dry-run
```

Pass explicit namespaces. Omitting them searches configured registries in current
CLI versions, not the entire public directory. Public directory namespaces resolve
without adding all of them to `components.json`. Preserve existing private registry
configuration. Add a namespace mapping only when its documented endpoint, style,
or authentication needs one.

Use `--offset` and `--limit` for additional pages. For a multi-registry search,
the current CLI merges and paginates results; query a specialist separately if
its matches are buried. Item names are case-sensitive and may encode framework
or styling variants. Use the returned `addCommandArgument` rather than guessing
names. Search catalog URLs; use item URLs for `view` and `add`.

[Dynamic search](https://ui.shadcn.com/docs/registry/dynamic-search) is a
registry server capability. The CLI filters static catalogs. Servers that return
paginated results can filter remotely. It does not require building a search
service or changing the consuming app. On an error, isolate the failing registry
and continue with the others or its official catalog.

## Review before adding

Use `view` to inspect source and item metadata, then `add --dry-run` from the target
project to see planned changes. Read files, package and registry dependencies,
CSS/theme changes, and any setup requirements. Match React and Tailwind versions,
Base UI versus Radix, client boundaries, and the app's data/state interfaces.
Check item-specific licensing and retain notices; a monorepo's root license may
differ from its UI directory. A paid demo is not permission to copy its source.

Prefer supported behavior, accessible composition, compatible dependencies, and
ease of adapting to the system over screenshot similarity. Check the selected
component's recent commits or releases and unresolved compatibility issues. Stars,
company funding, and a reachable registry do not establish ongoing support.

After choosing a candidate, add only that item and its necessary dependencies.
Inspect the resulting diff and follow the adaptation steps in
[react-tailwind-shadcn.md](react-tailwind-shadcn.md). Do not use `--all`, overwrite
local controls, or replace the project's theme just to reproduce a demo. If a
candidate needs a conflicting stack or substantial unused infrastructure, record
why a smaller local implementation is a better fit.

## Specialist shortlist

Reviewed on 2026-09-20 against the directory, provider documentation, catalogs,
and the linked source repositories. These 14 registries cover gaps beyond basic
controls. The source links are also where to recheck maintenance before adoption.
This is a discovery shortlist, not a guarantee that every item fits every app.

### Documents, AI, and tables

| Registry and docs                                                              | Search for                                                    | Maintainer or support evidence                                                  | Adaptation concern                                                                       |
| ------------------------------------------------------------------------------ | ------------------------------------------------------------- | ------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------- |
| [Extend UI](https://ui.extend.ai/ui/docs), `@extend`                           | PDF/document viewers, citations, schema editing, human review | [Extend source](https://github.com/extend-hq/ui)                                | Use the style-aware endpoint below; inspect document engine dependencies.                |
| [AI Elements](https://ai-sdk.dev/elements), `@ai-elements`                     | Conversation, reasoning, tools, artifacts, AI workflows       | [Vercel source](https://github.com/vercel/ai-elements)                          | Match the actual AI SDK/state API; do not install the whole catalog.                     |
| [assistant-ui](https://www.assistant-ui.com/), `@assistant-ui`                 | Chat threads, attachments, branching, runtime adapters        | [Maintained library and adapters](https://github.com/assistant-ui/assistant-ui) | This can introduce a runtime, not just copied presentation.                              |
| [OpenStatus tables](https://data-table.openstatus.dev/), `@data-table-filters` | Faceted filters, infinite tables, row details                 | [OpenStatus source](https://github.com/openstatusHQ/data-table-filters)         | Choose client or server patterns deliberately; the demo database connection is optional. |

### Charts and maps

| Registry and docs                                        | Search for                                           | Maintainer or support evidence                                            | Adaptation concern                                                          |
| -------------------------------------------------------- | ---------------------------------------------------- | ------------------------------------------------------------------------- | --------------------------------------------------------------------------- |
| [Bklit UI](https://ui.bklit.com/), `@bklit`              | Composable interactive charts                        | [Bklit source](https://github.com/bklit/bklit-ui)                         | Visx and Motion differ from a project's existing Recharts stack.            |
| [EvilCharts](https://evilcharts.com/docs), `@evilcharts` | Recharts compositions and specialized visualizations | [Community source](https://github.com/legions-developer/evilcharts)       | Match chart roles, labels, themes, and motion to the system.                |
| [dashboardcn](https://dashboardcn.com/), `@dashboardcn`  | KPI cards, funnels, heatmaps, ranked lists           | [Small, recently active project](https://github.com/NoahGdev/dashboardcn) | Verify table/chart dependency versions; maintenance history is short.       |
| [mapcn](https://mapcn.dev/), `@mapcn`                    | Maps, markers, routes, geographic dashboards         | [Community source](https://github.com/AnmolSaini16/mapcn)                 | MapLibre, tile sources, attribution, and client rendering need integration. |

### Editors and application controls

| Registry and docs                               | Search for                                                     | Maintainer or support evidence                                         | Adaptation concern                                                                  |
| ----------------------------------------------- | -------------------------------------------------------------- | ---------------------------------------------------------------------- | ----------------------------------------------------------------------------------- |
| [Plate](https://platejs.org/), `@plate`         | Rich-text editing, toolbars, editor plugins                    | [Editor packages and source](https://github.com/udecode/plate)         | Select needed plugins and check item licenses; avoid a full demo editor by default. |
| [Kibo UI](https://www.kibo-ui.com/), `@kibo-ui` | Kanban, Gantt, file handling, color pickers, media             | [Shadcnblocks-maintained source](https://github.com/shadcnblocks/kibo) | Check the selected component's dependencies and recent updates separately.          |
| [coss ui](https://coss.com/ui), `@coss`         | Number fields, grouped controls, composed application patterns | [Cal.com design-system source](https://github.com/cosscom/coss)        | Base UI composition; verify directory-specific licenses in this mixed-license repo. |

### Motion and presentation

| Registry and docs                                   | Search for                                                  | Maintainer or support evidence                                            | Adaptation concern                                                                                   |
| --------------------------------------------------- | ----------------------------------------------------------- | ------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------- |
| [Magic UI](https://magicui.design/), `@magicui`     | Counters, marquees, text and presentation effects           | [Established community source](https://github.com/magicuidesign/magicui)  | Distinguish free components from paid templates; reduce decorative motion.                           |
| [React Bits](https://reactbits.dev/), `@react-bits` | Specialized animated text, backgrounds, interactive effects | [Established community source](https://github.com/DavidHDev/react-bits)   | Select TypeScript/Tailwind items; inspect GPU cost, licenses, and reduced motion.                    |
| [Cult UI](https://www.cult-ui.com/docs), `@cult-ui` | Expandable toolbars, onboarding, morphing panels            | [Community source and changelog](https://github.com/nolly-studio/cult-ui) | Catalog returned HTTP 429 during review; use docs or retry later, without treating it as no matches. |

### Maintenance evidence and limits

At review, all linked repositories were unarchived. Latest repository pushes were
in August or September 2026 for 12 entries, July for Cult UI, and May for Kibo UI.
These are repository activity signals, not proof that a particular component was
updated. Thirteen catalogs returned parseable item lists; Cult UI's request was
rate-limited. Recheck selected candidates rather than treating this dated snapshot
as a permanent endorsement.

The directory's experimental
[health data](https://ui.shadcn.com/docs/registry/health) measures availability and
registry/CLI compatibility, not popularity, accessibility, or code quality. Use
provider docs and source activity alongside it. Company ownership is identified
where supported; funding claims are not needed to select a useful component.

### Extend endpoint compatibility

The directory currently resolves `@extend` to a legacy endpoint that supplies Base
UI components. [Extend's installation docs](https://ui.extend.ai/ui/docs) specify
a style-aware mapping. Merge this entry into the existing `registries` object
when using Extend, preserving all other configuration:

```json
{
  "registries": {
    "@extend": "https://www.extend.ai/ui/r/styles/{style}/{name}.json"
  }
}
```

Confirm that the project's `components.json` style is supported and inspect the
resolved item before installing. Unsupported legacy styles require a separate
migration decision; component discovery does not authorize a stack migration.
