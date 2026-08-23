---
title: >-
  User experience of Bonsai-Ternary-27B on 4060Ti 16GB for KB management and
  productivity assistant use cases
url: >-
  https://www.reddit.com/r/LocalLLaMA/comments/1uz0z0t/user_experience_of_bonsaiternary27b_on_4060ti/
source: Reddit r/LocalLLaMA
source_type: rss
language: en
published: '2026-07-17T14:14:06.000Z'
fetched_at: '2026-07-17T23:00:59.687Z'
---
Howdy folks,
 Long time reader here. This time, I would like to share my experience with this model that I have been cautiously optimistic about when I saw the announcement post on this thread. 
 -----
 My setup:
  
AMD Ryzen 5 on AM5 chipset (I genuinely don't remember the exact CPU. Just pick whatever fit in the budget after the GPU)
 32GB DDR5 running at 6000MT/s
 4060Ti 16GB
  
LLM Provider backend: PrismML fork of llamacpp running behind llama-swap.
 Harness: Pi agent with a set of custom made extensions.
 -----
 Use Cases: 
  
KB management: an obsidian vault with AGENTS.md and a set of skills and extensions to help and guide pi agent in querying, creating source notes, synthesise source notes into wiki articles for my reference. This agent can also run a systematic literature mapping, albeit only with arxiv as data source.
 Productivity assistant: the pi agent has extensions to connect to a project management system that I built for myself. Pi agent also has read-only access to gmail, and a memory system comprising of markdown files, organised into days and compacted every night.
  
-----
 I usually run the use cases above with my minimax-m3 subscription, which of course handles the tasks great. However, it is a cloud model, and more importantly, minimax has been having a bit of infrastructure challenge lately. I have random slowing down, suddenly aborted request mid-stream, very slow prompt processing. So, I wondered if any of the local model can run this complex setup.
 They do. Pretty well, actually. Since they are not the focus of this post, I'll just briefly shared what I tested:
  
Gemma 4 12B QAT (no MTP), full 262k context: ~1000tk/s prefill, ~20tk/s decode at deep context (above 65k): the most comfortable to use, speed-wise, due to the 1000tk/s prefill. Load skills correctly, gets most of the tasks done, but can get lazy when writing synthesis, and hallucinate tool calls (says that it completed task, without doing anything).
 Gemma 4 26B QAT (no MTP)
