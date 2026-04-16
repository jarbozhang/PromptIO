---
title: 'Show HN: Libretto – Making AI browser automations deterministic'
url: 'https://github.com/saffron-health/libretto'
source: Hacker News (Algolia AI filter)
source_type: rss
language: en
published: '2026-04-15T15:57:54.000Z'
fetched_at: '2026-04-16T06:06:00.297Z'
---
Libretto (https://libretto.sh) is a Skill+CLI that makes it easy for your coding agent to generate deterministic browser automations and debug existing ones. Key shift is going from “give an agent a prompt at runtime and hope it figures things out” to: “Use coding agents to generate real scripts you can inspect, run, and debug”.
Here’s a demo: https://www.youtube.com/watch?v=0cDpIntmHAM. Docs start at https://libretto.sh/docs/get-started/introduction.
We spent a year building and maintaining browser automations for EHR and payer portal integrations at our healthcare startup. Building these automations and debugging failed ones was incredibly time-consuming.
There’s lots of tools that use runtime AI like Browseruse and Stagehand which we tried, but (1) they’re reliant on custom DOM parsing that's unreliable on older and complicated websites (including all of healthcare). Using a website’s internal network calls is faster and more reliable when possible. (2) They can be expensive since they rely on lots of AI calls and for workflows with complicated logic you can’t always rely on caching actions to make sure it will work. (3) They’re at runtime so it’s not interpretable what the agent is going to do. You kind of hope you prompted it correctly to do the right thing, but legacy workflows are often unintuitive and inconsistent across sites so you can’t trust an agent to just figure it out at runtime. (4) They don’t really help you generate new automations or help you debug automation failures.
We wanted a way to reliably generate and maintain browser automations in messy, high-stakes environments, without relying on fragile runtime agents.
Libretto is different because instead of runtime agents it uses “development-time AI”: scripts are generated ahead of time as actual code you can read and control, not opaque agent behavior at runtime. Instead of a black box, you own the code and can inspect, modify, version, and debug everything.
Rather than relying on runtime DOM par
