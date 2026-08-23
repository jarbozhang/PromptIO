---
title: >-
  The difference between "medium" and "xhigh" reasoning effort for Qwen3.8-27B
  is actually insane.
url: >-
  https://www.reddit.com/r/LocalLLaMA/comments/1vohpc8/the_difference_between_medium_and_xhigh_reasoning/
source: Reddit r/LocalLLaMA
source_type: rss
language: en
published: '2026-08-14T19:55:33.000Z'
fetched_at: '2026-08-15T11:01:21.074Z'
---
I'm currently testing out Qwen3.8-27B using Unsloth's UD-Q4_K_XL running a freshly rebuilt llama.cpp. I have a 22GB RTX 2080TI on which I'm able to fit 100k context with q8_0 quantization, and using MTP with --spec-draft-n-max 4 I get about 40tk/s which is slightly less than Qwen3.6-27B but usable enough.
 I've been trying to test out some admittedly silly one shot prompts using the llama.cpp webui by asking the model to create fully functional HTML clones of flappy bird, pacman and such, and the difference that changing reasoning_effort makes has been surprising to say the least.
 Setting it to "medium" seems to result in barely any thinking at all, a couple thousand tokens max and even less than 3.6-27B. Whereas when using "xhigh seems" I get 15k to 20k thinking tokens at the very least with the pacman example actually hitting 40 thousand fucking tokens.
 I'm well aware I can limit the reasoning budget in llama.cpp but I'm wondering if this is expected model behavior or if something is broken somewhere. Any of you guys seeing this?
    submitted by    /u/SarcasticBaka  
 [link]   [comments]
