# Security

## Report a vulnerability

Use [private vulnerability reporting](https://github.com/SarthakMishra/skills/security/advisories/new)
for exposed credentials, malicious skill instructions, or vulnerabilities in
repository tooling. Include the affected file and commit, impact, and safe steps
to reproduce. Do not include live credentials or private project data.

Keep vulnerability details out of public issues and pull requests until a fix
is available. Use ordinary issues for non-sensitive bugs and suggestions.

Security fixes target the latest content on `main`.

## Use skills safely

Read a skill and its bundled references before installing it. Skills guide an
agent that uses your project's tools and permissions. They do not provide a
sandbox. Keep the agent's access limited to the task and review its changes.

Before contributing, remove credentials and private examples from both files
and commit history. If a credential was exposed, revoke or rotate it; deleting
it from the latest file does not remove it from Git history.
