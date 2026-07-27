---
title: 'Harness showdown: Claude Code vs OpenCode vs Pi with DeepSeek V4 Flash'
url: >-
  https://www.reddit.com/r/LocalLLaMA/comments/1v7d8px/harness_showdown_claude_code_vs_opencode_vs_pi/
source: Reddit r/LocalLLaMA
source_type: rss
language: en
published: '2026-07-26T19:17:40.000Z'
fetched_at: '2026-07-27T11:01:27.646Z'
---
I ran DeepSeek V4 Flash through Claude Code, OpenCode and Pi on my own benchmark, and the quality came out basically the same across all three while the time and tokens spent was wildly different. Claude code (with DS in CLIProxyAPI) takes nearly 4 times longer than the fastest to land the same diffs.
 Theo posted a video "GPT-5.6 is better in Claude Code" last week, and that got me curious, does the harness make a quality difference? I could at least run my own bench and see what I got, with DeepSeek V4 Flash on vLLM running at ~180 tok/s, the only moving part is the scaffolding.
 Anyway I went to town measuring all of it on my workload (antigenic work in large code base), so the full charts, the token and wall-clock spread across the three harnesses and the raw per-run data are on the site if you want to see it in detail and pick it apart yourself https://nqawhc.github.io/articles/harness-efficiency-not-quality/ but in short, the quality did not change, each harness made the same code diffs, but took wildly different paths to get there, how many tools calls, the structure of those tool calls and how the system prompt and tools plays a big role in how it plays out, like «Pi reasons, OpenCode delegates», while Claude Code loves exploring the code base, maybe too much.
 UPDATE: I've added NanoCoder into the mix.
    submitted by    /u/xquarx  
 [link]   [comments]
