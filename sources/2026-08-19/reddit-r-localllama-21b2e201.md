---
title: I tested DFlash2 for Qwen3.8 27B on a 5090
url: >-
  https://www.reddit.com/r/LocalLLaMA/comments/1vs43av/i_tested_dflash2_for_qwen38_27b_on_a_5090/
source: Reddit r/LocalLLaMA
source_type: rss
language: en
published: '2026-08-18T22:26:53.000Z'
fetched_at: '2026-08-19T11:01:44.119Z'
---
Here's the DFlash2 announcement, and I was pretty excited for this after trying out DSpark on llama.cpp a few days ago and being somewhat disappointed that it wasn't really working. Anyways, I spent a while setting it up (you need to rebuild llama.cpp with pr #27342). Here's my config:
 -hf bartowski/Qwen3.8-27B-GGUF:Q5_K_L \ -hfd incoai/Qwen3.8-27B-DFlash2-GGUF:Q4_K_M \ --no-mmproj \ --spec-type draft-dflash \ --spec-draft-n-max 7 \ --host 0.0.0.0 \ --port 8080 \ --alias qwen3.8-27b \ -ngl 99 \ -fa on \ --ctx-size 160000 \ --cache-type-k q8_0 \ --cache-type-v q8_0 \ --batch-size 2048 \ --ubatch-size 1024 \ -np 2 \ --kv-unified \ --no-context-shift \ --temp 0.8 \ --top-p 0.95 \ --top-k 20 \ --min-p 0.0 
 It does seem to work pretty well, with slightly larger speedups compared to MTP on predictable generation (code). Before, I think I was getting ~140tk/s on average with MTP when the model was generating code, and ~100tk/s otherwise.
 With DFlash2, Qwen3.8 27B can hit ~200 tk/s for short bursts on long code generation blocks, but on thinking it seems to have lower tk/s at ~80-90. On average a full one shot code generation request seems to average around 120tk/s (reasoning disabled, so the generation is 95% code, so basically best case scenario). It's a good improvement from MTP, but I still got better results with DFlash on Qwen3.6 27B.
 DFlash2 does seem to be quite memory hungry though, I had to drop down from 220k context down to 160k (could prob fit ~180k tbh) compared to using MTP. Might not be worth using for me personally at the moment unfortunately. If anyone is getting better results, I would love to see your configs!
    submitted by    /u/Hefty_Wolverine_553  
 [link]   [comments]
