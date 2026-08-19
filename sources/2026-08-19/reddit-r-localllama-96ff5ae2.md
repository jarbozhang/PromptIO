---
title: >-
  Running DeepSeek V4 Flash Q4_K_XL at ~100 tok/s prompt processing on 4× RTX
  3060 12GB
url: >-
  https://www.reddit.com/r/LocalLLaMA/comments/1vrqf4f/running_deepseek_v4_flash_q4_k_xl_at_100_toks/
source: Reddit r/LocalLLaMA
source_type: rss
language: en
published: '2026-08-18T14:15:29.000Z'
fetched_at: '2026-08-19T11:01:44.107Z'
---
I managed to run the 143–144 GiB DeepSeek-V4-Flash-0731 UD-Q4_K_XL GGUF on four RTX 3060 12GB cards while keeping a 360k–376k context window.
 Hardware:
 CPU: Intel Core i9-10920X, 12C/24T
 RAM: 128 GB DDR4-3200, quad-channel
 GPU: 4× NVIDIA RTX 3060 12GB
 Total VRAM: 48 GB
 Storage: NVMe SSD
 Engine: llama.cpp, build b10181
 Model: unsloth/DeepSeek-V4-Flash-0731-GGUF
 Quant: UD-Q4_K_XL, approximately 144 GiB
 KV cache: Q8_0
 The best high-speed configuration so far:
 llama-server \
 -m DeepSeek-V4-Flash-0731-UD-Q4_K_XL-00001-of-00005.gguf \
 -c 368640 \
 -ncmoe 34 \
 -ts 100,1,1,1 \
 -ot 'blk.(3[4-6]).ffn_.*_exps=CUDA1,blk.(3[7-9]).ffn_.*_exps=CUDA2,blk.(4[0-2]).ffn_.*_exps=CUDA3' \
 -ctk q8_0 \
 -ctv q8_0 \
 -b 2048 \
 -ub 2048 \
 -np 1 \
 -lm none \
 --threads 20 \
 --flash-attn on
 Measured with a roughly 20.5k-token prompt:
 Configured context: 368,640 tokens
 Prompt processing: 99.4 tok/s
 Text generation: 10.1 tok/s
 Minimum free VRAM under load:
 GPU0: 671 MiB
 GPU1: 842 MiB
 GPU2: 1395 MiB
 GPU3: 1395 MiB
 Model load time: approximately 198 seconds
 Other measured context/safety options:
 Context Prefill Decode Minimum free VRAM
 376832 99.5 t/s 10.4 t/s 611 MiB
 368640 99.4 t/s 10.1 t/s 671 MiB
 360448 99.4 t/s 10.1 t/s 735 MiB
 The interesting part is the GPU layout.
 -ncmoe 34 keeps the experts from blocks 0–33 in system RAM. The remaining nine expert layers are explicitly distributed across GPUs 1–3, three layers per GPU.
 The extreme -ts 100,1,1,1 split does not distribute those explicitly assigned expert weights. Instead, it pushes most non-expert tensors—attention, KV-related allocations, etc.—onto GPU0. That leaves enough space on GPUs 1–3 for the large expert layers.
 This was much better than trying to calculate the layout analytically. With -ncmoe and explicit -ot overrides, tensor placement is discrete and somewhat unintuitive, so I measured every candidate.
 Microbatch size was the biggest performance lever:
 -ub 1024: approximately 63.4 tok/s 
