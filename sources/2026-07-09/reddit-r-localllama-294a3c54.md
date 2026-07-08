---
title: >-
  Distilled DeepSeek into Gemma 4 26B-A4B vs 12B. Not very useful, but I learned
  a lot.
url: >-
  https://www.reddit.com/r/LocalLLaMA/comments/1ur1i1a/distilled_deepseek_into_gemma_4_26ba4b_vs_12b_not/
source: Reddit r/LocalLLaMA
source_type: rss
language: en
published: '2026-07-08T18:38:23.000Z'
fetched_at: '2026-07-08T23:01:51.283Z'
---
So I decided to learn how to fine-tune LLMs. Read a few guides from Unsloth, poked around, then stumbled on Unsloth Studio and wanted to test it out.
 The dataset
 I started from a set of relatively unrelated QA pairs — Natural Questions — and stripped the answers. Then I had DeepSeek v4 Pro (thinking disabled) repopulate them: - 1000 train + 200 val = 1200 requests total, cost $0.36 (~$0.0003/req). Honestly impressive on DeepSeek's side.
 Unsloth Studio
 It's a huge pain in the butt — infested with all kinds of bugs that prevented me from using it easily. Once I figured the workflow out it was workable, but expect to debug. After that I rented a server: 2x RTX 3090, 128GB RAM, Threadripper.
 What I trained
 Two models, to compare dense vs MoE during training: - gemma-4-26B-A4B-it-qat used both GPUs - gemma-4-12B-it-qat used one GPU
 Both QLoRA, 4-bit, identical hyperparams. (See attached image)
 Interesting notes
  
The 26B consumed ~2x the VRAM of the 12B (28.6 vs 14.3 GB) — consistent with the MoE footprint.
 Both base models score almost identically on benchmarks, but the 26B has way more internal knowledge, which let it absorb the distillation far harder: train loss bottomed ~4x lower (0.18 vs 0.71). The eval gap was small though (1.12 vs 1.20).
 I likely overfit the 12B: eval plateaued ~1.18 around step 125–150, then drifted back up to 1.20 by step 250. 
 The dense 12B was faster wall-clock (54 vs 72 min) and higher per-GPU throughput (345 vs 261 tok/s), despite the 26B using both GPUs.
 The 12B's grad norm was ~5.4x noisier (1.94 vs 0.36).
  
Costs: DeepSeek distillation $0.36 · server $3.38.
 I put together a dashboard image with all the hyperparameters, train/eval loss curves, grad norm, LR schedule, and timings — attached.
 Models (GGUF): 1. https://huggingface.co/gwejgteheg/gemma-4-26B-A4B-it-qat-DeepSeek-distill-GGUF 2. https://huggingface.co/gwejgteheg/gemma-4-12B-IT-QAT-Q4_K_M-DeepSeek-distill-GGUF
 Dataset (for reproducibility): - https://huggingface.
