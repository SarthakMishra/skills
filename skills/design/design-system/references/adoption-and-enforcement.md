# Adopt, document, and enforce the system

Use this reference for partial-system adoption, documentation, governance, or
enforcement changes. Keep the process proportional to the product and contributors.

## Formalize an existing project

Inventory distinct patterns in the agreed scope from code and rendered screens.
Include token definitions, repeated utility combinations, competing components,
local shadcn modifications, motion recipes, and existing docs or tests. Record
evidence using real paths and consumers, not hypothetical inconsistencies.

Use a compact table to record each component family, its current implementations
and consumers, their differences, the chosen implementation, and the planned
action. Mark each family as retain, merge, replace, or retire. Distinguish
intentional product differences from accidental drift; frequency alone does not
make a pattern correct.

1. Choose canonical patterns using usability, accessibility, existing identity,
   behavior, and adoption. Record the choice and any needed API changes.
2. Map legacy tokens and variants to their replacements. Preserve supported themes
   and behavior. Use temporary aliases or adapters only when consumers need them.
3. Migrate a representative composition and inspect the result in context. Use its
   findings to refine the contract before migrating other components.
4. Complete the remaining in-scope consumers in manageable batches. Track old and
   new paths so the remaining migration work is visible.
5. Remove obsolete definitions when consumer searches and relevant checks show
   they are unused. For separately released consumers, deprecate with a replacement
   and migration instructions before removal.

Keep the working app usable through migration. Do not replace all components,
upgrade dependencies, or rename folders just to make the architecture appear
uniform. Report adoption by the actual inventory, not an invented coverage score.

## Use DESIGN.md as the entry point

For a small project, write a concise root `DESIGN.md`. If equivalent documentation
already exists, update it and use a pointer instead of creating competing guidance.
Include decisions readers cannot infer from a component signature:

- Product character, supported themes/densities, and scope of the system.
- Links to canonical tokens, shared components, variant definitions, and examples.
- Rules for hierarchy, grouping, layout customization, and component composition.
- Motion recipes with normal, interrupted, and reduced-motion behavior.
- Accessibility and content requirements for supported states.
- How to choose reuse, extension, feature composition, or a new shared pattern.
- Search-before-build and shadcn authoring conventions, including how imported
  source is adapted to the project's tokens, controls, and motion.
- Commands that actually enforce the contract, review expectations, and exceptions.
- Migration status and deprecations when adopting an existing project.

Link to executable values instead of copying entire token tables into prose.
Keep rationale and usage guidance beside the canonical code or in this document.
Update them in the same change that alters the contract.

To make coding agents follow the system, add a short instruction with the
correct path to the project's existing `AGENTS.md` or equivalent, preserving
unrelated guidance:

> Before creating or changing UI components, read DESIGN.md. Reuse its canonical
> components, tokens, and motion recipes. Record any required exception and update
> the contract when shared behavior changes. Before authoring a missing component,
> follow its registry discovery and shadcn authoring conventions.

If no agent instruction file exists, a minimal file with this pointer is enough.
The pointer must name the actual documentation path. Ordinary component edits
should follow the existing pointer rather than rewriting project instructions.

## Offer Storybook when its cost is justified

A large component catalog, many state combinations, or independent contributors
can justify a separate component preview environment. There is no universal
component-count threshold. Follow the consultation requirement in `SKILL.md`
before adopting Storybook. Explain the proposed scope, development dependencies,
scripts, and CI cost. A pending or declined choice does not block `DESIGN.md` or
component implementation.

When approved or already present:

- Use the installed framework and builder integration. Import production components,
  global styles, fonts, theme providers, and relevant portal setup.
- Add representative states and meaningful boundary cases. Use controls for real
  public variants; avoid creating the full Cartesian product of every prop.
- Include keyboard interactions and motion interruption/reduced-motion examples.
  Make themes and viewport contexts available where the product supports them.
- Keep fixtures local and deterministic. Stories must not mutate live user data.
- Run the Storybook build and available interaction/accessibility checks. Automated
  accessibility checks supplement keyboard and visual inspection.

Keep `DESIGN.md` as a concise navigation and contribution entry point if useful;
avoid repeating the story catalog in it. Storybook documents and exercises code,
but does not automatically prevent a consuming page from bypassing the system.

## Enforce the decisions that can be checked

Start with canonical source, typed component APIs, discoverable guidance, and a
review of changed consumers. Reuse installed lint rules and test facilities. Add
a custom rule when existing checks cannot reliably catch a recurring violation.

| Contract                            | Suitable enforcement                                              | Boundary                                                                |
| ----------------------------------- | ----------------------------------------------------------------- | ----------------------------------------------------------------------- |
| Supported component variants        | Type checking and representative examples                         | Types cannot establish visual quality                                   |
| Canonical component imports         | Existing restricted-import rules for deprecated paths             | Permit the shared implementation's underlying library imports           |
| Semantic visual tokens              | Existing styling rules, then targeted class/CSS parsing if needed | Permit token definitions, runtime data, and documented specialist cases |
| Shared motion recipes               | Review or lint known duration/easing declarations                 | Inspect library presets and reduced motion behavior as well             |
| Keyboard, focus, and state behavior | Existing interaction tests and manual checks                      | A screenshot does not cover these behaviors                             |
| Visual consistency                  | Rendered comparisons in representative pages                      | Review baseline changes; do not accept them automatically               |

Define exactly which paths and values a rule governs before writing it. Tailwind
contains variants, arbitrary values, CSS variable references, and class
composition helpers. Inspect grep matches before reporting them as violations.
Avoid blanket bans on numeric utilities, inline styles, arbitrary values, or
native elements; legitimate layout, dynamic data, and accessible composition
need them.

If implementing a custom rule, use the installed linter's supported extension
mechanism and parser. Test an actual violation, an approved token reference, and
a legitimate exception. Add it to a command that CI runs. Start with adopted
paths or a recorded legacy baseline so adoption does not demand unrelated
rewrites; new violations must not silently expand the baseline.

Record exceptions with location, reason, scope, and a removal or review condition.
Require evidence before promoting an exception into a shared variant. Keep the
current maintainer or decision process discoverable; do not invent an approval
committee for a solo project. Document breaking changes and replacement paths
when multiple consumers rely on the system.
