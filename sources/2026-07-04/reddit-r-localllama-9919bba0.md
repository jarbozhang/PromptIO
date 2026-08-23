---
title: Qwen 27B
url: 'https://www.reddit.com/r/LocalLLaMA/comments/1umk3ax/qwen_27b/'
source: Reddit r/LocalLLaMA
source_type: rss
language: en
published: '2026-07-03T17:06:34.000Z'
fetched_at: '2026-07-03T23:01:09.838Z'
---
Just a datapoint I wanted to share.Qwen 27b, at q6kxl, with multi-token prediction, on a 4090+3090 system, using lcpp, puts out 50-90 tokens/s decode and 1500-2200 token/s pre-fill. Regardless of harness, it reliably interfaces with every API I have asked it to as long as I can link it to the docs. It generates code that works, all the way from single-page apps, LaTeX docs, parsers, crawlers, and most importantly for my use is that it can reliably ingest a decent-size codebase and keep the existing schema for updates. Overall, I think I just want to highlight that this is the first local model I’ve used on my 96GB VRAM system that is reliably coherent, fast, and hasn’t just buried me in added tasks of tuning tools, skills, harnesses, etc. 
    submitted by    /u/13henday  
 [link]   [comments]
