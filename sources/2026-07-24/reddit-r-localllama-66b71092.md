---
title: 'Running Qwen 3.6 35B MoE (Q4_K_M) on a Zeus (Xiaomi 12 Pro, 12GB RAM)'
url: >-
  https://www.reddit.com/r/LocalLLaMA/comments/1v4q5gm/running_qwen_36_35b_moe_q4_k_m_on_a_zeus_xiaomi/
source: Reddit r/LocalLLaMA
source_type: rss
language: en
published: '2026-07-23T20:44:40.000Z'
fetched_at: '2026-07-24T11:01:34.764Z'
---
Shoutout to this awesome guy - https://www.reddit.com/r/LLM/s/IDUyU3v9ap 
 Thanks to his project, BigMoeOnEdge https://github.com/Helldez/BigMoeOnEdge, I managed to successfully run a 35B MoE model on just 12GB of RAM! 
 My setup is a modified Xiaomi 12 Pro (12GB RAM) that I call "Zeus". https://www.reddit.com/r/LocalLLaMA/s/5zBUl15jd6
 There is a bottleneck, of course—the maximum context is currently limited to 8192 tokens due to RAM constraints—but it’s still absolutely mind-blowing to see a model this size running locally on an edge device. 
 I haven't tested the Image-to-Text (vision) capabilities yet, but I'm really hoping to get that working next. 
 Check out the video ! It's completely unedited and recorded in real-time so you can see the actual, raw generation speed.
 Also, here is stats in text: 
 generation: 107 tokens, 0.412 s/token (2.428 tok/s)
 compute: 88.1% CPU occupancy (1.4508 cpu-s/token over 4 threads), 51.93 major faults/token
 prefill: 24 tokens, 5.499 s (4.4 tok/s) | model load 14.421 s | TTFT 19.920 s
 moe-stream: read 14589.9 MiB (136.35 MiB/token), decode 0.412 s/token (compute 0.314 + cache mgmt 0.014 + flash I/O 0.382 s/token, 357 MiB/s)
 moe-cache: 70.8% hit, resident 2998.5 MiB
 moe-overlap: stall 0.084 s/token (flash reads overlapped with FFN compute)
    submitted by    /u/Aromatic_Ad_7557  
 [link]   [comments]
