---
title: Why people cares token/s in decoding more?
url: >-
  https://www.reddit.com/r/LocalLLaMA/comments/1t5hebz/why_people_cares_tokens_in_decoding_more/
source: Reddit r/LocalLLaMA
source_type: rss
language: en
published: '2026-05-06T16:09:24.000Z'
fetched_at: '2026-05-07T10:33:23.090Z'
---
What I've noticed while using local LLM recently is that in most cases, bottlenecks occur not in decoding but in prompt processing. 
 If the prompt processing speed is usable, in most settings (since it takes about 15k when starting based on agentic coding standard) it exceeds 10 tokens per second in generating, doesn't that exceed the speed we can follow with our eyes? 
 I tried to use qwen3.6 27b but it took more than 10m to process 64k prompt on my mac mini, so I rather chose 35b a3b
 What am I missing? Is the prompt processing speed improved by MTP or other methods? 
 Or is bottleneck just really different with discrete gpu settings?
    submitted by    /u/Interesting-Print366  
 [link]   [comments]
