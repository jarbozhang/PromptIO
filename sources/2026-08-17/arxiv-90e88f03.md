---
title: Generating Benchmark Health Data Using a Tabular Diffusion Transformer
url: 'https://arxiv.org/abs/2608.14496v1'
source: arXiv
source_type: arxiv
language: en
authors:
  - Hao Yan
  - Lisa Pilgram
  - Dan Liu
  - Linglong Kong
  - Fida Dankar
categories:
  - cs.LG
  - cs.AI
  - cs.LG
published: '2026-08-14T17:10:44Z'
fetched_at: '2026-08-17T11:03:44.073Z'
---
Cross-Tabular Data Generation (CTDG) seeks to learn a generative model from multiple heterogeneous tables and produce new synthetic tabular datasets. However, existing synthetic tabular data generation methods are largely restricted to single-input-table scenarios and struggle to effectively handle multiple heterogeneous tables with diverse feature sets. To address this limitation, we propose a two-stage framework for cross-tabular data generation. In the first stage, each heterogeneous raw table is transformed into a standardized statistical table with the same set of columns across all tables. Each statistical table captures the marginal distributions of the original columns and the pairwise correlations among them. In the second stage, a diffusion transformer model is trained to capture structural patterns across these homogeneous statistical tables and to generate synthetic statistical tables. Synthetic raw tables are subsequently reconstructed from the generated statistical tables via multivariate Gaussian sampling followed by an inverse probability integral transform. This two-stage CTDG framework enables the learning of a unified generative model from multiple heterogeneous tables and supports the generation of an unlimited number of realistic synthetic heterogeneous tables. Experimental results demonstrate high fidelity in the learned statistical representations and a favorable fidelity-diversity trade-off in the generated synthetic data, validating the effectiveness 

Authors: Hao Yan, Lisa Pilgram, Dan Liu, Linglong Kong, Fida Dankar
Categories: cs.LG, cs.AI, cs.LG
