---
title: >-
  Follow-up: DeepSeek V4 Flash on 2x RTX PRO 6000 finishes real coding tasks
  faster than Sonnet and Opus, at about Sonnet quality
url: >-
  https://www.reddit.com/r/LocalLLaMA/comments/1um84bd/followup_deepseek_v4_flash_on_2x_rtx_pro_6000/
source: Reddit r/LocalLLaMA
source_type: rss
language: en
published: '2026-07-03T07:55:54.000Z'
fetched_at: '2026-07-03T23:01:09.836Z'
---
This is a follow-up to post about which local models stay fast deep into long context and I learned a lot from people here. I kept measuring after that and it turned into a proper indie coding bench. With DeepSeek V4 Flash running on vLLM it lands around Sonnet quality and it finishes the whole task faster in wall-clock than Sonnet or Opus going over the API (Opus and Fable still wins at quality).
 DeepSeek lands around 2 min per task, and Sonnet 5 was the slowest of everything at ~6 min per task (roughly ~3x DeepSeek..!), the new sonnet while slow is very consistent and low randomness but takes a lot of turns to land. I've also included the Qwen 3.6 models as anchoring points as many people are familiar with these.
 I tested it the way we often use these models, the local models run in OpenCode and Claude Code for APIs, so different harness but part of every gap is not purely the model, and I didn't try to separate the two because the question was never which raw model wins in a vacuum, it was what you actually get when each is set up the way people really run it. Opus and Fable still take the best diffs by a clear margin, so for the single best answer that is where you go, but local models are actually really good now... and fast, if you manage to avoid dense attention!
 I went completely OTT in my benchmarking, lots of charts to enjoy and a detailed write up and full data sheets. https://nqawhc.github.io/articles/local-vs-api/ (multiple pages to explore here!)
 I've done all the foundational work for this now, so will be testing models again in the future as they drop.
    submitted by    /u/xquarx  
 [link]   [comments]
