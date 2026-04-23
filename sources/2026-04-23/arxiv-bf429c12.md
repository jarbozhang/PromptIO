---
title: >-
  Occupancy Reward Shaping: Improving Credit Assignment for Offline
  Goal-Conditioned Reinforcement Learning
url: 'https://arxiv.org/abs/2604.20627v1'
source: arXiv
source_type: arxiv
language: en
authors:
  - Aravind Venugopal
  - Jiayu Chen
  - Xudong Wu
  - Chongyi Zheng
  - Benjamin Eysenbach
categories:
  - cs.LG
  - cs.RO
  - cs.LG
published: '2026-04-22T14:41:56Z'
fetched_at: '2026-04-23T02:22:06.474Z'
---
The temporal lag between actions and their long-term consequences makes credit assignment a challenge when learning goal-directed behaviors from data. Generative world models capture the distribution of future states an agent may visit, indicating that they have captured temporal information. How can that temporal information be extracted to perform credit assignment? In this paper, we formalize how the temporal information stored in world models encodes the underlying geometry of the world. Leveraging optimal transport, we extract this geometry from a learned model of the occupancy measure into a reward function that captures goal-reaching information. Our resulting method, Occupancy Reward Shaping, largely mitigates the problem of credit assignment in sparse reward settings. ORS provably does not alter the optimal policy, yet empirically improves performance by 2.2x across 13 diverse long-horizon locomotion and manipulation tasks. Moreover, we demonstrate the effectiveness of ORS in the real world for controlling nuclear fusion on 3 Tokamak control tasks. Code: https://github.com/aravindvenu7/occupancy_reward_shaping; Website: https://aravindvenu7.github.io/website/ors/

Authors: Aravind Venugopal, Jiayu Chen, Xudong Wu, Chongyi Zheng, Benjamin Eysenbach
Categories: cs.LG, cs.RO, cs.LG
