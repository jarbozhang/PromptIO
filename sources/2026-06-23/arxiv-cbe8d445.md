---
title: >-
  UNIEGO: Proxies as Mediators for Unified Egocentric Video Representation
  Learning
url: 'https://arxiv.org/abs/2606.20559v1'
source: arXiv
source_type: arxiv
language: en
authors:
  - Wenhao Chi
  - Arkaprava Sinha
  - Dominick Reilly
  - Hieu Le
  - Srijan Das
categories:
  - cs.CV
  - cs.LG
  - cs.CV
published: '2026-06-18T17:59:45Z'
fetched_at: '2026-06-23T01:36:30.444Z'
---
Egocentric video understanding is inherently limited by the narrow perspective of wearable cameras: a single viewpoint, a single modality, a single model cannot capture the full richness of human action. We argue that a truly expressive egocentric representation must subsume complementary knowledge across viewpoints, modalities, and foundation model representations, yet remain deployable from egocentric video alone. To this end, we introduce a hierarchical multi-teacher distillation framework that produces UNIEGO, a unified egocentric encoder trained with nine teachers spanning ego-exo viewpoints, RGB, depth, and skeleton modalities, and four foundation models. Rather than distilling directly from heterogeneous teachers whose incompatible architectures and feature geometries induce conflicting gradients, our framework interposes a layer of representation-specific Proxy models that translate diverse teacher knowledge into a homogeneous egocentric space. A second distillation stage, Selective Proxy Distillation (SPD), then adaptively selects, for each training sample, the subset of proxies that are both correct and confident, distilling exclusively from reliable supervision and suppressing erroneous signals. SPD is further stabilized by initializing UNIEGO as a learned convex combination of proxy parameters, placing the unified model in a well-conditioned region of the loss landscape before distillation begins. UNIEGO achieves state-of-the-art performance across three egocentri

Authors: Wenhao Chi, Arkaprava Sinha, Dominick Reilly, Hieu Le, Srijan Das
Categories: cs.CV, cs.LG, cs.CV
