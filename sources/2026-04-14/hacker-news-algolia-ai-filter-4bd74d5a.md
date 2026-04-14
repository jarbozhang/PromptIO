---
title: 'Show HN: Claudraband – Claude Code for the Power User'
url: 'https://github.com/halfwhey/claudraband'
source: Hacker News (Algolia AI filter)
source_type: rss
language: en
published: '2026-04-12T16:55:20.000Z'
fetched_at: '2026-04-14T00:33:04.097Z'
---
Hello everyone.
Claudraband wraps a Claude Code TUI in a controlled terminal to enable extended workflows. It uses tmux for visible controlled sessions or xterm.js for headless sessions (a little slower), but everything is mediated by an actual Claude Code TUI.
One example of a workflow I use now is having my current Claude Code interrogate older sessions for certain decisions it made: https://github.com/halfwhey/claudraband?tab=readme-ov-file#s...
This project provides:
- Resumable non-interactive workflows. Essentially `claude -p` with session support: `cband continue  'what was the result of the research?'`
- HTTP server to remotely control a Claude Code session: `cband serve --port 8123`
- ACP server to use with alternative frontends such as Zed or Toad (https://github.com/batrachianai/toad): `cband acp --model haiku`.
- TypeScript library so you can integrate these workflows into your own application.
This exists cause I was using `tmux send-keys` heavily in a lot of my Claude Code workflows, but I wanted to streamline it.
Comments URL: https://news.ycombinator.com/item?id=47741889
Points: 116
# Comments: 42
