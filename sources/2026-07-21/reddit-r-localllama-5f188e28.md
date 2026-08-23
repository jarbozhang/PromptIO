---
title: Unsloth now supports AMD!
url: 'https://www.reddit.com/r/LocalLLaMA/comments/1v1nor4/unsloth_now_supports_amd/'
source: Reddit r/LocalLLaMA
source_type: rss
language: en
published: '2026-07-20T14:48:52.000Z'
fetched_at: '2026-07-20T23:00:57.688Z'
---
Hey r/LocalLLaMA folks! Unsloth now officially supports AMD hardware for local inference, fine-tuning, reinforcement learning, and deployment! It's been in the works for quite some time, but it works on Windows, Linux & WSL devices (+ technically Mac) with AMD GPUs!
 Unsloth Studio is fully open source and free, and supports:
  
Radeon RX 9000 and 7000 series
 Instinct MI350 and MI300 GPUs
 Strix Halo / Ryzen AI Max systems
 AMD CPUs for GPU-free inference
  
You can train models with up to 70% less VRAM, run reinforcement learning with up to 80% less VRAM, and use optimized ROCm, Triton, bitsandbytes, PyTorch, and llama.cpp builds - all installed automatically.
 Linux, WSL, and macOS:
 curl -fsSL https://unsloth.ai/install.sh | sh 
 Windows PowerShell:
 irm https://unsloth.ai/install.ps1 | iex 
 Unsloth supports inference and training for nearly all models, including Qwen, Gemma, DeepSeek, GLM, Kimi, MiniMax, and DiffusionGemma.
 You can also:
  
Export models as GGUF, safetensors, or LoRA adapters
 Connect local models to Claude Code, Codex, Hermes Agent, OpenClaw, Pi, OpenCode!
 Track RAM and VRAM usage during training - remotely and locally
 Access Unsloth remotely through secure Cloudflare HTTPS tunneling - like a "LM Link"!
 Update with daily AMD-optimized llama.cpp ROCm prebuilts to reduce compilation time!
  
For plain pip installation:
 uv pip install "unsloth[amd]" 
 Huge thanks to the AMD team for collaborating with us on this release! Let us know what AMD hardware you’re using and share any feedback - we'll try to make AMD much better!
 More details on the release blog: https://unsloth.ai/docs/basics/amd
    submitted by    /u/danielhanchen  
 [link]   [comments]
