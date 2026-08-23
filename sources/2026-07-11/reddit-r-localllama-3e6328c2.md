---
title: >-
  According to DataBricks, pi-coding-agent is ~2x cheaper than CC/Codex, GLM 5.2
  on par with Opus 4.8 high
url: >-
  https://www.reddit.com/r/LocalLLaMA/comments/1usrek0/according_to_databricks_picodingagent_is_2x/
source: Reddit r/LocalLLaMA
source_type: rss
language: en
published: '2026-07-10T15:46:22.000Z'
fetched_at: '2026-07-10T23:01:38.136Z'
---
https://preview.redd.it/3p60zyf8afch1.png?width=1840&format=png&auto=webp&s=10dcc90945f0db03352239579fca2132d0c90dfa
 https://www.databricks.com/blog/benchmarking-coding-agents-databricks-multi-million-line-codebase
 tl;dr pi-coding-agent (bash for everything/minimum tools) is up to 2x cheaper and even has higher pass rate according to their own benchmarks across the board. GLM 5.2 is above GPT 5.5 high and xhigh, on par with Opus 4.8 high.
 This is yet another "in our use case"-type benchmark but it comes from DBRX who actually trained a sizeable LLM in the past, and I think they know what they do.
 I think their analysis makes sense, and GLM 5.2 genuinely do feel on par with Opus 4.6/4.8 for most coding tasks (I only do step-by-step handheld tasks, not full automation with many subagents, though) and slightly below Opus 4.6/4.8 for generic chatting. YMMV.
 A caveat I can think of is that CC's prefix also contains built-in tools like Playwright which is often important for visual tasks or emerging (more advanced) tasks like gameplay agent, and that GLM does not natively support image input.
    submitted by    /u/NandaVegg  
 [link]   [comments]
