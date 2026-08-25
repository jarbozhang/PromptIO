---
title: b10615
url: 'https://github.com/ggml-org/llama.cpp/releases/tag/b10615'
source: llama.cpp Releases
source_type: rss
language: en
published: '2026-08-24T21:54:42.000Z'
fetched_at: '2026-08-25T11:01:47.236Z'
---
metal : per-device tuned (Q, NE) for flash-attn vec (#26570)
metal : per-device tuned (Q, NE) for flash-attn vec (#25750)
rebase Q-generic FA vec body from 01dc936 (#23114)
add 53 f16 (Q,NE) flash-attn vec instantiations (vec 80 -> 133)
add FA vec (Q,NE) tuning table + dispatch wiring + SMEM cap fallback
add  FA vec (Q,NE) perf sweep
fill tuning result
fold family table into a per-family representative SKU
refactor tuning result format
extend FA vec tuning to quantized KV caches
sync fa vec tuner bucketing with runtime, use pointwise tuning regret
update tuned table
format and cleanup
prefix fa_vec tuning procs with ggml_backend_metal_tuning_, drop unused fa_vec_override_active
add device id -> token lookup for the offline tuning tool
add ggml-metal-tuning skeleton
add op-agnostic perf cell + median timing for the tuner
add FA-vec graph build + tensor init to the tuner
tools : add FA-vec (Q,NE) sweep, compression and table emit
cool down and re-measure the dirty window on thermal drift
test-backend-ops : replace the FA vec tune mode with a bounded (Q,NE) slice
tools : document the Metal tuner, point the table comment at it
abort on unknown KV type, single-source fa_vec_legal_ne
cleanup
honor -o in the FA vec (Q,NE) slice
retune FA-vec (Q, NE) under a pointwise no-harm gate
cont : add fa-vec tunings for M1 Pro, M2 Ultra, M5 Max
Co-authored-by: Georgi Gerganov ggerganov@gmail.com
Website:
https://llama.app
Attestations:
https://github.com/ggml-org/llama.cpp/attestations/42707049
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
Ubuntu x64 (ROCm 7.14)
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
Windows x64 (CUDA 13) - CUDA 1
