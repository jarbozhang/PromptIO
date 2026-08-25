---
title: The journey of letting Qwen 3.6/3.8 autonomously coding a c compiler.
url: >-
  https://www.reddit.com/r/LocalLLaMA/comments/1vxg8be/the_journey_of_letting_qwen_3638_autonomously/
source: Reddit r/LocalLLaMA
source_type: rss
language: en
published: '2026-08-24T21:32:49.000Z'
fetched_at: '2026-08-25T11:00:49.197Z'
---
Hi, 
 Back in late march I begun playing around with Qwen 3.6 27b and found like everyone else that it's notoriously good at tool calls, where every model I tried before just derailed after a few turns it kept going and felt quite reliable outside of typical behaviors of smaller modells.
 I decided to take a crack at it and see if a custom harness that attempted to detect and recitify the modell if it detected repetitions, empty answers etc (some of these issues was later addressed to some extent with updated jinja templates though), but also combining some novel and other just basic ideas that is common among frontier agent harnesses. 
 After a few weeks I had something that appeared to work quite well for simple test applications/utilities and most issues I encountered was context related- ie. I use llama.cpp as inference engine without context-shift so the harness/orchestrators context management is extremely important and I had a few ideas I wanted to test here. 
 Around the start of July it was in a shape that I wanted to see how far I could push both the harness and the model itself, the whole idea was to attempt force the model research then execute instead of relying on it's burned in information. as well as apply a very strict general ruleset with multiple subagents, a planner, coder, debugger, researcher, validators etc all focused on their own task to structure, replan and execute. 
 I gave it a prompt "I want to make a c99 c compiler capable of producing working x64 elfs" and so it started, the first few days (my inference rig is a Tesla P100 + RTX 4070 for the Qwen model, inference speed is around 13-14 tok/s and prefill around 250 token/s ) and then I run Gemma4 12b on an Intel Arc B580 on another machine which is used as the validator most of the time. 
 Outside some minor tweaks to the orchestration (particularly to the context management and more especially the compaction/pruning, which was very finicky as you easially ended up in a situation where 
