---
title: Qwen 3.8 - 27B is a game changer
url: >-
  https://www.reddit.com/r/LocalLLaMA/comments/1vonuu0/qwen_38_27b_is_a_game_changer/
source: Reddit r/LocalLLaMA
source_type: rss
language: en
published: '2026-08-15T00:09:13.000Z'
fetched_at: '2026-08-15T11:01:21.072Z'
---
So a bit of context, I am a cybersecurity senior analyst
 I am interested in LLMs for that field especially with MCPs to connect them to the tools or for writing scripts 
 I started this field by doing assembly language reading for hacking games when I was a teenager then that became malware analysis then I started to analyze traffic and logs at work for a living
 Before work I competed in cybersecurity competitions known as capture the flag to solve only one category of the challenges and that is malware analysis 
 Now here is the scene in LLM x Cybersecurity 
 Entry-level CTF challenges (I used to solve around 2017-2018, got first job in 2019) were solved and saturated by LLMs a long time ago (See intercode CTF benchmark) 
 Then High level CTFs (NYU CTF Bench, CSAW challenges, and CyBench) these were solved a while ago 
 Today we have
 CyberGym (vulnerability description (CVE report not real details) plus code base find vulnerability
 That was solved
 Then ExploitGym (the one recent OpenAI model escaped and hacked hugging face to find solution, the 2 vulnerabilities themselves are trivial (JWT spoofing with no server side checks for Jfrog sandbox and JS + Python template in open source data viewer of Hugging face)
 Still impressive for a fully autonomous model 
 ExploitGym gives vulnerability details + exploit technique/details and codebase (I wonder how/why OpenAI model escaped it in the first place those details should manage it this is why I feel it is staged but whatever right) 
 ExploitBench
 More realistic threat vector
 1-day not 0-day (0-day is a novel vulnerability no one else knows about it hence the name, 1-day is a known vulnerability patched, if in an open source project you can compare patches before and after and know it but not as valuable as 0-day since people will/should update their software, 0-days can and are used against high profile targets like in some 3rd world countries used for surveillance (and possibly non-3rd world countries ?!) but y
