---
title: llama.cpp - how to free up even more space on your GPU
url: >-
  https://www.reddit.com/r/LocalLLaMA/comments/1u8i79d/llamacpp_how_to_free_up_even_more_space_on_your/
source: Reddit r/LocalLLaMA
source_type: rss
language: en
published: '2026-06-17T18:23:10.000Z'
fetched_at: '2026-06-18T08:56:38.994Z'
---
For the past week or two, llama.cpp has been working much better from the RAM usage prespective. I no longer see any memory leaks, and everything fits nicely on the GPU - my defaults are --n-gpu-layers 99 --no-mmap --mlock to avoid using the regular RAM, since I use my 3090 with an eGPU setup: Qwen3.6-27B-UD-Q5_K_XL-mtp, q4_0, 150k context
 I wanted to create this thread to see if there are any additional tricks for freeing up even more memory so that I can further increase my context size.
 My list of VRAM-related parameters for a given model (which is, of course, the biggest factor in memory footprint):
  
--no-mmproj-offload: this is the biggest win: if you have a model with vision, you can offload the mmproj to CPU. It is a little drop in terms of performance, but you'll end up with 1GB additional free space on your card.
 --cache-type-k, --cache-type-v: KV cache (obviously) - reduce memory allocation by 50%, 75%, etc. but of course, quality will drop in return. my observation is that since attention rotation has been introduced, I can even use q4 without much noticable drop of quality, since I can use a bigger base model - which helps me more vs drop of quality because of KV cache.
 --cache-type-k-draft, --cache-type-v-draft: same applies to the mtp model's KV cache
 --spec-draft-n-max: guess up to x future tokens ahead in a single forward pass. With coding, I'm usually fine with "2" as the value. "1" consumes slightly less memory, but TPS drops about 5%. "3" doesn't make sense for my use case - consumes more memory, but same TPS as with "1"
 --flash-attn on: this is the default value by now, as far as I know. Memory allocation would grow if you'd turn it off, but you cannot turn it off anyway if you use a quantized v cache
  
Parameters I thought would help, until I realized they actually don't:
  
--ctx-checkpoints: I've heard that decreasing this value would also decrease memory allocation, but it's not the case for me. Default is 64, and no change for me wh
