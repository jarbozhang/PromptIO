---
title: >-
  Got GLM-5.2 + MTP speculative decode running on 4× DGX Spark (GB10) — and the
  build piece the public recipe is missing
url: >-
  https://www.reddit.com/r/LocalLLaMA/comments/1ueqfzl/got_glm52_mtp_speculative_decode_running_on_4_dgx/
source: Reddit r/LocalLLaMA
source_type: rss
language: en
published: '2026-06-24T21:23:27.000Z'
fetched_at: '2026-06-25T07:40:38.237Z'
---
TL;DR: the recipe's image-build mods aren't actually public – I reconstructed them from the public kernels (with Claude) – and you have to build vLLM at the author's exact pinned ref or the real AWQ weights crash on load. Running now at ~9.4 tok/s on my own 4× GB10.
 Saw a link on X to CosmicRaisins' GLM-5.2 stack for 4× GB10: vLLM TP=4, MTP speculative decode, ported sparse-MLA Triton kernels (the Hopper-only _flashmla_C path doesn't exist on sm_121), and a data-free 15% expert prune so the AWQ-INT4 weights fit. Great work. I'd actually tried vanilla vLLM for GLM-5.2 on these boxes months ago and it fell over around 512-token context, so I'd been serving it on llama.cpp RPC (~5 tok/s) instead – a working sparse-MLA
 MTP path was exactly what I'd been after. Porting it to my own 4-node Spark cluster, I hit two walls worth sharing:
  
The image isn't reproducible from the public repo. The README points at two vLLM mods in a spark-vllm-docker fork, but they aren't actually published (only the kernels are). So I reconstructed them from the public kernels – a single build-recon-image.sh that bakes the kernels in, patches deep_gemm.py (route the 3 DSA fns to the sm12x_* fallbacks on the sm_120/121 family, before the _missing() gate) and sparse_attn_indexer.py (drop the has_deep_gemm gate on sm12x), auto-applies the flashmla→Triton monkeypatch, and pip install b12x==0.23.0. The wiring validates with a quick import check on the GPU.
 
The base vLLM ref really matters. Building on a newer vLLM than the author's pinned commit made the real AWQ weights crash at process_weights_after_loading (_k_scale.fill_ → async CUDA error: invalid argument). Dummy weights loaded fine, so it was specific to real-weight processing. Rebuilding vLLM at the author's exact ref fixed it instantly. If you port this: pin the ref.
 
 Other port notes: you can skip the 378 GB weight download – the 15% prune is deterministic from the cyankiwi AWQ base via the repo's awq_surgery.py (~20 min, pure safet
