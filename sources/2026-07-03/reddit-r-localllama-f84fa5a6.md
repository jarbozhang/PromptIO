---
title: 6x P40 running Minimax M2.7_Q3_XL
url: >-
  https://www.reddit.com/r/LocalLLaMA/comments/1ulqyxj/6x_p40_running_minimax_m27_q3_xl/
source: Reddit r/LocalLLaMA
source_type: rss
language: en
published: '2026-07-02T18:49:50.000Z'
fetched_at: '2026-07-02T23:00:55.718Z'
---
I've been a lurker for a while and have been building my own home lab with P40's and MI50's. I've learned so much from the community and I just felt like it's time to give back. Even though I'm still learning I'm sure this information will be valuable to someone out there. I'll be posting MI50's details once I'm done fine tuning my P40 box.
 Hardware:
 Asus X99-E-WS (Modded BIOS to support a large number GPU's )
 Intel(R) Xeon(R) CPU E5-2680 v4 @ 2.40GHz
 128GB DDR4 RAM (mixed batch of Non-ECC sticks)
 SSD
 6x P40's 144GB VRAM (Gen3 x8,x8,x8,x8,x8,x8)
 Memory distribution during benchmark
 The below table shows benchmarks I ran with my findings:
  
 Test configuration Context pp512 tg128 pp512+tg128 pp4096+tg128 Result 
  
 F16 KV, FA on, batch 2048, ubatch 512 32,768 73.20 10.45 33.50 129.51 Original baseline 
  F16 KV, FA on, batch 2048, ubatch 512 65,536 42.68 6.43 19.49 77.22 Original baseline 
  F16 KV, FA on, batch 2048, ubatch 512 126,720 24.16 3.51 10.90 44.22 Fits 
  Q8 KV, FA on, batch 2048, ubatch 512 65,536 42.53 6.14 — — Slower than F16 
  Q8 KV, FA on, batch 2048, ubatch 512 126,720 23.91 3.06 — — Generation −12.8% 
  F16 KV, FA on, batch 1024, ubatch 256 32,768 105.76 10.70 37.34 128.94 Strong improvement 
  F16 KV, FA on, batch 1024, ubatch 256 65,536 66.00 6.18 22.63 79.39 Strong improvement 
  F16 KV, FA on, batch 2048, ubatch 256 32,768 105.91 10.50 37.41 129.42 Selected 
  F16 KV, FA on, batch 2048, ubatch 256 65,536 65.86 6.38 22.63 79.37 Selected 
  F16 KV, FA off, batch 1024, ubatch 256 32,768 34.16 2.72 — — Major regression 
  F16 KV, FA off, batch 1024, ubatch 256 65,536 19.34 1.50 — — Major regression 
  F16 KV, FA off, batch 1024, ubatch 256 126,720 — — — — Context creation failed 
  F16 KV, FA on, 2048/256, GGML_CUDA_P2P=1 32,768 105.76 10.68 37.38 129.40 No measurable gain 
  F16 KV, FA on, 2048/256, GGML_CUDA_P2P=1 65,536 66.00 6.18 22.63 79.35 No measurable gain 
  F16 KV, FA on, 2048/256, launch queues 4× 32,768 105.53 10.69 37.36 129
