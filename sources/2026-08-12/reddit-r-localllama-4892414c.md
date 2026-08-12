---
title: >-
  DeepSeek V4 Flash 0731 at 27+ t/s decode on Strix Halo — Vulkan + DSpark full
  guide
url: >-
  https://www.reddit.com/r/LocalLLaMA/comments/1vlmh0b/deepseek_v4_flash_0731_at_27_ts_decode_on_strix/
source: Reddit r/LocalLLaMA
source_type: rss
language: en
published: '2026-08-11T16:33:30.000Z'
fetched_at: '2026-08-12T11:01:19.739Z'
---
Been benchmarking DSv4 Flash 0731 on a Flow Z13 (Ryzen AI MAX+ 395, Radeon 8060S / gfx1151, 128GB LPDDR5X) for the past week. Figured I'd share what actually works and what doesn't — there are a lot of gotchas on this hardware.
 Results
 Best client-side observation (bench-kv.sh streaming, 4096-token generation). Server-side timing (predicted_per_second) for similar runs consistently shows 23-24 t/s. See gotcha #7.
  
 Metric Value 
  
 Decode (best client-side, 4096 tok) 26.76 t/s 
  Decode (server-side typical) 23-24 t/s 
  Decode (peak 3s window) 35.27 t/s 
  Prefill 236 t/s (2209-token prompt) 
  Plain decode (no spec, same engine) 18.33 t/s (llama-bench) 
  Plain prefill (no spec, same engine) 254 t/s (llama-bench) 
  DSpark acceptance 0.586, mean accepted len 3.93 
  Context 131,072 (q8_0 KV) 
  GPU util ~92%, CPU ~1% 
 
 131k context runs on q8_0 KV — a speed/context trade that costs quality (~2% top-token flips vs bf16 on predictable prose, more on harder text; full measurement in gotcha #1).
 Cross-platform comparison
 Both Strix Halo and DGX Spark are unified-memory APUs with similar LPDDR5X bandwidth (~256 GB/s vs 273 GB/s).
  
 Platform Engine Backend Spec Decode Prefill @2K 
  
 Strix Halo llama.cpp v0.6.1 Vulkan none 18.33 t/s 254 t/s 
  Strix Halo ds4 (upstream) ROCm none 12.5 t/s 122 t/s 
  DGX Spark ds4 (upstream) CUDA none 14.2 t/s 392 t/s 
  DGX Spark Entrpi/ds4 fork CUDA none 20.0 t/s ~960 t/s 
  Strix Halo llama.cpp v0.6.1 Vulkan DSpark 26.76 t/s ~236 t/s 
  DGX Spark Entrpi/ds4 fork v0.5.6 CUDA DSpark 27.3 t/s ~960 t/s 
 
 Note: ds4 (antirez's engine) is ROCm/HIP-only on AMD — no Vulkan backend. The 122 t/s ROCm number is artificially low because ROCm support on gfx1151 is still early (see gotcha #3). Prefill is unaffected by speculation (DSpark is decode-only). Decode is bandwidth-bound — context depth barely affects it.
 Decode is a dead heat. All plain decode numbers cluster in the 12-20 t/s range regardless of engine or platform — bandwidth
