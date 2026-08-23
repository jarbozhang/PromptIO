---
title: b9368
url: 'https://github.com/ggml-org/llama.cpp/releases/tag/b9368'
source: llama.cpp Releases
source_type: rss
language: en
published: '2026-05-27T18:13:38.000Z'
fetched_at: '2026-05-28T03:17:07.522Z'
---
vulkan: Switch MUL_MAT_VEC to 4 K per iteration for F16/32 (#22887)
vulkan: Switch MUL_MAT_VEC to 4 K per iteration for F16/32
Against mesa git, this shows a 4.8% performance improvement for
Note that this breaks some tests until the last commit which fixes
vulkan: Use aligned loads in mul_mat_vec when available
Against mesa git, this shows a 3.3% performance improvement for
Make explicit that num_rows is <= NUM_ROWS in mul_mat_vec
Mesa's UUB logic can't see through conditionals, limiting its
num_rows field in the
num_rows is, indeed, always
NUM_ROWS helps mesa make slightly better codegen.
Against mesa git, this currently shows a 1% performance improvement
vulkan: Fix OOB A reads in MUL_MAT_VEC for odd sizes
There was a TODO to fix the OOB reads from the A matrix which we do
It is within performance noise (+<0.1%) in tg128 for
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
Ubuntu x64 (SYCL FP32) DISABLED
Android:
Android arm64 (CPU)
Windows:
Windows x64 (CPU)
Windows arm64 (CPU)
Windows x64 (CUDA 12) - CUDA 12.4 DLLs
Windows x64 (CUDA 13) - CUDA 13.3 DLLs
Windows x64 (Vulkan)
Windows x64 (SYCL) DISABLED
Windows x64 (HIP)
openEuler:
DISABLED
openEuler x86 (310p)
openEuler x86 (910b, ACL Graph)
openEuler aarch64 (310p)
openEuler aarch64 (910b, ACL Graph)
UI:
UI
