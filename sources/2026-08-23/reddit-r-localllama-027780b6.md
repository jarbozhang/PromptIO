---
title: >-
  I hosted Kimi K3 (2.8T parameters) using 8 B300s. 92 tok/s, $190 per million
  tokens
url: >-
  https://www.reddit.com/r/LocalLLaMA/comments/1vw1j2p/i_hosted_kimi_k3_28t_parameters_using_8_b300s_92/
source: Reddit r/LocalLLaMA
source_type: rss
language: en
published: '2026-08-23T08:25:35.000Z'
fetched_at: '2026-08-23T11:01:37.694Z'
---
What I ran:
  
8x B300 on Modal, $56.79 per hour, vLLM, tensor parallel 8, native MXFP4
 Cold boot ~27 min (1.56 TB load, JIT, 51 CUDA graph captures)
 TTFT 0.92 to 1.02 s, decode 92 tok/s steady, 83 tok/s average over 4 prompts
 $190 per million output tokens. One clean run is about $36 of GPU time. Left warm, it is $1,363 a day.
  
I also ran Unsloth's Dynamic GGUF. 
 Their 1-bit UD-IQ1_S (594 GB) fits 8x A100-80GB via llama.cpp.
 $19.99 per hour, 2.8x cheaper. Result: ~9 tok/s, TTFT 7 to 60 s, ~$620 per million tokens, so 3.3x more expensive per token. 
 Quality at 1-bit was fine (correct arithmetic, coherent prose). 
 Full write-up with every flag, the Modal deployment file, and the raw benchmark JSON: https://books.vizuara.ai/book/kimi-k3-hosting
    submitted by    /u/OtherRaisin3426  
 [link]   [comments]
