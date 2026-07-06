---
title: >-
  Kyutai's Pocket TTS clones a voice from 5 seconds of audio, on CPU, under MIT.
  Benchmarked against Kokoro, Supertonic, and Inflect-Nano for Eng. TTS
url: >-
  https://www.reddit.com/r/LocalLLaMA/comments/1up07mk/kyutais_pocket_tts_clones_a_voice_from_5_seconds/
source: Reddit r/LocalLLaMA
source_type: rss
language: en
published: '2026-07-06T15:14:18.000Z'
fetched_at: '2026-07-06T23:01:08.255Z'
---
Kyutai dropped Pocket TTS a bit ago and I've been sitting on it for a benchmark. Finally ran it head to head against the three CPU TTS models that have been getting attention (Kokoro 82M, Supertonic 3, Inflect-Nano-v1). 180 timed runs, 36 audio samples, objective MOS scores via UTMOS.
 Short version: Pocket TTS is the slowest of the six configs I tested, and it's still the most interesting model in the field. Here's why.
 What Pocket TTS actually is:
 It's a ~100M param streaming language model that generates audio tokens over Kyutai's Mimi neural codec, then decodes to 24kHz. So instead of the usual acoustic-model-plus-vocoder setup, it's more like an autoregressive LLM but for audio. Token by token.
 Two consequences of that architecture:
  
Latency is dead flat across text lengths. Its RTF is 0.69 to 0.76 whether you feed it 12 chars or 1712 chars. No fixed overhead to amortize. Compare with Kokoro PyTorch which climbs from 0.49 on tiny text to 0.83 on long text.
 It streams. Which matters if you're building anything interactive.
  
Zero-shot voice cloning from 5 seconds. On CPU.
 This is the headline feature. Hand it a 5-second reference clip of any voice and it speaks in that voice. Accent, timbre, pacing, even the mic character of the reference. No fine-tuning. No GPU. MIT license.
 None of the other CPU-friendly models can do this at all. Kokoro and Inflect-Nano ship fixed voice sets, Supertonic same. If you want a user-supplied voice on a CPU box, Pocket TTS is currently in a category of one.
 I ran the benchmark with Pocket TTS pinned to a preset voice (alba) for a fair speed/quality comparison. The cloning capability isn't in the numbers below because you can't benchmark it against models that don't have it.
 Full results:
  
 Config Mean RTF UTMOS MOS Params License 
  
 Supertonic 3 (2-step) 0.121 1.53 ~99M OpenRAIL-M 
  Inflect-Nano-v1 0.145 3.48* 4.6M Apache 2.0 
  Supertonic 3 (5-step) 0.240 4.32 ~99M OpenRAIL-M 
  Kokoro 82M (ONNX) 0.641 4.44 82M Apa
