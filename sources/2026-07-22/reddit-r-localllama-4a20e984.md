---
title: 'FlightSimulatorBench: Small MoE edition'
url: >-
  https://www.reddit.com/r/LocalLLaMA/comments/1v33dlq/flightsimulatorbench_small_moe_edition/
source: Reddit r/LocalLLaMA
source_type: rss
language: en
published: '2026-07-22T02:42:41.000Z'
fetched_at: '2026-07-22T11:01:20.400Z'
---
Properly done this time. 
 Models as the GIFs are displayed:
  
Qwen3.6-27B - 4bit
 
Qwen3.6-MoE - 6bit
 
Ornith-35B - 6bit
 
Gemma-4-26B - 6bit
 
Qwen3.6-MoE - 4bit
 
HuiHui-Qwen3.6-MoE - 6bit
 
Agents-A1 - 6bit
 
 Inference parameters:
 Qwen3.6 & HuiHui Abliterated:
 temperature 0.6 - top_p 0.95 - top_k 20 - min_p 0.01 - repeat_penalty 1.05
 Ornith-1.0-35B:
 temperature 1.0 - top_p 1.0 - top_k 40 - min_p 0.01 - repeat_penalty 1.05
 Gemma-4:
 temperature 1.0 - top_p 1.0 - top_k 64 - min_p 0.01 - repeat_penalty 1.1
 Agents-A1:
 temperature 0.85 - top_p 0.95 - top_k 20 - min_p 0.01 - repeat_penalty 1.05
 Prompt: "Create a beautiful, relaxing flight simulator in a single html file with mountains, clouds, and endless procedural terrain"
 Harnes: Pi 
 Served by: oMLX
 Method: single prompt. If the html file doesn't work everything was deleted, Pi session was restarted, and model had to start from scratch again. maximum of 3 tries.
 Models Quants used:
 https://huggingface.co/collections/leonsarmiento/local-sota-for-48gb-macs 
    submitted by    /u/JLeonsarmiento  
 [link]   [comments]
