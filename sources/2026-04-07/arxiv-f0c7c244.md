---
title: >-
  Rethinking Exploration in RLVR: From Entropy Regularization to Refinement via
  Bidirectional Entropy Modulation
url: 'https://arxiv.org/abs/2604.04894v1'
source: arXiv
source_type: arxiv
language: en
authors:
  - Hengrui Gu
  - Xiaotian Han
  - Yujing Bian
  - Kaixiong Zhou
categories:
  - cs.CL
  - cs.AI
  - cs.LG
  - cs.CL
published: '2026-04-06T17:42:38Z'
fetched_at: '2026-04-07T09:57:59.366Z'
---
Reinforcement learning with verifiable rewards (RLVR) has significantly advanced the reasoning capabilities of large language models (LLMs). However, it faces a fundamental limitation termed \textit{restricted exploration}, where the policy rapidly converges to a narrow set of solutions. While entropy regularization is a popular approach used to sustain exploration, it often proves unreliable for LLMs, suffering from high hyperparameter sensitivity and yielding only marginal performance gains. Motivated by these inefficiencies, we propose to rethink the relationship between policy entropy and exploration. By deriving a parametric formulation of group-relative advantage estimation and analyzing entropy dynamics, we conceptually decompose policy entropy into \textit{informative entropy}, which preserves diverse solution paths, and \textit{spurious entropy}, which erodes reasoning patterns. Our analysis reveals that, in contrast to blind maximization, effective exploration requires \textit{entropy refinement}-a mechanism implicitly embedded in group-relative advantage estimation that sustains informative entropy on positive rollouts while suppressing spurious entropy on negative ones. Guided by this insight, we propose \textbf{AsymGRPO}, an exploratory framework that explicitly decouples the modulation of positive and negative rollouts. This allows for independent control over the preservation of informative entropy and the suppression of spurious noise. Extensive experiments de

Authors: Hengrui Gu, Xiaotian Han, Yujing Bian, Kaixiong Zhou
Categories: cs.CL, cs.AI, cs.LG, cs.CL
