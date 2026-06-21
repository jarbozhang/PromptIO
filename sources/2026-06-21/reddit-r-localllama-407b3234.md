---
title: >-
  Deep Neural Network that can turn any Image into a Playable Game! BUT LOCALLY,
  NOT ON DATACENTER
url: >-
  https://www.reddit.com/r/LocalLLaMA/comments/1ub2kmt/deep_neural_network_that_can_turn_any_image_into/
source: Reddit r/LocalLLaMA
source_type: rss
language: en
published: '2026-06-20T17:39:33.000Z'
fetched_at: '2026-06-21T03:18:27.864Z'
---
Hi everyone!! I really wanted to share my research what I've been working on.
 I wanted to build a nn that can simulate games, or at least start doing that
 Most video generators are too large to run on consumer hardware realtime, so I I designed a model that does this from scratch. No fine tuning bs or anything
 The core de noiser network is fully trained from scratch to support this goal. From image to games data.
 That video. above is on a RTX 5090.
 The nn is a small Transformer-like model and works in a causal way, just like LLMs.
 That lets us KV Cache all past information and do a simple autoregressive decode forward passes for every new frame we want.
 In the video shared, the model is a 0.5B variant with some SIGNIFICANT ISSUES like poor motion and some weird flashes, some context issues
 It's taking the keyboard actions I give it in realtime and utilising that in the forward pass. (no classifier free guidance though)
 Im training the next iteration , a 0.8B model now.
 Btw I haven't done quantisation yet, that can save a LOT more time. bf16 is slow.
    submitted by    /u/lucidml_lover  
 [link]   [comments]
