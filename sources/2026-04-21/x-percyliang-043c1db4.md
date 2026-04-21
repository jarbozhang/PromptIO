---
title: "Marin is using quantile balancing from @Jianlin_S (who developed RoPE, which was also a good idea) t"
source: "X @percyliang"
url: "https://x.com/percyliang/status/2045010625877991535"
date: "Fri Apr 17 05:25:02 +0000 2026"
likes: 329
reposts: 33
replies: 4
---

Marin is using quantile balancing from @Jianlin_S (who developed RoPE, which was also a good idea) to train our current 1e23 FLOPs MoE. The idea is elegant: assigning tokens to experts by solving a linear program. No hyperparameters to tune. Yields stable training.
