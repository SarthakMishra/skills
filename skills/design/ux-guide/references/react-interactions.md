# React interaction contracts

Read the installed versions and existing router, data, form, and component
conventions before choosing APIs. Implement the flow's transition contract with
those mechanisms. These are engineering applications of UX rules, not instructions
to install another framework, state library, or cache.

## Assign state ownership and lifetime

| State                                 | Default owner                                                       | Specify                                                      |
| ------------------------------------- | ------------------------------------------------------------------- | ------------------------------------------------------------ |
| Committed records and job status      | Server plus the existing data layer.                                | Authoritative, stale, pending, failed, and unknown meanings. |
| Shareable view or filter state        | Existing router/URL mechanism for non-sensitive reproducible views. | Refresh, sharing, history, and Back behavior.                |
| Unsaved values                        | Form/component state or an explicitly supported draft store.        | Survival across panels, steps, navigation, and reload.       |
| Focus, expansion, temporary selection | The local component or existing interaction primitive.              | Events that reset, retain, or restore it.                    |
| Reusable preferences                  | Existing persistence scoped to person, device, or workspace.        | Ownership, reset, and cross-account isolation.               |

1. Derive values from their authoritative owner instead of creating competing copies.
2. Define reset on sign-out, account/workspace switch, completion, and starting a
   different object. Do not keep one account's draft in another account's view.
3. Keep component identity stable within the same task. Reset it deliberately
   when changing objects and only under the agreed draft-lifetime contract.
4. Preserve dirty form values during background refetch. Do not store sensitive
   drafts in browser storage by default.

| Bad                                                            | Good                                                                         |
| -------------------------------------------------------------- | ---------------------------------------------------------------------------- |
| A changing key remounts the form after every request.          | Keep its identity stable while editing the same object.                      |
| Refetch replaces fields the user has already changed.          | Update authoritative records without discarding the current dirty draft.     |
| A workspace switch retains another workspace's unsaved values. | Apply the scoped reset or protected draft mechanism defined by the contract. |

See [React state preservation](https://react.dev/learn/preserving-and-resetting-state)
when implementing identity and reset behavior.

## Keep async input and results current

- Scope pending state to the affected operation. Saving one row does not freeze
  unrelated controls.
- Update controlled input immediately. Debounce network requests or defer expensive
  rendering only when needed; do not delay the visible keystroke.
- Associate each result and error with its input/request owner. Ignore obsolete
  completions even if cancellation was requested. Abort obsolete reads when the
  existing layer supports it.
- Retain prior results only when safe and label them stale. They must not appear
  to answer the latest query.

| Event                                         | Required outcome                                                      |
| --------------------------------------------- | --------------------------------------------------------------------- |
| Query changes from `ca` to `cat`.             | Input displays `cat` immediately and the new request owns the result. |
| The `cat` response finishes first.            | Commit its results as current.                                        |
| The old `ca` response or error arrives later. | It cannot overwrite the current results or status.                    |
| The current request fails.                    | Preserve input and expose supported retry for the current query.      |

## Preserve mutation correctness

- Tie each save acknowledgment to the submitted version. An old response must not
  mark newer edits saved or erase them.
- Serialize or reconcile overlapping mutations using the actual server contract.
  A disabled button alone does not guarantee exactly-once effects.
- On partial completion, preserve per-item outcomes. Do not repeat confirmed effects;
  reconcile unknown outcomes before retrying potentially duplicated work.
- Treat timeout as unknown when the mutation may have committed. A missing record
  permits retry only if the authoritative contract also rules out late completion.

A rendering transition does not establish persistence, ordering, or server rollback.
Check installed React/data-layer capabilities before selecting APIs. See
[React useTransition](https://react.dev/reference/react/useTransition).

## Use optimism only with recovery

Use optimistic UI for a low-risk action only when the system can reconcile it
reliably. Otherwise show pending until confirmation. Specify failure and repeated
input before implementing the visual change.

For a reversible saved-item toggle, show the intended selection. Combine repeated
changes into the latest requested value or process them in order according to the
server contract. An old response or rollback must not replace newer intent with
an obsolete whole-object snapshot.

| Bad                                                    | Good                                                                      |
| ------------------------------------------------------ | ------------------------------------------------------------------------- |
| Show Invitation sent as soon as the button is pressed. | Acknowledge pending immediately and show sent only after confirmation.    |
| Roll back the whole record after a failed old toggle.  | Reconcile the failed version while preserving newer user changes.         |
| A frontend demo claims durable saves and delivery.     | Label simulated behavior and identify the unimplemented backend contract. |

Wait for authoritative confirmation before claiming payments, publication,
invitations, or consequential bulk changes completed. Request acceptance and final
completion can be separate states.

## Preserve browser behavior and focus

### Navigation and dialogs

- Use links for destinations and buttons for actions. Preserve modified clicks,
  new tabs, native forms, and expected keyboard activation.
- Coordinate title, focus, and scroll with the existing router. A new page needs
  orientation; a local result refresh must not reset focus to the page top.
- Use the existing accessible dialog component. Check initial focus, keyboard
  containment, Escape or another keyboard exit, background inertness, and focus return.
- When custom modal behavior is necessary, verify the
  [WAI-ARIA dialog pattern](https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/).

### Changes within the task

- After removing a focused row, focus the equivalent control in the next row,
  then the previous row if no next row exists. For an empty list, use its remaining
  task action or a programmatically focusable heading.
- After invalid submission, expose the error summary or first invalid field
  according to the established form pattern.
- If Retry disappears when its request starts, move focus to the relevant input
  or another persistent task control before hiding it.
- Associate controls, errors, and outcomes. Announce meaningful async status once,
  not on every render. Reuse accessible primitives before custom ARIA widgets.

## Translate the flow into checks

For each changed transition, record its flow/node ID, invariant, and failure case:

| Transition           | Check                                                                  |
| -------------------- | ---------------------------------------------------------------------- |
| Search result update | Out-of-order responses cannot replace the newest query's results.      |
| Invitation recovery  | A committed invitation with a lost response is not blindly sent again. |
| Wizard backtracking  | Earlier values survive and focus returns to the current step.          |
| Panel close/reopen   | Focus returns safely and the draft follows its stated lifetime.        |
| Save acknowledgment  | Newer dirty edits remain dirty after an older save succeeds.           |

Use the project's existing checks and browser tooling. Add a focused behavioral
test for a meaningful regression risk; do not install libraries solely to conform
to this reference. Follow [validation](validation.md) for evidence and mark unavailable
browser or assistive-technology checks `Not verified`.
