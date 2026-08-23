---
title: Patch release v5.12.1
url: 'https://github.com/huggingface/transformers/releases/tag/v5.12.1'
source: Transformers Releases
source_type: rss
language: en
published: '2026-06-15T17:29:59.000Z'
fetched_at: '2026-08-07T11:01:33.692Z'
---
Patch release v5.12.1
Updated the lower bound for PEFT and a fix for auto tokenizer to properly resolve the mistral tokenizer (when mistral-common is installed). This is similar to v.5.10.3 minus the fixes that were already included in the main release - vLLM will first target 5.10.3 🤗
Fix peft lower bound #46605 by @hmellor (#46605)
mistral common backend fix #46667 by @itazap (#46667)
Full Changelog: v5.12.0...v5.12.1
