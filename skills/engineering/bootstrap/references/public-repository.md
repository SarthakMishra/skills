# Public repository preparation

Complete file and history checks before any public push. Use this reference
when public visibility is agreed, even if this run ends locally. Apply remote
settings only when repository creation or administration is authorized, and distinguish prepared settings from settings
verified on GitHub.

## Review what will become public

1. Inspect the exact proposed files, staged changes, and every commit reachable
   through the branches or tags to be pushed. Review existing history even when
   the latest tree is clean. A `.gitignore` rule does not remove tracked content.
2. Check source, docs, fixtures, assets, logs, local tracker notes, and agent
   configuration for credentials, personal/customer data, internal URLs, and
   private material. Use sanitized examples. Decide whether local issue files and private spec or design documents
   belong in the publication.
3. Run an established secret scanner such as [Gitleaks](https://github.com/gitleaks/gitleaks)
   over both proposed files and the history being published. Use its current CLI
   and redact findings in output. A diff-only scan misses older commits; a Git
   scan can miss untracked files. Review findings rather than blanket-allowlisting
   them. A missing scanner or unresolved finding blocks publication, not local
   preparation.
4. If credentials were exposed, stop publication and arrange revocation or
   rotation. Remove sensitive material from the outgoing history as well as the
   current files. Agree on any history rewrite separately; never force-push a
   shared repository to conceal the finding. Re-scan after removing the exposed material.
5. Confirm the user's license choice and retain notices for imported code and
   assets. Public visibility does not mean packages should be publishable.

## Prepare repository protections

Before the first push, inspect the workflow that will run on that push. Follow
[GitHub's secure use guidance](https://docs.github.com/en/actions/reference/security/secure-use):

- Default workflow token permissions to `contents: read`; pin actions to verified
  full commit SHAs. Disable persisted checkout credentials when not needed.
- Run untrusted contributions through ordinary `pull_request` checks without
  production secrets or privileged self-hosted runners. Do not execute PR code
  in a privileged `pull_request_target` or `workflow_run` job.
- Keep attacker-controlled issue/PR text out of interpolated shell commands.
  Avoid unrelated publication or deployment jobs in the bootstrap workflow.

When authorized, create the empty remote without an automatic push. Verify its
visibility and available security settings. Enable secret scanning and push
protection where supported, dependency alerts, and approval for outside
contributors' Actions runs. Configure a dependency update mechanism for packages
and action pins. Add a security policy with a real private reporting channel.

Protect the default branch against deletion and force pushes and require the
agreed checks for subsequent changes. Some settings require an initial branch or
registered CI check. Prepare those settings before the first push, then apply
and verify them once the initial branch and successful check exist. Record any
plan or permission limitation instead of claiming the protection is enabled.

## Publication evidence

Report the reviewed commit and file scope, scanner result, license choice, and
workflow review before publishing. Confirm that authorization covers the exact
public destination. Unresolved exposure findings prevent the push. Afterward,
verify the remote visibility, pushed commit, CI result, and applied protections.

For a local-only run, report local checks and remaining remote steps without
creating a repository. Recheck the final files and history when publication is
later requested; an earlier scan does not cover subsequent edits.
