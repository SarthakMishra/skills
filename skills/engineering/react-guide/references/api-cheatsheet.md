# React 19+ API cheat sheet

Use the installed React version and framework before choosing an entry. The
sections group APIs by the React release that introduced or stabilized them.
Framework support may lag.

## React 19

| API or pattern                                                          | Package          | Use it for                                                            | Boundary                                                                       |
| ----------------------------------------------------------------------- | ---------------- | --------------------------------------------------------------------- | ------------------------------------------------------------------------------ |
| use(promise)                                                            | react            | Read a cached Promise during render.                                  | Promise needs Suspense and an Error Boundary for local loading and failure UI. |
| use(context)                                                            | react            | Read Context conditionally or in a loop.                              | Context reads with use are not supported in Server Components.                 |
| useActionState                                                          | react            | Action result, previous state, and pending state.                     | Dispatch from a form Action or transition.                                     |
| useOptimistic                                                           | react            | Temporary UI during a mutation.                                       | The real source of truth must catch up.                                        |
| form action and formAction                                              | react-dom        | Submit async functions through forms and controls.                    | Server Functions require a framework.                                          |
| useFormStatus                                                           | react-dom        | Read the nearest parent form's pending, data, method, and action.     | Call it from a descendant component.                                           |
| ref as a prop                                                           | react            | Pass refs to function components without a new forwardRef wrapper.    | Class refs still refer to class instances.                                     |
| Context as a provider                                                   | react            | Render ThemeContext with a value prop.                                | Context.Provider remains valid for compatibility.                              |
| useDeferredValue(value, initialValue)                                   | react            | Show an initial or stale value while a deferred view renders.         | Keep urgent input state separate.                                              |
| onCaughtError and onUncaughtError                                       | react-dom/client | Report errors caught or uncaught by a root.                           | Configure createRoot or hydrateRoot.                                           |
| title, meta, and link                                                   | react-dom        | Render simple document metadata from components.                      | Framework metadata APIs may supply more route behavior.                        |
| prefetchDNS, preconnect, preload, preloadModule, preinit, preinitModule | react-dom        | Start loading resources whose future use is known.                    | Use the framework's asset pipeline when it owns loading.                       |
| Custom Elements                                                         | react-dom        | Pass custom-element properties and attributes with React DOM and SSR. | Confirm the custom element's client and server contract.                       |

## React 19.2

| API            | Use it for                                                                | Important boundary                                              |
| -------------- | ------------------------------------------------------------------------- | --------------------------------------------------------------- |
| Activity       | Hide a likely-to-return subtree while preserving state.                   | Hidden Effects clean up and updates are deprioritized.          |
| useEffectEvent | Keep event-like Effect logic on the latest values without re-subscribing. | Do not use it to hide real dependencies or pass it to children. |
| cacheSignal    | Abort Server Component work when a cache lifetime ends.                   | RSC only; it returns null outside a server render.              |

## React 19.3

| API                        | Use it for                                                        | Important boundary                                              |
| -------------------------- | ----------------------------------------------------------------- | --------------------------------------------------------------- |
| ViewTransition             | Animate DOM changes inside Transitions and Suspense reveals.      | React owns the browser View Transition; support reduced motion. |
| addTransitionType          | Give a Transition a semantic animation type.                      | Call it inside startTransition.                                 |
| Fragment refs              | Operate on a group of first-level DOM children without a wrapper. | Use the Fragment API, not shorthand, and require 19.3 types.    |
| browser and use(browser()) | Opt a client-only subtree out of server rendering.                | Put it under server-side Suspense. browser takes no argument.   |
| Trusted Types support      | Preserve Trusted Types values at DOM injection sinks.             | Still sanitize untrusted content and set the CSP intentionally. |

## Build-time behavior

| Tool                      | Meaning                                                                                                     |
| ------------------------- | ----------------------------------------------------------------------------------------------------------- |
| React Compiler            | A stable build-time optimizer that can memoize components and Hooks. React 19 does not enable it by itself. |
| eslint-plugin-react-hooks | Hook rules plus Compiler-aware diagnostics in current recommended presets.                                  |
| cache                     | Server Component request-scope memoization, not a general browser cache.                                    |

Use the API names above only after checking the installed React version and the
framework's supported release.

## Good and bad choices

| Bad                                                                   | Good                                                                            |
| --------------------------------------------------------------------- | ------------------------------------------------------------------------------- |
| Fetch in an Effect with no cache, race handling, or error path.       | Use a framework loader or a cached Promise with use and Suspense.               |
| Add memoization before measuring.                                     | Use the Compiler when enabled, otherwise measure first.                         |
| Call use(browser("reason")) or hide server content with a mount flag. | Call use(browser()) under Suspense for an intentionally browser-only component. |
