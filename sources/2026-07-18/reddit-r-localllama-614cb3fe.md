---
title: >-
  GPT-OSS-120B, Qwen 30B and Gemma 26B on an Android phone at 1-5 tok/s: +60GB
  model, 11GB of RAM, CPU only
url: >-
  https://www.reddit.com/r/LocalLLaMA/comments/1uz5n2j/gptoss120b_qwen_30b_and_gemma_26b_on_an_android/
source: Reddit r/LocalLLaMA
source_type: rss
language: en
published: '2026-07-17T17:05:37.000Z'
fetched_at: '2026-07-17T23:00:59.687Z'
---
This is a OnePlus 15R with about 11GB of usable RAM. The heaviest model is gpt-oss-120b, Q4_K_M, 60GB on disk. So it's roughly 5x bigger than the memory it's running in, which means keeping it resident isn't a matter of tuning, it just can't happen.
 It runs anyway: 1.3 tok/s at the model's own routing width (default experts, over adb).
 The clip is a touch faster, ~1.8, because it's on fewer experts; same for the Qwen and Gemma clips, 6 per layer instead of 8. All the modes are on GitHub.
 For reference a plain mmap load of the same file gets 0.089, so the streaming is buying about 14x.
 No GPU, no NPU, none of that. Four CPU cores and the phone's flash.
 The idea itself is old and kind of boring: a MoE layer has a pile of experts but each token only uses a few (gpt-oss picks 4 of 128 per layer). So I keep the always-needed weights in memory and read just the experts a token asks for, straight off flash with O_DIRECT, right before that layer runs. The hot ones stay in a small cache, and reads happen while the CPU is busy with the previous layer.
 Honestly the 120B thing is the part that gets attention, but two other things matter more to me.
 First, the output is exactly the same as running the model fully in RAM. Not "basically the same", identical, and there's a test in CI that checks streamed vs resident token by token and fails if they ever diverge. The streaming only changes when a weight shows up, never the math. (There is one optional knob that drops experts to go faster, gets you 2.2 tok/s on GPT, but it does change what the model computes, so I keep it clearly marked)
 Second, it's plain llama.cpp underneath. Not a fork, I never touch their code. It all goes through the public callback and gguf APIs, and llama.cpp is just a submodule, so keeping up with upstream is a version bump instead of a merge fight. Adding a new MoE model is one line in a registry because the expert sizes get read out of the file at load, and I get every quant format for free, MXFP4 
