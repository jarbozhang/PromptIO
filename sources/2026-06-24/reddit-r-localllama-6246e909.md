---
title: >-
  Is it possible to run a giant model like GLM5.2 on this cluster (4x servers
  with 512GB RAM + dual AMD Epyc)? 16 channel memory should hit 409GB/s per
  node.
url: >-
  https://www.reddit.com/r/LocalLLaMA/comments/1udo429/is_it_possible_to_run_a_giant_model_like_glm52_on/
source: Reddit r/LocalLLaMA
source_type: rss
language: en
published: '2026-06-23T17:46:33.000Z'
fetched_at: '2026-06-24T01:27:25.847Z'
---
Hey all,
 I have a piece of hardware laying around which is pretty fast from a traditional (non-GPU) server viewpoint. The hardware is the following:
  
Dell C6525 Server with Quad Node (4x server blades) with the following:
 2x AMD EPYC 7702 64-Core Processors
 8 memory channels per socket so 16 channels total 512 GB of DDR4 RAM 3200MT/s
 NOTE: Math'd out, 16 channels of 3200MT/s is 409.6 GB/s total memory bandwidth
 24x 3.84TB SATA12G SSDs (6 per server) 12GB each so pretty fast
 Zero GPU
 4x Broadcom BCM57504 NetXtreme-E 10Gb/25Gb/40Gb/50Gb/100Gb/200Gb Ethernet (it does support RDMA)
 The above is PER server and there are four. So 2TB ram total
  
I've seen some videos about clustering a larger model across multiple servers for either a) Model token speed, or b) Loading larger model sizes
 I think in my example, is it possible to cluster all 4 systems to run Unsloth 4bit GLM 5.2 (467GB) on each system somehow, for token speed? Or what about making 2x clusters, with each cluster loading Unsloth GLM 5.2 8bit (820GB) for both speed and larger models?
 The end result is I want to load up a big model like GLM 5.2 as fast as possible on this hardware. I know it is CPU only, but the memory should hit 409GB/s per node, so it should be somewhat OK, especially if spread across 4 nodes. I just want to see the best possible with this hardware and then test it using typical agentic coding harnesses.
 Any idea on how I would go abouts doing this? 
 HUGE thanks in advance for all your feedback/advice!
    submitted by    /u/StartupTim  
 [link]   [comments]
