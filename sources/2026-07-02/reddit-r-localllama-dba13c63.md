---
title: >-
  The gap between closed and open models might be much smaller than commonly
  assumed, because we don’t know what closed model providers do *in addition to*
  model inference
url: >-
  https://www.reddit.com/r/LocalLLaMA/comments/1ukp2bu/the_gap_between_closed_and_open_models_might_be/
source: Reddit r/LocalLLaMA
source_type: rss
language: en
published: '2026-07-01T15:35:24.000Z'
fetched_at: '2026-07-01T23:02:00.939Z'
---
When Claude dominates GLM-5.2 in benchmarks, it’s usually assumed that Anthropic has superior model architectures, superior training pipelines, and other advanced machine learning techniques that make their models better than the competition.
 But actually, this doesn’t follow. Because the benchmarks compare model inference on GLM with the whole Claude product, and we don’t know what that product does behind the scenes.
 Anthropic already redacts reasoning traces and doesn’t give you access to the full conversation. They could easily be using 
  
RAG/knowledge injection, e.g. for software documentation
 Prompt preprocessing
 Context-dependent system prompts
 Hidden internal tool calls
 “Clown-car MoE“/shelling out to specialized expert models
  
all of which can dramatically improve model performance, and serve the entire thing as “Claude” over their API. You wouldn’t know about it and when benchmarking Claude against an open model, you’d effectively be comparing apples to oranges.
 It’s perfectly possible that they don’t have a single model whose inference output beats open models.
    submitted by    /u/-p-e-w-  
 [link]   [comments]
