---
title: DeepSeek v4 Flash on 5090 in llama.cpp with 1 Million context
url: >-
  https://www.reddit.com/r/LocalLLaMA/comments/1uz5w3y/deepseek_v4_flash_on_5090_in_llamacpp_with_1/
source: Reddit r/LocalLLaMA
source_type: rss
language: en
published: '2026-07-17T17:14:30.000Z'
fetched_at: '2026-07-17T23:00:59.686Z'
---
After the recent llama.cpp changes, DeepSeek V4 Flash has become much more usable. I ran some benchmarks and wanted to share the results along with the config I used.
 I'm using DeepSeek-V4-Flash-UD-Q8_K_XL from Unsloth:
 https://huggingface.co/unsloth/DeepSeek-V4-Flash-GGUF
 Config:
 llama-server \ -m DeepSeek-V4-Flash-UD-Q8_K_XL.gguf \ --override-tensor "blk\.[0-1]\.ffn_(up|down|gate)_exps\.weight=CUDA0,blk\.2\.ffn_(down)_exps\.weight=CUDA0" \ --ctx-size 1048576 \ --cache-type-k q8_0 \ --cache-type-v q8_0 \ -fa 1 \ --fit off \ --main-gpu 0 \ --n-cpu-moe 999 \ --no-mmap \ --mlock \ --cpu-range 0-23 \ --cpu-range-batch 0-7 \ --parallel 1 \ --jinja \ --temp 1.0 --top-p 1.0 \ --presence-penalty 0.0 --repeat-penalty 1.05 --repeat-last-n 512 \ --no-warmup --threads 24 --numa isolate \ --batch-size 2048 --ubatch-size 2048 --threads-batch 8 \ --chat-template-kwargs '{"reasoning_effort":"max"}' \ -cms 24000 \ -ctxcp 5 \ --alias deepseek \ --host 0.0.0.0 --port 8080 
 Performance:
  
Prefill: ~650–700 tokens/s
 Decode: ~17 tokens/s
 Loading time: 32 sec
  
The speed isn't quite as impressive as Qwen models yet, but I believe there's still room for optimization in llama.cpp.
    submitted by    /u/Shoddy_Bed3240  
 [link]   [comments]
