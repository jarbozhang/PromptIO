---
title: Why are MoE models so belittled?
url: >-
  https://www.reddit.com/r/LocalLLaMA/comments/1utkqfg/why_are_moe_models_so_belittled/
source: Reddit r/LocalLLaMA
source_type: rss
language: en
published: '2026-07-11T13:52:48.000Z'
fetched_at: '2026-07-11T23:01:42.042Z'
---
E.g "Qwen 3.5 122B is just 10B active, so it's no where close to the dense 27B model"
 That is the main sentiment around here and it puzzles me. If a 122B is just worth 10B, then why does model providers bother creating an MoE model when they could've just released a dense 10B model? Heck the 10B dense would run faster than the 122B MoE (no routing overhead), which negates the supposed (only advantage of MoE is speed) argument. It sure is not that simple.
 I mean yes it's only 10B active at a time, but it comes down to the router's effectiveness at choosing what 10B experts to activate. So, the more effective the router is, the closer the model to realize its total parameter potential. So perhaps it's a little more nuances, ie some MoE architectures are better than other MoE architectures. Right? I may be missing something.
    submitted by    /u/ParaboloidalCrest  
 [link]   [comments]
