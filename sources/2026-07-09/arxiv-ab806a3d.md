---
title: 'EntroPath: Maximum Entropy Path Ensemble Embedding for Manifold Learning'
url: 'https://arxiv.org/abs/2607.06497v1'
source: arXiv
source_type: arxiv
language: en
authors:
  - Przemysław Rola
categories:
  - cs.LG
  - q-bio.QM
  - stat.ML
  - cs.LG
published: '2026-07-07T16:58:00Z'
fetched_at: '2026-07-08T23:03:06.342Z'
---
We introduce EntroPath, a manifold learning method that recovers geodesic geometry from data graphs through ensembles of diffusion paths. Many existing graph-based embeddings rely either on locally normalised random walks or on shortest-path distances. The former can concentrate diffusion in densely sampled regions, while the latter are sensitive to spurious shortcut edges in the graph. EntroPath instead builds its dissimilarities from the maximum entropy random walk (MERW), which aggregates the full ensemble of k-step paths between points rather than relying on any single trajectory. We show that the resulting free-energy dissimilarity converges to squared geodesic distance in the short-time limit, via Varadhan's heat-kernel formula. The diffusion depth k interpolates smoothly between local neighbourhood structure and global manifold geometry, and the symmetrised kernel admits an exact Gram factorisation connecting EntroPath to kernel methods. We further provide scalable extensions via landmark projection and diffusion-potential pseudotime. Across synthetic manifolds and single-cell benchmarks, EntroPath consistently matches or outperforms diffusion- and shortest-path-based methods, while remaining competitive with neighbourhood-preserving embeddings (UMAP, t-SNE) on local-structure metrics. Its gains are most pronounced on manifolds with non-uniform sampling density and well-separated branching trajectories, where path-ensemble diffusion more faithfully preserves the underl

Authors: Przemysław Rola
Categories: cs.LG, q-bio.QM, stat.ML, cs.LG
