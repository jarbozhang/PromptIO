---
title: 'Show HN: LangAlpha – what if Claude Code was built for Wall Street?'
url: 'https://github.com/ginlix-ai/langalpha'
source: Hacker News (Algolia AI filter)
source_type: rss
language: en
published: '2026-04-14T14:48:46.000Z'
fetched_at: '2026-04-15T02:21:19.779Z'
---
Some technical context on what we ran into building this.
MCP tools don't really work for financial data at scale. One tool call for five years of daily prices dumps tens of thousands of tokens into the context window. And data vendors pack dozens of tools into a single MCP server, schemas alone can eat 50k+ tokens before the agent does anything useful. So we auto-generate typed Python modules from the MCP schemas at workspace init and upload them into the sandbox. The agent just imports them like a normal library. Only a one-line summary per server stays in the prompt. We have around 80 tools across our servers and the prompt cost is the same whether a server has 3 tools or 30. This part isn't finance-specific, it works with any MCP server.
The other big thing was making research actually persist across sessions. Most agents treat a single deliverable (a PDF, a spreadsheet) as the end goal. In investing that's day one. You update the model when earnings drop, re-run comps when a competitor reports, keep layering new analysis on old. But try doing that across agent sessions, files don't carry over, you re-paste context every time. So we built everything around workspaces. Each one maps to a persistent sandbox, one per research goal. The agent maintains its own memory file with findings and a file index that gets re-read before every LLM call. Come back a week later, start a new thread, it picks up where it left off.
We also wanted the agent to have real domain context the way Claude Code has codebase context. Portfolio, watchlist, risk tolerance, financial data sources, all injected into every call. Existing AI investing platforms have some of that but nothing close to what a proper agent harness can do. We wanted both and couldn't find it, so we built it and open-sourced the whole thing.
Comments URL: https://news.ycombinator.com/item?id=47766370
Points: 110
# Comments: 37
