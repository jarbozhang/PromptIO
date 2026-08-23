---
title: 'You can run Deepseek 4 flash on mac (M3 Max, 96gb)'
url: >-
  https://www.reddit.com/r/LocalLLaMA/comments/1u5mfaq/you_can_run_deepseek_4_flash_on_mac_m3_max_96gb/
source: Reddit r/LocalLLaMA
source_type: rss
language: en
published: '2026-06-14T14:20:57.000Z'
fetched_at: '2026-06-14T23:18:17.962Z'
---
I didn't know this was actually possible until today. Using https://github.com/antirez/ds4#running-models-larger-than-ram Antirez's specific engine + his specific ds4 gguf it literally just runs.
 You need to pass
 --ssd-streaming 
 When running if you have <128gb I think. Seems 64gb and up is reasonable. I also passed: 
 iogpu.wired_limit_mb=86016 
 To raise available metal allocation then you can patch the repo itself to increase cache safety which is .70 optionally to try and push how many experts get loaded into vram.
 Optionally I built a simple menu bar .app daemon so I can just spotlight > run the server. Just took like 20 minutes.
 0614 15:50:38 ds4-server: chat ctx=140..190:50 gen=50 decoding chunk=11.72 t/s avg=11.72 t/s 4.268s 0614 15:50:42 ds4-server: chat ctx=190..240:50 gen=100 decoding chunk=13.31 t/s avg=12.46 t/s 8.025s 0614 15:50:46 ds4-server: chat ctx=240..290:50 gen=150 decoding chunk=12.88 t/s avg=12.60 t/s 11.907s 0614 15:50:46 ds4-server: chat ctx=290..300:10 gen=160 decoding chunk=13.53 t/s avg=12.65 t/s 12.647s 
 Prefill / times:
 About 11-13tk/s on my M3 Max 96gb. From cold-boot it's about 10s in a empty Jan assistant chat. After that ~3-5s TTFT. 
 Unfortunately larger prefill is frustrating, so I'm unsure if I want to try this with much coding. 36k tokens take about 2 minutes and 30 seconds. But once it's in cache it sustains about the 12tk/s.
 ----
 Anyways, maybe this was common knowledge but I didn't think this was possible.. It's not that much slower than qwen 27b. Unsure how it benchmarks against it but obviously it's much larger.
    submitted by    /u/Zeeplankton  
 [link]   [comments]
