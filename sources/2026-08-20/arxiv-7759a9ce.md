---
title: Geometric Iterative Retrieval for Neural Audio Codec Resynthesis
url: 'https://arxiv.org/abs/2608.19141v1'
source: arXiv
source_type: arxiv
language: en
authors:
  - Leo Schmidt-Traub
  - Frédéric Berdoz
  - Luca A. Lanzendörfer
  - Roger Wattenhofer
categories:
  - cs.SD
  - cs.LG
  - cs.SD
published: '2026-08-19T17:29:56Z'
fetched_at: '2026-08-20T11:02:39.301Z'
---
Neural audio codecs based on Residual Vector Quantization (RVQ) have become the dominant discrete representation for token-based general audio generation, yet resynthesizing high-quality audio from coarse codec tokens remains an open problem and bounds the fidelity of every system that generates them. Prior work has framed resynthesis as a choice between discrete token prediction and continuous regression. We argue that this dichotomy is incomplete and introduce geometric iterative retrieval, a paradigm that uses the RVQ layer hierarchy itself as a natural iterative decomposition in continuous codebook space. Rather than classifying over discrete vocabularies or regressing to a single target vector, our method performs contrastive retrieval in the codebook's geometric space. We evaluate our method on codec restoration tasks across speech and music, and show improvements over both single-pass token prediction and one-step regression baselines.

Authors: Leo Schmidt-Traub, Frédéric Berdoz, Luca A. Lanzendörfer, Roger Wattenhofer
Categories: cs.SD, cs.LG, cs.SD
