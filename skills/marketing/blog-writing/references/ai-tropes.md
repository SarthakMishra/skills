# AI writing tropes

Use this reference in the revision pass to find and remove the patterns that mark
prose as machine-written. Each trope below has its tell, the fix, and a Bad/Good
rewrite. Fix a trope by saying the thing directly; swapping one ornament for
another leaves the problem in place.

A single instance can be fine. The tell is a cluster: several different tropes in
one post, or one trope repeated. `VOICE.md` wins over this list. If the author's
approved posts use "we" for their team, a few em dashes, or an occasional
fragment, those stay; the profile ranges decide how many.

All examples are invented. They follow one running topic, a team moving its CI
to a new provider, so the rewrites can be compared.

## Sentence patterns

| Trope                  | Tell                                                                                  | Write instead                                                                                                  |
| ---------------------- | ------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------- |
| Negative parallelism   | "It's not X, it's Y" framing ordinary points as reversals.                            | State Y. Keep the contrast only when readers actually believe X.                                               |
| Stacked negations      | "Not X. Not Y. Just Z." building fake suspense.                                       | State Z, with the number or fact that makes it notable.                                                        |
| Perfect triples        | Everything grouped in threes, back to back, every item in the same grammatical shape. | List as many items as exist, in the shapes the work needs. When every list has three, cut one or add a fourth. |
| Anaphora               | Several sentences in a row opening with the same words.                               | Merge into one sentence or a list.                                                                             |
| Self-answered question | "The result? Chaos."                                                                  | Make the statement: "Builds failed for two days."                                                              |
| Label-colon opener     | Naming the insight before giving it: "The truth: ...", "The reality: ...".            | Delete the label and keep the sentence.                                                                        |
| Inclusive hedge        | "Whether you're a solo developer or a team of fifty..." to avoid choosing a reader.   | Write for the one reader the post is for.                                                                      |
| "-ing" opener          | A participle clause before the subject: "Balancing speed and cost, teams often...".   | Subject first: "Teams trade speed for cost when...".                                                           |
| Semicolon symmetry     | Two matched clauses of equal weight joined by a semicolon.                            | A period, or a real connector ("but", "so"). A semicolon on its own is fine.                                   |
| False range            | "From X to Y" where X and Y are not on one scale.                                     | Name the actual items.                                                                                         |
| Comma-clipped tail     | A short phrase hung off a comma to finish sideways.                                   | End the sentence on its point, or give the tail its own sentence.                                              |
| "Not only... but also" | Inflating one point into two with "not only X, but also Y".                           | "X and Y", or only the one that matters.                                                                       |
| Empty -ing analysis    | "...highlighting its importance", "...reflecting broader trends".                     | Delete the tail, or state the specific consequence with evidence.                                              |

Bad:

> The migration wasn't a tooling problem. It was a trust problem. Not the runners.
> Not the caching. The people.

Good:

> The runners worked on day one. The team kept rerunning green builds on the old
> system for two weeks, because nobody trusted the new one yet.

Bad:

> Faster builds. Cheaper runners. Happier engineers.

Good:

> Builds dropped from 14 minutes to 6, and the monthly bill fell by $1,100.

Bad:

> We moved 40 pipelines in a week, highlighting the team's commitment to developer
> experience.

Good:

> We moved 40 pipelines in a week. Three needed rewrites because they depended on
> a Docker socket the new runners don't expose.

## Paragraph and post structure

| Trope                    | Tell                                                                                              | Write instead                                                                                                                               |
| ------------------------ | ------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------- |
| Fragment paragraphs      | Runs of very short sentences or fragments, each its own paragraph, for manufactured emphasis.     | Connected sentences of varied length. Keep a one-sentence paragraph for the turn in the argument.                                           |
| Sentence stacking        | Facts in separate sentences with nothing connecting them, so the reader supplies the logic.       | Connect them with "and", "but", "because", or "so", and vary the length: if three sentences in a row run about the same length, change one. |
| Preamble                 | Announcing what comes next: "Two constraints shape the design", "The more important point is".    | Start with the first constraint, or the point.                                                                                              |
| Stock opener             | Scene-setting clichés: "In today's fast-paced world", "In the ever-evolving world of".            | Open with the specific situation or claim.                                                                                                  |
| Compulsive counting      | Stating the count before a list: "Four reasons why".                                              | Give the reasons. Keep a number only when it is the point ("3 of 40 pipelines failed").                                                     |
| Enumerated prose         | "The first... The second... The third..." paragraphs.                                             | A real list, or prose connected by cause ("so", "because", "which meant").                                                                  |
| Premise stacking         | The evidence for a point, then the point, so it lands already made.                               | Put the point or question first, then only the evidence it needs.                                                                           |
| Reasoning leak           | Narrating the writing: "I want to be precise about this", "What this changes is worth unpacking". | Be precise. Unpack it.                                                                                                                      |
| Belaboring               | Defending a minor point against an objection nobody raised.                                       | State it once and move on.                                                                                                                  |
| Repetition               | One thesis restated across sections with new metaphors; whole passages duplicated.                | Say it once with the best evidence. Cut the restatements.                                                                                   |
| Fractal summaries        | Previews and recaps at every level: "In this section we'll", "As we've seen".                     | Headings and openings that state the point; no recaps.                                                                                      |
| "Despite its challenges" | Problems raised only to be dismissed in an upbeat close.                                          | Weigh the problem; say what it costs and whether it changes the conclusion.                                                                 |

Bad, preamble and premise stacking:

> Two questions shaped our decision. The old provider raised prices twice last
> year. Its macOS runners were often queued for ten minutes. Our contract renewed
> in March. So the real question became: should we move before the renewal?

Good:

> Should we move before the March renewal? The old provider had raised prices
> twice, and its macOS runners regularly queued for ten minutes.

Bad, enumerated prose:

> The first lesson is to inventory secrets. The second lesson is to pin runner
> images. The third lesson is to migrate the slowest pipeline first.

Good:

> Inventory the secrets before anything else, since a missing one fails silently.
> Pin runner images so a provider update can't change your build. Then move the
> slowest pipeline first: it shows the speedup and flushes out the hardest
> problems while the team is still paying attention.

Bad, sentence stacking:

> The old provider charged per minute. Our builds were slow. macOS runners queued.
> The bill grew every month.

Good:

> The old provider charged per minute, so every slow build cost us twice: once in
> waiting and again on the bill, which grew every month as macOS runners sat in
> the queue.

## Endings

| Trope                   | Tell                                                                    | Write instead                                    |
| ----------------------- | ----------------------------------------------------------------------- | ------------------------------------------------ |
| Signposted conclusion   | "In conclusion", "To sum up", "In summary".                             | End on the last point, decision, or consequence. |
| Tie-back                | Restating the answer and looping it back to the opening question.       | Stop after the answer.                           |
| Never-ending conclusion | Clause after clause, several final takeaways, a closing aphorism.       | One landing: the decision or the one action.     |
| Quotable one-liner      | A standalone line built to be screenshotted, with no information in it. | A sentence a reader could act on or check.       |

Bad:

> So, should you migrate your CI? In the end, it depends, but if you change one
> thing, audit your pipelines, measure what matters, and talk to your team. Speed
> is a feature, and the best build is the one you never wait for.

Good:

> We'd make the same move again, but we'd inventory every secret first.

## Tone

| Trope                    | Tell                                                                                            | Write instead                                                                   |
| ------------------------ | ----------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------- |
| Stakes inflation         | Every topic becomes world-historical.                                                           | The real stakes, with their number: minutes, money, users.                      |
| Promotional language     | Brochure copy: "seamless", "all-in-one", "unlocks", "elevates".                                 | Describe what it does and what it costs.                                        |
| False suspense           | "Here's the thing", "Here's the kicker", "the secret nobody talks about", "now more than ever". | State the point.                                                                |
| Teacher voice            | "Let's break this down", "Let's dive in", "Think of it as...".                                  | Explain directly. Use an analogy only when it is clearer than the thing itself. |
| Futurism pitch           | "Imagine a world where...".                                                                     | Describe what exists, or what the author built.                                 |
| False vulnerability      | Polished, risk-free confessions: "And yes, I'm biased".                                         | Name the specific bias or mistake and its consequence, or leave it out.         |
| Vague attribution        | "Experts say", "Industry reports suggest", one source inflated to "many".                       | Name the person or report and link it, or drop the claim.                       |
| Appeal to familiarity    | "A classic", "famously", "as we all know".                                                      | Give the evidence, or state the claim plainly.                                  |
| Historical name-dropping | Rapid lists of companies or eras to borrow authority.                                           | One relevant example, explained.                                                |
| Collaborative "we"       | "We" in a single author's post, or "we" meaning author and reader.                              | "I" for the author, "you" for the reader. Keep "we" for a named team.           |

Bad:

> Here's the thing: CI is the heartbeat of modern engineering. Experts agree that
> slow pipelines are quietly killing productivity, and this migration will
> fundamentally reshape how we ship.

Good:

> Our engineers waited about 40 minutes a day on CI. After the move, it's about 15.

## Word choice

| Trope               | Tell                                                                                                       | Write instead                                                                                      |
| ------------------- | ---------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------- |
| Magic adverbs       | "quietly", "deeply", "fundamentally", "remarkably", "arguably".                                            | Delete the adverb, or replace it with the fact it gestures at.                                     |
| Ornate nouns        | "landscape", "tapestry", "ecosystem", "paradigm", "synergy", "load-bearing", "gated".                      | The plain word: "field", "tools", "important", "requires".                                         |
| Stock AI vocabulary | Words such as "delve", "leverage", "robust", "myriad".                                                     | See [stock vocabulary](#stock-vocabulary).                                                         |
| Copula dodge        | "serves as", "stands as", "marks", "represents" in place of "is".                                          | "is" or "are".                                                                                     |
| "Where it lives"    | Locating an idea physically: "where the complexity actually lives".                                        | Say where it is: "most of the complexity is in the cache layer".                                   |
| Filler transitions  | "It's worth noting", "Importantly", "Interestingly", "Notably", "Additionally", "Moreover", "Furthermore". | Delete it; connect with "and", "but", "so", or "because" if a link is needed.                      |
| Invented labels     | Coined compounds used as if established: "the migration paradox", "pipeline creep".                        | Describe the thing. A coined term is allowed once, when it is exact and defined with its evidence. |
| Forced figures      | A clever simile or metaphor that clarifies nothing.                                                        | The literal description.                                                                           |
| Synonym cycling     | One referent renamed: pipeline, workflow, job, build process.                                              | Pick one name and repeat it.                                                                       |
| Self-echo           | A distinctive word from earlier reused as if it were a callback.                                           | Use the plain word the sentence needs.                                                             |

### Stock vocabulary

These words stand in for a plainer word or a missing detail. Cut the word first
and see whether the sentence needs anything; often the fix is the specific fact.
Swapping in a fancier synonym ("leverage" to "utilize", "delve" to "explore")
keeps the problem.

| Word                              | Usually means    | Write instead                                  |
| --------------------------------- | ---------------- | ---------------------------------------------- |
| delve                             | look into        | look at, dig into, check                       |
| leverage (verb), utilize, harness | use              | use, or name what it does                      |
| robust                            | strong, reliable | the reason it holds up: "survives a node loss" |
| seamless                          | it works         | say how it works, or what no longer breaks     |
| elevate                           | improve          | improve, or name the change                    |
| unlock, empower                   | enable, let      | lets you, gives you                            |
| navigate                          | deal with        | deal with, handle                              |
| streamline                        | simplify         | simplify, or name the steps removed            |
| underscore                        | show             | show, prove                                    |
| testament                         | proof            | the evidence itself                            |
| realm, landscape                  | field, market    | field, market, or the noun you mean            |
| tapestry                          | a mix            | mix, or name the things                        |
| myriad                            | many             | many, dozens, or the count                     |
| holistic                          | complete         | complete, or list the parts                    |
| paradigm shift                    | a big change     | the change, named                              |
| certainly                         | emphasis         | delete it                                      |

Bad:

> The pipeline serves as the backbone of our delivery ecosystem. Notably, the new
> workflow streamlines this build process, and the job quietly runs faster.

Good:

> The pipeline builds and deploys every change. On the new provider, it runs in
> 6 minutes instead of 14.

## Formatting

| Trope               | Tell                                                     | Write instead                                                                                                              |
| ------------------- | -------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------- |
| Em dash overuse     | Em dashes for every pause, aside, and pivot.             | Commas, parentheses, colons, or two sentences. Use the count in `VOICE.md`; without one, keep it to two or three per post. |
| Wh-headings         | "What we changed", "Why it matters", "Where we go next". | Headings that state the section's claim: "Pinned runner images stopped surprise failures".                                 |
| Title case headings | "Lessons From Our CI Migration".                         | Sentence case, unless the blog's house style says otherwise.                                                               |
| Bold-first bullets  | Every bullet opening with a bold phrase.                 | Plain bullets. Bold only a term being defined.                                                                             |
| Unicode arrows      | "Push → build → deploy" in prose.                        | Words: "a push triggers a build, which deploys". Match the blog's quote style.                                             |

## Run the pass

1. Search for the word-level tells with the bundled list:
   `node scripts/voice-metrics.mjs <draft> --profile scripts/tropes-profile.json`
   from this skill's directory. With `VOICE.md`, its `flagged_terms` replace this
   list: seed them from `scripts/tropes-profile.json` when writing the file, and
   drop any word the author's approved posts use naturally.
2. Read once for sentence patterns: negations before the point, triples,
   repeated openings, self-answered questions, label-colon openers, "-ing"
   openers, fragment runs, and stacked sentences with no connectors.
3. Read the opening, every section opening, and the ending for structure tropes:
   preambles, counts, recaps, tie-backs, and stacked final takeaways.
4. Read headings and lists for formatting tropes.

The pass is complete when no trope appears more than once in the post, and each
remaining instance is allowed by `VOICE.md` or carries information the plain
version would lose.
