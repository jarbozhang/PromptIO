---
title: Gemma 4 12B - MLX Kernel
url: 'https://www.reddit.com/r/LocalLLaMA/comments/1uneztp/gemma_4_12b_mlx_kernel/'
source: Reddit r/LocalLLaMA
source_type: rss
language: en
published: '2026-07-04T17:34:00.000Z'
fetched_at: '2026-07-04T23:01:32.107Z'
---
I've mentioned this kernel project I was working on in a few posts and figured I would just open the project code for anyone curious: MLX Gemma 12B
 The main constraints for this on my end is an M5 16GB Macbook Pro. I usually do a model development on clusters in the cloud but have been playing with more smaller local models with SFT and fine tuning. Under the hood the MLX and CUDA libraries are not far off in trying to work with some of the models. 
 Last night I attempted to integrate DSpark but the drafter model and weights eat to much RAM at the 16GB threshold so I may look to train or quantize their drafter for Gemma 12B. 
 Today the focus is on getting the native graph stuff finished out and the MTP fully validated against it. 20-30 tok/s is about the theoretical max on a good MTP workload given the bandwidth of memory in these machines. I'll probably use this work as a jump off point to further optimize the Gemma class models on NVIDIA based hardware this week and see what levers can be tuned there.
 Lastly this is a heavy work in progress and "experimental" for the sake of learning the guts of these models and how to run them. It works but I have no plans to productize this outside my own personal use case of hosting these Gemma models locally.
    submitted by    /u/HVACcontrolsGuru  
 [link]   [comments]
