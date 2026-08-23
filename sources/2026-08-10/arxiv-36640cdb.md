---
title: 'CoBa: Cost-Effective Test-Time Scaling via Compute-Balanced Routing'
url: 'https://arxiv.org/abs/2608.07424v1'
source: arXiv
source_type: arxiv
language: en
authors:
  - Yan Zhou
  - Yue Ouyang
  - Kaiyang Zheng
  - Suncheng Xiang
categories:
  - cs.AI
  - cs.AI
published: '2026-08-07T17:12:13Z'
fetched_at: '2026-08-10T11:02:54.621Z'
---
Test-time scaling is often implemented by spending more compute along one axis: sampling more solutions, extending a chain of thought, or applying a stronger evaluator. Under a fixed inference budget, these choices compete. This paper formulates test-time reasoning as a compute-allocation problem in which a system must decide whether the next unit of compute should be spent on generation, verification, or stopping. We introduce CoBa, a compute-balanced routing policy that first obtains a small set of candidates, applies cheap verification broadly, and routes uncertain or high-value candidates to stronger verification. On 3,129 example-generator evaluations spanning MATH-500, AIME 2024/2025, AMC 2023, and procedural symbolic reasoning, CoBa-Routed-Strong reaches 85.13% macro accuracy, statistically matching a self-evaluation weighted-voting proxy at 85.20% while using 49.1% fewer parameter-weighted tokens. It also matches best-of-16 majority voting within 0.01 macro-accuracy points while using 58.9% fewer parameter-weighted tokens; paired tests retain a small best-of-16 edge at substantially higher cost. Paired bootstrap tests show significant gains over single-sample decoding, while the remaining gap to the pool oracle exposes headroom for sharper routing. For local reasoning systems, test-time scaling becomes a question of where the next computation is most valuable.

Authors: Yan Zhou, Yue Ouyang, Kaiyang Zheng, Suncheng Xiang
Categories: cs.AI, cs.AI
