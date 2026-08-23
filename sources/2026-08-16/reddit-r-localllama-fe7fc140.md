---
title: 'SOTA Apple Silicon Inference (August 15, 2026)'
url: >-
  https://www.reddit.com/r/LocalLLaMA/comments/1vphr8u/sota_apple_silicon_inference_august_15_2026/
source: Reddit r/LocalLLaMA
source_type: rss
language: en
published: '2026-08-15T23:48:29.000Z'
fetched_at: '2026-08-16T11:01:35.468Z'
---
This is a HANDWRITTEN post. I spent way too much time trying to get fast inference on Apple Silicon. This post is for people who want to know what's the latest on running local models on their mac, and why they may not be seeing the performance others in the community claim.
 TL;DR
 I've spent the last 2 weeks full-time looking into the state of inference optimization on Apple Silicon, and honestly, the software stack is a mess. There is no framework that has all the inference optimizations that are available on CUDA/NVIDIA for the latest Qwen models: prefix caching, speculative decoding, paged KV cache, continuous batching, dynamic scheduling, flash attention, etc.
 On CUDA/NVIDIA, a lot of this stuff is already mature and integrated into the inference stacks people actually use. On Apple Silicon, the pieces are scattered across mlx-lm, vllm-metal, forks, custom model conversions, and a bunch of other frameworks, and a lot of them only implement part of the stack.
 The biggest issue I've found is that the newer Qwen models use a hybrid KV/recurrent state, which makes prefix caching and speculative decoding much harder to combine. On top of that, mlx-lm currently drops the built-in MTP heads during model conversion, so even the models that have built-in speculative decoding support are getting converted without the thing you need.
 From everything I've tested, vllm-metal is the closest thing I've found to a proper Apple Silicon inference optimization stack right now. I think we should stop making another fork every time something is missing and instead get one stack working properly, then upstream the pieces into mlx-lm and vllm.
 The Long Version
 I spent the last 2 weeks digging into this. It should not have taken me this long to understand the space of inference optimizations on Apple Silicon, and I think that's a sign of how bad the space is right now. First of all, llama.cpp on CUDA has everything built in and working.
 You go on Reddit, you look at LocalLLaMA,
