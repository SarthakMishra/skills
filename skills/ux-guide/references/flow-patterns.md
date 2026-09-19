# Flow patterns and repair choices

Use the sections relevant to the current journey. Choose by task, context, frequency, and stakes.

## Choose a container that fits the job

| Need                                        | Starting point                           | Reconsider when                                             |
| ------------------------------------------- | ---------------------------------------- | ----------------------------------------------------------- |
| Substantial reading, comparison, or editing | A page with a meaningful address         | Parent context is necessary throughout the task.            |
| Inspect related detail while keeping a list | A side panel or master-detail view       | Narrow screens or extensive editing need a full page.       |
| Change a local value                        | Inline editing with a clear commit model | Dependencies or consequences need a dedicated surface.      |
| Make a short blocking decision              | A dialog                                 | It grows into a nested workflow or a substantial workspace. |
| Complete dependent decisions                | A staged flow with backtracking          | Users need to compare sections or work out of order.        |
| Choose secondary actions                    | An action menu                           | Hiding a primary or frequent action impairs discovery.      |

Do not choose a wizard solely because a form contains many fields. Determine which decisions depend on earlier ones. Avoid nested modal workflows. Preserve the context a person needs while adapting the container across viewports.

## Navigation and scope

Separate global destinations, local sections, filters, and object actions. Organize around recognizable user objects and activities, not backend services. Make active workspace, role, and affected object evident when they change the meaning of actions.

Support direct links, refresh, new tabs, and Back/Forward for meaningful destinations. Preserve the search, filter, and list-position context when opening an item and returning. Decide whether a view change should create history; each keystroke usually should not. Keep secrets and sensitive drafts out of URLs.

**Bad:** opening a result and returning resets filters and scroll position. **Better:** restore the previous context and handle removed results sensibly.

## Forms and review

Ask for information needed now; defer optional details. Use authoritative known values as editable defaults when appropriate and distinguish guesses. Keep dependencies near their cause. Do not require users to translate between the app's internal schema and their task.

Accept harmless input variation such as spacing where meaning is preserved. Clarify ambiguous units, dates, amounts, and identities. Choose validation timing by when a person can act: avoid errors on unfinished typing, then give prompt correction after an invalid attempt. Associate errors with fields and preserve valid values after failure. A disabled action needs an available reason or route to unblock it.

Use explicit submission for a coherent commitment. Use autosave when individual changes can safely persist; define unsaved, saving, saved, and failed states. Distinguish draft persistence from externally visible changes. Review should expose significant assumptions, scope, and consequences, and let people return to edit without losing their work.

**Bad:** failure clears a long form. **Better:** retain values, locate the relevant error, and retry the intended operation.

## First use, empty states, and return

Distinguish no data, no matches, no permission, failed loading, and completed work. Offer the action that fits the actual state: create/import, adjust filters, request access, retry, or leave with confidence. Do not show an empty state while data is still loading.

Teach through a useful first task. Defer optional setup until its benefit is visible. Make sample data identifiable and removable. Allow optional instruction to be skipped and revisited. For re-entry, show where work stands and what remains; avoid replaying onboarding to returning users.

**Bad:** require invitations, profile setup, and a tour before the first result. **Better:** let the person complete a small real task, then introduce relevant enhancements.

## Search, lists, and bulk actions

Keep query scope, active filters, result state, and selection inspectable. Preserve input during loading and failure. Avoid unexplained reordering while someone is reading or selecting. Prefer stable pagination or load-more for bounded work where position and completion matter; use infinite scrolling only when it serves exploration.

Distinguish visible rows, selected rows, and all matching results. Make expansion of selection explicit. Define selection lifetime across pages, filters, and refresh. Show per-item outcomes for partial completion and retry unresolved items without repeating completed side effects.

**Bad:** “Select all” silently changes twenty visible rows into thousands of matches. **Better:** make the scope expansion a deliberate choice and retain the affected count through commitment.

## Feedback and long-running work

Give acknowledgment at the action and expose the meaningful result near the changed object. Keep important errors and recovery available; a disappearing toast is insufficient for consequential failure. Use blocking feedback when a decision truly requires interruption.

Distinguish initial load, background refresh, and mutation. Preserve usable content during refresh when safe, showing staleness when it affects decisions. Use measured progress when available and indeterminate status otherwise. Acknowledged input is not a completed transaction.

For long jobs, specify whether users can leave, inspect status later, cancel, or retry. Canceling a client request does not necessarily cancel server work. A timeout may leave an unknown outcome; reconcile before retrying a consequential action.

## Destruction, settings, and permissions

Prefer genuine undo for ordinary reversible mistakes. For irreversible or broad changes, review the actual object, affected scope, and consequence before commitment. Do not require typed confirmation for every routine deletion. Verify that undo is durable enough to support its promise.

Distinguish personal preferences from workspace-wide settings. Preview broad effects where feasible. On permission changes, preserve eligible work and provide a real next action without exposing restricted data. Map handoffs to another person or external service through to the user's final outcome, not just the frontend's success response.

## Responsive and accessible completion

Keep the same job achievable across viewport sizes and input methods. Avoid hover-only actions, drag-only interaction, color-only state, and hidden controls needed for completion. Provide semantic controls and operable alternatives. Keep inputs, errors, and focused elements clear of sticky controls and onscreen keyboards.

**Bad:** dragging is the only way to reorder tasks. **Better:** add an accessible move action that changes the same underlying order.

Verify logical reading and focus order, sufficient target acquisition, zoom/reflow, and recovery after interruption. Do not reduce accessibility to checking the opening screen or the existence of ARIA attributes.
