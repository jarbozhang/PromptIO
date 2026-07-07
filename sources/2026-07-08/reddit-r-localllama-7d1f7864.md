---
title: 'Qwen3.6-27B - Effect of KV quantization on KLD - Q8, Q6, Q5 (bartowski)'
url: >-
  https://www.reddit.com/r/LocalLLaMA/comments/1uq0fpe/qwen3627b_effect_of_kv_quantization_on_kld_q8_q6/
source: Reddit r/LocalLLaMA
source_type: rss
language: en
published: '2026-07-07T16:39:09.000Z'
fetched_at: '2026-07-07T23:01:24.261Z'
---
Lower is better - Quantization increases from right to left
 I recently made a post here about how I squeezed more context into a Q8 model of bartowski's Qwen3.6-27B. My reasoning was that in my (anecdotal) experience, a Q8 has been performing a lot better than a Q6 or a Q5.
 There were a lot of comments about quantizing KV of a higher model and some folks suggested just going with a lower quant like Q6 but with full unquantized KV. So I just wanted to test that hypothesis with KLD.
 Base reference is Q8 with no KV quantization. That's because my 5090 only can fit a Q8.
 Here are my findings. Detailed test setup and approach follow below.
  
Q8 does perform better than Q6 and Q5 (no surprises there)
 Much wider gap between Q6 and Q5 than Q8 and Q6.
 Q8 and Q6 have a steep drop the minute we put v at q4_0. Doesn't matter what quant we use for k.
 If you have to use q4_0 for v, you might as well use (q8_0, q8_0) on Q6 quant (this really surprised me)
 Q5 is more tolerant of v quantization than Q8 or Q6.
 With (q4_0, q4_0), Q8 and Q6 converge.
  
Recommendation: Use whatever you can fit in VRAM, and just use (q8_0, q8_0). It's almost free.
 -------
 Test setup:
 I used llama-perplexity to generate this data. My primary use case for this model is only for coding and primarily python. So I wanted to use a python sample file. Downloaded a bunch of open source coding repos (transformers, torch, huggingface etc) and concatenated the python source files to generate a massive 230MB text file.
 I wanted to use as high a context as my system could manage. I have a 5090 and 64GB RAM. Through trial and error, I could get up to 50K context and I just kept that for all the tests.
 It seemed like the KLD improves and converges with higher number of chunks. So decided to use a chunk size of 32.
 Used Qwen-3.6-27B (duh!) to put together a script to run all the different combinations. The command I used to generate the base logits was:
 build/bin/llama-perplexity \ -m ~/myp/models/bart
