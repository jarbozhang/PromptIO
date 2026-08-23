---
title: Buying a V100/older NVIDIA GPU? Run this to check for older memory issues
url: >-
  https://www.reddit.com/r/LocalLLaMA/comments/1vuf4pb/buying_a_v100older_nvidia_gpu_run_this_to_check/
source: Reddit r/LocalLLaMA
source_type: rss
language: en
published: '2026-08-21T12:34:49.000Z'
fetched_at: '2026-08-22T11:01:33.612Z'
---
I recently bought a 32GB V100 off eBay and thought I was all set with rudimentary tests showing zero issues. But then I started seeing weird VRAM-related errors in llama.cpp.
 I sic'ed Claude on it, to find that ECC was disabled and that can hide small RAM issues. I believe the aggregate ECC error counter can also be reset. However, if ECC is enabled and RAM starts failing, a record of that is stored in the InfoROM on the card with timestamps.
 This script can be run to see if you've got any retired pages, and on my card it showed retired pages going back to 2019. Another V100 (16GB) I have has zero, as expected.
 Unfortunately, I didn't learn all this until after my 30 days was up, so now I'm stuck with a $900 paperweight. I'll run this on the next V100 I order immediately after installing it to ensure I'm not getting stuck with someone's e-waste.
 https://gist.github.com/samteezy/a788dcf430deb448ae48bbe17c369241
 https://preview.redd.it/4o84q8jf3qkh1.png?width=1650&format=png&auto=webp&s=78a876a11978b1b9a1fba515775040ebb7cc1a81
    submitted by    /u/steezy13312  
 [link]   [comments]
