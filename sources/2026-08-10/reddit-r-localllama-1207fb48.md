---
title: 'Underestimated budget solution: radeon 780m iGPU'
url: >-
  https://www.reddit.com/r/LocalLLaMA/comments/1vjs3sf/underestimated_budget_solution_radeon_780m_igpu/
source: Reddit r/LocalLLaMA
source_type: rss
language: en
published: '2026-08-09T15:01:52.000Z'
fetched_at: '2026-08-10T11:01:36.120Z'
---
There are so many posts where people complaining about high prices and asking for solution <= 1000 EUR.
 So, there is one solution to consider: PC/mini PC/laptop on Ryzen 7 260/Ryzen 9 8945HX/etc CPU with 780m iGPU and 64 Gb of DDR5 RAM.
 Barebone mini PC costs around 300-400, used 2x 32Gb DDR5 SO-DIMM around 500, used SSD 50-100 in my area.
 Here are my numbers on Ryzen 7 260, Ubuntu 26 with kernel params amdgpu.gttsize=49152 amd_iommu=off ttm.pages_limit=16777216 (48Gb of "VRAM") and llama.cpp with Vulkan. 
 All LLMs are Unsloth Q8 quants.
 Qwen 3.6 35B-A3B
 | model | size | params | backend | ngl | type_k | type_v | fa | dev | test | t/s | | ----------------------- | ---------: | ------: | ------- | --: | -----: | -----: | --: | ------- | -------: | ------------: | | qwen35moe 35B.A3B Q8_0 | 35.19 GiB | 35.51 B | Vulkan | 99 | q8_0 | q8_0 | 1 | Vulkan0 | pp8192 | 287.33 ± 2.06 | | qwen35moe 35B.A3B Q8_0 | 35.19 GiB | 35.51 B | Vulkan | 99 | q8_0 | q8_0 | 1 | Vulkan0 | pp16384 | 263.51 ± 1.06 | | qwen35moe 35B.A3B Q8_0 | 35.19 GiB | 35.51 B | Vulkan | 99 | q8_0 | q8_0 | 1 | Vulkan0 | tg128 | 21.06 ± 0.01 | | qwen35moe 35B.A3B Q8_0 | 35.19 GiB | 35.51 B | Vulkan | 99 | q8_0 | q8_0 | 1 | Vulkan0 | tg256 | 20.85 ± 0.20 | 
 Gemma 4 31B:
 | model | size | params | backend | ngl | type_k | type_v | fa | dev | test | t/s | | ---------------- | ---------: | -------: | ------- | --: | -----: | -----: | --: | -------- | -------: | ------------: | | gemma4 31B Q8_0 | 30.38 GiB | 30.70 B | Vulkan | 99 | q8_0 | q8_0 | 1 | Vulkan0 | pp8192 | 51.59 ± 0.07 | | gemma4 31B Q8_0 | 30.38 GiB | 30.70 B | Vulkan | 99 | q8_0 | q8_0 | 1 | Vulkan0 | pp16384 | 46.59 ± 0.01 | | gemma4 31B Q8_0 | 30.38 GiB | 30.70 B | Vulkan | 99 | q8_0 | q8_0 | 1 | Vulkan0 | tg128 | 2.46 ± 0.00 | | gemma4 31B Q8_0 | 30.38 GiB | 30.70 B | Vulkan | 99 | q8_0 | q8_0 | 1 | Vulkan0 | tg256 | 2.30 ± 0.22 | 
 For real tasks I'm using MTP, so tg numbers are higher, like for Gemma4 31B:
 16.27.894.079 I slot print_t
