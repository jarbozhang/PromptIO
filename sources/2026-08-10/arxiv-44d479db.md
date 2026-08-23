---
title: 'CoinRAG: Contextualized Information Nugget KV Cache Reuse for Long-Context RAG'
url: 'https://arxiv.org/abs/2608.07458v1'
source: arXiv
source_type: arxiv
language: en
authors:
  - Gyuwan Kim
  - Cheoneum Park
  - Tao Yang
categories:
  - cs.CL
  - cs.AI
  - cs.IR
  - cs.LG
  - cs.CL
published: '2026-08-07T17:51:49Z'
fetched_at: '2026-08-10T11:02:54.615Z'
---
Recent optimization studies on Retrieval-Augmented Generation (RAG) have exploited chunk-level KV cache reuse to avoid processing long retrieved contexts for higher efficiency, while significant information redundancy and noise still remain in the coarse-grained chunks. This paper optimizes the Pareto frontier under low prefill latency constraints while maximizing accuracy by proposing CoinRAG (Contextualized Information Nugget KV Cache Reuse for Long-Context RAG). The name metaphorically reflects our core mechanism: much like assembling small tokens (or "coins") to accumulate a larger value, CoinRAG compositionally reuses offline-computed, fine-grained nugget caches to form a learned contextual representation efficiently in a more semantically relevant but compact manner. Specifically, instead of full-chunk encoding, CoinRAG identifies query-relevant semantic units within retrieved chunks through two-stage retrieval and seamlessly assembles their sliced KV representations with a chunk-level context. Extensive evaluations on LongBench multi-hop question answering tasks demonstrate that CoinRAG significantly reduces operational costs and outperforms the other baselines with a new Pareto frontier and an average 5.3% relative improvement in answer quality (F1) under a standard fast prefill latency budget.

Authors: Gyuwan Kim, Cheoneum Park, Tao Yang
Categories: cs.CL, cs.AI, cs.IR, cs.LG, cs.CL
