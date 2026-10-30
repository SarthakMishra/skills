# Blog writing

Write or revise nonfiction blog posts that sound like one specific blog, and
establish that blog's voice as `VOICE.md`. Invoke `$blog-writing` in Codex or
`/blog-writing` in Claude Code. The agent can also select it for matching
requests.

## Establish the voice once

`VOICE.md` works like `DESIGN.md` for a design system: one file in the blog's
repository (or a folder you choose) that records how the blog sounds. The skill
reads it before every draft or edit, so posts stay consistent.

1. **Collect posts.** You mark your own posts as approved or rejected, or bring
   three to five posts by other writers you want to sound closer to.
2. **Measure and read.** A bundled script measures sentence length and variation,
   contractions, pronouns, hedges, punctuation habits, and paragraph and heading
   density. The agent then reads every post for persona, humor, openings, endings,
   and recurring phrases.
3. **Grill you.** Instead of asking "how formal are you?", the agent shows the same
   passage written two or three ways and asks which one is you. Your choice and
   your edits become the rule's example.
4. **Write `VOICE.md`.** Each rule names where it applies, the target, the
   exception, a Bad/Good pair on your topics, and a check. The file also holds
   annotated passages from your posts, a format for each post type you publish,
   and metric ranges. A pointer in `AGENTS.md` makes agents read it.
5. **Calibrate.** A fresh agent writes from one of your posts' facts using only
   `VOICE.md`. You compare its passage with your original without knowing which
   is which, and every complaint becomes a rule change.

`VOICE.md` separates voice (stable identity), tone (planned shifts per post type,
such as no jokes in postmortems), and house style (spelling, numbers,
formatting). Voice covers five layers: stance, diction, syntax, page shape, and
the author's recurring moves.

```text
/blog-writing Set up VOICE.md for my blog in this repo. Posts are in
content/posts. I like the last four; the 2022 ones sound like documentation.
```

```text
/blog-writing I'm starting a newsletter about indie SaaS. I want to sound closer
to these three posts: [links]. Put VOICE.md in ~/writing/indie-saas/.
```

```text
/blog-writing This draft follows VOICE.md but doesn't sound like me. [draft]
Revise the voice.
```

## Write posts

Supply the belief you want to defend, who you are writing for, and the evidence
or experience behind it. A draft is enough for an editing request. Without
`VOICE.md`, the skill matches two or three posts you supply, or uses a plain
practitioner voice for one-off posts.

```text
$blog-writing Turn these notes into a post. My position: adding reviewers
doesn't automatically improve a decision. Keep it under 700 words.
[Notes with the decisions, constraints, and outcomes.]
```

```text
$blog-writing I want to compare Prisma and Drizzle for a new Next.js app.
Which post type fits, and what evidence do I need before drafting?
```

## Check the result

- The post follows `VOICE.md`, and
  `node scripts/voice-metrics.mjs <draft> --profile VOICE.md` passes or the
  exceptions are explained.
- The post type matches the reader's question, and the title's promise is paid
  off within the first three sentences.
- The post has tension: a problem or surprise, and a consequence.
- Missing evidence stays visible. First-person authority never comes from an
  invented experience.

[SKILL.md](SKILL.md) holds both workflows and points to focused references:

- Voice: [dimensions](references/voice-dimensions.md),
  [corpus analysis](references/corpus-analysis.md),
  [interview](references/interview.md), and the
  [VOICE.md template](references/voice-file.md).
- Craft: [post types](references/post-types.md),
  [narrative mechanics](references/narrative.md),
  [shareability](references/shareability.md),
  [structure examples](references/structure.md), and
  [revision examples](references/revision.md).

The metrics script needs Node.js 18 or later. Sales copy, social posts, SEO
audits, and publishing are outside its scope.
