---
title: Hallucination in World Models is Predictable and Preventable
url: 'https://arxiv.org/abs/2606.27326v1'
source: arXiv
source_type: arxiv
language: en
authors:
  - Nicklas Hansen
  - Xiaolong Wang
categories:
  - cs.LG
  - cs.CV
  - cs.RO
  - cs.LG
published: '2026-06-25T17:38:45Z'
fetched_at: '2026-06-28T23:02:11.921Z'
---
Modern generative world models render increasingly realistic action-controllable futures, yet they frequently hallucinate: rollouts remain visually fluent while drifting from the ground-truth dynamics. We hypothesize that hallucination concentrates in low-coverage regions of the state-action space, where lightweight data-centric signals can both detect it and guide mitigation. To test this, we introduce MMBench2, a 427-hour, 210-task dataset for visual world modeling with ground-truth actions, rewards, and live simulators, and train a 350M-parameter world model on it. We identify three distinct hallucination modes: perceptual, action-marginalized, and scene-diverging -- each anchored to a different stage of the pipeline, and develop three signals that accurately predict where the model will fail. To close coverage gaps at training time, we develop a coverage-aware sampling technique; to close them online, our hallucination predictors serve as curiosity rewards for targeted data collection, yielding a data-efficient finetuning recipe that adapts the pretrained world model to entirely unseen environments with as few as 50 real environment trajectories. Overall, our findings reveal that hallucination in world models is inherently a data coverage issue, and that the same signals used to detect it can also be used for mitigation. An interactive web version of our paper is available at https://www.nicklashansen.com/mmbench2

Authors: Nicklas Hansen, Xiaolong Wang
Categories: cs.LG, cs.CV, cs.RO, cs.LG
