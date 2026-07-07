---
title: >-
  Gepard : 0.6B streaming TTS built for real-time dialogue - 20× realtime
  factor, ~50ms time-to-first-audio, vLLM-native, Apache 2.0
url: >-
  https://www.reddit.com/r/LocalLLaMA/comments/1uq10cw/gepard_06b_streaming_tts_built_for_realtime/
source: Reddit r/LocalLLaMA
source_type: rss
language: en
published: '2026-07-07T16:59:30.000Z'
fetched_at: '2026-07-07T23:01:24.261Z'
---
We just open-sourced Gepard 1.0, a TTS model built for real-time conversation. It’s streaming-first: audio starts the moment text arrives, generated frame by frame instead of waiting for a full sentence.
 - ~555M params: Qwen3.5 0.8B backbone (14 layers) + Nemo NanoCodec (FSQ, 22.05kHz)
 - ~20 x RTF, ~50ms TTFA on one RTX 5090 via vLLM
 - Up to 256 parallel sequences on a single RTX Pro 6000 Balckwell with 96GB VRAM
 - Zero-shot voice cloning from a few seconds of reference
 - Languages: English (US/UK), Spanish (MX), Portuguese (BR), Dutch
 - Apache 2
 Benchmarks (Seed-TTS-eval): we put it head-to-head against VoxCPM2, Fish-S2, OmniVoice, Qwen3-TTS, Echo-TTS, and** **Chatterbox Turbo on identical texts.
 Gepard leads the field on perceived quality - top NISQA-MOS (4.25), and cleanest on noise, coloration, and discontinuity.
 Honest tradeoff: The streaming-first design costs us on speaker similarity (SIM 0.585) and WER (0.036), so it’s a strong fit where a natural realtime voice matters more than exact voice-matching.
 Links:
 Model
 HF space
 Inference
 vLLM serving (Cartesia compatible API)
 Training
 Also you can check how it works on vLLM on our website: https://www.nineninesix.ai
 Happy to answer questions on the architecture or the inference! 
    submitted by    /u/ylankgz  
 [link]   [comments]
