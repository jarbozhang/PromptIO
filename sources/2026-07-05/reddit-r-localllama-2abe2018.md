---
title: 'PSA: Upscaling Gemma 4 requires a proportional layer_scalar adjustment'
url: >-
  https://www.reddit.com/r/LocalLLaMA/comments/1un9muu/psa_upscaling_gemma_4_requires_a_proportional/
source: Reddit r/LocalLLaMA
source_type: rss
language: en
published: '2026-07-04T13:52:22.000Z'
fetched_at: '2026-07-04T23:01:32.107Z'
---
A lot of people seem to be confused or mystified about this so figured I'd spell it out.
 I played around with RYS and realized that it broke Gemma 4 models. Turns out there's a `layer_scalar` value that is applied at each layer. If you don't adjust that so that the resulting model gets "the same amount", you break it. Since it's multiplicative, you have to do `s^(1/N)`, where `s` is the original scalar and `N` is the number of times the layer occurs (duplications + 1 for the original layer; thanks u/ttkciar for pointing out my original error).
 Vibe coded (and closed) PR at https://github.com/dnhkng/RYS/pull/4 for reference.
    submitted by    /u/kallewoof  
 [link]   [comments]
