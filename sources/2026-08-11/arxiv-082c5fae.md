---
title: >-
  GENCO - A Unified Neural Solver Embedded in a Development Framework for
  Steady-State Grid Analysis
url: 'https://arxiv.org/abs/2608.09921v1'
source: arXiv
source_type: arxiv
language: en
authors:
  - Alban Puech
  - Matteo Mazzonelli
  - Tamara R. Govindasamy
  - Mangaliso Mngomezulu
  - Héctor Maeso-García
categories:
  - cs.AI
  - cs.AI
published: '2026-08-10T17:57:49Z'
fetched_at: '2026-08-11T11:02:16.306Z'
---
Foundation models are transforming business workflows and boosting productivity, yet they remain largely absent from engineering domains such as power system analysis, where strict physical consistency must be enforced. We present GENCO (GEometric Neural Corrective Optimizer), a unified neural solver for steady-state transmission grid analysis that handles power flow (PF), optimal power flow (OPF), and state estimation (SE) within a single architecture and shared network representation. To support advances in neural power system solvers, we introduce the open-source GridFM Development Framework, which standardizes synthetic data generation and training in a low-code environment. We also release large-scale datasets with millions of PF and OPF scenarios across diverse grid topologies to support reproducible benchmarking. We evaluate GENCO on the PFDelta and OPFData benchmarks against state-of-the-art neural solvers and classical solvers, including Newton-Raphson and IPOPT, as well as on real-world Hydro-Québec SCADA data. For large-scale PF, GENCO recovers the full AC operating state, including voltage magnitudes and reactive power that DC-PF cannot provide, while matching DC-PF-level active power-balance residuals. It achieves up to 30x speedups over Newton-Raphson at only 2x the runtime of DC-PF. For OPF, it achieves up to 85x speedups over IPOPT while improving feasibility, optimality, and runtime over DC-OPF. For SE, GENCO is more robust than classical weighted least squar

Authors: Alban Puech, Matteo Mazzonelli, Tamara R. Govindasamy, Mangaliso Mngomezulu, Héctor Maeso-García
Categories: cs.AI, cs.AI
