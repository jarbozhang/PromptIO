---
title: >-
  I just built a mini Kimi-K3 from Scratch under 250$. Already beats GPT-2
  (124M)!
url: >-
  https://www.reddit.com/r/LocalLLaMA/comments/1vth1c3/i_just_built_a_mini_kimik3_from_scratch_under_250/
source: Reddit r/LocalLLaMA
source_type: rss
language: en
published: '2026-08-20T11:38:22.000Z'
fetched_at: '2026-08-21T11:01:41.845Z'
---
I pre-trained a 1.02-billion-parameter on Kimi K3 replica trained on 5.00 billion decontaminated tokens for $250. 
 This model has 1.02 billion parameters, of which 145 million are active per token. 
 It is roughly one two-thousandth of K3 by total size. It saw 5,000,003,584 tokens, which is a rounding error against the corpora frontier models are trained on. 
 It has never been instruction-tuned, and it has only ever done one thing: predict the next token. 
 What it does have is K3's architecture: 
 - Kimi Delta Attention, Gated MLA, Attention Residuals
 - LatentMoE with the same aux-loss-free balancer
 - Same activation function with the same two constants
 - K3's own 163,840-token tokenizer, unmodified. 
 I report a 33.4% HellaSwag which beats the GPT-2 124M score of 28%
 Read the entire tutorial here: https://books.vizuara.ai/book/pretraining-a-mini-k3
    submitted by    /u/OtherRaisin3426  
 [link]   [comments]
