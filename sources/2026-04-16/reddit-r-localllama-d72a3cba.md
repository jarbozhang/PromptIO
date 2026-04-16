---
title: >-
  [P] Built GPT-2, Llama 3, and DeepSeek from scratch in PyTorch - open source
  code + book
url: >-
  https://www.reddit.com/r/LocalLLaMA/comments/1sm82ze/p_built_gpt2_llama_3_and_deepseek_from_scratch_in/
source: Reddit r/LocalLLaMA
source_type: rss
language: en
published: '2026-04-15T14:42:55.000Z'
fetched_at: '2026-04-16T06:06:04.167Z'
---
I wrote a book that implements modern LLM architectures from scratch. The part most relevant to this sub:
 Chapter 3 takes GPT-2 and swaps exactly 4 things to get Llama 3.2-3B:
  
LayerNorm → RMSNorm
 Learned positional encodings → RoPE
 GELU → SwiGLU
 Multi-Head Attention → Grouped-Query Attention
  
Then loads Meta's real pretrained weights.
 Chapter 5 builds DeepSeek's full architecture: MLA with the absorption trick, decoupled RoPE, MoE with shared experts and fine-grained segmentation, auxiliary-loss-free load balancing, Multi-Token Prediction, and FP8 quantisation.
 All code is open source: https://github.com/S1LV3RJ1NX/mal-code
 Book with free sample: https://leanpub.com/adventures-with-llms
 If you've ever wanted to understand exactly what's inside these models at the code level, this might be useful. Happy to answer questions.
    submitted by    /u/s1lv3rj1nx  
 [link]   [comments]
