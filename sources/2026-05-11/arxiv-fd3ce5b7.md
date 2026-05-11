---
title: >-
  PropSplat: Map-Free RF Field Reconstruction via 3D Gaussian Propagation
  Splatting
url: 'https://arxiv.org/abs/2605.08035v1'
source: arXiv
source_type: arxiv
language: en
authors:
  - William Bjorndahl
  - Maninder Pal Singh
  - Farhad Nouri
  - Joseph Camp
categories:
  - eess.SP
  - cs.LG
  - eess.SP
published: '2026-05-08T17:24:06Z'
fetched_at: '2026-05-11T08:20:12.075Z'
---
Building a site-specific propagation model typically requires either ray-tracing over detailed 3D maps or dense measurement campaigns. Both approaches are expensive and often infeasible for rapid deployments where geographic data is unavailable or outdated. We present PropSplat, a map-free propagation modeling method that reconstructs radio frequency (RF) fields using 3D anisotropic Gaussian primitives. Each Gaussian encodes a scalar path loss offset relative to an explicit baseline path loss model with a learnable path loss exponent. Gaussians are initialized along observed transmitter--receiver paths and optimized end-to-end to learn the propagation environment without external information like floor plans, terrain databases, or clutter data. We evaluate PropSplat against wireless radiance field methods NeRF$^2$, GSRF, and WRF-GS+ on two real-world datasets. On large-scale outdoor drive-tests spanning multiple topographical regions at six sub-6 GHz frequencies, PropSplat achieves 5.38 dB RMSE when training measurements are spaced 300m apart and outperforms WRF-GS+ (5.87 dB), GSRF (7.46 dB), and NeRF$^2$ (14.76 dB). On indoor Bluetooth Low Energy measurements, PropSplat achieves 0.19m mean localization error, an order of magnitude better than NeRF$^2$ (1.84m), while achieving near-identical received signal strength prediction accuracy. These results show that accurate site-specific propagation reconstruction is achievable from sparse RF-native measurements. The need for geog

Authors: William Bjorndahl, Maninder Pal Singh, Farhad Nouri, Joseph Camp
Categories: eess.SP, cs.LG, eess.SP
