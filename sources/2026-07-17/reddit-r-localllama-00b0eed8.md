---
title: >-
  DeepSeek V4 Flash (98GB) on 1x 4060ti + CPU got 300% faster this week [
  2->7t/s]
url: >-
  https://www.reddit.com/r/LocalLLaMA/comments/1uy33fw/deepseek_v4_flash_98gb_on_1x_4060ti_cpu_got_300/
source: Reddit r/LocalLLaMA
source_type: rss
language: en
published: '2026-07-16T13:35:48.000Z'
fetched_at: '2026-07-16T23:01:10.316Z'
---
This is an an insane budget box that I've been using to test out a 98GB model using cpu generation on a 6 core CPU, 16gb vram.. for science. 
 This week it went from 2t/s -> 7t/s on DeepSeek-V4-Flash-UD-Q2_K_XL, which has a 98GB vram requirement.
 Somewhere between b9986 and b10034 the llamacpp guys are cooking. 
 [tequila ~]$ echo "=== Tequila Hardware ===" && \ echo "CPU: $(lscpu | grep 'Model name' | awk -F: '{print $2}' | xargs) ($(nproc) cores)" && \ echo "RAM: $(free -h | awk '/Mem:/ {print $2}') @ $(sudo dmidecode --type memory | grep -m1 'Speed:' | awk '{print $2 $3}')" && \ echo "GPU: $(nvidia-smi --query-gpu=name,memory.total --format=csv,noheader,nounits | sed 's/ /_/g' | tr '\n' ' ')" && \ echo "======================================" === Tequila Hardware === CPU: AMD Ryzen 5 9600X 6-Core Processor (12 cores) RAM: 138Gi @ 5600MT/s GPU: NVIDIA_GeForce_RTX_4060_Ti,_16380 ====================================== [59223] 27.20.618.933 I slot print_timing: id 0 | task 0 | n_decoded = 11964, tg = 7.44 t/s, tg_3s = 7.40 t/s [59223] 27.23.723.257 I slot print_timing: id 0 | task 0 | n_decoded = 11987, tg = 7.44 t/s, tg_3s = 7.41 t/s [59223] 27.25.478.347 I slot print_timing: id 0 | task 0 | prompt eval time = 918.60 ms / 14 tokens ( 65.61 ms per token, 15.24 tokens per second) [59223] 27.25.478.350 I slot print_timing: id 0 | task 0 | eval time = 1611853.65 ms / 12000 tokens ( 134.32 ms per token, 7.44 tokens per second) [59223] 27.25.478.351 I slot print_timing: id 0 | task 0 | total time = 1612772.24 ms / 12014 tokens [59223] 27.25.478.362 I slot print_timing: id 0 | task 0 | graphs reused = 11802 [59223] 27.25.478.400 I slot release: id 0 | task 0 | stop processing: n_tokens = 12013, truncated = 0 
 Still mind blowing that cpu generation is getting close to useable for larger models
 # fat_models.ini [*] ctx-checkpoints = -1 mmap = false flash-attn = on threads = 16 threads-batch = 20 cache-ram = 2048 parallel = 1 batch-size = 2048 ubatch-size = 1024 jinja = tr
