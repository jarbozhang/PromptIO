---
title: >-
  [2606.05682] Beyond Output Matching: Preserving Internal Geometry in NVFP4 LLM
  Distillation
url: >-
  https://www.reddit.com/r/LocalLLaMA/comments/1vk08zl/260605682_beyond_output_matching_preserving/
source: Reddit r/LocalLLaMA
source_type: rss
language: en
published: '2026-08-09T20:22:47.000Z'
fetched_at: '2026-08-10T11:01:36.121Z'
---
Demand for low-precision inference, including NVFP4-based approaches, has grown as large language models are increasingly deployed in latency and cost constrained production environments. Quantization-aware distillation (QAD) helps recover accuracy lost under low bit quantization by training a quantized student to match the output distribution of a frozen higher precision teacher via a KL-divergence loss. In this work, we first provide a representation level diagnosis of QAD: output matching alone can mask internal degradation, because many intermediate activation geometries can yield similar teacher-aligned logits. Using CKA, we show that KL-only QAD can reduce layerwise representational similarity relative to the BF16 teacher, with especially severe drift in RL-post-trained models. This drift correlates with downstream bottlenecks on reasoning and coding tasks, suggesting that low bit recovery requires preserving internal geometry rather than matching outputs alone. Motivated by this finding, we propose CKA-QAD, a CKA-guided representational alignment method for NVFP4 QAD and low bit LLM accuracy recovery. The method adds a lightweight regularizer that preserves internal representational geometry during distillation by aligning layerwise Gram matrices through CKA. Across Nemotron 3 Nano and Qwen3-4B-Thinking-2507, CKA-QAD substantially improves representational alignment and improves downstream reasoning and coding accuracy with modest training overhead. Our findings position CKA-guided representational alignment as a practical complement to output matching for quantized LLM recovery.
  
   submitted by    /u/Aaaaaaaaaeeeee  
 [link]   [comments]
