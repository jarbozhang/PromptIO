---
title: 'Marco-Mini (17.3B, 0.86B active) and Marco-Nano (8B, 0.6B active) by Alibaba'
url: >-
  https://www.reddit.com/r/LocalLLaMA/comments/1sgzt0p/marcomini_173b_086b_active_and_marconano_8b_06b/
source: Reddit r/LocalLLaMA
source_type: rss
language: en
published: '2026-04-09T19:33:37.000Z'
fetched_at: '2026-04-10T00:43:27.394Z'
---
Looks like these were released six days ago. Did a search and didn't see a post about them. 
 https://huggingface.co/AIDC-AI/Marco-Mini-Instruct
 https://huggingface.co/AIDC-AI/Marco-Nano-Instruct
 Pretty wild parameter/active ratio, should be lightning fast.
  
Marco-Mini-Instruct is the instruction-tuned variant of Marco-Mini-Base, a highly sparse Mixture-of-Experts (MoE) multilingual language model from the Marco-MoE family, developed by Alibaba International Digital Commerce. It activates only 0.86B out of 17.3B total parameters (5% activation ratio) per token. Marco-Mini-Instruct achieves the best average performance across English, multilingual general, and multilingual cultural benchmarks when compared against instruct models with up to 12B activated parameters, including Qwen3-4B-Instruct, Ministral3-8B-Instruct, Gemma3-12B-Instruct, LFM2-24B-A2B, and Granite4-Small-Instruct.
  
  
Marco-Nano-Instruct is the post-trained variant of Marco-Nano-Base, a highly sparse Mixture-of-Experts (MoE) multilingual language model from the Marco-MoE family, developed by Alibaba International Digital Commerce. It activates only 0.6B out of 8B total parameters (7.5% activation ratio) per token. Despite its extreme sparsity, Marco-Nano-Instruct achieves the best average performance across English, multilingual general, and multilingual cultural benchmarks among all comparable instruct models up to 3.84B activated parameters.
  
https://xcancel.com/ModelScope2022/status/2042084482661191942
 https://pbs.twimg.com/media/HFbvyB-WsAAayv1.jpg?name=orig
  
Meet Marco-Mini-Instruct: a highly sparse MoE multilingual model from Alibaba International. 17.3B total params, only 0.86B active (5% activation ratio). 🚀
 Beats Qwen3-4B, Gemma3-12B, Granite4-Small on English, multilingual general, and cultural benchmarks — with a fraction of their active params.
 🌍 29 languages: Arabic, Turkish, Kazakh, Bengali, Nepali and more
 🧠 256 experts, 8 active per token. Drop-Upcycling from Qwen3-0.
