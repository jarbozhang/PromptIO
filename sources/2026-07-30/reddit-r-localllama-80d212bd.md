---
title: >-
  Understand Kimi K3 from first principles: a recommended order for anyone
  trying to understand this beast
url: >-
  https://www.reddit.com/r/LocalLLaMA/comments/1v9vnpk/understand_kimi_k3_from_first_principles_a/
source: Reddit r/LocalLLaMA
source_type: rss
language: en
published: '2026-07-29T13:05:37.000Z'
fetched_at: '2026-07-30T11:01:46.423Z'
---
Everyone is talking about Kimi K3, but if you jump straight into the technical report, you’ll quickly realize it’s standing on years of research -- just like any breakthrough is!
 If you want to understand the work put into it by the Kimi team, here’s the reading order I’d recommend.
  
Linear Transformers Are Secretly Fast Weight Programmers
  
This is the foundation.
 The paper provides one of the most influential interpretations of linear attention, showing that many linear attention mechanisms can be viewed as fast weight programmers. Instead of thinking of attention purely as pairwise token interactions, it frames linear attention as a system that continuously updates an associative memory.
 Without understanding this perspective, it’s difficult to appreciate why modern linear-attention architectures have become competitive again.
  
Gated DeltaNet (arXiv:2412.06464)
  
Once you’re comfortable with linear attention, move on to Gated DeltaNet.
 This paper introduces the gated delta update mechanism, improving how state is updated over long sequences. Rather than using fixed update rules, the model learns when and how much information should be written into memory.
 Many of the ideas that later appear in Moonshot AI’s work build directly on these state-update concepts.
  
Kimi Linear / Kimi Delta Attention (KDA)
  
This is where Moonshot AI introduces the architecture that ultimately becomes the backbone of Kimi K3.
 Kimi Linear presents Kimi Delta Attention (KDA), a hybrid linear-attention architecture designed to combine the efficiency of linear attention with competitive or better performance than full attention across short contexts, long contexts, and reinforcement learning settings.
 Understanding KDA is essential because Kimi K3 is built on it.
  
LatentMoE (arXiv:2601.18089) → Stable LatentMoE
  
Kimi K3 isn’t just about attention.
 It also significantly advances the Mixture-of-Experts (MoE) design.
 Start with LatentMoE, which introduces a latent-space r
