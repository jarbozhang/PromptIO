---
title: 'ANTIC: Adaptive Neural Temporal In-situ Compressor'
url: 'https://arxiv.org/abs/2604.09543v1'
source: arXiv
source_type: arxiv
language: en
authors:
  - Sandeep S. Cranganore
  - Andrei Bodnar
  - Gianluca Galleti
  - Fabian Paischer
  - Johannes Brandstetter
categories:
  - cs.LG
  - cs.LG
published: '2026-04-10T17:58:16Z'
fetched_at: '2026-04-14T00:33:19.756Z'
---
The persistent storage requirements for high-resolution, spatiotemporally evolving fields governed by large-scale and high-dimensional partial differential equations (PDEs) have reached the petabyte-to-exabyte scale. Transient simulations modeling Navier-Stokes equations, magnetohydrodynamics, plasma physics, or binary black hole mergers generate data volumes that are prohibitive for modern high-performance computing (HPC) infrastructures. To address this bottleneck, we introduce ANTIC (Adaptive Neural Temporal in situ Compressor), an end-to-end in situ compression pipeline. ANTIC consists of an adaptive temporal selector tailored to high-dimensional physics that identifies and filters informative snapshots at simulation time, combined with a spatial neural compression module based on continual fine-tuning that learns residual updates between adjacent snapshots using neural fields. By operating in a single streaming pass, ANTIC enables a combined compression of temporal and spatial components and effectively alleviates the need for explicit on-disk storage of entire time-evolved trajectories. Experimental results demonstrate how storage reductions of several orders of magnitude relate to physics accuracy.

Authors: Sandeep S. Cranganore, Andrei Bodnar, Gianluca Galleti, Fabian Paischer, Johannes Brandstetter
Categories: cs.LG, cs.LG
