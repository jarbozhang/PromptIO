---
title: >-
  Interactive Jacobian-Lens visualizer and live steerer for GGUF models on
  llama.cpp
url: >-
  https://www.reddit.com/r/LocalLLaMA/comments/1uu32z6/interactive_jacobianlens_visualizer_and_live/
source: Reddit r/LocalLLaMA
source_type: rss
language: en
published: '2026-07-12T02:37:07.000Z'
fetched_at: '2026-07-12T23:01:41.972Z'
---
I saw a lot of (complete and abortive) jacobian lens projects for HF and PyTorch, but nothing for GGUFs or llama.cpp. So I set Fable 5 on xhigh to solve this problem (with close human supervision of course 😎). Inspired by Anthropic's paper and code, and of course by my favorite inference engine llama.cpp and GGML.
 I did a code review and a few test passes on it.
 It has a native GGUF server (based closely on llama.cpp and git synced to it) for model observation AND j-space swapping/abliteration/steering. It can also observe running llama-server models (but not steer them). Works with dense and MoE GGUFs.
 Memory requirements for the lens do scale with model size at roughly 1/8, so for example something in the 160 GB size (e.g Qwen3.5-397B UD-Q3_K_XL) will need an additional 20 GB of RAM for the lens.
 https://github.com/igorbarshteyn/jlens-gguf
 Anthropic's press release and paper: https://www.anthropic.com/research/global-workspace
 Anthropic's code: https://github.com/anthropics/jacobian-lens
 Matthew Berman's explainer vid for those who don't have time to read Anthropic's stuff: https://youtu.be/bjHuGNo3spk
 Enjoy and have fun!
    submitted by    /u/Responsible_Fig_1271  
 [link]   [comments]
