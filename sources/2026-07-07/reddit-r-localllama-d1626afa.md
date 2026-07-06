---
title: 'Llama-Server is Throwing Away Your Perfectly Good KV Caches, and How to Fix It'
url: >-
  https://www.reddit.com/r/LocalLLaMA/comments/1uohsov/llamaserver_is_throwing_away_your_perfectly_good/
source: Reddit r/LocalLLaMA
source_type: rss
language: en
published: '2026-07-06T00:07:27.000Z'
fetched_at: '2026-07-06T23:01:08.257Z'
---
Edit 7/6/2026: As markole correctly notes, it's a better community service to drop the TLDR in so no one has to read the dense LLM generated synopsis unless you actually want to learn how the bug was discovered, tested, and corrected. He gets the long story short correctly: "I would have loved it this post was something like "hey folks, if you want your llama.cpp to save kv cache slots properly, here's the diff". So here it is https://github.com/TheTom/llama-cpp-turboquant/pull/206/changes. 
 As to why I didn't PR this to upstream, the honest answer is I used AI to help me, and I'm fine with that. GGML isn't. They have been showing strong hostility to anyone who doesn't strictly adhere to their rules. So I am not going to bother.
 Introduction
 I watched 2.49 GB of state restore from disk in 1.23 seconds — and then get thrown away. llama-server's slot save/restore promises exactly what long-context work on budget hardware needs: park a session on disk, bring it back later without paying the prefill tax again. And the restore itself works perfectly. But across a process restart, the feature was functionally useless: the first query after restoring discarded the entire rehydrated state and re-prefilled from scratch. The reason turned out to be a single piece of metadata that lived only in process memory.
 Testbed: Qwopus3.6-27B Q6_K (hybrid architecture), 2× Tesla P100 layer-split, turbo4 KV quantization.
 The Discovery
 During high-context benchmarking, restores looked mechanically perfect — 2.49 GB back in VRAM in 1.23 seconds — yet the next /completion request logged forcing full prompt re-processing due to lack of cache data and ran a full re-prefill (about 17.5 minutes at 100K context). Save fast, restore fast, throw it all away.
 (That discovery run used a slightly different config than the verification runs; all headline numbers below are from the controlled verification run on the patched build.)
 The Root Cause
 llama_state_seq_save_file serializes the tokens
