# Author with React, Tailwind, and shadcn/ui

Read this file for component implementation. Inspect installed versions,
`components.json`, the local `components/ui` source, and its consumers first.
Do not upgrade the stack or replace the chosen control library as a side effect.

## Start with shadcn defaults

Use the installed shadcn component as the base. Preserve its semantics, keyboard
behavior, focus management, refs, ARIA relations, state attributes, tokens, and
composition API. Change it only when a requirement or repeated consumer need
cannot be met by composition or an existing variant.

Good: add a named `loading` variant to the local `Button` when the behavior and
visual treatment belong to every button that can submit.

Bad: import a second button library because its demo has a nicer shadow. It
duplicates behavior and starts a second design system.

## Compose, extend, or add

- **Compose** existing atoms when a feature combines controls for one task. Keep
  a one-off toolbar or form section in feature code.
- **Extend** a shared shadcn component when the same visual or behavior contract
  recurs and can be named as a variant or size.
- **Add** a new atom, molecule, or organism when no existing component can express
  the accessible behavior without hacks. Follow a nearby component of similar complexity.

Good: compose `Input`, `Button`, and `Popover` into a feature filter toolbar.

Bad: add `FilterButton`, `FilterInput`, and `FilterPopover` wrappers that only
rename existing props. They hide composition and multiply APIs.

Atomic levels describe ownership:

- Atom: `Button` or `Input` owns one control behavior.
- Molecule: `FormField` or `SearchField` combines atoms for one task.
- Organism: `SettingsForm` or `DataToolbar` composes molecules for a product section.

Keep existing folders such as `components/ui` and feature directories. Do not
move files only to match the labels.

## Use `cva` for variants and `cn` for classes

Use `cva` for explicit visual dimensions such as `variant` and `size`. Keep
defaults and variant definitions in the component source. Use `cn` to merge the
generated classes with the consumer's allowed classes.

```tsx
const buttonVariants = cva("inline-flex items-center rounded-md", {
  variants: {
    variant: {
      default: "bg-primary text-primary-foreground",
      destructive: "bg-destructive text-destructive-foreground",
    },
    size: {
      default: "h-9 px-4",
      sm: "h-8 px-3",
      lg: "h-10 px-6",
    },
  },
  defaultVariants: { variant: "default", size: "default" },
});

function Button({ className, variant, size, ...props }: ButtonProps) {
  return <button className={cn(buttonVariants({ variant, size, className }))} {...props} />;
}
```

The snippet is illustrative. Match the installed shadcn source, React version,
ref convention, and `cn` helper before copying it.

Good: `<Button size="lg" className="mt-4" />` uses a named size and changes
placement when layout overrides are allowed.

Bad: `<Button className="p-[13px] rounded-[3px] bg-blue-600" />` restyles
owned properties and creates decay.

Use native buttons for actions and links for navigation. Preserve native
attributes, accessible names, and submit behavior. Do not create nested
interactive elements or public `hovered` and `focused` props for CSS states.

## Keep Tailwind classes inspectable

Use semantic roles and complete class strings. Preserve the project's Tailwind
v3 or v4 theme mapping and color representation.

Good: `cn(cardVariants({ tone }), className)` with a static `tone` map.

Bad: `` `bg-${tone}-500` ``. Tailwind cannot reliably generate a class it cannot
read from source. Use a complete map or a validated CSS variable for runtime data.

## Adapt an imported component

Search the local and official shadcn sources before a community registry. After a
candidate is selected:

1. Keep its needed behavior, controlled state, keyboard handling, focus, refs, ARIA relations, and public props.
2. Map palette, type, spacing, radius, elevation, and motion to local roles and recipes.
3. Replace demo controls with local shadcn buttons, fields, popovers, icons, and utilities.
4. Remove demo data, page shells, branding, and unused integrations.
5. Record the source item or commit, license notice, and meaningful local changes.

Do not copy a second control library or introduce a database, AI runtime, or
other demo dependency to reproduce a screenshot.

## Verify propagation

Before changing a shared default, token meaning, variant name, or controlled
behavior, find its consumers. Compile the app and docs examples. Run the
project's lint rules, including `@shadcn/lint` when configured. Check the
component alone and in a real page with focus, validation, disabled, pending,
theme, portal, and content-boundary states.
