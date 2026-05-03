---
title: Synthetic Computers at Scale for Long-Horizon Productivity Simulation
url: 'https://arxiv.org/abs/2604.28181v1'
source: arXiv
source_type: arxiv
language: en
authors:
  - Tao Ge
  - Baolin Peng
  - Hao Cheng
  - Jianfeng Gao
categories:
  - cs.AI
  - cs.CL
  - cs.LG
  - cs.AI
published: '2026-04-30T17:58:02Z'
fetched_at: '2026-05-03T12:56:18.790Z'
---
Realistic long-horizon productivity work is strongly conditioned on user-specific computer environments, where much of the work context is stored and organized through directory structures and content-rich artifacts. To scale synthetic data creation for such productivity scenarios, we introduce Synthetic Computers at Scale, a scalable methodology for creating such environments with realistic folder hierarchies and content-rich artifacts (e.g., documents, spreadsheets, and presentations). Conditioned on each synthetic computer, we run long-horizon simulations: one agent creates productivity objectives that are specific to the computer's user and require multiple professional deliverables and about a month of human work; another agent then acts as that user and keeps working across the computer -- for example, navigating the filesystem for grounding, coordinating with simulated collaborators, and producing professional artifacts -- until these objectives are completed. In preliminary experiments, we create 1,000 synthetic computers and run long-horizon simulations on them; each run requires over 8 hours of agent runtime and spans more than 2,000 turns on average. These simulations produce rich experiential learning signals, whose effectiveness is validated by significant improvements in agent performance on both in-domain and out-of-domain productivity evaluations. Given that personas are abundant at billion scale, this methodology can in principle scale to millions or even bil

Authors: Tao Ge, Baolin Peng, Hao Cheng, Jianfeng Gao
Categories: cs.AI, cs.CL, cs.LG, cs.AI
