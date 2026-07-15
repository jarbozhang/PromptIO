---
title: RL post-training on 14 Macs across 4 countries
url: >-
  https://www.reddit.com/r/LocalLLaMA/comments/1uxb3zn/rl_posttraining_on_14_macs_across_4_countries/
source: Reddit r/LocalLLaMA
source_type: rss
language: en
published: '2026-07-15T16:36:43.000Z'
fetched_at: '2026-07-15T23:01:42.665Z'
---
Disclosure: I work at Pluralis Research, the lab that built this. Code is open, and I'm happy to answer questions.
 TL;DR: As far as we can tell, this is the first RL post-training run whose entire rollout fleet ran on consumer Macs over the open internet.
 Setup
 14 Macs across 4 countries generated every rollout. Each ran int8 inference with MLX, while a single B200 on another continent performed the bf16 gradient updates.
 They synchronized only through Cloudflare R2 over ordinary home internet. No datacenter interconnect. One of the machines was my MacBook.
 This matters because rollout generation accounts for roughly 80% of the compute in agentic RL.
 The challenging part
 The difficult part wasn't generating tokens on Macs. The bf16 Megatron trainer (B200) was using rollouts produced by weights that were a few versions stale, quantized to int8, and running through a different kernel stack.
 Two pieces kept that off-policy gap under control:
  
PULSE sends int8 weight deltas rather than full checkpoints. Only about 0.5% of int8 values change between versions, so the typical transfer was roughly 82 MB instead of 9 GB.
 A DPPO-style probability gate removes the roughly 0.3% of tokens whose probabilities drift too far between the rollout model and trainer.
  
Result
 We tested Stoa on PaperSearchQA, a multi-turn biomedical search task.
 On the full validation set, cover pass@1 increased from 29% to 63%, while search rate increased from 22% to 84%.
 It learned to use the tool.
 Limits and direction
 Stoa currently requires the model to fit on one Mac, and the trainer is limited to one cluster.
 Pluralis's Agora recently finished pretraining Pluralis-8B across hundreds of consumer GPUs using pipeline parallelism over the open internet. Combining Agora with Stoa could move both large-model inference and training onto distributed consumer hardware.
 The aggregate idle consumer compute is already larger than the clusters behind today's frontier models combined. As the 
