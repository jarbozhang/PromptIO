---
title: >-
  CaliBench: Are the Stochastic Dynamics of Video World Models Physically
  Calibrated?
url: 'https://arxiv.org/abs/2608.16829v1'
source: arXiv
source_type: arxiv
language: en
authors:
  - Jonathan Sadeghi
  - Jenny Seidenschwarz
  - Jesse Allardice
  - Sirish Srinivasan
  - Benjamin Graham
categories:
  - cs.LG
  - cs.AI
  - cs.LG
published: '2026-08-17T17:14:50Z'
fetched_at: '2026-08-18T11:04:07.087Z'
---
Video world models approximate the stochastic distribution of physical outcomes through generative sampling, but existing benchmarks score individual generations or compare distributions coarsely over a whole dataset, leaving the fine-grained aleatoric uncertainty of specific phenomena untested. We introduce CaliBench, which scores outcomes in a physically interpretable discrete space - a bin index, a die face, a suit, a colour - rather than a learned feature space such as in FID, so the distance from a known reference distribution is measured directly. We curate outcome spaces whose reference is known in closed form (binomial Galton boards, Bernoulli forks, uniform dice/cards/lottery, a skewed European-roulette colour), enabling an exact calibration test. We decompose performance into two orthogonal axes that a single accuracy metric conflates: scorability, the fraction of generations yielding a scoreable outcome, and calibration, the total variation distance from the reference on that sample. A chi-squared test assesses significance; as calibration is its null hypothesis it can evidence only miscalibration, and at N=32 per cell detects only large deviations. We apply it to nine scenes and six image-to-video models (WAN-2.7, SeeDance-2.0, HappyHorse-1.0, Veo 3.1, Runway Gen-4.5, Cosmos3-Super), 32 generations each. Models consistently concentrate probability mass on a few outcomes rather than reproducing the reference. Most scene-model combinations are significantly miscalib

Authors: Jonathan Sadeghi, Jenny Seidenschwarz, Jesse Allardice, Sirish Srinivasan, Benjamin Graham
Categories: cs.LG, cs.AI, cs.LG
