# UI guide

Use `/ui-guide` in Claude Code or `$ui-guide` in Codex for a design decision:

```text
Review this settings panel's hierarchy, typography, and feedback.
Recommend one treatment with before/after examples; do not implement it.
```

The agent can also select the skill for matching design work.

## What it covers

| Decision           | Guidance                                                                    |
| ------------------ | --------------------------------------------------------------------------- |
| Visual foundations | Layout, typography, iconography, color, and surfaces.                       |
| Interaction design | Recognizable controls, visible states, feedback, and recovery expectations. |
| Motion design      | Purpose, timing, easing, origin, repetition, and reduced-motion treatment.  |
| Design review      | Observable before/after critique, evidence, and a final polish pass.        |

[SKILL.md](SKILL.md) is a lean map to nine focused references. Defaults are explicit;
existing project tokens take precedence. Short CSS examples explain design rules.
For a complete app interface, [design-engineer](../design-engineer/README.md)
automatically uses this skill alongside UX, design-system, and copy guidance,
then implements and verifies the result. UI guide remains independently usable.

## Give it enough context

1. Point to the screen or component and the decision to make.
2. Supply screenshots, realistic content, or a description of the visible problem.
3. State the product's existing design constraints and what should stay unchanged.

A useful result names the treatment, project tokens or exact defaults, why it helps,
and the evidence available. Proposed behavior stays labeled as proposed. Missing
runtime evidence does not become an assertion that the component is broken.

For product-wide journeys, use [ux-guide](../ux-guide/README.md). For interface copy,
use [ux-writer](../ux-writer/README.md). Shared-system adoption and enforcement belong
to [design-system](../design-system/README.md).

## Sources

The fundamentals draw on Dan Saffer's _Microinteractions_ (2013), Adam Wathan and
Steve Schoger's _Refactoring UI_ (2018), Adham Dannaway's _Practical UI_ (copyright
2022, ISBN 978-0-6456766-0-0; edition unverified), and Val Head's
_Designing Interface Animation_ (2016).

Layout, typography, iconography, surfaces, and polish adapt Jakub Krehel's
[better-* skills](https://github.com/jakubkrehel/skills/tree/267330e1adfc66a718fb65fa6918c1f06d0a689e/skills).
Layout and typography were reviewed at that revision; the better-ui material came
from a local snapshot installed September 14, 2026. Color also adapts Erik D.
Kennedy's [practical framework](https://www.learnui.design/blog/color-in-ui-design-a-practical-framework.html),
updated June 15, 2024. Original research included Emil Kowalski's
[public skills collection](https://github.com/emilkowalski/skills/tree/85e8e2363b713506e1d5b6e07a0eb2da66be1bc3).

The references retain primary technical citations where a specific requirement
needs verification. Attribution is documentation, not a separate decision workflow.

### License for adapted better-* material

```text
MIT License

Copyright (c) 2026 Jakub Krehel

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```
