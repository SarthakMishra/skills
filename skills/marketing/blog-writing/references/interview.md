# Voice interview

Use this reference to grill the author until every voice rule is settled. Ask in
rounds of at most four questions. Wait for answers before asking questions that
depend on them. Read facts from the corpus yourself; ask the author only for
judgments.

## Show variants instead of asking for adjectives

Do not ask "How formal is your voice?" or "Do you want to sound witty?". Authors
answer those with words like "friendly but professional", which every writer
interprets differently.

Ask by contrast instead. Write the same short passage, 40 to 80 words, on a topic
from this blog, in two or three versions that differ on one dimension only. Ask
which one sounds like the author, and what they would change in it. The chosen
version, with their edits, becomes the rule's Good example.

Example question for the humor dimension, on a blog about running small web apps:

> Which of these sounds most like you?
>
> A: "The backup job had been failing for three weeks. Nobody noticed, because the
> failure email went to an inbox nobody reads."
>
> B: "The backup job had been failing for three weeks. Nobody noticed, because
> the failure email went to an inbox whose last visitor was, as far as I can tell,
> the person who created it."
>
> C: "The backup job had been failing for three weeks, silently, since failure
> notifications were routed to an unmonitored inbox."

A is plain. B adds a dry aside. C is formal. Facts, length, and order are held
constant so the answer measures only humor and formality. If the author picks B
but cuts the aside to half its length, the rule records that: dry asides allowed,
one clause long.

Keep variants honest:

- Change one dimension per question. Changing two makes the answer ambiguous.
- Use the author's real topics, never a neutral example about coffee or weather.
- Write each variant well. A deliberately weak option teaches nothing.
- Offer "none of these" and ask them to rewrite one sentence when nothing fits.

## Round 1: purpose and reader

Settle these before voice, because they decide which voice rules matter:

1. Who reads this blog, as one specific person: their job, what they already know,
   and what they were doing just before they clicked.
2. What the reader should do or believe after a post. ("Try the technique",
   "hire us", "trust my judgment on databases", "nothing, it's a journal".)
3. Where readers come from: search, Hacker News or Reddit, social, a newsletter,
   colleagues. This sets title and opening conventions.
4. Who writes: one author, a team, guest authors. A team blog needs rules that
   survive different writers.

## Round 2: confirm the corpus findings

Present the candidate profile from the corpus analysis as a short list: each
high-confidence rule in one line with one quoted example. Ask the author to strike
anything that is a habit they want to drop. Example:

> From your four approved posts:
>
> 1. You open with something that happened to you, with a number or time in it.
> 2. Your median sentence is 10 to 13 words, with big swings in length.
> 3. You use "I" constantly and almost never "we".
> 4. You end on what you do now, never a summary.
>
> Anything here you would rather stop doing?

## Round 3: resolve low-confidence rules and aspirations

Use variant questions for each queued item: dimensions where the corpus varied,
where rejected posts suggested a rule, and where inspiration posts differ from the
author's own. For an aspiration, show the author's current style next to the
inspiration's style on the same passage and ask which to adopt.

Ask about hard lines directly, because a corpus rarely reveals them:

- Words and phrases the author never wants to see under their name.
- Subjects, people, or companies that are off limits for jokes or criticism.
- Profanity, emoji, exclamation marks.
- Calls to action: allowed inside the prose, only at the end, or never.

## Round 4: post types

Ask which kinds of posts the blog publishes or wants to. Show the post-type
catalog in [post types](post-types.md) as a short list with one line each. Start
from the archetype that matches the blog:

| Blog archetype            | Usual post types                                                 |
| ------------------------- | ---------------------------------------------------------------- |
| Personal technical blog   | Experience report, opinion, explainer, tutorial, list of lessons |
| Company engineering blog  | Experience report, postmortem, explainer, research or data post  |
| Product or marketing blog | How-to, comparison, release post, case study, list post          |
| Newsletter or essay blog  | Opinion, personal essay, roundup, explainer                      |
| Tutorial site             | Tutorial, how-to, explainer, comparison                          |

For each selected type, ask only what the corpus cannot show: the usual length,
what the opening must contain, and any fixed sections (for example, "every
tutorial starts with the finished result and a list of prerequisites"). Then ask
which tone shifts apply to that type, using a variant question when unclear.

## Close the interview

The interview is complete when:

1. Every dimension in [voice dimensions](voice-dimensions.md) has a rule, an
   explicit "varies, no rule", or "not applicable" with a reason.
2. Every rule has a Bad/Good pair, and every Good example is either the author's
   own sentence or a variant they chose.
3. Every selected post type has a format decision and its tone shifts.
4. The author has seen the full profile on one screen and confirmed it.

Keep a decision record: the question, the variants shown, the answer, and the
rule it produced. Store it with the working notes, not inside `VOICE.md`.
