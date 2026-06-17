---
title: Adaptive Volumetric Mechanical Property Fields Invariant to Resolution
url: 'https://arxiv.org/abs/2606.18231v1'
source: arXiv
source_type: arxiv
language: en
authors:
  - Rishit Dagli
  - Donglai Xiang
  - Vismay Modi
  - Xuning Yang
  - Gavriel State
categories:
  - cs.CV
  - cs.LG
  - cs.RO
  - cs.CV
published: '2026-06-16T17:56:03Z'
fetched_at: '2026-06-17T03:04:24.950Z'
---
Accurate mechanical properties (or materials) Young's modulus ($E$), Poisson's ratio ($ν$) and density ($ρ$) are essential for reliable physics simulation of digital worlds, but most 3D assets lack this information. We propose AdaVoMP, a method for predicting accurate dense spatially-varying ($E$, $ν$, $ρ$) for input 3D objects across representations, improving the resolution, accuracy, and memory efficiency over the state-of-the-art. The foundation of our technique is a sparse and adaptive voxel structure SAV that efficiently represents both the input 3D shape and the material field output. We replace the fixed-voxel model of the most accurate prior method, VoMP, with a novel sparse transformer encoder-decoder model that learns to generate a unique SAV autoregressively for every input shape to represent its materials, achieving a resolution $16^3\times$ higher than prior art. Experiments show that AdaVoMP estimates more accurate volumetric properties, even with lesser test-time compute than all prior art. This allows us to convert high-resolution complex 3D objects into simulation-ready assets, resulting in realistic deformable simulations.

Authors: Rishit Dagli, Donglai Xiang, Vismay Modi, Xuning Yang, Gavriel State
Categories: cs.CV, cs.LG, cs.RO, cs.CV
