---
title: >-
  DS4 Flash incoming price increase "we've been able to reproduce their current
  prices even on rented GPUs"
url: >-
  https://www.reddit.com/r/LocalLLaMA/comments/1vhv2bz/ds4_flash_incoming_price_increase_weve_been_able/
source: Reddit r/LocalLLaMA
source_type: rss
language: en
published: '2026-08-07T08:43:34.000Z'
fetched_at: '2026-08-07T11:00:46.507Z'
---
https://preview.redd.it/kvfk26z2uwhh1.png?width=598&format=png&auto=webp&s=356a8793a6c31bc563d552aaa5a73112ced7372e
 https://preview.redd.it/xthbu87auwhh1.png?width=598&format=png&auto=webp&s=08f686fee339905a33609a0346f13163aedc2671
 Hello,
 I've seen these tweets from dax (anomalyco / opencode).
 I'm doubting the claim, so here is my question to you: given the [$0.14, $0.0028, $0.28] (input, cache, output per MTok) current prices, how would anyone be able to reproduce that AND be profitable on rented hardware?
 On my own hardware (2x Spark) at $0.20/kWh electricity price, I get:
 - input: $0.0082-$0.0089 per MTok (so way cheaper than API)
 - output: $0.32-$0.39 per MTok (already more expensive)
 (ranges are from clock set from 1400Mhz to 2300Mhz ; power measured at the wall ; running 0731 with DSpark enabled - which doesn't reflect well in llama-benchy reports ; and I'm on solar, so this is imaginary energy cost)
 And that's without taking into account the price of the hardware itself.
 Does any of you have insights in how to host DS4 Flash more efficiently and serve users on rented hardware at the same price of current API?
    submitted by    /u/t4a8945  
 [link]   [comments]
