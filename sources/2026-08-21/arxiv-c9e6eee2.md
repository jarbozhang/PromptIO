---
title: 'Phantom Gains: Auditing Self-Improvement Against a Measured Null'
url: 'https://arxiv.org/abs/2608.20290v1'
source: arXiv
source_type: arxiv
language: en
authors:
  - Cheng Xu
  - Nan Yan
  - Liming Chen
  - M-Tahar Kechadi
categories:
  - cs.AI
  - cs.CL
  - cs.AI
published: '2026-08-20T17:30:14Z'
fetched_at: '2026-08-21T11:02:46.145Z'
---
Whether a language model has improved itself is increasingly judged not by mean accuracy but by which individual problems it gains and loses. Tracking these transitions means differencing two noisy estimates, leaving them vulnerable to measurement artifacts. Auditing three rounds of rank-$32$ LoRA self-training on Qwen3-8B against a frozen control pushed through the identical pipeline, we identify seven measurement failures, each of which inverts a reported finding when its control is absent. Several are standard practice. A ledger built on a single greedy decode manufactures capability changes on an untrained model, largely an artifact of inference batching; the expansion statistic separating acquisition from sharpening assigns that same model a rate of $0.280$. The natural threshold repair does not survive replication: estimated across the frozen comparisons such a design already contains, its null stays non-zero. We replace it with a per-problem exact test against a pooled baseline under false-discovery-rate control, which detects nothing on any held-out replicate and is unchanged under the multiple-testing rule, error rate and pool size. Applied to a ladder of arms matched in stream, volume and evaluation, the audit finds that external distillation improves problems the base model rarely reaches while three forms of self-training do not; a regression rejects this asymmetry as a by-product of distillation's larger overall gain ($p &lt; 10^{-8}$). On the far smaller set of 

Authors: Cheng Xu, Nan Yan, Liming Chen, M-Tahar Kechadi
Categories: cs.AI, cs.CL, cs.AI
