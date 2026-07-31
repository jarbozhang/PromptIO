---
title: >-
  Is it just me, or are current LLM benchmarks failing to capture actual
  usability? (Gemma 4 vs. Gemini/Claude Opus)
url: >-
  https://www.reddit.com/r/LocalLLaMA/comments/1vbdpcz/is_it_just_me_or_are_current_llm_benchmarks/
source: Reddit r/LocalLLaMA
source_type: rss
language: en
published: '2026-07-31T02:18:16.000Z'
fetched_at: '2026-07-31T11:00:59.809Z'
---
Disclaimer, this was kinda written with AI (Gemma 4 again) but it also did really well here, it outputted what I wanted, and when I asked it to refine stuff or improve on certain areas it did that without compromising others or making things bulky.
 I’ve been noticing a massive disconnect lately between how models perform on technical leaderboards and how they actually perform in real-world tasks.
 Recently, I’ve been running some side-by-side tests, and I’m finding that Gemma 4 (26B A4B) is consistently outperforming much "larger" or more "advanced" models like Gemini 3.5 Flash and even Claude Opus 5 in practical instruction following.
 Here are two specific examples:
  
Email Composition: I asked Gemini to write a response to an email with specific ideas. It failed to follow my instructions and missed the tone entirely. I tried Claude Opus 5, and while it was "smart," the output was sloppy, overly verbose, and sounded incredibly "AI-ish." Gemma 4, however, was able to nail the subtleties. It understands when I want something expressed subtly rather than just being blunt—it actually understands the subtext and the layers of intent.
 Prompt Refining & Engineering: I tried to have Gemini refine a prompt for me, and it failed my instructions every single time. This goes beyond just refining; even when I'm engineering a new prompt and tell a model, "Do X, Y, and Z, but avoid A, B, and C," Gemini is too literal—it just outputs: "Do X, Y, and Z and don't do A, B, and C." It's clunky and obvious. Gemma 4 handles this naturally; it writes the prompt in a way that pushes it away from A, B, and C without needing to explicitly mention them. It just understands.
  
My takeaway: I’m starting to think that metrics used by sites like Artificial Analysis don't actually align with what the average user (or even a developer) needs. We don't just need high scores on math or coding benchmarks; we need models that actually listen, understand nuance, and don't hallucinate simple instruc
