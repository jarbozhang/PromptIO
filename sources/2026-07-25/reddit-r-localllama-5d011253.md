---
title: >-
  DKV: Open-source KV-cache compression framework for local LLM inference (CLI +
  technical report)
url: >-
  https://www.reddit.com/r/LocalLLaMA/comments/1v5wviz/dkv_opensource_kvcache_compression_framework_for/
source: Reddit r/LocalLLaMA
source_type: rss
language: en
published: '2026-07-25T03:27:31.000Z'
fetched_at: '2026-07-25T11:01:40.189Z'
---
Hi everyone! Over the past five months I've been working on DKV (DifferentialKV), an open-source project exploring KV-cache compression for long-context local LLM inference.
 The goal is to reduce KV-cache memory requirements through anchor-based representations, joint low-rank compression, exact residual preservation, and sparse routed attention.
 The repository currently includes:
  
A CLI so you can start experimenting without writing your own integration
 MLX backend
 CUDA backend (currently under validation)
 A technical report explaining the design and evaluation
 A fully open-source implementation
  
I'm still actively improving the project, and I'm posting here mainly to get technical feedback from people working on local inference. I'd love to hear thoughts on the architecture, benchmarking, or potential integrations with projects like llama.cpp, vLLM, SGLang, or anything else you think would make it more useful.
 The GitHub repository and technical report are linked below if you'd like to take a look.
 GitHub:
 https://github.com/Omc12/Differential-KV
 Technical Report:
 https://doi.org/10.5281/zenodo.21539110
 If you try it out, I'd really appreciate hearing about your experience, whether you run into issues or have ideas for improvements.
    submitted by    /u/Om_5000  
 [link]   [comments]
