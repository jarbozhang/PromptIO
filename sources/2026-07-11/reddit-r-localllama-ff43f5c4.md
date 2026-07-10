---
title: The untuned 27B beat the tuned 75B as an agent
url: >-
  https://www.reddit.com/r/LocalLLaMA/comments/1us8x06/the_untuned_27b_beat_the_tuned_75b_as_an_agent/
source: Reddit r/LocalLLaMA
source_type: rss
language: en
published: '2026-07-10T01:00:31.000Z'
fetched_at: '2026-07-10T23:01:38.130Z'
---
I have to admit, a lot of people we're 100% correct to make the suggestion to try this model. I am sorry I ever doubted. 
 The 27B passed every agentic task on a neutral system prompt in 6-9 tool calls. The 75B needed a hand-tuned profile to pass at all and used 2x the turns. For agents, fewer turns beat faster tokens.
 The two contenders
 - Nemotron Puzzle-75B-A9B NVFP4, vLLM, PP=2000 across 3 cards, ~65 t/s decode. I made a post about this model. I still think its good for throughput on chatbots and average users.
 - Qwen3.6-27B-INT8-AutoRound (W8A16), vLLM TP=2 on the two x4 cards, 131K ctx, fp8 KV. 37.7 t/s fresh, ~26 t/s deep ctx, 764 t/s prefill observed at 76K tokens. God-tier when MTP starts getting excepted at a high rate and then we got up to 72 tok/s!!!
 ## Result
 The 27B passed everything untuned: 6-9 tool calls, 134-190s per task. The 75B was a coin flip until I hand-tuned its system prompt, and even passing it needed 13-23 calls and 221-384s. Half the decode speed, half the wall time — the model that wastes fewer turns wins.
 ## The trap that ate an evening
 Byte-identical agent runs failed 6/6 — model emitted mangled tool-call XML at turn 0 and the parser gave up. Same server, same exact payload passed 2/2 an hour later after cache churn. Prime suspect is prefix caching (fp8 KV) serving the same bad prefix to every identical retry — can't prove it, but a per-run nonce line in the system prompt made it unreproducible and also makes bench reps statistically independent again. If you bench with prefix caching on, identical retries are not independent samples.
 If you are on Ampere cards and haven't tried the new vLLM merge with NVFP4 and INT8, you owe it to your codebase and yourself to try it over llama.cpp.
    submitted by    /u/Important_Quote_1180  
 [link]   [comments]
