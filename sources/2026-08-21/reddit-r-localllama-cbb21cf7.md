---
title: >-
  QwenMix-3.7: Kept seeing posts about Qwen3.8 and 3.6 sharing the same
  structure.. so I had Qwen3.8 combine them.
url: >-
  https://www.reddit.com/r/LocalLLaMA/comments/1vtozjq/qwenmix37_kept_seeing_posts_about_qwen38_and_36/
source: Reddit r/LocalLLaMA
source_type: rss
language: en
published: '2026-08-20T16:52:33.000Z'
fetched_at: '2026-08-21T11:01:41.850Z'
---
I chose to do this thing, not because it was hard, but because it was silly. Posts kept discussing how 3.8 and 3.6 were functionally the same, but based on training (3.8 does have seven new tokens!).. so I figured I'd see if they could be merged. They can.
 I used `Qwen3.8-27B-UD-Q6_K_XL.gguf` to combine the HF 3.8-27B and 3.6-27B ... and it sorta works!
 I have done NO testing beyond smoke test. scripts and idea are in replicate/ inside the model repo.
 Maybe this will prove useful to someone. Enjoy!
    submitted by    /u/bigattichouse  
 [link]   [comments]
