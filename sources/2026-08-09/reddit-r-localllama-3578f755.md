---
title: >-
  Kimi K3 (Unsloth) IQ2-XXS from 711GB down to 478GB!!! Only Multi-language was
  removed to trim the size
url: >-
  https://www.reddit.com/r/LocalLLaMA/comments/1vjanps/kimi_k3_unsloth_iq2xxs_from_711gb_down_to_478gb/
source: Reddit r/LocalLLaMA
source_type: rss
language: en
published: '2026-08-08T23:47:19.000Z'
fetched_at: '2026-08-09T11:01:08.931Z'
---
Firstly a big thanks to the poster "hellohazine", he basically only removed the multi-lingual fat of the model and just kept the English language intact. It is the exact model, and the rest of the model still intact with all of its high intelligence.
 I think that was a brilliant move, and more of these approaches should be made on new model to help reduce size. 3.8 Qwen MAX next week anyone?
 Think about how much you could trim out on DeepSeek V4 Flash an others.
 Link to Kimi K3:https://huggingface.co/hellohazime/Kimi-K3-REAP-512GB-GGUF
 Edit: Below are current notes form model Editor.
 "As for testing, I’m trying it out using SWE-Lancer’s “task selection” and “per-task” options.
 It’s almost certain that this Kimi-K3-REAP-512GB-GGUF 2-bit model is more accurate than Kimi K2.7 (2-bit).
 Since this won’t fit in my Mac’s RAM, I forced it to run using a patch that loads the “expert” model from the SSD on the fly (MoE streaming in llama.cpp), and had it solve the three SWE-Lancer tasks (14294 / 15815_1 /
 15925) with SWE-Lancer. The result was a total failure.
 However, reap576_iq2xxs (478GB)—which I carved out from the same weights (based on a suggestion from the thread’s author, Hannibalj2ca)—was able to solve those same three tasks.
 At first, I suspected that the Kimi CLI I use for the harness had timed out. Streaming was slow due to decoding, averaging 2.5 hours per task. However, there was no trace of a timeout in the logs.
 Since these were all single attempts, it’s most likely that something specific to my environment is causing the issue. However, there remains a very slight possibility that trimming the “expert” bit has improved coding performance compared to the standard 2-bit version. In Japanese, we call this a “微レ存” (micro-possibility). It’s short for “the possibility exists at the microscopic level.”
 My next task is to rent equipment with full VRAM and compare the results before and after removing the “expert” layer under identical conditions. However,
