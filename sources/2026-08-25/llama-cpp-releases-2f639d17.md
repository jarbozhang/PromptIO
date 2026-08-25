---
title: b10614
url: 'https://github.com/ggml-org/llama.cpp/releases/tag/b10614'
source: llama.cpp Releases
source_type: rss
language: en
published: '2026-08-24T21:25:13.000Z'
fetched_at: '2026-08-25T11:01:47.236Z'
---
metal: per-op source split + parallel compile (#26561)
metal : per-op source split + parallel compile (#24021)
preliminary extract common header
op source split
split metallib into 8 libs && load in parallel
derive kernel->library routing from functionNames
x-macro lib list + underscore filenames, dedup QK_NL, MRC fixes
op source split 8 to 20
improve robustness of source fallback
clean up
change bool -> atomic_bool
only prepend headers that source actually includes
no semaphore, use GCD global queue
dedup library compile path, fix NSError lifetime, rename gla
relocate upstream concat/rope_back/repeat kernel changes into split files
move ggml-common.h from common.h into dequantize.h to shrink binary size
Co-authored-by: lvyichen lvyichen@stepfun.com
metal: add col2im_1d op (f32/f16/bf16) (#25176)
metal : add set_rows with src0 f16 (#25434)
metal : add CONV_2D_DW (depthwise convolution) support (#21565)
metal : add Q2_0 support (#25419)
metal: fuse snake activation (mul, sin, sqr, mul, add) (#25459)
ggml-metal: FWHT kernel for metal backend (#25924)
metal : port new kernels into the split sources
Move the kernels added on master after the split (lightning indexer,
Co-authored-by: lvyichen lvyichen@stepfun.com
ggerganov@gmail.com
Website:
https://llama.app
Attestations:
https://github.com/ggml-org/llama.cpp/attestations/42700437
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
openEu
