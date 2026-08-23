---
title: >-
  Anthropic found Claude reasoning in silence (J-space) — we ran the same lens
  on open Qwen3-8B
url: >-
  https://www.reddit.com/r/LocalLLaMA/comments/1uugulk/anthropic_found_claude_reasoning_in_silence/
source: Reddit r/LocalLLaMA
source_type: rss
language: en
published: '2026-07-12T14:22:37.000Z'
fetched_at: '2026-07-12T23:01:41.976Z'
---
Anthropic’s research on Claude found a silent internal workspace they call J-space — hidden reasoning that never shows up as visible text.
 Classic example: the model answers 49, but inside J-space they caught 21 → 42 → 49.
 Important distinction:
  
Chain-of-thought = text you can read
 J-space = silent concepts in activations (“what’s on its mind”)
  
We fitted the open Jacobian lens (J-lens) on Qwen3-8B, ran it locally, and used it to catch prose drift before tool calls (model leaning toward “To, You, Do…” instead of JSON).
 Then we wired that into agent guards: stop / cancel / keep the useful space, and distill recoveries into LoRA data.
 Made an 8-min explainer demo:
 https://www.youtube.com/watch?v=5UMN6hDONJk
 Happy to answer questions about the probe setup or the guard loop.
    submitted by    /u/Murky-Sign37  
 [link]   [comments]
