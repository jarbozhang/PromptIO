---
title: >-
  Does VLA Even Know the Basics? Measuring Commonsense and World Knowledge
  Retention in Vision-Language-Action Models
url: 'https://arxiv.org/abs/2606.19297v1'
source: arXiv
source_type: arxiv
language: en
authors:
  - Nikita Kachaev
  - Andrey Moskalenko
  - Matvey Skripkin
  - Nikita Kurlaev
  - Daria Pugacheva
categories:
  - cs.LG
  - cs.RO
  - cs.LG
published: '2026-06-17T17:20:46Z'
fetched_at: '2026-06-18T08:58:17.278Z'
---
Embodied Vision-Language-Action (VLA) models are typically obtained by fine-tuning powerful pretrained VLMs on robotics data, yet it is unclear how much commonsense and factual knowledge they retain after adaptation. Failures on knowledge-sensitive tasks are ambiguous, conflating missing knowledge with poor generalization of low-level control. We introduce Act2Answer, a lightweight protocol that adapts VLM knowledge benchmarks to VLA evaluation by requiring agents to answer through action. Each question becomes a short tabletop episode where the agent performs a single object-placement action to select among candidate answers, yielding an action-grounded success rate with reduced control confounds. We curate a test suite of such environments across diverse commonsense and world-knowledge categories and introduce layerwise intent probing to localize answer-relevant information across the VLM backbone and action head. In a large-scale study of 7 VLA models and 9 VLM baselines, we systematically rank models across categories, finding that VLAs show solid performance on simple concepts while exhibiting larger gaps on richer semantic categories relative to their source VLMs, that VQA co-training is associated with better knowledge retention, and that answer-relevant signals peak in middle VLA layers but attenuate in upper layers. Act2Answer is available at https://tttonyalpha.github.io/act2answer/.

Authors: Nikita Kachaev, Andrey Moskalenko, Matvey Skripkin, Nikita Kurlaev, Daria Pugacheva
Categories: cs.LG, cs.RO, cs.LG
