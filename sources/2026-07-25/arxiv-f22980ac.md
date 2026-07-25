---
title: 'Windowed-MTP: Removing the Full-Context Draft-KV Tax at Million-Token Context'
url: 'https://arxiv.org/abs/2607.21535v1'
source: arXiv
source_type: arxiv
language: en
authors:
  - Alagappan Valliappan
categories:
  - cs.LG
  - cs.CL
  - cs.PF
  - cs.LG
published: '2026-07-23T17:21:44Z'
fetched_at: '2026-07-25T11:02:48.263Z'
---
Speculative decoding accelerates autoregressive generation by having a cheap draft propose tokens that a target verifies in parallel. Frontier models increasingly ship a built-in Multi-Token-Prediction (MTP/NEXTN) draft head under the assumption that the draft is negligibly cheap. At million-token context this breaks: an MTP draft head typically runs full attention over the entire KV cache at every draft step, so its read grows linearly with context and comes to dominate the draft cost -- precisely where speculation is most valuable. The effect compounds with draft length (a deep native draft can turn net-negative, slower than no speculation) and sharpens under hybrid/linear-attention targets, where cheaper verification leaves the draft's full-attention read exposed. We apply a StreamingLLM-style sliding window plus attention sink to the draft's attention only (Windowed-MTP), leaving full-attention verification intact. It is training-free, drop-in, and lossless by construction: the full-attention target still decides every accepted token, so windowing changes only which tokens are proposed, never which are accepted. It bounds the draft's KV working set to a constant, dropping ~99% of KV entries at 1M. Across three architecture families (Qwen GDN-MoE 35B/122B and a Mamba2-hybrid NoPE 120B) at 1M context on a single GPU in SGLang, windowing cuts the per-decode-step cost over the shipping native MTP draft by +28% to +44%, an input-invariant margin that widens with context. Since

Authors: Alagappan Valliappan
Categories: cs.LG, cs.CL, cs.PF, cs.LG
