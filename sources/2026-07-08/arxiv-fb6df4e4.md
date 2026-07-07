---
title: 'Faithfulness to Refusal: A Causal Audit of Neuron Selectors'
url: 'https://arxiv.org/abs/2607.05355v1'
source: arXiv
source_type: arxiv
language: en
authors:
  - Ananth Eswar
  - Pratinav Seth
  - Utsav Avaiya
  - Vinay Kumar Sankarapu
categories:
  - cs.CL
  - cs.ET
  - cs.LG
  - cs.CL
published: '2026-07-06T17:33:36Z'
fetched_at: '2026-07-07T23:02:35.325Z'
---
Attribution scores increasingly identify which neuron rows of a language model matter for applications such as pruning, interpretability, and editing for safety, yet whether they identify causally important rows is rarely tested directly. We address this with two paired audits built on one-shot neuron-row zeroing. We first audit selectors at the language-modeling level: attribution methods substantially outperform activation and magnitude-based baselines at identifying dispensable rows across five LLMs. We then adapt the same intervention into a behavior test by driving it with a contrastive harmful-versus-benign signal; the attributed rows are sufficient to install refusal on hate and crime while keeping benign over-refusal low and preserving language model fluency, and specific in that layer-matched random controls at the same depths fail. Highly rank-stable selectors can be among the least causally valid. Refusal moreover lives in a redundant subspace, where different attribution methods install it through largely disjoint row sets, so the recovered edit is one realization of a sufficient set rather than a unique mechanism. Together, these findings show that rank-stability proxies miss the kinds of selector failures a direct causal audit can surface.%

Authors: Ananth Eswar, Pratinav Seth, Utsav Avaiya, Vinay Kumar Sankarapu
Categories: cs.CL, cs.ET, cs.LG, cs.CL
