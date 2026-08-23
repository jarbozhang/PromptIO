---
title: Watch local LLMs escape the rooms you design
url: >-
  https://www.reddit.com/r/LocalLLaMA/comments/1ublvag/watch_local_llms_escape_the_rooms_you_design/
source: Reddit r/LocalLLaMA
source_type: rss
language: en
published: '2026-06-21T09:41:07.000Z'
fetched_at: '2026-06-22T04:12:20.732Z'
---
Hello!
 I'd like to share my repo for WATCH MY ESCAPE: https://github.com/cjami/watch-my-escape
 It's an inverted escape room game where you design the maps and LLMs have to try to escape them. 
 It uses traditional action verbs (e.g. push, pull, pick-up) to interact with the visible environment, just like classic adventure games.
 There are currently 5 model presets (downloads when running an escape with them):
  
Mellum 2
 Nemotron Nano 4B
 MiniCPM5 1B
 Tiny Aya
 Gemma 4 12B
  
All are at Q4_K_M so should fit in about 8GB of VRAM. Tested on a 4090, 3070 and a M1.
 You can easily configure it for any model on HF by changing values in the config file: https://github.com/cjami/watch-my-escape/blob/main/src/watch_my_escape/llm/config.py
 It features a fully kitted map editor as well so you can create whatever you want and test models on them. It is completely font-based so you can use whatever emojis are available to represent objects. Also supports import/export via JSON.
 The main technique used here is splitting the agent's action into two steps: 'Think then Act' - having a free reasoning step followed by a grammar constrained action step via llama.cpp. This allows us to use small models reliably within a game environment with structured output. 
 Note: they are not spatially reasoning, but just moving from one visible object to another (would overwhelm small models otherwise).
 Quick setup (need uv and node.js installed):
 git clone https://github.com/cjami/watch-my-escape.git cd watch-my-escape uv run watch-my-escape 
 It should then auto-detect and install the appropriate llama-cpp-python wheel for your hardware (metal, cuda, vulkan, cpu or rocm via override) during setup.
 This was created over a week for the 'Build Small' hackathon by Hugging Face x Gradio.
 Use it to try out different LLMs or make your own personal benchmarks!
 Hopefully this also provides a glimpse into how LLMs can be used in future games :)
    submitted by    /u/cjami  
 [link]   [comment
