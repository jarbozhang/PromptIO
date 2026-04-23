---
title: Consider running a bigger quant if possible
url: >-
  https://www.reddit.com/r/LocalLLaMA/comments/1ssgwcz/consider_running_a_bigger_quant_if_possible/
source: Reddit r/LocalLLaMA
source_type: rss
language: en
published: '2026-04-22T09:54:14.000Z'
fetched_at: '2026-04-23T02:21:55.375Z'
---
Just a little reminder that *if* it is possible for you to run bigger quants, do it. I ran Qwen 3.6 IQ4_XS at 128k context was very much disappointed because it would loop, make formatting errors, implement wrong things etc. I had a little bit of headroom and decided to give the new unsloth IQ4_NL_XL a try and what should I say. It works MUCH better for agentic coding. If you are like me and start conservative with your model selection based on what completely fits into vram, it might worsen your experience to a very big degree. Always look out for how long the processing of a task really takes and ignore tok/s for quant comparisons. You get stuff faster done if the slower tok/s model (even with offload) takes less time to complete queries correctly(duh)
    submitted by    /u/Flashy_Management962  
 [link]   [comments]
