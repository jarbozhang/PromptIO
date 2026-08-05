---
title: >-
  [Deepseek-V4-Flash-0731] Full 1M context on a single RTX5090 + DDR5 Desktop
  Setup with VLLM CPU/Ram Offloading, ~800 tps pp & 15+ tps decode [Agentic
  Coding]
url: >-
  https://www.reddit.com/r/LocalLLaMA/comments/1vfbcgx/deepseekv4flash0731_full_1m_context_on_a_single/
source: Reddit r/LocalLLaMA
source_type: rss
language: en
published: '2026-08-04T14:06:09.000Z'
fetched_at: '2026-08-05T11:01:21.137Z'
---
First of all, obviously I took some help from AI to type this post and this is the topic that enabled me to accomplish all that:
 https://old.reddit.com/r/LocalLLaMA/comments/1veow4b/deepseek_v4flash_284b_moe_at_33_toks_single_68/
 This post of mine is based on the link above.
 My Hardware:
  
RTX 5090 32GB
 Ryzen 9 9950X3D
 256GB DDR5-5600
 Single NUMA node
 Linux Mint
 NVIDIA driver 595.71.05
 CUDA 13.2
  
Software
  
guqiong96/Lvllmds4-x
 vLLM 2.3.9
 lk_moe 2.3.2
 PyTorch 2.11.0+cu130
 native DeepSeek-V4-Flash-0731 safetensors checkpoint
 48 safetensors shards
 ~155.4 GiB checkpoint size
  
One fix I needed
 During startup, FlashInfer's CUDA IPC helper could accidentally find TileLang's:
 libcudart_stub.so
 instead of the real loaded CUDA runtime.
 That eventually caused:
 undefined symbol: cudaDeviceReset
 The problem was FlashInfer's find_loaded_library("libcudart") doing a substring search over /proc/self/maps.
 I patched:
 flashinfer/comm/cuda_ipc.py
 so it checks the actual filename instead:
 def find_loaded_library(lib_name): with open("/proc/self/maps") as f: for line in f: if "/" not in line: continue start = line.index("/") path = line[start:].strip() filename = path.split("/")[-1] if ( filename.startswith(lib_name + ".so") or filename.startswith(lib_name + "-") ): return path return None 
 After that, FlashInfer correctly resolves the real libcudart instead of the TileLang stub.
 This is a local patch and obviously needs to be reapplied if the package gets replaced.
 Current launch configuration
 This is the configuration I ended up using:
 source ~/ds4x-venv/bin/activate MODEL="/home/blackbeard/models/DeepSeek-V4-Flash-0731" export CUDA_DEVICE_ORDER=PCI_BUS_ID export CUDA_VISIBLE_DEVICES=0 export LVLLM_MOE_NUMA_ENABLED=1 export LK_THREADS=12 export OMP_NUM_THREADS=12 export LK_THREAD_BINDING=CPU_CORE # Keep two complete routed MoE layers GPU-resident on the GPU. export LVLLM_GPU_RESIDENT_MOE_LAYERS=0,1 # CPU/hybrid prefill path for now. export LVLLM_GP
