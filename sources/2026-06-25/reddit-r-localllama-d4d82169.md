---
title: >-
  Gemma4-26B-A4B & 31B-QAT Uncensored Balanced are out with MTP (35% & 53% speed
  boost)!
url: >-
  https://www.reddit.com/r/LocalLLaMA/comments/1ueuki7/gemma426ba4b_31bqat_uncensored_balanced_are_out/
source: Reddit r/LocalLLaMA
source_type: rss
language: en
published: '2026-06-25T00:13:17.000Z'
fetched_at: '2026-06-25T07:40:38.228Z'
---
First of all, I'm stoked to announce we are almost at 20 million downloads on HF! (counted only on my own account, no duplicates/quants/finetunes/etc) and almost 5000 members on Discord!
 Two releases this time, as promised, the bigger Gemma 4 QATs, both Balanced, both with MTP:
 https://huggingface.co/HauhauCS/Gemma4-26B-A4B-QAT-Uncensored-HauhauCS-Balanced-MTP
 https://huggingface.co/HauhauCS/Gemma4-31B-QAT-Uncensored-HauhauCS-Balanced-MTP
 GenRM Defeated again — on both! 0/465 refusals*.
 Balanced = a light reasoning preamble on the absolute edgiest stuff before delivering the full answer. No personality changes/alterations or any of that. These are the ORIGINAL Gemma4-26B-A4B-QAT and Gemma4-31B-QAT, just uncensored. An Aggressive variant is not required for these releases.
 As always with my Balanced releases, a handful of edge-case prompts can deflect on the first try but follow through on a re-ask (on extreme, non-RP scenarios). If you hit one Balanced won't get past, feel free to join the Discord and let me know the prompt so I can work on it in a future release.
 These are the recommended default as 99%+ of users will be happy here. Best for creative writing, RP, emotional intelligence. Normally I'd also say "agentic coding/tool use," but in my in-depth testing Qwen3.6 has been net superior on those.
 From my own testing: there is no looping, sampling stays stable across re-runs, long-context coherence holds.
 NEW — MTP on both (multi-token-prediction draft head for speculative decoding): roughly 35% faster on the 26B-A4B and 53% faster on the 31B, with identical output (the model verifies every drafted token which is pure speed, zero quality cost). In llama.cpp: -md mtp-gemma-4-26B-A4B-it.gguf --spec-type draft-mtp (swap the filename for the 31B). (MTP drafts courtesy of the Unsloth team — thanks!) Heads up: I tested it only through llama.cpp
 To disable thinking: edit the jinja template or pass {"enable_thinking": false} as a chat-template kwarg.
 What's i
