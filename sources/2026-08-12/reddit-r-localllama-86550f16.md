---
title: 366 t/s Qwen3.6 27B NVFP4 on v100s
url: >-
  https://www.reddit.com/r/LocalLLaMA/comments/1vlt0lj/366_ts_qwen36_27b_nvfp4_on_v100s/
source: Reddit r/LocalLLaMA
source_type: rss
language: en
published: '2026-08-11T20:28:19.000Z'
fetched_at: '2026-08-12T11:01:19.738Z'
---
These are single stream numbers
 Following on from my previous post about v100s (here) and inspired by this comment (here) I decided to work on kernels that allow for an extremely fast path for Nvfp4 weights on sm70 and almost free deep speculation on sm70 as well.
 Which leads me excitedly on to the launch of “v100-skinny” (cause the kernels are skinny)
 My work and how to run can be found here: https://github.com/dnv2003/v100-skinny
 Many caveats about the quoted number in the title are in the repo but it is the absolute best case for mtp that being extraction. However you can expect around 240 on structured generation like json and 200 on mtp friendly code (think boiler plate,patterns, html etc using the “flagship configuration of k=7”)
    submitted by    /u/Simple_Library_2700  
 [link]   [comments]
