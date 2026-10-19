# Thread to blog

Turn a long learning discussion or build session into a standalone blog post.
Run it at the end of the same Claude Code or Codex conversation. It extracts the
useful questions, decisions, examples, and results, then uses `blog-writing` to
write and revise the post.

Install both skills:

```sh
npx skills add SarthakMishra/skills --skill thread-to-blog --skill blog-writing
```

Invoke `$thread-to-blog` in Codex or `/thread-to-blog` in Claude Code. The agent
can also select it when you ask to turn the current session into a blog.

```text
$thread-to-blog Turn our discussion about database isolation into a post for
developers who keep confusing isolation with locking. Use the examples we worked
through and keep the uncertainty we ended with.
```

```text
/thread-to-blog Write about what we built in this session. Focus on why we
changed the queue design and what the tests actually demonstrated.
```

You can specify an angle, audience, length, or output file. Otherwise the skill
chooses a supported angle and returns a titled post in the conversation.

A successful post stands on its own, reflects your views, and distinguishes
what was discussed from what was built and verified. It leaves routine tool
chatter and unrelated detours out of the story.

The skill can only use history the host exposes or a transcript you supply.
It reports material gaps after compaction and asks for missing excerpts when
they are essential. It does not recover inaccessible turns or publish the post.

See [SKILL.md](SKILL.md) for the extraction and handoff workflow. `blog-writing`
is required for drafting; if it is missing, the skill prepares the source brief
and gives you its installation command.
