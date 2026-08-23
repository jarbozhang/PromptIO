---
title: b9860
url: 'https://github.com/ggml-org/llama.cpp/releases/tag/b9860'
source: llama.cpp Releases
source_type: rss
language: en
published: '2026-07-02T16:29:07.000Z'
fetched_at: '2026-07-04T23:02:17.128Z'
---
llama : add llama_model_ftype_name() (#25134)
llama : add llama_model_ftype_name()
Expose the model file type (quantization) name, e.g. "Q8_0" or
Signed-off-by: Adrien Gallouët angt@huggingface.co
Export enum
Signed-off-by: Adrien Gallouët angt@huggingface.co
s/llama_model_ftype_name/llama_ftype_name/
Signed-off-by: Adrien Gallouët angt@huggingface.co
Move "(guessed)" to the front in llama_ftype_name
Prepend the "(guessed)" label instead of appending it. This allows removing
Signed-off-by: Adrien Gallouët angt@huggingface.co
Add LLAMA_FTYPE_PREFIX
Signed-off-by: Adrien Gallouët angt@huggingface.co
Dont check for model
Signed-off-by: Adrien Gallouët angt@huggingface.co
Signed-off-by: Adrien Gallouët angt@huggingface.co
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
