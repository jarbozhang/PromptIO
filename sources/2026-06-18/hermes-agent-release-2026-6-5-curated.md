---
title: Hermes Agent v0.16.0 Surface Release highlights
url: https://github.com/NousResearch/hermes-agent/releases/tag/v2026.6.5
source: Hermes Agent GitHub Release
source_type: release
language: en
published: '2026-06-06T00:55:58Z'
fetched_at: '2026-06-18T09:34:00Z'
stars: 196507
---
Hermes Agent v0.16.0, tagged v2026.6.5, is described by its maintainers as "The Surface Release." The release says it includes 874 commits, 542 merged PRs, 399 issues closed, and 170 community contributors since v0.15.2.

Confirmed release highlights:

- Native desktop app. Hermes now has an Electron desktop app for macOS, Linux, and Windows with one-click install, in-app self-update, streaming chat, searchable sessions, drag-and-drop files into chat, image paste, command palette, and status-bar model picker.
- Remote gateway support. The desktop app can connect to a remote Hermes gateway over OAuth or username/password. Profiles can target different remote hosts, and the release notes describe concurrent multi-profile sessions plus cross-profile session links.
- Web dashboard as admin panel. The dashboard now covers channels, MCP catalog, credentials, webhooks, memory configuration, gateway controls, and system/debug actions from the browser.
- Simplified Chinese UI. The desktop app ships a full Simplified Chinese translation across chat, sidebar, settings, command center, cron, messaging, profiles, skills, and agents.
- Leaner default skills. Several redundant or niche skills moved out of the default bundle, and environment relevance gates keep context-specific skills out of the index unless they are relevant or explicitly requested.
- Trusted skills tap. NVIDIA/skills becomes a built-in trusted Skills Hub tap.
- Quick setup. A Quick Setup path through Nous Portal gets a new user from install to first message faster, while Full Setup remains available for power users.
- Fuzzy model picker. The picker works across desktop, web dashboard, TUI, and CLI, groups multi-endpoint providers, and refreshes more frequently.
- `/undo [N]`. Users can take back the last N turns in CLI, TUI, and messaging surfaces.

README facts:

- Hermes describes itself as a self-improving AI agent with a built-in learning loop. It can create skills from experience, improve them during use, preserve knowledge, search past conversations, and build a user model across sessions.
- Quick install on Linux/macOS/WSL2/Termux: `curl -fsSL https://hermes-agent.nousresearch.com/install.sh | bash`.
- Native Windows install is supported with a PowerShell installer.
- Common commands include `hermes`, `hermes model`, `hermes tools`, `hermes config set`, `hermes gateway`, `hermes setup`, `hermes update`, and `hermes doctor`.
- Hermes can migrate settings, memories, skills, allowlists, messaging settings, selected secrets, and workspace instructions from OpenClaw via `hermes claw migrate`.

Useful article angle:

Focus on the shift from "power-user CLI agent" to "surface people can actually operate": desktop, admin panel, Chinese UI, remote gateway, skill pruning, model picker, undo. The reader value is a migration and adoption checklist, not a generic product intro.
