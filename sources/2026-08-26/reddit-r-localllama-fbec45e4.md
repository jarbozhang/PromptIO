---
title: >-
  M5 Ultra 96GB vs M5 Max 128GB — is 2x bandwidth worth losing 32GB of RAM, with
  Qwen3.8-Flash-Next dropping tomorrow?
url: >-
  https://www.reddit.com/r/LocalLLaMA/comments/1vyfved/m5_ultra_96gb_vs_m5_max_128gb_is_2x_bandwidth/
source: Reddit r/LocalLLaMA
source_type: rss
language: en
published: '2026-08-25T23:16:37.000Z'
fetched_at: '2026-08-26T11:01:34.336Z'
---
I’ve been going back and forth on this for a week and I can’t settle it, so I’m hoping someone here has hands-on numbers.
 The two configs (German prices, dealer quote, incl. VAT):
  
 Config Price 
  
 Mac Studio M5 Max, 128GB / 512GB SSD €5,859 
  Mac Studio M5 Max, 128GB / 1TB SSD €6,189 
  Mac Studio M5 Ultra, 96GB / 1TB SSD €6,599 
 
 Ultra is 36-core CPU / 80-core GPU / ~1.2 TB/s. Max is 18-core CPU / 40-core GPU / 614 GB/s. So the Ultra is roughly €740 more for double the bandwidth and double the GPU cores — but 32GB less unified memory. There is no 128GB Ultra option in this lineup, which is what makes it annoying.
 What I actually run: Qwen3.8-27B at Q8 right now. Use case is occasional chat plus a few agents running in parallel. The whole point of doing this locally is privacy and not being locked into someone else’s model policy — I know a subscription would give me better models for €22/month, that’s not what I’m optimizing for.
 The thing that’s blocking me: Qwen3.8-Flash-Next drops tomorrow. If the leaked description holds, it’s a multimodal MoE with 176B total params — 125B main model plus 51B in N-gram embedding tables — and only ~6B active per token.
 My napkin math on memory:
 • IQ4\_XS: \~94GB weights, \~107GB with 262k context (the hybrid attention means the KV cache is tiny, \~8-9GB at fp16) • Q4\_K\_M: \~107GB weights, \~120-125GB at full context • Q8: \~187GB weights — not happening on either machine 
 96GB of unified memory gives you maybe 86GB wired on macOS. So the Ultra can’t load it at all, in any quant I’d want to use. 128GB gives ~115GB, which fits IQ4_XS with full context and Q4_K_M if I drop to 64k.
 So the trade is basically:
 Ultra → 27B Q8 goes from ~15 tok/s to ~29 tok/s, much faster prefill, but Flash-Next is off the table entirely.
 Max → Flash-Next runs, but at 6B active params it only reads ~3.7GB per token, so 614 GB/s already gives 40-60 tok/s and the Ultra’s extra bandwidth would be mostly wasted on it.
 Where I’m stuck / w
