---
title: >-
  PG-KINN: A Physics-Informed Petrov-Galerkin Kolmogorov-Arnold Network for
  Solving Forward and Inverse PDEs
url: 'https://arxiv.org/abs/2607.20378v1'
source: arXiv
source_type: arxiv
language: en
authors:
  - Amirhossein Sadr
  - Nima Soltani
  - Vahideh Moghtadaiee
  - Aida Pakniyat
  - Dara Rahmati
categories:
  - cs.LG
  - math.NA
  - cs.LG
published: '2026-07-22T17:08:29Z'
fetched_at: '2026-07-23T11:02:10.167Z'
---
Physics-informed learning of partial differential equations (PDEs) has been dominated by multilayer perceptrons (MLPs), whose spectral bias and dense parameterization limit both accuracy and interpretability. Kolmogorov Arnold Networks (KANs) mitigate these limitations because their learnable spline activations are structurally aligned with the piecewise-polynomial bases of classical discretizations. However, the way a PDE is cast into a loss functional is as decisive as the choice of approximator: strong-form residual minimization requires high-order derivatives and heavily weighted losses, the energy (Bubnov-Galerkin) form is restricted to self-adjoint operators and, as we show, collapses to a trivial solution for parameter-identification problems, and boundary integral forms require a known fundamental solution. We propose PG-KINN, a physics-informed KAN built on a Petrov-Galerkin formulation in which the trial space is a KAN and the test space is an independent, compactly supported, piecewise-polynomial space evaluated with Gauss-Legendre quadrature. Integration by parts lowers the differentiation order while retaining applicability to general non-self-adjoint, nonlinear, and inverse problems; the localized test functions turn the global residual into a set of element-wise weak residuals with favorable conditioning. On a suite of benchmarks spanning crack singularities, stress concentration, Neo-Hookean hyperelasticity, inverse parameter identification in heterogeneous me

Authors: Amirhossein Sadr, Nima Soltani, Vahideh Moghtadaiee, Aida Pakniyat, Dara Rahmati
Categories: cs.LG, math.NA, cs.LG
