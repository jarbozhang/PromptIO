---
title: EschaLabs/Qwen3.6-35B-A3B-Escha-W2 · Hugging Face
url: >-
  https://www.reddit.com/r/LocalLLaMA/comments/1vhqihc/eschalabsqwen3635ba3beschaw2_hugging_face/
source: Reddit r/LocalLLaMA
source_type: rss
language: en
published: '2026-08-07T04:23:49.000Z'
fetched_at: '2026-08-07T11:00:46.507Z'
---
Hey peeps. I know you're tired of low quants giving hard to believe numbers. I'm quite skeptical too and from what I tried I'm often left with the impression that the claims fall short. So this model popped up on Twitter for me. Tried it and was lowkey surprised it held its own. I ran some benchmarks with the help of antigravity to at least try to verify it myself. Here is what I got:
  
 Axis / Metric Escha (W2 ROCmFPX) APEX (Q5 Balanced) Key Finding / Winner 
  
 VRAM Memory Allocated 12.19 GiB (100% VRAM) 15.20 GiB VRAM Zero CPU Offload 
  System RAM Allocated 0.00 GiB 8.65 GiB (PCIe Offload) Saves 11.7 GB Total RAM 
  Generation Speed (tg128) 84.72 tokens/sec 45.72 tokens/sec Escha is 1.85x faster 
  Prefill Speed (pp1024) 2,684.55 tokens/sec 1,081.24 tokens/sec Escha is 2.48x faster 
  32-Chunk Perplexity (wikitext-2) 7.1635 ± 0.10 PPL 5.8659 ± 0.08 PPL APEX has ~22% lower loss 
  IFEval (Instruction Adherence) 10 / 10 (100.0%) 10 / 10 (100.0%) TIE (100% rule adherence) 
  GSM8K (Verified Math Reasoning) 20 / 20 (100.0%) 20 / 20 (100.0%) TIE (100% math accuracy) 
  HumanEval+ Code Unit Tests 5 / 5 (100.0%) 5 / 5 (100.0%) TIE (100% math accuracy) 
  LiveBench Coding (2025 Uncontaminated) 5 / 5 Clean Python 5 / 5 Clean Python TIE (Valid code generated) 
  GPQA-Diamond (10 PhD Questions) 10 / 10 (100.0%) 9 / 10 (90.0%) Escha WINS 
 
 I updated my llama.cpp config (-n 16384) and re-ran questions that hit token limits using expanded generation budgets (8,192 to 12,000 max tokens).
 APEX (5-bit Q5): Gets bogged down in longer verification loops (e.g., character-by-character DNA alignment arrays, double-checking rest-frame physics assumptions). This caused APEX to hit the 4,096 token ceiling on 4 out of 10 questions before writing "The correct answer is (X)".
 Escha (2-bit W2): Reasons more concisely. It reached the final answer choice within 4,096 tokens on 9 out of 10 questions, hitting Finish=stop cleanly.
 While this is a really small sample size and not conclusiv
