---
title: >-
  ds4 flash 0731 UD-IQ2_M wrote a custom metal kernal for kimi k2 IQ1_0 in about
  50 minutes
url: >-
  https://www.reddit.com/r/LocalLLaMA/comments/1vje00y/ds4_flash_0731_udiq2_m_wrote_a_custom_metal/
source: Reddit r/LocalLLaMA
source_type: rss
language: en
published: '2026-08-09T02:31:42.000Z'
fetched_at: '2026-08-09T11:01:08.933Z'
---
as a programming ignoramus this kind of thing seems extremely impressive to me... maybe others can shed light on whether this is expected from this level model at q2.
 DS4 IQ2_M just spent about 50 minutes writing a custom metal kernel after it could not find one on github for unsloth's IQ1_0 Kimi k3 quant for my mac studio 512 gb.
 Performance is meh but much better than cpu. About 4 t/s decode and 20 prefill for k3 Q1_0 (mac studio 512gb)
 I've also run 0731 on mlx at 8 and 4 bits... the 2 bit unsloth seems within common sampling settings-level margin of error across these quants for my tasks. Runs at about 1k prefill and 50 decode on 1x rtx pro 6000 via lm studio.
 I still find 4 bit glm 5.2 better but it's kinda close. Crazy for a 90 gb file.
    submitted by    /u/technaturalism  
 [link]   [comments]
