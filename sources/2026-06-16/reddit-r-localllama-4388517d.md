---
title: >-
  An agent that plans with a frontier model but runs most of tokens locally
  (built it for my own dual-3090 rig)
url: >-
  https://www.reddit.com/r/LocalLLaMA/comments/1u698b1/an_agent_that_plans_with_a_frontier_model_but/
source: Reddit r/LocalLLaMA
source_type: rss
language: en
published: '2026-06-15T07:05:07.000Z'
fetched_at: '2026-06-16T06:31:40.320Z'
---
For the past couple of months, I've been building a tool for my personal use. I have a dual RTX 3090 system which I wanted to use but the qwen 3.5/3.6 27B and Gemma 4 31B while being really good, just didn't have the taste or the ability that a frontier model has.
 OTOH, frontier models are expensive and I didn't want everything I do running through them. I wanted the best of both worlds: frontier reasoning for the plan, local models doing almost all the actual work.
 I have tried a few repos which do enable small models to perform above their weight by 'calling' frontier models, but that's not what I wanted. I want to be able to plan with the frontier model as my experience in software engineering over the last decade+ has taught me that design is the bottleneck in most projects and prevents spaghetti code/rewrites.
 I created an agent and it took a lot of iterations but now I believe I have one and I'm using it for my personal use.
 The crux of the agent is like this (it uses a lot of existing tools, no reinventing the wheel). But it's all customizable.
 3 Tiers, all swappable with config file:
  
Planner: Codex (extremely powerful; though anything that emits the decision JSON works here)
 Local: Qwen 3.6 27B (Great for agentic use and tool calling, good enough for coding)
 Senior (optional): Kimi K2.6 via opencode-go (When the local fails and retry attempts get exhausted)
  
You can have all 3 tiers local, 2 tiers local, one frontier one local or any combination. This is just what I found to work best.
 Every task goes to codex, which can map it to N phases. Say a big coding task will usually map to 3 phases (research, implement, review).
 Similarly a review task will also go into phases (review, artifact).
 Each phase can also grind for multiple epochs, each epoch will give out tasks which the local models do (and do very well), all this is planned by codex.
 The biggest differentiation is deterministic validation. A task only counts as done when a check actuall
