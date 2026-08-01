---
title: >-
  [audio.cpp] Release 0.5: DramaBox expressive TTS, Confucius4 cross-lingual
  voice transfer, plus 7 more models and ROCm/HIP
url: >-
  https://www.reddit.com/r/LocalLLaMA/comments/1vc8lpl/audiocpp_release_05_dramabox_expressive_tts/
source: Reddit r/LocalLLaMA
source_type: rss
language: en
published: '2026-08-01T00:43:57.000Z'
fetched_at: '2026-08-01T11:01:18.098Z'
---
audio.cpp 0.5 is out :)
 The most fun new model in 0.5 is DramaBox. It is closer to prompt-directed voice acting. DramaBox is built on the LTX-2.3 audio architecture, and prompts can control emotion, delivery, laughs, sighs, pauses, transitions, and speaker behavior.
 Example input (check the audio in the post):
 A nervous young man whispers, "I do not think we should be here."
 He takes a shaky breath. "Did you hear that?"
 The hallway answers with a slow metallic creak.
 He tries to laugh, but his voice breaks. "Okay. That was probably just the wind."
 Another sound comes from behind the locked door, softer this time, almost like someone breathing.
 He steps back. "No. No, we are leaving now."
 Then, from the darkness, a small voice whispers her name.
 Confucius4-TTS is the other big voice highlight: cross-lingual voice transfer. Give it a reference voice, then synthesize in another supported language.
 This release also added RVC for voice conversion, BS-RoFormer for vocal separation, GLM-TTS, Kroko ASR, Parakeet-TDT, Inflect Micro v2 (tiny but powerful), and Fun-ASR-Nano. Fun-ASR-Nano is especially exciting because it comes from the official FunASR team, and audio.cpp is now listed on the official FunASR deployment platform.
 The platform story got wider too. Early HIP/ROCm support landed for AMD GPUs, Metal got faster on Apple Silicon, and the server/streaming paths became more useful for real applications with live PCM ingest and cleaner streaming transcript deltas.
 None of this would be possible without contributions from our community. Contributors are showing up with new ports, backend tests, bug reports, docs, Web UI work, and production deployment feedback.
 A few areas where community help would be especially valuable:
 Scoped model performance optimization:
 Some early model integrations were built parity-first and received less optimization work. Non-CUDA backends are also less optimized and need more focused performance work. As the number of models 
