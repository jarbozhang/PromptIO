---
title: 'Gym-Anything: Turn any Software into an Agent Environment'
url: 'https://arxiv.org/abs/2604.06126v1'
source: arXiv
source_type: arxiv
language: en
authors:
  - Pranjal Aggarwal
  - Graham Neubig
  - Sean Welleck
categories:
  - cs.LG
  - cs.AI
  - cs.LG
published: '2026-04-07T17:38:15Z'
fetched_at: '2026-04-08T02:58:13.564Z'
---
Computer-use agents hold the promise of assisting in a wide range of digital economic activities. However, current research has largely focused on short-horizon tasks over a limited set of software with limited economic value, such as basic e-commerce and OS-configuration tasks. A key reason is that creating environments for complex software requires significant time and human effort, and therefore does not scale. To address this, we introduce Gym-Anything, a framework for converting any software into an interactive computer-use environment. We frame environment creation itself as a multi-agent task: a coding agent writes setup scripts, downloads real-world data, and configures the software, while producing evidence of correct setup. An independent audit agent then verifies evidence for the environment setup against a quality checklist. Using a taxonomy of economically valuable occupations grounded in U.S. GDP data, we apply this pipeline to 200 software applications with broad occupational coverage. The result is CUA-World, a collection of over 10K long-horizon tasks spanning domains from medical science and astronomy to engineering and enterprise systems, each configured with realistic data along with train and test splits. CUA-World also includes CUA-World-Long, a challenging long-horizon benchmark with tasks often requiring over 500 steps, far exceeding existing benchmarks. Distilling successful trajectories from the training split into a 2B vision-language model outperfo

Authors: Pranjal Aggarwal, Graham Neubig, Sean Welleck
Categories: cs.LG, cs.AI, cs.LG
