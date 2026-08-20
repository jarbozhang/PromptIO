---
title: Qwen3.8-27B took a serious hit to *knowledge* vs 3.6
url: >-
  https://www.reddit.com/r/LocalLLaMA/comments/1vt7l3e/qwen3827b_took_a_serious_hit_to_knowledge_vs_36/
source: Reddit r/LocalLLaMA
source_type: rss
language: en
published: '2026-08-20T03:02:12.000Z'
fetched_at: '2026-08-20T11:01:24.241Z'
---
Like many of you I've spent the last few days throwing Qwen3.8-27B against all of my usual use-cases and personal tasks/harnesses and workflows. It's great, phenomenal sometimes, but that's not what this post is about.
 One of my little personal benchmarks is a little set of pocket trivia that's relevant to me but mildly obscure mixed in with a few useful/prepper questions. Qwen3.8-27B at all quantization levels and sampling settings I threw at it, did relatively poorly at this. It's failing questions that Qwen3.6 reliably answered.
 I come to find out that on offline (no tool call) knowledge benchmarks seem to align with what I'm saying. It's pretty significantly weaker than it's 3.6 predecessor at recalling random facts (or not hallucinating as much, in my tests, though that isn't reflected in these particular benchmarks). Now you should never trust barcharts over your own vibes, but my vibes are validating these bar charts this time around.
 Is this relevant? Not necessarily. It seems to know the code it tries to use well-enough and for everything else I'm assuming/hoping you're using tool-calls. This largely only applies to you if you have a strategy of trusting an airgapped model with obscure/broad knowledge-retrieval exclusively from within its own weights, probably a losing strategy anyway.. but if that's you, take a pass on Qwen3.8 or finally set up that MCP server.
 I found it to be interesting. Curious of your thoughts or if anyone else noticed this.
    submitted by    /u/EmPips  
 [link]   [comments]
