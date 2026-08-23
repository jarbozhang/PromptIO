---
title: Working around Qwen3.6-27B's tool-call failures and looping
url: >-
  https://www.reddit.com/r/LocalLLaMA/comments/1uue278/working_around_qwen3627bs_toolcall_failures_and/
source: Reddit r/LocalLLaMA
source_type: rss
language: en
published: '2026-07-12T12:24:34.000Z'
fetched_at: '2026-07-12T23:01:41.979Z'
---
Let's start a discussion about what can be done to make local models more reliable.
 I've been using Qwen3.6-27B a lot lately, and have noticed the same thing that many others talk about here, which is the tool-call failures and looping that really gets in the way of being able to use what is otherwise a pretty intelligent mode as a fully local stand-in for some of the frontier models.
 I found that I have to watch it like a hawk constantly, otherwise it'll start to loop after a while, or just randomly stop with a tool-call hallucination.
 I managed to work around this issue by creating an extension to the Pi coding agent, that monitors the JSON stream for looping, as well as checking to see if the user's goal has been reached, and if it hasn't and the main model has stopped, then it'll automatically inject some prompts encouraging the model to continue.
 That was my attempt to solve the issue and it seems to work pretty well. I can now reasonably safely walk away from it when it's working on a large task when I turn my extension on, and I've seen it kick in and keep the model going when it gets off track.
 I'm sure I'm not alone, and in this world of everyone writing their own coding agents, I'm wanting to know what others are using to get around these quirks of local models, or are you all just using paid models, or watching the monitor constantly, when you want to be sure that a job gets done?
 Edit: A number of users have pointed out that this chat template has fixed common looping/tool-call failure issues: https://huggingface.co/froggeric/Qwen-Fixed-Chat-Templates
    submitted by    /u/Look_0ver_There  
 [link]   [comments]
