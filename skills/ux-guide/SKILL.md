---
name: ux-guide
description: Design, diagnose, and fix web-app user flows, especially React frontends. Use for confusing navigation, difficult forms, broken journeys, poor onboarding, uncertain feedback, lost work, and weak activation or return experiences; also use when designing new app flows or auditing an app's UX. Map current and proposed flows in Mermaid and translate findings into implemented, verified behavior. Excludes purely visual polish, animation tuning, isolated copy edits, and backend work without user-facing behavior.
---

# Web App UX

Make products understandable, forgiving, engaging, and satisfying to use. Treat UX as the complete journey from a person's need to a meaningful outcome, including interruptions, recovery, and returning later. Fix the reason a flow fails, then make the result work in the actual app.

Own information architecture, task structure, interaction choices, state transitions, feedback, recovery, and reasons to return. Preserve established visual conventions and terminology. Describe what users must perceive and understand without prescribing a new style system, animation treatment, or writing style. This skill is standalone and requires no other skill or external service.

## Choose the depth

- **Find and fix a bad flow:** reconstruct current behavior, locate the breakdown, compare a proposed flow, implement when requested, and verify the same task again.
- **Design a new flow:** establish the job and constraints, connect the proposal to the surrounding app, specify transitions, and implement when requested.
- **Audit the whole app:** inventory journeys and their connections before prioritizing individual fixes. Cover discovery, first value, core recurring work, recovery, account/settings, and exit where they exist. Include different roles and external entry points.
- **A narrow repair:** inspect the affected journey and immediate neighbors. Reuse an existing app map; do not turn a local fix into an unsolicited whole-app redesign.

Read [flow-mapping.md](references/flow-mapping.md) for the transient document and Mermaid format. Read [diagnose-and-fix.md](references/diagnose-and-fix.md) for reviews and repairs. Load other references only for the decisions in play:

| Need                                                            | Reference                                                   |
| --------------------------------------------------------------- | ----------------------------------------------------------- |
| Choose a principle or resolve a design tradeoff                 | [decision-principles.md](references/decision-principles.md) |
| Choose navigation, form, list, dialog, or recovery behavior     | [flow-patterns.md](references/flow-patterns.md)             |
| Implement state, navigation, focus, and async behavior in React | [react-interactions.md](references/react-interactions.md)   |
| Improve first value, engagement, or repeat use                  | [engagement.md](references/engagement.md)                   |
| Plan task-based checks or interpret evidence                    | [validation.md](references/validation.md)                   |

## 1. Establish the job and evidence

Read relevant project instructions, existing domain vocabulary, architectural decisions, routes, components, and requirements. Inspect available screens and actual behavior. Use the project task runner and installed stack. Respect scope and existing work.

Establish who is acting, what outcome they seek, their entry point, usage frequency, context and input methods, permissions, and the cost of an error. Distinguish the user's desired outcome from the feature the team built. Record real constraints, assumptions, and unknowns briefly.

Label evidence as **observed**, **code-supported**, **reported**, or **inferred**. Screenshots cannot establish behavior, code cannot prove task comprehension, and an agent walkthrough is not participant research. Do not invent usage data, personas, backend capabilities, or business rules. Ask only when missing information materially changes the proposed flow; otherwise state reasonable assumptions and proceed.

## 2. Map before changing the journey

For an app-wide audit, build a whole-app journey index and overview, then separate diagrams for detailed flows. For a feature, map its entry, exit, and affected neighbors. Use stable flow and node identifiers across diagrams, findings, transitions, and checks.

Keep current and proposed behavior distinct. Include meaningful branches, commitment boundaries, waiting, failure, recovery, and re-entry. Mark uninspected areas instead of inventing completeness. Save temporary working maps under the project's established scratch convention, defaulting to `.scratch/<effort-slug>/ux/`, as specified in the mapping reference.

Render the relevant Mermaid diagrams in the conversation. A path to a Markdown file alone is not the feedback step. Explain the behavioral changes and name the unresolved decisions that would change implementation. Let the user correct the map. If the requested outcome and implementation are already authorized and unambiguous, share the map and continue; do not manufacture an approval gate. When the user explicitly requests map review first, stop after producing a concrete proposal and ask the specific feedback question.

## 3. Diagnose the cause

Find the first point where the person cannot identify the next action, predict its effect, execute it, interpret feedback, or judge completion. Check later symptoms against that first breakdown.

Use the diagnosis reference to connect evidence → user difficulty → likely cause → smallest effective change → verification. Prioritize blocked or incorrect outcomes, lost work, and consequential mistakes ahead of optional refinements. Do not substitute a list of named UX laws, cosmetic suggestions, or extra help text for a diagnosis.

## 4. Design a better path

Remove unnecessary decisions, repeated entry, hidden dependencies, and avoidable context switching. Optimize comprehensible effort rather than a fixed click count. Keep comparison information together; disclose advanced options progressively without hiding essentials or consequences.

For each consequential action, specify the trigger, affected object/scope, state change, perceivable feedback, permitted next actions, preserved work, recovery, and focus destination. Distinguish draft, saved, submitted, accepted, and completed where they differ. Do not promise undo, autosave, cancellation, or retry semantics the system cannot support.

Look for a useful source of enjoyment: direct manipulation, meaningful previews, growing competence, helpful discovery, reusable personal setup, or a satisfying finish. Match engagement to the user's actual need and natural cadence. Reliable task completion is often the strongest reason to return.

## 5. Implement the behavior

When implementation is requested, make the scoped changes. Use the React reference for React work. Preserve the existing router, data layer, primitives, and form conventions unless there is a concrete reason to change them. Add dependencies only when justified by the task.

Carry node and transition decisions into behavior and acceptance checks; the map is a working contract, not decoration. Keep keyboard, touch, assistive technology, narrow viewports, and interrupted sessions able to complete the same job. Coordinate client feedback with the real server contract; clearly separate implemented behavior from backend work still required.

Update the maps when implementation reveals a changed assumption. Do not let the diagram describe a better product than the one built.

## 6. Verify and close the loop

Re-run the task that exposed the problem, plus the relevant failure, backtracking, or interruption path. Use meaningful behavioral tests or browser checks proportional to risk. Apply the validation reference to uncertain design choices. A heuristic recommendation remains a hypothesis until the appropriate evidence supports it.

Report the outcome, important changes, evidence of verification, and remaining limitations. For an audit, give prioritized findings with actionable fixes. For a design, give the proposed flow and open decisions. For a completed repair, report implemented and verified behavior without implying untested paths passed.

Keep scratch maps transient: retain them during active work, link rather than duplicate existing specs, and promote decisions to established durable records only when requested or already required by the project. Never silently delete someone else's notes or create external tickets as a side effect of UX work.
