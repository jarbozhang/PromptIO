---
title: >-
  [audio.cpp] VibeVoice 1.5B released — 90-min podcast in 22.95 min, 4.08x
  real-time, 2.86x faster than Python without quantization. Native C++/ggml
url: >-
  https://www.reddit.com/r/LocalLLaMA/comments/1uk7khq/audiocpp_vibevoice_15b_released_90min_podcast_in/
source: Reddit r/LocalLLaMA
source_type: rss
language: en
published: '2026-07-01T01:15:48.000Z'
fetched_at: '2026-07-01T23:02:00.943Z'
---
I’m the author of audio.cpp, a C++/ggml runtime for local audio models.
 I just added VibeVoice 1.5B support and wanted to share the benchmark because long-form multi-speaker TTS is a good stress test for local inference runtimes.
 Result on RTX 5090:
 VibeVoice 1.5B
 Audio length: 5615.73s / 93.60 min
 Wall time: 1376.84s / 22.95 min
 RTF: 0.245
 Speed: 4.08x faster than real time
 Python baseline: 92.66 min audio in 65.70 min
 Speedup vs baseline: 2.86x
 Quantization: none
 Diffusion steps: 10
 The main point is not just avoiding Python setup pain, though that is part of it. The goal is to make audio models practical in a native local runtime: reusable sessions, server-like usage, long-form generation, stable memory behavior, and CUDA-focused (CPU and Metal later) optimization.
 VibeVoice is a useful milestone because it is not just short-sentence TTS. It is designed for long-form, multi-speaker dialogue such as podcasts, character chats, and narration, where runtime behavior matters a lot.
 Current framework progress:
 Released model families: 16 / 28 [███████████░░░░░░░░░] 57% 
 The other model families are already running end-to-end internally, but I’m releasing them gradually after testing and cleanup.
 The repo is https://github.com/0xShug0/audio.cpp
 I’d be interested in feedback from people testing VibeVoice on other GPUs or CPUs, especially long prompts, multi-speaker formatting, VRAM behavior, and performance numbers.
    submitted by    /u/Acceptable-Cycle4645  
 [link]   [comments]
