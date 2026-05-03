---
title: 'Show HN: Agent-desktop – Native desktop automation CLI for AI agents'
url: 'https://github.com/lahfir/agent-desktop'
source: Hacker News (Algolia AI filter)
source_type: rss
language: en
published: '2026-05-02T02:18:24.000Z'
fetched_at: '2026-05-03T12:56:06.234Z'
---
I've been building computer-use tools for a while, and I quietly launched this about a month ago (122 Stars on GH). I figured it was worth sharing here.
Over the last few months, a lot of computer-use agents have come out: Codex, Claude Code, CUA, and others. Most of them seem to work roughly like this:
  1. Take a screenshot
  2. Have the model predict pixel coordinates
  3. Click x,y
  4. Take another screenshot
  5. Repeat
That works, but it's slow, expensive in tokens, and fragile. If the UI shifts a few pixels, things break. And the model still doesn't know what any element actually is.
But the OS already exposes structured UI information:
  - macOS: Accessibility API
  - Windows: UI Automation
  - Linux: AT-SPI

So I built a desktop equivalent: agent-desktop.
It's a cross-platform CLI for structured desktop automation through the accessibility tree. One Rust binary, about 15 MB, no runtime dependencies. It exposes 53 commands with JSON output, so an LLM can inspect and operate native apps without screenshots or vision models. Inspired by agent-browser by Vercel Labs.
A typical loop looks like this:
  agent-desktop snapshot --app Slack -i --compact
  agent-desktop click @e12
  agent-desktop type @e5 "ship it"
  agent-desktop press cmd+return

  1. Snapshot
  2. Decide
  3. Act
  4. Snapshot again

A naive approach would dump the full accessibility tree into the model, but real apps get huge. Slack can easily exceed 50,000 tokens for a full tree dump, which makes the approach impractical.
The approach I ended up using is progressive skeleton traversal:
  - First pass: return a shallow tree, typically depth 3, with deeper containers truncated and annotated with children_count
  - Named containers get references so the agent can request only that subtree
  - The agent drills down into the relevant region with --root @e3
  - References are scoped and invalidated only for that subtree
  - After acting, the agent can re-query just that region instead of re-snapshotti
