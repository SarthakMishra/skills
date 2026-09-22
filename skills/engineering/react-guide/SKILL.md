---
name: react-guide
description: Guide writing, reviewing, and refactoring modern React code. Use for React components, composition, compound components, variants, state, Effects, data, forms, refs, transitions, performance, Server Components, or React 19+ APIs.
---

# React guide

Read the project's package version and framework config first. Use APIs that the
project supports. Keep this model in view: render describes UI, events and
Actions change state, and Effects synchronize with systems React does not own.

## Keep render pure

React may start, pause, restart, or discard render work. Render must be safe to
run again.

- Do not mutate props, state, context values, or shared objects.
- Do not write to the DOM, start browser timers, or subscribe during render.
- Let Server Components and framework loaders own server-side data reads.
- Return the same UI for the same inputs.
- Treat props and state as immutable snapshots.

Bad:

```tsx
function Cart({ items }) {
  items.push(newItem);
  return <List items={items} />;
}
```

Good:

```tsx
function Cart({ items }) {
  const nextItems = [...items, newItem];
  return <List items={nextItems} />;
}
```

## Keep state minimal

Store the smallest set of values that cannot be calculated from props, state,
or context.

- Calculate derived values during render.
- Use functional updates when the next state depends on the previous state.
- Use a stable data key to reset a subtree when its identity changes.
- Use stable item IDs for list keys. Do not use array indexes for reorderable
  lists or generate keys during render.
- Use a reducer when one state transition has many related updates. Do not add a
  reducer for simple state.

Bad:

```tsx
const [fullName, setFullName] = useState("");

useEffect(() => {
  setFullName(firstName + " " + lastName);
}, [firstName, lastName]);
```

Good:

```tsx
const fullName = firstName + " " + lastName;
```

## Put logic in the right place

Use the cause of the work to choose its location.

| Cause                                                                                 | Put it in                                 |
| ------------------------------------------------------------------------------------- | ----------------------------------------- |
| A value is needed for render                                                          | Render logic                              |
| A click, input, submit, or drag happened                                              | Event handler                             |
| A form or async mutation is pending                                                   | Action, useActionState, and useFormStatus |
| A DOM, subscription, timer, browser API, or third-party widget must stay synchronized | Effect with cleanup                       |
| A subtree should stay hidden while keeping state                                      | Activity when the project supports it     |

Bad:

```tsx
const [submitted, setSubmitted] = useState(false);

useEffect(() => {
  if (submitted) sendOrder(order);
}, [submitted, order]);

function handleSubmit() {
  setSubmitted(true);
}
```

Good:

```tsx
async function handleSubmit() {
  await sendOrder(order);
}
```

An Effect is an escape hatch, not a second event system. Do not use one to
derive state, notify a parent, respond to a user action, or chain state updates.
Keep an Effect when the component must synchronize with an external system.

## Load data through a resource

Prefer a framework loader, Server Component, or Suspense-compatible data source.
Pass a cached Promise to a component and read it with `use(promise)` under
`Suspense`. Put failures under an Error Boundary when the UI needs local
recovery.

Do not create an uncached Promise in the component that calls `use`. If the
project has no Suspense-compatible source, use a data library or a custom Hook
that handles loading, errors, cancellation, stale responses, and caching.

Data fetching in an Effect is valid for that custom Hook. It is not a reason to
skip race handling or error and loading states.

## Use Actions for mutations

For forms and async mutations, prefer a function-valued `action` or
`formAction`.

- Use `useActionState` for the returned state and pending state.
- Use `useFormStatus` in a descendant submit control.
- Use `useOptimistic` only for a visible temporary result.
- Validate every `FormData` value at the application boundary.
- Keep controlled inputs when the UI needs their value on every render.
  Otherwise, uncontrolled inputs and `FormData` are simpler.

Read `references/actions-and-forms.md` for the complete pattern.

## Compose component APIs

Use composition when a component is accumulating structural booleans, render
props, or state that several related pieces need to share. Keep simple components
prop-driven.

- Use children for static structure and slots.
- Use explicit variants when modes change structure or behavior.
- Use compound components with a provider when related parts need shared state.
- Lift state to the closest common owner when siblings, portals, or dialogs need
  it. Expose a small contract such as state, actions, and meta.
- Keep booleans for independent behavior such as disabled or loading. Do not use
  them to select whole layouts.
- Use refs for imperative DOM access or instance values that do not drive
  rendering. Use state for values that affect the UI.
- In React 19, use `<SomeContext value={value}>` for new providers and accept
  `ref` as a prop. Keep `forwardRef` when supporting React 18.
- Use `use(context)` when a Context read must be conditional or inside a loop.
  Use `useContext` for an ordinary top-level read.

Bad:

```tsx
<Composer isThread showFormatting={false} />
```

Good:

```tsx
<ThreadComposer>
  <Composer.Input />
  <Composer.Submit />
</ThreadComposer>
```

Read `references/composition.md` for the patterns and exceptions.

## Defer work deliberately

- Keep typing and direct manipulation urgent.
- Use `startTransition` or `useTransition` for non-urgent updates.
- Use `useDeferredValue` when a derived view may lag behind input.
- Use `ViewTransition` for DOM animations around Transitions when the project
  supports React 19.3.
- Use `Activity` when hidden UI should keep its state. Hidden Effects are
  cleaned up and hidden updates are deprioritized.
- Use `useEffectEvent` only for event-like logic called by a local Effect. Do
  not use it to hide a dependency or as a replacement for an event handler.

Read `references/concurrent-ux.md` for these APIs.

## Let the Compiler handle memoization

React Compiler is a build setting, not an automatic React 19 behavior.

- When enabled, write pure components and Hooks and do not add manual memoization
  by habit.
- Without it, add `useMemo`, `useCallback`, or `memo` only for a measured
  performance problem or a required stable identity.
- Keep existing memoization during incremental adoption until removing it is
  measured and tested.
- Never use memoization to hide impure render logic.

Read `references/compiler-and-memo.md` when memoization or Compiler config is
part of the task.

## Respect server and client boundaries

Server Components are a framework or bundler architecture. In an RSC project,
keep server-only data and noninteractive UI on the server. Add a Client
Component boundary for state, event handlers, Effects, or browser APIs.

In a client-only app, do not invent RSC directives. `"use server"` marks a
framework Server Function. It does not mark a Server Component.

Use `use(browser())` only for an intentionally browser-only subtree in React
19.3, and place it under server-side `Suspense`.

## Finish with a focused check

1. Inspect the project version, framework, and rendering boundary.
2. Classify each piece of logic as render, event, Action, resource, Effect, or
   transition work.
3. Implement the smallest compatible pattern.
4. Exercise the changed success, pending, failure, rollback, accessibility, and
   hydration states that apply.

Read `references/effects-and-data.md` for Effects and resources,
`references/api-cheatsheet.md` for version-gated APIs, and
`references/migration-codemods.md` only for an upgrade.
