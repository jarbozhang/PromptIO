---
title: In-Place Test-Time Training
url: 'https://arxiv.org/abs/2604.06169v1'
source: arXiv
source_type: arxiv
language: en
authors:
  - Guhao Feng
  - Shengjie Luo
  - Kai Hua
  - Ge Zhang
  - Di He
categories:
  - cs.LG
  - cs.AI
  - cs.CL
  - stat.ML
  - cs.LG
published: '2026-04-07T17:59:44Z'
fetched_at: '2026-04-08T02:58:13.561Z'
---
The static ``train then deploy" paradigm fundamentally limits Large Language Models (LLMs) from dynamically adapting their weights in response to continuous streams of new information inherent in real-world tasks. Test-Time Training (TTT) offers a compelling alternative by updating a subset of model parameters (fast weights) at inference time, yet its potential in the current LLM ecosystem is hindered by critical barriers including architectural incompatibility, computational inefficiency and misaligned fast weight objectives for language modeling. In this work, we introduce In-Place Test-Time Training (In-Place TTT), a framework that seamlessly endows LLMs with Test-Time Training ability. In-Place TTT treats the final projection matrix of the ubiquitous MLP blocks as its adaptable fast weights, enabling a ``drop-in" enhancement for LLMs without costly retraining from scratch. Furthermore, we replace TTT's generic reconstruction objective with a tailored, theoretically-grounded objective explicitly aligned with the Next-Token-Prediction task governing autoregressive language modeling. This principled objective, combined with an efficient chunk-wise update mechanism, results in a highly scalable algorithm compatible with context parallelism. Extensive experiments validate our framework's effectiveness: as an in-place enhancement, it enables a 4B-parameter model to achieve superior performance on tasks with contexts up to 128k, and when pretrained from scratch, it consistently 

Authors: Guhao Feng, Shengjie Luo, Kai Hua, Ge Zhang, Di He
Categories: cs.LG, cs.AI, cs.CL, stat.ML, cs.LG
