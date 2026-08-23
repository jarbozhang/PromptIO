---
title: Deepseek v4 flash 0731 still not holding up.
url: >-
  https://www.reddit.com/r/LocalLLaMA/comments/1vct09w/deepseek_v4_flash_0731_still_not_holding_up/
source: Reddit r/LocalLLaMA
source_type: rss
language: en
published: '2026-08-01T17:16:45.000Z'
fetched_at: '2026-08-02T11:00:59.746Z'
---
The biggest issue with preview was its inability to follow rules prompts and skills. It seems like no matter what you do it ignores them. I've tried first person and second person. I've tried Chinese and English. It does not follow them. That's the only problem with these models and why they're not actually frontier level and not just benchmaxxed. Every user's environment is different and they need to tune the actions and behavior of the model with rules or prompts or skills to exactly what they need to do and if the model ignores then it acts subpar. The newest version of flash has the same issue as the preview version and that's unfortunate. 
 I run it native, full precision, locally. And I've held out making this post cause I know I'm going to get roasted to all fuck but when you can actually run the models locally and when you're not brainwashed by benchmarks and you actually code with them you see the holes. I'm going back to qwen 27b ugh
 Edit: I've seen two users provide credible information as to why deep-seek acts like this. I did some research and think I was able to verify it. It's been a rough 4 hours. Deepseek v4 stores rules/skills/prompts as compressed summaries, not raw text. 43 layers and 20 of them see the entire context at 128 tokens squeezed into a single entry. 21 see it at 4:1 and only two are fully dense. Every layer also gets the last 128 tokens uncompressed but that's only for the full resolution window and the prompt/skill/rule isn't in there lol. So they "survive" but the exact wording doesn't. There is a startup arg in vllm that might help. --hf--overrides '{"index_topk": 1024}'. In the 21 layers that stay 4:1 detail the model selects only 512 compressed entries per token about 2,048 tokens worth of fine detail from anywhere in the context raising this value to 1024 doubles that to 4,096 tokens. Now I asked opus 5 if this would solve the problem and opus said most likely not. I'm going to give it a go anyway though thanks for viewing my T
