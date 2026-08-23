---
title: OpenClaw v2026.6.8 official release highlights
url: https://github.com/openclaw/openclaw/releases/tag/v2026.6.8
source: OpenClaw GitHub Release
source_type: release
language: en
published: '2026-06-16T16:32:26Z'
fetched_at: '2026-06-18T09:34:00Z'
stars: 379301
---
OpenClaw v2026.6.8 was published on June 16, 2026 and the release page was updated on June 18. The GitHub release ships Mac and Windows artifacts, SHA256 evidence, and dependency evidence.

The release is not mainly a new feature splash. It is a reliability and delivery update for a personal AI assistant that runs on the user's own devices.

Confirmed release highlights:

- Richer channel delivery. Telegram structured text now handles tables, lists, expandable blockquotes, preserved intentional line breaks, and CLI-backed replies. WhatsApp now honors configured ACP bindings.
- More reliable agent runs. The release notes call out fixes around account-scoped DM sends, generated media completions, auto-reply message-tool final replies, reset archive fallback reads, restart shutdown aborts, yielded subagent pauses, and session identity prompts.
- Safer model routing. The catalog adds GLM-5.2 and Claude Haiku 4.5 support, normalizes provider IDs, uses managed SecretRef auth, bounds model browsing, and improves OpenAI/Anthropic tool-schema recovery.
- Usage footers. `/usage` and reply payload hooks now have a native full footer renderer, default template, fixed-decimal formatting, credential-aware limits, partial-count handling, and warnings for broken templates.
- Predictable search defaults. Key-free providers such as Parallel Free, DuckDuckGo, Ollama, and Codex Hosted Search remain explicit opt-ins instead of automatic fallbacks.
- Calmer UI and mobile sessions. Workspace files start collapsed, WebChat backscroll survives streaming, the desktop session picker remains interactive, reset arguments survive dispatch, and iOS reconnects stale foreground gateways.
- Memory and state resilience. Oversized embedding batches split before 431 responses, QMD search stays available in transient mode, SQLite avoids WAL on NFS volumes, and full reindexes preserve rollback/cache recovery.

README install facts:

- Runtime: Node 24 recommended, or Node 22.19+.
- Recommended install: `npm install -g openclaw@latest`.
- Recommended setup: `openclaw onboard --install-daemon`, then `openclaw gateway status`.
- OpenClaw positions itself as a personal AI assistant that runs on the user's own devices, with a local-first gateway, multi-channel inbox, multi-agent routing, voice wake/talk mode, live canvas, companion apps, onboarding, and skills.

Useful article angle:

Write this as a reliability checklist for people already thinking about a personal AI assistant: channel delivery, model routing, usage visibility, search defaults, UI/mobile continuity, and memory/state recovery. Avoid implying that every reader has tested all channels. The useful takeaway is how to judge whether an always-on personal assistant is ready for daily use.
