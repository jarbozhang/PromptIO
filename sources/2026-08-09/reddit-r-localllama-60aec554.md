---
title: 'Updated benchmark: Deepseek V4 Flash on SlopCodeBench (local)'
url: >-
  https://www.reddit.com/r/LocalLLaMA/comments/1vjiypj/updated_benchmark_deepseek_v4_flash_on/
source: Reddit r/LocalLLaMA
source_type: rss
language: en
published: '2026-08-09T07:01:43.000Z'
fetched_at: '2026-08-09T11:01:08.933Z'
---
Howdy - I posted a benchmark here - https://www.reddit.com/r/LocalLLaMA/comments/1vbtiy7/deepseek_v4_flash_on_slopcodebench/
 This was using the hosted API - since then I've been playing around with quants
 Here is the lastest benchmark - https://github.com/michaelasper/benchmarks/blob/main/deepseek-v4-flash-0731-pi-on-slop-code-bench.md
 This uses antirez q2-q4 imatrix quant - i switched from opencode to pi
 Very interesting results! Much slower on a macbook m5 max than the hosted API, but switching the harness made up for some of the intelligence lost 
 Compared with the other reported runs
  
 Reported run Serving Harness Strict Isolated Core 
  
 DeepSeek V4 Flash 0731 (run B) local quant (antirez, higher cap) pi 0.84.0 5/17 (29.4%) 6/17 10/17 
  Opus 5 hosted API Claude Code 4/17 (23.5%) — — 
  DeepSeek V4 Flash hosted API OpenCode 1.18.10 3/17 (17.6%) 6/17 11/17 
  Opus 4.8 hosted API Claude Code 1/17 (5.9%) — — 
  Sonnet 5 hosted API Claude Code 1/17 (5.9%) — — 
  DeepSeek V4 Flash 0731 (run A) local quant (unsloth, misconfigured cap) pi 0.84.0 1/17 (5.9%) 1/17 2/17 
 
    submitted by    /u/corruptbytes  
 [link]   [comments]
