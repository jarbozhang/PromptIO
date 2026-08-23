---
title: >-
  [Benchmark] Kimi K2.7 Code Q3 on Mac Studio M3 Ultra + RTX PRO 6000 over
  llama.cpp RPC: prefill improves, no changes in token generation/decode
url: >-
  https://www.reddit.com/r/LocalLLaMA/comments/1ul7qb6/benchmark_kimi_k27_code_q3_on_mac_studio_m3_ultra/
source: Reddit r/LocalLLaMA
source_type: rss
language: en
published: '2026-07-02T04:09:57.000Z'
fetched_at: '2026-07-02T23:00:55.717Z'
---
I came across this interesting article https://blog.exolabs.net/nvidia-dgx-spark/ while I don't have the DGX spark but it made me curious will this kind of arch speed up my setup for LLMs? 
 Mac can host large models but the prefill speed sucks, so I tested in it on my setup for Kimi 2.7.
 Short answer: it helps prefill, but it does not meaningfully help decode on this setup. RPC is still mostly a capacity tool unless the network/interconnect and split mode are much better.
 Setup
  
Host: Mac Studio M3 Ultra, 512GB unified memory, Metal
 Worker: Linux box with NVIDIA RTX PRO 6000 Blackwell Workstation Edition, 96GB VRAM, CUDA
 Network: direct Ethernet between Mac and Linux box, but only 1GbE in practice
 Measured RPC transfer rate: about 112-113 MiB/s
 Model: unsloth/Kimi-K2.7-Code-GGUF, UD-Q3_K_XL
 Model size on disk: about 432GB across 11 GGUF shards
 Runtime: llama.cpp server version 9827 (4c6e0ff3a), Unsloth build
  
Controlled test
 Same synthetic prompt for both runs:
  
Prompt tokens: 7120
 Generated tokens: 64
 temperature: 0
 ignore_eos: true
 Prompt cache disabled
 Prefill gain: about 14.8%
 Decode gain: about 4.2%
 Total request time improvement: about 12.3%
  
Split trend
 The generation columns are - where I only ran prefill. The controlled generation rows used the exact same 7120-token synthetic prompt; the earlier split-sweep rows were around 7.1K prompt tokens but not always the exact same prompt.
  
 Run RTX share Split Prompt sec Prefill tok/s Decode Total RTX VRAM 
  
 Mac 0% - 53.58 132.88 17.55 tok/s 57.23s none 
  Mac + RTX 15% 15,85 51.48 138.3 - - 69.4GB 
  Mac + RTX 19% 19,81 50.22 141.77 - - 84.1GB 
  Mac + RTX 20% 20,80 49.54 143.72 - - 93.2GB 
  Mac + RTX 20% 20,80 46.69 152.49 18.28 tok/s 50.19s 93.3GB 
  Mac + RTX 21% 21,79 - failed - - failed 
 
 20,80 was the practical max on this card with 128K context.
 21,79 failed even at 8K context:
 RPC/network trace
 For the 7120-token prefill-only 20,80 run:
  
Mac -> RTX: 251.59 MiB, 2.03s
 
