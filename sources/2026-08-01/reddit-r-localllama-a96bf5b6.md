---
title: I ported TurboFieldfare to Qwen 3.6 35B and it runs in 1.4 GB of RAM
url: >-
  https://www.reddit.com/r/LocalLLaMA/comments/1vbp8te/i_ported_turbofieldfare_to_qwen_36_35b_and_it/
source: Reddit r/LocalLLaMA
source_type: rss
language: en
published: '2026-07-31T12:14:10.000Z'
fetched_at: '2026-08-01T11:01:18.097Z'
---
Was playing around with TurboFieldfare, a Mac engine that runs Gemma 4 26B in ~2 GB by streaming MoE experts off SSD instead of loading them. It only supported that one model, so I added support for Qwen 3.6 35B-A3B.
 Comparatively, Qwen needs lesser memory. ~1.4 GB vs ~2.1 GB for Gemma. Qwen's experts are half the size and 30 of its 40 layers use linear attention. So there's a drastic drop in the KV cache to hold onto.
 Speed on my M5 is 19–23 tok/s depending on prompt length. Gemma gets 31–35 on the same machine. Qwen IS slower because its 18 GB of experts dont fit in the os page cache, so more reads actually hit the SSD.
 I also pinned the machine down to an 8 GB working set and it made no difference: 22.9 tok/s and byte-identical output which is expected since its already streaming from disk anyway.
 PR is open upstream: drumih/turbo-fieldfare#29
 Branch if you want to build it: NeelM0906/turbo-fieldfare@qwen36-support
 Notes: text-only, tested at 4K context, needs ~20 GB of disk, and my 8 GB test was simulated memory pressure, not an actual 8 GB Mac. 
    submitted by    /u/Blahblahblakha  
 [link]   [comments]
