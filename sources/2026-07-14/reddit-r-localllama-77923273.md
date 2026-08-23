---
title: >-
  I got Gemma 4 running directly inside Godot using only GDScript and Vulkan
  compute shaders
url: >-
  https://www.reddit.com/r/LocalLLaMA/comments/1uv66by/i_got_gemma_4_running_directly_inside_godot_using/
source: Reddit r/LocalLLaMA
source_type: rss
language: en
published: '2026-07-13T09:01:46.000Z'
fetched_at: '2026-07-13T23:01:48.261Z'
---
I wanted to see if an LLM could run inside Godot without llama.cpp, Python, a server, or a GDExtension.
 It works. This Godot 4.7 project runs gemma-4-E2B-it-Q4_K_M.gguf locally. The model calculations run in Vulkan compute shaders, while GDScript handles GGUF loading, tokenization, sampling, the KV cache, and the chat UI.
 It is only an experiment. It supports this one model and is about 10× slower than llama.cpp with CUDA. Still, I found it interesting that this was possible using only Godot.
 Code: https://github.com/asallay/godot-llm
    submitted by    /u/toxicdog  
 [link]   [comments]
