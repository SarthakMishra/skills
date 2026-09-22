# Document current and proposed flows

Use a textual use case as the canonical flow document. It should make the
person's goal, the normal path, the recovery paths, and the observable result
clear without requiring a diagram. Keep the observed baseline separate from the
proposed change. Use stable IDs so findings, implementation, and checks refer
to the same flow step or transition.

The core format is:

- Intent: who is acting, what they want, where they start, and what counts as
  completion.
- Main flow: one linear Main Success Scenario.
- Extensions: branches attached to a numbered main-flow step.
- States and transitions: an optional table for state-heavy interactions.
- Rules: cross-path guarantees and constraints.
- Scenarios: Given/When/Then examples for important behavior.

Treat Mermaid or another diagram as a derived view. Do not make a diagram a
second source of truth.

## Choose the map size

| Task                                     | Output                                                                               |
| ---------------------------------------- | ------------------------------------------------------------------------------------ |
| A trivial linear action                  | Intent and a short Main flow in the conversation.                                    |
| A changed branch or multi-screen journey | One flow document with current/proposed use cases, Extensions, and recovery details. |
| A state-heavy interaction                | The use-case format plus a focused States and transitions table.                     |
| A whole-app audit                        | An overview of journeys and detailed flow documents for the consequential paths.     |

Add only the sections that expose a real decision. Do not add a state table to
repeat a linear flow or a scenario for every numbered step.

## Storage and lifetime

1. Read project instructions and existing scratch notes. Reuse the current
   effort, domain terms, and IDs instead of starting a second set of artifacts.
2. For working files, default to `.scratch/<effort-slug>/ux/` in the application
   repo.
3. Put the journey inventory, overview, coverage, and flow links in
   `overview.md`. Put a journey's current/proposed use cases and checks in
   `flows/<flow-id>-<slug>.md`.
4. Use the existing feature slug. For a whole-app audit without an effort folder,
   use `ux-audit`. Without a repo, use the session's temporary workspace and state
   what the map covers.

A narrow task does not need an overview file. Create only the artifacts needed
for its agreed scope.

### Preserve adjacent specs and tickets

- Keep UX flow documents separate from existing `.scratch/<feature>/spec.md`,
  `map.md`, and `issues/<NN>-<slug>.md`.
- Link to canonical specs and tickets. Do not overwrite them, duplicate their
  content, reset IDs, or treat a flow document as an implementation ticket.
- Create tickets only when explicitly requested and use the project's tracker
  conventions. Existing local Markdown tickets retain their numbering and status vocabulary.

### Preserve transient work

- Follow existing ignore rules without silently editing `.gitignore` or requiring
  a setup skill. Exclude transient flow documents from product commits by default.
- Do not assume everything under `.scratch/` is disposable. It may contain tickets.
- Retain active documents through the work or handoff. Remove only this task's
  transient files when cleanup is requested or established convention requires it.
- Do not automatically publish, archive, or commit scratch notes.

## Whole-app inventory

Inventory routes and visible navigation, then group them by the jobs people
complete. Include direct links, notifications, invitations, role gates,
returning sessions, and external handoffs supported by the app. Record how
journeys connect with links and flow IDs.

| Flow ID / name       | Person and job                     | Entry and return points                      | Completion and connections                  | Evidence / coverage                                                 |
| -------------------- | ---------------------------------- | -------------------------------------------- | ------------------------------------------- | ------------------------------------------------------------------- |
| F01: Workspace setup | Owner prepares a usable workspace. | First sign-in or return to unfinished setup. | Workspace ready; continue to the core task. | Label observed, code-supported, reported, inferred, or uninspected. |

A route list alone is not a journey inventory. Include role gates and re-entry.
Split large overviews by activity or role, keeping an index of every agreed
area. Name uninspected areas and access limits. Do not claim an app-wide audit
from one happy-path walkthrough.

## Use-case conventions

### Write the intent first

Use these fields when they affect the flow:

```markdown
## Intent

**Primary actor:** ...
**Permissions:** ...
**Goal:** ...
**Entry:** ...
**Commitment:** ...
**Success:** ...
```

`Commitment` names the point where the action can create a durable or external
effect. If the system cannot establish that the effect happened, document the
outcome as unknown rather than failed.

### Keep the Main flow linear

The Main flow is the Main Success Scenario. Write the default successful path
as one sequence. Give each step one observable action or result. Keep branches,
validation failures, timeouts, and cancellations out of it.

Use stable main-step IDs such as `M01` and `M02`. Preserve an ID when the step
still represents the same user-visible concept. Do not renumber unrelated steps
just because a later step was added.

```markdown
## Main flow

M01. [User] Selects "New invoice".
M02. [System] Opens an empty invoice.
M03. [User] Selects a customer.
M04. [System] Shows the customer's billing details and tax identifier.
M05. [User] Adds an item.
M06. [System] Recalculates the totals.
M07. [User] Selects "Save draft".
M08. [System] Shows the saved draft.
```

### Attach Extensions to the first divergence

An Extension describes one branch from a numbered step. Use Cockburn's `3a`,
`3b`, and `4a` notation. State the source step in the heading, then number
branch steps with the extension label. End with a resume point, a linked flow,
or an explicit terminal outcome.

```markdown
## Extensions

### 3a. Customer does not exist (from M03)

3a.1. [User] Chooses "Add customer".
3a.2. -> [Flow: Create customer](./create-customer.md).
3a.3. [System] Selects the newly created customer.
3a.4. Resume at M05.

### 5a. Line item is invalid (from M05)

5a.1. [System] Keeps the entered values and marks the invalid field.
5a.2. [System] Explains how to correct the problem.
5a.3. [User] Corrects the field.
5a.4. Resume at M06.

### 7a. User cancels (from M07)

7a.1. [System] Asks whether to discard unsaved changes.
7a.2. [User] Confirms discard.
7a.3. [System] Returns to the invoice list.
7a.4. End: abandoned.
```

Attach the branch where the path first diverges. If an extension branches again,
attach the next Extension to that extension step and write its source explicitly,
such as `6b. ... (from 6a.3)`. Use a nested label such as `3a.2a` only when the
branch remains short. Link a separate flow when nested branches become hard to read.

Use these terminal labels consistently:

- `End: success`: the goal is complete.
- `End: abandoned`: the person intentionally leaves without completing it.
- `End: failure`: the system cannot complete the goal and offers no supported recovery.
- `End: unresolved`: the result is not authoritative yet and needs reconciliation.

### Tag actors and describe observable behavior

Use an actor tag on each action or system result:

| Tag          | Use                                                                             |
| ------------ | ------------------------------------------------------------------------------- |
| `[User]`     | A direct action, choice, or input by the person.                                |
| `[System]`   | A visible product response, status, validation result, or navigation change.    |
| `[External]` | An external person or service whose result changes what the person can observe. |
| `[Auto]`     | Automatic product behavior where the timing or trigger matters.                 |

Use `-> [Flow: ...]` for a handoff to another use case. Describe what the person
can see, do, or verify. Do not write internal storage or implementation steps as
flow behavior.

| Bad                                             | Good                                                                |
| ----------------------------------------------- | ------------------------------------------------------------------- |
| `[System] inserts the invoice into PostgreSQL.` | `[System] shows the saved draft and its current status.`            |
| `M04. If valid, save. Otherwise, show errors.`  | `M04. [System] shows the validation result.` Then add an Extension. |
| `Retry is available after a timeout.`           | `Status is reconciled before retry can create another effect.`      |

The good form is accepted when a reader can tell what the person sees and what
the system guarantees without knowing the implementation.

### Add states only when they change behavior

Use a state table for an upload, dialog, editor, asynchronous operation,
authentication flow, autosave, or other interaction where the same event can
have different results depending on the current state. Keep state names
observable or contractually meaningful. Include unknown and recoverable failure
states when they affect what the person may safely do.

```markdown
## States and transitions

| ID  | Current state | Event       | Guard                | Next state | User sees / can do                 | Work / focus                 |
| --- | ------------- | ----------- | -------------------- | ---------- | ---------------------------------- | ---------------------------- |
| T01 | Empty         | Select file | Valid type and size  | Uploading  | Progress and cancel                | Keep the selected file       |
| T02 | Empty         | Select file | Invalid type or size | Empty      | File error and correction guidance | Keep focus on the file input |
| T03 | Uploading     | Upload ends | Server confirms save | Ready      | Preview and next action            | Preserve preview focus       |
| T04 | Uploading     | Upload ends | Server rejects       | Failed     | Error and safe retry               | Preserve the file choice     |
| T05 | Failed        | Retry       | Retry is safe        | Uploading  | Progress                           | Keep the retry context       |
```

Each row is a transition, not a code event log. Add the effect, preserved work,
focus destination, and recovery limit when they affect the experience. A state
table supplements the use case. It does not replace the actor, goal, entry, or
success contract.

### Use Rules and Scenarios for cross-path behavior

Use short `R##` rules for guarantees that apply in several paths. Use a named
`SC##` Given/When/Then scenario for an important example or acceptance check.
Keep the result observable. Do not rewrite the whole flow as a sequence of
scenarios.

```markdown
## Rules

R01. The system does not claim a consequential action completed before authoritative confirmation.
R02. Validation failure preserves entered values unless the product explicitly says otherwise.

## Scenarios

### SC01. Preserve entered data after validation

Given the user has entered three invoice items
And the tax identifier is invalid
When the user attempts to save the invoice
Then the invoice is not saved
And the tax identifier field shows an error
And all three invoice items remain unchanged.
```

Use a scenario when the rule is easy to misunderstand, carries meaningful risk,
or needs a named verification check. Write implementation details in code or a
technical contract, not in `Then`.

## Per-flow document format

Use the template below for a working flow document. Fill actual scope and
evidence. Omit a section only when it does not apply. The current flow records
the baseline. The proposed flow records the selected change.

```markdown
# F02: Invite a teammate

Status: proposed
Revision: 1
Scope: workspace member invitation
Evidence: code-supported; browser walkthrough pending
Basis: inspected revision or date, relevant routes/components
Related: [Workspace setup](../overview.md), [Existing spec](../../spec.md)

## Intent

**Primary actor:** Workspace owner
**Permissions:** Can invite members to this workspace
**Goal:** Invite a person to join the workspace
**Entry:** The owner opens Workspace members
**Commitment:** Selecting Send can create an invitation request
**Success:** The invitation is confirmed and appears as pending

## Current flow

### Main flow

M01. [User] Opens Workspace members.
M02. [System] Shows the member list and Invite action.
M03. [User] Selects Invite.
M04. [System] Opens the recipient form.
M05. [User] Enters a valid recipient and selects Send.
M06. [System] Shows Sending.
M07. [System] Shows the invitation as pending after confirmation.

### Extensions

#### 6a. Request times out (from M06)

6a.1. [System] Shows a generic error and Retry.
6a.2. [User] Selects Retry.
6a.3. Resume at M05.

## Proposed flow

### Main flow

M01. [User] Opens Workspace members.
M02. [System] Shows the member list and Invite action.
M03. [User] Selects Invite.
M04. [System] Opens the recipient form.
M05. [User] Enters a valid recipient and selects Send.
M06. [System] Shows Sending.
M07. [System] Shows the invitation as pending after confirmation.

### Extensions

#### 6a. Request times out (from M06)

6a.1. [System] Shows Outcome unknown and Check status.
6a.2. [User] Selects Check status.
6a.3. [System] Shows that it is checking the invitation status.

#### 6b. Invitation exists after status check (from 6a.3)

6b.1. [System] Shows the pending invitation.
6b.2. Resume at M07.

#### 6c. No invitation and late completion is ruled out (from 6a.3)

6c.1. [System] Explains that no invitation was sent.
6c.2. Resume at M05.

#### 6d. Status remains unavailable (from 6a.3)

6d.1. [System] Explains that the outcome is still unresolved.
6d.2. End: unresolved.

## Findings

| ID / step   | Evidence and user difficulty               | Cause                             | Change                           | Priority |
| ----------- | ------------------------------------------ | --------------------------------- | -------------------------------- | -------- |
| UX-01 / M06 | Timeout offers resend with no status check | Unknown result treated as failure | Reconcile before allowing resend | High     |

## States and transitions

| ID  | Current state   | Event         | Guard                                    | Next state      | User sees / can do       | Work / focus         |
| --- | --------------- | ------------- | ---------------------------------------- | --------------- | ------------------------ | -------------------- |
| T01 | Sending         | Response lost | Status lookup available                  | Checking status | Check status             | Preserve recipient   |
| T02 | Checking status | Lookup ends   | Invitation exists                        | Pending         | Invitation pending       | Keep context         |
| T03 | Checking status | Lookup ends   | Non-commit and late completion ruled out | Recipient form  | Safe retry               | Preserve recipient   |
| T04 | Checking status | Lookup ends   | Result unavailable                       | Outcome unknown | Explain unresolved state | Keep recovery action |

## Rules

R01. Invitation sent does not imply that the recipient joined the workspace.
R02. A missing record alone does not make retry safe.

## Scenarios

### SC01. Recover a lost response without a duplicate invitation

Given the invitation request committed but its response was lost
When the owner checks the invitation status
Then the existing invitation is shown
And the owner is not asked to send another invitation.

## Decisions and feedback

D01: Status lookup is required for safe retry. Backend support is unverified.
Open: Identify the available invitation-status contract before implementation.
Feedback: No user feedback received yet.

## Acceptance and verification

- Given an invitation succeeded but the response was lost, status recovery finds
  that invitation without sending another.
- Invitation sent does not imply recipient joined the workspace.
- Status: not exercised. Record actual result and evidence after verification.
```

The example isolates one failure branch. A real invitation flow also needs its
validation, permission, cancellation, and return paths. Record backend dependencies.

### Use status labels precisely

| Status        | Evidence required                                           |
| ------------- | ----------------------------------------------------------- |
| `current`     | The recorded baseline and its stated evidence source.       |
| `proposed`    | A future treatment; no claim of approval or implementation. |
| `agreed`      | Actual user feedback or a cited existing decision.          |
| `implemented` | The change exists in code; runtime checks may remain.       |
| `verified`    | Named scenarios were exercised and their results recorded.  |

Silence is not agreement. Preserve the baseline and distinguish an implemented
proposal from an exercised result. Verification covers only the listed scenarios.

## Optional derived views

Use a Mermaid, ASCII, or other diagram only when topology is harder to scan in
the text. Put it after the textual flow under a `Derived view` heading. Keep it
small, label it as derived, and update or remove it when it disagrees with the
use case. Never add a diagram to make a trivial flow look complete.

## Feedback and implementation loop

1. Show the current textual flow and evidence limits, then the proposed flow and
   the decisions that matter. For a large audit, start with the overview.
2. Add a derived view only when it helps a reader understand connections between
   flows or branches. Ask only about unresolved product choices that change behavior.
3. Record actual feedback against the relevant step, transition, or decision.
   Honor a requested checkpoint. When orchestrated, inherit the agreed scope,
   approach, and readiness.
4. If implementation is authorized, connect each repair to its step or transition
   ID and acceptance check. Record deviations and backend dependencies as they appear.
5. Reconcile the use case with implemented behavior. Mark checks verified only
   after exercising them, and report unresolved paths. Reuse these artifacts when resuming.

Done means the textual flow, stable IDs, evidence status, and acceptance checks
agree. Any derived diagram remains secondary to the text.

A design or audit handoff can finish with a proposed flow and evidence limits. A
requested repair is not complete merely because the document is finished.
