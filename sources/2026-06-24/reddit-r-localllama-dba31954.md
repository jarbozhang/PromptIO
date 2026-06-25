---
title: >-
  CPU-only TTS benchmark: Kokoro 82M vs Supertonic 3 vs Inflect-Nano-v1 (4.6M
  params), with UTMOS scoring on every sample
url: >-
  https://www.reddit.com/r/LocalLLaMA/comments/1udg3rf/cpuonly_tts_benchmark_kokoro_82m_vs_supertonic_3/
source: Reddit r/LocalLLaMA
source_type: rss
language: en
published: '2026-06-23T12:43:05.000Z'
fetched_at: '2026-06-24T01:27:25.847Z'
---
Ran three open-weight TTS models head to head on CPU. Intel Xeon, 4 cores, 15.6GB RAM, no GPU. Five configs, six text lengths from 12 to 1712 chars, 5 timed reps per cell after warmup, 150 timed runs total. Every audio output scored with UTMOS (utmos22_strong) so quality isn't just vibes.
 Headline (lower RTF = faster, higher MOS = more natural):
  
Inflect-Nano-v1: RTF 0.1376, MOS 3.48 (over-rated, see below)
 Supertonic-3 2-step: RTF 0.1781, MOS 1.53
 Supertonic-3 5-step: RTF 0.3164, MOS 4.37
 Kokoro-82M ONNX: RTF 0.5711, MOS 4.44
 Kokoro-82M PyTorch: RTF 0.7865, MOS 4.45
  
Stuff worth flagging:
  
The fastest config is Inflect-Nano at 7.3x real-time, with 4.6M params. That's wild on its own, but UTMOS over-rates it. By ear it's buzzy with a metallic vocoder texture and flat prosody. Known UTMOS failure mode where small HiFi-GAN vocoders get rewarded for being clean rather than natural.
 Inflect-Nano also has a hard ~15s output cap (max_frames=1400 in the acoustic model). It silently truncates anything longer, so its long-text RTF and throughput numbers are inflated since it isn't doing the full work. Fair comparison is only on inputs that fit inside the cap.
 Supertonic 2-step is right behind it for speed but sounds robotic (MOS 1.53). Don't ship it.
 Kokoro is the slowest of the three families by a wide margin, but it's the only thing that actually sounds human. Weirdly its RTF gets worse on longer text in both backends rather than amortizing down (PyTorch 0.60 to 0.99, ONNX 0.51 to 0.69).
 On this CPU, Kokoro ONNX is meaningfully faster than Kokoro PyTorch (0.5711 vs 0.7865) while sounding identical (MOS matches to two decimals). The PyTorch path tops out at barely faster than real-time.
 Supertonic 5-step is the practical sweet spot at MOS 4.37 and 3.2x real-time, if OpenRAIL-M works for you.
  
Full disclosure since people always ask: the benchmark was set up and run end-to-end by an AI coding agent we're building (Neo). All the code is in the repo.
 Repo an
