---
title: Best Embedding + Reranking Model
url: >-
  https://www.reddit.com/r/LocalLLaMA/comments/1vjk57h/best_embedding_reranking_model/
source: Reddit r/LocalLLaMA
source_type: rss
language: en
published: '2026-08-09T08:10:52.000Z'
fetched_at: '2026-08-09T11:01:08.932Z'
---
What Local Embedding + Reranking Models are you guys running for RAG? 
 I went down this rabbit hole because I wanted a Embedding Model + Reranker for a Translation Memory Server. 
 Essentially, given X phrase/word/sentence/paragraph in English, can it find a similar phrase/word/sentence/paragraph in the target language that's already translated. This is for 15 different languages - both western and eastern. 
 For this particular use case, F2LLM V2:4b + Zerank 2:4b pretty much destroys anything else in the market. Here are my benchmarks: 
  
 Embed Model Reranker Model MRR Re-Δ R@20 
  
 BGE M3 0.6B BGE M3 Reranker V2 0.6B 0.821 -1.60% 91.90% 
  BGE M3 0.6B Qwen 3 Reranker 0.6B 0.776 -7.50% 91.90% 
  F2LLM 1.7B Zerank 1 1.7B 0.871 -2.20% 96.80% 
  Qwen 3 Embed 4B Qwen 3 Reranker 4B 0.739 11.00% 77.50% 
  Zembed 4B Zerank 2 4B 0.664 25.80% 67.10% 
  F2LLM 4B Zerank 2 4B 0.919 2.40% 98.40% 
  F2LLM 8B Zerank 2 4B 0.922 1.60% 99.20% 
  PPLX Embed V1 4B Zerank 2 4B 0.8825 10.10% 91.90% 
  Octen Embed 4B Zerank 2 4B 0.853 12.40% 89.00% 
  Voyage 4 Large [API] Voyage Rerank 2.5 [API] 0.889 8.50% 94.70% 
 
 Here, MRR = Mean Reciprocal Rank aka Final Score, Re-Δ = How much the Reranker helped and R@20 = was the correct translation in the retrieved 20 entries.
 Note: All Local Models are running on Llama CPP at Q8_0 quant size. 
 Swapping the F2LLM V2:4b with F2LLM V2:8b leads to slightly better results but honestly, not worth the latency tradeoff imo. 
 Even in other benchmarks, this combo ranks very high. I also found that base Qwen 3:4b Embedding and Reranker do quite well in benchmarks but tend to be mediocre in real world use cases (like this one). They are still pretty good though.
 IMO, F2LLM V2:4b is SOTA and as good as it gets for Embedding Models. Kudos for a completely open model - License, Data, Code - everything. It tops a lot of benchmarks on the MTEB Leaderboards as well. 
 There are not as many good open Rerankers but Zerank 2 is SOTA. It was under a non perm
