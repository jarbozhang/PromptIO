---
title: no-mistakes, a local git proxy that gates AI-generated code before PR
url: 'https://github.com/kunchenguid/no-mistakes'
source: GitHub official README
source_type: github
language: en
published: '2026-06-21T00:00:00Z'
fetched_at: '2026-06-21T03:45:00Z'
---
no-mistakes puts a local git proxy in front of the real remote. The developer pushes to the no-mistakes remote instead of origin. It starts a disposable worktree, runs an AI-driven validation pipeline, forwards upstream only after every check passes, and opens a clean PR automatically.

Official README highlights:

- The core workflow is `git push no-mistakes`.
- The isolated pipeline runs review, test, docs, lint, push, PR and CI checks before forwarding code.
- The developer's working directory is not disrupted because validation runs in a disposable worktree.
- It is agent-agnostic and supports claude, codex, rovodev, opencode, pi, and ACP targets through acpx.
- It is agent-native through a `/no-mistakes` skill, which can ask a coding agent to do a task and then gate it, or gate existing committed work.
- Findings have different handling paths. Safe mechanical fixes can be applied automatically. Intent-sensitive findings are escalated for a human to approve, fix, or skip.
- The TUI path can create a branch, commit, push through the gate and attach to the current run.
- `no-mistakes init` initializes the gate and installs the skill at user level.
- Install command shown by the README is `curl -fsSL https://raw.githubusercontent.com/kunchenguid/no-mistakes/main/docs/install.sh | sh`.

The useful writing angle is not “another AI coding tool”, but “AI can now produce diffs faster than teams can validate them, so the missing product surface is a validation gate between local work and PR”.
