---
title: >-
  Fine-tuned Gemma-4-31B specifically for Copywriting & Creative Writing Tasks
  (Scored +290 Elo over base using EqBench3)
url: >-
  https://www.reddit.com/r/LocalLLaMA/comments/1ulqg4i/finetuned_gemma431b_specifically_for_copywriting/
source: Reddit r/LocalLLaMA
source_type: rss
language: en
published: '2026-07-02T18:30:54.000Z'
fetched_at: '2026-07-02T23:00:55.715Z'
---
Hey r/LocalLLaMA,
 Wanted to share a narrow fine-tune I've been working on and get some technical feedback from people who've done similar domain-specific work if possible.
 The problem: general chat models can write marketing copy, but they default to the same tells hedging, "In today's fast-paced world…" openers, vague benefit-speak instead of specifics. Claude is good no dobt about it but I wanted to do something of my own too. I fine-tuned Gemma-4-31B-it specifically to cut that out and write more like a direct-response copywriter: lead with the pain, get concrete, tight CTAs. Model did gained more emotional intelligance over all.
 Eval setup: built a copywriting-specific benchmark on top of the EQ-Bench 3 methodology (pairwise Elo + rubric), using 30 real-world briefs across Facebook ads, cold email, landing pages, product descriptions, SMS, scripts, etc. Base model and fine-tune answered every brief, judged blind by DeepSeek V4 Flash in both orderings (A-vs-B and B-vs-A) to control for position bias. Same base weights, same decoding settings, fine-tune is the only variable.
 Results:
  
 Model Elo Score Head-to-head 
  
 Fine-tuned 1657 wins 24/30 (80%) 
  Gemma-4-31B-it (base) 1367 — 
 
 Biggest, most consistent gains were in hook strength, specificity, and concision, exactly where direct-response copy lives.
 Training details: QLoRA SFT on a curated corpus of marketing briefs paired with completions, including real-world ad examples. Final weights are merged to full bf16 (not shipping an adapter). 256K context, drops into vLLM or Transformers as-is.
 It needs enable_thinking=false for best results, turning on Gemma 4's reasoning mode actually hurts output quality here so keep that in mind please.
 Model card + weights: https://huggingface.co/akwin123/copywriter-gemma4-31b
 Quantizations:
 https://huggingface.co/models?other=base_model:quantized:akwin123/copywriter-gemma4-31b
 Please let me know how it performs too. Thanks!
    submitted by    /u/NinjaAlaska 
