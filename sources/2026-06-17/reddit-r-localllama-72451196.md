---
title: Be wary of Qwen/Claude distillations - they're often worse than the base model
url: >-
  https://www.reddit.com/r/LocalLLaMA/comments/1u7a2hn/be_wary_of_qwenclaude_distillations_theyre_often/
source: Reddit r/LocalLLaMA
source_type: rss
language: en
published: '2026-06-16T10:48:22.000Z'
fetched_at: '2026-06-17T03:03:11.626Z'
---
Just to be clear; I am not attempting to call anybody out or be mean to those who take the time/money to make these models, I just want to inform people about these distills/finetunes since there's clearly some confusion going on.
 I'm going to assume those of us who often visit this subreddit have noticed these models, particularly the "Qwopus" model and the such, though I'm sure there's probably Gemma 4/Claude distills too. As I type this, there's currently a Qwen 3.6 based Claude Fable 5 distillation model on the frontpage. Seems pretty cool, right?
 Yep. Up until you actually look into how these models were distilled. This new Fable distillation uses around 4,000 samples of Fable 5/Opus 4.8 to finetune Qwen 3.6 on. 4k samples is basically nothing when it comes to improving a models quality/performance. At best, it'll act slightly differently. But it certainly won't perform better than just running standard Qwen 3.6. If anything, it's actually likely to slightly degrade quality.
 Why? 4K samples is just not enough. And I am aware that Qwopus (or it may be another finetune called Qwen3.6-Claude-Opus.4.6-Distill iirc) has a version with ~8-10k samples used for the training rather than the 3-4K. Unfortunately that's still nowhere near enough to be actually meaningful.
 If anybody remembers the original DeepSeek-R1 LLaMa/Qwen distillations that were released by deepseek offiically back when the model first came out, around ~700,000 samples from R1 was used to create those distills. That's enough to not only impact behaviour, but actually improve benchmark scores.
 So, these Qwen + Claude models will have a slightly different reasoning style. They might feel "more Opus-like" chatting wise. But they are not performing better than their base Qwen models, and based on everything I've seen, a lot of people seem to think that's the case. Even with that Qwen/Opus distill that uses like 10K+ samples, that's still just not enough to transfer any sort of actual capability. The
