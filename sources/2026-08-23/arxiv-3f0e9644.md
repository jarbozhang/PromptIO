---
title: Physical-Support Confidence Sets for Highly Coherent Dictionaries
url: 'https://arxiv.org/abs/2608.20295v1'
source: arXiv
source_type: arxiv
language: en
authors:
  - Guan-Ju Peng
categories:
  - cs.LG
  - eess.SP
  - math.ST
  - cs.LG
published: '2026-08-20T17:35:26Z'
fetched_at: '2026-08-23T11:02:37.256Z'
---
Sparse pursuit after dictionary learning can yield a precise atom support even when its physical interpretation is not justified by the calibration data, especially for highly coherent dictionaries where alternative calibration-compatible dictionaries may assign different physical meanings to the same selected support. We develop resolution-aware physical-support inference that jointly accounts for uncertainty in the learned dictionary and in the representation of a deployment signal. Our cross-dictionary confidence correspondence retains calibration-compatible dictionaries and deployment-compatible sparse representations, then projects the surviving explanations onto physical-support space. For local coherent-atom classes with separation scale s, once the deployment data resolve the coherent-block explanation and its atom support, the minimax physical resolution from N calibration signals satisfies $δ_{\mathrm{opt}}(N,s)\asymp\min\{s,\frac{1}{\sqrt{N}s^2}\}$, with relative resolution governed by the orientation-information scale $Ns^6$. Deployment replication improves physical localization only when orientation changes cannot be absorbed by adjusting the active coefficients. For computation, we introduce active endpoint bracketing (AEB), an adaptive finite-bank procedure that evaluates only candidates that can still affect the physical report and otherwise safely coarsens or abstains. Finite-bank experiments, including a four-region synthetic application, show that a point-v

Authors: Guan-Ju Peng
Categories: cs.LG, eess.SP, math.ST, cs.LG
