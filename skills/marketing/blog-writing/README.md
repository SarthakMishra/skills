# Blog writing

Find an angle and write or revise nonfiction blog posts with a clear position,
conversational language, and practical consequences. The skill works from your
notes, sources, or draft. It turns a vague request for "voice" into choices about
the argument, evidence, structure, and sentences.

Invoke `$blog-writing` in Codex or `/blog-writing` in Claude Code. The agent can
also select it automatically for matching blog-writing requests.

## Give it material

Supply the belief you want to defend, who you are writing for, and the evidence
or experience behind it. Include a target length if it matters. A draft is enough
for an editing request; you do not need to fill out a voice questionnaire.

```text
$blog-writing Turn these notes into a blog post for engineering managers.
My position: adding reviewers doesn't automatically improve a decision.
Use only these notes and keep it under 700 words.
[Notes with the decisions, constraints, and outcomes.]
```

```text
$blog-writing Edit this draft so the argument is more direct. Preserve my
position and factual qualifications. Move or cut sections that obscure the
point, and flag claims my sources don't support.
[Draft and sources.]
```

```text
$blog-writing Help me find an angle for a post about remote work. I haven't
decided what I believe yet. Suggest arguments I could defend and tell me
what evidence each would need before drafting in my name.
```

## Check the result

- The post makes a claim you actually endorse and supports it with real material.
- The opening delivers on the title, and each section advances the argument.
- Disagreement engages a real position and its strongest relevant objection.
- The ending follows from the evidence and gives the reader a useful consequence.
- Missing evidence stays visible. First-person authority never comes from an
  invented experience.

[SKILL.md](SKILL.md) provides the workflow and tells the agent when to consult two
focused references:

- [Structure examples](references/structure.md) show how to find a claim in the
  material, write a lead, arrange notes, juxtapose facts, and find an ending.
- [Voice and revision examples](references/revision.md) include a complete
  before-and-after post, then edits for description, word choice, cutting, and
  factual integrity. Each example explains what makes the revision work.

The package needs no companion skills or scripts. Sales copy, social posts, SEO
audits, and publishing are outside its scope. Judge voice fit on actual drafts
before relying on it across a whole blog.
