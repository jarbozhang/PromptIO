---
title: >-
  llamacpp patch - DeepSeek V4 Flash running with full 1M token context locally
  on RTX 5090
url: >-
  https://www.reddit.com/r/LocalLLaMA/comments/1ulymml/llamacpp_patch_deepseek_v4_flash_running_with/
source: Reddit r/LocalLLaMA
source_type: rss
language: en
published: '2026-07-02T23:54:02.000Z'
fetched_at: '2026-07-03T23:01:09.835Z'
---
Wanted to try running DeepSeek V4 Flash locally but found it asking for absurd amounts of VRAM at higher context lengths (~256GB at 1M). Turned out the DSA lightning indexer lacks proper llamacpp support. Did a bit of digging and there's an upstream PR to address the issue (shoutout u/fairydreaming, PR #24231), but even there it's not wired into the model graph and has no CUDA path yet. So I wired it in and implemented a CUDA kernel this morning and figured I'd share in case it's useful to anyone else looking to run something like this.
 Hardware: RTX 5090, 9950X3D, 96GB DDR5
 Model: DeepSeek-V4-Flash, mixed Q8/Q4/Q2 quant by antirez
 Before / after (256K context):
  
 Metric Before After 
  
 Compute buffer ~67 GiB (OOM) 3.2 GiB 
  Prefill 56 t/s ~263 t/s 
  Decode ~14 t/s ~14 t/s 
  1M context impossible (~256GB) works (3.75 GiB at ubatch 768) 
 
 Validated presets:
  
 Context Prefill Decode Peak VRAM 
  
     
  256K ~263 t/s 14 t/s ~29 GiB 
  512K 256 t/s 13.7 t/s ~28 GiB 
  1M 159 t/s* 13.7 t/s ~31 GiB 
 
 *lower ubatch on 32gb 5090 at 1M - should be ~full speed if given the full ~9gb vram
 Correctness: verified briefly with a needle-in-haystack test - planted a random fact at 10%/50%/90% depth in a 100K-token document, model retrieved it correctly every time. Also retrieved correctly at 512K and 1M's harder 50% depth. Full KLD findings in doc linked below
 Source + build instructions + full writeup: https://github.com/spencer-zaid/llama.cpp/blob/deepseek-lid-cuda/docs/deepseek-v4-lid-cuda.md
 Branch: https://github.com/spencer-zaid/llama.cpp/tree/deepseek-lid-cuda
 No prebuilt binary (single GPU tested RTX 5090). Build instructions in the doc in case you need them
    submitted by    /u/da_dragon321  
 [link]   [comments]
