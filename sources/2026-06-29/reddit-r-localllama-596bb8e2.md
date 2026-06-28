---
title: >-
  I had 55 LLMs blind-grade each other (22k judgments, all open). Every model
  family with enough data is biased toward its own siblings. Qwen judges favor
  Qwen by ~0.9 points. Mistral penalizes its own 
url: >-
  https://www.reddit.com/r/LocalLLaMA/comments/1uhi81a/i_had_55_llms_blindgrade_each_other_22k_judgments/
source: Reddit r/LocalLLaMA
source_type: rss
language: en
published: '2026-06-28T00:10:51.000Z'
fetched_at: '2026-06-28T23:00:58.422Z'
---
I have been running an open evaluation setup where N models answer the same prompt, then blind-grade each other in an N x N matrix with self-judgments excluded. No single privileged judge. So far: 286 evaluations, 198 hand-written questions, 22,254 valid judgments across 55 models from 11 developer families. Code, dataset, and all prompts are MIT licensed.
 The finding I did not expect: same-family rating bias is statistically significant in all 8 families with enough data (p < 0.05, 7 of 8 survive Bonferroni). On a 0-10 scale:
  
Qwen judges rate other Qwen models +0.91
 xAI +0.75, Anthropic +0.62, MiniMax +0.31, OpenAI +0.23
 Google -0.59, Meta -0.68, Mistral -1.02
  
The positive in-group bias is the expected story. The negative ones are the interesting part. Mistral judges systematically rate other Mistral models a full point lower, the largest absolute bias in the set. I have not seen that reported before and I do not have a clean explanation. Could be training data, RLHF preference data, or stylistic self-penalty.
 Two other things fell out of it. Aggregate leaderboards hide a lot: six different models hold the top spot across nine category pools, so "best model" is the wrong question. And code is where judges disagree most, nearly double the disagreement of meta-alignment, which makes single-judge code eval especially shaky.
 Repo and data: github.com/themultivac/multivac-evaluation
 Paper: themultivac.com/papers/blind-peer-matrix.pdf
 Where I think this needs to go next, and where I would welcome pushback:
  
Anchor to ground truth where it exists. The fair criticism of any peer setup is that it is LLMs judging LLMs. For code and math that is fixable: grade with a test suite or a verifier and use the judges only where execution cannot decide. In a recent code run the judges actually contradicted execution on a concurrency test, preferring an answer the tests failed, so this is not hypothetical.
 Control the bias number for response quality. Right now the sam
