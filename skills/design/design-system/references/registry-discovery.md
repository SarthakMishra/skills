# Find components before building them

Read this file when local shadcn components do not fit the requirement. Build on
the installed source first, then the official shadcn registry, then a relevant
community registry.

## Search in this order

1. Search local `components/ui`, variants, and feature compositions with `rg`.
2. Check the official shadcn registry for the missing behavior.
3. Use the shadcn registry directory to find a relevant community namespace only when the official source does not fit.
4. Inspect the strongest candidate and choose composition, adaptation, or local code.
5. Record the search terms, namespaces, candidates, and rejection or selection reason.

Bad: search every catalog for "dashboard", copy the first demo, and install its
whole dependency tree.

Good: search local `Filter` components, check the official registry for
"faceted filter", inspect one candidate, run `add --dry-run`, and adapt only the
missing behavior.

## Use the installed CLI

Use the project's pinned shadcn CLI. If none exists, use the package manager
already used by the project. Check `search --help` and `add --help` when the CLI
version differs.

```sh
pnpm dlx shadcn@latest search @your-registry --query "document viewer" --limit 10 --json
pnpm dlx shadcn@latest view @your-registry/item
pnpm dlx shadcn@latest add @your-registry/item --dry-run
```

Pass explicit namespaces. Search additional pages when results are paginated.
Use the returned item address or add command. Do not guess item names.

If a registry errors, isolate it and continue with the official catalog or the
remaining relevant registry. An empty result is not proof that no component exists.

## Review a candidate before adding it

Check these four things in `view` output and the dry run:

| Check               | Accept when                                                                |
| ------------------- | -------------------------------------------------------------------------- |
| Behavior            | keyboard, focus, ARIA, controlled state, and refs fit the app              |
| Compatibility       | React, Tailwind, control library, aliases, and client boundaries match     |
| Cost                | dependencies and setup solve the requirement without unused infrastructure |
| License and support | source permissions, notices, and current maintenance are clear             |

Reject candidates that overwrite local shadcn controls or require an unrelated
stack migration. Preserve private registry configuration. Add only the selected
item and required dependencies.

After adding, inspect the diff and follow
[react-tailwind-shadcn.md](react-tailwind-shadcn.md) to map tokens, controls,
motion, data, and state. Record substantial local changes for future upstream
updates.

Done means the selected item is the smallest compatible addition, its source and
license are recorded when required, and the real consumer passes the component
and project checks.
