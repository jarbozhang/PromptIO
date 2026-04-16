---
title: b8797
url: 'https://github.com/ggml-org/llama.cpp/releases/tag/b8797'
source: llama.cpp Releases
source_type: rss
language: en
published: '2026-04-15T03:40:15.000Z'
fetched_at: '2026-04-16T06:07:14.006Z'
---
hexagon: optimization for HMX mat_mul (#21554)
hexagon: add async HMX worker
Introduce hmx-worker (dedicated thread for HMX compute) to overlap HMX
hexagon: cost-based VTCM chunk search for out-stationary matmul
hexagon: fix futex race in hmx_worker_drain
hex-mm: hmx optimize scatter/transpose and use HMX intrinsics
hex-vmem: drop vmem limit a touch under 3GB on v73
hexagon: add fwd declaration of htp_context
hex-hmx: replace hmx-worker with hmx-queue that mimics dma-queue interface
Simplifies the overall implemantion, reduces thread wakeup roundtrips.
hex-mm: add debug log to hmx work func called from hmx-queue
Update hmx-queue.h
Co-authored-by: Max Krasnyansky max.krasnyansky@gmail.com
Co-authored-by: Kim-Chyan Gan kgan@qti.qualcomm.com
maxk@qti.qualcomm.com
max.krasnyansky@gmail.com
macOS/iOS:
macOS Apple Silicon (arm64)
macOS Apple Silicon (arm64, KleidiAI enabled)
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
Windows:
Windows x64 (CPU)
Windows arm64 (CPU)
Windows x64 (CUDA 12) - CUDA 12.4 DLLs
Windows x64 (CUDA 13) - CUDA 13.1 DLLs
Windows x64 (Vulkan)
Windows x64 (SYCL)
Windows x64 (HIP)
openEuler:
openEuler x86 (310p)
openEuler x86 (910b, ACL Graph)
openEuler aarch64 (310p)
openEuler aarch64 (910b, ACL Graph)
