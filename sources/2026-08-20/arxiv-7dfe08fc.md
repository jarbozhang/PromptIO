---
title: >-
  Beyond Trial Averaging: Anchoring Neural and Visual Representations for
  Few-Repetition Brain-to-Image Retrieval
url: 'https://arxiv.org/abs/2608.19128v1'
source: arXiv
source_type: arxiv
language: en
authors:
  - Zhenyao Cui
  - Siyuan Kan
  - Dingkun Liu
  - Dongrui Wu
categories:
  - cs.LG
  - cs.LG
published: '2026-08-19T17:23:30Z'
fetched_at: '2026-08-20T11:02:39.303Z'
---
Decoding visual information from brain signals probes neural representations and enables neuro-rehabilitation and dream decoding. Recent brain-to-image retrieval approaches have achieved promising performance, typically by averaging many (up to 80) neural trials per image, requiring repeated stimulus presentation that increases latency, cost, and user burden. When only one or a few repetitions are available, the retrieval accuracy drops sharply. This drop is commonly attributed to query noise because averaging suppresses noise and increases signal stability. However, we find a non-transitive alignment pattern: the low-repetition query signal and the image representation each align with the high-repetition center, but not directly with each other. This pattern shows that query noise is only part of the problem and that gallery placement also affects retrieval. We therefore propose a neural-anchor-based retrieval (NEAR) framework that treats the high-repetition center as an anchor and approaches it from both sides: a denoiser pulls the noisy query toward the true anchor, and a small network predicts each candidate's pseudo anchor from its image and pulls the image toward it. Across four datasets spanning EEG, MEG and fMRI, NEAR consistently improved retrieval in the few-repetition regime. On THINGS-EEG2, it improved 200-way Top-1 accuracy by 5.7 and 9.3 percentage points respectively, when averaging one and four repetitions. By anchoring neural and visual representations, NEAR 

Authors: Zhenyao Cui, Siyuan Kan, Dingkun Liu, Dongrui Wu
Categories: cs.LG, cs.LG
