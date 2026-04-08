---
title: >-
  Toward Consistent World Models with Multi-Token Prediction and Latent Semantic
  Enhancement
url: 'https://arxiv.org/abs/2604.06155v1'
source: arXiv
source_type: arxiv
language: en
authors:
  - Qimin Zhong
  - Hao Liao
  - Haiming Qin
  - Mingyang Zhou
  - Rui Mao
categories:
  - cs.LG
  - cs.AI
  - cs.CL
  - cs.LG
published: '2026-04-07T17:54:22Z'
fetched_at: '2026-04-08T02:58:13.563Z'
---
Whether Large Language Models (LLMs) develop coherent internal world models remains a core debate. While conventional Next-Token Prediction (NTP) focuses on one-step-ahead supervision, Multi-Token Prediction (MTP) has shown promise in learning more structured representations. In this work, we provide a theoretical perspective analyzing the gradient inductive bias of MTP, supported by empirical evidence, showing that MTP promotes the convergence toward internal belief states by inducing representational contractivity via gradient coupling. However, we reveal that standard MTP often suffers from structural hallucinations, where discrete token supervision encourages illegal shortcuts in latent space that violate environmental constraints. To address this, we propose a novel method Latent Semantic Enhancement MTP (LSE-MTP), which anchors predictions to ground-truth hidden state trajectories. Experiments on synthetic graphs and real-world Manhattan Taxi Ride show that LSE-MTP effectively bridges the gap between discrete tokens and continuous state representations, enhancing representation alignment, reducing structural hallucinations, and improving robustness to perturbations.

Authors: Qimin Zhong, Hao Liao, Haiming Qin, Mingyang Zhou, Rui Mao
Categories: cs.LG, cs.AI, cs.CL, cs.LG
