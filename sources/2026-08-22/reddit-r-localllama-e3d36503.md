---
title: Qwen 3.8 27b is strong even at Q3_xxs
url: >-
  https://www.reddit.com/r/LocalLLaMA/comments/1vugryn/qwen_38_27b_is_strong_even_at_q3_xxs/
source: Reddit r/LocalLLaMA
source_type: rss
language: en
published: '2026-08-21T13:43:39.000Z'
fetched_at: '2026-08-22T11:01:33.605Z'
---
So usually I avoid Q3 quants because I have had bad experiences with it, models were usually too degraded, so the smallest I normally do is Q4, since I only have rtx 4060 ti 16gb. But since there hasn't been a 35b-3ab released yet, I had to try it. I don't use LLMs in agentic workflows, just on Textgen since I'm not a coder so this is not the primary use case of LLMs for me - but sometimes I really need some coding capabilities or help.
 I'm very impressed how it one shot multiple serious coding tasks, resulting in fully working games or web apps, whereas Qwen 3.6 35b (which I used before) either completely failed in some of these or struggled a lot and needed hours/days of assistance/prompting, feedback to make it work.
 And it is very fast when fully in VRAM. 30-35t/s, basically the same speed as higher quant 35b offloaded to RAM! Only at long context it goes down to 21-22t/s. Older dense models like Gemma 3 27b, Mistral small 24b are only doing 13-17t/s at best.
 The only thing I noticed is it sometimes misunderstands things during regular convos or fails at basic sorting or counting few scores, while one shotting serious math/logic tasks. Not sure if this is because it's code-maxxed or because of the low quant (I'd think it's heavily the latter but I'd be interested in your guys' experiences who can run this at higher quants).
 So far I'm very happy with it, it's way better than the higher Q4-Q5 MoEs I've tried so far.
    submitted by    /u/AltruisticList6000  
 [link]   [comments]
