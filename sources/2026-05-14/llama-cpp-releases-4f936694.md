---
title: b9145
url: 'https://github.com/ggml-org/llama.cpp/releases/tag/b9145'
source: llama.cpp Releases
source_type: rss
language: en
published: '2026-05-14T08:16:04.000Z'
fetched_at: '2026-05-14T12:15:36.330Z'
---
SYCL: fix multi-GPU system RAM exhaustion by using Level Zero allocations (#21597)
SYCL: fix multi-GPU system RAM exhaustion by using Level Zero allocations
Replace sycl::malloc_device with zeMemAllocDevice for GPU memory allocation
On a dual Intel Arc Pro B70 system (64GB VRAM, 64GB RAM), a 15.6 GiB model
All Level Zero calls include automatic fallback to the original SYCL
SYCL: address review feedback - remove try/catch, check device types, deduplicate
Remove try/catch from malloc/free/memcpy helpers, check backend and
Move shared helpers (is_level_zero, is_dgpu, free_device) to common.cpp
Use SYCL_CHECK(CHECK_TRY_ERROR()) for fallback sycl::free calls
Guard dev2dev_memcpy L0 path to dGPU-to-dGPU only, preserving the
Add Windows Level Zero SDK path detection (LEVEL_ZERO_V1_SDK_PATH)
@arthw)
SYCL: add build/runtime flags for Level Zero, address review feedback
Implements the architecture suggested by @arthw: compile-time and runtime
Add GGML_SYCL_SUPPORT_LEVEL_ZERO cmake option (default ON). All Level
Add GGML_SYCL_ENABLE_LEVEL_ZERO runtime env var (default 1). Controls
Remove Level Zero code from dpct_malloc. It was unused (dpct::device_memory
Update SYCL.md with documentation for both new parameters.
Tested on Intel Arc Pro B70 (32GB), single-GPU and dual-GPU, with both
SYCL: unify Level Zero malloc/free call sites, address review feedback
Move ggml_sycl_malloc_device to common.cpp alongside ggml_sycl_free_device.
Addresses arthw's review: wrap all malloc/free in SYCL_CHECK for stack
Co-Authored-By: Claude Opus 4.6 (1M context) noreply@anthropic.com
SYCL: add Level Zero SDK to CI, fix device check and missed alloc paths
Add Level Zero SDK installation to Ubuntu and Windows SYCL CI jobs
Fix two bugs found during extended dual-GPU testing (no
The Level Zero backend check was iterating all SYCL devices
sycl_ext_malloc_device/sycl_ext_free (tensor reorder temp buffers)
Co-Authored-By: Claude Opus 4.6 (1M context) noreply@anthropic.com
SYCL: address arthw review feedb
