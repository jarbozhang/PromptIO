---
title: >-
  [audio.cpp] The Sound of GGML — C++/GGML native ACE-Step, Stable Audio,
  HeartMuLa, RoFormer, HTDemucs released. 10-Minute Music in 60 Seconds!
url: >-
  https://www.reddit.com/r/LocalLLaMA/comments/1um2tbf/audiocpp_the_sound_of_ggml_cggml_native_acestep/
source: Reddit r/LocalLLaMA
source_type: rss
language: en
published: '2026-07-03T03:12:14.000Z'
fetched_at: '2026-07-03T23:01:09.837Z'
---
https://preview.redd.it/yxa9dlzquxah1.png?width=2000&format=png&auto=webp&s=b07c74b8832b26b46531e2fddba19fd2437ce4c6
 I just released a big music/audio expansion in audio.cpp.
 This batch adds music generation, SFX generation, and source separation to the released framework surface:
 Newly released: - ACE-Step 1.5 Turbo / Base - HeartMuLa - Stable Audio 3 Small Music / SFX - Stable Audio 3 Medium - Mel-Band RoFormer - HTDemucs 
 Bonus: HeartMuLa is no longer capped at the old short limit. It can now generate around 10 minutes of audio in one run.
 Current framework progress: 21 / 28 (75%)
 This is no longer just “TTS in C++.” audio.cpp release can now cover speech, voice, ASR/VAD/diarization, voice conversion, music/SFX generation, and source separation through the same native C++/ggml framework path.
 ACE-Step Turbo, 600s music generation audio.cpp: 60.16s wall time, RTF 0.100, 9.97x real-time Python: 88.52s wall time, RTF 0.148, 6.78x real-time 
 Not everything is magically faster yet. HTDemucs is currently slower than the Python path in my test, and Stable Audio warm runs are mixed. I’m not trying to hide that. The current release is about getting the end-to-end paths into the shared framework first, then tightening backend-specific performance.
 There is a mem_saver mode for long-lived/server-style usage for these models. It does not always reduce the absolute peak during inference, but it can reduce resident VRAM after the run without hurting speed much.
 Repo: https://github.com/0xShug0/audio.cpp
 I’d love feedback from people trying these on different GPUs/CPUs, especially long generations, weird prompts, stem separation quality, backend issues, performance numbers, and anything that breaks.
    submitted by    /u/Acceptable-Cycle4645  
 [link]   [comments]
