# Migration and codemods

Read this reference for a React 18 to 19 upgrade or a cleanup of APIs removed
in React 19. Codemods change syntax. They do not choose a data layer, verify
server behavior, or replace tests.

## Upgrade in this order

1. Check the application's and each public package's supported React range.
   Do not migrate a library to a React 19-only API while it still promises
   React 18 support.
2. Upgrade to the latest compatible React 18.3 release first when the project
   can do so. Fix warnings, then upgrade react, react-dom, and their TypeScript
   types together.
3. Confirm the modern JSX transform. React 19 requires it for the new JSX and
   ref behavior.
4. Run the official recipe, review the diff, and run type checks and tests.
5. Adopt optional APIs such as Actions, use, Activity, the Compiler, or View
   Transitions one path at a time. Do not combine a mechanical upgrade with an
   unrelated architecture rewrite.

## Run the official recipe

The React upgrade guide recommends the Codemod CLI:

    npx codemod@latest react/19/migration-recipe --target <path>

The current recipe covers these common transforms:

- replace-reactdom-render
- replace-string-ref
- replace-act-import
- replace-use-form-state
- prop-types-typescript

The repository also publishes focused transforms:

    npx codemod@latest react/19/remove-context-provider --target <path>
    npx codemod@latest react/19/remove-forward-ref --target <path>
    npx codemod@latest react/19/use-context-hook --target <path>

Use the focused transforms only when the project's minimum version and API
choice justify them. useContext remains valid, and forwardRef remains needed
for packages that support React 18.

## Update TypeScript

Run the React type codemod after the runtime migration:

    npx types-react-codemod@latest preset-19 ./path-to-app

Review changes for useRef arguments, mutable ref types,
no-implicit-return ref callbacks, the scoped JSX namespace, and
ReactElement props now defaulting to unknown. Fix the types manually when the
codemod cannot infer the intended contract.

## Check removed and deprecated APIs

Search the scoped code and its tests for:

- ReactDOM.render, hydrate, unmountComponentAtNode, findDOMNode, and removed
  react-dom/server stream APIs;
- legacy Context, string refs, module pattern factories, and
  React.createFactory;
- propTypes and defaultProps on function components;
- react-dom/test-utils imports other than the moved act, and
  react-test-renderer;
- element.ref, which is replaced by element.props.ref;
- implicit returns from callback refs, because React 19 reserves returned
  functions for cleanup.

forwardRef and Context.Provider are compatibility-supported in React 19 but
are future-deprecation targets. Prefer the React 19 forms in new code and
preserve the older forms when the package's version range requires them.

React 19 also removes UMD builds and discourages dependencies on React
internals. Replace internal access with public APIs before upgrading.

## Validate the migration

After every codemod batch:

1. Inspect the diff for public API and type changes.
2. Run the project's formatter, linter, type checker, and tests.
3. Exercise form success and failure, ref cleanup, error reporting, and
   hydration or server rendering when those paths exist.
4. Check third-party packages that may still depend on removed internals or
   legacy renderers.

## Good and bad choices

**Bad.** Run every React 19 transform on a shared package that still supports React 18.

**Good.** Check the package range, run only compatible transforms, review the diff, and test both supported React versions.
