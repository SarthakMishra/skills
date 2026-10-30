# Write VOICE.md

Use this reference to write, place, calibrate, and maintain `VOICE.md` for one
blog. `VOICE.md` is the blog's single voice entry point, like `DESIGN.md` for a
design system: it records the agreed identity, and this skill reads it before
every draft or edit. Craft that applies to every blog (structure, narrative, fact
checking) stays in this skill.

## Place the file

Update an existing `VOICE.md` or equivalent (a style guide, `CONTRIBUTING.md`
section, or editorial doc) instead of creating a second source. Create `VOICE.md`
only when no equivalent exists.

| Where the blog lives                        | Location                                                              |
| ------------------------------------------- | --------------------------------------------------------------------- |
| A repository that holds the posts           | `VOICE.md` at the repository root, beside `DESIGN.md` and `AGENTS.md` |
| A monorepo with several publications        | `VOICE.md` in each publication's content root                         |
| Outside a repository (Substack, Ghost, CMS) | A folder the author chooses, such as `~/writing/<blog-slug>/VOICE.md` |

In a repository, add a short pointer to `AGENTS.md` or `CLAUDE.md` so agents
reach the file without being told:

```markdown
## Writing voice

Before drafting or editing a post, read `VOICE.md` and follow it. Use the
`blog-writing` skill for structure and fact checks. Propose changes to `VOICE.md`
instead of drifting from it in a single post.
```

Outside a repository, tell the author to include the path with each writing
request. Ask before writing outside the current repository.

## Keep it one file

Put everything the writer needs in `VOICE.md`: rules, examples, exemplars, post
formats, and the metric profile. A writer who reads one file gets the whole
voice. Split a section into `voice/<section>.md` only when the file passes about
600 lines, and link it from the section it replaces.

The metric profile lives in a fenced block with the info string
`json voice-profile`. This skill's metrics script reads it directly:

```sh
node <skill-dir>/scripts/voice-metrics.mjs draft.md --profile VOICE.md
```

## Template

Fill this template with the agreed rules. Replace every placeholder; delete a
section only when the interview marked it not applicable.

````markdown
# <Blog name> voice

The voice, house style, and post formats for <Blog name> (<URL>). Read this before
drafting or editing any post. Where it conflicts with general writing advice on
voice or format, this file wins.

Last revised: <date>. Corpus: <n> approved posts, <words> words.

## Reader

<One paragraph describing the reader as a specific person: job, what they know,
what they were doing before they clicked, where they came from. Then what the
reader should do or believe after a post.>

## Voice

<One sentence naming the persona and relationship, for example: "A practitioner
who runs small web apps alone, telling a peer what happened and what they would do
now.">

### <Dimension name>

<Rule: scope, target, exception.>

Bad: <generic version on this blog's topic>

Good: <author's own sentence or chosen variant>

<Repeat for every dimension with a rule, grouped by layer: stance, diction,
syntax, page shape, moves.>

## Tone shifts

| Situation or post type | Dimension changes                                    |
| ---------------------- | ---------------------------------------------------- |
| <Postmortem>           | <Humor off. Hedging allowed for unconfirmed causes.> |

## Lexicon

- Signature words and phrases: <list, with when they fit>
- Never use: <list>
- Fixed spellings: <list>

## House style

<Binary rules: spelling variety, capitalization, numbers, dates, code formatting,
link text, image alt text, heading case, title case.>

## Post formats

### <Post type>

<Reader question, section skeleton with each section's job, opening and ending
moves, fixed elements, title pattern with one Bad/Good pair, tone shifts.>

<Repeat for each post type this blog publishes. For a type not listed, writers use
the blog-writing catalog with every voice rule above, and propose adding it here.>

## Exemplars

### <Move>: "<short label>"

> <Passage from an approved post, under 150 words.>

- <Rule it demonstrates.>

Source: <URL>

## Metric profile

Checked with `voice-metrics.mjs --profile VOICE.md`. Ranges come from the approved
posts; revise them only by re-measuring the corpus.

```json voice-profile
{
  "ranges": {
    "<metric>": [<min>, <max>]
  },
  "flagged_terms": ["<term>"]
}
```

## Changing this file

Revise this file when the author rejects a draft that follows every rule, edits
the same kind of sentence repeatedly, adds a post type, or wants the voice to
change. Use the `blog-writing` skill's voice workflow: add the new approved posts
to the corpus, re-measure, and update rules, examples, and ranges together.
Do not loosen a rule to make one draft pass. Record the change in "Last revised".
````

## Write the exemplars

Choose three to six passages, each under 150 words, from approved posts. Pick the
hardest-to-describe moves: an opening, an ending, an explanation, a disagreement,
a joke. Annotate each with the rules it demonstrates:

```markdown
### Opening: "The server went down at 2:14"

> The server went down at 2:14 on a Sunday, which is how I learned we had no
> alerts. I'd set up monitoring, technically. It emailed an address I'd stopped
> checking in 2021.

- Openings: first sentence is a specific event with a time.
- Humor: understatement aimed at the author's own decision ("technically").
- Syntax: a long sentence, then two short ones.

Source: <URL>
```

Use inspiration posts only for short quotes with attribution, labeled as
inspiration rather than the author's voice.

## Write a post format

Start from the matching type in [post types](post-types.md) and record
only what is specific to this blog:

1. The reader question this type answers on this blog.
2. A section skeleton with each section's job, using this blog's headings style.
3. The opening and ending moves for this type.
4. Fixed elements (prerequisites box, TL;DR, final code listing, diagram).
5. Title pattern with one Bad/Good pair.
6. Tone shifts from the voice, if any.

## Write the metric profile

Copy only the metrics that separated approved from rejected posts, with ranges from
the approved per-file values. Seed `flagged_terms` from
`scripts/tropes-profile.json`, minus words the author uses on purpose, plus the
author's own never-use list:

```json voice-profile
{
  "ranges": {
    "sentence_words_median": [10, 13],
    "sentence_words_sd": [6.5, 9],
    "contractions_per_1k": [25, 45],
    "first_singular_per_1k": [20, 38]
  },
  "flagged_terms": [
    "delve",
    "leverage",
    "seamless",
    "game-changer",
    "in today's"
  ]
}
```

Without approved posts to measure, leave `ranges` empty and keep `flagged_terms`.

## Calibrate before handing off

A well-formed `VOICE.md` can still produce the wrong voice. Test it:

1. Pick material from an approved post: its notes or facts, not its prose. Without
   showing the original, have a fresh agent or subagent write the post using only
   `blog-writing` and `VOICE.md`.
2. Run the metrics check against `VOICE.md`.
3. Show the author the generated passage and the original's matching passage
   without saying which is which. Ask which sounds more like them and what in the
   generated one is wrong.
4. Turn every complaint into a rule change or a new Bad/Good pair. Repeat once.

Calibration is complete when the author accepts a generated passage as theirs, or
names the remaining difference as accepted. Report which steps ran and which were
skipped.
