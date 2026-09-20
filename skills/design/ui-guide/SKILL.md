---
name: ui-guide
description: Design, build, or review web-app UI and component interactions. Use for layout, typography, color, component states, microinteractions, animation, and gestures. Excludes product-wide journey design, copy-only edits, and backend work without a visible interaction.
---

# Design interfaces and interactions

Make the interface readable at rest and usable during loading, failure, and
interruption. Preserve the established design language unless the user requests
a redesign. This skill works independently; React and Tailwind guidance applies
only when those tools are part of the task.

## Choose the scope

| Request                     | Result                                                           |
| --------------------------- | ---------------------------------------------------------------- |
| Review an interface         | Prioritized findings with evidence and proposed repairs.         |
| Build or fix a component    | Implemented changes and checks of the affected states.           |
| Make a visual adjustment    | A local change checked in its surrounding layout.                |
| Improve motion or a gesture | A concrete treatment, including interruption and reduced motion. |

Keep the work within the request. A review does not authorize implementation.
Honor a requested review checkpoint; otherwise continue work already authorized.

## 1. Inspect the interface

Identify the task, primary information or action, frequency of use, and product
character. Inspect relevant components, tokens, package versions, accessible
controls, and project instructions. For new UI, start with realistic content and
a useful component before extending the layout.

Use screenshots for visual evidence and the running app for behavior when
available. A code match locates a possible problem; it does not prove one.
Distinguish observed defects, code-supported risks, and design preferences. Ask
only when a missing fact changes the design; otherwise state the assumption.

Finish this step with the affected component or area, its relevant states, the
constraints to preserve, and the evidence available.

## 2. Choose the change

Fix hierarchy, grouping, readable type, and recognizable controls before adding
decoration. Reuse existing tokens and component patterns. Keep focus, selected,
pressed, pending, unavailable, and error states distinguishable where relevant.
Preserve content, input, and focus through changes.

Read only the references needed for the decision:

| Decision                                                           | Reference                                                       |
| ------------------------------------------------------------------ | --------------------------------------------------------------- |
| Layout, spacing, typography, color, or density                     | [visual-design.md](references/visual-design.md)                 |
| Trigger, state, feedback, async work, or repeated use              | [microinteractions.md](references/microinteractions.md)         |
| Timing, easing, springs, choreography, or reduced motion           | [motion-design.md](references/motion-design.md)                 |
| Controls, forms, overlays, tooltips, lists, or dragging            | [component-patterns.md](references/component-patterns.md)       |
| React or Tailwind implementation                                   | [react-tailwind.md](references/react-tailwind.md)               |
| Branching states, coordinated sequences, or a substantial redesign | [interaction-specs.md](references/interaction-specs.md)         |
| An audit, acceptance checks, or evaluation of a change             | [review-and-validation.md](references/review-and-validation.md) |
| Source provenance, conflicting advice, or current API requirements | [sources-and-judgment.md](references/sources-and-judgment.md)   |

For a stateful interaction, define the trigger, legal transitions, feedback,
interruption, and repeated use. Feedback must distinguish received input from a
confirmed result. Keep state correct even when animation is disabled or canceled.

If motion helps, choose its purpose, properties, origin, distance, timing, easing
or spring, exit, and reduced-motion behavior together. Give one recommended
starting treatment and a reason. Existing tokens take precedence over reference
examples. Instant changes are valid, especially for frequent actions.

Finish with a change tied to the problem and checks that would show whether it
works. For branching or async behavior, list the states, allowed transitions,
and expected feedback. Keep a narrow visual adjustment in the conversation; it
does not need a scratch file or diagram.

## 3. Implement when requested

Use the installed stack and existing components. Add tokens or dependencies only
for a concrete need. Keep input and focus immediate; a cosmetic transition must
not delay an operation or block the next action. Preserve control semantics,
alternative inputs, and recovery. Do not imply backend guarantees from visual
feedback.

Show a preview or captured states when available. Use a rendered state diagram
only when it clarifies branching or event order. For larger work, follow the
interaction-spec reference's storage and feedback conventions.

## 4. Check the result

Read the review-and-validation reference for checks appropriate to the change.
Inspect the affected states with realistic content and viewport sizes. Exercise
changed interactions at normal speed, including interruption, repeated input,
reduced motion, and relevant keyboard or touch alternatives. Use slow motion to
diagnose timing, then return to normal speed to judge it.

Report what changed, why, what was checked, and any material limitation. For an
audit, use the reference's findings format and separate defects from risks and
optional improvements. Passing a build does not establish visual quality,
accessibility, responsiveness, or performance. Name checks that were unavailable;
never report proposed checks as completed ones.
