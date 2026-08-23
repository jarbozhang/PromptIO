---
title: '“The All Spark” Cluster: Upgrading from 16 - 36 DGX Sparks'
url: >-
  https://www.reddit.com/r/LocalLLaMA/comments/1vvv7iv/the_all_spark_cluster_upgrading_from_16_36_dgx/
source: Reddit r/LocalLLaMA
source_type: rss
language: en
published: '2026-08-23T02:38:29.000Z'
fetched_at: '2026-08-23T11:01:37.684Z'
---
Earlier this year I posted about building what at the time I believe was the first 16x DGX Spark Cluster.
 I’m now adding 20 more Sparks to the cluster in my homelab server rack, giving me 4.6TB of unified memory.
 • 36x Sparks
 • 1x 200Gbps FS 24 x 200Gb QSFP56 + 8x 400Gb Switch
 • 24x QSFP56 DAC cables
 • 6x 400gb to 2x 200gb breakout cables
 Over the last 4+ months i’ve been running nearly every notable model that’s landed. The cluster however isn’t just being used to serve single inference points, I’ve split the cluster up to house “inference modules” that get managed into a single persistent agent using a combination of Hermes + a custom memory sidecar system i’ve built. It’s become an agent capability cluster more than just one big inference machine:
 I’m expanding the cluster to 36 now because I want 16 nodes dedicated to SOTA models such as Kimi K3 while being able to retain enough nodes to perform rerank/embeddings tasks, video generation, Image gen, audio processing etc all simultaneously. 
 Now, you may ask why not just buy 6000 Pros, or B200s or even a B300 and the answer comes down to a few reasons. 
 1) This server rack will also have 2 6000 pro systems (a 4x Max Q low power build + an 8x enterprise server) which replace my H100s and GH200 I had earlier in the year.
 2) B200/B300 for a homelab create substantial cooling and energy problems than even this currently absurd homelab and a big point of this build is to be completely sovereign with zero datacenter or third party storage reliance. 
 3) Sparks in my view are still the greatest value for scalable unified memory you can get. When M5 Ultras come out I think adding Mac Studios and investing in figuring out disaggregated inference will be a massive win.
 4) Sparks + 6000 Pros give massive flexibility for configuration, power optimization and relatively easier liquidity access when I want to offload and upgrade to something new
    submitted by    /u/Kurcide  
 [link]   [comments]
