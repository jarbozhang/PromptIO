---
title: b10431
url: 'https://github.com/ggml-org/llama.cpp/releases/tag/b10431'
source: llama.cpp Releases
source_type: rss
language: en
published: '2026-08-14T17:44:57.000Z'
fetched_at: '2026-08-15T11:02:06.207Z'
---
ggml : recurrent state rollback for ggml_ssm_scan (#26623)
Initial changes for Recurrent state rollback for nemotron for cpu and cuda
Removing CPU RS rollback. Will enable it in subsequent PRs
addition of test case
Removing assert and calling runtime API to check if op is supported
removing extra API and updating the call sites for K
replace static cuda detection to runtime fused_op api
address review comments and fallback when SSM rollback not supprted
Adding changes for supporting RS-rollback in CPU. Also added test-backend-ops for cpu and cuda
removing memory manipulation as rs rollback is now supported in CPU
removing the static probe which is not needed now
correcting the format
address review comments
enabling test for all the backends, unsupported backends will fallback to CPU
Apply suggestions from code review
Co-authored-by: Georgi Gerganov ggerganov@gmail.com
choose different graph based on the result of fused_ssm_op is supported or not and also handled memory->n_rs_seq >1 case incase of op is not supported
Support K > 1 in ssm_scan for all backends
Fix CI Issues
Co-authored-by: Georgi Gerganov ggerganov@gmail.com
gaugarg@nvidia.com
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
Ubuntu x64 (ROCm 7.14)DISABLED
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
