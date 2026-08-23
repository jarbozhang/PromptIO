---
title: >-
  DeepSeek V4 Flash 0731 at 10–17 t/s (nothink) on MacBook M5 Pro **64GB***,
  partly via SSD streaming
url: >-
  https://www.reddit.com/r/LocalLLaMA/comments/1vge4l5/deepseek_v4_flash_0731_at_1017_ts_nothink_on/
source: Reddit r/LocalLLaMA
source_type: rss
language: en
published: '2026-08-05T17:34:25.000Z'
fetched_at: '2026-08-06T11:01:32.494Z'
---
Inspired by a post from u/giveen I motivated claude (no patinence on my side to work through everything myself) to help me get DS running on my MacBook M5 Pro 64GB and it exceeded my expectations.. because it worked, and at a quite usable generation speed!
 background: antirez ds4 DwarfStar has a SSD streaming mode: non-routed weights stay resident, the routed experts live partly in a RAM cache and get pulled from the GGUF on cache misses. Since routed experts dominate model size and Mac SSDs are fast, those misses are tolerable. experts and the output head stay Q8_0.. Router, embeddings and the V4 auxiliary blocks stay FP16. 
 (CORRECTED ... :)
 git clone https://github.com/antirez/ds4.git
 cd ds4
 make
 ./download_model.sh ds4f-q2
 caffeinate ./ds4 -m ./ds4flash.gguf --ssd-streaming --ctx 32768 --nothink
 let me end up with 10-15-17t/s in my first tries. 
 I am geniunly impressed and fascinated and wanted to share this, hit me up if you have questions but i guess everyone with like >50Gigs of VRAM/unified Memory should get this running with ai help.
    submitted by    /u/vogelvogelvogelvogel  
 [link]   [comments]
