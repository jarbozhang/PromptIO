---
title: v0.20.2
url: 'https://github.com/vllm-project/vllm/releases/tag/v0.20.2'
source: vLLM Releases
source_type: rss
language: en
published: '2026-05-10T07:39:12.000Z'
fetched_at: '2026-05-12T11:42:48.635Z'
---
vLLM v0.20.2
Highlights
This release features 6 commits from 6 contributors (0 new)!
This is a small patch release with bug fixes for DeepSeek V4, gpt-oss, and Qwen3-VL
Bug Fixes
DeepSeek V4 sparse attention: Re-enable the persistent topk path on Hopper and ensure the memset kernel runs at CUDA graph capture time regardless of max_seq_len, fixing the MTP=1 hang on DeepSeek V4 (#41665, revert of #41605).
DeepSeek V4 KV cache: Fixed a "failure to allocate KV blocks" error in the V1 engine KV cache manager (#41282).
gpt-oss MXFP4 + torch.compile: Plumbed hidden_dim_unpadded through the moe_forward fake op so MXFP4 works under torch.compile on v0.20.x (#42002, backport of #41646).
Qwen3-VL: Removed an invalid deepstack boundary check that could fail under heavy load (#40932).
Contributors
@ywang96, @zyongye, @stecasta, @wzhao18, @Isotr0py, @khluu
