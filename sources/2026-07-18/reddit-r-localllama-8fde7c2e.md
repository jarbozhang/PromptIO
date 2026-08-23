---
title: Trellis.cpp now produces high quality assets
url: >-
  https://www.reddit.com/r/LocalLLaMA/comments/1uyw64s/trelliscpp_now_produces_high_quality_assets/
source: Reddit r/LocalLLaMA
source_type: rss
language: en
published: '2026-07-17T10:45:57.000Z'
fetched_at: '2026-07-17T23:00:59.684Z'
---
Some of you might remember that I posted some time ago about the GGML-ported asset production pipeline. A key elelent of that was the TRELLIS.2 port that performs image-to-3D generation.
 Well, I'm happy to report that after a grueling debugging session (thanks to https://www.reddit.com/user/Iajah/ ) I've managed to fix quite a few bugs and the asset quality is now on par with the reference. This means that top open source 3D generation quality is now available to everyone with a good enough GPU (or for people patient enough to grind it out on the CPU), even without CUDA :)
 Raw engine is at http://github.com/pwilkin/trellis.cpp, you can also use this with Lemonade for an integrated experience (and optional text-to-3D cascade).
    submitted by    /u/ilintar  
 [link]   [comments]
