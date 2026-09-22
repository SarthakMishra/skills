# Flow patterns and repair choices

Choose the pattern for the user's job, then specify its exceptions and recovery.
Use the project's working convention when it meets the same requirements. If it
does not, name the observed failure and the replacement.

## Choose the container

### Reading, editing, and local detail

| Need                                        | Default                                   | Change the pattern when                                      |
| ------------------------------------------- | ----------------------------------------- | ------------------------------------------------------------ |
| Substantial reading, comparison, or editing | A page with a meaningful address.         | Parent context must stay available throughout the task.      |
| Inspect related detail beside a list        | A side panel or master-detail view.       | The narrow layout or editing workload needs a full page.     |
| Change one local value                      | Inline editing with a clear commit model. | Dependencies or consequences need a separate review context. |

### Decisions and secondary actions

| Need                                              | Default                                       | Change the pattern when                                                              |
| ------------------------------------------------- | --------------------------------------------- | ------------------------------------------------------------------------------------ |
| Make a short blocking decision                    | A dialog.                                     | It grows into substantial work; use a page or panel instead of nested dialogs.       |
| Complete decisions that depend on earlier answers | Stages with backtracking and retained values. | Users need to compare or edit sections out of order; use a single reviewable layout. |
| Choose secondary actions                          | An action menu.                               | The action is primary or frequent enough that hiding it impairs discovery.           |

A large field count alone does not justify a wizard. Identify the dependencies
before splitting the task. Preserve necessary context when adapting the container
across viewport sizes.

## Navigation and scope

- Separate global destinations, local sections, filters, and object actions.
  Organize them around recognizable user objects and activities, not backend services.
- Show the active workspace, role, and affected object where they change an action's
  meaning. Keep personal and workspace-wide settings distinct.
- Give meaningful destinations direct links and support refresh, new tabs, and
  Back/Forward. Preserve query, filters, and list position when opening an item
  and returning.
- Use the established history convention. Without one, add a history entry for
  committed navigation and replace transient live-filter updates rather than adding
  an entry for every keystroke. Keep secrets and sensitive drafts out of URLs.

If an item disappears while its detail is open, return to the preserved list
context and explain that it is unavailable. Do not send the person to an unrelated
home screen or silently clear their search.

| Bad                                                       | Good                                                               |
| --------------------------------------------------------- | ------------------------------------------------------------------ |
| A row action changes the whole workspace without warning. | Identify the affected workspace and scope before commitment.       |
| Back from a result loses filters and selection context.   | Restore the prior view according to its stated selection lifetime. |

## Forms and commitment

### Collect and validate what is needed

1. Ask for the information required for the current outcome. Defer optional details.
2. Use authoritative known values as editable defaults; mark uncertain suggestions.
   Keep dependencies beside their cause instead of exposing internal schema details.
3. Normalize harmless variation, such as spacing that does not change meaning.
   Ask about ambiguous dates, units, amounts, or identities rather than guessing.
4. Follow existing validation timing. Without one, validate on submit, then update
   invalid fields during correction. Do not reject unfinished typing on its first
   keystroke.
5. Preserve valid and entered values after failure. Associate errors with fields,
   expose a route to fix them, and explain why an action is unavailable.

### Distinguish saving from committing

Use explicit submission for a coherent commitment. Use autosave only when individual
changes can safely persist and the system supports that contract. Make unsaved,
saving, saved, and failed states visible; keep unknown outcomes distinct from failure.

Separate a persisted draft from externally visible publication, delivery, or
acceptance. Before a consequential commitment, show significant assumptions, the
affected scope, and consequences. Let the person return to edit without losing work.

| Bad                                                         | Good                                                                           |
| ----------------------------------------------------------- | ------------------------------------------------------------------------------ |
| Failed submission resets the form.                          | Retain values, identify the error, and allow the intended correction.          |
| Autosave is labeled Published.                              | Name the actual persisted state and keep publication as a distinct commitment. |
| A generic confirmation hides which records will be deleted. | Show the actual object, count, and irreversible consequence.                   |

## First use, empty states, and return

| Actual state   | Show                                                                    |
| -------------- | ----------------------------------------------------------------------- |
| No data yet    | A useful create/import action and enough context to begin.              |
| No matches     | The current query/filters and a way to change or clear them.            |
| No permission  | What is unavailable and a legitimate request-access or return path.     |
| Load failed    | An error and supported retry or recovery.                               |
| Work completed | The result and permission to stop; only relevant optional next actions. |

Keep loading distinct from empty. Teach through a useful first task. Sample data
must be identifiable and removable; optional instruction must be skippable and
revisitable. Defer invitations, profile setup, or a tour unless they are necessary
for that first outcome.

On return, show where work stands and what remains. Do not replay onboarding or
erase unfinished context. Use [engagement](engagement.md) for cadence and first-value
decisions.

## Search, lists, and selection

### Preserve orientation

- Keep query scope, active filters, result state, and selection visible or inspectable.
  Preserve input during loading and failure.
- Do not reorder results without explanation while the person reads or selects.
- Default to stable pagination or Load more for bounded work where position and
  completion matter. Use infinite scrolling for an explicitly open-ended browsing task.
- Label retained results as stale when they could otherwise be mistaken for the
  current query. Do not present a previous result set as a new answer.

### Make bulk scope explicit

Distinguish visible rows, selected rows, and all matching results. Define whether
selection persists across pages, filter changes, and refresh. Show the affected
count through commitment.

Bad: Select all expands 20 visible rows into thousands of matches silently.

Good: select the visible rows first, then offer an explicit action to include all
matching results with the new count.

Show per-item outcomes after partial completion. Never repeat confirmed successes.
Retry known failed or non-committed items only when the operation contract makes
that retry safe. Reconcile unknown outcomes first; "unresolved" does not mean safe
to send again.

## Feedback and long-running work

Acknowledge the action where it happened and show the meaningful result near the
changed object. Keep consequential errors and recovery available after a toast
disappears. Use blocking feedback only when the person must make a decision before
continuing safely.

| Operation           | Expected feedback                                                              |
| ------------------- | ------------------------------------------------------------------------------ |
| Initial load        | Explain pending work without implying that empty data was returned.            |
| Background refresh  | Preserve usable content when safe and expose staleness that affects decisions. |
| Mutation            | Distinguish accepted, processing, completed, failed, and unknown outcomes.     |
| Measurable long job | Show measured progress; otherwise use an indeterminate status.                 |

For a long job, explicitly define whether the person can leave and inspect status
later, what cancellation actually stops, and when retry is safe. Aborting a client
request does not prove that server work stopped. A lost response can leave an unknown
outcome; do not infer failure from a timeout.

## Destruction and permissions

- Prefer supported undo or correction for ordinary reversible mistakes. Verify that
  its lifetime is long enough to support the promise.
- For irreversible or broad changes, review the actual object, scope, timing, and
  consequence. Do not require typed confirmation for every routine deletion.
- Preview broad setting effects when the system can calculate them reliably. Mark
  unsupported previews as a dependency, not implemented behavior.
- On permission changes, preserve eligible work without exposing restricted data.
  Provide a real next action and trace handoffs to the person's final outcome.

## Accessible completion

Keep the same job achievable across viewport sizes and input methods. Provide
alternatives to hover-only and drag-only actions, recognizable semantic controls,
and non-color state cues. Keep inputs, errors, and focused elements clear of sticky
controls and on-screen keyboards.

Bad: dragging is the only way to reorder a task.

Good: provide move actions that change the same order and can be used with a keyboard
or single pointer.

Check logical reading/focus order, target operability, zoom/reflow, and interruption
recovery across the journey. ARIA attributes or an accessible opening screen alone
do not prove accessible completion. Use [validation](validation.md) for the checks.

## Finish

Done means the chosen pattern names the job, default, exception, recovery limit,
and acceptance check. Record why the project's existing pattern was retained or
why the replacement is necessary.
