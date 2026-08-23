---
title: >-
  How fast can I get a voice assistant to respond without a GPU? Qwen3-ASR and
  Kokoro-TTS ONNX on CPU.
url: >-
  https://www.reddit.com/r/LocalLLaMA/comments/1usiino/how_fast_can_i_get_a_voice_assistant_to_respond/
source: Reddit r/LocalLLaMA
source_type: rss
language: en
published: '2026-07-10T09:19:56.000Z'
fetched_at: '2026-07-10T23:01:38.135Z'
---
Been testing out the ONNX models to see how far I can push the CPU to take on ASR and TTS, so the GPU is completely free for running the LLM.
 The video attached shows me testing latency on a 2022 Macbook M2 and an AMD Ryzen 9 7900. This is just running the regex fast commands, so most of the latency (apart from grabbing the spotify music) should be from the ASR and TTS.
 These ONNX models are really great. The M2 is mostly usable, the Ryzen 9 is blazing fast.
 The two models I am running are:
 Daumee/Qwen3-ASR-0.6B-ONNX-CPU onnx-community/Kokoro-82M-v1.0-ONNX 
 I have set a 5s follow-up time so I don't need to keep saying the wakeword. VAD picks up when I stop talking so the command shoots off to the regex.
 I'd be curious if anyone else can test this out on their systems. Putting the LLM in the middle opens up lots of possibilties:)
 All code is available here to anyone who wants to test: https://github.com/liampetti/fulloch
    submitted by    /u/liampetti  
 [link]   [comments]
