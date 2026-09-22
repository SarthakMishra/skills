# Design system

Use `$design-system` in Codex or `/design-system` in Claude Code to build on a
React project's Tailwind and shadcn/ui defaults. Keep the defaults stable and
make the smallest documented extension that real product needs require.

## Use it for

- choosing semantic Tailwind and shadcn tokens
- creating or changing shared React components with `cva` and `cn`
- composing atoms, molecules, and organisms
- migrating component families without UI decay
- enforcing component and token contracts with `@shadcn/lint`

Use [ux-guide](../ux-guide/README.md) for a user flow and
[ux-writer](../ux-writer/README.md) for interface copy. Use
[design-engineer](../design-engineer/README.md) when one feature needs all of
those concerns.

## Useful requests

- "Build the settings feature on top of our existing shadcn components."
- "Add a pending state to the shared Button with a proper `cva` variant."
- "Compose a filter toolbar from our existing Input, Button, and Popover."
- "Migrate duplicate buttons and enforce the contract with `@shadcn/lint`."
- "Audit component states, icon semantics, contrast, and responsive behavior."
- "Audit token and component drift without changing product behavior."

## Result

A useful run leaves React components using the existing shadcn APIs and semantic
Tailwind roles, readable states and content, new variants only where needed,
tokens named by role, and lint or tests that catch the relevant decay. It also
updates `DESIGN.md` or the existing equivalent and reports checks that ran.

## Reference map

- [foundations](references/foundations.md): shadcn defaults and role-based token naming.
- [react-tailwind-shadcn](references/react-tailwind-shadcn.md): `cva`, `cn`, composition, extension, and adaptation.
- [registry-discovery](references/registry-discovery.md): local, official, then community component search.
- [motion](references/motion.md): Tailwind and shadcn interaction motion.
- [adoption-and-enforcement](references/adoption-and-enforcement.md): decay prevention and `@shadcn/lint`.

Bootstrap can invoke this skill for selected frontend setup. If setup is skipped,
bootstrap keeps the existing styling and does not add design-system files.
