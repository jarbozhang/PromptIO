---
title: Deep Gaussian Processes on Directed Acyclic Graphs
url: 'https://arxiv.org/abs/2607.09645v1'
source: arXiv
source_type: arxiv
language: en
authors:
  - Federico L. Perlino
  - Oliver Hamelijnck
  - Adam M. Johansen
  - Theodoros Damoulas
categories:
  - stat.ML
  - cs.LG
  - math.ST
  - stat.CO
  - stat.ME
  - stat.ML
published: '2026-07-10T17:41:11Z'
fetched_at: '2026-07-13T23:03:29.906Z'
---
Many real-world processes can be represented as compositions of functions along a directed acyclic graph (DAG). In causal modelling, these correspond to the underlying mechanisms; in engineering, to multiple fidelity levels; and in gene-regulatory networks, to transcription factors. These functions are partially observed across the DAG, with noisy and heterogeneously sampled measurements, posing significant challenges for reconstruction, uncertainty propagation, and inference. To tackle these challenges, we place priors over functions and naturally arrive at Deep Gaussian Processes over DAGs. We theoretically study their prior-collapse behaviour, and the effect of graph topology and intermediate observations on the preservation of information. We obtain almost-sure lower bounds on the asymptotic frequency of depths at which the distinction between inputs is preserved, identify broad kernel classes for which these hold, and prove an observation by \cite{dunlop2018} on the role of input connections. We offer a structured variational approximation that retains graph dependencies, preserves compositional uncertainty, and captures the explaining-away behaviour of colliders. Finally, we empirically validate our theoretical results and our methodology, and model a latent-collider DAG, a protein signalling network, and a multi-fidelity heavy-ion collision emulation task, attaining state-of-the-art performance while recovering low-fidelity contributions and yielding interpretability o

Authors: Federico L. Perlino, Oliver Hamelijnck, Adam M. Johansen, Theodoros Damoulas
Categories: stat.ML, cs.LG, math.ST, stat.CO, stat.ME, stat.ML
