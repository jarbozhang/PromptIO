---
title: clark-labs/clark-air-sana-1.6b-1.58bit · Hugging Face
url: >-
  https://www.reddit.com/r/LocalLLaMA/comments/1uhobd0/clarklabsclarkairsana16b158bit_hugging_face/
source: Reddit r/LocalLLaMA
source_type: rss
language: en
published: '2026-06-28T05:10:53.000Z'
fetched_at: '2026-06-28T23:00:58.423Z'
---
A Sana 1.6B text-to-image transformer compressed to ternary (~1.85 bits/weight): 8.6× smaller than FP16, near-FP16 quality.
 Footprint (measured)
  
 Artifact Size vs FP16 What it is 
  
 FP16 transformer 3.21 GB 1× (100%) reference 
  Clark Air (packed) 374 MB 8.6× (≈12%) packed ternary (clark-air-sana-1.6b-packed.safetensors) 
  Clark Air (unpacked) 3.21 GB compatibility this repo's transformer/, dequantized bf16, drop-in diffusers 
 
 Measured ~1.85 bits/weight → 8.6× smaller (374 MB packed ÷ 3.21 GB FP16).
 About
 The transformer weights are quantized to ternary with group-wise scales; a small high-precision tail (~5% of parameters, the conditioning and projection layers) is kept at higher precision.
  
Base: Sana 1.6B, 512px
  
License
 Apache-2.0 © Clark Labs, Inc.
    submitted by    /u/pmttyji  
 [link]   [comments]
