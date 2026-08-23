---
title: >-
  Requential Coding: Pushing the Limits of Model Compression with Self-Generated
  Training Data
url: 'https://arxiv.org/abs/2607.11883v1'
source: arXiv
source_type: arxiv
language: en
authors:
  - Shikai Qiu
  - Marc Finzi
  - Yujia Zheng
  - Kun Zhang
  - Andrew Gordon Wilson
categories:
  - cs.LG
  - cs.LG
published: '2026-07-13T17:58:50Z'
fetched_at: '2026-07-14T23:03:22.213Z'
---
Compression is fundamental to intelligence. A model that can represent its training data as a short code has discovered regularities that enable generalization. Large neural networks may learn functions far simpler than their parameter counts suggest, but it is challenging to construct codes that realize this simplicity. Parameter-based methods such as quantization produce code lengths that scale with model size, insensitive to how much information the parameters store. Prequential coding bypasses this issue by compressing the training trajectory, but codes the exact data sequence regardless of how much the model learns, yielding large codes when the data has high entropy. We introduce requential coding, where a teacher model selects training samples drawn from the student's own distribution. The student's code records only these selections, which cost bits only where teacher and student disagree. The resulting code length is independent of parameter count and data entropy, and often orders of magnitude shorter than the prequential counterpart, with an advantage that grows with scale. This compression sheds light on phenomena inaccessible to prior compressors. Holding loss fixed, larger models and ensembles compress to much smaller sizes despite more parameters. Plugged into a PAC-Bayes bound, the requential code yields state-of-the-art generalization guarantees for billion-parameter LLMs, outperforming bounds built on aggressive post-training quantization even granted zero e

Authors: Shikai Qiu, Marc Finzi, Yujia Zheng, Kun Zhang, Andrew Gordon Wilson
Categories: cs.LG, cs.LG
