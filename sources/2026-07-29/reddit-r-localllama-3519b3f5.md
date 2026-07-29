---
title: 'A 5B-active model doesn''t know much, and I''ve stopped counting that as a flaw'
url: >-
  https://www.reddit.com/r/LocalLLaMA/comments/1v952ka/a_5bactive_model_doesnt_know_much_and_ive_stopped/
source: Reddit r/LocalLLaMA
source_type: rss
language: en
published: '2026-07-28T17:25:51.000Z'
fetched_at: '2026-07-29T11:01:19.466Z'
---
Bit of a change of mind post.
 I skipped the low active param stuff for a while because every one I tested failed the same way. Ask it something slightly obscure and it invents a plausible answer with complete confidence. Ling-3.0-flash is the one I've had running lately and it does this too. 124B total but only about 5B firing per token, so there just isn't much in there.
 What changed my mind is that I was testing it wrong. I was checking whether it knew things. In the loop I actually run it in, it never needs to know anything, it needs to go find out. Docs are on disk, the API reference is a fetch away, the codebase is right there. Knowledge that lives in weights is knowledge I can't update and can't audit.
 So the property I care about now is whether it calls the tool instead of guessing. That's a different thing and it's one you can train for, and the small ones seem better at it than their size suggests, probably because they were pointed at that rather than at trivia.
 Where this falls apart, to be fair to the objection. It has to know enough to know it doesn't know. When it's confident and wrong there's no tool call to intercept, it just answers. I've watched it invent a library API rather than grep for it. A rule that says look it up first helps a lot and doesn't fully fix it.
 The version I'd actually want is a small model explicitly trained to bail out to a tool on low confidence, and I don't know whether anyone is doing that on purpose or whether we're all getting it as a side effect of tool calling RL.
 Is anyone selecting models this way rather than on knowledge benchmarks? MMLU tells me nothing about whether the thing will grep
    submitted by    /u/AcanthisittaOk1699  
 [link]   [comments]
