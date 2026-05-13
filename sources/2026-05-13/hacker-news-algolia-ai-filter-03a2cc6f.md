---
title: 'Show HN: adamsreview – better multi-agent PR reviews for Claude Code'
url: 'https://github.com/adamjgmiller/adamsreview'
source: Hacker News (Algolia AI filter)
source_type: rss
language: en
published: '2026-05-11T02:06:29.000Z'
fetched_at: '2026-05-13T10:19:12.991Z'
---
I built adamsreview, a Claude Code plugin that runs deeper, multi-stage PR reviews using parallel sub-agents, validation passes, persistent JSON state, and optional ensemble review via Codex CLI and PR bot comments.
On my own PRs, it has been catching dramatically more real bugs than Claude’s built-in /review, /ultrareview, CodeRabbit, Greptile, and Codex’s built-in review, while producing fewer false positives.
adamsreview is six Claude Code slash commands packaged as a plugin: review, codex-review, add, promote, walkthrough, and fix. I modeled it after the built-in /review command and extended it meaningfully.
You can clear context between review stages because state is stored in JSON artifacts on disk, with built-in scripts for keeping it updated.
The walkthrough command uses Claude’s AskUserQuestion feature to walk you through uncertain findings or items needing human review one by one. Then, the fix command dispatches per-fix-group agents and re-reviews the work with Opus, reverting any regressions before committing survivors.
It runs against your regular Claude Code subscription (Max plan recommended), unlike /ultrareview, which charges against your Extra Usage pool.
I would love feedback from Claude Code users, pro devs, and anyone with strong opinions about AI code reviews.
Repo: https://github.com/adamjgmiller/adamsreview
Install:
/plugin marketplace add adamjgmiller/adamsreview, /plugin install adamsreview@adamsreview
Comments URL: https://news.ycombinator.com/item?id=48090276
Points: 82
# Comments: 55
