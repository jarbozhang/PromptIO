---
title: Learning Standard Model structure from LHC data with Riemannian flow matching
url: 'https://arxiv.org/abs/2607.16144v1'
source: arXiv
source_type: arxiv
language: en
authors:
  - Midori Kato
  - Kevin A. Urquía-Calderón
  - Inar Timiryasov
  - Oleg Ruchayskiy
categories:
  - hep-ph
  - cs.LG
  - hep-ex
  - hep-ph
published: '2026-07-17T17:23:22Z'
fetched_at: '2026-07-20T23:02:10.417Z'
---
In this work we demonstrate that a single transformer-based generative model can capture Standard Model structure spanning five decades of invariant mass, from the sub-GeV regime to the TeV continuum, a range that no single Monte Carlo sample covers. To achieve this we design \textsc{ShellFlow}, a Riemannian conditional flow matching model that, given the recorded event composition, generates each particle on its on-shell manifold. Its only physics priors are the on-shell condition and the invariant-mass formula. The model is trained on $\sim 10^{9}$ real $pp$ collision events from the ATLAS Open Data 13~TeV release and told nothing else. From a single training run, the model learns to reproduce all of the following: intra-particle kinematics, the dilepton resonances ($J/ψ$, $Υ$, $Z$) at their PDG positions, the leptonic Weinberg angle, the $W$ and top-quark masses, and inter-particle correlations that enter no training objective. A substantial fraction of the Standard Model is thus learnable directly from recorded collision data.

Authors: Midori Kato, Kevin A. Urquía-Calderón, Inar Timiryasov, Oleg Ruchayskiy
Categories: hep-ph, cs.LG, hep-ex, hep-ph
