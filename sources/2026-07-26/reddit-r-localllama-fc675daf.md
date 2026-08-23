---
title: LFM 2.5 230M running at 1440 tok/s in-browser through a custom backend
url: >-
  https://www.reddit.com/r/LocalLLaMA/comments/1v6e0uq/lfm_25_230m_running_at_1440_toks_inbrowser/
source: Reddit r/LocalLLaMA
source_type: rss
language: en
published: '2026-07-25T17:14:44.000Z'
fetched_at: '2026-07-26T11:00:55.541Z'
---
Everything runs through WebGPU, in-browser or in electron/tauri apps. It's fully portable and supports either Nvidia and Apple Silicon (Metal). The actual kernels are optimized for the specific hardware of the device. The Nvidia kernels are aggressively fused into a multi-pass architecture, while the Apple Silicon kernels are created as a fused mega-kernel to minimize the Tile Based Deferred Rendering (TBDR) overhead on WebGPU. 
 Demo: https://warp.sipp.sh
  
  RTX 3090 (webgpu) M4 (webgpu) 
  
 LFM 2.5 230M 1400-1500 tok/s 400-500 tok/s 
  Bonsai 1.7B 500-600 tok/s 100-150 tok/s 
 
 This is still in active development, and I'll be folding this into the Sipp library in the coming weeks. 
    submitted by    /u/lordhiggsboson  
 [link]   [comments]
