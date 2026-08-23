---
title: DFlash makes Qwen3.6 27B 2.2x faster with no quality loss
url: >-
  https://www.reddit.com/r/LocalLLaMA/comments/1uyay0w/dflash_makes_qwen36_27b_22x_faster_with_no/
source: Reddit r/LocalLLaMA
source_type: rss
language: en
published: '2026-07-16T18:22:39.000Z'
fetched_at: '2026-07-16T23:01:10.318Z'
---
We ran the same Qwen3.6-27B locally three ways on one RTX 6000: baseline, MTP, DFlash. The tasks were: quicksort, write a Steam library in JSON, solve a logic puzzle and write a sci-fi story.
 Outputs:
 Baseline: 44 tok/s · 1.00x
 MTP: 65 tok/s · 1.45x · 71% accepted
 DFlash: 98 tok/s · 2.20x · 30% accepted
 DFlash drafts 15 tokens in a row, so it flies through repetitive or structured stuff where long runs actually stick, like JSON (152 tok/s, 3.4x). On creative text most of the guesses are wrong, so it wastes the work and can dip below baseline, 42 vs 44. MTP only guesses 3 in parallel from inside the model, so a wrong guess costs almost nothing and it never drops below baseline.
 All three have the same output. DFlash is therefore a great pick for stuff like coding, while MTP is better for chat or creative writing.
 Qwen 3.6 27B model : https://huggingface.co/Qwen/Qwen3.6-27B
 local ai models hosting app: Atomic.Chat (I'm from Atomic team, happy to hear your feedback) 
    submitted by    /u/ElmBark  
 [link]   [comments]
