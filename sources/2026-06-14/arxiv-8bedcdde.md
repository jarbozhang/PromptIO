---
title: Operads for compositional reasoning in LLMs
url: 'https://arxiv.org/abs/2606.13634v1'
source: arXiv
source_type: arxiv
language: en
authors:
  - Nathaniel Bottman
  - Kyle Richardson
categories:
  - cs.CL
  - math.CT
  - cs.CL
published: '2026-06-11T17:44:15Z'
fetched_at: '2026-06-14T14:02:35.105Z'
---
Question decomposition, i.e. breaking a complex query into simpler sub-queries whose answers are composed to produce a final answer, is a widely used strategy for improving LLM reasoning, yet it currently lacks a rigorous mathematical foundation. In this paper, we propose operads, mathematical structures that model many-in, one-out operations and compositions thereof, as a natural framework for describing question decomposition. We define the questions operad $Q$, in which operations correspond to question templates and composition corresponds to substitution of sub-answers, and show how QA models can be interpreted as algebras over $Q$. Beyond reframing existing practice, this operadic perspective points toward new methods, in particular a notion of operadic consistency, which measures whether a QA model's answers agree across the partial collapses of a question decomposition tree. Empirical evaluation of operadic consistency is reported in our companion paper (Bottman, Liu, and Richardson, 2026), which finds it strongly correlated with accuracy across twelve LLMs and four multi-hop QA datasets and outperforming standard temperature-based self-consistency baselines. We argue that operads are the natural mathematical home for question decomposition, and that invariants such as operadic consistency open new directions for analyzing and improving the reliability of multi-step reasoning.

Authors: Nathaniel Bottman, Kyle Richardson
Categories: cs.CL, math.CT, cs.CL
