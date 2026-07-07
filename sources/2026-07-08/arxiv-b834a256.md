---
title: Multiplayer Interactive World Models with Representation Autoencoders
url: 'https://arxiv.org/abs/2607.05352v1'
source: arXiv
source_type: arxiv
language: en
authors:
  - Anthony Hu
  - Václav Volhejn
  - Adrien Ramanana Rahary
  - Chris Mulder
  - Aditya Makkar
categories:
  - cs.CV
  - cs.AI
  - cs.LG
  - cs.CV
published: '2026-07-06T17:31:52Z'
fetched_at: '2026-07-07T23:02:35.326Z'
---
We introduce the first multiplayer world model for highly dynamic environments governed by complex physical interactions. Whereas single-player world models treat the other agents as part of the environment, ours conditions on the action streams of multiple agents, learning to attribute changes in the scene to the correct player and to stay coherent under arbitrary combinations of their actions. We study this problem in the game of Rocket League, where players compete and cooperate under fast, tightly coupled dynamics. Trained on 10,000 hours of gameplay collected with publicly available bots, our 5-billion-parameter latent diffusion model generates four-player matches in real time, producing 20 frames per second on a single Nvidia B200 GPU. Although trained only on short clips, its rollouts stay stable far beyond the training horizon: distributional quality holds steady out to five minutes, the longest horizon we measure, and in practice we observe rollouts continuing for hours with no sign of collapse. We systematically investigate the central design choices: the video codec, the generative objective, and the multiplayer conditioning scheme. In addition, we characterize how behavior changes with model and data scale, including the capabilities that emerge and the failure modes that persist. We further develop targeted evaluations that probe the model's physical understanding rather than visual appearance alone. To support continued research on multiplayer world models, we r

Authors: Anthony Hu, Václav Volhejn, Adrien Ramanana Rahary, Chris Mulder, Aditya Makkar
Categories: cs.CV, cs.AI, cs.LG, cs.CV
