---
name: blog-writing
description: Write or revise nonfiction blog posts in a specific blog's voice, and establish or revise that blog's VOICE.md from its posts and an author interview. Covers angle, post type, narrative, titles, and factual checks. Use when drafts sound generic or inconsistent. Skip sales copy, social posts, SEO audits, and neutral documentation.
compatibility: The voice metrics script needs Node.js 18 or later.
---

# Blog writing

Write posts that sound like one specific blog, using that blog's `VOICE.md`.
`VOICE.md` is the blog's single voice entry point, like `DESIGN.md` for a design
system: it owns identity (stance, diction, rhythm, page shape, recurring moves,
house style, and the blog's post formats). This skill owns craft that applies to
every blog: material, post type, narrative, revision, shareability, and factual
integrity. It also establishes and revises `VOICE.md`.

Choose the branch from the request:

- **Establish or revise the voice:** the user asks to set up a blog's voice, a
  draft was rejected as "not me", or the voice or post formats change. Follow
  [establish the voice](#establish-the-voice).
- **Write or edit a post:** follow [write a post](#write-a-post). For a focused
  edit, use only the relevant steps.

Preserve the author's position, useful quirks, and factual qualifications. Remove
unsupported overclaims when the draft already supplies a defensible position;
flag a proposed change of belief. Preserve code, links, and publishing metadata
unless the request includes them. Keep planning notes private unless requested;
deliver the requested prose without adding SEO or publishing work.

## Establish the voice

Build `VOICE.md` from the author's posts and judgments, never from adjectives.
Run every step for a new blog; for a revision, read the existing file and obtain
only the new evidence: a rejected draft, new approved posts, a new post type, or a
deliberate change.

1. **Find the blog and its voice file.** Identify the blog's name, URL or posts
   directory, and author. Look for `VOICE.md` or an equivalent style guide at the
   repository root, in the content root, through a pointer in `AGENTS.md` or
   `CLAUDE.md`, or at a path the author gives. Done means the target file and the
   requested change are named.
2. **Collect and measure the corpus.** Follow
   [corpus analysis](references/corpus-analysis.md): get the author's approved and
   rejected posts or inspiration posts before asking anything about voice, run
   `scripts/voice-metrics.mjs` on each group, and close-read every layer in
   [voice dimensions](references/voice-dimensions.md). Done means one candidate
   rule or "varies" per dimension, each with quoted evidence and confidence, plus
   an interview queue. With no posts at all, skip to the interview.
3. **Grill the author.** Follow [interview](references/interview.md). Use the
   `grilling` skill when available; the reference supplies the questions either
   way. Ask by contrast: the same passage on this blog's topic in two or three
   versions that differ on one dimension. Choose post types from
   [post types](references/post-types.md). Done when the
   [closing conditions](references/interview.md#close-the-interview) hold.
4. **Write `VOICE.md`.** Follow [VOICE.md](references/voice-file.md) for location,
   template, exemplars, post formats, metric profile, and the `AGENTS.md`
   pointer. Hold every rule to the
   [five-part form](references/voice-dimensions.md#write-rules-that-leave-no-room-for-interpretation);
   rewrite or delete a rule that two writers would apply differently.
5. **Calibrate and report.** Run the
   [calibration](references/voice-file.md#calibrate-before-handing-off): a fresh
   writer drafts from an approved post's facts using only this skill and
   `VOICE.md`, and the author compares the result blind with the original.
   Report the file path, corpus size, metrics that became ranges, rules without
   an author-sourced Good example, and the calibration result. Without a blind
   comparison, report the voice as uncalibrated.

On every voice run, ask the author for judgments, never for facts the corpus
shows. Use the author's real sentences as Good examples and the generic default
model version as Bad. Treat inspiration posts as technique: never copy another
writer's anecdotes, persona claims, catchphrases, or more than two sentences.
Keep the corpus, working notes, and decision record outside `VOICE.md`, and ask
before writing outside the current repository.

## Write a post

### 1. Load the blog's voice

Find the blog's `VOICE.md` as in voice step 1.

- **Found:** read it. Its voice rules, tone shifts, lexicon, house style, and post
  formats replace the default voice in step 4 and the matching skeleton in
  [post types](references/post-types.md). Every other step still applies.
- **Not found, ongoing blog:** offer once to establish the voice first; it makes
  drafts consistent across posts. If the user prefers to write now, ask for two or
  three published posts the author likes. Match their point of view, sentence
  length and variation, contractions, paragraph length, opening move, and ending
  move, and replace the matching rows of the default voice.
- **Not found, one-off post or the user declines:** use the default voice in
  step 4.

Finish with the voice source named: a `VOICE.md` path, sample posts, or the
default.

### 2. Discover the material worth using

Read for what surprises, troubles, delights, or changes the author's mind.
Identify the specific question or disagreement that makes this worth a post.
Start with the material; let an initial thesis change when the facts resist it.

Make brief notes for useful scenes, observations, quotations, explanations, and
objections, keeping each attached to its source. A short post may need only a few
bullets. Separate observation from interpretation and proposed advice. Select
details that establish a situation or reveal a choice, not merely decorate it.

If given only a topic, propose a defensible angle without assigning it to the
author as an endorsed belief. If an indispensable experience is missing, ask for
what happened, what the author did, or what changed. For an argument that needs
no anecdote, work from the supported judgment. Never invent personal authority.

This stage is complete when there is a promising question or claim, concrete
material to develop it, and a clear account of what is missing.

### 3. Choose the type, spine, and order

Read [post types](references/post-types.md) and choose the type from the reader's
question. Use the matching format in `VOICE.md` when it has one.

Write the spine as one And, But, Therefore sentence using
[narrative mechanics](references/narrative.md). If you cannot write the "But", the
material has no tension yet; return to step 2. Pick the arc that matches what
happened and the turning point to dramatize.

Try a lead drawn from the material: a revealing action, an anomaly, or the actual
dispute. It opens a specific gap the reader can almost close. Choose a
provisional ending from the same material. Draft the title with
[shareability](references/shareability.md#write-a-title-that-promises-exactly-what-the-post-delivers):
it names the specific thing, and the opening pays it off within three sentences.

Arrange the note groups between opening and ending. For worked examples of
selecting, ordering, juxtaposing, and ending, read
[structure examples](references/structure.md). Events and conversations stay in
their real times and places; signal a jump in time and preserve causation. The
order works when each section connects to the next with "but" or "therefore", not
"and also".

### 4. Draft in the voice

With `VOICE.md`, apply its rules as written. Without it, use this default
voice, and keep it consistent across the post:

| Dimension     | Default                                                                                                 |
| ------------- | ------------------------------------------------------------------------------------------------------- |
| Persona       | A practitioner telling a capable peer what they found and what they would do.                           |
| Point of view | "I" for the author's experience and judgment, "you" for the reader in advice.                           |
| Confidence    | State the judgment. Hedge only an untested claim, and say what is untested.                             |
| Formality     | Contractions, plain verbs ("set up", not "configure"), no nominal phrases ("perform an investigation"). |
| Sentences     | Mostly 8 to 20 words with deliberate variation. Follow a long sentence with a short one.                |
| Paragraphs    | Two to four sentences. A one-sentence paragraph only for the turn in the argument.                      |
| Humor         | Only from an accurate detail. None in headings, steps, or incidents.                                    |
| Headings      | Sentence case. Each states the section's point.                                                         |

For a new draft or substantial voice rewrite without `VOICE.md`, read the
[worked voice example](references/revision.md#a-complete-voice-revision).

Let actions, quotations, and adjacent facts do some of the arguing. Explain a
serious objection in the language of the dispute, without announcing a mandatory
counterargument section. Retain uncertainty that changes the conclusion; cut
hedging that merely postpones stating it. Introduce people and unfamiliar terms
directly. Prefer the observed detail to an adjective that tells the reader how
impressed or angry to be.

Get a complete draft before perfecting sentences. If stuck, explain the material
plainly to one interested person, then remove the conversational preamble.

### 5. Revise at different scales

Use the relevant [revision examples](references/revision.md) for a flat voice,
unclear reference, approximate wording, or a draft that needs cutting.

1. Structure: name each section's job. Merge passages doing the same job, move
   background to where the reader wants it, and cut detours that belong in
   another post. Check that the spine still holds and every opened gap closes.
2. Voice: with `VOICE.md`, run
   `node scripts/voice-metrics.mjs <draft> --profile <path>/VOICE.md` from this
   skill's directory. Fix every flagged term; revise each out-of-range metric or
   state why this post is an exception. Point at one sentence that satisfies each
   voice rule, and compare the opening and ending with its exemplars. Without
   `VOICE.md`, check the default table above.
3. Sound: read aloud when possible. Repair places where the reader must backtrack,
   where a transition narrates the process, or where every paragraph lands with
   the same rhetorical trick.
4. Words: mark words that are wrong, vague, or merely adequate and revisit each.
   Choose by exact meaning; keep the original when it is right.
5. Tropes: run the [AI tropes pass](references/ai-tropes.md#run-the-pass). Rewrite
   each trope by stating its point directly, and keep only instances `VOICE.md`
   allows.
6. Cut: remove explanation the details already supply, redundant modifiers, and
   recaps after the real ending. Shortening succeeds when meaning, tone, and
   rhythm survive.
7. Reach: run the [pre-publish check](references/shareability.md#pre-publish-check).

### 6. Check what the prose claims

Ask how the author could know each factual assertion, including implications of
words such as "only," "first," "always," and "because." Recheck numbers, dates,
comparisons, descriptions, and analogies after editing. When research is allowed,
trace claims to primary evidence; several accounts repeating one source do not
independently confirm it.

Keep quotations faithful in wording and context. Paraphrase when exact wording is
unavailable; never relocate dialogue, invent connective events, or insert a
plausible number to smooth the draft. See
[factual integrity](references/revision.md#factual-integrity) when sharpening a
claim or handling incomplete evidence.

Ask for essential missing facts, narrow the claim, or mark the gap in an
unfinished draft. Keep relevant source links near supported claims. Deliver the
requested post. For an edit, briefly note substantive changes unless the user
requests prose only. Report the voice source from step 1, any voice metric left
out of range with its reason, and unresolved factual gaps. A finished result
supports its claims, follows the loaded voice, and has no hidden factual gaps.

When the author rejects or heavily rewrites a draft that follows `VOICE.md`,
propose a voice revision through [establish the voice](#establish-the-voice)
instead of fixing only this post.
