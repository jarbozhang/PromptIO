---
title: 'Launch HN: Twill.ai (YC S25) – Delegate to cloud agents, get back PRs'
url: 'https://twill.ai'
source: Hacker News (Algolia AI filter)
source_type: rss
language: en
published: '2026-04-10T16:22:13.000Z'
fetched_at: '2026-04-11T01:42:19.149Z'
---
Hey HN, we're Willy and Dan, co-founders of Twill.ai (https://twill.ai/). Twill runs coding CLIs like Claude Code and Codex in isolated cloud sandboxes. You hand it work through Slack, GitHub, Linear, our web app or CLI, and it comes back with a PR, a review, a diagnosis, or a follow-up question. It loops you in when it needs your input, so you stay in control.
Demo: https://www.youtube.com/watch?v=oyfTMXVECbs
Before Twill, building with Claude Code locally, we kept hitting three walls
1. Parallelization: two tasks that both touch your Docker config or the same infra files are painful to run locally at once, and manual port rebinding and separate build contexts don't scale past a couple of tasks.
2. Persistence: close your laptop and the agent stops. We wanted to kick off a batch of tasks before bed and wake up to 
PRs.
3. Trust: giving an autonomous agent full access to your local filesystem and processes is a leap, and a sandbox per task felt safer to run unattended.
All three pointed to the same answer: move the agents to the cloud, give each task its own isolated environment.
So we built what we wanted. The first version was pure delegation: describe a task, get back a PR. Then multiplayer, so the whole team can talk to the same agent, each in their own thread. Then memory, so "use the existing logger in lib/log.ts, never console.log" becomes a standing instruction on every future task. Then automation: crons for recurring work, event triggers for things like broken CI.
This space is crowded. AI labs ship their own coding products (Claude Code, Codex), local IDEs wrap models in your editor, and a wave of startups build custom cloud agents on bespoke harnesses. We take the following path: reuse the lab-native CLIs in cloud sandboxes. Labs will keep pouring RL into their own harnesses, so they only get better over time. That way, no vendor lock-in, and you can pick a different CLI per task or combine them.
When you give Twill a task, it spins up a dedicated sandbo
