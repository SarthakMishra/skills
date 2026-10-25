# TypeScript guide

Use `$ts-guide` in Codex or `/ts-guide` in Claude Code to design, review, or
refactor TypeScript types beyond the basics. The agent can also select it for
matching type-design tasks.

It focuses on inference, domain invariants, generic API relationships, type
transformations, and tests that prove both valid and invalid usage. Choose it
when a type loses information, admits invalid combinations, or forces callers
to cast. It does not teach introductory syntax or own framework behavior.

## Example requests

- “Make this config validate its keys without widening its literal values.”
- “Make the event name determine which payload this API accepts.”
- “Replace these optional fields with states that narrow correctly.”
- “Review this conditional type for union and never edge cases.”
- “Check that this wrapper preserves inference and rejects invalid calls.”

## Check the result

Valid callers retain useful inferred types, invalid callers fail the type check,
and external data is validated at runtime. A successful review explains the
broken contract; an implementation includes focused evidence and reports any
unverified checks.
