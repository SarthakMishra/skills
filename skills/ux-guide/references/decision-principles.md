# Principles that change design decisions

Use these as diagnostic lenses, not proof that a particular interface will work. The source concepts come from the supplied editions listed below; the web-app instructions and examples are this skill's synthesis. Reading the books is not required to apply this reference.

## Remove uncertainty before removing clicks

People often scan for a promising next move rather than evaluating every option. At each step, ask what the person must guess: where to start, whether something is actionable, what is selected, or where it will lead. Make those relationships evident. Put information at the decision that needs it. A brief explanation can help a novel task; a tour cannot rescue an incoherent path.

Use familiar conventions for ordinary actions and depart from them when the task benefit outweighs relearning. Preserve clarity when mechanical consistency would obscure a different consequence. Keep the primary job visible without requiring every surface to contain exactly one action.

A sequence of understandable steps can be easier than one screen full of ambiguous choices. Repeated expert work can still justify shortcuts and fewer steps. Count unnecessary decisions, memory demands, re-entry, and context switches along with clicks. Sources: Krug, chapters 1–4, 6–7; Yablonski, chapters 1 and 4.

## Bridge intention, action, and understanding

Norman's action cycle gives a useful inspection sequence: identify the goal, choose a plan, identify an action, execute it, perceive the result, interpret it, and compare it with the goal. A breakdown before action calls for better feedforward; a breakdown after action calls for clearer feedback or a better conceptual model.

| Concept          | Actionable test                                          | Web-app application                                                               |
| ---------------- | -------------------------------------------------------- | --------------------------------------------------------------------------------- |
| Discoverability  | Can people find possible actions and current state?      | Expose the main task and applicable controls without hidden gestures.             |
| Affordance       | Can the intended action actually be performed?           | Make the operation available through appropriate input methods.                   |
| Signifier        | What tells people the action is possible?                | Make actionable controls distinguishable from static content.                     |
| Mapping          | Which object and scope does this control affect?         | Keep row actions associated with their row; make workspace-wide actions explicit. |
| Conceptual model | Can people predict how the system behaves?               | Distinguish editing a draft from publishing it or sending it externally.          |
| Constraint       | Does the system prevent an invalid action appropriately? | Require a destination before sending; explain why progression is blocked.         |
| Feedback         | Can people perceive and interpret the result?            | Separate received input, processing, and confirmed completion.                    |

Feedback should be timely, informative, and proportional. Too many alerts obscure the important ones. Constraints should prevent real errors without adding irrelevant gates. Sources: Norman, chapters 1–2 and 4.

## Put memory into the interface

Make the facts needed for a decision available together. Keep prior choices, selection scope, progress, and unfinished work visible or recoverable. Chunk related information by meaning, not an arbitrary item count. Do not turn Miller's discussion of memory into a seven-item navigation limit.

Support interruption: returning users should be able to reconstruct what they were doing and what remains. Let the system derive reliable values and handle mechanical work; keep consequential assumptions inspectable. Sources: Norman, chapter 3; Yablonski, chapters 3 and 9.

## Design for slips and mistaken plans

A person may intend the right action but execute the wrong one, or may faithfully execute an incorrect plan. Different causes need different fixes. A hidden mode, ambiguous selection, and neighboring controls can provoke slips; a false understanding of what “save” commits can provoke a mistaken plan.

Reduce confusable actions, show the affected object at commitment, preserve work, and provide genuine recovery. Use reversibility when supported. For irreversible actions, provide proportionate review of consequences; a repeated generic confirmation is weak protection against a mistaken mental model. Sources: Norman, chapter 5.

## Apply psychology with its limits

| Lens                       | Use it to                                               | Avoid the misleading shortcut                                                                  |
| -------------------------- | ------------------------------------------------------- | ---------------------------------------------------------------------------------------------- |
| Jakob's law                | Reduce relearning through familiar behavior             | Copying a familiar product despite a different job or audience.                                |
| Fitts's law                | Improve acquisition of controls across input methods    | Treating visual size alone as usable hit area or deriving a universal pixel size from the law. |
| Miller / cognitive load    | Externalize memory and group meaningful information     | Limiting every list or navigation to seven items.                                              |
| Hick's law                 | Reduce competing decisions and improve grouping         | Hiding essential choices in extra layers solely to reduce visible count.                       |
| Postel's law               | Accept harmless variation and produce reliable results  | Guessing ambiguous dates, amounts, identities, or units; silently coercing meaning.            |
| Peak–end rule              | Improve stressful moments, useful outcomes, and closure | Adding celebration while leaving the core journey broken.                                      |
| Aesthetic–usability effect | Separate perceived ease from demonstrated task success  | Treating praise for appearance as evidence of usability.                                       |
| Von Restorff effect        | Make meaningful differences identifiable                | Making everything compete for attention or relying only on color/motion.                       |
| Tesler's law               | Move derivable mechanical complexity into the system    | Concealing necessary choices or creating rigid automation with no exception path.              |
| Doherty threshold          | Treat responsive interaction as part of the experience  | Assuming 400 ms is universal, equating feedback with completion, or introducing fake work.     |

These correspond to chapters 1–10 of _Laws of UX_, second edition. Apply measurements and accessible component requirements appropriate to the actual product; the principle names do not supply a complete specification.

## Preserve trust and a sense of control

Hiding needed information, asking for unnecessary details, discarding effort, and obstructing exits spend users' goodwill. Make limitations and consequences available when they matter. Keep expert paths reachable and let automation be corrected without destroying the current task. A sparse screen is not simple if it forces people to remember hidden information or work around the product.

Meaningful friction can improve confidence before a consequential commitment. Distinguish it from friction caused by confusing controls or organizational convenience. Sources: Krug, chapters 10–12; Norman, chapters 4–6; Yablonski, chapter 12.

## Build recurring value and enjoyment

Diagnose motivation alongside ability and the cue to act. When a willing person stalls, identify their scarce resource: time, money, physical effort, mental effort, social comfort, or fit with routine. Simplify that obstacle before adding persuasion.

Use a recurring need, manageable action, valuable reward, and optional investment that improves later use. Offer competence, discovery, connection, or ownership where they fit. Keep autonomy and a clean stopping point. For an occasional utility, successful completion and easy re-entry matter more than daily habitual use. See the engagement reference for implementation choices. Source: Eyal, chapters 1–6 and 8.

## Resolve competing principles

Make the tradeoff explicit: “Keeping comparisons together increases density but reduces backtracking and memory work.” Prefer correctness and understandable consequences over shaving a step from a high-stakes flow. Prefer direct reversible interaction over confirmation fatigue for low-risk work. Preserve expert efficiency alongside discoverable beginner paths. Convert uncertain recommendations into testable predictions rather than citing a law as the verdict.

## Source map

- **Steve Krug, _Don't Make Me Think, Revisited_, third edition (2014 publication; supplied file labeled 2013):** chapters 1–4 for scanning and decisions, 6–7 for navigation and orientation, 8–9 for observing tasks and prioritizing fixes, 10–12 for mobile, goodwill, and accessibility.
- **Don Norman, _The Design of Everyday Things_, revised and expanded (2013):** chapters 1–2 for interaction principles and the action cycle, 3 for externalized knowledge, 4 for constraints and mappings, 5 for error and recovery, 6 for iterative human-centered design.
- **Jon Yablonski, _Laws of UX_, second edition (2024):** chapters 1–10 for the lenses above, 11 for applying principles to decisions, 12 for responsibility, nonideal scenarios, and purposeful friction.
- **Nir Eyal, _Hooked_ (2014):** chapters 1–5 for cadence, triggers, ability, rewards, and investment; 6 for evaluating influence; 8 for identifying, codifying, and testing recurring behavior.

Treat the books' historical products, numerical claims, and proposed tactics in context. This skill deliberately favors truthful progress over fabricated advancement or artificial delays, predictable consequential results over variable reinforcement, and evidence about actual users over assumed universality. React state ownership, request ordering, the mapping format, and acceptance contracts are engineering applications, not claims that these books prescribe specific APIs.
