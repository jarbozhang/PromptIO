---
title: Multimodal Model Diffing for Feature Discovery and Control
url: 'https://arxiv.org/abs/2608.09928v1'
source: arXiv
source_type: arxiv
language: en
authors:
  - Hunar Batra
  - Lachin Naghashyar
  - Ashkan Khakzar
  - Philip Torr
  - Christian Schroeder de Witt
categories:
  - cs.CV
  - cs.AI
  - cs.CL
  - cs.LG
  - cs.CV
published: '2026-08-10T17:59:30Z'
fetched_at: '2026-08-11T11:02:16.306Z'
---
Multimodal Large Language Models (MLLMs) exhibit strong visual understanding, yet the internal features that cause these behaviors remain difficult to identify, audit, or control. While applicable to post-hoc inspection, hidden states that are decomposed into interpretable feature directions using sparse autoencoders (SAEs) neither readily isolate which features are changed by multimodal training, nor are they directly useful for targeted control. We introduce MMDiff, a multimodal model-diffing framework that trains multimodal SAEs and turns them into feature-level interfaces for discovering and controlling multimodal behavior. MMDiff supports three uses: (i) feature isolation, by diffing a base-LM SAE against its multimodal-adapted counterpart to identify features altered by multimodal training; (ii) task-specific feature detection, via per-token contrastive firing analysis that isolates causal features; and (iii) feature-level control, by causally removing or steering the discovered feature directions. We train multimodal SAEs for three MLLM families, LLaVA-MORE, PaliGemma 2, and InternVL3.5, and evaluate on visual-spatial understanding, multimodal safety, and OCR. MMDiff discovers sparse, causally specific features whose removal selectively degrades target behaviors by an average of 12% on spatial tasks and 17% on OCR, and reduces attack success rate by 24% on multimodal safety attacks, with no impact on VQA performance. Steering these features improves spatial and OCR acc

Authors: Hunar Batra, Lachin Naghashyar, Ashkan Khakzar, Philip Torr, Christian Schroeder de Witt
Categories: cs.CV, cs.AI, cs.CL, cs.LG, cs.CV
