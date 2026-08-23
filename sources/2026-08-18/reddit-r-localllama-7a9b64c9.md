---
title: >-
  After pushing 1M+ tokens through Qwen 3.8 27B, here is my optimal llama.cpp
  config for 16GB VRAM (73k Context, Agentic Coding)
url: >-
  https://www.reddit.com/r/LocalLLaMA/comments/1vqrt86/after_pushing_1m_tokens_through_qwen_38_27b_here/
source: Reddit r/LocalLLaMA
source_type: rss
language: en
published: '2026-08-17T13:05:26.000Z'
fetched_at: '2026-08-18T11:02:01.149Z'
---
Following up on my previous post about my budget server setup (Intel N100 + RTX 5060 Ti 16GB), a few of you asked for a deeper dive into my actual inference config and real-world agentic performance.
 Like many of you, I was refreshing the page waiting to download Qwen 3.8 27B the second it dropped. After spending the entire weekend stress-testing it with agentic coding workflows, I managed to run a complete, large-scale project almost entirely autonomously (over 1M total tokens processed, only 3 prompts total).
 Here is a quick breakdown of the core setup before we dive into the config and workflow details.
 Quick Specs & Params
  
Model: Qwen3.8-27B-UD-Q3_K_XL.gguf
 Hardware: RTX 5060 Ti (16GB VRAM) + Intel N100 (4C/4T, 16GB RAM)
 Context Window: 73,728 (73k context) running comfortably in 16GB VRAM!
 KV Cache Quant: q4_1 for main context, q5_1 for MTP draft context
 Speculative Decoding: Native MTP enabled (spec-type = draft-mtp, n-max = 2)
 Sampling: temp = 0.4, top_p = 0.90, top_k = 15, min_p = 0.02
  
 The Experiment: Building a full API in 3 Prompts
 Instead of running synthetic benchmarks, I put this setup through a real-world software engineering pipeline: building an unofficial REST API and MCP Server for a legacy vBulletin forum.
  
Prompt 1 (Site Architecture & Analysis): Asked the model to map out the target site. It generated a flawless ~1,500-lines Markdown spec covering structural analysis, scrapable HTML nodes, expected JSON payloads, stack selection, pagination logic, session auth, and search endpoints—far more thorough than I would have written manually.
 Prompt 2 (Development Architecture): Using the spec as the single source of truth, it designed a modular NestJS API implementation plan broken into 9 execution phases:
 Phase 1: Project Scaffolding
 Phase 2: Domain Models
 Phase 3: Scraping Core (HTTP + Rate Limiting + Retries)
 Phase 4: HTML Parsers (cheerio)
 Phase 5: Cache Layer
 Phase 6: Application Services + REST API
 Phase 7: Authenticatio
