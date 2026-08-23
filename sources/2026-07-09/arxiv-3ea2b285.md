---
title: >-
  DepthWeave-KV: Token-Adaptive Cross-Layer Residual Factorization for
  Long-Context KV Cache Compression
url: 'https://arxiv.org/abs/2607.06523v1'
source: arXiv
source_type: arxiv
language: en
authors:
  - Anna Cordoba
  - Adam Puente Tercero
  - Nerea Angulo Hijo
  - Mar Linares Tercero
  - Julia Barrientos
categories:
  - cs.AI
  - cs.AI
published: '2026-07-07T17:29:01Z'
fetched_at: '2026-07-08T23:03:06.324Z'
---
Long-context language model inference is increasingly limited by the memory bandwidth and capacity required to store key-value caches, yet existing compression methods often apply uniform budgets across layers or tokens and degrade retrieval when lexical cues and semantic states require different preservation. We introduce DepthWeave-KV, a token-adaptive cache compression method that factorizes key and value states across neighboring transformer layers using shared low-rank channel bases while retaining lightweight token-specific residuals where attention behavior is sensitive. DepthWeave-KV combines cross-depth residual factorization with a token-conditional depth router that allocates higher reconstruction rank to instruction-bearing and retrieval-critical tokens, and uses calibration-free online error tracking from attention-output probes to adapt compression during generation without retraining the base model. A fused CUDA implementation jointly performs basis lookup, residual dequantization, and attention projection to reduce decode-time memory traffic. Across LongBench, Needle-in-a-Haystack, L-Eval, and long-form QA and summarization benchmarks, DepthWeave-KV achieves near-full-cache task quality with substantially lower memory use, improving average score and retrieval accuracy over prior compressed caches while reaching 8.3x KV memory reduction and 72.8 tokens per second at 64K context.

Authors: Anna Cordoba, Adam Puente Tercero, Nerea Angulo Hijo, Mar Linares Tercero, Julia Barrientos
Categories: cs.AI, cs.AI
