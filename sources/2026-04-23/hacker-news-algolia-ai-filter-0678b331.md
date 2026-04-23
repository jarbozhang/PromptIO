---
title: 'Show HN: Ctx – a /resume that works across Claude Code and Codex'
url: 'https://github.com/dchu917/ctx'
source: Hacker News (Algolia AI filter)
source_type: rss
language: en
published: '2026-04-20T16:35:05.000Z'
fetched_at: '2026-04-23T02:21:54.226Z'
---
ctx is a local SQLite-backed skill for Claude Code and Codex that stores context as a persistent workstream that can be continued across agent sessions. Each workstream can contain multiple sessions, notes, decisions, todos, and resume packs. It essentially functions as a /resume that can work across coding agents.
Here is a video of how it works: https://www.loom.com/share/5e558204885e4264a34d2cf6bd488117
I initially built ctx because I wanted to try a workstream that I started on Claude and continue it from Codex. Since then, I’ve added a few quality of life improvements, including the ability to search across previous workstreams,  manually delete parts of the context with, and branch off existing workstreams.. I’ve started using ctx instead of the native ‘/resume’ in Claude/Codex because I often have a lot of sessions going at once, and with the lists that these apps currently give, it’s not always obvious which one is the right one to pick back up. ctx gives me a much clearer way to organize and return to the sessions that actually matter.
It’s simple to install after you clone the repo with one line: ./setup.sh, which adds the skill to both Claude Code and Codex. After that, you should be able to directly use ctx in your agent as a skill with ‘/ctx [command]’ in Claude and ‘ctx [command]’ in Codex.
A few things it does:
- Resume an existing workstream from either tool
- Pull existing context into a new workstream
- Keep stable transcript binding, so once a workstream is linked to a Claude or Codex conversation, it keeps following that exact session instead of drifting to whichever transcript file is newest
- Search for relevant workstreams
- Branch from existing context to explore different tasks in parallel
It’s intentionally local-first: SQLite, no API keys, and no hosted backend. I built it mainly for myself, but thought it would be cool to share with the HN community.
Comments URL: https://news.ycombinator.com/item?id=47836740
Points: 71
# Comments: 27
