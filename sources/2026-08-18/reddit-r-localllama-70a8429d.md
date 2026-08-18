---
title: >-
  Qwen 3.8 27B Overthinking, It has to be done, it has to be overthinking to
  punch Opus 4.6
url: >-
  https://www.reddit.com/r/LocalLLaMA/comments/1vqvrh0/qwen_38_27b_overthinking_it_has_to_be_done_it_has/
source: Reddit r/LocalLLaMA
source_type: rss
language: en
published: '2026-08-17T15:36:49.000Z'
fetched_at: '2026-08-18T11:02:01.162Z'
---
Yes, it sucks to waste time waiting on 16K+ reasoning tokens alone. But here's the thing, this is only a 27B model trying to perform on par with 1T+ parameter models. Something has to be sacrificed, and that sacrifice is the amount of reasoning or trajectory tokens.
 This isn't new to LLMs whatsoever. Andrej Karpathy himself has said that LLMs need tokens to think. He mentioned this somewhere in his "Let's build GPT" / GPT video series, although I don't remember exactly when, if i am not mistaken it is when he showed Llama base model
 SWE-Rebench also pointed this out:
 https://swe-rebench.com/?insight=feb_2026
 "Qwen Next, and Step 3.5 as well, are extreme examples of requiring a huge number of tokens". FYI, Qwen Next was also the first Qwen model with GDA. SWE-Rebench notes that it "averages about 8.12M tokens per problem."
 Another side tangent is VibeThinker 3B. That model is purpose-built for solving logic and math problems, not agentic workloads or tool calling. I've personally tested it, and it's basically a grad level math model crammed into 3B parameters. But again, it absolutely loves munching tokens. And again, it's a 3 fucking billion parameter model. I can fucking run this thing on my phone, for God's sake.
 As for expectations, before the LLM storm, finding and fixing a bug could easily take 3 hours, sometimes even days or weeks. Now, with a n-shot prompt, it can often be done in under an hour. I assume most of us came from GPT / Claude models first before stumbling into local models like these, so we've been spoiled by fast token generation.
 Idk about you guys, but of my use cases are actually daily search tasks. I'm probably going to use Gemma 4 26B A4B, or hell, even good old GPT-OSS 20B (This post's grammar itself has been corrected by my GPT OSS), because when I look at my token usage in the gateway, most of it is RAG and code search rather than actual code generation.
 Wasting tokens is wasting time, sure, but you can do other things while Qwen 
