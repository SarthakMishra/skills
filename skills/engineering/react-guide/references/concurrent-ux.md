# Concurrent UI

Read this reference for non-urgent updates, state-preserving hidden UI,
Effect Events, View Transitions, Fragment refs, or browser-only rendering.

## Schedule non-urgent work

Use `startTransition` or `useTransition` when an update can wait while
urgent input remains interactive. Use `useDeferredValue` when a derived view
may show the previous value while new work renders. These APIs schedule work;
they do not cancel network requests or replace loading and error handling.

React 19 also accepts an `initialValue` as the second argument to
`useDeferredValue`, which can provide a useful first-render value.

## Preserve hidden state with Activity

```tsx
import { Activity } from "react";

<Activity mode={isVisible ? "visible" : "hidden"}>
  <Sidebar />
</Activity>;
```

React 19.2 `Activity` hides a subtree, preserves its state, cleans up its
Effects while hidden, and deprioritizes updates. Use it for UI that is likely
to become visible again, such as tabs or a sidebar. Keep conditional mounting
when unmounting is the intended lifecycle or when preserving state is not
useful.

## Use Effect Events narrowly

```tsx
import { useEffect, useEffectEvent } from "react";

function ChatRoom({ roomId, theme }: { roomId: string; theme: string }) {
  const onConnected = useEffectEvent(() => {
    showNotification("Connected", theme);
  });

  useEffect(() => {
    const connection = createConnection(roomId);
    connection.on("connected", onConnected);
    connection.connect();
    return () => connection.disconnect();
  }, [roomId]);

  return null;
}
```

`useEffectEvent` is for event-like logic fired by an Effect that must read
the latest committed values without re-synchronizing the Effect. Call it only
from that component's Effects or Effect Events. Do not pass it to children, use
it in event handlers, or use it to hide a dependency that should re-run the
Effect.

## Animate transitions with ViewTransition

```tsx
import { ViewTransition, startTransition, useState } from "react";

function Panel() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => {
          startTransition(() => setOpen((value) => !value));
        }}
      >
        {open ? "Hide" : "Show"}
      </button>
      {open && (
        <ViewTransition enter="panel-in" exit="panel-out">
          <aside>Panel</aside>
        </ViewTransition>
      )}
    </>
  );
}
```

React 19.3 `ViewTransition` is a DOM-only component. React coordinates the
browser View Transition API for updates inside `startTransition`, Suspense
reveals, and `useDeferredValue`. Use `addTransitionType` inside the
transition when the same state change needs different animations. Do not call
`document.startViewTransition` for a tree React owns. Provide reduced-motion
CSS and keep urgent input updates outside the transition.

## Use Fragment refs when a group needs DOM behavior

```tsx
import { Fragment, useEffect, useRef } from "react";

function PostList({ posts }: { posts: Post[] }) {
  const groupRef = useRef<FragmentInstance | null>(null);

  useEffect(() => {
    groupRef.current?.scrollIntoView();
  }, []);

  return (
    <Fragment ref={groupRef}>
      {posts.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </Fragment>
  );
}
```

Fragment refs are stable in React 19.3. They expose group operations without a
wrapper DOM node. Use a normal element ref when one element is the semantic or
layout owner. The example assumes a project whose React types expose
`FragmentInstance`.

## Render a subtree only in the browser

```tsx
import { Suspense, use } from "react";
import { browser } from "react-dom";

function LocalTime() {
  use(browser());
  return <p>{new Intl.DateTimeFormat().resolvedOptions().timeZone}</p>;
}

function Page() {
  return (
    <Suspense fallback={<p>Loading local time...</p>}>
      <LocalTime />
    </Suspense>
  );
}
```

React 19.3 `browser()` takes no argument. `use(browser())` suspends during
server rendering and resolves in the browser, so the component must be inside a
server-side `Suspense` boundary. In an RSC app, call it from a Client
Component. Use this only when the server cannot produce meaningful output.

## Good and bad choices

**Bad.** Call document.startViewTransition around a React update and assume React will coordinate it.

**Good.** Mark the update with startTransition and put the changing subtree in ViewTransition.

**Bad.** Use useEffectEvent for a button's onClick or to silence a dependency warning.

**Good.** Use a normal event handler for clicks and useEffectEvent only for event-like callbacks fired by the local Effect.
