---
title: 'TMax: A Simple Recipe for Terminal Agents'
url: >-
  https://www.reddit.com/r/LocalLLaMA/comments/1uco0aa/tmax_a_simple_recipe_for_terminal_agents/
source: Reddit r/LocalLLaMA
source_type: rss
language: en
published: '2026-06-22T15:38:08.000Z'
fetched_at: '2026-06-23T01:34:58.966Z'
---
TMax is the strongest open RL recipe for terminal agents to date, bringing open data recipes closer to the frontier. We release two things. The first is TMax-15k, a dataset of 14,600 RL environments built from a compositional pipeline with explicit control over difficulty and diversity. It is over 2.5× larger than the next-largest open terminal dataset that releases full environment data. The second is a simple, outcome-only RL recipe (GRPO plus a few stability fixes), which we use to train a family of open models from 2B to 27B.
 TMax-9B reaches 27.2% on Terminal Bench 2.0. Under official Terminal Bench settings this is the strongest open-weights model under 10B we are aware of: it beats 32B terminal agents from prior work and approaches closed models like Claude Haiku 4.5 (29.8%). Scaling the same recipe up, TMax-27B improves to 42.7%, approaching models 10 to 40× its size like the 1T-parameter Kimi K2.5 (43.2%).
  
HuggingFace : https://huggingface.co/collections/allenai/tmax
 GitHub : https://github.com/hamishivi/tmax
 Paper : https://github.com/hamishivi/tmax/blob/master/assets/paper.pdf
 Blog : https://wai-org.com/blog/tmax/
  
#JustSharing. I have no idea what to do with this
    submitted by    /u/pmttyji  
 [link]   [comments]
