---
title: >-
  ggml-cpu: use UE4M3 LUT in ARM NVFP4 dot product by ragz4125 · Pull Request
  #25331 · ggml-org/llama.cpp
url: >-
  https://www.reddit.com/r/LocalLLaMA/comments/1uoxdp8/ggmlcpu_use_ue4m3_lut_in_arm_nvfp4_dot_product_by/
source: Reddit r/LocalLLaMA
source_type: rss
language: en
published: '2026-07-06T13:28:33.000Z'
fetched_at: '2026-07-06T23:01:08.259Z'
---
Overview
 This PR extends the UE4M3 lookup table optimization introduced in #23961 to the ARM implementation of the NVFP4 dot product.
 The ARM implementation now uses the existing GGML_CPU_UE4M3_TO_FP32 lookup table for UE4M3 scale decoding. This aligns the ARM implementation with the x86 implementation while reusing the shared lookup table infrastructure.
 llama-bench
 Baseline (master)
 Command:
 ./build-master/bin/llama-bench -m models/Qwen3.5-4B-NVFP4.gguf -p 512 -n 0 -r 5 
  
 model size params backend threads test t/s 
  
 qwen35 4B NVFP4 3.28 GiB 4.33 B CPU 4 pp512 1.89 ± 0.00 
 
 This PR
 Command:
 ./build-lut/bin/llama-bench -m models/Qwen3.5-4B-NVFP4.gguf -p 512 -n 0 -r 5 
  
 model size params backend threads test t/s 
  
 qwen35 4B NVFP4 3.28 GiB 4.33 B CPU 4 pp512 9.97 ± 0.07 
 
 The numbers shared on previous PR 23961(ggml-cpu : add AVX2 and AVX optimization for nvfp4 dot product) looks nice.
 Baseline (master)
  
 model size params backend threads test t/s 
  
 qwen3 4B NVFP4 2.63 GiB 4.02 B CPU 10 pp512 2.85 ± 0.03 
 
 Initial AVX2 implementation
  
 model size params backend threads test t/s 
  
 qwen3 4B NVFP4 2.63 GiB 4.02 B CPU 10 pp512 5.65 ± 0.03 
 
 Final AVX2 implementation (with LUT)
  
 model size params backend threads test t/s 
  
 qwen3 4B NVFP4 2.63 GiB 4.02 B CPU 10 pp512 30.48 ± 0.14 
 
 Maybe it's time to try one or few tiny/small NVFP4 GGUFs on CPU-only inference. 
 Always happy to see CPU related optimizations so my old laptop can be more useful & efficient.
    submitted by    /u/pmttyji  
 [link]   [comments]
