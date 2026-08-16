---
title: >-
  club-5060ti refresh: tested RTX 5060 Ti presets, a proper high-context
  harness, and Qwen3.8 27B
url: >-
  https://www.reddit.com/r/LocalLLaMA/comments/1vper67/club5060ti_refresh_tested_rtx_5060_ti_presets_a/
source: Reddit r/LocalLLaMA
source_type: rss
language: en
published: '2026-08-15T21:32:14.000Z'
fetched_at: '2026-08-16T11:01:35.469Z'
---
Quick update on the RTX 5060 Ti local LLM repo. It has changed quite a bit since my previous posts. 
 The project started as a collection of practical notes and benchmark results. That was useful, but as the dataset grew it became harder to answer the question most people actually had: 
 What configuration should I run? 
 I have rebuilt the repo around tested, copyable presets rather than treating every successful benchmark request as a front-page result.
 What changed?
 The project now separates three things: 
 • Presets: exact configurations intended for people to copy and run.
 • Evidence bundles: reviewed proof of context fit, retrieval, sustained generation and performance.
 • Raw receipts: retries, failed experiments and diagnostic runs that are kept separate as engineering material without automatically becoming recommendations. 
 The website now leads with the published preset catalogue. The larger results explorer is still there for comparisons and historical data, but it is no longer the first thing visitors have to decipher. 
 There are currently seven published presets across the 1× and 2× RTX 5060 Ti lanes: 
 1× RTX 5060 Ti 16GB 
 • Qwen3.8 27B IQ3_XXS at 64K with q8 KV and built-in MTP
 • ThinkingCap Qwen3.6 27B IQ3_M at 64K
 • Nail 35B-A3B IQ3_XXS on a configured 131K route 
 2× RTX 5060 Ti 16GB 
 • Qwen3.8 27B Q6_K at 131K
 • ThinkingCap Qwen3.6 27B Q6_K at 131K
 • Nail 35B-A3B Q4_K_XL at 131K
 • Muse Glimmer 30B dynamic Q4 at 131K with DFlash 
 The 1× and 2× lanes are what I can test locally, not a ceiling for the project. The data model and contribution path still support 3×/4× setups, mixed GPUs and other CUDA hardware, provided the topology and serving configuration are reported clearly.
 The new high-context harness 
 A large configured context size is not enough to call a preset validated. 
 The new harness calibrates prompts against the model’s actual tokenizer, disables prompt caching, gives each request a unique nonce, and repeats both: 
 • 
