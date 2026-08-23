---
title: '# Qwen3.8-27B — One Week Later: The r/LocalLLaMA + r/LocalLLM Verdict'
url: >-
  https://www.reddit.com/r/LocalLLaMA/comments/1vvu15m/qwen3827b_one_week_later_the_rlocalllama/
source: Reddit r/LocalLLaMA
source_type: rss
language: en
published: '2026-08-23T01:39:46.000Z'
fetched_at: '2026-08-23T11:01:37.693Z'
---
Companion to the Qwen 3.8 Release Megathread. Compiled from ~2,000 posts scanned across both subs, with deep reads of the 45 highest-signal threads (560 posts and comments), Aug 15–22, 2026, plus independent X benchmarks. Every number is attributed to the poster's stated hardware/runtime/quant. This community contradicts itself on nearly every axis — so this thread keeps the disagreements side-by-side instead of picking a winner for you.
  
TL;DR
  
The consensus pick: a 27B dense multimodal model that genuinely moved the bar for local agentic coding. The strongest claim with controlled evidence behind it isn't benchmarks — it's tool-calling reliability.
 The default ships at xhigh reasoning and it thinks a lot. Low and medium presets score nearly as well on Artificial Analysis (~43/44 intelligence index, within a few points of the xhigh headline) while cutting thinking tokens ~7–9x (and wall time ~6–7x). Most of you should not be running xhigh.
 Knowledge recall regressed vs 3.6 — widely reported and best understood as a deliberate agentic-design tradeoff. Trivia nerds: keep Gemma around.
 Q4_K_M is basically indistinguishable from Q8 on perplexity, but real-world reports split hard below Q6 for complex reasoning. KV cache quantization is one of the most contested settings in the corpus.
 The "neck and neck with DeepSeek V4 / GPT-5.6 Luna Max" AA headline is real but heavily caveated — see the benchmark credibility section before quoting it at your friends.
  
 1. What it's actually good at
 Agentic coding (strongest consensus area)
  
"Highest level of agency I've ever seen in a local model" (thread): single 3090, Unsloth Q4_K_S + q8 KV, 150k ctx. From one prompt it pulled the OP's class schedule off a convoluted university website via 80 tool calls, zero human intervention.
 1M+ token run (thread): RTX 5060 Ti 16GB, UD-Q3_K_XL, 73k ctx. Full REST API + MCP server for a legacy forum from 3 prompts.
 Controlled tool-call evidence: in a plain Python tool loop (no fr
