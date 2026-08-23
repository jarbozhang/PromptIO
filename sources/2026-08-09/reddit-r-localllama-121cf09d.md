---
title: >-
  Building a zero-dependency C inference engine for BitNet (1.58-bit) - lessons
  from hitting 36 tok/s on a Xeon CPU
url: >-
  https://www.reddit.com/r/LocalLLaMA/comments/1vj1cin/building_a_zerodependency_c_inference_engine_for/
source: Reddit r/LocalLLaMA
source_type: rss
language: en
published: '2026-08-08T17:09:18.000Z'
fetched_at: '2026-08-09T11:01:08.932Z'
---
Over the past few months I have been building a CPU-first inference engine from scratch in pure C99 (no Python, no CUDA, no BLAS, just GCC and make). The focus has been running 1.58-bit ternary models natively without heavy runtime overhead.
 Currently it hits 36.25 tok/s on BitNet b1.58-2B-4T on an Intel Xeon using 4 threads.
 A few technical details from the build:
  
Native ternary SIMD: BitNet weights are packed 4 per byte (values -1, 0, +1). Instead of unpacking to float32 before math, we use custom AVX2 and AVX-512 routines to accumulate directly into integer registers using VNNI instructions (vpdpbusds).
 Minimal runtime overhead: The thread pool uses C11 atomics with spin-then-yield backoff rather than heavy mutex contention, so thread sync overhead is basically zero during token generation.
 Zero dependencies: Compiles into a single standalone binary that serves an OpenAI-compatible API endpoint directly.
  
The biggest takeaway so far has been the DRAM ceiling. We spent weeks optimizing low-level matrix multiplication kernels, but decode speed at batch size 1 is kind of stuck at memory bandwidth. On our Xeon test box, we are running at roughly 95% of theoretical memory bandwidth, so faster compute kernels do not actually move end-to-end token latency until you batch across multiple sequences.
 Repo: https://github.com/shifulegend/project-zero
 Curious what token rates others are seeing on different CPU architectures (especially AMD Zen or ARM NEON), or how folks are handling the memory bandwidth ceiling for local ternary inference.
    submitted by    /u/shifu_legend  
 [link]   [comments]
