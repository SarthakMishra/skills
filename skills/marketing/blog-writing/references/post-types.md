# Post types

Use this catalog to choose a post's type and its default skeleton. A format in the
blog's `VOICE.md` overrides the matching skeleton. Each skeleton is a
starting order of jobs, not a set of required headings; merge or drop a section
when the material has nothing for it. Example titles and numbers are invented to
show the pattern; a real title uses the post's own facts.

## Choose the type by the reader's question

Pick the type from what the reader wants when they arrive, not from what the
author wants to say. If two types fit, pick the one whose reader question the
title will promise.

| Reader's question                        | Type                                                  |
| ---------------------------------------- | ----------------------------------------------------- |
| "Teach me this by doing it."             | [Tutorial](#tutorial)                                 |
| "How do I get this specific thing done?" | [How-to guide](#how-to-guide)                         |
| "How does this actually work?"           | [Explainer](#explainer)                               |
| "Is the common view right?"              | [Opinion](#opinion)                                   |
| "What happened when you tried it?"       | [Experience report](#experience-report)               |
| "What went wrong, and why?"              | [Postmortem](#postmortem)                             |
| "Give me the useful points quickly."     | [List post](#list-post)                               |
| "Which one should I pick?"               | [Comparison](#comparison)                             |
| "Is this thing any good?"                | [Review or teardown](#review-or-teardown)             |
| "What's out there on this topic?"        | [Roundup](#roundup)                                   |
| "What changed, and does it affect me?"   | [Release or news reaction](#release-or-news-reaction) |
| "What did you find in the data?"         | [Research or data post](#research-or-data-post)       |
| "What is it like, and what did it mean?" | [Personal essay](#personal-essay)                     |

Tutorials, how-to guides, and explainers follow the split in the Diátaxis
documentation framework: learning, doing, and understanding are different reader
needs. Mixing them is the most common failure in technical posts.

## Tutorial

- Reader question: "Teach me this by building something."
- Skeleton:
  1. What the reader will have at the end, shown first (screenshot, output, demo link).
  2. Prerequisites: versions, accounts, prior knowledge, in one short list.
  3. Steps, each with one action, the code or command, and the result the reader
     should now see.
  4. A short explanation after the thing works, not before.
  5. Where to go next: one or two concrete extensions.
- Opening: the finished result and why it is worth building.
- Title: Bad "A Comprehensive Guide to WebSockets". Good "Build a live cursor
  sharing app with WebSockets in 80 lines".
- Failure: theory before the first working step; steps that skip a command
  because the author "obviously" ran it.

## How-to guide

- Reader question: "How do I do this specific task?" The reader already knows
  the domain.
- Skeleton:
  1. The goal in one sentence, and when this approach applies.
  2. The steps, in order, with no teaching detours.
  3. Variations and failure cases: "If you see X, do Y."
- Opening: the task and the condition, in the first two sentences.
- Title: Bad "Thoughts on Postgres Backups". Good "How to restore one table from
  a Postgres backup".
- Failure: a tutorial's hand-holding for a reader who wants a recipe.

## Explainer

- Reader question: "How does this work, and why is it like that?"
- Skeleton:
  1. A concrete puzzle or observable behavior the reader has met.
  2. The simplest model that explains it.
  3. Layers of detail, each added only when the previous model breaks.
  4. What the understanding changes in practice.
- Opening: the puzzle, not the definition. "Why does `useEffect` run twice in
  development?" beats "React has a lifecycle."
- Title: Bad "Understanding the Event Loop". Good "Why `setTimeout(fn, 0)` doesn't
  run immediately".
- Failure: a definition-first textbook order; every detail at the same depth.

## Opinion

- Reader question: "Is the common view right?"
- Skeleton:
  1. The claim, stated plainly, early.
  2. The strongest version of the view being challenged.
  3. The evidence and reasoning, ordered from most to least convincing.
  4. Where the claim stops applying.
  5. What the reader should do differently.
- Opening: the claim, or the moment that made the author believe it.
- Title: Bad "Some Reflections on Microservices". Good "Your team is too small for
  microservices".
- Failure: attacking a weak version of the other side; hedging until no claim is
  left.

## Experience report

Also called a case study, build log, or "how we did X".

- Reader question: "What happened when you tried it, and what should I copy?"
- Skeleton:
  1. The situation and the stakes: what was at risk or what it cost.
  2. What the author tried, including what failed.
  3. The turning point: the discovery, decision, or measurement that changed course.
  4. The result, with numbers and the baseline.
  5. What the author would do the same and differently.
- Opening: the most surprising moment or result, then step back.
- Title: Bad "Our Journey to Kubernetes". Good "We moved off Kubernetes and cut
  our bill by 70%".
- Failure: a chronological diary where every week gets equal space; a success
  story with the failures removed.

## Postmortem

- Reader question: "What went wrong, why, and how do I avoid it?"
- Skeleton:
  1. Impact: what users saw, for how long.
  2. Timeline of detection, diagnosis, and recovery, with times.
  3. Root cause and contributing causes.
  4. What made it worse or better than it could have been.
  5. Changes made, with their status.
- Opening: the impact in one or two plain sentences.
- Title: Bad "An Incident Occurred". Good "How a config typo took down checkout
  for 47 minutes".
- Failure: blame on a person instead of the system; vague causes ("a network
  issue"); jokes.

## List post

- Reader question: "Give me the useful points without the essay."
- Skeleton:
  1. One paragraph: who the list is for and what it is based on.
  2. Items, ordered by importance or by the order the reader will meet them.
     Each item: a heading that states the point, then the reason and an example.
  3. No conclusion beyond the last item, or one line saying which item to start with.
- Opening: the source of authority ("from 40 code reviews this year").
- Title: Bad "10 Amazing Tips for Better Code". Good "7 code review comments I
  stopped making". Use a number only when it is meaningful.
- Failure: padding to a round number; items that repeat each other; items with no
  example.

## Comparison

- Reader question: "Which one should I pick?"
- Skeleton:
  1. The recommendation, with its condition, first.
  2. The criteria that matter for this choice, and why.
  3. A comparison table across the criteria.
  4. Each option's best fit and worst fit.
  5. How the author tested or used them.
- Opening: the recommendation. Readers who need only that can stop.
- Title: Bad "Prisma vs Drizzle: An Overview". Good "Prisma or Drizzle: which ORM
  to pick for a new Next.js app".
- Failure: a balanced summary that refuses to recommend; criteria chosen to make a
  favorite win.

## Review or teardown

- Reader question: "Is this good, and what can I learn from how it's made?"
- Skeleton:
  1. The verdict and who it is for.
  2. What the author did with it, for how long.
  3. What works, with specifics.
  4. What does not, with specifics.
  5. For a teardown: the design decisions worth copying.
- Opening: the verdict or the most telling detail.
- Title: Bad "My Thoughts on Linear". Good "What Linear's keyboard shortcuts
  teach about speed".
- Failure: a feature list copied from the product page.

## Roundup

- Reader question: "What's out there, and what is worth my time?"
- Skeleton:
  1. The selection criteria and the period covered.
  2. Entries grouped by theme, each with a one-line reason to read it.
  3. The one or two picks the author would read first.
- Opening: what the author was looking for and the standard applied.
- Title: Bad "Interesting Links". Good "The 6 best essays on software estimation".
- Failure: an unannotated link dump.

## Release or news reaction

- Reader question: "What changed, and does it affect me?"
- Skeleton:
  1. What changed, in one paragraph, with a link to the primary source.
  2. Who is affected and who can ignore it.
  3. What to do now, with code or steps when relevant.
  4. The author's read on what it means longer term, clearly marked as opinion.
- Opening: the change and its consequence together.
- Title: Bad "Big News From the React Team". Good "React 19 removes
  `defaultProps` for function components: what to change".
- Failure: restating the announcement without saying who it affects.

## Research or data post

- Reader question: "What did you find, and can I trust it?"
- Skeleton:
  1. The headline finding with its number.
  2. The method: data source, sample, period, limits.
  3. Findings, each with a chart or table and one sentence on what it shows.
  4. What the findings do and do not support.
  5. Data and code links where possible.
- Opening: the most surprising finding.
- Title: Bad "Analyzing Developer Surveys". Good "We read 2,000 job posts: 38%
  ask for Rust experience nobody uses".
- Failure: causal claims from correlational data; charts without a takeaway.

## Personal essay

- Reader question: "What was this like, and what did it mean to you?"
- Skeleton: no fixed sections. Build around one scene or turning point, the
  author's changed understanding, and the detail that makes it particular.
- Opening: a scene, in motion.
- Title: Bad "Reflections on Burnout". Good "The week I stopped answering Slack
  after 6 p.m.".
- Failure: abstract reflection with no scene; a lesson announced instead of shown.
