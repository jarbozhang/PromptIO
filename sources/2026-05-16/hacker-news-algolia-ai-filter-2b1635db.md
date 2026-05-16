---
title: 'Show HN: GlycemicGPT – Open-source AI-powered diabetes management'
url: 'https://github.com/GlycemicGPT/GlycemicGPT'
source: Hacker News (Algolia AI filter)
source_type: rss
language: en
published: '2026-05-15T04:48:23.000Z'
fetched_at: '2026-05-16T14:12:15.496Z'
---
I'm a Type 1 diabetic and software engineer. Last year I went months between endocrinologists with no clinician reviewing my data. I'm an engineer, so I built the tool I needed — and now I'm open sourcing it.
GlycemicGPT is a self-hosted platform that connects continuous glucose monitors, insulin pumps, and existing Nightscout instances to an AI analysis layer running on your own infrastructure.
Data sources:
Dexcom G7 (cloud API)
Tandem t:slim X2 and Mobi pumps (direct BLE)
Nightscout (point it at your existing instance and you're running in minutes)
What the AI layer does:
Daily briefs summarizing overnight and 24-hour patterns
Meal response analysis
Conversational chat with RAG-backed clinical knowledge
Predictive alerting with configurable thresholds and caregiver escalation
Important: this is monitoring and analysis only. GlycemicGPT does not deliver insulin, does not control your pump, and is not a closed-loop system. It reads your data and gives you insight on top of it. Your clinical decisions stay between you and your care team.
Architecture:
Self-hosted via Docker or K8S — the GlycemicGPT stack runs entirely on your hardware
BYOAI — bring your own AI provider. Use Ollama for fully local operation (no data leaves your hardware), or point it at Claude, OpenAI, or any OpenAI-compatible endpoint if you prefer a hosted model. Data flows directly from your instance to the provider you choose; nothing is routed through any centralized service operated by the project.
GPL-3.0, no subscriptions, no vendor lock-in
Stack:
Backend API: FastAPI, Python 3.12, PostgreSQL 16, Redis 7
Web Dashboard: Next.js 15, React 19, Tailwind CSS, shadcn/ui
AI Sidecar: TypeScript, Express, multi-provider proxy
Android App: Kotlin, Jetpack Compose, BLE
Wear OS: Kotlin, Wear Compose, Watch Face Push API
Plugin SDK: Kotlin interfaces, capability-based, sandboxed
Looking for contributors — especially folks with BLE/Android experience or anyone in the diabetes tech space. Plugin SDK is docu
