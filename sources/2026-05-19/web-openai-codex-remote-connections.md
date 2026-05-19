---
title: "OpenAI Codex remote connections documentation"
url: "https://developers.openai.com/codex/remote-connections"
source: OpenAI Developers
source_type: web
language: en
published: "2026-05-19"
fetched_at: "2026-05-19T16:30:00+08:00"
---

OpenAI's Codex remote connections documentation describes how to use Codex away from the machine that runs it, connect the ChatGPT mobile app to a Codex App host, pick up work from another device, or configure Codex to work on an SSH host.

Key facts from docs:

- Remote access uses the connected host's projects, threads, files, credentials, permissions, plugins, Computer Use, browser setup, and local tools.
- Remote sessions can start or continue threads, send follow-up instructions, approve actions, review outputs, diffs, test results, terminal output, and screenshots.
- Mobile setup currently requires the Codex App for macOS on the host, which must be awake, online, running Codex, and signed in to the same account and workspace.
- Users can connect a laptop or desktop, a dedicated always-on Mac, or an SSH host / managed devbox.
- With SSH, remote project threads run commands, read files, and write changes on the remote host.
- Codex uses a secure relay layer so trusted machines remain reachable from authorized ChatGPT devices without exposing them directly to the public internet.
- For SSH remote connections, docs recommend keeping the host configured with normal SSH security expectations and avoiding unauthenticated public listeners.
