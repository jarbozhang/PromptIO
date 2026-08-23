---
title: 'DeepSeek v4 Flash on 4090 + DDR5, my experience'
url: >-
  https://www.reddit.com/r/LocalLLaMA/comments/1ustyas/deepseek_v4_flash_on_4090_ddr5_my_experience/
source: Reddit r/LocalLLaMA
source_type: rss
language: en
published: '2026-07-10T17:17:54.000Z'
fetched_at: '2026-07-10T23:01:38.136Z'
---
Disclosure: No AI was used to write this
 My specs are:
  
RTX 4090
 128 GB DDR5 5600 MT/s
 Intel Core Ultra 7 270k
  
Running nvidia-595 on ubuntu 26.04 with latest llama.cpp build (pulled and rebuilt this morning).
 Tried a lot of things, ended up running unsloth's UD-Q2_K_XL quant with command:
 taskset -c 0-7 /home/kevin/ai/llama.cpp/build/bin/llama-server -lv 4 -m /home/kevin/ai/models/DeepSeek-V4-Flash-UD-Q2_K_XL-00001-of-00003.gguf --temp 1.0 --top-p 1.0 --min-p 0.0 -t 8 -fitc 64000 -fa off -np 1
 Speed: [ Prompt: 132.5 t/s | Generation: 10.9 t/s ]
 Some notes:
  
On Intel Core Ultra 7 270k (I recently bought this CPU), pinning pcores makes a big difference. Like 2x, from 6.8 tok/s to 11 tok/s
 --no-mmap is much slower
 using -ctk q8_0 or -ctv q8_0 crashed the llama.cpp process
 adjusting -b or -ub to > 4096 with context > 32k seems to explode the CUDA buffer to 90 GB+ 
 with llama-server, for some reason, -fa off is necessary, otherwise it also explodes the CUDA buffer
  
Overall, seems smarter compared to Qwen 3.6 27B Q4_K_XL. It runs slower, but reasons less, meaning tasks still complete in a reasonable amount of time. However, for agentic, Qwen 3.6 27B is still much better because it runs so much faster, and also qwen models don't seem to "over-reason" too much when doing agentic tasks. 
 With a couple fixes (flash attention, microbatch/batch adjust, context quantisation, etc.) I think this model could be pretty decent on 4090/3090. If we could get these numbers up to like ~20 tg/s and ~300 pp/s it might replace qwen 3.6 27b for me.
 Also tried running IQ4_NL quant but ended up being too slow and couldn't fit enough context (only about 10k):
 taskset -c 0-7 /home/kevin/ai/llama.cpp/build/bin/llama-cli -m /home/kevin/ai/models/DeepSeek-V4-Flash-UD-IQ4_NL-00001-of-00004.gguf --temp 1.0 --top-p 1.0 --min-p 0.0 -t 8
 It was at speed: [ Prompt: 50.7 t/s | Generation: 8.1 t/s ]
 I am posting this in case its useful to anyone else with a 24GB GPU + consumer RAM.
