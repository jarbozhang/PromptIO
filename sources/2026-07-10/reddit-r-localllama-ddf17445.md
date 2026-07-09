---
title: 6x MI50's (96gb) vs 6 P40's (144gb) running MiniMax M2.7 REAP 139B Q3_K_L
url: >-
  https://www.reddit.com/r/LocalLLaMA/comments/1urymln/6x_mi50s_96gb_vs_6_p40s_144gb_running_minimax_m27/
source: Reddit r/LocalLLaMA
source_type: rss
language: en
published: '2026-07-09T18:25:31.000Z'
fetched_at: '2026-07-09T23:01:04.805Z'
---
Hey Guys,
 As promised here are the results from running MiniMax M2.7 REAP 139B Q3_K_L on llama-bench on 6x MI50's.
 Memory Load:
 https://preview.redd.it/7tp1nhrl79ch1.png?width=1628&format=png&auto=webp&s=ada4c100e1b589ab530e5b3e7b64153533a8a3de
 Hardware:
 Asus X99-E-WS (Modded BIOS to support a large number GPU's )
 Intel(R) Xeon(R) CPU E5-2680 v4 @ 2.40GHz
 128GB DDR4 RAM
 SSD
 6x MI50's 96GB VRAM (Gen3 x8,x8,x8,x8,x8,x8)
 Results
  
 GPU Setup Model Test Result 
  
 6x MI50 / Pro VII 16GB MiniMax M2.7 REAP 139B Q3_K_L pp512 139.27 t/s 
  6x MI50 / Pro VII 16GB MiniMax M2.7 REAP 139B Q3_K_L tg128 24.87 t/s 
  6x MI50 / Pro VII 16GB MiniMax M2.7 REAP 139B Q3_K_L pp512+tg128 71.12 t/s 
  6x MI50 / Pro VII 16GB MiniMax M2.7 REAP 139B Q3_K_L pp4096+tg128 120.95 t/s 
  6x MI50 / Pro VII 16GB MiniMax M2.7 REAP 139B Q3_K_L pp16384+tg128 117.69 t/s 
  6x MI50 / Pro VII 16GB MiniMax M2.7 REAP 139B Q3_K_L pp32768+tg128 103.56 t/s 
  6x MI50 / Pro VII 16GB MiniMax M2.7 REAP 139B Q3_K_L pp65536+tg128 81.99 t/s 
 
 Optimal Start up params for me were:
 HIP_VISIBLE_DEVICES=0,1,2,3,4,5 \ "$HOME/llama.cpp-hip/build-hip/bin/llama-server" \ -m "$HOME/.lmstudio/models/mradermacher/m51Lab-MiniMax-M2.7-REAP-139B-A10B-i1-GGUF/m51Lab-MiniMax-M2.7-REAP-139B-A10B.i1-Q3_K_L.gguf" \ --alias "minimax-m2.7-reap-139b-a10b-q3kl" \ -dev ROCm0,ROCm1,ROCm2,ROCm3,ROCm4,ROCm5 \ -ngl 999 \ --fit off \ --no-mmap \ --split-mode layer \ --tensor-split 1,1,1,1,1,1 \ --ctx-size 65536 \ --parallel 1 \ --cache-type-k f16 \ --cache-type-v f16 \ --batch-size 2048 \ --ubatch-size 256 \ --flash-attn on \ --jinja \ --temp 1.0 \ --top-p 0.95 \ --top-k 64 \ --min-p 0.0 \ --presence-penalty 0.0 \ --repeat-penalty 1.0 \ --host 0.0.0.0 \ --port 8080 
 Here is how 6x MI50's compare to 6x P40's:
  
 Test Betty: 6x MI50 / Pro VII 16GB, ROCm Kevin: 6x Tesla P40 24GB, CUDA Winner Difference 
  
 pp512 139.27 t/s 330.66 t/s P40 P40 ~2.37x faster 
  tg128 24.87 t/s 20.49 t/s MI50 MI50 ~1.21x faster 
  pp512+tg128 71.12 t
