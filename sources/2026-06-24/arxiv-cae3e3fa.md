---
title: >-
  Uncertainty-Aware Longitudinal Forecasting of Alzheimer's Disease Progression
  Using Deep Learning
url: 'https://arxiv.org/abs/2606.24604v1'
source: arXiv
source_type: arxiv
language: en
authors:
  - Arya Hariharan
  - Shreyank N Gowda
  - Anala M R
categories:
  - cs.AI
  - cs.AI
published: '2026-06-23T14:04:27Z'
fetched_at: '2026-06-24T01:28:36.382Z'
---
Longitudinal modelling of Alzheimer's disease progression is clinically useful only if it can describe not just the most likely next diagnosis, but how a patient may evolve over time and how reliable that forecast is. Most deep learning approaches reduce this problem to single-step classification, treating cognitively normal, mild cognitive impairment, and dementia as flat categories while providing limited insight into how uncertainty accumulates across future visits. We propose a probabilistic framework that combines ordinal diagnosis prediction, multi-horizon trajectory generation, and decomposed uncertainty estimation. A Temporal Fusion Transformer encoder is adapted with a CORAL ordinal output layer, asymmetric loss weighting, and converter oversampling to respect disease-stage ordering and improve sensitivity to MCI-to-dementia transitions. Conditioned on the learned patient-context representation, an autoregressive Mixture Density Network generates five-year probabilistic trajectories for diagnosis state, CDR Sum of Boxes, MMSE orientation, and hippocampal volume. On ADNI, the model outperforms linear, recurrent, and transformer baselines for next-visit diagnosis prediction, with the strongest gains on MCI-versus-dementia discrimination. Generated trajectories achieve near-nominal 90% credible interval coverage, widening uncertainty across the forecast horizon, and biomarker dynamics consistent with expected Alzheimer's disease progression. We further separate aleatori

Authors: Arya Hariharan, Shreyank N Gowda, Anala M R
Categories: cs.AI, cs.AI
