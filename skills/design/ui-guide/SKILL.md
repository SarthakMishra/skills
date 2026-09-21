---
name: ui-guide
description: Choose and review UI design fundamentals, including layout, typography, iconography, color, surfaces, interaction feedback, and motion design. Use for visual direction, design critique, and design decisions within a larger task. Excludes component implementation, runtime debugging, product-wide journeys, and copy-only edits.
---

# Design UI fundamentals

Identify the screen, its primary information and action, and the design decision.
Fix hierarchy and understandable state before adding effects. Reuse project
components and tokens. Where the project leaves a choice open, use the reference
default. Depart for an explicit requirement, accessibility or platform constraint,
or an observed defect; name the reason and replacement.

This skill supplies design decisions. It does not own component implementation,
request orchestration, or runtime testing. Short CSS examples explain visual rules;
they are not a framework or component architecture.

## Choose a treatment

1. Inspect the surrounding screen, content, states, and existing design language.
   Distinguish what is visible from assumptions about behavior.
2. Read the references matching the decision. Combine them when the task crosses
   visual concerns; do not load every reference for a single adjustment.
3. Give one concrete treatment with values or project tokens, a before/after example,
   and a reason tied to the task.
4. Check the treatment with the design-review reference. Report evidence and
   unverified aspects without claiming that a proposal was implemented.

## Visual foundations

| Reference                                | Read for and apply                                                                                           |
| ---------------------------------------- | ------------------------------------------------------------------------------------------------------------ |
| [Layout](references/layout.md)           | Hierarchy, grouping, density, reflow, RTL, safe areas. Use shared edges and relationship-based gaps.         |
| [Typography](references/typography.md)   | Fonts, roles, wrapping, numbers, language. Keep real content readable and recoverable.                       |
| [Iconography](references/iconography.md) | Glyphs, weight, size, alignment, direction, names. Preserve a coherent icon family.                          |
| [Color](references/color.md)             | Palette variants, semantic roles, state pairs, themes, contrast. Measure actual foreground/background pairs. |
| [Surfaces](references/surfaces.md)       | Nested radii, borders, elevation, image framing. Distinguish structure from depth.                           |

## Interaction, motion, and review

| Reference                                              | Read for and apply                                                                                                                   |
| ------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------ |
| [Interaction design](references/interaction-design.md) | Control choice, visible states, feedback, recovery expectations, repeated use. Communicate what happened and what remains possible.  |
| [Motion design](references/motion-design.md)           | Purpose, duration, easing, origin, choreography, reduced motion. Specify the intended experience without choosing runtime machinery. |
| [Polish](references/polish.md)                         | A final visual consistency pass. Repair observed details without manufacturing effects.                                              |
| [Design review](references/review-and-validation.md)   | Every critique or proposed treatment. Separate observed defects, risks, and preferences.                                             |

Interaction design defines meaning and expectations; motion defines presentation.
Keep feedback understandable without animation. For a filter panel, combine the
visual references with the interaction-design example. Keep the result in the
conversation unless the user requests a durable design artifact.
