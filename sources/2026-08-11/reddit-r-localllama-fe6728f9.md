---
title: I ran Muse Glimmer @ 1M context - All tests passed.
url: >-
  https://www.reddit.com/r/LocalLLaMA/comments/1vl9adk/i_ran_muse_glimmer_1m_context_all_tests_passed/
source: Reddit r/LocalLLaMA
source_type: rss
language: en
published: '2026-08-11T06:13:04.000Z'
fetched_at: '2026-08-11T11:01:01.022Z'
---
Heeeey all! I just completed some fun tests with Muse Glimmer, I thought I'd let you know. In fact, the summary below was written by Muse itself!
 I ran a 2× DGX Spark cluster and got Meta's day-old Muse Glimmer 30B running the day after release — then pushed its context from the trained 131K all the way to 1M with YaRN, verifying retrieval at every rung. Sharing config + results since the "131,072+" hint in the model card turned out to be very real.
 Setup
  
Hardware: 2× NVIDIA DGX Spark (GB10, 128 GB unified each, ~273 GB/s), ConnectX-7 direct link between them
 Engine: llama.cpp master (day-1 muse_glimmer support), built from source with CUDA sm_121 + GGML_RPC
 Model: official Muse-Glimmer-30B-GGUF K-Quant-Dynamic (~18.3 GiB) + official mmproj (vision) + official DFlash drafter
 Spec decode: --spec-type draft-dflash --spec-draft-n-max 15 (block-diffusion drafter)
 Context extension: --rope-scaling yarn --rope-scale <2/4/8> --yarn-orig-ctx 131072 plus --override-kv muse-glimmer.context_length=int:<N> (llama.cpp caps at trained length otherwise)
 Yes, we also ran it split across both Sparks with llama.cpp RPC — no reason beyond liking to cluster things for fun. Our daily driver on this hardware is DeepSeek-V4-Flash-0731 on official vLLM, TP=2 over RDMA at full 1M context, which is the fair comparison point.
  
Results
 Needle-in-haystack (3 needles at 10/50/90% depth):
  
 Document size vs training (131K) Retrieval 
  
 97K tokens native 3/3 
  188K tokens 1.4× 3/3 
  415K tokens 2.9× 3/3 
  832K tokens 6.35× (deepest needle ~749K) 3/3 
 
 Speed:
  
Single Spark: ~10.5 tok/s baseline decode → 36–38 tok/s with DFlash (~3×, matching Meta's claimed 3.1× on a 5090); prefill ~700 tok/s short-context, ~390 tok/s deep into an 832K prompt; ×4 concurrent ≈ 57 tok/s aggregate per node
 RPC split across both Sparks: 25–28 tok/s decode — ~30% slower than single-node. A 20 GB model doesn't need two nodes, and layer-split pays a network hop per token. Fun, not fast.
  
Other:
 
