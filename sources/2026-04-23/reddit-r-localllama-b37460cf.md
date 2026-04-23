---
title: Best config for Qwen3.6 27b / llama.cpp / opencode
url: >-
  https://www.reddit.com/r/LocalLLaMA/comments/1ssp9kq/best_config_for_qwen36_27b_llamacpp_opencode/
source: Reddit r/LocalLLaMA
source_type: rss
language: en
published: '2026-04-22T15:44:28.000Z'
fetched_at: '2026-04-23T02:21:55.375Z'
---
Please share your best config <3
 Windows 2x3080 20GB VRAM, DDR4 256GB RAM , llama.ccp, On 100K filled context i have 400/11 pp/tg (My setup):
 "A:/0_llama_server/llama-server.exe" -m "a:\0_LM_Studio\unsloth\Qwen3.6-27B-GGUF\Qwen3.6-27B-UD-Q5_K_XL.gguf" --port 8080 --alias qwen3.5:27b -ngl 999 --threads 22 --flash-attn on --host[0.0.0.0](http://0.0.0.0)--no-mmap -mg 1 --batch-size 1024 --ubatch-size 512 --ctx-checkpoints 128 --ctx-size 196610 --reasoning on --jinja --draft-max 128 --spec-ngram-size-n 48 --draft-min 2 --spec-type ngram-mod --temp 0.6 --top-p 0.95 --top-k 20 --min-p 0.00 --repeat_penalty 1.0 --presence_penalty 0.0 --chat-template-kwargs "{"preserve_thinking":true}" --tensor-split 0.46,0.54 
 DGX (user Impossible_Art9151):
 llama-server -hf unsloth/Qwen3.6-27B-GGUF:UD-Q8_K_XL --host 0.0.0.0 --port 8095 --ctx-size 512000 --no-mmap --parallel 2 --flash-attn on --n-gpu-layers 999 -chat-template-kwargs "{"preserve_thinking":true}" --temp 0.7 --top-p 0.95 --top-k 20 --min-p 0.00 --repeat_penalty 1.0 --presence_penalty 0.0 
 24gb vram 7900XTX 35t/s, and pp 400, 27t/s at 160k context (user soyalemujica) :
 llama-server.exe -ctv q8_0 -ctk q8_0 -c 160000 --temp 0.6 --top-p 0.95 --top-k 20 --repeat-penalty 1.0 --fit on 
 UPDATE (My setup): Tested in dual GPU setup turboquant3 and 4, unfortunately it was slower. Start->End (prompting to analyze codebase)
    submitted by    /u/Familiar_Wish1132  
 [link]   [comments]
