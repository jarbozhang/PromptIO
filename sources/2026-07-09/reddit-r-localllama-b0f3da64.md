---
title: Qwen3.6-27b does not understand software architechure.
url: >-
  https://www.reddit.com/r/LocalLLaMA/comments/1uqzjdy/qwen3627b_does_not_understand_software/
source: Reddit r/LocalLLaMA
source_type: rss
language: en
published: '2026-07-08T17:31:13.000Z'
fetched_at: '2026-07-08T23:01:51.271Z'
---
Been using this for real software development for a commercial app. i.e. Not a single file HTML app. I mean a large scale 100k+ loc project that needs proper architecture to work with in a maintainable way.
 As much as I love Qwen3.6-27b. It just does not understand software architecture, it will happily write spaghetti code, mix concerns, and totally ignore any kind of test automation unless you explicitly ask it to do this. These are the bare minimum requirements for production code that can grow without complexity spinning out of control, but it simply ignores it and instead just writes enough to satisfy the request. (ignoring best practises). For example it will write super sized interfaces, ignore the single responsibility principle and make superman classes that nobody can read or understand.
 I've been trying and train it to understand how to write maintainable, readable code, but it almost feels like I am training a person who has never written a large scale app before.
 Does anyone have a set of SKILL.md files that already has fundamental software architectural concepts built into them? It would be enormously helpful.
    submitted by    /u/Civil_Fee_7862  
 [link]   [comments]
