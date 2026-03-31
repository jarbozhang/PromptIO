---
title: >-
  AdaptToken: Entropy-based Adaptive Token Selection for MLLM Long Video
  Understanding
url: 'https://arxiv.org/abs/2603.28696v1'
source: arXiv
source_type: arxiv
language: en
authors:
  - Haozhe Qi
  - Kevin Qu
  - Mahdi Rad
  - Rui Wang
  - Alexander Mathis
categories:
  - cs.CV
  - cs.AI
  - cs.CV
published: '2026-03-30T17:14:15Z'
fetched_at: '2026-03-31T16:54:12.141Z'
---
Long video understanding remains challenging for Multi-modal Large Language Models (MLLMs) due to high memory costs and context-length limits. Prior approaches mitigate this by scoring and selecting frames/tokens within short clips, but they lack a principled mechanism to (i) compare relevance across distant video clips and (ii) stop processing once sufficient evidence has been gathered. We propose AdaptToken, a training-free framework that turns an MLLM's self-uncertainty into a global control signal for long-video token selection. AdaptToken splits a video into groups, extracts cross-modal attention to rank tokens within each group, and uses the model's response entropy to estimate each group's prompt relevance. This entropy signal enables a global token budget allocation across groups and further supports early stopping (AdaptToken-Lite), skipping the remaining groups when the model becomes sufficiently certain. Across four long-video benchmarks (VideoMME, LongVideoBench, LVBench, and MLVU) and multiple base MLLMs (7B-72B), AdaptToken consistently improves accuracy (e.g., +6.7 on average over Qwen2.5-VL 7B) and continues to benefit from extremely long inputs (up to 10K frames), while AdaptToken-Lite reduces inference time by about half with comparable performance. Project page: https://haozheqi.github.io/adapt-token

Authors: Haozhe Qi, Kevin Qu, Mahdi Rad, Rui Wang, Alexander Mathis
Categories: cs.CV, cs.AI, cs.CV
