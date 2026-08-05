---
title: >-
  Qwen3-TTS voice cloning is now in mainline llama.cpp — the old demo finally
  became real support
url: >-
  https://www.reddit.com/r/LocalLLaMA/comments/1vg0q6r/qwen3tts_voice_cloning_is_now_in_mainline/
source: Reddit r/LocalLLaMA
source_type: rss
language: en
published: '2026-08-05T07:47:51.000Z'
fetched_at: '2026-08-05T11:01:21.136Z'
---
People may remember the Qwen3-TTS llama.cpp demo from a few months ago. That PR said it probably wouldn’t be merged because llama.cpp was missing some of the graph and API pieces it needed.
 A new implementation was merged into master yesterday.
 What works now:
 - Qwen3-TTS-12Hz-1.7B-Base in GGUF
 - WAV or MP3 files as the speaker reference
 - English, Chinese, German, Italian, Spanish, French, Portuguese, Russian, Japanese and Korean
 - Audio generation through the llama-tts binary
 Example:
 llama-tts -hf ggml-org/Qwen3-TTS-12Hz-1.7B-Base-GGUF \
 -p "Hello, this is running locally." \
 --tts-lang en \
 --tts-speaker-file speaker.mp3 \
 --output out.wav
 Qwen describes the Base model as capable of cloning a voice from around three seconds of reference audio. I haven’t seen an independent test yet showing whether the llama.cpp version matches the original PyTorch implementation in voice similarity or stability.
 The interesting part is not that Qwen3-TTS can run locally. Dedicated C++ implementations already existed. It is that voice cloning is now part of mainline llama.cpp, which should make it much easier to add local speech output to projects already built around that runtime.
 There are still some important limitations:
 - The merged implementation currently uses llama-tts
 - The /tts server endpoint is still a draft PR
 - It only targets the 1.7B Base model, not CustomVoice or VoiceDesign
 - There are no proper comparisons yet against qwen3-tts.cpp or audio.cpp
 - The update includes a breaking change to the existing llama-tts binary
 The comparison I’d like to see is one identical three-second reference clip and one identical paragraph tested across CPU, Metal, CUDA and ROCm, with:
 - Real-time factor
 - Peak RAM and VRAM
 - Voice similarity
 - Long-form stability
 - Time until the first audio
 The specialized ports may still win on speed, while llama.cpp may win on portability and integration.
 Has anyone updated and tested it yet? M-series Mac and CPU-only
