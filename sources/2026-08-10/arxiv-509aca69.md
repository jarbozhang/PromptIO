---
title: 'MirrorWorld: Taming Video Diffusion Models for Mirror Reflection Generation'
url: 'https://arxiv.org/abs/2608.07463v1'
source: arXiv
source_type: arxiv
language: en
authors:
  - Youjun Zhao
  - Alex Warren
  - Gary K. L. Tam
  - Rynson W. H. Lau
categories:
  - cs.CV
  - cs.LG
  - cs.CV
published: '2026-08-07T17:58:10Z'
fetched_at: '2026-08-10T11:02:54.614Z'
---
Recent advances in video diffusion models (VDMs) have enabled high-fidelity video synthesis. However, generating mirror reflections remains challenging because the content within a mirror must remain consistent with the surrounding scene. Existing VDMs are not specifically designed to model scene-to-mirror relationships, which can lead to reflections with incorrect content or inconsistent spatial arrangements. We observe that mirror reflection generation involves two complementary challenges: determining what scene content should be reflected and how the reflected content should be spatially arranged within the mirror region. Motivated by this observation, we propose MirrorWorld, a reflection-aware video inpainting framework that models scene-to-mirror relationships during generation. Specifically, we introduce Semantic Relation Distillation (SRD), which transfers relational information from a frozen visual foundation model to encourage semantic associations between visible scene content and mirror regions. We further propose Geometric Transformation Alignment (GTA), which learns a transformation that guides the spatial arrangement of reflected content. The two components play complementary roles, with SRD modeling what should be reflected and GTA modeling how it should be arranged. To facilitate research on this problem, we construct a benchmark for video mirror reflection generation by repurposing four existing video mirror datasets into a unified reflection reconstruction 

Authors: Youjun Zhao, Alex Warren, Gary K. L. Tam, Rynson W. H. Lau
Categories: cs.CV, cs.LG, cs.CV
