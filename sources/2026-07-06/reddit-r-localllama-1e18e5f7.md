---
title: LivePortrait distilled model that can run at 25fps in the browser
url: >-
  https://www.reddit.com/r/LocalLLaMA/comments/1uodoli/liveportrait_distilled_model_that_can_run_at/
source: Reddit r/LocalLLaMA
source_type: rss
language: en
published: '2026-07-05T21:12:53.000Z'
fetched_at: '2026-07-05T23:01:37.130Z'
---
This began as me attempting to run the ONNX version of LivePortrait (https://github.com/KlingAIResearch/LivePortrait) in Chrome with WebGPU. It took 30 seconds to generate a single frame. I investigated a few different options to improve performance, but eventually decided it would be fun to try to distill that model into something much smaller. 
 Linked is a demo of the first proof-of-concept version of the distilled model. On my 5090, a frame takes less than 30ms to generate and runs 100% in the browser. Quality is just ok and some portraits will work better than others simply because I trained this using a small number of portraits and only trained for a few hours. I’d love to hear how quickly (or not!) frames are rendering for others with different GPUs.
    submitted by    /u/stephen_holograf  
 [link]   [comments]
