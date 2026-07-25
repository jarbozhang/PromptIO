---
title: >-
  I released Inflect v2: two ultra-tiny complete TTS models under 4M and 10M
  parameters
url: >-
  https://www.reddit.com/r/LocalLLaMA/comments/1v5ve6v/i_released_inflect_v2_two_ultratiny_complete_tts/
source: Reddit r/LocalLLaMA
source_type: rss
language: en
published: '2026-07-25T02:17:28.000Z'
fetched_at: '2026-07-25T11:01:40.184Z'
---
I’ve spent the past month trying to find the point where an extremely small TTS model stops feeling like a size experiment and starts feeling genuinely useful.
 Today I’m releasing Inflect v2, with two complete local text-to-speech models:
  
Inflect-Nano-v2: 3.96M parameters, 15.97 MB FP32
 Inflect-Micro-v2: 9.36M parameters, 37.53 MB FP32
  
These are total inference parameter counts, not acoustic-model-only numbers. Text processing, timing prediction, speech generation, and the waveform decoder are all included.
 Text goes in. 24 kHz speech comes out. No external vocoder, hosted API, or second learned model required.
 Nano prioritizes the smallest possible footprint. Micro uses the additional capacity for better clarity, stability, and overall speech quality. Both run locally on CPU or CUDA through the same PyTorch API.
 Inflect-Nano-v2 is one of the smallest complete neural TTS models I know of that still produces genuinely usable speech. Even the 9.36M Micro model remains smaller than many systems described as “tiny.”
 For footprint context, Nano is approximately:
  
21× smaller than Kokoro
 126× smaller than Chatterbox
 over 1,000× smaller than Fish Audio S2 Pro
  
That is strictly a parameter-count comparison. These models have different capabilities, architectures, datasets, and intended uses. I’m not claiming that a 4M fixed-voice model replaces a multi-billion-parameter system. The interesting question is how much useful TTS can fit into such a small package.
 Some people here might remember Inflect-Nano-v1, the rough 4.63M experiment I released last month. V2 is a substantial rebuild, not just a longer training run. I focused on the problems v1 exposed: unstable timing, metallic output, weak prosody, poor generalization to difficult text, and an undersized waveform decoder.
 The resulting models performed surprisingly well:
  
Micro: 4.395 UTMOS22, 3.99% semantic WER, 6.28× real-time CPU inference
 Nano: 4.386 UTMOS22, 4.21% semantic WER, 10.72× real-time
