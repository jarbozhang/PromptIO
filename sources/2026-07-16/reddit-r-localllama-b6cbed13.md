---
title: Bonsai-27B & Ternary-Bonsai-27B - Updates (on PRs)
url: >-
  https://www.reddit.com/r/LocalLLaMA/comments/1ux4wrx/bonsai27b_ternarybonsai27b_updates_on_prs/
source: Reddit r/LocalLLaMA
source_type: rss
language: en
published: '2026-07-15T12:48:16.000Z'
fetched_at: '2026-07-15T23:01:42.664Z'
---
Below Upstream Status sections are from https://github.com/PrismML-Eng/Bonsai-demo
 Upstream Status for Binary
 Q1_0 is supported out of the box in upstream llama.cpp across many backends: CPU (generic, NEON, and optimized x86), Metal, CUDA, and Vulkan.
  
 Runtime Status 
  
 llama.cpp (CPU, Metal, CUDA, Vulkan) ✅ Merged upstream, works out of the box 
  MLX (1-bit) ⏳ Pending upstream: mlx#3161; until it merges, use PrismML-Eng/mlx (branch prism, built automatically by setup.sh) 
 
 Upstream Status for Ternary
 Ternary support is in the middle of migrating into mainline llama.cpp: backends are landing one by one, so today it is a mix of mainline and our fork. The practical consequence first: we currently ship three ternary GGUF variants, and each one needs to run in the right place.
  
 File Format Runs on 
  
 *-Q2_0.gguf Group size 128. The format this demo uses, compatible with our fork. Once the llama.cpp migration completes, these files will be deprecated and replaced by the PQ2_0 ggufs This demo / the fork binaries. Will not load on mainline (same type id, different block size) 
  *-Q2_0_g64.gguf Group size 64 (2.25 bpw). The official llama.cpp format; these will be renamed to plain Q2_0, replacing the current ones Mainline llama.cpp (CPU and Metal so far) 
  *-PQ2_0.gguf Not supported yet. Planned as the fork format going forward: the same format as the current group-128 Q2_0, just under its own ggml type id so it can coexist with the upstream Q2_0 Nothing yet (fork support planned) 
 
 Backend-by-backend migration status:
  
 Backend Status Where 
  
 CPU (ARM NEON + generic scalar) ✅ Merged in mainline llama.cpp ggml-org/llama.cpp#24448 
  Metal ✅ Merged in mainline llama.cpp ggml-org/llama.cpp#25419 
  Vulkan 🔄 In progress upstream (separate PR, not ours) ggml-org/llama.cpp#25430 
  CUDA 🔄 In review upstream ggml-org/llama.cpp#25707 
  x86 (AVX-512-VNNI) ⏳ Pending TBD 
 
 Above Vulkan PR got approved✅ & waiting to be merged by soon/EOD.
 Other Open PRs(
