# Narrative mechanics

Use this reference when a draft has the right facts but no pull: the reader can
stop anywhere without missing anything. Narrative here means the forces that make
a reader want the next paragraph. It applies to tutorials and explainers as much
as to stories. All examples are invented teaching material.

## Build the spine with And, But, Therefore

Before drafting, write the post's spine in one sentence of the form "X and Y, but
Z, therefore W". This is Randy Olson's ABT template, adapted from the South Park
writers' rule of replacing "and then" with "but" or "therefore" between beats.

- "And" sets up what the reader already accepts.
- "But" introduces the problem, contradiction, or surprise. Without it there is no
  reason to read on.
- "Therefore" is the consequence: what the author did, found, or recommends.

Bad, a topic with no tension:

> Our app uses server-side rendering, and we cache pages, and we use a CDN.

Good, a spine with a problem and a consequence:

> We server-render every page and cache it at the CDN, but logged-in users were
> getting each other's cached pages, therefore we now vary the cache on a session
> cookie and never cache account pages.

Apply the same test between sections. If the honest connective between two
sections is "and also", one of them is a detour or the order is wrong.

## Open a gap the reader can almost close

Curiosity comes from noticing a gap in what you know. In George Loewenstein's
information-gap account, it is strongest when the reader knows enough to see the
gap and feels close to closing it. A topic gives no gap. A total mystery gives no
foothold.

Bad, no gap:

> Caching is an important performance technique.

Bad, a gap with no foothold:

> What if everything you knew about performance was wrong?

Good, a specific gap the reader can almost answer:

> Our homepage got slower after we added a cache.

The reader knows what a cache should do, so the contradiction is visible and
specific. Close every gap the opening opens. An unanswered opening question reads
as a broken promise, not as depth.

## Pick an arc that fits the material

Most posts use one of three arcs. Choose by what actually happened.

| Arc                 | Shape                                                         | Fits                             |
| ------------------- | ------------------------------------------------------------- | -------------------------------- |
| Man in a hole       | Fine, then trouble, then climbing out better off.             | Experience reports, postmortems. |
| Investigation       | Symptom, wrong suspects, evidence, cause, fix.                | Debugging stories, explainers.   |
| Expectation flipped | The common belief, the case that broke it, the better belief. | Opinion posts, research posts.   |

A tutorial uses a small version of the first arc at each step: the reader has a
goal, hits the limit of what they have, and the step gets them past it.

## Dramatize the turning point, summarize the rest

A scene has a time, a place, an action, and often an exact quote, error message,
or number. A summary compresses events into a sentence. Use a scene for the moment
the post turns and summary everywhere else.

Bad, the turning point summarized:

> After some investigation, we found the problem was in the cache layer.

Good, the turning point as a scene:

> At 11 p.m. I diffed the response headers from two accounts. Both had
> `cache-control: public, max-age=3600`. The CDN was doing exactly what we told it.

Bad, routine work dramatized:

> On Tuesday morning I opened my laptop, made coffee, and started reading the
> CDN docs.

## State the stakes

Readers care about a problem in proportion to its cost. Name what was at risk:
money, time, users, data, reputation, the author's weekend. Use the real number
when there is one.

Bad: "This was a significant problem."

Good: "For 40 minutes, any logged-in user could see another user's order history."

## Prefer the concrete

Abstract claims are hard to remember and easy to dismiss. Pair each general claim
with a specific case, number, name, or piece of code. Chip and Dan Heath's
"Made to Stick" lists concreteness alongside simplicity, unexpectedness,
credibility, emotion, and stories as what makes ideas memorable.

Bad: "Large bundles hurt performance."

Good: "Our 1.2 MB bundle took 6 seconds to parse on a mid-range Android phone."

## Put the new information last

Readers expect a sentence to start with what they already know and end with what
is new. Gopen and Swan call the end the stress position. Put the payoff there.

Bad: "Six seconds of parse time was caused by the date library."

Good: "Most of the parse time came from one dependency: the date library."

Chain sentences the same way: the new information at the end of one sentence
becomes the familiar start of the next.

## Control the pace

- Alternate density. After a hard paragraph, give the reader an example, a scene,
  or a short sentence that restates the point in plain words.
- Vary sentence length. A run of equal-length sentences reads as monotone.
- Let transitions carry logic: "but", "so", "because", "which meant". Cut
  transitions that narrate the process: "Now let's look at", "Moving on to".
- Delay a payoff only when the reader knows it is coming. "The fix turned out to
  be one line. Finding it took two days." earns the next section.

## End when the gap is closed

The post ends when the opening's question has its answer and the reader knows what
to do with it. Common strong endings: the decision the author made, a callback to
the opening scene with its meaning changed, or the one action the reader should
take. Cut summaries of what the post just said.

Bad: "In conclusion, caching is powerful but must be used carefully."

Good: "We still cache every public page. We cache nothing with a session cookie,
and the homepage is fast again."
