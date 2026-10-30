# Voice dimensions

Use this reference to name what a blog's voice is made of, measure it in a corpus,
and write rules that two different writers would apply the same way. Every rule in
`VOICE.md` belongs to one dimension below.

## Voice, tone, and house style

People say "tone of voice" for three different things. Keep them apart, because
each one changes at a different rate.

| Term        | What it is                                                                 | Changes when                                                     | Example rule                                                                            |
| ----------- | -------------------------------------------------------------------------- | ---------------------------------------------------------------- | --------------------------------------------------------------------------------------- |
| Voice       | The stable identity: who is talking, to whom, and with what attitude.      | Almost never. A change is a rebrand.                             | "Talk as a practitioner reporting what happened, not as a teacher grading the reader."  |
| Tone        | A planned shift of the voice for a post type or situation.                 | Per post type or situation, such as an outage or a launch.       | "In postmortems, drop jokes and drop intensifiers. Keep first person and contractions." |
| House style | Mechanical conventions: spelling, capitals, numbers, code and link format. | When the publication decides. Most rules are binary and checked. | "Use US spelling. Write numbers under 10 as words, except with units: 3 ms, 8 GB."      |

Record tone as a difference from the voice, never as a second voice. A tone rule
names the dimension it moves and how far: "Postmortem: humor off, hedging allowed
for unconfirmed causes, everything else unchanged."

## The same facts in three voices

Material: a team moved its test suite from Jest to Vitest. CI time dropped from
14 minutes to 6. Two snapshot tests broke because the serializers differ. The fix
took an afternoon.

Voice A, a practitioner talking to a peer:

> We switched to Vitest and CI went from 14 minutes to 6. That's the headline.
> The footnote is two snapshot tests that broke because Vitest serializes objects
> differently. Budget an afternoon for that, not a sprint.

Voice B, a company engineering blog:

> After migrating our test suite from Jest to Vitest, median CI duration fell from
> 14 to 6 minutes. The migration required changes to two snapshot tests, which
> failed because of differences in object serialization. Both were resolved within
> a day.

Voice C, a personal essay with a dry joke:

> I expected the Vitest migration to eat a week. It ate an afternoon, and most of
> that went to two snapshot tests arguing about how to print an object. CI now
> finishes in 6 minutes instead of 14, which is roughly one coffee fewer per push.

None of these is better in the abstract. They differ on these dimensions:

| Dimension       | A                                | B                                                               | C                            |
| --------------- | -------------------------------- | --------------------------------------------------------------- | ---------------------------- |
| Point of view   | "we", addressing a peer          | "our", institutional                                            | "I", personal                |
| Formality       | Contractions, plain verbs        | No contractions, nominal phrases ("migration required changes") | Contractions, plain verbs    |
| Opening move    | Result first                     | Context first, result second                                    | Expectation, then reversal   |
| Humor           | None                             | None                                                            | Personification, coffee joke |
| Advice          | Explicit ("Budget an afternoon") | None                                                            | None                         |
| Sentence length | Short, varied                    | Long, even                                                      | Medium, one long build       |

This is the level of difference `VOICE.md` must pin down. A rule like "be
conversational" allows all three versions. A rule like "open with the result,
use 'we' for the team and 'you' for the reader, and end a technical section
with the advice it implies" allows only A.

## Write rules that leave no room for interpretation

A voice rule passes when two writers given the same material would produce
sentences that the author accepts as theirs. Each rule needs five parts:

1. Scope: where it applies (every sentence, openings, instructions, headings).
2. Target: a choice, a range from the corpus, or a named move.
3. Exception: when to break it, if ever.
4. A Bad/Good pair on a topic this blog actually covers.
5. A check: a metric from `voice-metrics.mjs` or a sentence a reviewer can point at.

| Vague rule                   | Specific rule                                                                                                                                                                                                                   |
| ---------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Be conversational.           | Use contractions everywhere except for emphasis ("do not" when the warning matters). Corpus range: 25 to 40 per 1,000 words. Address the reader as "you". Use "I" for the author's experience; never "we" for the author alone. |
| Keep sentences short.        | Median sentence 11 to 14 words. Follow any sentence over 30 words with one under 10. One-sentence paragraphs are allowed once per section, for the turn in the argument.                                                        |
| Be confident.                | State the judgment without "I think" or "arguably". Hedge only a claim the author has not tested, and say what is untested: "I haven't tried this above 10k rows."                                                              |
| Use humor where appropriate. | Allow one dry aside per section, in prose only. No jokes in headings, steps, code comments, or anything about an outage. The joke comes from an accurate detail, never a pop-culture reference.                                 |
| Avoid jargon.                | Assume the reader has shipped a web app. Use "SSR", "hydration", and "CI" undefined. Define anything from databases, ops, or ML on first use in one clause.                                                                     |

Numbers in rules come from the corpus measurements, not from general advice. A
range that the author's best posts sit inside is a project default; a number from
a generic readability guide is decoration.

## Layer 1: Stance

Stance decides who is talking and what they think of the subject and the reader.
It is the layer readers notice first and generic AI prose misses most.

### Persona and relationship

- Decides: the speaker's role relative to the reader. Common roles: peer
  practitioner, field reporter, mentor, critic, insider explaining an institution,
  fellow learner.
- Evidence: who explains to whom, whether the author admits mistakes, whether
  advice is offered or imposed.
- Vague: "Sound like an expert."
- Specific: "Talk as a peer who did the work last month. Share what happened and
  what you would do now. Do not grade the reader's choices or tell them what they
  'should already know'."

### Point of view

- Decides: the pronouns for author, team, and reader.
- Spectrum: first singular, first plural, second person, impersonal.
- Measure: `first_singular_per_1k`, `first_plural_per_1k`, `second_person_per_1k`.
- Specific: "'I' for the author's experience and opinions, 'we' only for the named
  team, 'you' for the reader in advice and steps. No impersonal 'one'."

### Confidence and hedging

- Decides: how firmly claims are made and how uncertainty is shown.
- Measure: `hedges_per_1k`; also read for qualifiers on claims the author tested.
- Bad: "It could arguably be said that caching might help in some cases."
- Good: "Cache the rendered page. I measured a 4x drop in p95 on our blog; I have
  not tested pages with per-user content."

### Opinion density

- Decides: how often the author states a judgment, and whether posts take sides.
- Evidence: count explicit judgments per section; note whether disagreement names
  the opposing position.
- Specific: "Every post states the author's position in the first three
  paragraphs. Disagree with a named practice, not with an imaginary 'some people'."

### Enthusiasm

- Decides: emotional temperature. Spectrum: enthusiastic to matter-of-fact.
- Measure: `exclamations_per_1k`, `intensifiers_per_1k`.
- Specific: "Show enthusiasm through the specific thing that impressed the author
  ('it cold-starts in 40 ms'), never through 'amazing', 'incredibly', or '!'."

### Humor

- Decides: whether jokes exist, what kind, and where they are allowed.
- Spectrum: none, dry, playful, absurd. Also the source: self-deprecation,
  understatement, exaggeration, pop culture, wordplay.
- Specific: name the kind, the frequency, the allowed locations, and the banned
  subjects. Include two real jokes from the corpus as calibration.

### Respect and irreverence

- Decides: attitude to the reader, to competitors, to the field's sacred cows,
  and to profanity.
- Specific: "Mock ideas, never people or readers. Name competitors only with a
  verifiable comparison. Mild profanity ('this is a damn mess') at most once per
  post; none in titles."

## Layer 2: Diction

Diction decides the words. It carries most of the formal or casual feeling.

### Formality

- Decides: contractions, slang, phrasal verbs ("set up") versus Latinate words
  ("configure", "utilize"), nominal phrases ("perform an investigation") versus
  verbs ("investigate").
- Measure: `contractions_per_1k`.
- Bad (for a casual blog): "Upon completion of the configuration process, users
  are able to initiate deployment."
- Good: "Once that's set up, you can deploy."

### Technical density

- Decides: the reader's assumed knowledge and which terms need definition.
- Specific: name the assumed baseline as a person ("has shipped a React app but
  never run Postgres in production") and list terms used undefined versus terms
  defined on first use.

### Concreteness

- Decides: how often abstract claims are paired with numbers, names, code, or
  observed events.
- Evidence: count abstract sentences ("performance improved") that have no
  concrete follow-up in the same paragraph.
- Specific: "Every claim of improvement carries the number and the baseline.
  Every general lesson is followed by the case it came from."

### Lexicon

- Decides: signature words and phrasings, banned words, spelling variety, and
  naming of products and concepts.
- Record three lists: words the author uses that define them, words they never
  use, and fixed spellings ("JavaScript", "Postgres", "email", "open source").
- Seed the never-use list from `scripts/tropes-profile.json` and the word-choice
  tropes in [AI tropes](ai-tropes.md#word-choice), then remove any word the
  author's approved posts use naturally.

### Figurative language

- Decides: how often metaphors and analogies appear and where they come from.
- Specific: "At most one extended analogy per post, from physical work
  (plumbing, carpentry, kitchens). Drop it after it has done its job; do not
  return to it in every section."

## Layer 3: Syntax and rhythm

Syntax decides the shape of sentences. Readers feel it as pace.

### Sentence length and variation

- Decides: typical length and how much it varies.
- Measure: `sentence_words_median`, `sentence_words_p90`, `sentence_words_sd`,
  `short_sentence_pct`, `long_sentence_pct`.
- A low standard deviation reads as monotone, whatever the mean. Record both.

### Sentence construction

- Decides: subordinate clauses, parentheticals, asides, fragments, and lists
  inside sentences.
- Measure: `parentheticals_per_1k`, `em_dashes_per_1k`, `semicolons_per_1k`.
- Specific: "Put the main clause first. Use parentheses for asides the reader can
  skip. Fragments are allowed as the second beat after a long sentence."

### Grammatical strictness

- Decides: which textbook rules the author keeps and which they break on purpose.
- Record each as allowed or not allowed: starting with "And" or "But", sentence
  fragments, ending with a preposition, split infinitives, singular "they",
  one-word sentences, lowercase style, "gonna" and similar spoken forms.
- Specific: "Start sentences with 'But' and 'So' freely. Fragments only for
  emphasis, at most two per section. Everything else follows standard grammar."

### Information order

- Decides: where the important word lands.
- Default craft rule: put familiar information at the start of the sentence and
  the new or important information at the end, where readers place stress.
- Bad: "A 60% drop in build time was what we saw after removing the barrel files."
- Good: "We removed the barrel files, and build time dropped 60%."

### Questions

- Decides: rhetorical and reader-directed questions.
- Measure: `questions_per_1k`.
- Specific: "One question at most per section, and only a question the next
  paragraph answers. No question headings."

## Layer 4: Page shape

Page shape decides how a post looks before anyone reads a word.

### Paragraphs

- Measure: `paragraph_sentences_mean`, `one_sentence_paragraph_pct`.
- Specific: "Two to four sentences per paragraph. A one-sentence paragraph marks
  the turn in the argument, not every punchline."

### Headings

- Decides: density, case, and style: descriptive ("Cache the rendered page"),
  claim ("Caching beats a bigger server"), question, or playful.
- Measure: `headings_per_1k`.
- Specific: "Sentence case. Each heading states the section's claim, so a reader
  who only reads headings gets the argument."

### Lists, tables, code, and emphasis

- Measure: `list_items_per_1k`, `tables_per_1k`, `code_blocks_per_1k`,
  `bold_per_1k`, `links_per_1k`.
- Specific: "Prose for reasoning, lists only for parallel items a reader will scan
  or copy. Tables for comparisons of three or more options. Bold at most once per
  section, for the term being defined."

### Punctuation habits

- Decides: em dashes, semicolons, exclamation marks, ellipses, emoji, Oxford
  comma, and quotation style.
- Measure: `em_dashes_per_1k`, `semicolons_per_1k`, `exclamations_per_1k`.
- Record each as a number or a ban. Em dashes are a common tell of generated prose;
  if the corpus has few, set the range from the corpus, not from habit.

## Layer 5: Moves

Moves are the author's recurring choices at the level of paragraphs and posts.
They are the hardest layer to copy and the most identifying.

### Openings

- Decides: the first move. Options: result first, scene, anomaly, claim, question,
  quotation, confession of a mistake.
- Evidence: the first three sentences of every corpus post.
- Specific: "Open with the moment something broke or surprised the author, in
  past tense, within the first two sentences. No definitions, history, or
  'In this post, I will'."

### Explanations

- Decides: the order of explanation: example first, definition first, analogy
  first, or code first; and how much hand-holding steps get.
- Specific: "Show the failing code, then explain why it fails, then show the fix.
  Never define a concept before the reader has seen why it matters."

### Evidence

- Decides: what counts as support: personal experience, benchmarks, citations,
  quotes, code, screenshots.
- Specific: "Benchmarks name the machine, data size, and runs. Links go to primary
  documentation, not to other blogs summarizing it."

### Digressions

- Decides: whether asides and tangents are part of the charm or cut on sight.
- Specific: "One tangent per post at most, marked with 'An aside:' and kept to one
  paragraph."

### Endings

- Decides: the last move. Options: decision, consequence, callback to the opening,
  open question, next step, no ending beyond the last point.
- Specific: "End on what the author does now. No summary of the post, no 'What do
  you think?', no newsletter plug inside the prose."

## Mark what is not part of the voice

Some traits in a corpus are accidents: an old editor's habit, a template, posts
written in a hurry. Mark a trait as voice only when it appears in posts the author
approves of and is absent from, or weaker in, posts they reject. Everything else is
recorded as "observed, not adopted".
