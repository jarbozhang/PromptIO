---
title: >-
  $TCP_α$: Margin-Controlled Confidence estimation for reliable Music
  Information Retrieval
url: 'https://arxiv.org/abs/2608.20326v1'
source: arXiv
source_type: arxiv
language: en
authors:
  - Parampreet Singh
  - Anushka Singh
  - Sumit Kumar
  - Vipul Arora
categories:
  - eess.AS
  - cs.LG
  - eess.AS
published: '2026-08-20T17:58:50Z'
fetched_at: '2026-08-23T11:02:37.244Z'
---
Deep neural networks are often overconfident, assigning high confidence even to incorrect predictions. Consequently, users lack a reliable signal for deciding when a prediction can be trusted. Post-hoc confidence estimation addresses this by training a lightweight auxiliary head over a frozen classifier. Existing targets, however, suffer from inherent ambiguity: they assign overlapping confidence values to correct and incorrect predictions, while errors near the decision boundary receive confidence scores indistinguishable from correct predictions. In this work, we propose $TCP_α$, a novel confidence target that resolves these limitations by introducing a margin-controlled penalty for misclassified samples. We prove that $TCP_α$ guarantees complete separation between the target values of correct and incorrect predictions, with a separation margin that is independent of the number of classes and increases monotonically with the penalty parameter. Since accurate classifiers naturally produce very few errors, learning these targets results in a severely imbalanced regression problem. We therefore present a systematic study of training strategies for learning under this imbalance and identify an effective training configuration through extensive ablation studies. We evaluate the proposed approach on rāga identification, investigate its robustness under domain shift, and further validate it on frame-wise ornamentation detection without modifying the selected configuration. Across 

Authors: Parampreet Singh, Anushka Singh, Sumit Kumar, Vipul Arora
Categories: eess.AS, cs.LG, eess.AS
