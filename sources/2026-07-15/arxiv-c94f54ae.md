---
title: >-
  An Exact Instrument for State Usage in Selective State-Space Models, and the
  Input-Driven Migration It Reveals
url: 'https://arxiv.org/abs/2607.11796v1'
source: arXiv
source_type: arxiv
language: en
authors:
  - Raktim Bhattacharya
categories:
  - cs.LG
  - cs.LG
published: '2026-07-13T16:48:03Z'
fetched_at: '2026-07-14T23:03:22.244Z'
---
Selective state-space models such as Mamba route information through a bank of first-order modes whose input coupling is set by a learned selection mechanism. We give an exact instrument for measuring how a trained model uses these modes. Because the state matrix is diagonal, each channel's output decomposes exactly into per-mode contributions, and a per-(layer, channel, window) Gram tensor yields the exact output error of dropping any subset of modes, offline, at any budget. Validated against the reference implementation to a relative error of $2.3\times10^{-7}$ on the Mamba-1 family where it is exact, the instrument predicts a layer's deployed pruning error to a median relative deviation of $5\times10^{-7}$ over $4{,}464$ configurations, its floor set by the reconstruction. Applying the instrument across the Mamba-1 family (130M--2.8B), the deployed 7B Falcon-Mamba, and Mamba-2, we find that trained models re-allocate their state space with the input: which modes carry the signal migrates across contexts, and at the most affected layers a per-input oracle roughly halves the output error of a fixed mode set. Frozen-signal counterfactuals attribute the migration primarily to the input-dependent write map $B_t$; the timestep usually identified with selectivity carries almost none of it. Input-scheduled mode pruning on this measurement outperforms static, Hankel-based, and layer-adaptive rankings at every scale from 130M to the deployed 7B Falcon-Mamba, and at half the state bu

Authors: Raktim Bhattacharya
Categories: cs.LG, cs.LG
