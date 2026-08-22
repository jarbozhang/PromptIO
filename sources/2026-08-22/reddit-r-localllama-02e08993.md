---
title: Qwen 3.8 vs 3.6 27b low reasoning loops way less now
url: >-
  https://www.reddit.com/r/LocalLLaMA/comments/1vulsom/qwen_38_vs_36_27b_low_reasoning_loops_way_less_now/
source: Reddit r/LocalLLaMA
source_type: rss
language: en
published: '2026-08-21T16:51:43.000Z'
fetched_at: '2026-08-22T11:01:33.613Z'
---
Have seen some people say Qwen 3.8 still overthinks even when reasoning is set to low. Which on my case has been way better compared to 3.6, eveb on a 3 bit quant.
 I think it's worth mentioning that the default is actually xhigh, so first make sure to specify it if not already.
 Also, Qwen 3.8 has an additional parameter preserve_thinking. It allows to keep/discard the reasoning after every turn. 
 So make sure its activated, otherwise the model may end up reasoning through the same stuff again.
 My personal experience is low loops way less than 3.6 Still not perfect but a significant improvement.
 TLDR: Qwen 3.8 on "low" loops less than 3.6. Check "preserve_thinking" and make sure you're not still on the default "xhigh".
    submitted by    /u/Lair98  
 [link]   [comments]
