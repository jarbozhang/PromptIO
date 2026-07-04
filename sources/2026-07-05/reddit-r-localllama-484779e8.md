---
title: >-
  Is there some KDL chart for MiMo-V2.5 or something regarding the quants
  quality?
url: >-
  https://www.reddit.com/r/LocalLLaMA/comments/1unfyfo/is_there_some_kdl_chart_for_mimov25_or_something/
source: Reddit r/LocalLLaMA
source_type: rss
language: en
published: '2026-07-04T18:12:47.000Z'
fetched_at: '2026-07-04T23:01:32.107Z'
---
I'm using the model with opencode and the issue is it's looping hard when reasoning. It's not a deranged babbling though, the reasoning is legit large spans of text, it just can't get outside of the loop and make a decision. So I babysit it, stop and direct it to the right path, and it mostly does okay and finishes the job even with the loop remains sitting there in the context.
 So, yea, my current quant is unsloth's ud-q4_k_xl (i hate it when people are using both "-" and "_"!), but judging by htop, I still have ~30GB more to fill, so I probably can up the quant a notch. But will it help? What's your experience with the model?
 Because overall it seems very legit and achieved better results that Qwen 3.5 397B with the same set of tools. Like, I've asked Qwen to plan a project and it did not have a proper web search, only web fetch, so it hallucinated a lot and made up a plan for an app (a dummy 3d "game") using both Vulkan and DX12 simultaneously and with a made up Vulkan version. MiMo then scrapped the plan entirely after reviewing it and managed to actually research a lot with the webfetch alone. 
    submitted by    /u/Rude_Ambassador_6270  
 [link]   [comments]
