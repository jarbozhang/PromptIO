---
title: DeepSeek v4 Flash 0731 locally on CPU
url: >-
  https://www.reddit.com/r/LocalLLaMA/comments/1vjsysx/deepseek_v4_flash_0731_locally_on_cpu/
source: Reddit r/LocalLLaMA
source_type: rss
language: en
published: '2026-08-09T15:36:32.000Z'
fetched_at: '2026-08-10T11:01:36.120Z'
---
After seeing the benchmark results for the full release of DS v4 Flash 0731, I replaced my 2 x 16GB DDR4 ram sticks with 2 x 32GB DDR4 ram sticks to get a max supported of 128 GB RAM, in hope to be able to run GLM 5.2 equivalent model locally i.e. DS v4 Flash 0731
 I also have RTX 4090 & Tesla P40 so the total combined RAM + VRAM is 176GB on my setup, I would have spare 20GB just for windows 11, so workable memory left is 156GB, that is enough to run Unsloth 4bit K_XL (which is around 144GB), I believe I would more spare memory on Linux compared to windows and also better performance overall.
 After fighting Nvidia drivers to get both RTX 4090 and Tesla P40 working on windows 11 with llama.cpp (CUDA 12.4), I was able to run Unsloth quant 4bit K_XL at 12k context and I was left with few GB memory of system and some on GPUs and the token generation was about 2 token/sec and that is without the DSpark MTP, the K_XL quant is around 97% accuracy as per Unslot so I was really hoping for that to work, but not enough spare memory left to run the DSpark MTP because the MTP is 10+ GB in size.
 So, I had to go for IQ4_XS quant which is around 127GB on disk and with MTP that would be around 137GB and with some memory left for KV cache
 With MTP enabled I was getting around 3 token/sec on IQ4_XS quant and prompt processing of around 30 token/sec for context size of around 5k+
 The llama.cpp -dev flag does impact prompt processing speed from what I observed so using
 -dev CUDA0,CUDA1 where CUDA0 is RTX 4090 and CUDA1 Tesla P40, with CUDA0 mentioned 1st the prompt processing was around 40 token/sec and even 80/sec at one point, but CUDA1 1st makes it crawl to 17 token/sec
 Also, the .output layer can’t go to Tesla P40 because of some unsupported OPs for Gated Delta Net
 so, I had to change the script I was using to have a manual layer by layer assignment so embed & output on RTX 4090 and 0 to 6 on Tesla P40 and rest on CPU
 Also, the llama.cpp currently don’t support tensor splitt
