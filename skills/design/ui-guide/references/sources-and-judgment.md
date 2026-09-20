# Sources and judgment

Use this reference when explaining a recommendation, resolving conflicting
guidance, or verifying a version-sensitive detail. It records the sources behind
the skill. The skill can be used without access to the books or the original
research material.

## Book foundations

| Source                                                | Relevant material                                                                                                                            | How it changes decisions                                                                                                                                                             |
| ----------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Dan Saffer, _Microinteractions_, 2013                 | Chapters 1–6 and testing appendix; especially triggers, rules, feedback, loops/modes, orchestration, and signature moments                   | Specify complete local behavior before adding an effect; expose useful state, keep feedback related to its cause, handle repetition, and judge interactions in context               |
| Adam Wathan and Steve Schoger, _Refactoring UI_, 2018 | Starting from scratch; hierarchy; layout/spacing; typography; color; depth; images; finishing touches                                        | Build from actual functionality, constrain visual choices, reduce competing emphasis, make spacing express relationships, use purposeful depth, and design empty/real-content states |
| Adham Dannaway, _Practical UI_, copyright 2022        | Fundamentals; simplification; color; layout/spacing; typography; forms; buttons; representative paired visual examples                       | Give design choices a rationale, preserve discoverability while simplifying, match appearance to behavior, establish usable component states, and check contrast and targets         |
| Val Head, _Designing Interface Animation_, 2016       | Classic/interactive motion principles; orientation, attention, causality, feedback, demonstration, brand; prototyping and responsible motion | Decide purpose before style, distinguish timing from easing, preserve continuity, make transitions interruptible, define coherent motion character, and evaluate a working prototype |

The original research notes identify _Practical UI_ by copyright 2022 and ISBN
978-0-6456766-0-0. Its edition number remains unverified, so do not attribute
second-edition-only material to this skill. Copywriting passages in these books
do not set the target product's writing style.

Use chapter/section names when pointing back to concepts; do not invent page numbers or quotations. Prefer paraphrases and practical decisions over excerpts. Do not include copies of book pages, illustrations, or full text in the skill.

## Public design-engineering inspiration

The original research reviewed Emil Kowalski's
[public skills collection at revision 85e8e23](https://github.com/emilkowalski/skills/tree/85e8e2363b713506e1d5b6e07a0eb2da66be1bc3),
including design engineering, animation construction, vocabulary, review, audit,
and opportunity-finding material.

Apply its guidance on immediate responses, repeated use, motion origins at the trigger, tool choice, explicit timing, interruption, and concrete before/after explanations. The unified workflow can build, diagnose, and fix directly according to user intent; it does not depend on installing or invoking that collection.

## Resolve disagreements deliberately

| Tension                                                            | Decision in this skill                                                                    |
| ------------------------------------------------------------------ | ----------------------------------------------------------------------------------------- |
| Fixed fast budgets versus context-sensitive durations              | Supply practical starting values; tune for distance, purpose, repetition, and readability |
| Never animate keyboard input versus motion for orientation         | Keep focus/input immediate; retain only motion that helps without blocking                |
| Always use custom curves versus built-in easing                    | Reuse coherent tokens; built-ins are valid when they fit                                  |
| Always animate with transform/opacity versus actual layout change  | Prefer inexpensive properties, but allow necessary measured layout animation              |
| Mandatory stagger, scale, blur, or bounce versus restraint         | Treat these as tools with costs, not signatures applied everywhere                        |
| A 12-column grid versus content-sized layout                       | Use a grid where useful; preserve appropriate intrinsic and bounded widths                |
| Strict modular scales versus practical type sizes                  | Use a small coherent role-based set suited to real content                                |
| One primary action per screen versus multiple independent tasks    | Establish hierarchy within meaningful task regions; keep equal choices equal              |
| Hide labels for minimalism or familiarity versus discoverability   | Preserve necessary labels, focus cues, and visible state                                  |
| Animated loaders that imply progress versus actual operation state | Never fabricate progress or signal completion early                                       |
| Historical accessibility advice versus present standards           | Verify the applicable standard; distinguish requirements from design targets              |

Book examples are historical examples, not proof of current product behavior. Do not repeat old claims about APCA, browser support, timing perception, or disabled controls without checking their scope. APCA can inform investigation but does not substitute for a WCAG 2.2 contrast conformance calculation. Do not treat "pure black is forbidden" or "all secondary buttons need this style" as universal rules.

## Current technical sources

For implementation details, inspect the installed stack and consult primary documentation as needed:

- [React: preserving and resetting state](https://react.dev/learn/preserving-and-resetting-state)
- [Tailwind: theme variables](https://tailwindcss.com/docs/theme), [state variants](https://tailwindcss.com/docs/hover-focus-and-other-states), [transition properties](https://tailwindcss.com/docs/transition-property)
- [Motion: transitions](https://motion.dev/docs/react-transitions), [performance](https://motion.dev/docs/performance)
- [MDN: starting style](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/@starting-style)
- [W3C: text contrast](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html), [non-text contrast](https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast.html), [target size](https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html)
- [W3C: dragging alternatives](https://www.w3.org/WAI/WCAG22/Understanding/dragging-movements.html), [animation from interactions](https://www.w3.org/WAI/WCAG22/Understanding/animation-from-interactions.html), [pause/stop/hide](https://www.w3.org/WAI/WCAG22/Understanding/pause-stop-hide.html)
- [WAI-ARIA Authoring Practices](https://www.w3.org/WAI/ARIA/apg/patterns/) for the actual component's keyboard/focus contract

Use authoritative technical sources for changing API and standards details. The skill's numerical motion examples are suggested starting values, not claimed empirical thresholds or universal accessibility requirements.
