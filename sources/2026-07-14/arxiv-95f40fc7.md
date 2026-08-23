---
title: >-
  4DR360: State Reasoning for Joint 3D Detection and Occupancy Prediction in 4D
  Radar-Camera Full-Scene Perception
url: 'https://arxiv.org/abs/2607.09629v1'
source: arXiv
source_type: arxiv
language: en
authors:
  - Xiaokai Bai
  - Lianqing Zheng
  - Runwei Guan
  - Songkai Wang
  - Siyuan Cao
categories:
  - cs.CV
  - cs.AI
  - cs.CV
published: '2026-07-10T17:26:19Z'
fetched_at: '2026-07-13T23:03:29.909Z'
---
Reliable autonomous driving requires full-scene perception that couples foreground objects with dense semantic layout. Recently, 4D millimeter-wave radar has emerged as a robust and affordable sensor, yet its sparse returns make radar-camera fusion necessary for comprehensive scene understanding. Existing radar-camera methods mainly optimize detection, while dual-task systems usually decode boxes and occupancy with limited interaction. To address this gap and advance radar-based multi-task learning, we propose \method, a 4D radar-camera framework for 360$^\circ$ full-scene perception, which models semantic occupancy as a persistent scene state rather than a terminal output. \method{} follows a cross-modal state reasoning paradigm, where the occupancy state is modeled and propagated through stages for coarse-to-fine feature aggregation. Specifically, State-guided BEV Enhancement (SBE) strengthens intra-frame BEV representation, while Doppler-guided Temporal Fusion (DTF) preserves state evidence over longer temporal horizons. Beyond the model, we further extend ManTruckScenes with satellite-map-based generated occupancy labels and pair it with OmniHD-Scenes in a unified cross-dataset detection-and-occupancy protocol. The resulting experiments cover accuracy, robustness, ablation, and efficiency under one radar-camera multi-task evaluation framework. Code and labels will be released upon acceptance.

Authors: Xiaokai Bai, Lianqing Zheng, Runwei Guan, Songkai Wang, Siyuan Cao
Categories: cs.CV, cs.AI, cs.CV
