---
title: I pushed Qwen3.8-27B to 124 tps on a single request on a RTX 3090
url: >-
  https://www.reddit.com/r/LocalLLaMA/comments/1vrw4sz/i_pushed_qwen3827b_to_124_tps_on_a_single_request/
source: Reddit r/LocalLLaMA
source_type: rss
language: en
published: '2026-08-18T17:35:35.000Z'
fetched_at: '2026-08-19T11:01:44.119Z'
---
Two days ago I released a hyper-optimized Qwen3.8-27B inference engine for an RTX 3090 (82 tps single request, 672 peak) - yesterday's update took that to 99 tps single-user / ~1,000 tps at 64 concurrent.
 Since then I've focused on the single-request number, again without quality degradation. It's now ~114 tps at default sampling and ~124 tps greedy (real chat prompts, not random tokens), up from 90 / 98.
 What we had:
 - fp8 KV cache, lm_head + embed_tokens int8, fp16 recurrent state, int8 activations, MTP-4 drafts with a 40k-token draft head, draft_sample_method=probabilistic
 Now added:
 - Draft vocabulary counted over the model's own outputs - the old web-text list covered about 92% of what the model generates (83% on code), and every miss is a forced rejection; the new one covers 97.5%. 98 → 109 tps greedy.
 - GPTQ-int4 lm_head and MTP module, calibrated on the model's own hidden states: +0.6% PPL, GSM8K unchanged, acceptance intact, −1.8 ms per step. Ships as a "fast variant" (python fetch_fast_variant.py, ~1 GB from the Hub).
 - Split-KV attention kernel for the verify step... FlashAttention-2 only splits KV for single-query decode, so with 4 drafts it used 24 of the 3090's 82 SMs. Small Triton kernel: 5× faster at 1.5k context, 10× at 16k.
 - Sampler patch -§ sort-free top-k/top-p, multi-block softmax, drafts sampled from the target's truncated support: +4% at default sampling.
 - KVarN 4/2-bit KV cache ported to vLLM 0.27.1: the full 262k context now fits, needle correct to 240k, +0.16% PPL, ~20% slower decode at 100k. Optional (KV=kvarn / CTX=huge).
 - bench/run_benchmarks.sh + verify.sh to reproduce the tables and check the install is actually patched.
 Peak concurrent throughput is unchanged (~1,000 tps at 64 concurrent). Speculative decoding is exact by construction, so the sampled distribution is the same as without it.
 Repo: https://github.com/syv-ai/qwen38-27b-rtx3090
 Fast-variant tensors: https://huggingface.co/syvai/qwen3.8-27b-3090-fast-variant
