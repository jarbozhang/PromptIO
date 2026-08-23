---
title: >-
  I built an autonomous dev pipeline and ran the same project head to head: a
  27B local on a modded 4090, then again on cheap cloud LLMs
url: >-
  https://www.reddit.com/r/LocalLLaMA/comments/1ujrtgf/i_built_an_autonomous_dev_pipeline_and_ran_the/
source: Reddit r/LocalLLaMA
source_type: rss
language: en
published: '2026-06-30T15:06:44.000Z'
fetched_at: '2026-06-30T23:01:36.521Z'
---
Hey everyone! 
 I open-sourced something I've been working on called Lullabeast. It's an autonomous dev pipeline. You describe your project and planner, executor, and reviewer agents build it phase by phase against a real git repo. 
 How it came to be: for the last year or so I've been trying to standardize a process for building, and I kept finding success with plan, execute, review loops, so I started building a system around that. Every time I hit a pain point I'd try to address it in the rules. But at some point the prompts weren't enough on their own, so I started looking at how to build this into an actual pipeline. After a few attempts, OpenClaw was the first runtime I could get working the way I needed. 
 I wanted to show how this actually performs, so I had it build a multi-team version of Conway's Game of Life with live analytics, and ran the same roadmap through the pipeline twice: 
 **Local** (modded 48GB RTX 4090, Qwen3.6-27B Q8_0, planner + executor used MTP, reviewer was non-MTP)
 0 retries · 3h27m · $0 API 
 **Cloud** (GLM-5.2 planner, Kimi-k2.7 Code executor + reviewer)
 2 retries · 2h04m · $6.90 API 
 *Pro life tip: You can save a lot on API bills if you just buy a regrettably expensive GPU lol* 
 Both builds are live, so check them out and tell me which one you like better. I know which one I'd pick but I want to hear yours: https://lullabeast.ai/living-proof 
 The secret sauce of the pipeline is the deterministic gates that sit between the agent calls. These models fail in predictable ways. They delete files randomly, drift off the spec, and say they're done without ever running the tests. So at every handoff, a gate has to pass before anything moves forward, no LLM involved. The gates check the file manifest, the git diff, the test results, and whether anything got deleted that shouldn't have. They run the show, so an agent never gets to advance on its own say-so. I added multiple retries so you don't have to babysit it, but once the agents use 
