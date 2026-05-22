---
title: b9275
url: 'https://github.com/ggml-org/llama.cpp/releases/tag/b9275'
source: llama.cpp Releases
source_type: rss
language: en
published: '2026-05-21T23:04:03.000Z'
fetched_at: '2026-05-22T00:18:34.627Z'
---
metal : optimize concat kernel and fix set kernel threads (#23411)
metal : fix GGML_OP_SET kernel threads
tests : extend test_cpy to support different src/dst shapes
Extend test_cpy to support different source and destination tensor shapes
Renamed ne -> ne_src, added ne_dst parameter (default: use src shape)
Added 50 new reshaping test cases covering 1D<->2D<->3D<->4D conversions
Tests exercise 1024 boundary, small shapes, and large dimensionality changes
Fixed dangling reference bug (storing & to temporary std::array)
Updated all existing test calls with permute/transpose args for compatibility
Assisted-by: llama.cpp:local pi
metal : optimize concat kernel with row batching for small widths
When ne0 < 256, batch multiple rows into a single threadgroup to improve
Dispatch nth = min(256, ne0) threads per group
Calculate nrptg (rows per threadgroup) to fill up to 256 threads
Update kernel index calculation to handle the row batching
Add boundary check for i1 >= ne1
Assisted-by: llama.cpp:local pi
tests : clean-up
tests : refactor CPY shape tests to use dimension permutations
Replace 75 hardcoded test cases with a loop over permutations of
Assisted-by: llama.cpp:local pi
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
Ubuntu x64 (SYCL FP32)
Ubuntu x64 (SYCL FP16)
Android:
Android arm64 (CPU)
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
