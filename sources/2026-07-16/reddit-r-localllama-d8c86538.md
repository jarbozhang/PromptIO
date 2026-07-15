---
title: >-
  [audio.cpp] 10 hours of audio generated in 3 minutes on RTX 5090 (demo
  included)! C++/GGML based Supertonic 3, MOSS-TTS, IndexTTS2, and Irodori-TTS
  released
url: >-
  https://www.reddit.com/r/LocalLLaMA/comments/1uwpvt9/audiocpp_10_hours_of_audio_generated_in_3_minutes/
source: Reddit r/LocalLLaMA
source_type: rss
language: en
published: '2026-07-15T00:06:35.000Z'
fetched_at: '2026-07-15T23:01:42.665Z'
---
audio.cpp again. Hopefully you are not sick of it yet :)
 Release 0.3 adds five new models: Supertonic 3, MOSS-TTS-Local, MOSS-TTS-Nano, IndexTTS2, and Irodori-TTS.
 The highlight is Supertonic 3. It can hit 200×+ real time on CUDA (RTX 5090), 6×+ on CPU, and around 47 ms TTFT in CUDA streaming mode. In the demo (sorry for the rough demo), I used The Adventures of Sherlock Holmes as the input and generated around 10 hours of audio in about 3 minutes on an RTX 5090.
 Supertonic 3 was also pretty fun to work on. The official implementation uses ONNX, so I had to reverse-engineer the inference path and rebuild it around the safetensors weights.
 The audio.cpp version is much faster than the Python implementation on CUDA, while CPU performance is about the same, maybe slightly faster.
 One reason for the big CUDA win is that the ONNX version sends some nodes back to the CPU, so it can’t fully use the GPU.
 The other models released in 0.3 range from roughly the same speed to more than 2× faster, depending on the test case. In IndexTTS2 longform test (6000-char input text + 2400-char emotion text), C++ is 5.65x faster than Python.
 GGUF support has been added and will be rolled out model by model.
 Contributions and feeback are very welcome. There’s still a lot to improve across model coverage, streaming, GGUF support, backend compatibility, performance, testing, and the server/UI layers.
 Repo: https://github.com/0xShug0/audio.cpp 
    submitted by    /u/Acceptable-Cycle4645  
 [link]   [comments]
