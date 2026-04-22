---
title: b8873
url: 'https://github.com/ggml-org/llama.cpp/releases/tag/b8873'
source: llama.cpp Releases
source_type: rss
language: en
published: '2026-04-21T22:56:08.000Z'
fetched_at: '2026-04-22T08:06:42.949Z'
---
openvino: driver setup, CI split, thread safety, and NPU optimizations (#21944)
Thread safety per request only
Fix ROPE yarn case
Fix sticky stateful config
Use i4/i8 directly for symmetric quant
Use weightless caching
Add WeightlessCacheAttribute to reduce NPU memory usage
Gelu tanh support (#125)
Imrope support (#126)
fix(openvino): explicit ov::Tensor frees in ggml_backend_openvino_free
add GPU,NPU support in OV Dockerfile
add build-openvino.yml ci
Fix sticky stateful config
add concurrency to ov-gpu ci runs. Move OV CI to build-openvino.yml
fix thread-safety of shared runtime context
rope type abstraction for frontend translations
fix editorconfig
Co-authored-by: Mustafa Cavus mustafa.cavus@intel.com
dhoff749@gmail.com
ravi.panchumarthy@intel.com
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
openEuler x86 (910b, ACL Graph)
openEuler aarch64 (310p)
openEuler aarch64 (910b, ACL Graph)
