---
title: >-
  Hy3 (295B MoE) and NVIDIA Nemotron-Labs-Audex-30B-A3B (audio-capable 30B MoE)
  GGUF quants
url: >-
  https://www.reddit.com/r/LocalLLaMA/comments/1ut66j7/hy3_295b_moe_and_nvidia_nemotronlabsaudex30ba3b/
source: Reddit r/LocalLLaMA
source_type: rss
language: en
published: '2026-07-11T01:15:31.000Z'
fetched_at: '2026-07-11T23:01:42.042Z'
---
Sharing two GGUF quant sets, both with the same treatment: imatrix quantization, KLD/PPL measured against BF16 reference logits, llama-bench throughput numbers, and all raw benchmark data included in the repos. No vibes-based "quality tested" claims — every number is reproducible from the files in the repo.
 1. Hy3 — Tencent's 295B MoE (21B active)
 LordNeel/Hy3-GGUF
 Base: tencent/Hy3 — 295B MoE, 21B active, 262K context, Apache 2.0. Converted from BF16 with a Hy3-enabled llama.cpp branch, imatrix from a custom calibration corpus.
  
 Quant Size Mean KLD Top-token agreement Gen tok/s* 
  
 Q6_K 226 GiB 0.0207 95.1% 57.4 
  Q4_K_M 167 GiB 0.0904 90.0% 67.3 
  Q3_K_L 143 GiB 0.1624 86.8% 63.3 
  IQ2_M 90 GiB 0.5314 74.7% 78.7 
 
 *8x RTX PRO 6000 Blackwell, layer split, F16 KV cache. Quality: WikiText-2, 128 chunks x 512 ctx vs BF16 no-MTP reference logits.
 Picks: Q6_K is effectively lossless if you have ~256 GB for it. Q4_K_M is the sane default (fits 2x 96 GB GPUs). IQ2_M squeezes onto a single 96 GB card or a 128 GB Mac, but the quality drop is real.
 Gotchas: use --split-mode layer (tensor split crashed in CUDA decode on this arch), and the MTP/NextN block is excluded on purpose. The imatrix, calibration corpus, and full repro script are in the repo if you want to roll your own quants.
 2. Nemotron-Labs-Audex-30B-A3B — NVIDIA's audio-capable 30B hybrid MoE
 LordNeel/Nemotron-Labs-Audex-30B-A3B-GGUF
 Base: nvidia/Nemotron-Labs-Audex-30B-A3B — 30B Nemotron-H hybrid MoE, ~3B active per token, 1M context, audio understanding + generation. Two tracks in one repo:
  
quants/ — text-only GGUFs for plain llama.cpp use
 audio_quants/ — full-vocab audiogen GGUFs + an audio_support/ sidecar (NV-Whisper encoder, causal speech decoder, enhancement VAE, and NVIDIA's HF/vLLM scripts for TTS, audio QA, and speech-to-speech)
  
Quality measured over three corpora (WikiText-2 / code / GSM8K), throughput on 2x RTX PRO 6000 Max-Q. Text-only track:
  
 Quant Size Mean KLD Top-token 
