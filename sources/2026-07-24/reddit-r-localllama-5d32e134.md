---
title: Deepseek V4 Flash ~105 t/s on two Nvidia 4090d 48G (ada) in vLLM
url: >-
  https://www.reddit.com/r/LocalLLaMA/comments/1v4n8wj/deepseek_v4_flash_105_ts_on_two_nvidia_4090d_48g/
source: Reddit r/LocalLLaMA
source_type: rss
language: en
published: '2026-07-23T19:01:22.000Z'
fetched_at: '2026-07-24T11:01:34.764Z'
---
TLDR: I (with the help of AI) re-implemented every Blackwell-only kernel (DeepGEMM, FlashInfer sparse-MLA, block-scaled FP8) in Triton, because they simply don't exist for sm89. The performance is 2-3x more for parallel agentic workflows.
 Benchmark llama-server vs vLLM
 I was inspired by the post https://www.reddit.com/r/LocalLLM/comments/1utoh2r/deepseek_v4_flash_160_ts_on_rtx_6000_blackwell_96/
 I have similar amount of VRAM, but spread among two GPU 4090d 48G on Dell R740 with enabled p2p patch ( https://github.com/Duanyll/open-gpu-kernel-modules/tree/595.71.05-p2p-48g ). Ada wasn't supported, so I had to find a way to run vLLM, because llama.cpp speed wasn't enough for me.
 The first run compresses DeepSeek-V4-Flash into ~iq2 to fit into 96 GB VRAM, it may take up to 60 minutes, depending on your hardware.
 If you have only single GPU, use env variables at step 4 below`TP=1` and GPUS='"device=0"'.
 Get the model hf download deepseek-ai/DeepSeek-V4-Flash --local-dir ~/models/DeepSeek-V4-Flash
  
Build vLLM-Moet (~SM89 image): 
 git clone https://github.com/iSevenDays/vLLM-Moet && cd vLLM-Moet
 DOCKER_BUILDKIT=1 docker build -f Dockerfile.sm89-v0251 -t vllm-moet-sm89:v0251 .
 MTP_TOKENS=1 FORCE_RESIDENT=1 NETWORK=host MEM_GB=28 RESIDENCY=gpu TP=2 GPUS='"device=0,1"' ./docker/serve_sm89_ds4.sh
  
I'm getting 262k context and better concurrency when running vLLM compared to llama.cpp.
 When running llama.cpp (today's main + https://github.com/ggml-org/llama.cpp/pull/21067/ ), I used the command below to fully fit the model into VRAM.
 ```
 /root/llama.cpp/build/bin/llama-server
 --model /root/antirez/ds4/gguf/DeepSeek-V4-Flash-IQ2XXS-w2Q2K-AProjQ8-SExpQ8-OutQ8-chat-v2-imatrix.gguf
 -ngl 99
 -np 1
 --n-cpu-moe 0
 --split-mode layer
 -ts 43,43
 -fit on
 -fa on -c 262144
 --cache-type-k q8_0
 --cache-type-v q8_0
 --temp 1.0
 --top-p 1.0
 --min-p 0.0
 --host 0.0.0.0
 --port 8002
 --jinja
 --reasoning-preserve
 --no-mmap
 --prefetch-weights 1
 --chat-template-kwargs '{"
