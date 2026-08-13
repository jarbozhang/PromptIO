---
title: Meta's Muse Glimmer 30B now runs up to ~3.3x faster on Mac with mlx-dspark
url: >-
  https://www.reddit.com/r/LocalLLaMA/comments/1vmo2sp/metas_muse_glimmer_30b_now_runs_up_to_33x_faster/
source: Reddit r/LocalLLaMA
source_type: rss
language: en
published: '2026-08-12T19:29:19.000Z'
fetched_at: '2026-08-13T11:02:02.146Z'
---
Been tinkering with speculative decoding on Apple Silicon for a while, and this week I got Meta's new Muse Glimmer 30B working in my project mlx-dspark. On my M4 Pro, the 8-bit model goes from 8.2 tok/s to 18-26 tok/s depending on content. Math is the best case at 3.27x, code 2.5x, chat 2.22x. Output is byte-identical to normal decoding since the target verifies every token, so there's no quality tradeoff; it's just faster.
 Meta's own DFlash numbers on Mac are 1.5x (M4 Max) / 1.8x (M5 Max), but those are on the 4-bit build, so not really apples-to-apples. 4-bit for me is ~1.7x at ~25 tok/s and only needs ~18GB. The 8-bit run peaks around 40GB, so you want a 48GB Mac for it. Basically, you get 8-bit quality at 4-bit speed.
 Repo: github.com/ARahim3/mlx-dspark
 I'm happy to hear feedback, and I'm curious about what other M-series chips get.
    submitted by    /u/A-Rahim  
 [link]   [comments]
