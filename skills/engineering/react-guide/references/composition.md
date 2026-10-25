# Composition patterns

Use this reference when a component API is accumulating structural boolean props,
render-slot props, or state that several related pieces need to share. Existing
JSX snippets are conceptual and omit imports and application-defined components;
the ownership type fixture below is self-contained.

## Choose the lightest pattern

1. Keep ordinary components prop-driven when one component owns the behavior.
2. Use children for static structure and slots.
3. Use explicit variants when modes change structure or behavior.
4. Use compound components with a provider when related parts need shared state.
5. Lift state to the closest common owner when siblings, portals, or dialogs need
   the same state.

Do not add Context or a provider to avoid passing one prop through one component.

## Replace structural booleans with composition

Bad:

```tsx
<Composer
  isThread
  isEditing={false}
  showAttachments
  showFormatting={false}
  channelId={channelId}
/>
```

Good:

```tsx
<ThreadComposer channelId={channelId}>
  <Composer.Input />
  <Composer.Footer>
    <Composer.Formatting />
    <Composer.Submit />
  </Composer.Footer>
</ThreadComposer>
```

The variant names the use case and the caller chooses the pieces. Shared
low-level parts can still live in Composer.* components.

## Use children for structure

Use children or named `ReactNode` slots when the parent only places caller-owned
UI. Choose named slots for fixed regions; nested parts need no Context unless
they coordinate behavior. Use a render prop when the parent supplies data to the
rendered child. These callbacks are ordinary functions, so put Hooks in a child
component, not inside the callback.

Bad:

```tsx
<Panel
  renderHeader={() => <Toolbar />}
  renderBody={() => <Results />}
  renderActions={() => <SaveButton />}
/>
```

Good:

```tsx
<Panel>
  <Panel.Header>
    <Toolbar />
  </Panel.Header>
  <Panel.Body>
    <Results />
  </Panel.Body>
  <Panel.Actions>
    <SaveButton />
  </Panel.Actions>
</Panel>
```

A render prop is appropriate when the parent owns the data:

```tsx
<List
  items={items}
  renderItem={({ item, index }) => (
    <ListRow key={item.id} item={item} index={index} />
  )}
/>
```

## Use compound components for shared behavior

Use a compound API when several subcomponents form one unit and need the same
state or actions. Keep the context value a small contract instead of exposing
the provider's state library or implementation.

```tsx
type TabsValue = {
  state: { selectedId: string };
  actions: { select: (id: string) => void };
};

const TabsContext = createContext<TabsValue | null>(null);

function useTabs() {
  const value = use(TabsContext);
  if (!value) throw new Error('Tabs components must be inside <Tabs>');
  return value;
}

function Tabs({
  selectedId,
  onSelect,
  children,
}: {
  selectedId: string;
  onSelect: (id: string) => void;
  children: React.ReactNode;
}) {
  return (
    <TabsContext
      value={{ state: { selectedId }, actions: { select: onSelect } }}
    >
      {children}
    </TabsContext>
  );
}

function Tab({ id, children }: { id: string; children: React.ReactNode }) {
  const {
    state: { selectedId },
    actions: { select },
  } = useTabs();

  return (
    <button
      type="button"
      aria-selected={selectedId === id}
      onClick={() => select(id)}
    >
      {children}
    </button>
  );
}
```

This sketch demonstrates Context wiring, not an accessible tabs implementation.
Use the existing accessible primitive for tab roles, panel relationships, focus,
and keyboard navigation.

The example uses the React 19 Context provider syntax and use(context).
useContext remains valid for ordinary top-level reads. Add a provider only
when the parts need shared behavior, not as a default wrapper.

Context reads subscribe to the whole value. Destructuring one property does not
create a selector; `memo` cannot block updates from consumed Context. Split
contexts by independent consumers and update frequency when profiling justifies
it. A stable provider value avoids broadcasts from unrelated parent renders,
but cannot suppress legitimate changes to the value.

Bad: every table cell reads one context containing selection, draft text, and
configuration, expecting destructuring to isolate it. Good: keep drafts local
and separate configuration from shared selection. Test nested roots for isolation
and missing-provider errors; profile consumers before adding a selector store.

## Lift state to the common owner

If a preview, toolbar, dialog action, or portal needs the same state as an input,
move the state to their closest common owner. Do not synchronize child state to a
parent with an Effect or expose a ref as a state channel.

Bad:

```tsx
function Composer({ onTextChange }: { onTextChange: (text: string) => void }) {
  const [text, setText] = useState('');

  useEffect(() => {
    onTextChange(text);
  }, [text, onTextChange]);

  return <textarea value={text} onChange={(e) => setText(e.target.value)} />;
}
```

Good:

```tsx
function ComposerProvider({ children }: { children: React.ReactNode }) {
  const [text, setText] = useState('');

  return (
    <ComposerContext value={{ state: { text }, actions: { setText } }}>
      {children}
    </ComposerContext>
  );
}

function ComposerPreview() {
  const {
    state: { text },
  } = useComposer();
  return <output>{text}</output>;
}
```

Keep the provider responsible for state management. Compound parts consume the
contract and do not know whether the implementation uses useState, a reducer,
a store, or server synchronization.

## Name meaningful variants

When a mode changes the component's structure, give it a component name and
share the internal pieces.

Bad:

```tsx
<Composer mode="edit" isThread={false} showMentions showCancel />
```

Good:

```tsx
<EditMessageComposer messageId={messageId} />
<ThreadComposer channelId={channelId} />
```

Use one component with a prop when the structure stays the same and only a
genuine value changes. Split only when the separate names make the API or
rendered structure easier to understand.

## Make state ownership explicit in reusable controls

Reuse the project's controlled-state primitive when both modes are required.
Controlled props are authoritative; callbacks request a change. Uncontrolled
state uses the default only at initialization. Keep the mode fixed for a mounted
instance and define deliberate reset behavior. Do not mirror controlled props
into local state with an Effect.

Independent runnable type-check fixture, TS 4.9+, `strict` and
`exactOptionalPropertyTypes`; no React runtime required:

```ts
// Bad: permits two sources of truth and controlled state without a callback.
type LooseDisclosure = { open?: boolean; defaultOpen?: boolean };
const ambiguous: LooseDisclosure = { open: true, defaultOpen: false };

// Good for an interactive control that requires a controlled change handler.
type DisclosureProps =
  | {
      open: boolean;
      onOpenChange: (open: boolean) => void;
      defaultOpen?: never;
    }
  | {
      open?: never;
      defaultOpen?: boolean;
      onOpenChange?: (open: boolean) => void;
    };
const controlled: DisclosureProps = { open: false, onOpenChange: () => {} };
const uncontrolled: DisclosureProps = { defaultOpen: true };
// @ts-expect-error Initial and ongoing ownership cannot compete.
const rejected: DisclosureProps = {
  open: true,
  defaultOpen: false,
  onOpenChange: () => {},
};
// @ts-expect-error This interactive controlled API requires a change handler.
const missingHandler: DisclosureProps = { open: true };
```

`?: never` rejects explicit undefined only with `exactOptionalPropertyTypes`.
Types cannot prevent mode changes across renders. If authoring the primitive,
exercise batched updates, parent-controlled rerenders, reset behavior, and callback
counts. Keep callbacks out of state updater functions, which must be pure. Define
how undefined is represented if it is a valid controlled value; it cannot also
serve as the uncontrolled sentinel.

For other prop unions, encode real semantic incompatibilities. An anchor can
legitimately have both `href` and `onClick`; do not forbid that combination by
habit. Prefer explicit native-element contracts before a polymorphic `as` API;
when polymorphism is needed, check element-specific props, event inference, and
ref types at actual JSX call sites rather than trusting a generic alias alone.
