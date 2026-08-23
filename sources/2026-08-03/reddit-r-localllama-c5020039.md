---
title: Deepseek v4 flash - 100-150 faster t/s in prefill/pp.
url: >-
  https://www.reddit.com/r/LocalLLaMA/comments/1vdm4z8/deepseek_v4_flash_100150_faster_ts_in_prefillpp/
source: Reddit r/LocalLLaMA
source_type: rss
language: en
published: '2026-08-02T16:13:56.000Z'
fetched_at: '2026-08-03T11:01:09.275Z'
---
You have two choices here (in order of pref):
  
Downgrade CUDA from 13.3 to 13.1 (skip 13.2 due to bugs) <- prefer this (thanks to u/fairydreaming for pointing this out)
 Use this vibed fork that works with CUDA 13.3 https://github.com/vektorprime/working_ds4_speed
  
I was troubleshooting this yesterday with the nvidia profiler and some LLM help (https://www.reddit.com/r/LocalLLaMA/comments/1vcs7bl/ds4_flash_full_model_in_offload_600_ts_pp_and/)
 Here's some more info on #1 (quote from fairydreaming) "Downgrade your CUDA and recompile. Starting with 13.2 DeviceTopK is used for top-k instead of argsort, this turns PP rate to crap."
 In short, DS4 Flash is spending a lot of time on things other than matrix multiplication.
 EDIT: Try this fork now because I can easily hit 1.3K prompt processing.
    submitted by    /u/fragment_me  
 [link]   [comments]
