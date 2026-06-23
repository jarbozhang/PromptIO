---
title: >-
  GLM-5.2 UD-IQ1_M on llama.cpp — 5090 + 3090 Ti speed test (~ 579 t/s prefill @
  8k ctx, ~324 t/s prefill @ 57k ctx, ~10.6 t/s decode)
url: >-
  https://www.reddit.com/r/LocalLLaMA/comments/1uclt1q/glm52_udiq1_m_on_llamacpp_5090_3090_ti_speed_test/
source: Reddit r/LocalLLaMA
source_type: rss
language: en
published: '2026-06-22T14:17:03.000Z'
fetched_at: '2026-06-23T01:34:58.967Z'
---
Just sharing some speed test numbers for GLM-5.2 running on llama.cpp.
 Setup:
  
Model: unsloth/GLM-5.2-GGUF, UD-IQ1_M quant
 GPUs: RTX 5090 + RTX 3090 Ti
 186 GB DDR5 used
 Debian 13
 CUDA 13.3
 128k context, q8_0 KV cache
  
Prefill (prompt processing):
  
 n_tokens tokens/s 
  
 8,201 579.75 
  16,393 522.28 
  24,585 468.21 
  32,777 422.61 
  40,969 384.43 
  49,161 351.90 
  57,353 324.48 
 
 Decode (generation):
 Holds steady around 10.6 t/s through 580+ decoded tokens. 9.37 t/s on 60k context. 
 Start command:
 llama-server \ -m GLM-5.2-UD-IQ1_M.gguf \ -fa 1 \ --fit off \ --tensor-split 100,0 \ --override-tensor "blk\.[0-3]\.(ffn_(up|down|gate)_exps\.weight)=CUDA0,blk\.([4-9]|10])\.(ffn_(up|down|gate)_exps\.weight)=CUDA1,blk\.11\.(ffn_down_exps\.weight)=CUDA1" \ --main-gpu 0 \ --n-cpu-moe 99 \ --no-mmap \ --mlock \ --cpu-range 0-23 \ --cpu-range-batch 0-23 \ --ctx-size 131072 \ --parallel 1 \ --jinja --no-warmup --threads 24 --numa isolate \ --batch-size 8192 --ubatch-size 8192 --threads-batch 24 \ -cms 24000 \ -ctxcp 5 \ --cache-type-k q8_0 --cache-type-v q8_0 \ --alias glm.5.2 \ --host 0.0.0.0 --port 8080 
    submitted by    /u/Shoddy_Bed3240  
 [link]   [comments]
