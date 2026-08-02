---
title: DeepSeek-V4-Flash-0731 UD-Q8_K_XL 17.20~ t/s on A6000 + 256GB DDR4
url: >-
  https://www.reddit.com/r/LocalLLaMA/comments/1vd6tpq/deepseekv4flash0731_udq8_k_xl_1720_ts_on_a6000/
source: Reddit r/LocalLLaMA
source_type: rss
language: en
published: '2026-08-02T03:16:19.000Z'
fetched_at: '2026-08-02T11:00:59.750Z'
---
Hello everyone I want to join the hype of posting specs.
 CPU: AMD EPYC 74F3 24-Core
 RAM: 8 Channel 3200 DDR4
 GPU: RTX A6000 48GB
 Prompt processing is in the high 70t/s (got down to mid 30t/s at 300k context). Inference is a steady 17.20t/s~ and the 48GB VRAM is enough to have the full 1mil context but PP will be so bad. Sadly not as cool like those M5 Macs.
 Anyone else having similar specs?
 Edit: I was informed about batch size and set mine to 8096 and my Prompt processing jumped to almost 400t/s at the start. it got to around 300t/s at 20k context. Better than my 70t/s stock lol.
    submitted by    /u/USBhost  
 [link]   [comments]
