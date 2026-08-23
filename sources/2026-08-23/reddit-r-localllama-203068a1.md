---
title: 'Tested in Coding: Q8_K_XL Qwen3.8 27B vs BF16 Qwen3.6 27B'
url: >-
  https://www.reddit.com/r/LocalLLaMA/comments/1vvsokm/tested_in_coding_q8_k_xl_qwen38_27b_vs_bf16/
source: Reddit r/LocalLLaMA
source_type: rss
language: en
published: '2026-08-23T00:34:31.000Z'
fetched_at: '2026-08-23T11:01:37.695Z'
---
Further to my last post, https://www.reddit.com/r/LocalLLaMA/comments/1vldngi/tested_in_coding_bf16_muse_glimmer_vs_bf16_qwen36/, I bring this requested comparison of Qwen3.8 27B.
 Context: Both models are running at full FP16 KV-cache. Due to RAM limitations, BF16 Qwen3.6 was running at 150,000, whereas Q8 Qwen3.8 is running with rope-scale 1.4 (using official Qwen guidance) to reach a context of 367,001 - this is equivalent of approx 900 pages of context.
 Qwen3.6 was on the default reasoning. Qwen3.8 is running on xhigh.
 Both models have been working on an enterprise-grade web application. Qwen 3.6 was working on tasks when the average context was approximately 120,000. Now the tasks have ballooned to average 280,000 context. Coding work has been 6+ hours per day since the release date of Qwen3.8.
 TLDR: Muse Glimmer is completely obsolete as a coder. Q8 Qwen3.8 is stronger than BF16 Qwen3.6 in all respects except for one - a critical one - as highlighted below.
 Instructions
 Qwen3.8's greatest strength is its ability to read, interpret, recall and follow instructions. With the release of the latest model, I ported 20 pages of feedback improvements from Qwen3.6 to Qwen3.8.
 Qwen3.6 would often ignore the improvements. Whereas Qwen3.8 remembers every single one, and even cites the improvements it in its thinking. Note however that each round, Qwen3.8 still often fails to follow the improvement for an initial instance, but then self-corrects for the remainder of the round.
 Diagnostic
 Qwen3.6 was already strong in diagnostic capability, however it had a major integrity issue of relaxing security controls to perform troubleshooting, and editing Acceptance Criteria to make failed tests pass.
 Qwen3.8 is even stronger on diagnosis - and has corrected a frontier model (eg. Chat GPT / Opus) on multiple occasions.
 Both models are genuinely strong at diagnosis, but still share a common issue of not sanity-checking against a known baseline or diagnostic script output b
