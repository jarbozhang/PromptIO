---
title: >-
  [audio.cpp] What Does the Fox Say: 4 ASR models (Nemotron 3.5 ASR, Higgs Audio
  STT, VibeVoice ASR, and Hviske ASR) in native C++/GGML, init streaming
  support, and 327s of audio transcribed in 2.17s.
url: >-
  https://www.reddit.com/r/LocalLLaMA/comments/1urd4ln/audiocpp_what_does_the_fox_say_4_asr_models/
source: Reddit r/LocalLLaMA
source_type: rss
language: en
published: '2026-07-09T02:17:39.000Z'
fetched_at: '2026-07-09T23:01:04.804Z'
---
I just pushed a new audio.cpp update with streaming support and 4 ASR/STT models: Nemotron 3.5 ASR, Higgs Audio STT, VibeVoice ASR, and Hviske ASR (da only). Overall 1.07x to 2.41x faster than Python.
 I decided to drop Parakeet-TDT since good implementations already exist, and I find the Nemotron model more interesting.
 Streaming support is also starting to land in audio.cpp.
 Right now, I added initial streaming support for two models that naturally fit streaming usage: Nemotron ASR and VoxCPM2. Nemotron ASR can stream recognition results through SSE, and VoxCPM2 can receive text incrementally and return generated audio chunks. I also experimented with streaming support for Higgs Audio STT, though I still treat that path as more experimental because the model/reference behavior is less straightforward.
 There is still a lot to improve. The current work is only the first step toward proper model-level and server-level streaming support. Contributions are very welcome, especially around better streaming APIs, chunk scheduling, lower TTFT, server behavior, and adding streaming paths for more models.
 The headline result: Nemotron ASR transcribed a 327.6s audio file in 2.17s offline on RTX5090 with 3.18% WER, and the streaming SSE path produced the same WER with 307ms TTFT and much lower peak VRAM. VibeVoice ASR gave the lowest WER on this test, but it is much heavier. Nemotron is the most interesting result to me because the speed/VRAM tradeoff looks very strong, especially for local ASR service usage.
 ASR models (No Quant):
  
 Model Mode Dur. TTFT Wall RTF WER VRAM 
  
 Nemotron Offline 327.6s N/A 2.17s 0.0066 3.18% 8294M 
  Nemotron SSE 327.6s 308ms 11.62s N/A 3.18% 4382M 
  Nemotron SSE 1-shot 1800s N/A 53.66s 0.0298 3.45% 4167M 
  Higgs STT Offline 327.6s N/A 11.17s 0.0341 3.95% 12519M 
  Higgs STT SSE 327.6s 468ms 14.46s N/A 3.95% 6945M 
  VibeVoice Offline 327.6s N/A 19.24s 0.0587 0.66% 25833M 
  VibeVoice Offline 1800s N/A 123.72s 0.0687 1.51% 31209M 
 
 St
