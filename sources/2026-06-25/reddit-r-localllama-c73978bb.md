---
title: 'SDXL running locally in the browser on WebGPU, open-source'
url: >-
  https://www.reddit.com/r/LocalLLaMA/comments/1uemzsb/sdxl_running_locally_in_the_browser_on_webgpu/
source: Reddit r/LocalLLaMA
source_type: rss
language: en
published: '2026-06-24T19:15:49.000Z'
fetched_at: '2026-06-25T07:40:38.233Z'
---
I needed simple local image generation without the usual setup. No virtual environments, no ComfyUI with a complex graph and installation as an exe.
 So i tried to push the whole thing into the browser and run it on WebGPU. 
 It's a browser extension. You install it, then it loads model, and after that it runs on your own GPU, offline.
 It use text encoders, UNet, and VAE are ONNX graphs, running on the browser's WebGPU stack.
 Github: https://github.com/d0grr/generate-ai-images
 Firefox: https://addons.mozilla.org/en-US/firefox/addon/generate-ai-images/
 Chrome: https://chromewebstore.google.com/detail/generate-ai-images/agcbeefcfjkldpankmceehdhbpldakae
 Currently 2 models are supported:
  
SDXL-Lighting fp16(~7 GB storage)
 4-bit version for weaker cards(~3.6 GB storage)
  
Here are some rough points to give you an idea: when you load model in the browser, it freezes for about 10 seconds, and freezes in the end of generation. Reason - synchronous WebGPU shader compilation in Chrome's GPU process. A Web Worker doesn't help - bottleneck is the GPU process.
 Requirements:
  
You need a browser with WebGPU support(O RLY?) Chrome/Edge 122+ or the latest version of Firefox. 
 min ~7 GB, needs ~8 GB VRAM for SDXL-Lighting fp16
 or min ~3.6 GB, ~4-5 GB VRAM for 4-bit version SDXL-Lighting
  
As for speed, on my 14" MacBook M4, processing one image takes about 50-60 seconds.
 I started doing this just to see if it was even possible. It works, that's all. I wonder how it would work on other hardware.
    submitted by    /u/xoqq  
 [link]   [comments]
