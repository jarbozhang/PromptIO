---
title: >-
  CPU-only inference on a Celeron N5095 SBC: 6 models from 0.6B to 8B,
  benchmarked
url: >-
  https://www.reddit.com/r/LocalLLaMA/comments/1v4lgo3/cpuonly_inference_on_a_celeron_n5095_sbc_6_models/
source: Reddit r/LocalLLaMA
source_type: rss
language: en
published: '2026-07-23T17:59:34.000Z'
fetched_at: '2026-07-24T11:01:34.766Z'
---
I wanted to know how cheap you can go and still run local models, so I ran Ollama CPU-only on a Youyeetoo X1S. It's a single-board x86 machine with a Celeron N5095 (Jasper Lake, 4C/4T, 15W), 16GB of RAM, and a 128GB NVMe, running Kali 2025.4. Base configs of this board go for about $100 to $130 on AliExpress depending on RAM and storage.
 Short version of the results:
  
Qwen3 0.6B averaged 6.788 tok/s. Actually usable interactively.
 The 8B fit in 16GB and ran, but averaged 0.924 tok/s. Not very usable for anything real.
 Four models in between, and the full table is in the repo I linked below.
 15 minute all-core stress during testing: 74.66C average, 77C peak, no throttling on the stock heatsink and fan.
  
Some notes:
  
Ollama saw the Jasper Lake iGPU but picked the CPU backend on its own, so everything here is CPU-only on purpose.
 Small models on sub-15W x86 are more viable than I expected. At around 7 tok/s a 0.6B is fine for classification, routing, summarization, the kind of background jobs you'd otherwise send to an API.
 The 8B wall is memory bandwidth, not capacity. It loads and runs but you just wait forever.
  
Next I'm testing llama.cpp with Vulkan on the Jasper Lake iGPU. Someone over on r/SBCs told me Vulkan inference works on the N100 iGPU, so a CPU vs Vulkan comparison on this chip is coming and I'll post it here.
 Scripts, raw logs, full results table: https://github.com/TrevTron/youyeetoo-x1s-kali Write-up: https://www.unland.dev/blog/budget-cyberdeck-youyeetoo-x1s-kali
 If anyone has N100 or N150 numbers to compare against, I'd like to see them. And if you've gotten usable tok/s out of a Jasper Lake or Alder Lake-N iGPU over Vulkan, I'd love to know too.
 (Disclosure: the board was supplied by Youyeetoo. Testing and conclusions are my own.)
    submitted by    /u/tre7744  
 [link]   [comments]
