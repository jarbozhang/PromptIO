---
title: Has anyone actually made 64k feel like 300k+ with recursive local agents?
url: >-
  https://www.reddit.com/r/LocalLLaMA/comments/1vvt3c4/has_anyone_actually_made_64k_feel_like_300k_with/
source: Reddit r/LocalLLaMA
source_type: rss
language: en
published: '2026-08-23T00:54:06.000Z'
fetched_at: '2026-08-23T11:01:37.696Z'
---
I'm running Qwen 3.8 27B locally on a single GPU. I can push the context to 131k, but I'd rather run it faster at 64k if the agent can manage context properly.
 What I have in mind is pretty simple:
  
one model stays loaded the whole time
 main agent gets 64k
 when something is too big, it spawns a fresh child with only the task and context it needs
 if that child gets a 100k document, it can split the job again or spawn its own children
 children run sequentially, not 5 at once
 only findings/artifacts come back to the parent, not the whole trajectory
  
So a 300k task might become several 20k to 50k branches while the main agent never goes past 64k.
 Prime Agent and its RLM setup looks closest to what I'm describing. Hermes delegation also seems relevant. Maybe there are better projects I haven't found.
 Has anyone here actually run a local model this way for long coding, research, large documents, or general assistant work?
 I'm mainly curious about three things:
  
What harness handles this best today without a ton of custom plumbing?
 Can recursive decomposition be trusted to happen automatically, including a child realizing its own input is too large?
 In practice, how close can a well-managed 64k agent get to using a native 256k/1M context on tasks that can be broken apart?
  
I'm less interested in pure RAG. I'm trying to maximize the useful task horizon of one fast local model.
    submitted by    /u/TigerConsistent  
 [link]   [comments]
