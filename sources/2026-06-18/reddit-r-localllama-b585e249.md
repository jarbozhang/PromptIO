---
title: >-
  Lemonade v10.8: auto memory management, cloud offload, Omni improvements, and
  call your local models as MCP tools
url: >-
  https://www.reddit.com/r/LocalLLaMA/comments/1u8kes0/lemonade_v108_auto_memory_management_cloud/
source: Reddit r/LocalLLaMA
source_type: rss
language: en
published: '2026-06-17T19:42:29.000Z'
fetched_at: '2026-06-18T08:56:38.995Z'
---
v10.8 is out, so here's a project update on what landed. This was a 20-contributor release in just 7 days!
 Smarter memory and context management
 Dynamic VRAM management now auto-unloads idle models and downsizes their KV-cache to reclaim GPU memory on the fly, plus model pinning so the ones you want hot never get evicted. 
 Automatic context sizing means Lemonade picks the context length from your available memory and the model architecture instead of you tuning it by hand.
 Cloud offload, sitting next to your local models
 Sometimes you want a bigger model than your box can run. There's now a provider-agnostic offload backend so you can serve chat completions from any OpenAI-compatible provider (Fireworks, OpenRouter, Together, OpenAI) right alongside local models, and switch from the CLI or UI. Local-first, with cloud as an option, not a default. Eventually we want to enable applications to route between client and cloud based on their own routing policies.
 LMX-Omni image generation expansion 
 LMX-Omni now exposes controls like size, steps, etc. for image generation. You can also pull and share custom omni models straight from Hugging Face.
 An MCP gateway, so your local models become tools
 There's now an MCP gateway (POST /mcp) that exposes five tools: model listing, chat, audio transcription, image generation, and multimodal omni. Any MCP-aware host can call your local Lemonade models as tools instead of reaching for a cloud API.
 Lots of platform expansion
 The cross-vendor push continued across AMD, NVIDIA, and more: NVIDIA GB10 (Blackwell) arm64 CUDA, TheRock ROCm on Windows for Radeon RX GPUs, ROCm for the Radeon 840M/860M iGPUs, whisper.cpp moved to ROCm on Windows and Linux, a dedicated Debian 13 build, and a CDNA datacenter GPU detection fix.
 Also we just got this sick new chat CLI!
 Full release notes are on GitHub: https://github.com/lemonade-sdk/lemonade/releases/tag/v10.8.0
    submitted by    /u/jfowers_amd  
 [link]   [comments]
