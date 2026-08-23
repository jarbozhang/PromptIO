---
title: Gemma 4 26B A4B running on iPhone 17 Pro via model paging
url: >-
  https://www.reddit.com/r/LocalLLaMA/comments/1v5p5sf/gemma_4_26b_a4b_running_on_iphone_17_pro_via/
source: Reddit r/LocalLLaMA
source_type: rss
language: en
published: '2026-07-24T21:47:40.000Z'
fetched_at: '2026-07-25T11:01:40.187Z'
---
Hi everyone,
 Before I begin, I should mention that the system I'm showcasing was developed by the team at Noema, which I founded. 
 I wanted to show a use case for Noema Overfit available today in the Noema app. As you can see, I have a Q4_K_M version of the Gemma 4 26B A4B running on the iPhone 17 Pro via paging. What this means is that non-expert weights are held in RAM while the experts of the model are read from the SSD. This allows these big models to run on an iPhone with the tradeoff being slower token generation speed and TTFT. I would still say TTFT is pretty respectable for this method because the initial prompt size was 699 tokens. This yields:
 Prefill speed: 34.4tk/s
 Prefill time: 20.34s
 Decode speed: 3.5tk/s
 It did take around 6 minutes for the answer to be done, but it is correct and in cases where answer accuracy matters more than quick answers, this system could be quite helpful.
 Let us know if you can see this feature having any value! It is also helpful for low RAM MacBooks. 
 More info at https://noemaai.com/overfit and models are at https://huggingface.co/NoemaAI-labs/Noema-Overfit
    submitted by    /u/Agreeable-Rest9162  
 [link]   [comments]
