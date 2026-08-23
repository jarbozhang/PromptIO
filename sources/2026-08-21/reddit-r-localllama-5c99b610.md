---
title: I pushed Qwen3.8-27B to 381 tps for a single request on a RTX 3090
url: >-
  https://www.reddit.com/r/LocalLLaMA/comments/1vtup5s/i_pushed_qwen3827b_to_381_tps_for_a_single/
source: Reddit r/LocalLLaMA
source_type: rss
language: en
published: '2026-08-20T20:15:04.000Z'
fetched_at: '2026-08-21T11:01:41.857Z'
---
Four days ago I released a hyper-optimized Qwen3.8-27B inference engine for an RTX 3090 (82 tps single request, 672 peak). Since then it went to ~114, then ~138 tps single-user with DFlash2 drafting and lookup-augmented drafting.
 Today it's ~133 tps on real chat prompts, 382 tps when the model reproduces its own context, and the number I care about most this time: a document-quoting workload now runs at 15 of 16 tokens accepted per verify step.
 What we had:
 - fp8 KV cache, lm_head + embed_tokens int8, fp16 recurrent state, int8 activations, DFlash2 block drafting (W4A16-requantized), lookup-augmented drafting, prefix caching for the hybrid, split-KV verify attention, sampler patch, KVarN for 262k context
 Now added:
 - Longer verify blocks. DFlash2 only drafts 7 tokens and I'd assumed the verify block had to match. It doesnt. The lookup drafter fills the extra slots from the request's own context for free. DFLASH_TOKENS=15 verifies 16 tokens per step: 260 to 382 tps reproducing a 25k-token document, +9% on ordinary chat. Costs half the request slots and 8k of context, so it's opt-in.
 - DFlash2 past 64k. bf16 KV is 64 KB/token and teh pinned pool is 5.2 GiB, which is what capped it. An int8 cache roughly doubles it, 138,696 tokens instead of 69,758. Two fixes were needed: vLLM equalises KV page sizes by an integer block ratio, and the drafter's 5 sliding-window layers were wasting 5.2 GiB at 1.88% utilisation until I rounded their block size from 16 to 864.
 - Honest result: +53% where the model reproduces its context, about 2:1 behind plain MTP everywhere else, with twice the TTFT. So it's a mode for RAG front-ends and coding assistants applying edits, not a default.
 - A correction. Someone opened an issue saying our long-context numbers didn't reproduce. They were right. The tables were measured in the batch config, which runs no speculative decoding, and nothing said so. The KVarN decode tax we documented as ~20% is 2.13x single-user at 112k. Most of that is 
