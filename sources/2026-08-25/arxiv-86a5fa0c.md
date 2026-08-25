---
title: 'ConvergeFlow: Language Flow with Provable Convergence to Token Embeddings'
url: 'https://arxiv.org/abs/2608.23551v1'
source: arXiv
source_type: arxiv
language: en
authors:
  - Na Li
  - Yuchen Jiao
  - Changxiao Cai
  - Gen Li
categories:
  - cs.CL
  - cs.AI
  - cs.LG
  - stat.ML
  - cs.CL
published: '2026-08-24T17:54:14Z'
fetched_at: '2026-08-25T11:02:03.406Z'
---
Recent advances in continuous diffusion and flow-based language models (LMs) have achieved performance competitive with discrete LMs. However, existing continuous frameworks still rely on decoders supervised with cross entropy (CE) because the flow trajectories are not guaranteed to terminate at valid token embeddings. Motivated by this limitation, we introduce \textbf{ConvergeFlow}, an embedding-space flow-based LM, which constrains the data predictor to the convex hull of token embeddings and trains it solely with the mean squared error objective induced by flow matching. Under suitable regularity conditions, we prove that the resulting flow converges to valid token embeddings despite errors in the data predictor, enabling direct token prediction without a CE-supervised decoder. We further develop three sampling mechanisms for controlling the trade-off between the generative perplexity and entropy. Experiments on OpenWebText demonstrate that ConvergeFlow achieves performance competitive with existing continuous and discrete diffusion LMs. These findings demonstrate the potential of the flow-based paradigm for language modeling. Our code is available at https://github.com/Na-Li66/ConvergeFlow.

Authors: Na Li, Yuchen Jiao, Changxiao Cai, Gen Li
Categories: cs.CL, cs.AI, cs.LG, stat.ML, cs.CL
