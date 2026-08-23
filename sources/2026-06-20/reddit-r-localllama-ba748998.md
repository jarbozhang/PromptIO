---
title: >-
  Watching a local AI voice assistant get dumber (A 9B to 0.8B agent experiment
  on my RTX 5060 Ti)
url: >-
  https://www.reddit.com/r/LocalLLaMA/comments/1u9zt2w/watching_a_local_ai_voice_assistant_get_dumber_a/
source: Reddit r/LocalLLaMA
source_type: rss
language: en
published: '2026-06-19T11:46:48.000Z'
fetched_at: '2026-06-20T04:27:01.318Z'
---
I wanted to find the exact floor for running an intelligent, local voice assistant agent on consumer hardware.
 I kept the environment, tools, and prompts identical, I stepped the model sizes down through Qwen 3.5 9B, 4B, 2B, and 0.8B to see how agentic reasoning degrades.
 The results were a fascinating, slow-motion lobotomy. 
 While response speed definitely improved as the parameters shrank, the capability drop-off was massive:
  
9B (The Current Default): Trustworthy and handles tool orchestration really well, but takes its time. This is the biggest model I could run at decent quant size on my RTX 5060 Ti with 16GB VRAM.
 4B (The Floor): Faster, but experiences a noticeable loss of grounding. It starts getting lazy, skipping tool calls to confidently guess facts instead.
 2B (Semantic Drift): Loses conversational context entirely. It suffers from severe semantic blur, mixing up similarly shaped concepts in its latent space (like drifting from soccer to completely different sports leagues in my queries).
 0.8B (Total Mechanical Failure): Completely incapable of operating agent machinery. It triggers the wrong APIs entirely or gets caught in infinite failure loops.
  
I'm curious what capabilities the bigger models would open up on a voice assistant AI agent...
    submitted by    /u/liampetti  
 [link]   [comments]
