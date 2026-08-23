---
title: Qwen 3.8 27b saved me $650+ in API costs this evening
url: >-
  https://www.reddit.com/r/LocalLLaMA/comments/1vrjk4m/qwen_38_27b_saved_me_650_in_api_costs_this_evening/
source: Reddit r/LocalLLaMA
source_type: rss
language: en
published: '2026-08-18T08:47:28.000Z'
fetched_at: '2026-08-18T11:02:01.163Z'
---
I've been experimenting with Qwen3.8-27B using DeepSeek Harness. It's a monster at long-horizon tasks, and the results were pretty wild.
 DeepSeek Harness ran on my Windows PC and connected over LAN to NInfer on a separate RTX PRO 6000 box. The model was Qwen3.8-27B with a 262K context window. All shell commands and file operations stayed on the client PC. The server did nothing except inference.
 The quant was NInfer's groupwise-int artifact, which uses a mixed Q4/Q5/Q6 allocation. I plan to try the NVFP4 profile that NInfer supports next.
 The 8+ hour run
  
966 model calls
 130.2M task input tokens and 812.5K output tokens
 131.2M input and 853.3K output after including compaction
 972 model-facing tool calls
 1,421 actual local tool operations
 31 automatic compaction attempts
 104.83 output tok/s weighted decode speed
 Zero model-generation failures
  
The context sizes got huge. The median root request was 136.6K tokens, p95 was 205.9K, and the largest was 231.2K. The harness pushed about 160 input tokens for every output token. No surprise that repeated context became the main workload.
 The fun part is that generation itself was fast. Dividing the logical input by total time to first token gives about 12.4K prompt tok/s for the root and 8.5K across the root plus subagent. That is not raw GPU PP/s because it includes queue time and possibly reused prefixes, but it is still useful as a client-side number.
 Root time to first token had a median of 0.8 seconds but a p95 of 136 seconds. The subagent's median was 151 seconds, while its median decode phase was only 5.3 seconds. Once NInfer got a request onto the GPU, it absolutely flew. Running two agents against one endpoint mostly added queueing and prefill contention.
 The 1,421 local operations included 576 PowerShell calls, 259 reads, 221 edits, 161 writes, and 114 searches. Only 30 failed, giving the local tool layer a 2.11% error rate. The file tools were mostly finishing in milliseconds.
 What would this ha
