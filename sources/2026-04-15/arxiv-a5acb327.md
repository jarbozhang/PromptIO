---
title: >-
  Teaching LLMs Human-Like Editing of Inappropriate Argumentation via
  Reinforcement Learning
url: 'https://arxiv.org/abs/2604.12770v1'
source: arXiv
source_type: arxiv
language: en
authors:
  - Timon Ziegenbein
  - Maja Stahl
  - Henning Wachsmuth
categories:
  - cs.CL
  - cs.CL
published: '2026-04-14T14:10:55Z'
fetched_at: '2026-04-15T02:22:53.572Z'
---
Editing human-written text has become a standard use case of large language models (LLMs), for example, to make one's arguments more appropriate for a discussion. Comparing human to LLM-generated edits, however, we observe a mismatch in editing strategies: While LLMs often perform multiple scattered edits and tend to change meaning notably, humans rather encapsulate dependent changes in self-contained, meaning-preserving edits. In this paper, we present a reinforcement learning approach that teaches LLMs human-like editing to improve the appropriateness of arguments. Our approach produces self-contained sentence-level edit suggestions that can be accepted or rejected independently. We train the approach using group relative policy optimization with a multi-component reward function that jointly optimizes edit-level semantic similarity, fluency, and pattern conformity as well as argument-level appropriateness. In automatic and human evaluation, it outperforms competitive baselines and the state of the art in human-like editing, with multi-round editing achieving appropriateness close to full rewriting.

Authors: Timon Ziegenbein, Maja Stahl, Henning Wachsmuth
Categories: cs.CL, cs.CL
