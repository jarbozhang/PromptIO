---
title: >-
  Zoom In, Reason Out: Efficient Far-field Anomaly Detection in Expressway
  Surveillance Videos via Focused VLM Reasoning Guided by Bayesian Inference
url: 'https://arxiv.org/abs/2604.23724v1'
source: arXiv
source_type: arxiv
language: en
authors:
  - Xiaowei Mao
  - Bowen Sui
  - Weijie Zhang
  - Yawen Yang
  - Shengnan Guo
categories:
  - cs.CV
  - cs.AI
  - cs.CV
published: '2026-04-26T14:09:55Z'
fetched_at: '2026-04-28T02:04:33.985Z'
---
Expressway video anomaly detection is essential for safety management. However, identifying anomalies across diverse scenes remains challenging, particularly for far-field targets exhibiting subtle abnormal vehicle motions. While Vision-Language Models (VLMs) demonstrate strong semantic reasoning capabilities, processing global frames causes attention dilution for these far-field objects and incurs prohibitive computational costs. To address these issues, we propose VIBES, an asynchronous collaborative framework utilizing VLMs guided by Bayesian inference. Specifically, to overcome poor generalization across varying expressway environments, we introduce an online Bayesian inference module. This module continuously evaluates vehicle trajectories to dynamically update the probabilistic boundaries of normal driving behaviors, serving as an asynchronous trigger to precisely localize anomalies in space and time. Instead of processing the continuous video stream, the VLM processes only the localized visual regions indicated by the trigger. This targeted visual input prevents attention dilution and enables accurate semantic reasoning. Extensive evaluations demonstrate that VIBES improves detection accuracy for far-field anomalies and reduces computational overhead, achieving high real-time efficiency and explainability while demonstrating generalization across diverse expressway conditions.

Authors: Xiaowei Mao, Bowen Sui, Weijie Zhang, Yawen Yang, Shengnan Guo
Categories: cs.CV, cs.AI, cs.CV
