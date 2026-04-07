---
title: Are Latent Reasoning Models Easily Interpretable?
url: 'https://arxiv.org/abs/2604.04902v1'
source: arXiv
source_type: arxiv
language: en
authors:
  - Connor Dilgren
  - Sarah Wiegreffe
categories:
  - cs.LG
  - cs.LG
published: '2026-04-06T17:50:06Z'
fetched_at: '2026-04-07T11:24:28.783Z'
---
Latent reasoning models (LRMs) have attracted significant research interest due to their low inference cost (relative to explicit reasoning models) and theoretical ability to explore multiple reasoning paths in parallel. However, these benefits come at the cost of reduced interpretability: LRMs are difficult to monitor because they do not reason in natural language. This paper presents an investigation into LRM interpretability by examining two state-of-the-art LRMs. First, we find that latent reasoning tokens are often unnecessary for LRMs' predictions; on logical reasoning datasets, LRMs can almost always produce the same final answers without using latent reasoning at all. This underutilization of reasoning tokens may partially explain why LRMs do not consistently outperform explicit reasoning methods and raises doubts about the stated role of these tokens in prior work. Second, we demonstrate that when latent reasoning tokens are necessary for performance, we can decode gold reasoning traces up to 65-93% of the time for correctly predicted instances. This suggests LRMs often implement the expected solution rather than an uninterpretable reasoning process. Finally, we present a method to decode a verified natural language reasoning trace from latent tokens without knowing a gold reasoning trace a priori, demonstrating that it is possible to find a verified trace for a majority of correct predictions but only a minority of incorrect predictions. Our findings highlight that 

Authors: Connor Dilgren, Sarah Wiegreffe
Categories: cs.LG, cs.LG
