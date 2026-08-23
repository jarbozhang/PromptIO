---
title: I pushed Qwen3.8-27B limits again... Dflash2 - 134 tps on a RTX 3090
url: >-
  https://www.reddit.com/r/LocalLLaMA/comments/1vsy4l2/i_pushed_qwen3827b_limits_again_dflash2_134_tps/
source: Reddit r/LocalLLaMA
source_type: rss
language: en
published: '2026-08-19T20:28:00.000Z'
fetched_at: '2026-08-20T11:01:24.241Z'
---
Edit: Title says 134 tps, it's actually 138 -- keep in mind my 3090 is power limited to 250w. 
 Three days ago I released a hyper-optimized Qwen3.8-27B inference engine for an RTX 3090 (82 tps single request, 672 peak), and yesterday's update took it to ~114 tps single-user / ~1,000 tps at 64 concurrent.
 Today it's ~138 tps at default sampling on real chat prompts (up from ~124), 942 tps at 64 concurrent (re-measured today on the current stack), and the thing I'm actually happy about: a follow-up turn in a long chat now costs ~1 second instead of ~23.
 What we had:
 - fp8 KV cache, lm_head + embed_tokens int8, fp16 recurrent state, int8 activations, MTP-4 drafts with an own-output 40k draft head, GPTQ-int4 lm_head/MTP, split-KV verify attention, sampler patch, KVarN for 262k context
 Now added:
 - DFlash2 drafting. Inco published a block drafter for this exact model (5 layers, predicts 7 tokens in one non-autoregressive pass + a path selector). vLLM support is an unmerged PR on main, so I backported it to 0.27.1 and fixed what it silently relies on - including one real bug: 0.27.1 caches temperature-applied draft logits while main caches raw ones, so at 0<T≠1 the verify would have used the wrong proposal distribution. 2.8 → 3.3 tokens per step.
 - The drafter requantized to W4A16. It's 3.85 GB in bf16, which on a 24 GB card is a net loss (106 tps). GPTQ int4 with Hessians captured from the drafter's own inputs on real traffic: 1.19 GB, no greedy acceptance loss, and that's what turns it into a win. Ships as python fetch_dflash2.py.
 - Lookup-augmented drafting (my own idea - really happy about this one). A block drafter sees a 2,048-token window, but a long-context assistant spends much of its output reproducing what it was given... quoting a doc, repeating commands, rewriting a paragraph while keeping the code. Those tokens sit verbatim in the prompt, 20k tokens beyond what the drafter can see. So: one Triton kernel scans the request's own token history for the mo
