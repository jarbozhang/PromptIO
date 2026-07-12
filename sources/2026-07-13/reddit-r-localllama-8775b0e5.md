---
title: 'Local Image to 3D (<2gb RAM, <20s, Apple Silicon, iPhone)'
url: >-
  https://www.reddit.com/r/LocalLLaMA/comments/1uuga40/local_image_to_3d_2gb_ram_20s_apple_silicon_iphone/
source: Reddit r/LocalLLaMA
source_type: rss
language: en
published: '2026-07-12T14:00:21.000Z'
fetched_at: '2026-07-12T23:01:41.970Z'
---
TLDR checkout the app here: github.com/ZimengXiong/Modelr
 My swift-mlx/python mlx port of Hunyuan3D-Paint and Hunyuan3D-Shape is finally complete! It's also available as a standalone image to 3D desktop app, the only of its kind for Apple Silicon. Some quick benchmarks in FP16 on my M4 Max:
  
 run wall time peak memory 
  
 hy3d shape (small) 20.9 s ~5.6 gb 
  hy3d shape (large) 22.3 s ~7.3 gb 
  hy3d paint (rgb) 231 s ~38 gb 
  hy3d paint (pbr) 344 s ~39 gb 
 
 This (MLX) makes it possible to run the model on all recent Macs and even iPhones in Q4 or Q8, and more efficiently w/o the overhead of pytorch or even worse, CPU. What you would do with this? I honestly don't really know, maybe simple 3D assets for apps that just rotate around, maybe? But it was a lot of fun seeing it come to life.
 I posted a while back about it running on an iPhone, if you want to see that.
 The app is very simple, import an image, remove background with SwiftVision, watch as diffusion streams in real time, get a model! From there you can watch texturing happen live as well. I tried to make it very responsive and the most polished version of an app that exists on Mac (well, it's the only one of its kind right now, and this is my fourth attempt of it, starting from November)
 If you are interested in integrating fast, low memory Image to 3D inside your Swift app, weights and source are available at github.com/ZimengXiong/Hunyuan3D-Swift
 The app, Modelr, is also open source and available for Mac & iOS (extremely limited for iOS): github.com/ZimengXiong/Modelr
    submitted by    /u/arduinoRPi4  
 [link]   [comments]
