---
title: >-
  The idea: on a CPU the decode speed depends on the active params per token,
  not the total. My objective is trying to run a 10B at 100tok/s on a mid level
  PC (No GPU).
url: >-
  https://www.reddit.com/r/LocalLLaMA/comments/1v9vo75/the_idea_on_a_cpu_the_decode_speed_depends_on_the/
source: Reddit r/LocalLLaMA
source_type: rss
language: en
published: '2026-07-29T13:06:08.000Z'
fetched_at: '2026-07-30T11:01:46.424Z'
---
On the CPU, batch 1 is memory bandwidth bound. But if token/s = bandwidth / (bytes_per_weight * active_weights_per_token) the total number of parameters doesnt slow down the generation speed. So building the architecture aroud a small batch "active parameters per token" (ternary weights and a granular MoE), the total capacity can grow without effecting the speed.
 Now the new catch: if speed is not the problem (a 105M and a 206M model run at the same tok/s (predicted 739–1309 tok/s)), will the model capacity scale with the number of params or the model will go "dumber" because of the lack of routing capacity with more experts?
 My measurements: On a Ryzen r5 3600X (single thread), the engine went from 176 tok/s to 848 tok/s on a 8.3M sandbox model with ternary LUT MLP, activation skip, deterministic SSM scan, two pool MoE with only a +0.00004 BPB quality cost. (Here the model is cache resident).
 I launched the full training on a 30M (11M active) model on the 2x T4 on Kaggle. Before the run I pushed 5 gates. Four passed and one failure: distilling from a bigger teacher using a different tokenizer lost against simply cross entropy (-0.0116 BPB, about 2.3 sigma worse), so I flipped the recipe to CE-primary. This is my idea of a 100% transparent project. (nothing above the 8.3M sandbox is trained yet, the 10B is the target)
 Repo in the comments
    submitted by    /u/WildPino25  
 [link]   [comments]
