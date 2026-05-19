---
title: "Claude Code can now self-improve with this plugin. Introducing claude-smart — an open-source plugin "
source: "X home @yyyiiillluuu"
url: "https://x.com/yyyiiillluuu/status/2056404446121251150"
date: "Mon May 18 16:00:00 +0000 2026"
likes: 442
reposts: 134
replies: 120
---

Claude Code can now self-improve with this plugin.

Introducing claude-smart — an open-source plugin that helps Claude Code learn from every session.

Memory helps Claude Code remember what happened.
claude-smart helps Claude Code improve what it does next.

Example:
Claude Code runs `npm test` without `--run`, and the command hangs in your repo.

Memory stores:
“npm test kept hanging.”

claude-smart learns:
“When running tests in this repo, use `npm test -- --run` because default watch mode hangs.”

claude-smart’s learnings are reusable and actionable, even across different projects.
It can also reduce unnecessary planning iterations and token use by 70%+ on similar future tasks.

Runs locally. 100% open source. No data is shared.

Install:
npx claude-smart install

With Codex:
npx claude-smart install --host codex

GitHub:
https://t.co/D4F0v5FnGk
