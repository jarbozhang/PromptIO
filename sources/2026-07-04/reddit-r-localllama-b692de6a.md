---
title: 'Pay attention: a few chats waiting in tray reserve 1GB VRAM for themselves.'
url: >-
  https://www.reddit.com/r/LocalLLaMA/comments/1um5ik2/pay_attention_a_few_chats_waiting_in_tray_reserve/
source: Reddit r/LocalLLaMA
source_type: rss
language: en
published: '2026-07-03T05:28:58.000Z'
fetched_at: '2026-07-03T23:01:09.839Z'
---
If an application uses a Web-based interface and "hardware acceleration", it constructs its frame in VRAM and sometimes keeps it reserved even if the app is minimised.
 On my Linux machine, Discord is the worst offender, reserving 450 MB VRAM. Steam takes 200 MB, Telegram 150 MB, and a few other apps top it up to 1 GB+.
 If you are really squeezing something into VRAM, make sure to either close those apps or turn off "hardware acceleration" in their settings. But they would stutter a lot.
 Also, it may make sense to have another browser with hardware acceleration turned off, and use it only when working with an LLM.
 P.S. On Linux with Nvidia, I can get a list of VRAM gobblers with the command nvidia-smi.
    submitted by    /u/Barafu  
 [link]   [comments]
