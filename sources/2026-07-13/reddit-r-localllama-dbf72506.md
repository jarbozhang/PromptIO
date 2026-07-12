---
title: >-
  Zer0Fit: I took Google's new TabFM & TimesFM ML foundation models and made
  them available as an MCP server for zero-shot ML tasks (forecasts /
  classifications / regressions). 100% local.
url: >-
  https://www.reddit.com/r/LocalLLaMA/comments/1uudxi8/zer0fit_i_took_googles_new_tabfm_timesfm_ml/
source: Reddit r/LocalLLaMA
source_type: rss
language: en
published: '2026-07-12T12:18:28.000Z'
fetched_at: '2026-07-12T23:01:41.978Z'
---
TL:DR: I’m a grad student in AI. I saw that Google released TabFM and TimesFM last week. I built an MCP wrapper to serve both transformer models in a single Docker container so you can connect their new ML transformer models to a local LLM via Open WebUI, Claude Code, or Codex and do ML tasks that would have previously required building, training, and tuning ML models to do. Tested with classic ML datasets (Iris, California Housing, etc), Pretty solid scores for accuracy for being zero-shot: (94.7% for Iris and R2 of 0.87 for regression test) vs. traditionally tuned ML models. You need about 16GB of VRAM to run both models. I added dynamic model load and unload with a TTL set to 5 mins. CSV. support now, with XLS, XLSX, JSON, JSONL support soon. PyTorch-based so CUDA only. Works on DGX Spark, 3090, H100 and most anything Nvidia with 16GB+ VRAM. Install script auto detects architecture. 
 Here is my repo if you want to try out the MCP:
 https://github.com/porespellar/Zer0Fit
 Here’s the non-TLDR version:
 I’m working on my Masters in AI and I saw someone’s post here the other day about Google’s new TabFM Tabular data foundational transformer models released last week and I thought that they were super groundbreaking in that they were basically bringing ML models into the GenAI space which is both weird and cool because ML models are very different animals than LLMs
 Here was the original Google blog post on it:
 https://research.google/blog/introducing-tabfm-a-zero-shot-foundation-model-for-tabular-data/
 Anyways, I wanted to play around with these new models from a chat interface and try to “kick the tires” a bit, so I built an MCP implementation for both the TabFM and TimesFM models. Nothing super fancy, just a quick and dirty MCP wrapper of the PyTorch versions (this will only run on CUDA). 
 I made the MCP with 2 build targets in mind: DGX Spark (arm-based with CUDA 13) and 3090 (AMD64 with CUDA 12.6). No Mac support because of Google using PyTorch, sorry. 
 I al
