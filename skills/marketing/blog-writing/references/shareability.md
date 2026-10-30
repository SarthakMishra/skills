# Shareability

Use this reference for titles, openings, headings, and a final pass on whether a
post gives readers a reason to share it. Nothing guarantees virality. What the
research supports is a set of traits that make sharing more likely, and none of
them work without a post that delivers. All examples are invented.

## What the evidence says

| Finding                                                                                                                                                                                        | Source and limits                                                                                                                  |
| ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| Content that evokes high-arousal emotions (awe, anger, anxiety) is shared more; low-arousal sadness is shared less. The effect holds after controlling for usefulness, interest, and surprise. | Berger and Milkman, 2012, nearly 7,000 New York Times articles shared by email, plus experiments. Correlational in the field data. |
| People share what makes them look informed (social currency), what is useful to others (practical value), and ideas carried inside stories.                                                    | Jonah Berger, "Contagious" (STEPPS). A popular synthesis, not a single study.                                                      |
| Readers scan before they read: they read the start of headings and paragraphs and skip much of the rest.                                                                                       | Nielsen Norman Group eye-tracking studies of web reading.                                                                          |
| Headline phrasing that wins on one platform can lose on another. Emotional phrases did well on Facebook; "how to" led on LinkedIn.                                                             | BuzzSumo headline analyses, 2017. Platform behavior changes; treat as illustration, not a rule.                                    |
| Technical communities penalize clickbait. Hacker News asks submitters to use the original title unless it is misleading or linkbait, and strips gratuitous numbers.                            | Hacker News guidelines.                                                                                                            |

## Give the reader a reason to forward it

Check that the post offers at least one of these, and make it explicit:

1. **Practical value.** The reader can do something faster, cheaper, or safer
   tomorrow. Make the reusable part easy to lift: a command, a checklist, a table,
   a code snippet.
2. **A new name for a known problem.** Readers share words that let them explain
   a thing they had felt but could not name. Coin the term only when it is exact.
3. **Earned surprise.** A result that contradicts what the reader expects, backed
   by evidence. Awe at how something works counts.
4. **Stakes the reader shares.** Anger or anxiety spread, but only when the facts
   justify them. Manufactured outrage costs trust that the next post needs.

Bad, nothing to forward:

> Here are some general thoughts on code review best practices.

Good, a named problem with a usable fix:

> I call it review drift: the PR that gets approved after the reviewer stopped
> reading at file four. Here is the four-line PR template that ended it on our team.

## Write a title that promises exactly what the post delivers

Readers often see only the first words of a title, so front-load the specific
part. Match the convention of where the post will be read: a title that works on
a social feed can get rewritten or ignored on Hacker News.

- Name the specific thing: the tool, the number, the outcome, the claim.
- Use a number only when it is meaningful ("3 bugs", "47 minutes"), not to signal
  a list.
- Promise what the post contains. A title the post cannot pay off loses the
  reader in the first paragraph.

| Bad                                          | Why it fails                  | Good                                                            |
| -------------------------------------------- | ----------------------------- | --------------------------------------------------------------- |
| "Thoughts on Database Performance"           | No claim, no specific thing.  | "One missing index made our dashboard take 9 seconds"           |
| "This Simple Trick Will Change How You Code" | Vague promise, reads as bait. | "Use `satisfies` instead of type annotations on config objects" |
| "10 Lessons From 10 Years of Freelancing"    | The number is decoration.     | "I raised my rate 3 times. Only one cost me a client."          |

## Make the opening pay off the title within three sentences

Readers decide in the first lines whether the title's promise is real. The
opening states the specific situation or claim the title promised. Background,
definitions, and the author's history come later, where the reader wants them.

Bad:

> Databases are at the heart of most modern applications. In this post, I'll
> share my experience with database performance.

Good:

> Our dashboard took 9 seconds to load. The query behind it scanned 4 million
> rows to find 30. One index fixed it, and finding which one took a day.

## Make the skim tell the story

Many readers read only headings, the first sentence of paragraphs, code, and
bold text. Write those so a skimmer gets the argument.

- Headings state the section's point, not its topic.
- The first sentence of each paragraph carries its claim.
- Code and tables have a sentence before them saying what to notice.

Bad headings: "Background", "The Problem", "Our Approach", "Results".

Good headings: "The dashboard query scanned 4 million rows", "EXPLAIN pointed at
the wrong table", "A composite index on (account_id, created_at)", "9 seconds to
120 ms".

## Pre-publish check

1. The title names a specific thing, and the post delivers it.
2. The first three sentences pay off the title.
3. Reading only headings gives the argument.
4. The post offers practical value, a new name, earned surprise, or shared stakes,
   and that part is easy to quote or copy.
5. Every emotional claim is backed by facts in the post.
