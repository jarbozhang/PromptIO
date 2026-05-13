---
title: A proximal gradient algorithm for composite log-concave sampling
url: 'https://arxiv.org/abs/2605.12461v1'
source: arXiv
source_type: arxiv
language: en
authors:
  - Linghai Liu
  - Sinho Chewi
categories:
  - math.ST
  - cs.DS
  - cs.LG
  - stat.ML
  - math.ST
published: '2026-05-12T17:48:09Z'
fetched_at: '2026-05-13T10:19:24.405Z'
---
We propose an algorithm to sample from composite log-concave distributions over $\mathbb{R}^d$, i.e., densities of the form $π\propto e^{-f-g}$, assuming access to gradient evaluations of $f$ and a restricted Gaussian oracle (RGO) for $g$. The latter requirement means that we can easily sample from the density $\text{RGO}_{g,h,y}(x) \propto \exp(-g(x) -\frac{1}{2h}||y-x||^2)$, which is the sampling analogue of the proximal operator for $g$. If $f + g$ is $α$-strongly convex and $f$ is $β$-smooth, our sampler achieves $\varepsilon$ error in total variation distance in $\widetilde{\mathcal O}(κ\sqrt d \log^4(1/\varepsilon))$ iterations where $κ:= β/α$, which matches prior state-of-the-art results for the case $g=0$. We further extend our results to cases where (1) $π$ is non-log-concave but satisfies a Poincaré or log-Sobolev inequality, and (2) $f$ is non-smooth but Lipschitz.

Authors: Linghai Liu, Sinho Chewi
Categories: math.ST, cs.DS, cs.LG, stat.ML, math.ST
