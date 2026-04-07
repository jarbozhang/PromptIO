---
title: >-
  HI-MoE: Hierarchical Instance-Conditioned Mixture-of-Experts for Object
  Detection
url: 'https://arxiv.org/abs/2604.04908v1'
source: arXiv
source_type: arxiv
language: en
authors:
  - Vadim Vashkelis
  - Natalia Trukhina
categories:
  - cs.LG
  - cs.LG
published: '2026-04-06T17:52:58Z'
fetched_at: '2026-04-07T02:40:09.233Z'
---
Mixture-of-Experts (MoE) architectures enable conditional computation by activating only a subset of model parameters for each input. Although sparse routing has been highly effective in language models and has also shown promise in vision, most vision MoE methods operate at the image or patch level. This granularity is poorly aligned with object detection, where the fundamental unit of reasoning is an object query corresponding to a candidate instance. We propose Hierarchical Instance-Conditioned Mixture-of-Experts (HI-MoE), a DETR-style detection architecture that performs routing in two stages: a lightweight scene router first selects a scene-consistent expert subset, and an instance router then assigns each object query to a small number of experts within that subset. This design aims to preserve sparse computation while better matching the heterogeneous, instance-centric structure of detection. In the current draft, experiments are concentrated on COCO with preliminary specialization analysis on LVIS. Under these settings, HI-MoE improves over a dense DINO baseline and over simpler token-level or instance-only routing variants, with especially strong gains on small objects. We also provide an initial visualization of expert specialization patterns. We present the method, ablations, and current limitations in a form intended to support further experimental validation.

Authors: Vadim Vashkelis, Natalia Trukhina
Categories: cs.LG, cs.LG
