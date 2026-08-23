---
title: b10236
url: 'https://github.com/ggml-org/llama.cpp/releases/tag/b10236'
source: llama.cpp Releases
source_type: rss
language: en
published: '2026-08-03T05:13:36.000Z'
fetched_at: '2026-08-03T11:02:03.665Z'
---
metal: implement DSv4 Lightning Indexer (#25893)
metal: implement F16 Lightning Indexer
Implement GGML_OP_LIGHTNING_INDEXER for 128-dimensional, 64-head inputs
Add tiled and tail kernels and test KV lengths around 8- and 64-element
llama-bench (--mmap 1, -fa 1, -p 512, -n 128; d=0/10k/20k/30k):
Before:
pp512: 153.73 ± 0.87 t/s
tg128: 8.91 ± 0.04 t/s
pp512 @ d10000: 73.90 ± 0.39 t/s
tg128 @ d10000: 8.66 ± 0.03 t/s
pp512 @ d20000: 45.83 ± 0.18 t/s
tg128 @ d20000: 8.26 ± 0.03 t/s
pp512 @ d30000: 33.40 ± 0.21 t/s
tg128 @ d30000: 7.94 ± 0.01 t/s
After:
pp512: 155.19 ± 0.91 t/s
tg128: 8.95 ± 0.04 t/s
pp512 @ d10000: 86.95 ± 0.69 t/s
tg128 @ d10000: 9.00 ± 0.05 t/s
pp512 @ d20000: 62.01 ± 0.45 t/s
tg128 @ d20000: 8.68 ± 0.04 t/s
pp512 @ d30000: 49.18 ± 0.33 t/s
tg128 @ d30000: 8.60 ± 0.02 t/s
Assisted-by: Codex
metal: stage Lightning Indexer K tiles
Stage and dequantize K in F16 threadgroup memory before simdgroup matrix loads.
Zero-fill partial tiles and guard stores so all KV segments use the same numerical path.
Support F32, F16, BF16, Q4_0, Q4_1, Q5_0, Q5_1, and Q8_0 K caches.
llama-bench (--mmap 1, -fa on, -p 512, -n 128; d=0/10k/20k):
pp512: 160.38 +/- 1.01 t/s
tg128: 9.08 +/- 0.03 t/s
pp512 @ d10000: 88.37 +/- 0.46 t/s
tg128 @ d10000: 9.07 +/- 0.04 t/s
pp512 @ d20000: 62.53 +/- 0.46 t/s
tg128 @ d20000: 8.84 +/- 0.03 t/s
Assisted-by: Codex
dedup Lightning Indexer constants, fix flaky test
cont : fix whitespace
Co-authored-by: forforever73 690105611@qq.com
ggerganov@gmail.com
Website:
https://llama.app
macOS/iOS:
macOS Apple Silicon (arm64)
macOS Apple Silicon (arm64, KleidiAI enabled) DISABLED
macOS Intel (x64)
iOS XCFramework
Linux:
Ubuntu x64 (CPU)
Ubuntu arm64 (CPU)
Ubuntu s390x (CPU)
Ubuntu x64 (Vulkan)
Ubuntu arm64 (Vulkan)
Ubuntu x64 (ROCm 7.2)
Ubuntu x64 (OpenVINO)
Ubuntu x64 (SYCL FP32)
Ubuntu x64 (SYCL FP16)
Android:
Android arm64 (CPU)
Windows:
Windows x64 (CPU)
Windows arm64 (CPU)
Windows arm64 (OpenCL Adreno)
Windows x64 (CUDA 12) - CUDA 12.4 DLLs
Windows
