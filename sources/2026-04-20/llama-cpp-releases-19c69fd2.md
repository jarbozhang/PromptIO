---
title: b8846
url: 'https://github.com/ggml-org/llama.cpp/releases/tag/b8846'
source: llama.cpp Releases
source_type: rss
language: en
published: '2026-04-19T13:10:58.000Z'
fetched_at: '2026-04-20T05:39:26.236Z'
---
ggml : reduce CPU overhead in meta backend (#22041)
cache subgraph splits when cgraph is unchanged
Skip per-call subgraph construction in ggml_backend_meta_graph_compute when the same ggml_cgraph is used consecutively.
Assign uid to every sub-graph so that CUDA's fast uid check path hits too.
Address review comments
Keep the scope as is
Rename last_uid and last_n_subgraphs field. Remove last_max_tmp_size field. Refactor code.
Address review comments
Update ggml/src/ggml-backend-meta.cpp
Co-authored-by: Johannes Gäßler johannesg@5d6.de
Update ggml/src/ggml-backend-meta.cpp
Co-authored-by: Johannes Gäßler johannesg@5d6.de
Co-authored-by: Johannes Gäßler johannesg@5d6.de
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
