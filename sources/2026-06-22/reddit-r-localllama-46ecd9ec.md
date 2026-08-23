---
title: Why is AutoRound being slept on so hard?
url: >-
  https://www.reddit.com/r/LocalLLaMA/comments/1ublwmp/why_is_autoround_being_slept_on_so_hard/
source: Reddit r/LocalLLaMA
source_type: rss
language: en
published: '2026-06-21T09:43:24.000Z'
fetched_at: '2026-06-22T04:12:20.731Z'
---
Seriously, why is almost nobody talking about AutoRound here?
 I’ve been experimenting with it on Qwen3.6 27B lately (running an AMD setup), and the perplexity/accuracy retention at low bits absolutely blows standard AWQ or RTN out of the water. Especially for models with complex reasoning or long contexts, it seems like a total cheat code.
 Yet, if you look at Hugging Face, almost every major model cook is still dumping standard AWQ or basic GGUF scripts.
 Is it just a bad branding issue because Intel’s name is on the repo and people think it’s vendor-locked to Gaudi or Arc? (It’s literally just PyTorch, it runs fine anywhere). Or is the 15-minute calibration time too much of a UX hassle for the mass-uploaders?
 Now that AutoRound natively exports directly to standard GGUF (bypassing llama.cpp's convert_hf_to_gguf.py which usually throws a NotImplementedError), there’s basically no reason not to use it.
 Am I missing something here? Is there a hidden downside or regression in inference speed that I haven't noticed? Would love to hear from anyone else who's actually baking these quants.
    submitted by    /u/Mountain_Patience231  
 [link]   [comments]
