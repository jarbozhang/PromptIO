---
title: >-
  SemRF: A Semantic Reference Frame for Residual-Stream Dynamics in Language
  Models
url: 'https://arxiv.org/abs/2606.32022v1'
source: arXiv
source_type: arxiv
language: en
authors:
  - Jian Gu
  - Aldeida Aleti
  - Chunyang Chen
  - Hongyu Zhang
categories:
  - cs.LG
  - cs.CL
  - cs.LG
published: '2026-06-30T17:52:22Z'
fetched_at: '2026-07-01T23:03:14.706Z'
---
Residual-stream analysis asks how language-model computation evolves across depth, but intermediate decoding requires comparable readout coordinates across layers. If embedding anchors and unembedding readout disagree on the chosen span, apparent motion may reflect measurement drift rather than computation. We introduce \emph{Semantic Reference Frames} (SemRF), an anchor-based formalism separating semantic measurement from residual dynamics. A SemRF fixes anchors and measures states against them. Pseudo-inverse tying gives exact synchronization; under restricted bi-invertibility, SemRF yields stable semantic-basis coordinates, distortion bounds, and near-identity changes. With the frame fixed, residual computation becomes a depthwise semantic trajectory. The anchors induce a semantic Voronoi diagram: distance, or evidence such as logits, assigns each layer to a coarse cell, while coordinates retain within-cell motion and margins. We define layerwise steps, contribution profiles, and imbalance diagnostics, then use the Voronoi trace to define a margin-relaxed tube. The canonical trace is the minimum-action path inside this tube; when nonempty with positive quadratic weight, it is unique and obeys a discrete spline equation away from active constraints. Excess action controls step, curvature, and profile mismatch. Low curvature implies piecewise-linear compressibility and local knowledge density: lower trace complexity means fewer semantic knots. Through the parameter-to-trajec

Authors: Jian Gu, Aldeida Aleti, Chunyang Chen, Hongyu Zhang
Categories: cs.LG, cs.CL, cs.LG
