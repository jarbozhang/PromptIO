---
title: 'Gemma4 26b & E4B are crazy good, and replaced Qwen for me!'
url: >-
  https://www.reddit.com/r/LocalLLaMA/comments/1smh0ny/gemma4_26b_e4b_are_crazy_good_and_replaced_qwen/
source: Reddit r/LocalLLaMA
source_type: rss
language: en
published: '2026-04-15T19:56:10.000Z'
fetched_at: '2026-04-16T06:06:04.165Z'
---
My pre-gemma 4 setup was as follows:
 Llama-swap, open-webui, and Claude code router on 2 RTX 3090s + 1 P40 (My third 3090 died, RIP) and 128gb of system memory
 Qwen 3.5 4B for semantic routing to the following models, with n_cpu_moe where needed:
 Qwen 3.5 30b A3B Q8XL - For general chat, basic document tasks, web search, anything huge context that didn't require reasoning. It's also hardcoded to use this model when my latest query contains "quick"
 Qwen 3.5 27b Q8XL - used as a "higher precision" model to sit in for A3B, especially when reasoning was needed. All simple math and summarization tasks were used by this. It's also hardcoded to use this model when my latest query contains "think"
 Qwen 3 Next Coder 80B A3B Q6_K - For code generation (seemed to have better outputs, but 122b was better at debugging existing code)
 Qwen 3.5 122b UD Q4KXL (no reasoning) - Anything that requires more real world knowledge out of the box 
 Qwen 3.5 122b Q6 (reasoning) - Reserved for the most complex queries that require reasoning skills and more general knowledge than Qwen 3.5 27b. It's also hardcoded to use this model when my latest query contains "ultrathink"
 This system was really solid, but the weak point was at the semantic routing layer. Qwen 3.5 4B sometimes would just straight up pick the wrong model for the job sometimes, and it was getting annoying. Even simple greetings like "Hello" and "Who are you?" Qwen 3.5 4B would assign to the reasoning models and usually the 122b non-reasoning. It also would sometimes completely ignore my "ultrathink" or "quick" override keywords, No matter the prompting on the semantic router (each model had several paragraphs on what use cases to assign it too, highlighting it's strengths and weaknesses, etc) I ended up having to hardcode the keywords in the router script.
 The second weak point was that the 27b model sometimes had very large token burn for thinking tokens, even on simpler math problems (basic PEMDAS) it would overthink, 
