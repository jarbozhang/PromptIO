---
title: >-
  UMI-3D: Extending Universal Manipulation Interface from Vision-Limited to 3D
  Spatial Perception
url: 'https://arxiv.org/abs/2604.14089v1'
source: arXiv
source_type: arxiv
language: en
authors:
  - Ziming Wang
categories:
  - cs.RO
  - cs.AI
  - cs.RO
published: '2026-04-15T17:04:34Z'
fetched_at: '2026-04-16T06:07:35.557Z'
---
We present UMI-3D, a multimodal extension of the Universal Manipulation Interface (UMI) for robust and scalable data collection in embodied manipulation. While UMI enables portable, wrist-mounted data acquisition, its reliance on monocular visual SLAM makes it vulnerable to occlusions, dynamic scenes, and tracking failures, limiting its applicability in real-world environments. UMI-3D addresses these limitations by introducing a lightweight and low-cost LiDAR sensor tightly integrated into the wrist-mounted interface, enabling LiDAR-centric SLAM with accurate metric-scale pose estimation under challenging conditions. We further develop a hardware-synchronized multimodal sensing pipeline and a unified spatiotemporal calibration framework that aligns visual observations with LiDAR point clouds, producing consistent 3D representations of demonstrations. Despite maintaining the original 2D visuomotor policy formulation, UMI-3D significantly improves the quality and reliability of collected data, which directly translates into enhanced policy performance. Extensive real-world experiments demonstrate that UMI-3D not only achieves high success rates on standard manipulation tasks, but also enables learning of tasks that are challenging or infeasible for the original vision-only UMI setup, including large deformable object manipulation and articulated object operation. The system supports an end-to-end pipeline for data acquisition, alignment, training, and deployment, while preservi

Authors: Ziming Wang
Categories: cs.RO, cs.AI, cs.RO
