---
title: Big News for AMD / Strix Halo+ Owners
url: >-
  https://www.reddit.com/r/LocalLLaMA/comments/1uegdu0/big_news_for_amd_strix_halo_owners/
source: Reddit r/LocalLLaMA
source_type: rss
language: en
published: '2026-06-24T15:16:34.000Z'
fetched_at: '2026-06-25T07:40:38.229Z'
---
Admittedly this is news for me, but I'm hoping it could be of some use to others here as well!
 So, THE NPU IS USABLE!!
 I've owned an AMD Ryzen 395 Max AI+ (or whatever the naming is lol) for about a year now and have relied solely on GGUFs and Vulkan. I acknowledge that the AMD Ryzen AI team has been working hard to get their ROCm software up to speed w/ their hardware.
 https://kyuz0.github.io/amd-strix-halo-toolboxes/
 This database did NOT look so ROCm friendly 6 months ago.
  
Why should I care?
 If you own a device w/ both an NPU and a iGPU (like the strix halo series) then you WANT hybrid models. The NPU is CRAZY FAST at PromptProcessing, and can run parallel to gpu firing.
 Okay, What is Hybrid Mode?
 So, LLMs can run through the NPU only. If they're built for it. Check out "FastFlowLM NPU" models for examples that do that. BUT HYBRID mode combines the best of both, and FINALLY utilizes the hardware purchased nearly a year go (for some, more than that).
 What can i do to test this?
 Download Lemonade! Thanks to their efforts that focus primarily on Ryzen AI and working directly w AMD, I've FINALLY got my machine working in ways it couldn't a year ago and Lemonade made it happen. It's GUI is ultra bare-bones and I wouldn't recommend it for any actual agentic/chat/harness usage BUT being able to sanity-test software without investing days or weeks into it?
  
10/10
 Here's the link: lemonade-server.ai
 Speaking of links, read more about Hybrid Mode and making your own Hybrid Models here: https://ryzenai.docs.amd.com/en/latest/llm/overview.html
 ---
 So, that's it. Just wanted to share. REALLY EXCITED that my year old computer is still advancing in the software science of it all.
 I have a single wishlist/request now: MTP-supported Hybrid Models. Qwen 3.6 has that speedup tech introduced by Unsloth, and AMD has a guide for "new processor shapes" since 3.6 GGUF can't simply be "converted to ONNX". Here's that guide: https://ryzenai.docs.amd.com/en/latest/oga_op
