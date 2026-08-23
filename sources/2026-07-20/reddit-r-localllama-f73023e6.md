---
title: poor man's way to local inference on the go
url: >-
  https://www.reddit.com/r/LocalLLaMA/comments/1v0pnqd/poor_mans_way_to_local_inference_on_the_go/
source: Reddit r/LocalLLaMA
source_type: rss
language: en
published: '2026-07-19T12:44:48.000Z'
fetched_at: '2026-07-19T23:01:24.639Z'
---
Many bring egpu to game on laptop, yet here I am fiddling with llama cpp params for 1-time crappy HW configuration for Qwen3.6 35B A3B.
 idk if I'm having fun or not, but running llama bench runs are surely a good way to kill some time, I guess
 p.s. I really like recently added llama cpp's built in lightweight web ui, it's tool call aren't safe as already documented (no sandboxing) but is really fun to play with.
 
 hw:
 - 1360p, my arch nemesis on both perf & thermal for last 5 years
 - 32GB LPDDR5 6400MT
 ‐ AXLE's 1slot 3050 6GB
 - TH3P4 Lite + 120W DC brick
 
 EDIT:
 as someone asked for 64k ctx, here's llama-bench result for it:
 Seems like egpu is hitting practical bandwidth limit (considering overhead), as nvtop shows 3050 maxing out bandwidth at 2.5GB/s consistently over 3.0 x4 connection which should give higher bandwidth in theory.
  
 type_k type_v pp512 tg128 
  
 q4_0 q4_0 78.18 ± 0.52 (d65536) 15.68 ± 0.47 (d65536) 
  q4_0 q4_0 85.39 ± 1.27 24.24 ± 1.31 
  - - 85.59 ± 1.26 25.01 ± 1.18 
 
 Raw log:
 ./llama-bench -hf "unsloth/Qwen3.6-35B-A3B-GGUF:Q4_K_XL" -b 2048 -ub 1024 -ngl 99 -ctk q4_0 -ctv q4_0 -ncmoe 99 -mmp 0 -d 65536 ggml_cuda_init: found 1 CUDA devices (Total VRAM: 5803 MiB): Device 0: NVIDIA GeForce RTX 3050, compute capability 8.6, VMM: yes, VRAM: 5803 MiB ggml_vulkan: Found 2 Vulkan devices: ggml_vulkan: 0 = Intel(R) Iris(R) Xe Graphics (RPL-P) (Intel open-source Mesa driver) | uma: 1 | fp16: 1 | bf16: 0 | fp4: 0 | warp size: 32 | shared memory: 65536 | int dot: 1 | matrix cores: none ggml_vulkan: 1 = NVIDIA GeForce RTX 3050 (NVIDIA) | uma: 0 | fp16: 1 | bf16: 0 | fp4: 0 | warp size: 32 | shared memory: 49152 | int dot: 1 | matrix cores: NV_coopmat2 | model | size | params | backend | ngl | n_cpu_moe | n_ubatch | type_k | type_v | mmap | test | t/s | | ------------------------------ | ---------: | ---------: | ---------- | --: | ---------: | -------: | -----: | -----: | ---: | --------------: | -------------------: | | qwen35moe 35B.A3B Q4_
