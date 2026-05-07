---
title: Anyone want to try my llama.cpp DeepSeek V3.2 PR?
url: >-
  https://www.reddit.com/r/LocalLLaMA/comments/1t5j71o/anyone_want_to_try_my_llamacpp_deepseek_v32_pr/
source: Reddit r/LocalLLaMA
source_type: rss
language: en
published: '2026-05-06T17:11:31.000Z'
fetched_at: '2026-05-07T10:33:23.089Z'
---
Code: https://github.com/fairydreaming/llama.cpp/tree/deepseek-dsa
 git clone https://github.com/fairydreaming/llama.cpp -b deepseek-dsa --single-branch 
 Supported GGUFs (Q4_K_M ~ 404GB, Q8_0 ~ 714GB):
  
https://huggingface.co/sszymczyk/DeepSeek-V3.2-light-GGUF
 https://huggingface.co/sszymczyk/DeepSeek-V3.2-Speciale-light-GGUF
 https://huggingface.co/sszymczyk/DeepSeek-V3.2-Exp-light-GGUF
  
Chat template to use: models/templates/deepseek-ai-DeepSeek-V3.2.jinja
 If you experience OOM errors in CUDA ggml_top_k() try lowering the ubatch size or/and increasing `-fitt` value.
 Let me know if you encounter any problems.
    submitted by    /u/fairydreaming  
 [link]   [comments]
