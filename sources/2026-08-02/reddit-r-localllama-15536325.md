---
title: >-
  Expert-only IQ3 requant of DeepSeek-V4-Flash-0731: better KLD than UD-IQ3_S,
  1.4x decode on a CPU-spill rig
url: >-
  https://www.reddit.com/r/LocalLLaMA/comments/1vd44uv/expertonly_iq3_requant_of_deepseekv4flash0731/
source: Reddit r/LocalLLaMA
source_type: rss
language: en
published: '2026-08-02T01:05:20.000Z'
fetched_at: '2026-08-02T11:00:59.750Z'
---
Hey all,
 tldr / who this helps: you run a mixed multi-GPU box where the experts spill to RAM, and you want to stay in the 3-bit tier instead of dropping to Q2 to make it fit. 
 https://huggingface.co/TacoTakumi/DeepSeek-V4-Flash-0731-GGUF
 I requantized only the 129 routed expert tensors of DeepSeek-V4-Flash-0731 and left every other tensor at whatever precision the source GGUF already had. Attention, shared experts, router and indexer stay at Q8_0/BF16/F32 from bartowski's MXFP4 conversion. Only the experts drop to IQ3_XXS, with the down projections one rung up at IQ3_S. Result is 111.37 GiB in four shards and imatrix built from calibration_datav3.
 For quality I scored it with llama-perplexity KLD against reference logits generated from the MXFP4 source itself, wikitext-2 first 150 chunks at ctx 512, and ran unsloth's UD-IQ3_S through the same axes for comparison. Mine gets mean KLD 0.2386 vs 0.2936, top-1 agreement 84.65% vs 82.78%, delta PPL +0.536 vs +0.685. However mine is 2.12 GiB larger, and UD-IQ3_S has the better max KLD at 11.13 vs my 12.53, so it is not a clean sweep. Raw perplexity logs for all three runs are in the repo if you want to take a look.
 Speed on my rig, which is 5 mixed GPUs (2x 3090, 5060 Ti, 2x 4060 Ti, 96 GiB VRAM total) with expert spill to CPU: 13.91 / 13.57 / 13.26 t/s at depths 0 / 4096 / 16384, against 9.88 / 9.69 / 9.51 for the full MXFP4 source at the same placement. About 1.4x. That is a spill bound number and will not transfer to a box that fits it entirely in VRAM.
 If you are purely chasing tokens per second, going smaller beats this by a lot. antirez's flat Q2 of the same model is 80.76 GiB, sits about 98% resident in my VRAM with no spill at all, and does 30.27 t/s, 2.18x mine. The point of this build was the quality tier at roughly 3 bits, not the highest number.
 Also beware that DeepSeek-V4-Flash has open SWA and rollback stall issues in llama.cpp. I quantized with mainline llama-quantize but I run a patched build with D
