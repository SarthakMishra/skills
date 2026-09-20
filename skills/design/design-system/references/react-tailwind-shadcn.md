# Implement with React, Tailwind, and shadcn/ui

Read the installed versions and local components before choosing APIs. Consult
their matching official documentation for setup or version-specific changes.
Do not upgrade the stack as a side effect of establishing a design system.

## Keep one path from tokens to components

Use CSS custom properties for theme roles and connect them to Tailwind's theme.
Components should consume semantic roles such as `bg-primary` and
`text-primary-foreground` together. Keep raw palette choices inside the theme or
explicitly documented specialist uses, such as data visualization.

For Tailwind v4, define theme utilities in CSS with `@theme`; use `@theme inline`
when mapping theme variables to other CSS variables. Keep mode-specific values in
the project's theme selectors. This abbreviated example maps existing variables,
not a complete theme to paste over the project's CSS:

```css
@theme inline {
  --color-primary: var(--primary);
  --color-primary-foreground: var(--primary-foreground);
}
```

For Tailwind v3, use the existing `tailwind.config.*` theme mapping. Preserve the
stored color format: `hsl(var(--primary))` fits HSL channel values; `var(--primary)`
fits a complete color value. Do not mix these representations or insert v4 syntax
into a v3 project.

Reuse shadcn's installed role names, light/dark selectors, and radius conventions.
Extend missing semantic roles with the same convention instead of keeping a
second competing token namespace. Inspect existing `--animate-*`, keyframes,
animation plugins, and component data attributes when adding motion.

Use complete class strings in variant maps so Tailwind can detect them. Avoid
interpolation such as `bg-${color}-500`. For genuine dynamic data, use a validated
runtime value through a scoped style or CSS variable; do not manufacture a class
name that the build cannot see.

## Own the shared component source

shadcn supplies editable component source. Inspect local customizations before
adding or updating a component; avoid overwriting them through regeneration.
Check which underlying control library and composition API the project uses.
Preserve its keyboard behavior, focus management, data attributes, refs, and ARIA
relationships. A visual wrapper must not discard the behavior it wraps.

Keep presentational components free of feature-specific fetching and business
rules. Put those in feature compositions or page containers. Reuse the installed
class-merging helper and variant tool if present. A small static map is sufficient
when no variant dependency exists.

Choose the API around supported meanings:

- Use named variants for intent or emphasis and size. Use independent props only
  for independent choices; mutually exclusive booleans create invalid combinations.
- Derive interaction states from browser behavior, the underlying control, or real
  application state. Do not add public `hovered` and `focused` props just to
  reproduce a design tool's variant matrix.
- Use children or named slots for variable content. Keep native attributes and
  accessible names usable. Follow the installed React version's ref conventions.
- Document layout customization separately from visual identity. Consumer
  `className` may support placement; repeated color, radius, or timing overrides
  indicate a missing variant or a contract violation.
- Use native buttons for actions and links for navigation. Composition must not
  create nested interactive elements. Make the button's submit behavior explicit
  where it matters; preserve existing behavior during migration.

For example, adding an icon and label to a supported button is usually composition.
A feature-specific toolbar belongs with the feature until other consumers need
the same behavior. A shared destructive button treatment belongs in the canonical
button variants, rather than being reimplemented across screens.

## Adapt an existing or registry component

For external candidates, complete the search and inspection in
[registry-discovery.md](registry-discovery.md) first. For an installed component,
work from its local source and consumers. Adapt the canonical implementation;
repeated consumer overrides create a second, undocumented design system.

1. Identify the behavior to retain: composition parts, controlled state, keyboard
   handling, focus, refs, ARIA relationships, and public props. Separate these
   contracts from the demo's styling and application wiring.
2. Map the component's visual choices to project tokens and variants. Replace
   hardcoded palette values, typography, spacing, radius, elevation, and stacking
   where the contract requires it. Preserve meaningful chart series distinctions
   and state contrast instead of replacing every color with `primary`.
3. Reuse local buttons, fields, popovers, icons, and utilities. Resolve imports
   through the project's aliases. Inspect transitive registry dependencies so a
   copied block does not introduce competing versions of these controls.
4. Replace demo timing, easing, springs, and keyframes with the system's motion
   recipes. Preserve behavior under interruption and reduced motion. Adapt
   component data-state animations as well as obvious inline motion props.
5. Remove fixture data, demo page shells, branding, and unused integrations from
   the production component. Keep necessary functionality behind the project's
   existing data and state interfaces. Do not adopt a database or AI runtime solely
   because the demo uses it.
6. Verify the adapted component with its consumers, themes, keyboard behavior,
   state boundaries, and content extremes. Record the source item or commit,
   applicable license notices, and substantial local changes near the code or in
   existing design documentation. Review future upstream updates as diffs rather
   than reinstalling over the adapted source.

For example, adapt an imported filter toolbar to use the canonical `Button`,
`Input`, and `Popover`, the approved compact size, and the disclosure motion
recipe. Keep its filter logic if it fits the app. Do not retain a second button
implementation merely to match the registry preview.

## Author new components in the shadcn pattern

After the discovery step shows that existing candidates do not fit, use a nearby
local shadcn component of similar complexity as the authoring reference. For a new
project, inspect the official source matching its chosen style and underlying
control library. shadcn conventions evolve; the local version determines details.

- Keep editable React source in the configured component directory, with named
  exports and the project's file naming. Export composable parts such as root,
  trigger, content, and item only when the interaction needs them.
- Derive props from the native element or underlying control with
  `React.ComponentProps` or the matching installed-version type. Preserve native
  attributes, handlers, and ref access. Add `"use client"` only for code that needs
  a client boundary.
- Use the project's `cn` helper for base, variant, and consumer classes. Where the
  project uses `cva`, keep variant definitions and `VariantProps` together, with
  explicit defaults. Retain a simpler existing map for components without that
  dependency. Use semantic tokens and the shared motion recipes in these classes.
- Follow local `data-slot` naming for component parts and preserve the underlying
  library's state attributes. Use supported `data-*` and `aria-*` selectors for
  states rather than inventing duplicated state flags for styling.
- Match the installed composition API. Radix `asChild` and Base UI `render` have
  different contracts; do not translate them mechanically or introduce another
  control library just to copy its API. Compose existing accessible controls for
  complex interactions instead of recreating their behavior.
- Add usage and state examples in the project's chosen documentation. A component
  is complete when it fits the same tokens, API conventions, and behavior checks
  as installed components, regardless of where its source originated.

Registry publishing is separate from component authoring. Only when distribution
is requested, add a schema-valid item manifest with file types and paths, package
`dependencies`, and component `registryDependencies`. Choose `registry:ui`,
`registry:component`, or `registry:block` for what is actually distributed, verify
with `shadcn build`, and exercise installation in a temporary consuming project.
A local component does not need a registry server or manifest.

## Check changes where they propagate

Find consumers before changing defaults, token meanings, variant names, or
controlled/uncontrolled behavior. Inspect representative uses with different
content and nesting. Avoid enlarging client-rendered boundaries solely to share
visual styles in a server-rendered React app.

Compile the actual app and documentation examples. Check focus, validation,
disabled and pending behavior, and theme inheritance through portals. Compare the
component alone and within its real layout. Shared source prevents duplication;
it does not by itself establish correct accessibility or visual quality.
