---
title: >-
  Kimi K3 weights drop today. We're deploying on A100s, H200s and B300s this
  week and the A100 math is already rough
url: >-
  https://www.reddit.com/r/LocalLLaMA/comments/1v81qw0/kimi_k3_weights_drop_today_were_deploying_on/
source: Reddit r/LocalLLaMA
source_type: rss
language: en
published: '2026-07-27T14:18:45.000Z'
fetched_at: '2026-07-28T11:01:05.535Z'
---
tldr; we are going to host K3 on A100s (yes, thats correct, we'll try to see if it holds up), H200s & B300s - expect results for A100s & H200s this week while we setup the B300 cluster this weekend & maybe results by next week.
 Weights are supposed to hit Hugging Face today (Moonshot committed to July 27). What we already know from their platform docs: 2.8t total Params, MoE with 896 experts and 16 active per token, 1M context, vision. The download should be around 1.4 tb since they did quantization-aware training in MXFP4. We sat down and worked through the memory requirements., so here it is since everyone is probably about to pull the weights
 We have A100 80GB, H200 and B300 capacity and the plan was to bring it up on all three. Then we actually did the memory math.
 8x A100 gives you 640 GB. The weights are around 1.4 TB. That means three nodes before you've even allocated KV cache. On top of that Ampere has no FP4 or even FP8 tensor cores, so you're either dequantizing or running INT4 kernels that were never the target for this release. We're still going to benchmark it because someone should have real numbers, but we're expecting it to be ugly!
 8x H200 is about 1.13TB, so it still doesn't fit in one node. Two node setup minimum and you eat interconnect cost on every token.
 8x B300 is ~2.3TB, so that's the only config where the whole thing fits in a single node with room for long context KV cache. And Blackwell has native FP4, which is pretty clearly what Moonshot quantized for. these B300s are coming live this weekend, and we'll be setting up the clusters this weekend everyone preecommitting hardware is doing it without knowing the terms. And Moonshot's own model crd is unusually honest about weaknesses: quality drops if your agent harness truncates its thinking history, it tends to act instead of asking when things are ambiguous, and they admit the chat experience still trails Fable 5 and Sol even where benchmarks are close.
 We'll have tok/s, ttft and co
