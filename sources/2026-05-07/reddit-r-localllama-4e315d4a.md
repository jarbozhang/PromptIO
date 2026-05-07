---
title: Get faster qwen 3.6 27b
url: 'https://www.reddit.com/r/LocalLLaMA/comments/1t5tnzl/get_faster_qwen_36_27b/'
source: Reddit r/LocalLLaMA
source_type: rss
language: en
published: '2026-05-06T23:33:07.000Z'
fetched_at: '2026-05-07T10:33:23.086Z'
---
Using 100k context with 3090 with MTP GGUF and getting 50 t/s on llama.cpp
 Thought I would knowledge share
 Use https://huggingface.co/RDson/Qwen3.6-27B-MTP-Q4_K_M-GGUF
 And am17an commit - https://github.com/ggml-org/llama.cpp/pull/22673 How to apply - Steps
 ```bash cd path/to/llama.cpp
 git fetch origin pull/22673/head:pr-22673
 git checkout pr-22673
 ```
 My exact setup in Llama-cpp
 ```bash ./llama-server \ -m "/media/model/Qwen3.6-27B-MTP-Q4_K_M.gguf" \ --alias qwen3.6-27b-am17am \ -c 100000 \ --host 0.0.0.0 --port 8080 \ --slot-save-path /media/llama-swap/kv_cache/qwen3.6-27b-am17am \ -ngl 99 \ -fa \ --cache-type-k q4_0 --cache-type-v q4_0 \ --spec-type mtp --spec-draft-n-max 2 \ -b 2048 -ub 512 \ -t 8 \ (Im on a 8 core CPU) --no-mmap \ --prio 3 \ --parallel 1 \ --reasoning-format deepseek \ -np 8192 \ --temp 0.8 --top-p 0.95 --top-k 40 --min-p 0.05 --repeat-penalty 1.1 \ --metrics
 ```
 Note: Spec draft 3 seemed to much for the 3090 at higher context
 Why 100k context? Beside it slows down and 100k is enough for most tasks then compact and continue. 
 Edit yes i used q4 k and v cache so it's 19gb VRAM and very stable. With larger context at above 90k it gets in loops, makes mistakes falls off a cliff for coding Updated add temperature etc
 Edit2: Yes there is a MAC version apparently 
 Install via Homebrew
 brew install youssofal/mtplx/mtplx
 Start the server (it will auto-detect MTP heads in supported models)
 mtplx start --model /path/to/your/Qwen3.6-27B-MTP
 Check the Graph here 
 Graph Link
    submitted by    /u/admajic  
 [link]   [comments]
