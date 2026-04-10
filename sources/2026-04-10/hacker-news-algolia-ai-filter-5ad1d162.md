---
title: >-
  Show HN: We fingerprinted 178 AI models' writing styles and similarity
  clusters
url: 'https://rival.tips/research/model-similarity'
source: Hacker News (Algolia AI filter)
source_type: rss
language: en
published: '2026-04-08T14:06:03.000Z'
fetched_at: '2026-04-10T00:43:23.464Z'
---
We have a dataset of 3,095 standardized AI responses across 43 prompts. From each response, we extract a 32-dimension stylometric fingerprint (lexical richness, sentence structure, punctuation habits, formatting patterns, discourse markers).
Some findings:
- 9 clone clusters (>90% cosine similarity on z-normalized feature vectors)
- Mistral Large 2 and Large 3 2512 score 84.8% on a composite metric combining 5 independent signals
- Gemini 2.5 Flash Lite writes 78% like Claude 3 Opus. Costs 185x less
- Meta has the strongest provider "house style" (37.5x distinctiveness ratio)
- "Satirical fake news" is the prompt that causes the most writing convergence across all models
- "Count letters" causes the most divergence
The composite clone score combines: prompt-controlled head-to-head similarity, per-feature Pearson correlation across challenges, response length correlation, cross-prompt consistency, and aggregate cosine similarity.
Tech: stylometric extraction in Node.js, z-score normalization, cosine similarity for aggregate, Pearson correlation for per-feature tracking. Analysis script is ~1400 lines.
Comments URL: https://news.ycombinator.com/item?id=47690415
Points: 76
# Comments: 23
