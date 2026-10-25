# Design

Use `design-engineer` for an app interface task spanning several concerns. It
automatically coordinates the other three design skills and carries the result
through implementation and verification. Each companion also works independently:

| Change                                                         | Skill             |
| -------------------------------------------------------------- | ----------------- |
| App interfaces across UX, system, UI, copy, and implementation | `design-engineer` |
| Shared foundations and component conventions                   | `design-system`   |
| The user's path through the app                                | `ux-guide`        |
| Interface wording                                              | `ux-writer`       |

## Model-invoked

The agent can use these during a matching task. You can also invoke them
directly. See the [invocation guide](../../README.md#skills).

- [design-engineer](design-engineer/SKILL.md): Build and refine app interfaces across UX, design systems, visual craft, and copy. [Usage](design-engineer/README.md).
- [design-system](design-system/SKILL.md): Build, adopt, and enforce a React, Tailwind, and shadcn/ui design system, including motion. [Usage](design-system/README.md).
- [ux-guide](ux-guide/SKILL.md): Find where a user flow breaks down, map a better path, and verify the fix. [Usage](ux-guide/README.md).
- [ux-writer](ux-writer/SKILL.md): Write interface copy that explains the action, its consequences, and how to recover. [Usage](ux-writer/README.md).
