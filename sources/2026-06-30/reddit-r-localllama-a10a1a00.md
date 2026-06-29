---
title: Going from single GPU to dual GPU is nice but not in the way I expected
url: >-
  https://www.reddit.com/r/LocalLLaMA/comments/1uiuyyp/going_from_single_gpu_to_dual_gpu_is_nice_but_not/
source: Reddit r/LocalLLaMA
source_type: rss
language: en
published: '2026-06-29T15:02:20.000Z'
fetched_at: '2026-06-29T23:01:34.483Z'
---
I was expecting what when doubling my VRAM from 24gb to 2x24gb I'd use higher quants with more context, and thus get smarter LLMs, but that's not what it ended up happening.
 At least for coding, I found that the difference in quality from, say, qwen 27B UD-Q4-XL to a Q6 or Q8 is rather small.
 Instead, at least for coding, the way I'm getting advantage of my extra power is parallelism.
 Instead of getting a smarter LLM, I am using qwen 27B with a lot of context as the orchestator, having split the tasks into smaller/narrower subtasks that then I can pass down to subagents, oftentimes qwen 35B-A3B, which is good enough when the task is narrow and well defined, and those sub agents can usually perform those tasks with a 115k context limit, report back to the main one and die, which allows me to have 2 of them.
 The result is a much higher overall thoughtput because I can have 3 agents in parallel where before I could only have THE one, I don't have to unload a model to load faster one to run less critical tasks such as exploration or web research, and most of the time those agents perform their tasks without having to compact.
 The main agent does compact eventually, but a lot less often. Subagents rarely do.
 I didn't see a lot of people with > 32gb of vram talk about this, most people seem obsessed with trying to run 100B+ models sharing system ram if needed, but I am actually getting more value out of smaller models that divide and conquer and review each other's work than from trying to run behemoth models at inadequate speeds in an attempt to one-shot stuff.
 Every once in a while I ask a true SOTA closed model to review the entire project and compile a list of improvements, much like someone would hire an expert consultant every once in a while for a short gig.
 But most of the work doesn't need it anymore.
    submitted by    /u/cibernox  
 [link]   [comments]
