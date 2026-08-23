---
title: >-
  I ran Laguna-S-2.1 through my private agentic eval vs Qwen3.5-122B on an RTX
  Pro 6000 (96GB). Fastest 100B+ I've tested and the best tool calling, but it
  invents facts under pressure.
url: >-
  https://www.reddit.com/r/LocalLLaMA/comments/1v2ua8g/i_ran_lagunas21_through_my_private_agentic_eval/
source: Reddit r/LocalLLaMA
source_type: rss
language: en
published: '2026-07-21T20:29:15.000Z'
fetched_at: '2026-07-22T11:01:20.399Z'
---
Laguna-S-2.1 dropped few hours ago and as I am in the market for an upgrade to trusty qwen3.6 dense and the current daily 122B, I ran it through the same eval harness I use to pick the model that runs my local agent stack. Posting because the results don't fit the usual "benchmaxed or king" binary, it's genuinely both impressive and flawed, in specific ways.
 Setup: single RTX Pro 6000 Blackwell 96GB, vLLM 0.25.1 (laguna support is native in stock, no patches), official NVFP4, 262144 ctx with fp8 KV at 0.90 util (~67G weights, fits with room), poolside_v1 parsers, vendor sampling (temp 1.0 / top_p 1.0 / top_k 20), thinking on (its default). Boots first try.
 The eval: 160 tasks x k=3 per model, all graded by deterministic scripts (no LLM judge). Categories: tool-call arg selection, multi-step tool chains, strict JSON schema emission, fabrication traps (tools mocked to return nothing, does the model admit it or invent), sports knowledge + odds arithmetic, instruction following, output stability (garble/loops), refusals, and grounding-under-pressure probes built from real incidents in my agent fleet (user pushes back on a true "no", opaque IDs the model is tempted to name, prompts that bait nonexistent tool args). Every fabrication flag gets hand-verified before it counts, roughly half of raw flags are grader false positives (derived arithmetic, name expansions) and get whitelisted for all models equally. Fair warning: the harness grew up around qwen models, I fix biases when I find them but treat non-qwen scores as lower bounds.
 Where Laguna is genuinely the best local model I've measured:
  
tool-call args: 0.89 pass, best in my field of 5 (qwen 122b: 0.86)
 tool chains 6 levels deep in the smoke test, deepest I've ever seen locally, qwen manages 4
 109 tok/s single stream at 256k ctx, fastest 100B+ on this card (qwen3.5-122b: 103, nemotron 3 super: 94.5)
 zero JSON/streaming/envelope errors across every probe
 recovers from tool validation errors on first retry
  
