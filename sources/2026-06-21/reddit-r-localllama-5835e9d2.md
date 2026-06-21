---
title: '7900XTX 24GB vram, can finally fit Q6K+MTP with Qwen 3.6 27B at 131k context'
url: >-
  https://www.reddit.com/r/LocalLLaMA/comments/1uar6in/7900xtx_24gb_vram_can_finally_fit_q6kmtp_with/
source: Reddit r/LocalLLaMA
source_type: rss
language: en
published: '2026-06-20T08:23:22.000Z'
fetched_at: '2026-06-21T03:18:27.868Z'
---
OS: CatchyOS
 Instructions:
 Connect monitor to iGPU directly so when you boot Linux your dGPU vram is 100% free since by default when you use your dGPU it consumes about 700mb~1.2gb of lost context space, yes you can still game normally using this approach.
 Setup kvcache at q5_0/q4_0 (make sure to compile with CUDA_ALL_QUANTS)
 Yes, Q5_0/Q4_0 is 1.6%~ less precise than Q8 by giving 12% less vram usage as proven here: (Qwen does an amazing job with kvcache).
 https://anbeeld.com/articles/kv-cache-quantization-benchmarks-for-long-context
 Now I can run Qwen 3.6 27B Unsloth Q6K model (22GB~) with 131k context at 55~60t/s
 Add these arguments to compile (the blas changes I got from here with a guy saying that it helped him reduce vram usage, and well...)
 -DGGML_BLAS=ON -DGGML_BLAS_VENDOR=OpenBLAS -DGGML_CUDA_FA_ALL_QUANTS=true 
 You can then just pass the llama.cpp arguments:
 -ctk q5_0 -ctv q4_0 --temp 0.6 --top-p 0.95 --top-k 20 --min-p 0.00 --presence-penalty 0.0 --repeat-penalty 1.0 -c 131000 --jinja --mlock --parallel 1 --no-mmproj 
    submitted by    /u/soyalemujica  
 [link]   [comments]
