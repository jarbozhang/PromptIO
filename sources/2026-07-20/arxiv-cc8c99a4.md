---
title: Mutable Low-Rank Sketches for Retrain-Free Recommendation
url: 'https://arxiv.org/abs/2607.15242v1'
source: arXiv
source_type: arxiv
language: en
authors:
  - Hector J. Garcia
  - Nick Clayton
categories:
  - cs.LG
  - cs.LG
published: '2026-07-16T17:39:38Z'
fetched_at: '2026-07-19T23:02:36.423Z'
---
A common bottleneck in two-stage recommendation is embedding staleness: when a user rates a new item, their embedding remains fixed until the next retrain cycle. We propose mutable sketches, which store each user's preferences in a KP-tree (a sparse segment tree with sum aggregation), fit a low-rank projection once, and recompute embeddings on-the-fly as ratings arrive. We prove that each new observation monotonically tightens the prediction error envelope (Theorem 1), a guarantee that FunkSVD and eALS lack. On KuaiRec, the mutable sketch achieves 0.810 RMSE at 1.8% data read vs. ALS 0.822 at 100%, with 8x faster per-batch updates. A new user receives personalized recommendations in &lt;1 ms after their first rating, with no model retraining required. A comparison of sampling strategies across density regimes shows that the KP-tree's norm-proportional sampling provides 40-130% better item coverage on sparse data (&lt;1% density), while uniform sampling suffices on dense matrices.

Authors: Hector J. Garcia, Nick Clayton
Categories: cs.LG, cs.LG
