---
title: Thoughts About Scaling Law - Z.ai
url: >-
  https://www.reddit.com/r/LocalLLaMA/comments/1vsf9eg/thoughts_about_scaling_law_zai/
source: Reddit r/LocalLLaMA
source_type: rss
language: en
published: '2026-08-19T07:18:00.000Z'
fetched_at: '2026-08-19T11:01:44.118Z'
---
Thoughts About Scaling Law
  
Scaling, but not only of parameters. Every model release now ends with the same question: how many parameters? It isn't a question that can be answered on its own. Parameter count is only meaningful alongside three others — how much data you have, where you intend to spend your compute, and who will run the model, under what conditions.
 The field learned this the hard way. Kaplan et al. (2020) fit an exponent that told everyone to grow parameters faster than data — roughly 2.7:1 — and the industry complied: GPT-3, Gopher, MT-NLG. Hoffmann et al. (2022) redid the experiment across four hundred models and found the compute-optimal split is closer to 20 tokens per parameter, and that with sufficient compute the two should grow at the same rate rather than drifting apart. The error in the earlier fit compounded with every order of magnitude of compute, which is why the largest models of that generation were the most misallocated. The trillion-parameter round was, in retrospect, a detour the whole field took together and then reversed.
 Chinchilla wasn't the end either. It optimized training compute for models that would be trained once and evaluated. Today a model is called billions of times a day and inference dominates lifetime cost. Put inference into the objective and the optimum moves toward smaller models trained far longer — deliberate over-training, which is what Llama-2-7B and Gemma-2-9B were doing at roughly 290 and 889 tokens per parameter.
 Sparsity moved the target again. In a MoE model two quantities have to be kept apart: total parameters govern roughly how much the model can hold — knowledge, facts, the long tail — while activated parameters and effective depth govern roughly how far it can think, how many steps of a causal chain it can carry before it comes apart. A dense 20:1 ratio does not transfer. And the ratio isn't a single number at all: Roberts et al. (2025) find the optimal tokens-per-parameter is task-dependent, 
