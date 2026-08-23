---
title: >-
  Xiaomi quietly uploaded MiMo-V2.5-DFlash — official DFlash weights are now on
  Hugging Face
url: >-
  https://www.reddit.com/r/LocalLLaMA/comments/1uu8d1v/xiaomi_quietly_uploaded_mimov25dflash_official/
source: Reddit r/LocalLLaMA
source_type: rss
language: en
published: '2026-07-12T07:11:43.000Z'
fetched_at: '2026-07-12T23:01:41.972Z'
---
https://huggingface.co/XiaomiMiMo/MiMo-V2.5-DFlash
 Xiaomi appears to have quietly uploaded MiMo-V2.5-DFlash to Hugging Face: there is dedicated dflash directory containing the Dflash model, anyone willing to GGUF it and try? I'd do it but I can't today.
 This model is pretty good IMO (300B + params) and runs at about 8-10 tk/s on 2x24gb cards + vram offload (96/128gb drr5), dflash could double that speed and make it very interesting.
 EDIT: the main reason it's interesting, is because the MTP head was shared already, but doesn't work yet il llama cpp. I speculate (pun intended) the Dflash does work instead.
 EDIT2: very cool! they shared also the SEPARATE MTP model. the reason Llama doesn't work already is because it has trouble identifying the MTP layers. a separate MTP model might work too.
    submitted by    /u/nasone32  
 [link]   [comments]
