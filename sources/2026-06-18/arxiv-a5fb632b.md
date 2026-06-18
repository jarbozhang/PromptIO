---
title: Optimal scenario design for climate emulation
url: 'https://arxiv.org/abs/2606.19302v1'
source: arXiv
source_type: arxiv
language: en
authors:
  - Christopher B. Womack
  - Shahine Bouabid
  - Andrei Sokolov
  - Popat Salunke
  - Glenn Flierl
categories:
  - physics.ao-ph
  - cs.LG
  - physics.ao-ph
published: '2026-06-17T17:26:22Z'
fetched_at: '2026-06-18T08:58:17.277Z'
---
As deep learning for physical systems continues to grow in popularity, efforts to improve generalizability have primarily focused on designing architectures that embed physical constraints. However, for machine-learning surrogate climate models (emulators), we show that the low structural diversity in existing scenarios commonly used to generate training data places a ceiling on predictive skill. Here, we examine whether training datasets themselves can be optimized to improve generalization. We introduce a method to create datasets that produce emulators capable of generalizing to new, structurally different scenarios absent from the training data. We use a differentiable Simple Climate Model (SCM) to calculate the sensitivity of emulator loss to perturbations in the training data, iteratively updating the training data to maximize emulator skill. For an SCM, training on one scenario optimized in this fashion outperforms an emulator trained on six standard ScenarioMIP pathways. We achieve this higher predictive skill despite training on a smaller dataset, finding that our emulator successfully isolates distinct physical behaviors of different climate forcing agents (e.g., greenhouse gases vs. aerosols) without single-forcing runs. We then demonstrate that scenarios optimized using an SCM, when used to drive an intermediate-complexity climate model, produce a training dataset that yields a more skillful emulator than training on ScenarioMIP outputs. Our results suggest that, 

Authors: Christopher B. Womack, Shahine Bouabid, Andrei Sokolov, Popat Salunke, Glenn Flierl
Categories: physics.ao-ph, cs.LG, physics.ao-ph
