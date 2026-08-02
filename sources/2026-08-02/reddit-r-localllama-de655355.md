---
title: >-
  PSA for DeepSeek-V4-Flash-0731 users — don't blow out your prompt cache with
  system role messages mid-conversation
url: >-
  https://www.reddit.com/r/LocalLLaMA/comments/1vdbgw5/psa_for_deepseekv4flash0731_users_dont_blow_out/
source: Reddit r/LocalLLaMA
source_type: rss
language: en
published: '2026-08-02T07:24:49.000Z'
fetched_at: '2026-08-02T11:00:59.751Z'
---
DSv4F doesn't ship a jinja, but for distributions that do and faithfully reconstruct what DS releases in their chat template python, every system message is hoisted into the system prompt at the top -- the format has no mid-conversation system turn. So, anything you stick at the tail or mid-convo actually fries your prefix (and doesn't have conversational proximity to the injection point).
 Use latest_reminder, which is the role DS trained for how most templates use system and what most people providing quants are passing through (if they match DS' python template). I use llama.cpp and it happily passes it through no issue; dunno how other engines work with it.
 Couldn't figure out why my prompt caching was so garbage and there it was, so I'm passing it on to hopefully save others time and frustration (and probably money, if you're using a hosted version).
    submitted by    /u/CharlesStross  
 [link]   [comments]
