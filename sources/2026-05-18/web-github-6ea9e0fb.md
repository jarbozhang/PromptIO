---
title: "Dograh README/API 摘要，开源自托管语音 Agent 平台"
source: "GitHub API/README supplement"
url: "https://github.com/dograh-hq/dograh"
date: "2026-05-18"
source_type: "web-github-readme"
---

- GitHub API: 1670 stars, 370 forks, Python, BSD-2-Clause, created 2025-09-09, pushed 2026-05-17, topics include voice-agents, self-hosted, telephony, WebRTC, TTS, STT, outbound-calls.
- README positions Dograh as open-source self-hostable alternative to Vapi and Retell, drag-and-drop workflow builder, working bot in under 2 minutes.
- Self-host quick start: curl docker-compose.yaml and REGISTRY=ghcr.io/dograh-hq ENABLE_TELEMETRY=true docker compose up --pull always, then open localhost:3010.
- First voice bot flow: choose inbound/outbound, describe use case in 5-10 words, click Web Call. README says no API keys needed for testing because it ships auto-generated keys and its own LLM/TTS/STT stack.
- Features include telephony integration, human transfer, custom TTS/STT, low-latency voice, test mode, dashboard web calls and QA node for prompt quality.
