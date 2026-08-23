---
title: Qwen 3.6 27B flags/settings in llama.cpp
url: >-
  https://www.reddit.com/r/LocalLLaMA/comments/1vida0h/qwen_36_27b_flagssettings_in_llamacpp/
source: Reddit r/LocalLLaMA
source_type: rss
language: en
published: '2026-08-07T21:25:24.000Z'
fetched_at: '2026-08-08T11:01:01.044Z'
---
I run the following on a 5090 and have been okay with its performance, it does most things somewhere 80-100 t/s, though that can slow down at full 262k context - more like 40 t/s at times. I use it primarily in appdev tasks. This just barely fits in the 5090, no vision, with very very little room to spare. 
 The batch sizes (-b / -ub) I had at a much different number initially, but bracketing my coding tests settled there for the best performance with the best output. I see that a lot of people have this much higher, but it didn't seem to help here. 
 Reasoning budget is another one that I have different than most people I see, I have it pretty high vs what people run that I've seen other places, but it seemed to be okay? It's hard to qualify this with evals but it seems to get lost more with lower values. 
 Honestly I haven't really gone deeply into all of the settings, because tokens go brrrr and I'm pretty happy. But I wanted to see: Do you set any of this shit to something else? If so: why, motherfucker, what are you doing with it? Spill the beans not the tokens. Fuck spez. 
 llama-server \ -m '/ai/models--unsloth--Qwen3.6-27B-MTP-GGUF/snapshots/5cb35eb3dcbf52dbce5f87dbc64df6aaffadcace/Qwen3.6-27B-Q6_K.gguf' \ -c 262144 \ -b 512 \ -ub 128 \ --gpu-layers all \ --spec-draft-ngl all \ --fit off \ --parallel 1 \ --flash-attn on \ --no-context-shift \ --cache-type-k q8_0 \ --cache-type-v q8_0 \ --spec-type draft-mtp \ --spec-draft-n-max 3 \ --spec-draft-p-min 0.2 \ --cache-ram 16384 \ --ctx-checkpoints 32 \ --checkpoint-min-step 8192 \ --jinja \ --reasoning on \ --reasoning-budget 16384 \ --no-reasoning-preserve \ --load-mode none \ --no-mmproj \ --alias 'unsloth/Qwen3.6-27B-MTP-GGUF' \ --metrics \ --perf \ --host 0.0.0.0 \ --port 1234 
    submitted by    /u/Gargle-Loaf-Spunk  
 [link]   [comments]
