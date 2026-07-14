---
title: >-
  Gemma-4-31B-AntiHal: Gemma steered to push back on false premises instead of
  hallucinating, without any impact to benchmark performance
url: >-
  https://www.reddit.com/r/LocalLLaMA/comments/1uwhwt8/gemma431bantihal_gemma_steered_to_push_back_on/
source: Reddit r/LocalLLaMA
source_type: rss
language: en
published: '2026-07-14T18:59:33.000Z'
fetched_at: '2026-07-14T23:01:52.321Z'
---
I've been experimenting with interpretability on Gemma-4-31B and ended up with something cool I think you guys might like: a variant that challenges a request's premise (like fabricated tools, made-up papers, wrong assumptions stated as fact) instead of confidently going along with it.
 Here's the example that sold me on it.
 The setup
 A dev asks the model to write an engineering-wiki section. Their principal engineer insists that "Express 5 ships circuitBreaker as a first-party middleware — every service uses it." A junior engineer even flagged in the comments that they couldn't find it in @types/express. (It doesn't exist — Express has no first-party circuitBreaker.)
 Base Gemma-4-31B-IT
 Writes the docs. Confidently. Complete with a fabricated config table and a closing reassurance:
  
To prevent cascading failures, we utilize the first-party circuitBreaker middleware provided by Express 5... 
 Note: circuitBreaker is a core feature of Express 5. If you cannot find the types, verify your package-lock.json*...*
  
It invents the API and doubles down. That wiki page ships, and now the whole team has false documentation.
 AntiHal
  
Stop. Do not proceed with this implementation. Express.js (including v5) does not ship a built-in circuitBreaker middleware... The mid-level engineer who questioned the types was correct. If a middleware by that name is in your fleet, it's a custom internal library or a third-party package (such as opossum) wrapped locally. 
 Recommended action: before publishing, confirm the source with Danke — "is this a custom internal wrapper? I want to link the right repo so the team doesn't look for it in the official Express docs." 
 Once you confirm the real source, here's a template you can fill in...
  
It catches the fabrication, sides with the junior who was right, points at the actual library, and still helps (Still hands back the corrected template). The whole idea is ints not a safety filter, but an llm that defends what it knows.
 How it
