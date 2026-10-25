# Design craft upstream review

Recommend focused additions to `design-system`'s visual foundations and small
integration changes to `design-engineer`. Success means agents can turn an
observed visual weakness into a bounded treatment and an observable check,
without replacing the project's design language.

Reviewed on 2026-10-25. This is a proposal, not an implementation or an evaluation
of generated interfaces. The review focuses on the five requested upstream
skills and their relevant references. Source links pin the reviewed commits. Upstream prescriptions are design inputs,
not independently established accessibility requirements or browser guarantees.

## Recommendation

Keep the existing two-skill division. `design-system` should own visual choices
and shared contracts; `design-engineer` should apply them to real screens and
verify the result. Do not add five required companion skills or copy five
overlapping audit workflows.

The largest gap is static visual craft. Our
[foundations reference](../../skills/design/design-system/references/foundations.md)
covers token ownership, semantic roles, contrast, stable geometry, and testing,
but has little concrete typography, layout, or surface guidance. By contrast,
our [motion reference](../../skills/design/design-system/references/motion.md),
[animation implementation](../../skills/design/design-engineer/references/animation-implementation.md),
and [verification workflow](../../skills/design/design-engineer/references/verification.md)
already cover most of the upstream interaction material.

This is an extension of an existing integration. The
[design-engineer README](../../skills/design/design-engineer/README.md)
already references better-* material.

## What to adopt from each source

### Better typography: highest-value new coverage

[Source skill](https://github.com/jakubkrehel/skills/blob/592aedc44d7d5b3e29740984252902f3e5402a1c/skills/better-typography/SKILL.md)
and its references provide concrete guidance on type roles, loaded font faces,
font features, wrapping, line length, and numeric stability.

Add a typography branch under `design-system` that decides:

- Which existing role supplies size, weight, line-height, and tracking together.
- Whether the loaded font actually supplies the requested weight and features.
- When changing numbers need tabular figures and a stable allocated width.
- How headings, prose, labels, long identifiers, and recoverable truncation wrap.
- How the treatment holds up with fallback fonts, translation, and text zoom.

Use contextual starting points rather than universal failures. A prose measure
around 60–75 characters is useful for reading-heavy content, not every table or
control. Unitless line-height and relative font sizing are useful defaults;
preserve a tested existing contract. Keep font choice and copy punctuation with
their existing owners.

**Before:** a changing counter uses proportional figures and pushes its adjacent
action. **After:** use supported tabular figures and reserve enough width for the
expected digit count. Check both equal-length values and the transition from
99 to 100; tabular figures alone do not solve the second case.

Do not make font smoothing mandatory, force every heading level to a global
visual size, or add a transformed-input workaround by default. Treat input text
size as a mobile rendering check and preserve user zoom. Check target-browser
support before recommending newer text properties.

### Better layout: turn existing checks into repair guidance

[Source skill](https://github.com/jakubkrehel/skills/blob/592aedc44d7d5b3e29740984252902f3e5402a1c/skills/better-layout/SKILL.md)
adds practical grouping, shared-edge alignment, content-driven adaptation,
logical properties, hidden-content cues, and overflow repairs.

Add a layout branch under `design-system`. Use it for shared layout patterns;
`design-engineer` applies the same guidance to a bounded screen without promoting
every local arrangement into a system primitive.

- Distinguish within-group and between-group spacing using existing tokens.
- Choose breakpoints when real content stops fitting; use container queries when
  the component depends on its container and the host provides a suitable container.
- Diagnose intrinsic sizing before shrinking text: inspect grid tracks, flex
  children, wrapping, and deliberate scroll regions.
- Use logical placement where direction follows reading order. Preserve sensible
  source and focus order, including when the layout collapses.
- Keep sticky chrome from obscuring focus or anchor targets; make necessary
  hidden content discoverable and full truncated values accessible.

**Before:** a translated toolbar label overflows its flex item and clips the
action. **After:** allow the relevant item to shrink, wrap the row, and adapt at
the width where the content fails. Check long labels, narrow containers, zoom,
and the supported RTL layout.

Do not import fixed menu thresholds, a mandatory two-to-one spacing ratio, or a
ban on every fixed dimension. Do not present `100dvh` as proof that a software
keyboard cannot obscure controls. Keep the actual mobile interaction check.

### Better colors: strengthen measurement and role discipline

[Source skill](https://github.com/jakubkrehel/skills/blob/592aedc44d7d5b3e29740984252902f3e5402a1c/skills/better-colors/SKILL.md)
reinforces semantic roles and adds useful detail on ramps, actual contrast pairs,
alpha compositing, gamut, and theme-specific choices.

Our token architecture is already established. Extend it with a compact color
branch, not a replacement palette generator:

- Never borrow a separator token for text just because the current values match.
- Record the actual foreground, composited background, state, theme, measured
  contrast, applicable threshold, and measurement method.
- Distinguish calculations from declared tokens from measurements of rendered
  content, especially over images, transparency, and overlays.
- Check state roles separately in each supported appearance; do not assume a
  reversed light palette produces a working dark palette.
- Generate or adjust ramps only when an authorized theme task needs them; reuse
  the project's notation and existing color tooling.

**Before:** a muted label uses a border token that becomes faint in dark mode.
**After:** map it to the existing secondary-text role and measure its real pair
in the supported states and appearances.

Do not import the rule to rename `primary` to `accent`; shadcn already gives
`primary` a contract. Do not use a 15-degree hue difference as proof of semantic
distinguishability or replace measured contrast with a palette-step shortcut.
Preserve our existing authorization model: an audit reports; an authorized fix
can repair a failing pair without an extra permission gate.

### Better UI: add geometry and surface recipes, preserve motion policy

[Source skill](https://github.com/jakubkrehel/skills/blob/592aedc44d7d5b3e29740984252902f3e5402a1c/skills/better-ui/SKILL.md),
[surfaces](https://github.com/jakubkrehel/skills/blob/592aedc44d7d5b3e29740984252902f3e5402a1c/skills/better-ui/surfaces.md),
and [icons](https://github.com/jakubkrehel/skills/blob/592aedc44d7d5b3e29740984252902f3e5402a1c/skills/better-ui/icons.md)
offer the most useful new material in nested geometry and rendered icon treatment.

Add a short surfaces section to foundations and extend the existing icon section:

- For tightly nested surfaces intended to be concentric, relate the outer radius
  to the inner radius and the actual inset, including borders where applicable.
  Judge asymmetric or widely separated surfaces independently.
- Correct optical alignment in the component or asset while preserving its hit
  target; verify leading and trailing icons with real labels and RTL.
- Distinguish elevation from structural boundaries. When testing a shadow-only
  edge, provide and verify a forced-colors boundary fallback.
- Inspect icons at their smallest rendered size. Account for SVG scaling before
  comparing stroke weight with adjacent text; retain the installed family's style.
- Consider a neutral inset outline for content images only when their edges need
  separation. Exclude transparent artwork and treat the effect as a preference.

**Before:** an inset panel uses the same radius as its close-fitting parent and
the corners visibly disagree. **After:** choose compatible existing radius and
spacing values, or document a component-owned exception. Compare the rendered
corners rather than assuming Tailwind radius names have fixed pixel values.

Retain our contextual press feedback, motion restraint, reduced-motion behavior,
interruptibility, and measured performance policy. Do not import exact press
scale, zero bounce, fixed blur, or automatic image outlines as universal rules.

### Make interfaces feel better: useful review presentation, little new motion

The separate
[skill](https://github.com/jakubkrehel/make-interfaces-feel-better/blob/35545ea1512ad59fa463e6b1f95ca9c052981fe6/skills/make-interfaces-feel-better/SKILL.md)
overlaps heavily with better-ui: concentric corners, optical alignment, shadows,
contextual icon changes, press feedback, restrained motion, and transition cost.
Our current animation and verification references already cover these workflows.

Borrow the compact coverage record for broader audits: typography, layout,
surfaces/icons, color, and motion; each names inspected evidence or says it was
not reviewed. Add a rejected alternative only when explaining a real tradeoff,
such as retaining the current shadow because a stronger one reduces cohesion.

Do not add mandatory quick/full modes, finding caps, rejected-candidate quotas,
or a second verdict system. Our defect/risk/preference distinction and explicit
verification labels convey more useful evidence. Keep slow playback as a
diagnostic tool and judge the result at normal speed, as our workflow already
requires.

## Proposed file changes

| Priority | Location                                            | Change                                                                                        |
| -------- | --------------------------------------------------- | --------------------------------------------------------------------------------------------- |
| 1        | `design-system/references/typography.md` (new)      | Type roles, fonts, wrapping, numeric stability, examples, and checks.                         |
| 1        | `design-system/references/layout.md` (new)          | Grouping, intrinsic sizing, responsive composition, RTL, and content recovery.                |
| 1        | `design-system/references/foundations.md`           | Remain the foundation map; add surface geometry and links to the new branches.                |
| 2        | `design-system/references/color.md` (new)           | Role misuse, actual contrast evidence, appearance/state checks, and conditional palette work. |
| 2        | `design-system/references/react-tailwind-shadcn.md` | Extend the existing icon guidance with rendered-size and stroke checks.                       |
| 2        | `design-system/SKILL.md` and README                 | Route type/layout/color work to the owning references even when no token changes.             |
| 2        | `design-engineer/references/react-tailwind.md`      | Remove the competing sample palette and map examples to existing shadcn roles.                |
| 3        | `design-engineer/references/verification.md`        | Add a compact coverage record for broad audits; reuse existing evidence and stopping rules.   |

There is a concrete integration inconsistency to repair: the engineer's
[color example](../../skills/design/design-engineer/references/react-tailwind.md#use-the-installed-color-roles)
claims to implement sample values from foundations, but foundations supplies no
such palette. Its separate `--ui-*` theme also sits awkwardly beside the
instruction to reuse installed shadcn roles. Correct that reference and example
instead of adding another palette to justify it.

Keep the main skill files short. These references are task branches, not copies
of entire upstream packages. Update reference triggers and package READMEs as
part of implementation. Keep source inspiration links in the package README
rather than the runtime guidance.

## Proposed evaluation

Compare the current and updated skills on the same small set of tasks:

1. Polish a counter and long translated labels without changing the typeface.
2. Repair a toolbar in a narrow container, with zoom and RTL cases.
3. Review muted text over translucent surfaces in supported themes; distinguish
   declared-pair calculations from rendered measurements.
4. Refine nested panel corners and an icon button while preserving focus,
   targets, forced-colors behavior, and the current design language.
5. Handle a nearby request, such as changing one error string, without starting
   an unrelated theme or animation audit.

Include an audit-only run and a run without rendering tools. Accept improvements
only when they repair the named weakness, preserve behavior and component
ownership, and report missing evidence honestly. Keep automatic selection and
rendered quality unverified until those evaluations are actually run.

Run `pnpm check` after the documentation changes. No executable helper is
proposed, so a new helper behavior test is unnecessary.

## Implementation and validation

The proposed reference branches, surface/icon guidance, reading triggers, audit
coverage record and shadcn example-role mapping are now
implemented. The recommendations above record the reviewed starting point.
No skill descriptions or invocation modes changed.

A static scenario walkthrough checked the instruction paths for a changing
counter, a translated toolbar, a translucent color pair, nested surfaces, an
ambiguous polish request, and a single error-string edit. The new references
supply bounded treatments for the visual cases; existing scoping and companion
selection keep the error-string case with ux-writer. Audit-only and unavailable
browser paths retain their reporting limits. This walkthrough checks instruction
coverage, not actual model selection or generated-interface quality.

`pnpm check`, both skill metadata validators, `pnpm dlx skills add . --list`,
and all 73 package-local links and anchors passed. Automatic invocation,
independent model execution, and rendered before/after quality remain unverified.
No executable helper was added or changed.

The implemented additions use the upstream work as inspiration rather than copied
material. License notice blocks have been removed from the design skill packages
at the user's request; source links remain.
