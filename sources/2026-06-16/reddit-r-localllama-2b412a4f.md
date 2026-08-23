---
title: Claude Fable 5 distilled
url: 'https://www.reddit.com/r/LocalLLaMA/comments/1u6zj79/claude_fable_5_distilled/'
source: Reddit r/LocalLLaMA
source_type: rss
language: en
published: '2026-06-16T01:21:19.000Z'
fetched_at: '2026-06-16T06:31:40.319Z'
---
Releasing Qwable-v1 - an open-weights Qwen3.6-35B-A3B distilled from Claude Fable-5, Anthropic's Mythos-class preview model that was briefly public for ~4days (2026-06-9 → 2026-06-12) before being suspended globally under U.S. export-control directives.
 Fable-5 was Anthropic's most powerful model when it shipped — 80.3% on SWE-bench Pro, $50/M output tokens, with an anti-distillation classifier baked into the API that redacted thinking blocks on the fly. Qwable-v1 captures what survived: 4,659 cleartext agentic-coding traces (re-packed from Glint-Research/Fable-5-traces, the only public corpus where the CoT made it through), distilled onto Qwen3.6 over ~14h on a single H200. Given an agent
 system prompt, the model emits properly-formatted <tool\_use> XML calling actual Claude-flavored tools like str_replace_editor — Fable's tool surface leaked into the weights, not just its style.
 Model, GGUFs (IQ4_XS / Q4_K_M / Q5_K_M / Q8_0), and the SFT dataset are all public on HF (AGPL-3.0 from upstream).
 https://huggingface.co/lordx64/Qwable-v1
    submitted by    /u/Anony6666  
 [link]   [comments]
