---
title: 'b10362: tests : disable backend sampler hip multi output (#26878)'
url: 'https://github.com/ggml-org/llama.cpp/releases/tag/b10362'
source: llama.cpp Releases
source_type: rss
language: en
published: '2026-08-11T04:21:32.000Z'
fetched_at: '2026-08-11T11:02:00.363Z'
---
test-backend-sampler: skip multi_output_sampling_chain on HIP
The new multi_output_sampling_chain test uses top_k, whose backend probs
ci: keep gpu-rocm logs in a per-run dir keyed by GitHub run id
The self-hosted gpu-rocm runner can't upload logs to Azure blob (egress
test-backend-sampler: also skip multi_output_cpu on HIP
Like the other TOP_K-based subtests, multi_output_cpu's backend sampler
Co-authored-by: Jim Wu ywu@xilinx.com
