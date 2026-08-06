---
title: 'The Loss Does Not See the Basis, but Adam Does'
url: 'https://arxiv.org/abs/2608.05136v1'
source: arXiv
source_type: arxiv
language: en
authors:
  - Devender Singh
categories:
  - cs.LG
  - cs.LG
published: '2026-08-05T17:56:26Z'
fetched_at: '2026-08-06T11:02:48.670Z'
---
Gradient descent on a factored model $W = UV^\top$ is implicitly biased toward low-rank solutions, while Adam, starting from the same small initialization, is not. We trace the difference to the gauge symmetry of the loss, its invariance under $(U, V) \mapsto (UQ, VQ)$. Gradient flow's low-rank mechanism is available to an optimizer only if that optimizer is gauge-equivariant, a condition necessary for the transfer but not sufficient for low-rank recovery. Gradient descent, momentum, "shared-scalar" Adam, Muon, and Shampoo satisfy it. Adam, RMSProp, and the other coordinate-wise methods do not. A structure theorem characterizes the memoryless equivariant rules as exactly the Gram-determined left preconditioners, and a transfer theorem carries gradient flow's pathwise properties to common-scalar flows. We then sort nine update rules on underdetermined matrix sensing by recovery error against the planted ground truth. A one-parameter family from coordinate-wise to shared-scalar preconditioning restores the bias monotonically, isolating anisotropy as the cause. A "spectral schedule" reconciles two opposing reports about Muon: equal-rate updates recover exactly low-rank targets but lose their edge as the spectral tail grows. In transformers, Adam separates two gauge-equivalent initializations at the first step, where the equivariant optimizers stay at float precision, and ends with the per-head invariants $W_Q^\top W_K$ 56% apart in relative Frobenius distance, a gap no per-head 

Authors: Devender Singh
Categories: cs.LG, cs.LG
