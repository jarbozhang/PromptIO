---
title: >-
  Has anyone tested how quantization hits different capabilities separately? My
  results are surprising.
url: >-
  https://www.reddit.com/r/LocalLLaMA/comments/1us7a22/has_anyone_tested_how_quantization_hits_different/
source: Reddit r/LocalLLaMA
source_type: rss
language: en
published: '2026-07-09T23:50:04.000Z'
fetched_at: '2026-07-10T23:01:38.137Z'
---
I've been running some systematic tests on a few models comparing FP16 vs various GGUF quant levels, and instead of looking at one aggregate benchmark score, I broke it down by capability: math (GSM8K), code (HumanEval), reasoning (ARC-Challenge), and knowledge recall (MMLU-Pro).
 The results are way more nuanced than "Q4 loses X% quality." For example on one 27B model, Q4_K_M barely moved the needle on conversational/knowledge tasks (under 2% degradation) but dropped multi step math accuracy by almost 9% compared to FP16. Q5_K_M basically eliminated the math gap. So the "right" quant level depends entirely on what you're using the model for.
 The other thing I've been curious about is context decay. Does anyone know of systematic testing on whether quantized models lose context retrieval accuracy faster than FP16 as the context window fills up? Like, does a Q4 model start hallucinating at 8K context where the FP16 version holds steady until 12K? I've seen scattered anecdotes but nothing rigorous with controlled needle in haystack tests across quant levels.
 It feels like the community has tons of data on "which model is best" but almost nothing on "which quant of this specific model is best for my use case and hardware." Am I missing something, or is this genuinely a gap?
    submitted by    /u/BBASecure  
 [link]   [comments]
