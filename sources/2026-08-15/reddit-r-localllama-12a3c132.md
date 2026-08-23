---
title: Qwen3.8-27B is now up to ~3× faster on Apple Silicon with mlx-dspark
url: >-
  https://www.reddit.com/r/LocalLLaMA/comments/1vokrcy/qwen3827b_is_now_up_to_3_faster_on_apple_silicon/
source: Reddit r/LocalLLaMA
source_type: rss
language: en
published: '2026-08-14T21:54:36.000Z'
fetched_at: '2026-08-15T11:01:21.074Z'
---
mlx-dspark is an MLX port of DeepSeek's DSpark speculative-decoding drafters (the DeepSpec release), plus z-lab's DFlash, with one lossless verify loop. v0.10.0 adds Qwen3.8-27B via RadixArk's drafter, the first SpecForge/SGLang-packaged head it loads.
 Numbers (M4 Pro 48 GB, medians of 3, greedy, output ids identical to plain decoding):
  
8-bit target: 2.45× mean at the auto-picked cap — 3.00× math / 2.38× code / 1.96× chat, 8.3 → 20.3 tok/s (code runs hit 3.18×). Peak ~29 GB.
 4-bit target: 1.74× at 25.3 tok/s in ~18 GB (same drafter auto-resolves).
 Fun property: 8-bit + drafter (20-27 tok/s) beats plain 4-bit (14.6 tok/s) — 8-bit quality at better-than-4-bit speed.
  
"Lossless" is checked, not asserted: the target verifies every drafted token, and the Mac app's Race view runs speculative vs plain on the same prompt and diffs the token ids (video is that view).
 Everything is pip install mlx-dspark (OpenAI-compatible server + Anthropic Messages API, so it can back Claude Code with a local model), and there's a native Mac app (DMG/Homebrew).
 Repo: github.com/ARahim3/mlx-dspark
 I'd appreciate any feedback you might have after using it. 
    submitted by    /u/A-Rahim  
 [link]   [comments]
