---
title: Running a 13M ASR conformer on a microcontroller
url: >-
  https://www.reddit.com/r/LocalLLaMA/comments/1v1pume/running_a_13m_asr_conformer_on_a_microcontroller/
source: Reddit r/LocalLLaMA
source_type: rss
language: en
published: '2026-07-20T16:09:37.000Z'
fetched_at: '2026-07-20T23:00:57.694Z'
---
Hello everyone, I wanted to share a recent project of mine, which brings a 13.1 million parameter convolution transformer model to a < $10 microcontroller (more specifically, the ESP32-S3). It's a distilled and quantized version of nvidias small conformer model from huggingface. 
 Thanks to quantization, this model now fits into 14mb of flash memory and it now sits at 256kb of SRAM as well as 4mb of PSRAM to transcribe 8 seconds of audio.
 The speed is still painfully slow. It is lightning fast compared to my initial attempt however, which took 10 minutes of inference time to transcribe 5 seconds of audio.
 I also gave the whisper tiny model a shot, but that one was upwards of 50 minutes for 5 seconds of audio so I didn't really bother to further optimize it.
 This microcontroller possesses hardware acceleration for 8-bit math, so not everything is terrible for ML on this platform. The distillation and quantization procedure increased the word error rate by about 3% across the huggingface ASR benchmark datasets (see the readme on github for the full evaluation).
 I wish there was more research on LLM efficiency instead of rooting for the number one spot on some benchmark at the cost of like a quantillion model parameters. Getting models on affordable hardware keeps the hobby accessible.
    submitted by    /u/wunschpunsch3D  
 [link]   [comments]
