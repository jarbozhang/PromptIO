---
title: >-
  Diffusion-Proof: Recipe for Formal Theorem Proving Beyond Auto-Regressive
  Generation
url: 'https://arxiv.org/abs/2606.19315v1'
source: arXiv
source_type: arxiv
language: en
authors:
  - Ruida Wang
  - Rui Pan
  - Pengcheng Wang
  - Shizhe Diao
  - Tong Zhang
categories:
  - cs.LG
  - cs.LG
published: '2026-06-17T17:38:32Z'
fetched_at: '2026-06-18T08:58:17.276Z'
---
Enhancing the formal math reasoning capabilities of Large Language Models (LLMs) has become a key focus in both mathematical and computer science communities in recent years. While significant progress has been made in using state-of-the-art Auto-Regressive (AR) LLMs for formal theorem proving, these models suffer from inherent limitations. Their next-token prediction generation methods may yield suboptimal performance due to the challenges of long-range coherence and the compounding of errors over long sequences. Recent advancements in diffusion LLMs (dLLMs), which generate text through iterative denoising of a multi-token block, offer a promising alternative. However, the application of dLLMs to formal mathematics, where maintaining long-range coherence is critical, remains largely understudied. To address the challenges above, we propose **Diffusion-Proof**, to the best of our knowledge, the first framework to train and apply dLLMs for formal theorem proving. Our frameworks contain training and inference methods for two models. The first one is *dLLM-Prover-7B*, which performs whole-proof writing with long-range coherent tactic usage. The second one is *dLLM-Corrector-7B*, which is a novel large block diffusion-based correction model. It leverages the in-filling capabilities of dLLMs to perform local proof correction using bi-directional information. Extensive experiments demonstrate that **Diffusion-Proof** relatively significantly outperforms the AR LLM baseline trained 

Authors: Ruida Wang, Rui Pan, Pengcheng Wang, Shizhe Diao, Tong Zhang
Categories: cs.LG, cs.LG
