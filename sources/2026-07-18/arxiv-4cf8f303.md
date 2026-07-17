---
title: 'RoboTTT: Context Scaling for Robot Policies'
url: 'https://arxiv.org/abs/2607.15275v1'
source: arXiv
source_type: arxiv
language: en
authors:
  - Yunfan Jiang
  - Yevgen Chebotar
  - Ruijie Zheng
  - Fengyuan Hu
  - Yunhao Ge
categories:
  - cs.RO
  - cs.AI
  - cs.LG
  - cs.RO
published: '2026-07-16T17:59:06Z'
fetched_at: '2026-07-17T23:02:11.568Z'
---
Recent robot foundation models operate with single-step or short-history visuomotor context. We introduce Test-Time-Training Robot Policies (RoboTTT), a robot model and training recipe that scale visuomotor context to 8K timesteps, three orders of magnitude beyond state-of-the-art policies, without growing inference latency. At this context length, we unlock new robot capabilities: one-shot in-context imitation from human video demonstrations, on-the-fly policy improvement, robustness to perturbations, and stronger performance on multi-stage, long-horizon tasks. We also observe, for the first time, steady gains in closed-loop performance as pretraining context length scales. At its core, RoboTTT integrates Test-Time Training into robot foundation models such as Vision-Language-Action policies, yielding a sequence model whose recurrent state consists of fast weights, parameters updated by gradient descent during both training and inference, compressing histories into weight space and retrieving contextual information for long-context conditioning. To scale training context length, the recipe combines sequence action forcing with truncated backpropagation through time. On challenging real-robot manipulation tasks, RoboTTT improves overall performance by 87% over the single-step context baseline and fully completes a five-minute, ten-stage assembly task, which no baseline ever does. RoboTTT trained with 8K-timestep context outperforms the same model pretrained with 1K timesteps 

Authors: Yunfan Jiang, Yevgen Chebotar, Ruijie Zheng, Fengyuan Hu, Yunhao Ge
Categories: cs.RO, cs.AI, cs.LG, cs.RO
