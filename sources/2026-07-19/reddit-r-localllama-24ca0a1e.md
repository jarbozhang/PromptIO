---
title: >-
  If you're building a harness, here is a simple tool to catch cache
  invalidation in your calls to LLMs
url: >-
  https://www.reddit.com/r/LocalLLaMA/comments/1uztipo/if_youre_building_a_harness_here_is_a_simple_tool/
source: Reddit r/LocalLLaMA
source_type: rss
language: en
published: '2026-07-18T11:34:48.000Z'
fetched_at: '2026-07-18T23:01:00.743Z'
---
https://preview.redd.it/o6c5enqx3zdh1.png?width=1371&format=png&auto=webp&s=20f75d4cefa5f51f40c000db8f9bd7114758b354
 Hello,
 I know we're a lot of harness builders out there, because it's fun and because it makes us learn a lot.
 I've been focusing on a local-first harness and prefill costs become obvious when you run local LLMs.
 Those often come from cache invalidation. Not respecting the order of the messages, or changing something in them (or in the system prompt, or in tools, heck even changing reasoning_effort triggers cache invalidation on my setup!).
 That's why I built this tool: cache-hunter
  
You launch it, make it point to your actual LLM endpoint
 
In your harness, you point to cache-hunter local port
 
Hit "Start capture"
 
Do a complete normal session in your harness
 
 Then you'll see the session live in the tool, and any red cell means something wasn't as stable as you thought.
 First row is reasnoning_effort, second it tools hash, third is system prompt
 I've run this with my own harness, but also with OpenCode, Claude Code, Cline, Pi, Hermes, Vibe. Most showed issues with unstable system prompt, unstable tools, unstable ordering or content.
 I find it crazy that this is not part of standard testing for harnesses out there.
 If you build your own harness, use that and understand what it means (or build your own I don't care). This will help you and your users.
    submitted by    /u/t4a8945  
 [link]   [comments]
