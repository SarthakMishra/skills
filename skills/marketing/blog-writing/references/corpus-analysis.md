# Corpus analysis

Use this reference to collect sample posts, measure them, and turn the evidence
into candidate voice rules. Finish with a candidate profile in which every rule
has evidence and a confidence level, and every low-confidence rule is queued for
the interview.

## 1. Collect and label the corpus

Ask for the posts first, before any question about voice. People describe their
voice inaccurately; they recognize it reliably.

Accept three sources and label every file with one of them:

| Label         | What it is                                                     | What it can establish                               |
| ------------- | -------------------------------------------------------------- | --------------------------------------------------- |
| `approved`    | The author's own posts they would happily publish again.       | The voice, with numeric ranges.                     |
| `rejected`    | The author's own posts they think missed, and why in a phrase. | What the voice is not. Differences from `approved`. |
| `inspiration` | Posts by other writers the author wants to sound closer to.    | Aspirations to confirm in the interview.            |

1. For an existing blog, list its posts (from the repo, sitemap, RSS feed, or
   archive page) and ask the author to mark approved and rejected posts. Show
   titles and dates so the choice is fast. Suggest the five most recent posts
   when the author has no preference.
2. For a new blog or an author who dislikes their old posts, ask for three to
   five inspiration posts and one sentence on what they like about each.
3. Save each post as Markdown in a working folder, one file per post, in
   subfolders named by label. Keep the source URL at the top of the file.

Aim for at least three approved posts or about 3,000 words. With less, the
numbers are unstable; widen the ranges and lean on the interview. Record the
corpus size in the profile so later revisions know how firm it was.

### Treat inspiration as technique, not content

Inspiration posts teach moves and ranges. Never copy their phrases, anecdotes,
catchphrases, persona claims ("as a former Googler"), or topics into the voice
skill. Quote at most one or two sentences per post as calibration, with a link.
When the inspiration and the author's own approved posts disagree, the author's
posts win unless the author says otherwise in the interview.

## 2. Measure

Run this skill's metrics script on each label separately, from the skill directory
or with the script's full path:

```sh
node scripts/voice-metrics.mjs corpus/approved --per-file
node scripts/voice-metrics.mjs corpus/rejected
node scripts/voice-metrics.mjs corpus/inspiration
```

The script excludes code blocks, tables, block quotes, and front matter from prose
measurements, and approximates readability. Save the output in the working notes.

Read the numbers as comparisons, not grades:

- A metric is a voice signal when approved posts sit in a tight band and rejected
  posts sit outside it.
- A metric with a wide spread across approved posts is not a rule. Record it as
  "varies" and leave it out of the profile ranges.
- A large gap between inspiration and approved posts is an aspiration. Queue it
  as an interview question instead of adopting it.

Set each profile range from the approved posts: the lowest and highest per-file
value, widened slightly when there are fewer than five posts. Keep only metrics
that are signals.

## 3. Close-read every layer

Numbers cannot see stance or moves. Read every approved post once per layer in
[voice dimensions](voice-dimensions.md), in this order: moves, stance, diction,
syntax, page shape. For each dimension, record:

- the observation in one sentence,
- two or three verbatim quotes with their file,
- whether rejected posts differ,
- confidence: high when every approved post shows it, medium when most do, low
  when it is rare or contradicts a rejected post.

Pull these specifically, because they identify a writer quickly:

1. The first three sentences of every post.
2. The last paragraph of every post.
3. Every joke, aside, and analogy.
4. Words and phrases that appear in more than one post and are not topic words.
5. How the author introduces code, a number, a quotation, and a disagreement.

## 4. Draft candidate rules

Turn each observation into a rule using the five-part form in
[voice dimensions](voice-dimensions.md#write-rules-that-leave-no-room-for-interpretation).
Use the author's own sentences as the Good example whenever one exists. Write the
Bad example as the generic version a default model would produce on the same
topic.

The stage is complete when every applicable dimension has a candidate rule or an
explicit "varies, no rule", and every low-confidence rule and aspiration is in the
interview queue.

## Worked example

Corpus: four approved posts and one rejected post from a fictional blog about
running small web apps. The rejected post was marked "sounds like documentation".

Measured (approved, per-file range):

| Metric                  | Approved   | Rejected |
| ----------------------- | ---------- | -------- |
| `sentence_words_median` | 10 to 13   | 19       |
| `sentence_words_sd`     | 7.1 to 8.4 | 4.2      |
| `contractions_per_1k`   | 28 to 41   | 3        |
| `first_singular_per_1k` | 22 to 35   | 0        |
| `questions_per_1k`      | 1 to 9     | 0        |
| `headings_per_1k`       | 3.8 to 4.6 | 11       |

Reading: sentence length median, spread, contractions, and first person separate
approved from rejected, so they become profile ranges. Questions vary widely
across approved posts, so they get no range. The rejected post had many more
headings, which suggests a rule about headings; confidence is medium with one
rejected post, so it goes to the interview.

Close-read openings, quoted from the four posts:

> "The server went down at 2:14 on a Sunday, which is how I learned we had no alerts."
> "I've paid Heroku $1,900 for a blog that gets 300 visitors a day."
> "My deploy script is 40 lines of Bash, and I'm done apologizing for it."
> "Last week a reader emailed to ask why my site loads so fast."

Observation: every post opens with a specific number, time, or event from the
author's own experience in the first sentence. Confidence: high.

Candidate rule:

> **Openings.** The first sentence reports something that happened to the author,
> with a number, a time, or a named tool in it. No definition, history, or preview
> of the post.
>
> Bad: "Monitoring is an essential part of running any production application."
>
> Good: "The server went down at 2:14 on a Sunday, which is how I learned we had
> no alerts."
>
> Check: a reviewer can point at the specific detail in sentence one.

Contrast with a rule the evidence does not support:

> Bad candidate: "The author is witty." No dimension, no target, and two writers
> would read it differently.
>
> Better: two jokes appear across four posts, both understatement about the
> author's own mistakes ("which is how I learned we had no alerts"). Candidate:
> "Humor is rare and only aimed at the author's own decisions. Understatement,
> never exaggeration." Confidence: medium, so confirm it in the interview with an
> A/B pair.
