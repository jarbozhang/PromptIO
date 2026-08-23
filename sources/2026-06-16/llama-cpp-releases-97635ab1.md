---
title: 'b9664: sycl: support reordered Q4_K/Q5_K/Q6_K MoE MUL_MAT_ID (#24452)'
url: 'https://github.com/ggml-org/llama.cpp/releases/tag/b9664'
source: llama.cpp Releases
source_type: rss
language: en
published: '2026-06-16T05:35:00.000Z'
fetched_at: '2026-06-16T06:32:44.987Z'
---
sycl: support reordered Q4_K and Q5_K MoE MUL_MAT_ID
Extend reordered-weight handling to fused MoE MUL_MAT_ID for Q4_K and Q5_K expert tensors and add Q5_K reordered DMMV coverage. Unsupported 3D reorder cases now fall back instead of aborting.
sycl: extend MoE reorder to Q6_K mul_mat_id
