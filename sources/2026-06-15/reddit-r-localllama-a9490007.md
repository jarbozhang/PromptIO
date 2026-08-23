---
title: >-
  Built a local AI assistant because I always knew this day would come,
  yesterday just made it feel very real
url: >-
  https://www.reddit.com/r/LocalLLaMA/comments/1u5lfvv/built_a_local_ai_assistant_because_i_always_knew/
source: Reddit r/LocalLLaMA
source_type: rss
language: en
published: '2026-06-14T13:39:00.000Z'
fetched_at: '2026-06-14T23:18:17.963Z'
---
I saw this coming from the start, so I sat down and started building. But yesterday's Anthropic shutdown made it hit different.
 One government directive and you see what happened. Or its just Anthropic i dont know, but that's the risk of depending on someone else's infrastructure.
 So here's what I've been working on: Bantz, a fully local AI personal assistant with a 1920s butler persona, running on Gemma 4b:
 - Reads & summarizes Gmail by category (personal, institutional, notifications) (well tries at least)
 - Google Calendar integration
 - Web search + deep research (async, multi-source) (this is good for a 4b parameters model)
 - Real-time system monitoring with alerts (CPU/RAM/swap)
 - Scheduled tasks & autonomous directives
 - Wayland native desktop control (still in progress but at least i can control my pc from far away)
 - Runs on CPU only — no GPU required (if youre using llama or the other models well its needed)
 Optimizing a small local model is an absolute nightmare, but at least it's MY nightmare and no one can take it away- for now. 
 Oh yes, for now this is my nightmare to maintain alone-- if anyone wants to grab a corner and help build, that would be absolutely amazing. Ideas, PRs, feedback, all welcome. Our little model has big ambitions :')
 github.com/miclaldogan/bantzv2
 https://preview.redd.it/0snp7rf4497h1.jpg?width=1600&format=pjpg&auto=webp&s=f9db195cdba415e79734b5475fe85ca959c8fe63
    submitted by    /u/amenemisa  
 [link]   [comments]
