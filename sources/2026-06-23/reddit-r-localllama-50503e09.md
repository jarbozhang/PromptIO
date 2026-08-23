---
title: >-
  Is Gemma 4 going to be the next Mistral (or Qwen3.6) one day? Concerning the
  lack of finetunes
url: >-
  https://www.reddit.com/r/LocalLLaMA/comments/1ucy863/is_gemma_4_going_to_be_the_next_mistral_or_qwen36/
source: Reddit r/LocalLLaMA
source_type: rss
language: en
published: '2026-06-22T21:52:23.000Z'
fetched_at: '2026-06-23T01:34:58.968Z'
---
https://eqbench.com/creative_writing.html#:~:text=gemma%2D4%2D31B,Sample
 From what I've seen Gemma 4 has better everything (especially long-context adherence) EXCEPT for the raw prosing performance of Mistral... finetunes.
 Comparing bases only, Mistral Small 3.2 (the backbone of a large chunk of the AI RP community at this point) appears to have lower creative writing performance on EQ-Bench, which is unfortunately graded by Claude, but there are a LOT of samples tested for each and you are free to grade on your own.
 What I mean is that Mistral used to be bad too, and the community REALLY finetuned and merged to the point of getting something that everyone continues to love almost 2 years later. Gemma is also very stable, every major release is yearly so it has LOTS of time to mature in terms of community finetuning.
 On top of base performance, Gemma 4 also has:
  
Global MTP support: You don't need a Gemma 4 model to be tuned to support MTP. They all do, given you have the proper "Assistant" model for 12B, 26B-A4B, or 31B. And no the Assistant model does not have to be abliterated.
 QAT (quantization-aware training): Almost no other model out there can allows this, not even Qwen. You run your finetune on the qat-q4_0-unquantized (ideally this Heretic) version with zero changes to your workflow for the base model. When you do that, anyone can quantize the resulting unquantized QAT to a 4-bit format and it stays incredibly close in quality to the BF16 base, unlike typical 4-bit quants of the base which can sometimes degrade. Recent testing has also shown KV cache quantization is much more accurate (especially for Q8) when using QAT versions. This allows Gemma 4 12B to fit into just 8GB VRAM and 31B to fit in 20-24GB VRAM, so a lot of local users will have something they can actually run smoothly.
 Image and video understanding out of the box, but sadly there is no audio unless you use 12B or below.
 The Apache 2.0 license!!!! Can't forget about that right?
  
So 
