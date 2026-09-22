# Choose shadcn foundations

Read this file before changing the Tailwind theme, shadcn roles, radius, spacing,
or shared tokens. Start with the installed defaults and test the smallest change
in a real feature.

## Start with the installed shadcn system

Read `components.json`, the theme CSS or Tailwind config, and representative
files in `components/ui`. Preserve the chosen shadcn style, control library,
semantic roles, radius, and spacing scale.

Change a default only when a product requirement, accessibility issue, or repeated
consumer need shows a real gap. Record the reason and affected consumers.

Good: keep `bg-primary text-primary-foreground` and add one missing semantic
role that several components need.

Bad: replace the shadcn theme with a new palette after viewing one card. It
creates token churn before the system has a tested requirement.

## Name tokens by role

Use stable names that describe what a value means. Keep primitive values separate
from semantic aliases. Components consume semantic roles.

| Use     | Good name           | Bad name         |
| ------- | ------------------- | ---------------- |
| Surface | `surface-default`   | `gray-50`        |
| Text    | `text-muted`        | `text-gray-500`  |
| Action  | `action-primary`    | `button-blue`    |
| Space   | `space-control-md`  | `card-padding`   |
| Radius  | `radius-control-md` | `input-radius-7` |

Use the DTCG convention as a naming idea only. Group tokens in a readable tree
by category, primitive value, and semantic role. Keep the project's existing CSS
variable names and Tailwind mapping. Do not write a DTCG file or translate the
tree into a new token format.

```text
color
├── base
│   └── neutral
│       └── 0
└── semantic
    ├── surface
    │   └── default
    ├── text
    │   └── muted
    └── action
        └── primary
```

Use semantic roles in shadcn components. A primitive value belongs in the theme
or token source and flows into roles such as `--primary` and `--muted-foreground`.
Do not expose the primitive name in component classes.

Bad: `bg-blue-600`, `--card-padding`, and a new raw hex value in each component.
Good: `bg-primary`, `p-4`, and a shared `--primary` role whose theme value can
change without editing consumers.

## Test the foundation

Use a form, list, dashboard, or dialog with real text. Check a second composition
and the relevant empty, loading, error, disabled, selected, and long-content
states. Check every supported theme, text zoom, contrast pairing, and responsive
width before promoting a value to the shared theme.

Add a token only when it represents a repeated meaning or an independently
supported theme choice. Do not create one token for every CSS declaration.
