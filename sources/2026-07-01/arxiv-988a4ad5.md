---
title: 'GROW$^2$: Grounding Which and Where for Robot Tool Use'
url: 'https://arxiv.org/abs/2606.30632v1'
source: arXiv
source_type: arxiv
language: en
authors:
  - Yuhong Deng
  - Yuyao Liu
  - David Hsu
categories:
  - cs.RO
  - cs.AI
  - cs.CV
  - cs.RO
published: '2026-06-29T17:56:53Z'
fetched_at: '2026-06-30T23:02:51.934Z'
---
Can the robot use a plate to cut a cake if no knife is available? Tool use greatly expands robot capabilities, but to use tools creatively beyond their intended functions, the robot faces the challenge of $\textit{open-world affordance grounding}$: select an open-category object to act as a tool and localize its specific region of action. To this end, we introduce GROW$^2$ (GROunding Which and Where), which leverages object parts as a natural abstraction to split the grounding process hierarchically into semantic and geometric levels, thus bypassing the need for data-heavy, end-to-end training. Semantically, GROW$^2$ harnesses the commonsense reasoning of Vision-Language Models (VLMs) to parse a natural-language task instruction, select a suitable object as the tool, and identify task-relevant parts on the tool and the target object. Geometrically, vision foundation models then ground the selected parts into precise 3D regions from a single RGB-D image. Experiments on established benchmarks show that GROW$^2$ outperforms state-of-the-art baselines on affordance prediction benchmarks. Further, it achieves zero-shot generalization over open-category objects and outperforms baselines in both simulated and real-world robot tool use experiments.

Authors: Yuhong Deng, Yuyao Liu, David Hsu
Categories: cs.RO, cs.AI, cs.CV, cs.RO
