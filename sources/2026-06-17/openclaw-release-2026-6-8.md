---
title: "openclaw 2026.6.8 release and README setup notes"
url: "https://github.com/openclaw/openclaw/releases/tag/v2026.6.8"
source: "GitHub Release"
source_type: "github"
language: "en"
published: "2026-06-16T16:32:26Z"
fetched_at: "2026-06-17T03:31:00Z"
---

Official release and README summary for OpenClaw v2026.6.8.

Release highlights:

- Telegram and WhatsApp delivery became less brittle. Telegram gained richer structured text handling, tables, lists, expandable blockquotes, preserved line breaks, and CLI-backed replies. WhatsApp now honors configured ACP bindings.
- Agent runs became more reliable across account-scoped DM sends, generated media completions, auto-reply final replies, reset archive fallback reads, restart shutdown aborts, yielded subagent pauses, and session identity prompts.
- Model routing became safer with GLM-5.2 and Claude Haiku 4.5 catalog support, normalized provider IDs, managed SecretRef auth, bounded model browsing, and safer OpenAI/Anthropic tool-schema recovery.
- `/usage` and reply payload hooks gained a native full footer renderer, default template, fixed-decimal formatting, credential-aware limits, partial-count handling, and warnings for broken templates.
- Key-free search providers such as Parallel Free, DuckDuckGo, Ollama, and Codex Hosted Search remain explicit opt-ins rather than automatic fallbacks.
- UI and mobile sessions became calmer: workspace files start collapsed, WebChat backscroll survives streaming, desktop session picker remains interactive, reset arguments survive dispatch, and iOS reconnects stale foreground Gateways.
- Memory and state became more resilient: oversized OpenAI embedding batches split before 431s, QMD search stays available in transient mode, SQLite avoids WAL on NFS volumes, and reindexes preserve rollback/cache recovery.

README setup notes:

- OpenClaw positions itself as a personal AI assistant that runs on the user's own devices. Gateway is the control plane; the product is the assistant.
- Supported channels listed by README include WhatsApp, Telegram, Slack, Discord, Google Chat, Signal, iMessage, Microsoft Teams, Matrix, Feishu, LINE, WeChat, QQ, WebChat and others.
- Recommended runtime is Node 24, or Node 22.19+.
- New installs are directed to `npm install -g openclaw@latest` and `openclaw onboard --install-daemon`.
- The recommended CLI path is `openclaw onboard`, which sets up gateway, workspace, channels, and skills.
- Windows desktop users can start with Windows Hub for setup, tray status, chat, node mode, and local MCP mode.
- Quick checks include `openclaw gateway status`, foreground debug with `openclaw gateway --port 18789 --verbose`, `openclaw message send`, and `openclaw agent --message "Ship checklist" --thinking high`.
