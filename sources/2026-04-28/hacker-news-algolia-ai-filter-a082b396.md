---
title: 'Show HN: OSS Agent I built topped the TerminalBench on Gemini-3-flash-preview'
url: 'https://github.com/dirac-run/dirac'
source: Hacker News (Algolia AI filter)
source_type: rss
language: en
published: '2026-04-27T12:35:55.000Z'
fetched_at: '2026-04-28T02:04:18.407Z'
---
Scored 65.2% vs google's official 47.8%, and the existing top closed source model Junie CLI's 64.3%.
Since there are a lot of reports of deliberate cheating on TerminalBench 2.0 lately (https://debugml.github.io/cheating-agents/), I would like to also clarify a few things
1. Absolutely no {agents/skills}.md files were inserted at any point. No cheating mechanisms whatsoever
2. The cli agent was run in leaderboard compliant way (no modification of resources or timeouts)
3. The full terminal bench run was done using the fully open source version of the agent, no difference between what is on github and what was run.
I was originally going to wait for it to land on the leaderboard, but it has been 8 days and the maintainers do not respond unfortunately (there is a large backlog of the pull requests on their HF) so I decided to post anyways.
HF PR: https://huggingface.co/datasets/harborframework/terminal-ben...
It is astounding how much the harness matters, based on this and other experiments I have done.
Comments URL: https://news.ycombinator.com/item?id=47920787
Points: 303
# Comments: 118
