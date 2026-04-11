---
title: 'Seeing but Not Thinking: Routing Distraction in Multimodal Mixture-of-Experts'
url: 'https://arxiv.org/abs/2604.08541v1'
source: arXiv
source_type: arxiv
language: en
authors:
  - Haolei Xu
  - Haiwen Hong
  - Hongxing Li
  - Rui Zhou
  - Yang Zhang
categories:
  - cs.CV
  - cs.AI
  - cs.CL
  - cs.CV
published: '2026-04-09T17:59:44Z'
fetched_at: '2026-04-11T01:43:18.430Z'
---
Multimodal Mixture-of-Experts (MoE) models have achieved remarkable performance on vision-language tasks. However, we identify a puzzling phenomenon termed Seeing but Not Thinking: models accurately perceive image content yet fail in subsequent reasoning, while correctly solving identical problems presented as pure text. Through systematic analysis, we first verify that cross-modal semantic sharing exists in MoE architectures, ruling out semantic alignment failure as the sole explanation. We then reveal that visual experts and domain experts exhibit layer-wise separation, with image inputs inducing significant routing divergence from text inputs in middle layers where domain experts concentrate. Based on these findings, we propose the Routing Distraction hypothesis: when processing visual inputs, the routing mechanism fails to adequately activate task-relevant reasoning experts. To validate this hypothesis, we design a routing-guided intervention method that enhances domain expert activation. Experiments on three multimodal MoE models across six benchmarks demonstrate consistent improvements, with gains of up to 3.17% on complex visual reasoning tasks. Our analysis further reveals that domain expert identification locates cognitive functions rather than sample-specific solutions, enabling effective transfer across tasks with different information structures.

Authors: Haolei Xu, Haiwen Hong, Hongxing Li, Rui Zhou, Yang Zhang
Categories: cs.CV, cs.AI, cs.CL, cs.CV
