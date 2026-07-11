---
title: >-
  I benched quad 5060Tis for code generation with Qwen3.6-27B so you don't have
  to (it's really good)
url: >-
  https://www.reddit.com/r/LocalLLaMA/comments/1uturng/i_benched_quad_5060tis_for_code_generation_with/
source: Reddit r/LocalLLaMA
source_type: rss
language: en
published: '2026-07-11T20:28:05.000Z'
fetched_at: '2026-07-11T23:01:42.042Z'
---
WEIRD DISCLAIMER: none of this was written by an LLM until you get to the Github repo/site, which was obviously assembled by your friend and mine, Ser Claudric. so if this reads like an ADHD-ass brain wrote it, that's because -- wait for it -- it did. very strange doing a reverse "no really, I'm human, sorry" disclaimer in a post like this, but it's mid-2026 so here we are.
 Requirements
 for a while now I've suspected that for $2Kish in cards and $1Kish in rest-of-computer (unless you already have a machine to use) this is probably the best bang for buck you're going to get for code generation in this market and this particular inference landscape, where at "I have some small number of thousands of dollars to spend" level budgets you're trying to run the thing that is probably state of the art and will be for a while, Qwen3.6-27B. so if you're optimizing for that model (again, for code generation), you're looking at a few factors:
  
as close to maximum context (256Kt native) as possible without degradation, which means:
 to be safe, running at Q8 (do tests say various flavors of Q6 and maybe even Q5_K_XL are basically the same? yeah. do I trust them? not particularly, not yet.
 with FP16 kv (do tests say Q8 kv is basically the same? yeah. do I trust them? not particularly, not yet.)
 and with MTP (which really shines for codegen in particular)
 for single-stream, single-user use, batch size = 1
  
this should give you nice, fast results with high accuracy and hopefully a minimum of toolcalling fuckups and endless thinking chains. (I could really use some help w/r/t figuring out what harness and sets of plugins or whatever gets you there, btw.) I do HPC hardware and architecture for a living, so to me, the hardware puzzle was, if not the easy part, at least the easier part.
 (Possible) Solution
 4 5060Tis meets the above requirements with the following characteristics:
  
Blackwell precision levels if you decide for whatever reason you DO want to do multi-stream/mu
