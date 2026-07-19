---
title: 192GB gang - what are you running?
url: >-
  https://www.reddit.com/r/LocalLLaMA/comments/1v0hw0s/192gb_gang_what_are_you_running/
source: Reddit r/LocalLLaMA
source_type: rss
language: en
published: '2026-07-19T05:29:36.000Z'
fetched_at: '2026-07-19T23:01:24.641Z'
---
Understandably, most chat is around models that fit in 16/32GB VRAM. I totally get that. And I think Qwen3.6-27B is awesome. But, a while back, I bought an M2 Ultra Mac Pro specifically for AI, so my main interest is in models in that size-region.
 Personally, I have been running Qwen3.5-397B since it came out. It’s been fantastic to be honest. I’m running the Unsloth Dynamic UD-Q3_K_XL gguf.
 I put a lot of work into fixing the issues in llama.cpp for hybrid recurrent models. Fixed KV cache breaking when vision is enabled. Fixed saving slots to disk for instant restore, even when images have been used in the chat. I’m not a coder, but I vibe coded all this with Claude. Some of it is a bit hacky, otherwise I would have put it on GitHub. It works on Qwen3.5, but would likely break with other models. Plus it’s based on a version of llama.cpp that is about four months old at this point. Unfortunately, tool calls still break KV cache. That’s my next thing to fix. At some point I hope to re-base it and I’ll fix it and release it if mainline doesn’t beat me to it.
 Anyway, that’s all kind of by-the-by. Due to all the work I have put into making 397B work well, I haven’t experimented with other models. Other models that interest me:
 GLM 4.7 357B
 Deepseek V4 Flash 284B
 Tencent Hy3 295B
 Minimax M3 428B
 Laguna M.1 225B
 Minimax M2.7 229B
 Mimo 2.5 310B
 Am I missing any? Which models are you guys running? What are they like? Have you compared any of them to Qwen3.5-397B? I’m definitely going to try Hy3 when Unsloth’s GGUFs come out.
    submitted by    /u/CentrifugalMalaise  
 [link]   [comments]
