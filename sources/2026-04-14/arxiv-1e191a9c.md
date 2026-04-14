---
title: 'Envisioning the Future, One Step at a Time'
url: 'https://arxiv.org/abs/2604.09527v1'
source: arXiv
source_type: arxiv
language: en
authors:
  - Stefan Andreas Baumann
  - Jannik Wiese
  - Tommaso Martorella
  - Mahdi M. Kalayeh
  - Björn Ommer
categories:
  - cs.CV
  - cs.AI
  - cs.LG
  - cs.CV
published: '2026-04-10T17:46:05Z'
fetched_at: '2026-04-14T00:33:19.764Z'
---
Accurately anticipating how complex, diverse scenes will evolve requires models that represent uncertainty, simulate along extended interaction chains, and efficiently explore many plausible futures. Yet most existing approaches rely on dense video or latent-space prediction, expending substantial capacity on dense appearance rather than on the underlying sparse trajectories of points in the scene. This makes large-scale exploration of future hypotheses costly and limits performance when long-horizon, multi-modal motion is essential. We address this by formulating the prediction of open-set future scene dynamics as step-wise inference over sparse point trajectories. Our autoregressive diffusion model advances these trajectories through short, locally predictable transitions, explicitly modeling the growth of uncertainty over time. This dynamics-centric representation enables fast rollout of thousands of diverse futures from a single image, optionally guided by initial constraints on motion, while maintaining physical plausibility and long-range coherence. We further introduce OWM, a benchmark for open-set motion prediction based on diverse in-the-wild videos, to evaluate accuracy and variability of predicted trajectory distributions under real-world uncertainty. Our method matches or surpasses dense simulators in predictive accuracy while achieving orders-of-magnitude higher sampling speed, making open-set future prediction both scalable and practical. Project page: http://co

Authors: Stefan Andreas Baumann, Jannik Wiese, Tommaso Martorella, Mahdi M. Kalayeh, Björn Ommer
Categories: cs.CV, cs.AI, cs.LG, cs.CV
