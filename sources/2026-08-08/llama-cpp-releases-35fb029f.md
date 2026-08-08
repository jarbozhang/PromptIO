---
title: b10321
url: 'https://github.com/ggml-org/llama.cpp/releases/tag/b10321'
source: llama.cpp Releases
source_type: rss
language: en
published: '2026-08-07T19:09:44.000Z'
fetched_at: '2026-08-08T11:01:48.560Z'
---
metal : fix NORM/RMS_NORM for row lengths that leave a partial simdgroup (#26708)
ggml_metal_op_norm sized the threadgroup with
nth = std::min(nth, args.ne00_t), which can leave nth not a multiple of
if (tiisg == 0) { shmem_f32[sgitg] = sumf; }
threadgroup_barrier(mem_flags::mem_threadgroup);
sumf = shmem_f32[tiisg];
sumf = simd_sum(sumf);


When the last simdgroup is partial it has fewer lanes than the
Round ne00_t up to a whole number of simdgroups instead. Rounding up
GGML_OP_NORM is affected as well as GGML_OP_RMS_NORM - both dispatch
No mainstream LLM hidden size hits this: ne00_t is ne00/4 on the
Add NORM and RMS_NORM cases for ne0 = 33, 132 and 260 across the
Before, on M3 Pro:
test-backend-ops test -b MTL0 -o NORM        25/50
test-backend-ops test -b MTL0 -o RMS_NORM    26/51


After:
test-backend-ops test -b MTL0 -o NORM        50/50
test-backend-ops test -b MTL0 -o RMS_NORM    51/51
test-backend-ops test -b MTL0                13943/13943



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
Windows x64 (CUDA 13) - CUDA 13.3 DLLs
Windows x64 (Vulkan)
Windows x64 (OpenVINO)
Windows x64 (SYCL)
Windows x64 (HIP)
openEuler:
DISABLED
openEuler x86 (310p)
openEuler x86 (910b, ACL Graph)
openEuler aarch64 (310p)
openEuler aarch64 (910b, ACL Graph)
UI:
UI
