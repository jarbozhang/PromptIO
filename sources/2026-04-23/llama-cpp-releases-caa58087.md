---
title: b8885
url: 'https://github.com/ggml-org/llama.cpp/releases/tag/b8885'
source: llama.cpp Releases
source_type: rss
language: en
published: '2026-04-22T19:37:47.000Z'
fetched_at: '2026-04-23T02:22:01.030Z'
---
mtmd, llama : Update HunyuanVL vision-language model support (#22037)
mtmd, llama : add HunyuanVL vision-language model support
add LLM_ARCH_HUNYUAN_VL with M-RoPE (XD-RoPE) support
add PROJECTOR_TYPE_HUNYUANVL with PatchMerger vision encoder
add HunyuanVL-specific M-RoPE position encoding for image tokens
add GGUF conversion for HunyuanVL vision and text models
add smoke test in tools/mtmd/tests.sh
fix: fix HunyuanVL XD-RoPE h/w section order
fix: Remove redundant code
convert : fix HunyuanOCR / HunyuanVL conversion
Tested locally: both HunyuanOCR and HunyuanVL-4B convert to GGUF
successfully and produce correct inference output on Metal (F16 / Q8_0).
clip : fix -Werror=misleading-indentation in bilinear resize
fix CI: convert_hf_to_gguf type check error
convert_hf_to_gguf.py: give HunyuanVLTextModel.init an explicit dir_model: Path parameter so ty can infer the type for load_hparams instead of reporting Unknown | None.
Co-authored-by: wendadawen wendadawen@tencent.com
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
