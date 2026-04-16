---
title: 'UI-Zoomer: Uncertainty-Driven Adaptive Zoom-In for GUI Grounding'
url: 'https://arxiv.org/abs/2604.14113v1'
source: arXiv
source_type: arxiv
language: en
authors:
  - Fei Tang
  - Bofan Chen
  - Zhengxi Lu
  - Tongbo Chen
  - Songqin Nong
categories:
  - cs.CV
  - cs.AI
  - cs.CL
  - cs.CV
published: '2026-04-15T17:32:28Z'
fetched_at: '2026-04-16T06:07:35.555Z'
---
GUI grounding, which localizes interface elements from screenshots given natural language queries, remains challenging for small icons and dense layouts. Test-time zoom-in methods improve localization by cropping and re-running inference at higher resolution, but apply cropping uniformly across all instances with fixed crop sizes, ignoring whether the model is actually uncertain on each case. We propose \textbf{UI-Zoomer}, a training-free adaptive zoom-in framework that treats both the trigger and scale of zoom-in as a prediction uncertainty quantification problem. A confidence-aware gate fuses spatial consensus among stochastic candidates with token-level generation confidence to selectively trigger zoom-in only when localization is uncertain. When triggered, an uncertainty-driven crop sizing module decomposes prediction variance into inter-sample positional spread and intra-sample box extent, deriving a per-instance crop radius via the law of total variance. Extensive experiments on ScreenSpot-Pro, UI-Vision, and ScreenSpot-v2 demonstrate consistent improvements over strong baselines across multiple model architectures, achieving gains of up to +13.4\%, +10.3\%, and +4.2\% respectively, with no additional training required.

Authors: Fei Tang, Bofan Chen, Zhengxi Lu, Tongbo Chen, Songqin Nong
Categories: cs.CV, cs.AI, cs.CL, cs.CV
