---
title: 'Show HN: Real-time dashboard for Claude Code agent teams'
url: 'https://github.com/simple10/agents-observe'
source: Hacker News (Algolia AI filter)
source_type: rss
language: en
published: '2026-04-01T16:24:28.000Z'
fetched_at: '2026-04-05T07:24:33.737Z'
---
This project (Agents Observe) started as an exploration into building automation harnesses around claude code. I needed a way to see exactly what teams of agents were doing in realtime and to filter and search their output.
A few interesting learnings from building and using this:
- Claude code hooks are blocking - performance degrades rapidly if you have a lot of plugins that use hooks
- Hooks provide a lot more useful info than OTEL data
- Claude's jsonl files provide the full picture
- Lifecycle management of MCP processes started by plugins is a bit kludgy at best
The biggest takeaway is how much of a difference it made in claude performance when I switched to background (fire and forget) hooks and removed all other plugins. It's easy to forget how many claude plugins I've installed and how they effect performance.
The Agents Observe plugin uses docker to start the API and dashboard service. This is a pattern I'd love to see used more often for security (think Axios hack) reasons. The tricky bit was handling process management across multiple claude instances - the solution was to have the server track active connections then auto shut itself down when not in use. Then the plugin spins it back up when a new session is started.
This tool has been incredibly useful for my own daily workflow. Enjoy!
Comments URL: https://news.ycombinator.com/item?id=47602986
Points: 76
# Comments: 29
