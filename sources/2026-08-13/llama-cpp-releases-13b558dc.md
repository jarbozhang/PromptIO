---
title: b10369
url: 'https://github.com/ggml-org/llama.cpp/releases/tag/b10369'
source: llama.cpp Releases
source_type: rss
language: en
published: '2026-08-12T04:54:59.000Z'
fetched_at: '2026-08-13T11:03:01.120Z'
---
mtmd: support pocket-tts (#26871)
adapt the api
text model ok
working impl, need verify and clean up
mtmd: build the pocket-tts transposed convolutions as GEMM + col2im
ggml_conv_transpose_1d has no grouped mode, so the depthwise upsample
Fold both cases into the column form the seanet decoder already needs:
Generation time per frame drops by 80% on CUDA and by 50% on CPU. The
flow_temp +  frames_after_eos
chunking
mtmd: carry the remaining pocket-tts per-pack settings
The language packs also tune the end-of-speech padding and the padding
Write both in the mmproj as clip.gen.audio.frames_after_eos and
Existing mmproj files must be converted again to carry the two keys.
On a long french text the port now lands within 2% of the reference:
clip.gen.audio.model_variant
clean up code comments
nit: drop the dead flow_temp hparam, the pack table holds the default
update docs
address security problems
less invasive base.py
lint
add mtmd_gen_inp_default
add docs
rm gen_flow_temp
Co-authored-by: Pascal admin@serveurperso.com
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
Windows x64 (CUDA 13) - CUDA 13.3 DLLs
Windows arm64 (CUDA 13) (preview) - CUDA 13.4 DLLs
Windows x64 (Vulkan)
Windows x64 (OpenVINO)
Windows x64 (SYCL)
Windows x64 (ROCm 7.14)
openEuler:
DISABLED
openEuler x86 (310p)
openEuler x86 (910b, ACL Graph)
openEuler aarch64 (310p)
openEuler aarch64 (910b, ACL Graph)
UI:
UI
