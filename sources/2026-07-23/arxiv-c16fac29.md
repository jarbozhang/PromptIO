---
title: >-
  Statevector-Referenced Geometry Survival of a Four-Qubit ZZ Quantum Kernel on
  IBM Quantum Hardware: A Fixed-Subset Diagnostic Across Three Execution
  Configurations
url: 'https://arxiv.org/abs/2607.20377v1'
source: arXiv
source_type: arxiv
language: en
authors:
  - Rostyslav Sipakov
categories:
  - quant-ph
  - cs.LG
  - quant-ph
published: '2026-07-22T17:05:42Z'
fetched_at: '2026-07-23T11:02:10.167Z'
---
Quantum-kernel methods encode a dataset's geometry in a Gram matrix, so learning claims on hardware kernels assume the intended geometry survives execution. We measure that survival for one frozen four-qubit ZZ feature-map kernel on $N=24$ real indoor air-quality windows, reconstructed on ibm_fez (1024 shots per circuit) under baseline, dynamical decoupling alone, and gate twirling alone, each a single non-interleaved job. Every configuration returned a complete, finite, positive-semidefinite Gram matrix and preserved the centered statevector geometry to a substantial but incomplete descriptive degree (full-matrix centered kernel alignment, CKA, 0.933-0.989). Gate twirling was most faithful on every reported geometry axis, with the only jackknife-resolved improvement over baseline (persisted Spearman, mean absolute error, and full-matrix CKA diagnostics); dynamical decoupling alone was not separated from baseline at the frozen-window scale. Residual hardware distortion, not finite sampling, dominates the discrepancy. Yet fidelity and label alignment were reversed: the most faithful configuration had the lowest centered kernel-target alignment, which sits at or below label-permutation references for statevector and hardware alike. We read the small hardware uplift as a normalization property of the non-affine distortion, not captured signal. These are descriptive results for single jobs on one backend, not causal mitigation-efficacy estimates; no quantum-advantage, hardware-cl

Authors: Rostyslav Sipakov
Categories: quant-ph, cs.LG, quant-ph
