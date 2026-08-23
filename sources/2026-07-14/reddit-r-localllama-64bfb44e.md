---
title: GLM 5.2 running on MacBook Pro M5 48 GB Ram at between 2 - 2.8t/s
url: >-
  https://www.reddit.com/r/LocalLLaMA/comments/1uvlhxl/glm_52_running_on_macbook_pro_m5_48_gb_ram_at/
source: Reddit r/LocalLLaMA
source_type: rss
language: en
published: '2026-07-13T19:26:45.000Z'
fetched_at: '2026-07-13T23:01:48.267Z'
---
I started reading about Flash MOE I have my own built Claude Desktop style app using Pi as the harness. Qwen3.6 27B is good but sometimes it falls short on some of the large codebases I work on so I wanted to see if I could get GLM 5.2 working on my machine with Flash MOE.
 Got to work with Claude and current benchmarks are 4.4k pre prompt with tools etc took 6m38s and push the 4.4k in and get 501 tokens out running at 2t/s
 When I use no pre prompt 400 tokens in and 337 out taking 3m17s.
 I have also seen 2.8t/s but it depends on what I am doing on my machine at the time.
 I might try and get it to plan tasks at night time and then try and run the plan with Qwen in the day. This is just an experiment but happy with the results so far.
 Using pipenetwork/GLM-5.2-MLX-mixed-3_6bit model which is 332 GB
 https://preview.redd.it/td1ow57rs1dh1.png?width=1592&format=png&auto=webp&s=157e94f4fc1030314db4dc2f1db5c85520fac089
 https://preview.redd.it/pea4777rs1dh1.png?width=1632&format=png&auto=webp&s=7c646d7584d52200929d1ac344c5833169542c88
    submitted by    /u/gutard  
 [link]   [comments]
