---
title: 2× Radeon R9700 — Qwen 3.6 27B Q8 MTP on llama.cpp
url: >-
  https://www.reddit.com/r/LocalLLaMA/comments/1ubrn1a/2_radeon_r9700_qwen_36_27b_q8_mtp_on_llamacpp/
source: Reddit r/LocalLLaMA
source_type: rss
language: en
published: '2026-06-21T14:35:44.000Z'
fetched_at: '2026-06-22T04:12:20.731Z'
---
There isn't much information around about multi-GPU setups with the R9700, so I'm writing this up in case it helps anyone in the same situation. Here's my setup, the tests I ran, and the numbers from the server logs.
 Setup
  
ThinkStation P7, Xeon w7-3455, 128 GB RDIMM
 2× Gigabyte Radeon AI PRO R9700 32 GB (64 GB VRAM total)
 Ubuntu 24.04 LTS, Docker 29.5.3, containers managed with Komodo (komo.do)
 ROCm 7.2.1
 Image: llamacpp-rocm:gfx1201
 Model: unsloth/Qwen3.6-27B-MTP-GGUF/Qwen3.6-27B-Q8_0.gguf, context 131072
  
Tests
  
Code generation from a Markdown spec: scaffolding the same app in Python, Go and PHP.
 Long-text processing: 2,000–3,000 line inputs (medical texts, Cisco manuals, literature) for translation, reformatting and correction.
 Memory check: summarizing a long mixed session to see whether it kept the topics coherent and could recall earlier ones.
  
Decode (token generation)
  
 Context filled Decode (t/s) MTP draft acceptance 
  
 ~3–6k 46–61 0.36–0.54 
  ~10–13k 64–67 0.60–0.61 
  ~17k ~59 0.54 
  ~33k ~49 0.45 
  ~96k ~40 0.42 
  ~102k ~44 0.50 
  ~125k ~45 — 
 
 Prefill throughput
  
 Prompt size Throughput 
  
 <10k ~1,200–1,500 t/s 
  ~30k ~1,175 t/s 
  ~63k ~617 t/s 
  ~100k+ ~410–435 t/s 
 
 MTP draft acceptance: 0.33–0.61 across all runs.
 --spec-draft-n-max: still experimenting with this one. Lowering it improves the token generation rate at high contexts, so I'll keep testing different values.
 Prompt cache: the server keeps rolling KV checkpoints (up to 32, ~150–580 MiB each) and restores them in ~60–300 ms instead of reprocessing the full prompt when a new turn shares most of its prefix with a cached one.
 PCIe bandwidth (Intel PCM): under 200 MB/s each direction during decode; peaks of 5–7 GB/s during prefill.
 Compose
 yaml services: llamacpp-qwen36-27b: image: llamacpp-rocm:gfx1201 pull_policy: never container_name: llamacpp-qwen36-27b network_mode: host ipc: host privileged: true security_opt: - seccomp=unconfined group_add: - "44"
