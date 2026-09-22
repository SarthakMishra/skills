# Prevent decay and enforce the system

Read this file when formalizing an existing system, migrating consumers, changing
a shared contract, or adding documentation or checks. Decay starts when pages
restyle shared components, bypass semantic tokens, or recreate existing patterns.

## Inventory before changing shared code

Search the agreed scope for token definitions, repeated classes, shadcn component
families, local modifications, motion values, consumers, docs, and checks. Record
real paths and consumers.

| Family | Current source and consumers           | Decision | Action                                                   |
| ------ | -------------------------------------- | -------- | -------------------------------------------------------- |
| Button | `components/ui/button.tsx`; 18 imports | keep     | add a `loading` variant and remove three local overrides |

Bad: "Buttons are inconsistent" with no paths, states, or consumer list.

Good: "`components/ui/button.tsx` owns settings and billing buttons. Three
consumers add padding and raw colors. Add the missing shared variant, replace
those overrides, and delete them after lint passes."

Classify each family as retain, compose, extend, replace, retire, or defer. Keep
deliberate product differences. Frequency alone does not make a pattern canonical.

## Use `@shadcn/lint` for Tailwind drift

Use the project's existing ESLint or Oxlint setup and follow the installed
`@shadcn/lint` setup.
Configure only rules that match the project's contracts. Start with:

- `shadcn/no-restyle` for component-owned padding, radius, color, and typography
- `shadcn/no-raw-colors` for semantic theme roles
- `shadcn/no-arbitrary-values` for the approved Tailwind scales
- `shadcn/require-static-classes` for classes Tailwind can read
- `shadcn/no-unknown-classes` for invalid or missing utilities

Allow layout changes where the contract permits them. Keep internal visual
choices in the shadcn component. Use contracts and custom messages to tell agents
which variant, token file, or `DESIGN.md` rule fixes a violation.

```json
{
  "shadcn/no-restyle": [
    "error",
    {
      "allow": ["layout"],
      "contracts": [{ "pattern": "^Button$", "allow": ["layout"] }]
    }
  ],
  "shadcn/no-raw-colors": "error",
  "shadcn/no-arbitrary-values": "error",
  "shadcn/require-static-classes": "error"
}
```

Good: `<Button size="lg" className="mt-4 md:w-full" />` changes a named size
and page layout.

Bad: `<Button className="p-4 rounded-full bg-blue-500" />` changes owned
spacing, shape, and color. It bypasses the component contract.

If the project's Tailwind or linter version cannot use `@shadcn/lint`, record
the limitation and use existing checks until the supported setup is available.
Do not build a second custom parser for rules the linter already provides.

## Migrate in small steps

1. Choose the canonical shadcn source using behavior, accessibility, identity, and API fit.
2. Map old tokens and variants to the new semantic roles. Keep an adapter only while a consumer needs it.
3. Compose one representative feature and fix the contract from what you learn.
4. Migrate the remaining in-scope consumers in batches. Track old paths and lint violations.
5. Delete obsolete definitions after searches and relevant checks show they are unused.

Keep the app usable during migration. Do not rename folders, upgrade packages, or
replace unrelated components to make the tree look uniform.

## Keep one design entry point

Use the existing `DESIGN.md` or equivalent. Create it only when no equivalent
exists. Include supported themes, semantic roles, canonical components, variant
rules, composition rules, motion, accessibility, contribution, migration,
exceptions, and the commands that enforce the contract.

Keep executable values in theme and component files. Link to them instead of
copying token tables into prose. Add a short pointer in `AGENTS.md` when future
agents need to read the design entry point.

## Add checks for repeated failures

Test a real violation, an approved use, and a documented exception. Add the check
to the command CI runs. Start with adopted paths or a recorded legacy baseline so
old code does not block unrelated work. New violations must not silently expand
the baseline.

Use `DESIGN.md` and the app's preview path for a small catalog. Discuss Storybook
only when many states or independent contributors justify its setup and CI cost.
If Storybook already exists, reuse its production components and providers.
