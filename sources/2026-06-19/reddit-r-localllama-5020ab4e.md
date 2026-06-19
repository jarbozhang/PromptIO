---
title: >-
  My suitcase robot gets high now off a real gas sensor wired straight into the
  LLM sampler. Smoke raises temperature/top_p/top_k live, so his speech
  genuinely gets loopier and never repeats.
url: >-
  https://www.reddit.com/r/LocalLLaMA/comments/1u9a17y/my_suitcase_robot_gets_high_now_off_a_real_gas/
source: Reddit r/LocalLLaMA
source_type: rss
language: en
published: '2026-06-18T15:52:34.000Z'
fetched_at: '2026-06-19T14:35:21.916Z'
---
Follow-up on Sparky, my offline suitcase robot I keep overdeveloping. He gets high now, and there's no scripted "stoned mode" anywhere in it.
 A real MQ-2 gas sensor sits in the case. Every 0.5s I read it against an adaptive clean-air baseline and turn a smoke hit into a 0 to 10 phase that climbs as you blow at him and decays on its own over minutes.
 The fun part is that phase rewires his sampler per token. Temperature 1.0 to ~1.6, top_p 0.95 to 0.99, top_k 64 to 120 as he climbs. His word choice flattens and wanders to lower-probability, more associative tokens, so his cognition genuinely gets noisier. It's the live sampler doing the work, so every high reply is freshly generated and never the same. A per-phase persona nudge makes him show it without ever announcing "I am high."
 The body does the rest: a slight drawl, eyes that droop and go bloodshot, and the sensor display that escalates to a full smoke-and-plasma freakout at phase 10, keeping him blitzed there for the next 7 minutes.
 Honest caveat so nobody has to call it out: it's a smoke and VOC sensor, so a cigarette or incense probably trips it too. But blowing smoke and watching him unravel is watching a real measurement scramble a real model, live - and it's funny! Just an added Easter Egg to an already goofy suitcase robot.
 A real question for the hardware folks: is there a sensor, or a combination, that could actually distinguish cannabis smoke from generic smoke and VOCs? The MQ-2 can't really tell a joint from a candle, and I'd love to make the detection more specific if possible.
    submitted by    /u/CreativelyBankrupt  
 [link]   [comments]
