---
title: 'INT3 compression+fused metal kernels [R]'
url: >-
  https://www.reddit.com/r/MachineLearning/comments/1ssdt0z/int3_compressionfused_metal_kernels_r/
source: Reddit r/MachineLearning
source_type: rss
language: en
published: '2026-04-22T06:54:24.000Z'
fetched_at: '2026-04-23T02:21:55.517Z'
---
Hey guys, I am a researcher and solo founder. I compress models with INT3 at +0.14 nats and built a 2-bit KV cache for long-horizon tasks. I shipped both (INT3 model + INT2 KV) with custom fused Metal kernels for Mac (M-series). Currently Qwen 7B is available in preview.
 #install brew install reinforceai/spiral/spiral #chat spiral-chat 
 I am optimizing kernels further and working on Triton kernels for GPU support. There is still more room to pack more efficiently, I will share more models soon. I will appreciate any feedback or any model you want me to compress within 100B parameters.
 github.com/ReinforceAI/spiral
    submitted by    /u/Financial_Buy_2287  
 [link]   [comments]
