---
title: 'Show HN: peerd – AI agent harness that runs entirely in your browser'
url: 'https://github.com/NotASithLord/peerd'
source: Hacker News (Algolia AI filter)
source_type: rss
language: en
published: '2026-06-23T15:05:00.000Z'
fetched_at: '2026-06-25T07:40:34.559Z'
---
Hey HN. http://peerd.ai is an AI agent harness that lives entirely in your browser as a web extension. You don’t have to install a separate “AI browser”. You don’t have to bolt on or run some external process or manage a clunky mcp integration. It’s just a fully contained web extension, written in no build vanilla JS with minimal non-browser dependencies, using your own provider keys, and Apache 2.
This isn’t just a fun hack. While it has largely been a solo side project, I genuinely believe the browser and the web could be the most natural platform for AI agents to operate safely, autonomously, and most importantly without A2A middlemen (more on that in a sec). To demonstrate that point peerd doesn’t just drive browser automation. It spins up isolated sandboxes using tabs and worker instances to support various real workload types. Those include headless JS computational work, visual JS notebooks, personal client side apps, and real Linux VMs on top of wasm with full http networking.
The industry discourse over the last several months has been dominated by “which substrate is the best for ai agent sandboxes” with many competing answers focused on different models and use cases. Cloudflare is one of the most prominent examples, positioning its v8 isolate based workers as the best in class solution thanks to faster than container startup times and strong isolation guarantees.   The v8 isolate is of course the product of chromium, which runs on billions of browsers around the world for free. The browser as a whole is perhaps the most battle tested sandbox system in the entire software industry. It’s been built on 3 decades of learning from hostile content, hostile code, and hostile users. Native and cloud agents are necessarily rebuilding all or most of this posture from scratch. peerd doesn’t. It leverages everything the browser has to offer and pushes it to its functional limits, while inheriting its security baseline and isolation from the host system.
Robust sandb
