---
title: b8882
url: 'https://github.com/ggml-org/llama.cpp/releases/tag/b8882'
source: llama.cpp Releases
source_type: rss
language: en
published: '2026-04-22T04:20:10.000Z'
fetched_at: '2026-04-22T08:06:42.947Z'
---
ggml-webgpu(shader): support conv2d kernels.  (#21964)
ggml(webgpu): fix the busy-polls in Emscripten  in the waitAny after #20618, and remove the busy webgpu log
Merge with upstream
Fix GET_ROWS packed integer NaN when using f16 as memory buffer in shader quants
Update Unary wgsl EXP and EXPM1 for f16 stability
Fix GET_ROWS IQ4_XS strcut for NaN f16 canonicalization
Fix numerical percision for unary sqrt when working with f16
Fix NaN canonicalization for packed integers using f16
Update err threshold for binary div ops when using f16
backend: Keep one Dawn/WebGPU instance alive for the lifetime of the static backend
clean: uncomment existing code logs
clean: clean the unncessary debug info
Refactor and generalize dequant helpers
Remove deprecated quant structs
Refactor shader defines to reduce repetition
Remove error override for F16 type
fix: fix the accidential removal of the proper initialization of ctx
clean: clean legacy and format code
fix: did not modify tests ops
shader(conv2d): add conv2d shader kernels and pass f32 and f16 tests
shader(conv2d): fix the out of bounds memory access in the weight indexing
shader(conv2d): clean unused variables and optimize the computation
merge: use the new entries function
clean: address the formatting issues
clean: address the warning issues
clear: clean the shader editorconfig-checker issues
clear: clean the shader editorconfig-checker with utf-8
Co-authored-by: Jeremy J. Hartmann jeremy@mtion.tv
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
openEuler x86 (910b, ACL
