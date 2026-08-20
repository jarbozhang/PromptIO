---
title: 'Stop Anthropomorphisizing Intermediate Tokens: Qwen3.8 doesn''t "overthink"'
url: >-
  https://www.reddit.com/r/LocalLLaMA/comments/1vsjcf7/stop_anthropomorphisizing_intermediate_tokens/
source: Reddit r/LocalLLaMA
source_type: rss
language: en
published: '2026-08-19T11:09:16.000Z'
fetched_at: '2026-08-20T11:01:24.237Z'
---
Intermediate tokens, called "thinking" or "reasoning" actually are nothing like it. Humans do step-by-step reasoning leading to the conclusion. LLMs use intermediate traces to augment their prompt. This explains why sometimes the answer is very good but the "reasoning" is verbose. Flooding your context window or fighting compaction are different issues.
 edit: I love this section from the main research they linked.
  
Our findings consistently challenge the prevailing narrative that intermediate tokens constitute a semantically meaningful reasoning process. First, we observe a pronounced lack of correlation between solution correctness and trace validity—models frequently produce invalid reasoning traces even when they arrive at correct solutions. Second, and more strikingly, models trained on corrupted or semantically irrelevant traces achieve performance comparable to, and often exceeding, that of models trained on correct traces, especially on out-of-distribution tasks. Third, although post-training with reinforcement learning improves solution accuracy across both in- and out-of-distribution settings, it does not consistently enhance trace validity. In fact, we find cases where reinforcement learning decreases trace validity while simultaneously improving solution accuracy for models trained on correct traces. Moreover, models trained on corrupted traces continue to outperform their correct-trace counterparts across domains while consistently generating invalid reasoning traces. Finally, we find that the length of the generated traces is largely agnostic to the difficulty of the underlying problem, undermining the notion that it reflects problem-adaptive computation.
 Together, these results suggest that the effectiveness of intermediate tokens does not arise from their seemingly interpretable semantic content. By systematically disentangling trace semantics from the underlying problem, our study demonstrates that if performance is the objective, assuming human-
