---
title: Voodoo Quant beats Unsloth Dynamic 2.0 KLD by 95% in Qwen3.5 0.8B and 2B
url: >-
  https://www.reddit.com/r/LocalLLaMA/comments/1uua3jd/voodoo_quant_beats_unsloth_dynamic_20_kld_by_95/
source: Reddit r/LocalLLaMA
source_type: rss
language: en
published: '2026-07-12T08:52:41.000Z'
fetched_at: '2026-07-12T23:01:41.974Z'
---
Hey all, here are two new high performance qwen3.5 gguf sets I created using a new state of the art technique for optimizing mixed precision called Voodoo Quant.
 https://huggingface.co/voodooquant/Qwen3.5-0.8B-MTP-Voodoo
 https://huggingface.co/voodooquant/Qwen3.5-2B-MTP-Voodoo
 Voodoo Quant operates on the same lines as Unsloth Dynamic in that it is simply picking higher precision numerics for more important parts of the model. The main difference with Voodoo is it optimizes every tensor in the model versus blocks of tensors for UD, and it uses a new methodology for that optimization.
 Here are graphs and tables for easier browsing for the remainder of this post:
 Https://voodooquant.com
 The 95% KLD improvement figure I mentioned is eye catching, but if you look at the graphs, there is a more interesting and realistic story which explains how 95% is possible. Let me tell you about it.
 You will notice that there are two KLD graphs for each model, one for Torch and one for Llama.cpp. These two graphs differ because each software has a different graph structure used to organize their math, with Torch generally considered to have a more precise graph. What you will notice is that Voodoo performs well in both where the best previous quants, from Unsloth, perform well in Llama but fall flat in Torch.
 Doing especially well in Llama.cpp isnt a bad thing in itself because we use ggufs in llama.cpp, so we want llama.cpp performance to be optimized. However, you'll notice that where Voodoo has competitive performance in both graphs, Unsloth has excessively poor performance in Torch. This means Unsloth's methodology overfits for Llama.cpp in a way that might not be desirable.
 Obviously Unsloth quants work great in Llama.cpp, and this is the most important domain for GGUFs, so how important this is is debatable. However, it does mean their models have some burrs around the edges, and the extent of that is hard to say. The burrs may even include cases in Llama.cpp.
 So with
