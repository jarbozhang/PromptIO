---
title: >-
  EERLoss: A Novel Loss Function for Training Deep Biometric Models. A Case
  Study in Keystroke Dynamics
url: 'https://arxiv.org/abs/2606.24586v1'
source: arXiv
source_type: arxiv
language: en
authors:
  - Nahuel Gonzalez
  - Marta Robledo-Moreno
  - Ivan DeAndres-Tame
  - Ruben Vera-Rodriguez
  - Ruben Tolosana
categories:
  - cs.CV
  - cs.LG
  - cs.CV
published: '2026-06-23T13:47:42Z'
fetched_at: '2026-06-24T01:28:36.383Z'
---
Deep learning approaches to biometric verification are commonly trained by optimizing indirect objectives, creating a misalignment between the optimization process and the primary evaluation metric, typically the Equal Error Rate (EER). This paper introduces EERLoss: a subdifferentiable, arbitrarily accurate approximation to EER for training deep biometric models. Furthermore, this framework has the potential to be adapted to optimize any specific operating point on the DET curve, enhancing its generalizability. To validate this approach, EERLoss is evaluated on a particularly demanding behavioral biometric modality: keystroke dynamics verification. This task is characterized by its high intra-class and low inter-class variability. Experiments are conducted on the large-scale KVC-onGoing benchmark, incorporating data from over 185,000 subjects across different scenarios. A comprehensive ablation study initially demonstrates the superiority of EERLoss in comparison to existing state-of-the-art loss functions. It also converges substantially faster compared to other losses, reducing the overall training cost. Additionally, a comparison is made between the proposed loss and the KVC-winning architecture by re-training it with EERLoss, demonstrating that the proposed approach significantly outperforms the original SoTA, achieving a relative EER reduction of up to approx. 30\%. This improvement on a challenging, large-scale benchmark validates the effectiveness of EERLoss as a task

Authors: Nahuel Gonzalez, Marta Robledo-Moreno, Ivan DeAndres-Tame, Ruben Vera-Rodriguez, Ruben Tolosana
Categories: cs.CV, cs.LG, cs.CV
