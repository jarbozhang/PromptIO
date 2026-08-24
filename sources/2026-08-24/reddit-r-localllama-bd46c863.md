---
title: >-
  Qwen3.8-27B NVFP4 with vision + 451K token KV-cache on one RTX 5090 (power
  limited to 400W) at 120 tokens/s average
url: >-
  https://www.reddit.com/r/LocalLLaMA/comments/1vw5q47/qwen3827b_nvfp4_with_vision_451k_token_kvcache_on/
source: Reddit r/LocalLLaMA
source_type: rss
language: en
published: '2026-08-23T12:19:05.000Z'
fetched_at: '2026-08-24T11:01:49.506Z'
---
Hello,
 So I've been trying lots of combinations in that never-ending landscape of options and settings.
 I wanted a proper quant of 3.8 27B running as fast as possible on my 5090 at 400W, with vision and with as much KV-cache as possible and with concurrency enabled (aiming at 3 parallel sessions).
 tl;dr: I'm using this setup and it works very well, very fast and is accurate in coding sessions.
 ---
 vLLM is the obvious choice, even if not user-friendly at first, once it runs, it runs well.
 I tried fancy DSpark / DFlash2 but the cost in context size wasn't worth the marginal gains vs MTP=3.
 Here is a full NVFP4 setup (model and cache):
 Model: https://huggingface.co/gittensor-model-hub/Qwen3.8-27B-NVFP4-RTX5090
 Context: 196K per session / 451K global KV-cache (NVFP4)
 Speed: conservative average at 120 tps.
  
 prompt pp t/s ttfr (ms) tg64 t/s 
  
 4K 11,388 352 130 
  8K 10,475 765 150 
  16K 8,750 1,830 126 
  32K 6,790 4,714 131 
  64K 4,729 13,535 111 
  128K 2,932 43,661 107 
  185K 2,194 84,306 112 
 
 (tests from llama-benchy 0.4.0)
 Full write-up with how to setup vLLM and every gotchas: https://gist.github.com/co-l/c2aeaf40b53fcacfe9dd3293be75f23a (+ more benchmarks, including a real coding session, in line with numbers above).
 Note: env is Linux (Bazzite of all distros lol), with UI deactivated to allow 0.98 mem use.
    submitted by    /u/t4a8945  
 [link]   [comments]
