---
title: >-
  Structurally-bounded Agentic Graph Exploration for Evidence-Grounded Scholarly
  DeepSearch
url: 'https://arxiv.org/abs/2608.24809v1'
source: arXiv
source_type: arxiv
language: en
authors:
  - Rima Hazra
  - Sayan Layek
  - Somnath Banerjee
  - Soumen Chakrabarti
  - Animesh Mukherjee
categories:
  - cs.CL
  - cs.IR
  - cs.CL
published: '2026-08-25T16:51:26Z'
fetched_at: '2026-08-26T11:02:45.135Z'
---
We present Crase, a bounded and inspectable alternative to deep research agents for scholarly search. Instead of an open-ended search loop, Crase queries a search engine once for seed papers, expands them along their 1.5-hop citation neighborhood, prunes citation edges whose claims lack entailment support, and ranks the remaining papers with a recency-aware random walk. This makes the candidate set, the reason each paper is kept, and the stopping condition explicit and fixed before inference. On LitSearch and one further benchmarks over a 500K-paper arXiv corpus, Crase outperforms deep research agents built on proprietary models by up to 3$\times$ recall@50 at roughly a third of the cost.

Authors: Rima Hazra, Sayan Layek, Somnath Banerjee, Soumen Chakrabarti, Animesh Mukherjee
Categories: cs.CL, cs.IR, cs.CL
