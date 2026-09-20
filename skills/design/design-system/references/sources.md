# Sources and judgment

The skill combines the methodology below with implementation and enforcement
guidance for the requested stack. The proposed token names, motion values, and
workflow adaptations are this skill's recommendations. They are not quotations
or universal standards.

## Methodology and visual design

- Brad Frost, [Atomic Design, chapter 2](https://atomicdesign.bradfrost.com/chapter-2/).
  Source for the five composition levels and moving between parts and real pages.
  The model does not require a particular framework or folder taxonomy.
- [Chapter 3](https://atomicdesign.bradfrost.com/chapter-3/) informs maintained examples
  and shared source; [chapter 4](https://atomicdesign.bradfrost.com/chapter-4/) informs
  interface inventories; [chapter 5](https://atomicdesign.bradfrost.com/chapter-5/)
  informs contributions, evolution, and deprecation. Adopt these practices within
  the user's authorized scope rather than importing every organizational process.
- Adam Wathan and Steve Schoger, [Refactoring UI](https://www.refactoringui.com/), 2018. The authoring session reviewed the user-provided 252-page PDF, particularly
  feature-first design, constrained choices, hierarchy, spacing and sizing, type,
  palettes, depth, imagery, and empty states. References paraphrase these ideas;
  the book, page images, and extracted text are not distributed with this skill.
- Marta Conde, [Design a Scalable Design System](https://medium.com/@MartaCondeDesign/design-a-scalable-design-system-c76ac2a40a07), 2022. Informs shared taxonomy and deliberate variant dimensions. Its Figma
  construction steps are not React architecture rules. Implement only meaningful
  combinations instead of reproducing every design-tool instance in code.

## System and motion inspiration

- [Uber Base](https://base.uber.com/) and Uber's
  [Base Web introduction](https://www.uber.com/us/en/blog/introducing-base-web/)
  illustrate shared components, theming, and documentation at product scale.
- [Dropbox brand guidelines](https://brand.dropbox.com/) and
  [motion guidance](https://brand.dropbox.com/motion) inform purposeful motion,
  immediate feedback, and restrained expressiveness. Brand presentation animation
  is not automatically appropriate for a frequently used application control.

## Implementation authorities

Check installed versions before applying current documentation:

- Tailwind [theme variables](https://tailwindcss.com/docs/theme) and
  [class detection](https://tailwindcss.com/docs/detecting-classes-in-source-files).
- shadcn/ui [component ownership](https://ui.shadcn.com/docs) and
  [theming conventions](https://ui.shadcn.com/docs/theming).
- shadcn/ui [CLI](https://ui.shadcn.com/docs/cli),
  [dynamic search](https://ui.shadcn.com/docs/registry/dynamic-search),
  [registry directory](https://ui.shadcn.com/docs/directory), and
  [item schema](https://ui.shadcn.com/docs/registry/registry-item-json).
  [Registry discovery](registry-discovery.md) records the provider sources,
  maintenance evidence, and compatibility limits for the shortlist.
- Storybook [framework setup](https://storybook.js.org/docs/get-started/frameworks)
  and [accessibility testing](https://storybook.js.org/docs/writing-tests/accessibility-testing).

Existing product requirements and accessibility constraints take precedence over
stylistic examples. Verify contrast and interaction behavior in the implementation;
neither a palette recipe nor a component library guarantees accessibility. Check
current official accessibility guidance when defining numerical requirements.
