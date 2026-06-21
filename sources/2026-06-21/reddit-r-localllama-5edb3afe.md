---
title: Best Settings for 48GB VRAM + Qwen 3.6 27B
url: >-
  https://www.reddit.com/r/LocalLLaMA/comments/1uarvk4/best_settings_for_48gb_vram_qwen_36_27b/
source: Reddit r/LocalLLaMA
source_type: rss
language: en
published: '2026-06-20T09:07:22.000Z'
fetched_at: '2026-06-21T03:18:27.867Z'
---
Hey everyone, I've been running Qwen3.6 27B (Q8_0) across an RTX 4090 + RTX 3090 setup using llama.cpp with tensor split, and I wanted to share what's been working best for me so far. See if anyone has any better settings
 Hardware: RTX 4090 (24GB) + RTX 3090 (24GB), 48GB VRAM total
 OS Arch Linux (using igpu for display)
 Settings:
  
Quant: Q8_0
 Split mode: tensor
 Layers on GPU: -ngl 999
 Context: 250k (-c 250000)
 Speculative decoding: --spec-type draft-mtp --spec-draft-n-max 4
 parallel requests: -np 3
 Unified KV cache: -kvu
 Chat template: --chat-template-kwargs '{"preserve_thinking": true}'
 Flags: --no-mmap -fa on --jinja -fit off --no-op-offload
 Vision: mmproj-F16 with --no-mmproj-offload
  
This gives me 75-100t/s tg and 1500 pp 250k un quantized context + vision + MTP
    submitted by    /u/viperx7  
 [link]   [comments]
