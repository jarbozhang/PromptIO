---
title: >-
  I mapped which local LLMs actually fit each RAM tier, 8 to 128GB (open
  dataset)
url: >-
  https://www.reddit.com/r/LocalLLaMA/comments/1ukn45x/i_mapped_which_local_llms_actually_fit_each_ram/
source: Reddit r/LocalLLaMA
source_type: rss
language: en
published: '2026-07-01T14:22:56.000Z'
fetched_at: '2026-07-01T23:02:00.946Z'
---
I kept answering the same question for friends ("I've got a 16GB MacBook / a 3060, what can I actually run?") and got tired of guessing, so I started a spreadsheet. It grew into a real dataset, so I put it on GitHub under CC BY for anyone to use or fix.
 Rule of thumb I landed on: at Q4_K_M a model needs roughly 0.6GB of memory per billion params, and you want to size to about 70% of your RAM/VRAM so the OS, context and KV cache still have room. From that, the comfortable ceiling per tier (62 local models in the set right now):
  
 RAM usable budget max params that fit models that fit 
  
 8GB ~5.6GB ~8B 23 
  16GB ~11GB ~14B 36 
  24GB ~17GB ~27B 41 
  32GB ~22GB ~35B 50 
  48GB ~34GB ~47B 53 
  64GB ~45GB ~70B 56 
  128GB ~90GB ~122B 58 
 
 The full thing (specific models per tier, quant, load size, the ollama command for each, plus GPU / Mac / iPhone breakdowns) is here: https://github.com/Wecko-ai/modelfit-hardware-dataset . There's a JSON API too if you'd rather pull it programmatically.
 Honest caveats:
  
the tok/s figures are bandwidth-derived estimates, not benchmarks I ran on every chip. Ballpark only.
 coverage is strongest on Apple Silicon and consumer NVIDIA. AMD is newer and thinner.
 "fits" means it loads and runs at a usable speed, not "fits at full context" (long context eats a lot more).
  
If something looks off (a model that should fit and doesn't, a quant I got wrong, a card I'm missing), tell me or open a PR. That's the whole point of it being open.
 (full disclosure: I also built a site and CLI on top of this, modelfit.io, but the dataset itself is the useful part and it's free to use)
    submitted by    /u/WecK0  
 [link]   [comments]
