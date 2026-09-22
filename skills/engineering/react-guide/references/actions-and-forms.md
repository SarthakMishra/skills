# Actions and forms

Read this reference for a form submission, an async UI mutation, or an
optimistic update. Actions are async functions used by a transition or by a
function-valued `action` or `formAction` prop.

## Use form Actions for submissions

```tsx
import { useActionState } from "react";
import { useFormStatus } from "react-dom";

type FormState = { error: string } | null;

async function saveName(_previousState: FormState, formData: FormData): Promise<FormState> {
  const value = formData.get("name");
  if (typeof value !== "string" || value.trim() === "") {
    return { error: "Enter a name." };
  }

  await saveNameToServer(value);
  return null;
}

function NameForm() {
  const [state, formAction, isPending] = useActionState(saveName, null);

  return (
    <form action={formAction}>
      <label>
        Name
        <input name="name" disabled={isPending} />
      </label>
      <SubmitButton />
      {state?.error && <p role="alert">{state.error}</p>}
    </form>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button type="submit" disabled={pending}>
      {pending ? "Saving..." : "Save"}
    </button>
  );
}
```

This example is conceptual. It assumes an application-defined
`saveNameToServer` function and does not provide server authentication or
domain validation.

## Rules

- `useActionState(action, initialState, permalink?)` returns
  `[state, dispatchAction, isPending]`. The action receives the previous
  state before its payload.
- A `dispatchAction` call must run inside an Action, such as a function-valued
  form prop or `startTransition`. A direct event-handler call is not enough.
- `useFormStatus` must run in a component rendered inside the tracked form.
  Its status includes `pending`, `data`, `method`, and `action`.
- React resets uncontrolled form controls after a successful form Action.
  Controlled inputs still need their own state reset when that is intended.
- Return expected validation or domain errors from `useActionState`. Let
  unexpected failures reach the nearest Error Boundary when that is the
  application's recovery path.
- Keep controlled inputs when the UI needs their value on every render. Use
  uncontrolled inputs and `FormData` when the Action can read the value at
  submission time.
- Treat `FormData` as untrusted input. Check type, presence, length, and
  authorization before calling a server or persistence layer.

## Add optimistic UI only for a real mutation

```tsx
import { useOptimistic } from "react";

function RenameForm({
  currentName,
  rename,
}: {
  currentName: string;
  rename: (name: string) => Promise<void>;
}) {
  const [optimisticName, setOptimisticName] = useOptimistic(currentName);

  async function action(formData: FormData) {
    const value = formData.get("name");
    if (typeof value !== "string" || value.trim() === "") return;
    setOptimisticName(value);
    await rename(value);
  }

  return (
    <form action={action}>
      <p>Current name: {optimisticName}</p>
      <input name="name" defaultValue={currentName} />
      <button type="submit">Rename</button>
    </form>
  );
}
```

React shows the optimistic value while the Action is pending and returns to
the base value when the Action finishes. The real mutation must update the
source of truth so the next render keeps the successful value.

## Good and bad

**Bad.** Keep separate `isPending`, `error`, and optimistic state flags
around a form submission.

**Good.** Put the submission in a form Action, use `useActionState` for the
result and pending state, and use `useOptimistic` only for a visible
temporary result.

This removes duplicated lifecycle bookkeeping without removing validation or
failure recovery.

## Server Functions

A framework may provide a Server Function that can be passed to these same
Action APIs. React does not turn an arbitrary client function into a server
call. Confirm the framework's serialization, authorization, error, and
progressive-enhancement behavior before using a server directive.
