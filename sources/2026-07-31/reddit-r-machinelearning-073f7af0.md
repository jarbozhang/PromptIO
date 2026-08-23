---
title: 'MLVC: Multi-platform Learned Video Codec for Real-World Deployment [P]'
url: >-
  https://www.reddit.com/r/MachineLearning/comments/1vb3xwd/mlvc_multiplatform_learned_video_codec_for/
source: Reddit r/MachineLearning
source_type: rss
language: en
published: '2026-07-30T19:40:56.000Z'
fetched_at: '2026-07-31T11:01:00.268Z'
---
I've always found it a little strange that AI is everywhere, but the codecs we use in practice are the traditional hand-engineered systems like h.264, h.265, av1. Alexnet started the wave of neural networks replacing hand-engineered systems, but 14 years later traditional codecs still dominate in the real world. What's going on?
 Compute and power efficiency are part of it. Neural codecs tend to be fairly large and power-hungry, while h.264/h.265/av1 have hardware acceleration almost everywhere, so they're cheap to run. NPUs seem like a good fit for neural codecs, though.
 But there's another big problem which is cross-platform compatibility. Say you encode a video on an Apple NPU and decode it on an Intel NPU. Small numerical differences can make the encoder and decoder disagree about the entropy model. Entropy decoding then breaks and the whole stream can fail.
 Simply quantizing the model and switching to integer math doesn't reliably fix this. In theory, fully specified fixed-point math could guarantee identical results. In practice, today's hardware and toolchains aren't standardized enough. On the Apple M3 Neural Engine, for example, the relevant INT8 operations are simulated using FP16 instead of running through a true INT8 path. Even on hardware with true INT8 support, you can't fully control details like rounding modes, accumulation data types, and scale multiplication, so bit-exact results still aren't guaranteed.
 MLVC gets around this by explicitly transmitting the entropy-model scale parameters through the hyperprior, so the neural network itself doesn't need to run bit-exactly across NPUs. Both encoding and decoding run at ~100 FPS for 360p/540p video on consumer NPUs. That combination brings us closer to learned video codecs you could actually deploy.
 Code
 Paper
 Disclosure: I'm one of the authors, happy to answer questions.
    submitted by    /u/tanelai  
 [link]   [comments]
