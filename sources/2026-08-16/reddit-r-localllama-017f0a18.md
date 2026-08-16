---
title: >-
  Gemma 4 E4B IQ2_XXS: + 140.54% Reasoning Performance From Tensor Level
  Quantization Allocation
url: >-
  https://www.reddit.com/r/LocalLLaMA/comments/1vp2x49/gemma_4_e4b_iq2_xxs_14054_reasoning_performance/
source: Reddit r/LocalLLaMA
source_type: rss
language: en
published: '2026-08-15T13:29:08.000Z'
fetched_at: '2026-08-16T11:01:35.468Z'
---
iq2_xxs tensor level allocation recovered reasoning from 28.9 -> 69.5 at the same 3.3gb budget. 
 https://huggingface.co/ByteOtter/gemma-4-E4B-it-CADA-IQ2_XXS
 I posted my Gemma 4 12B q3 result a couple days ago, where tensor level allocation gave me an +8.55% relative improvement over the category imatrix baseline.
 I pushed further down to iq2_xxs territory where the damage is more severe and the result is far more dramatic. 
 Same idea as before, build imatrix from a category oriented corpus, measure damage, redistribute precision at the tensor level under a fixed byte budget.
 The redistribution mattered a lot
 Reasoning grew +40.625 percentage points over the imatrix only quant.
 The BF16 source scored 71.875, meaning the allocated iq2 model retained 96.74% of the source reasoning performance while reaching only about 24% of the BF16 size.
 It was not isolated to reasoning. However, at iq2_xxs with gemma 4 e4b, there is no legal stock model and the imatrix model mostly collapsed. 
 Compared with the same size imatrix baseline 10 of 11 categories improved by point estimate. The only regression being stability.
 What surprised me most was how much of the source capability came back.
 Retention versus BF16:
 Knowledge QA: 97.50%
 Reasoning: 96.74%
 Coherence: 95.92%
 Context: 95.83%
 General fidelity: 89.17%
 Instruction following: 81.25%
 Stability: 73.79%
 Summarization: 70.59%
 Math: 60.61%
 Coding: 58.49%
 Structured output: 55.81%
 There is no post training, lora, pruning or weight updates. The results were achieved solely through precision allocation.
 My goal is the same. Feed the pipeline with a bf16 gguf, select the capabilities you want and have it spit out the appropriate quantization level and tensor level allocation that gives you the best recovery available for those capabilities within the byte budget. 
 This is my best evidence yet.
 Charts are built from my data by ChatGPT.
 TL;DR: At essentially the same ~3.3 GiB IQ2_XXS budget, tensor-level allo
