---
title: 'EMO: Pretraining Mixture of Experts for Emergent Modularity'
url: 'https://arxiv.org/abs/2605.06663v1'
source: arXiv
source_type: arxiv
language: en
authors:
  - Ryan Wang
  - Akshita Bhagia
  - Sewon Min
categories:
  - cs.CL
  - cs.CL
published: '2026-05-07T17:59:20Z'
fetched_at: '2026-05-10T05:29:17.421Z'
---
Large language models are typically deployed as monolithic systems, requiring the full model even when applications need only a narrow subset of capabilities, e.g., code, math, or domain-specific knowledge. Mixture-of-Experts (MoEs) seemingly offer a potential alternative by activating only a subset of experts per input, but in practice, restricting inference to a subset of experts for a given domain leads to severe performance degradation. This limits their practicality in memory-constrained settings, especially as models grow larger and sparser. We introduce EMO, an MoE designed for modularity-the independent use and composition of expert subsets-without requiring human-defined priors. Our key idea is to encourage tokens from similar domains to rely on similar experts. Since tokens within a document often share a domain, EMO restricts them to select experts from a shared pool, while allowing different documents to use different pools. This simple constraint enables coherent expert groupings to emerge during pretraining using document boundaries alone. We pretrain a 1B-active, 14B-total EMO on 1T tokens. As a full model, it matches standard MoE performance. Crucially, it enables selective expert use: retaining only 25% (12.5%) of experts incurs just a 1% (3%) absolute drop, whereas standard MoEs break under the same setting. We further find that expert subsets in EMO specialize at semantic levels (e.g., domains such as math or code), in contrast to the low-level syntactic sp

Authors: Ryan Wang, Akshita Bhagia, Sewon Min
Categories: cs.CL, cs.CL
