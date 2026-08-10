---
title: >-
  DeepSeek-V4-Flash-0731 Q8_K_XL sometimes stops mid-task in OpenCode - anyone
  else seeing this?
url: >-
  https://www.reddit.com/r/LocalLLaMA/comments/1vjw0xg/deepseekv4flash0731_q8_k_xl_sometimes_stops/
source: Reddit r/LocalLLaMA
source_type: rss
language: en
published: '2026-08-09T17:37:52.000Z'
fetched_at: '2026-08-10T11:01:36.122Z'
---
Hey everyone,
 I've been experimenting with the new DeepSeek-V4-Flash-0731 release locally using the Unsloth Studio Q8_K_XL GGUF with OpenCode.
 Overall, it's been working really well, but I've noticed a strange behavior during longer agentic coding sessions.
 Once the context gets above ~100K tokens, the model will sometimes be in the middle of thinking/working through a task and then just stop generating.
 There doesn't seem to be an obvious error or crash. It just stops.
 If I type resume in OpenCode, it correctly picks up where it left off and continues working normally. However, after working for a while longer and the context grows again, it can stop again, and I have to type resume again.
 So the pattern I'm seeing is roughly:
 100K+ context -> model stops -> type resume -> continues normally -> works for a while -> stops again
 It doesn't happen every single time, but I've noticed it enough that I'm wondering if there's something specific about running V4-Flash-0731 at large context lengths.
 My setup:
  
DeepSeek-V4-Flash-0731
 Unsloth Studio
 Q8_K_XL GGUF
 OpenCode
 Long-running agentic coding tasks
 Issue seems to start appearing around 100K+ context
  
I'm curious if anyone else running DeepSeek-V4-Flash-0731 locally has experienced this, especially at large context sizes.
 I'm wondering whether this could be related to the model, llama.cpp/inference, context handling, prompt caching, tool calling, or OpenCode itself.
 The interesting part is that resume immediately gets it working again, so it doesn't seem like the model is completely stuck or crashed.
 And in case it gets asked i start opencode directly using unsloth on the server itself in a tmux session.
 Has anyone else run into this with V4-Flash-0731 at 100K+ context?
    submitted by    /u/dieSpaghettiCarbona  
 [link]   [comments]
