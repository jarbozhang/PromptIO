---
title: DeepSeek V4 Flash 0731 - Happy Numbers (700pp/18tg) and Thoughts
url: >-
  https://www.reddit.com/r/LocalLLaMA/comments/1vegedy/deepseek_v4_flash_0731_happy_numbers_700pp18tg/
source: Reddit r/LocalLLaMA
source_type: rss
language: en
published: '2026-08-03T15:19:20.000Z'
fetched_at: '2026-08-04T11:01:38.799Z'
---
Originally, I was only getting around 140pp/s and about 21tg/s, but the config with -b 8192 -ub 8192 --cpu-moe is vastly superior, let's say 700pp/s and 18tg/s in the most relevant range.
 Test System:
  
CPU: Threadripper 5965WX (24c/48t)
 RAM: 512GB (8x64 DDR4 ECC REG 2400)
 GPU: RTX 5090 (PCIe 4 x16, 450W)
  
Command
  ./build/bin/llama-server \ -hf unsloth/DeepSeek-V4-Flash-0731-GGUF:UD-Q8_K_XL \ --temp 1.0 --top-p 1.0 --min-p 0.0 --host 0.0.0.0 \ --ctx-size 262144 --no-mmap -b 8192 -ub 8192 \ --cpu-moe 
 Results
 PP/s is average up to given prompt length, generation is at that depth. First run (~20k) was cold-start.
 ```
 Prompt Tokens PP/s TG/s
 19970 712.76 18.81 36044 724.37 18.65 101204 648.85 17.88 ```
 I'm not a llama.cpp expert so maybe we can do even better, but bumping batch to 16k will abort launch with cpu-moe and without it will crush generation to about 7tg/s.
 I think there's room for improvement - I found that llama.cpp doesn't support DFV4 Flash native FP8 cache so we need twice as much for FP16 cache. Also, the speculator isn't working?
 Maybe this would be worth building a rig for? 
 DDR4 ECC REG (the slow stuff 2133/2400 32GB DIMMs) can be found for about $1 per 1GB (you may have to buy the entire LGA2011-v3 server). Aliexpress SP3 board is around $350, decent Epyc 7002/7003 CPU $250 to $500. So about $1k for the base system, then heist for 32gb-48gb VRAM ;) Maybe 2x 5060 Ti does the trick?
 Edit 1: I built the most recent llama.cpp because I wasn't sure when I last built it. It's 0% to +5%. I will see if I can get the dspark working.
 Edit 2: I got it to load with dspark, it's worse than baseline. Unfortunately I can't find much guidance on configuration. Let's see how this develops.
    submitted by    /u/reto-wyss  
 [link]   [comments]
