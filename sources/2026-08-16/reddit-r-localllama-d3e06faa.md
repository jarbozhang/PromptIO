---
title: >-
  Qwen3.8-27B abliterated FP8: refusal 64–99% → 0–6%, and MMLU/GSM8K move less
  than 1.3 points
url: >-
  https://www.reddit.com/r/LocalLLaMA/comments/1vppox6/qwen3827b_abliterated_fp8_refusal_6499_06_and/
source: Reddit r/LocalLLaMA
source_type: rss
language: en
published: '2026-08-16T06:37:02.000Z'
fetched_at: '2026-08-16T11:01:35.470Z'
---
Been reading the eval table on the abliterated Qwen3.8-27B FP8 build instead of the release notes. It's published as red-team material, disclaimer and all, so the numbers are the interesting part.
 Refusal across the usual harmful-instruction sets (AdvBench, HarmBench, StrongREJECT and friends) reads 0–6% with thinking off, against 64–99% for the base checkpoint. Capability is measured separately on the same scripts and barely moves: MMLU 84.3 → 84.7, GSM8K 90.0 → 88.7, nothing outside 1.3 points.
 Two different eval families, and neither one vouches for the other. The pairing is what I'd want replicated, because if the capability side holds up under someone else's harness it's another data point for the Arditi single-direction result — refusal comes out without dragging the rest of the network along.
 The refusal percentages are OrcaRouter's own rule-based classifier and the card says outright it's indicative, not publication-grade. It reads how a response opens. That tells you the model stopped starting with "I cannot"; it doesn't tell you much past the first sentence.
 No KLD against the base anywhere in there as far as I can tell, which is the number I'd have looked for first.
    submitted by    /u/niacolhealth  
 [link]   [comments]
