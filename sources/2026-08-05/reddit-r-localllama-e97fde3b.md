---
title: >-
  inclusionAI/Ling-3.0-flash weights are up on Hugging Face — MIT, BF16 plus an
  official FP8
url: >-
  https://www.reddit.com/r/LocalLLaMA/comments/1vfdeek/inclusionailing30flash_weights_are_up_on_hugging/
source: Reddit r/LocalLLaMA
source_type: rss
language: en
published: '2026-08-04T15:21:03.000Z'
fetched_at: '2026-08-05T11:01:21.136Z'
---
Went public in the last few minutes, both repos ungated.
 Ling-3.0-flash, BF16, 24 shards, ~255GB
 Ling-3.0-flash-fp8, official FP8, ~128GB
 127.5B total, they quote 5.1B active. What jumped out at me in config.json is 512 experts with 8 active per token, which is a lot finer-grained than most of what gets posted here. Arch is BailingMoeV3, model_type bailing_hybrid, custom_code, so same family as Ling-2.6-flash. Thinking is a per-request switch inside the chat template instead of a separate SKU, and it defaults to on.
 The FP8 landing at ~128GB is the bit I care about. Someone in the thread here last week guessed ~135GB at Q8_0 and that turned out to be close, except this one is official rather than a community quant, so it's a straight download for anyone with a big unified-memory box or a multi-GPU rig.
 Does anyone know if llama.cpp handles bailing_hybrid yet, or is this vllm and sglang only for now? That's genuinely the thing that decides whether I clear the disk space tonight.
 https://huggingface.co/inclusionAI/Ling-3.0-flash
    submitted by    /u/derspenti  
 [link]   [comments]
