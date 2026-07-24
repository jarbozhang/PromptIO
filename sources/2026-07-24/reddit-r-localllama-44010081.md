---
title: >-
  [audio.cpp] Release 0.4: Higgs Audio v3 TTS 4B (10x real time)+ Fish Audio S2
  Pro in C++/GGML, full GGUF loading, Q8 speed and VRAM gains
url: >-
  https://www.reddit.com/r/LocalLLaMA/comments/1v4w5cj/audiocpp_release_04_higgs_audio_v3_tts_4b_10x/
source: Reddit r/LocalLLaMA
source_type: rss
language: en
published: '2026-07-24T00:44:45.000Z'
fetched_at: '2026-07-24T11:01:34.763Z'
---
audio.cpp again :)
 Release 0.4 is out. The headline this time is new high-quality TTS coverage plus GGUF becoming a first-class across the project.
 What’s new:
  
Added Higgs Audio v3 TTS 4B, Fish Audio S2 Pro, Voxtral Realtime ASR and two community models OuteTTS TTS and VieNeu-TTS-v3
 
audio.cpp now support 35 model families.
 
All released model families now support GGUF.
 
 Ready-to-use GGUF packages are now available, and Q8 is starting to show real speed and memory wins on several routes. Check the figures. Long-lived session is multiple requests after warmup. Longform is one-shot 6000+ char text generation. Tested on RTX 5090.
 CUDA Q8 GGUF numbers from my current measurements:
  
Higgs Audio TTS: warmed requests run about 8.8x-10.1x faster than real time. Longform runs about 8.5x faster than real time.
 
Fish Audio S2 Pro: warmed requests run about 3.1x-3.4x faster than real time. Longform runs about 3.3x faster than real time. Plenty of room for improvement because the impl is a naively adaptation of framework template.
 
Voxtral ASR: offline runs about 15.7x faster than real time, with streaming TTFT around 171 ms.
 
 Compared with 16-bit GGUF, Q8 is not universally magic, but it is useful now. In the tested release paths, Q8 can be up to about 1.5x faster and reduce peak VRAM by up to about 37%, depending on the model and route. Quality is still model-specific, so I am keeping the GGUF support matrix and Q8 performance report visible instead of pretending every quant is safe everywhere.
 (Some tricks to further boost performance up to 2x for some mdoels like Qwen3-TTS: adjust chunk size and cut reference audio len.)
 audio.cpp now has a dedicated community models area for ports that are useful and runnable, even if they are still maturing. The review bar there is lighter than the core framework. If you have a model you'd like to bring to audio.cpp, try implementing it as a community model first using framework modules and patterns. 
 Huge thanks to the 
