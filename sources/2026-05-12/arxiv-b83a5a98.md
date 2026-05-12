---
title: 'Unmasking On-Policy Distillation: Where It Helps, Where It Hurts, and Why'
url: 'https://arxiv.org/abs/2605.10889v1'
source: arXiv
source_type: arxiv
language: en
authors:
  - Mohammadreza Armandpour
  - Fatih Ilhan
  - David Harrison
  - Ajay Jaiswal
  - Duc N. M Hoang
categories:
  - cs.LG
  - cs.AI
  - cs.LG
published: '2026-05-11T17:33:28Z'
fetched_at: '2026-05-12T11:42:53.241Z'
---
On-policy distillation offers dense, per-token supervision for training reasoning models; however, it remains unclear under which conditions this signal is beneficial and under which it is detrimental. Which teacher model should be used, and in the case of self-distillation, which specific context should serve as the supervisory signal? Does the optimal choice vary from one token to the next? At present, addressing these questions typically requires costly training runs whose aggregate performance metrics obscure the dynamics at the level of individual tokens. We introduce a training-free diagnostic framework that operates at the highest resolution: per token, per question, and per teacher. We derive an ideal per-node gradient defined as the parameter update that maximally increases the student's probability of success. We then develop a scalable targeted-rollout algorithm to estimate this gradient efficiently, even for long chains of intermediate thoughts. The gradient alignment score, defined as the cosine similarity between this ideal gradient and any given distillation gradient, quantifies the extent to which a particular configuration approximates the ideal signal. Across a range of self-distillation settings and external teacher models, we observe that distillation guidance exhibits substantially higher alignment with the ideal on incorrect rollouts than on correct ones, where the student already performs well and the teacher's signal tends to become noisy. Furthermore,

Authors: Mohammadreza Armandpour, Fatih Ilhan, David Harrison, Ajay Jaiswal, Duc N. M Hoang
Categories: cs.LG, cs.AI, cs.LG
