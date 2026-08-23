---
title: >-
  Bridge Evidence: Static Retrieval Utility Does Not Predict Causal Utility in
  Multi-Step Agentic Search
url: 'https://arxiv.org/abs/2607.15253v1'
source: arXiv
source_type: arxiv
language: en
authors:
  - Debayan Mukhopadhyay
  - Utshab Kumar Ghosh
  - Shubham Chatterjee
categories:
  - cs.IR
  - cs.CL
  - cs.IR
published: '2026-07-16T17:48:29Z'
fetched_at: '2026-07-18T23:02:02.577Z'
---
Retrieval systems are trained and evaluated on a static idea of usefulness: hand a document and a question to a reader model, see whether the answer improves, and score the document accordingly. The idea holds up when a document is read on its own. It breaks when a language model works as a search agent, issuing several queries and reasoning across turns, because a document can matter for what it lets the agent do next rather than for what it says about the current question. We measure that gap rather than argue it. Using a ReAct style agent over HotpotQA, we replay 1000 development questions and, for every document the agent read, delete it and re-run the rest of the trajectory from that point. Comparing the original run against its counterfactual gives a Counterfactual Trajectory Utility (CTU) score from three deltas: final answer quality, next query retrieval quality, and turn count. Crossing CTU against Static RAG Utility (SRU) over 23,322 document observations, the two are close to statistically independent (Spearman rho = -0.026). Roughly a third of the documents the agent reads are causally load bearing while looking useless to a static reader; we call these bridge documents. The pattern survives when the reader based axis is swapped for a BM25 and cross encoder proxy, giving a bridge cell of 27.2% on an evenly spread axis. A second experiment pins down the mechanism. Using the Observable Entity Relevance (OER) measure from prior work, entities that discriminate releva

Authors: Debayan Mukhopadhyay, Utshab Kumar Ghosh, Shubham Chatterjee
Categories: cs.IR, cs.CL, cs.IR
