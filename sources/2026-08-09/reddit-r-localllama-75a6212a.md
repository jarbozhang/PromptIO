---
title: Tesla V100 Qwen3.6 27B Performance
url: >-
  https://www.reddit.com/r/LocalLLaMA/comments/1vixl0f/tesla_v100_qwen36_27b_performance/
source: Reddit r/LocalLLaMA
source_type: rss
language: en
published: '2026-08-08T14:34:41.000Z'
fetched_at: '2026-08-09T11:01:08.932Z'
---
Looking for V100 users to share your config and it's performance.
 GPU: Tesla V100 PCIE 32Gb
 Qwen3.6 27B Q4_K_M + Q8_0 MTP
 128K context length
 Pi coding agent 
 llama.cpp model preset:
 [*] spec-default = 1 ctx-size = 131072 mmap = 1 kv-unified = 1 n-gpu-layers = 999 threads = 18 prio = 3 seed = 3407 image-min-tokens = 1024 batch-size = 4096 ubatch-size = 2048 parallel = 1 flash-attn = true [Qwen3.6-27B] model = /models/Qwen3.6/Qwen3.6-27B-Q4_K_M.gguf mmproj = /models/mmproj/mmproj-Qwen3.6-27B-Q8_0.gguf spec-draft-model = /models/mtp/mtp-Qwen3.6-27B-Q8_0.gguf chat-template-file = /templates/froggeric_chat_template_v21-3.jinja spec-type = draft-mtp spec-draft-n-max = 1 temperature = 0.6 top-p = 0.95 top-k = 20 min-p = 0.05 presence-penalty = 0.0 repeat-penalty = 1.0 chat-template-kwargs = {"preserve_thinking": true} 
 And the performance:
 https://preview.redd.it/bynog4baw5ih1.png?width=1319&format=png&auto=webp&s=97f8138f93f704c0aca3d9e7c638d6b57df3a832
    submitted by    /u/Traditional_Bell8153  
 [link]   [comments]
