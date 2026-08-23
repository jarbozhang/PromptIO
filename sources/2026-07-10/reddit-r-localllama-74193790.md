---
title: >-
  NVIDIA Puzzle-75B-A9B NVFP4 at 132 t/s on 3×3090 — Why is this size category a
  desert otherwise?
url: >-
  https://www.reddit.com/r/LocalLLaMA/comments/1uru9ja/nvidia_puzzle75ba9b_nvfp4_at_132_ts_on_33090_why/
source: Reddit r/LocalLLaMA
source_type: rss
language: en
published: '2026-07-09T15:53:09.000Z'
fetched_at: '2026-07-09T23:01:04.802Z'
---
TLDR: 75B-total / 9B-active MoE is the perfect shape for multi-24GB rigs, and almost nobody ships it. Qwen 27B is a great model and punches way above its weight-class, it is a frequent fallback for me.
 Nemotron-3-Puzzle-75B-A9B, NVFP4, vLLM 0.22.1 (the new Marlin fallbacks run FP4 on Ampere), pipeline-parallel across 3×3090 capped at 200W each. The 4th card runs a speech sidecar untouched
 - 3 seats × 256K ctx, fp8 KV — hybrid Mamba keeps the cache tiny
 - 132 t/s decode across 3 streams (~65 single), 1,949 t/s prefill
 - ~500W at the wall for the whole box
 It replaced the Nemotron Super 120B MoE GGUF resident that was using 4x3090s: better instruction-following, roughly double the speed per watt. Frees a card.
 Everything else is 30B-A3B (leaves two thirds of the VRAM idle) or 120B+ (spills to RAM and crawls or needs q2 or q3 quantization). 70–80B total / ~10B active fills 72GB of quantized VRAM exactly — dense-class quality at A3B-class speed. Right now Puzzle is the only modern option in the band. 
    submitted by    /u/Important_Quote_1180  
 [link]   [comments]
