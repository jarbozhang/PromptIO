---
title: b9939
url: 'https://github.com/ggml-org/llama.cpp/releases/tag/b9939'
source: llama.cpp Releases
source_type: rss
language: en
published: '2026-07-09T11:01:06.000Z'
fetched_at: '2026-07-09T23:01:51.337Z'
---
metal : add CONV_2D_DW (depthwise convolution) support (#21565)
metal : add CONV_2D_DW (depthwise 2D convolution) support
test : add perf cases for CONV_2D_DW
metal : use 3D dispatch for CONV_2D_DW kernel
metal : add channel-tiled CONV_2D_DW kernel for non-contiguous layouts
metal : simplify CONV_2D_DW dispatch and trim comments
metal : merge duplicate CONV_2D_DW pipeline getters
tests : add F16 CONV2D_DW tests
cpu : fix F16 kernel support for CONV_2D_DW
tests : remove commented-out CONV_2D_DW test block
Co-authored-by: Georgi Gerganov ggerganov@gmail.com
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
