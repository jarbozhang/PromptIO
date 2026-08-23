---
title: >-
  Scaling former VibeThinker-1.5B to 3B — now it reaches frontier math & coding
  performance
url: >-
  https://www.reddit.com/r/LocalLLaMA/comments/1u7dzdr/scaling_former_vibethinker15b_to_3b_now_it/
source: Reddit r/LocalLLaMA
source_type: rss
language: en
published: '2026-06-16T13:44:39.000Z'
fetched_at: '2026-06-17T03:03:11.627Z'
---
https://preview.redd.it/obgodr9dfn7h1.png?width=1796&format=png&auto=webp&s=b5fd95e2b7e6f8ed7704e3de66778e970d34a1dd
  
We trained VibeThinker-3B to test how far verifiable reasoning can be pushed in a strict small-model regime.
 It gets 94.3 on AIME'26, 80.2 on LiveCodeBench v6, 76.4 on IMO-AnswerBench, and 93.4 on IFEval.
 On recent unseen LeetCode weekly/biweekly contests, it passes 123/128 first-attempt Python submissions, or 96.1% overall.
 Small models are not just cheaper substitutes. In parameter-dense domains with clear verification signals, SLMs offer a path to frontier-level reasoning that complements traditional Scaling Law. Though it still has limitations in broader practical and general-purpose use cases, we will keep improving these areas in future versions.
  
We’d love for the community to test it on your own math/coding/OOD tasks and share failures or feedback.
 Paper: paper link
 Eval setting in the report: vLLM/Sglang, temp=1.0, top_p=0.95, top_k=-1.
    submitted by    /u/Used-Negotiation-741  
 [link]   [comments]
