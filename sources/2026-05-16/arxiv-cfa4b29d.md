---
title: >-
  Hand-in-the-Loop: Improving Dexterous VLA via Seamless Interventional
  Correction
url: 'https://arxiv.org/abs/2605.15157v1'
source: arXiv
source_type: arxiv
language: en
authors:
  - Zhuohang Li
  - Liqun Huang
  - Wei Xu
  - Zhengming Zhu
  - Nie Lin
categories:
  - cs.RO
  - cs.LG
  - cs.RO
published: '2026-05-14T17:51:40Z'
fetched_at: '2026-05-16T14:12:26.805Z'
---
Vision-Language-Action (VLA) models are prone to compounding errors in dexterous manipulation, where high-dimensional action spaces and contact-rich dynamics amplify small policy deviations over long horizons. While Interactive Imitation Learning (IIL) can refine policies through human takeover data, applying it to high-degree-of-freedom (DoF) robotic hands remains challenging due to a command mismatch between human teleoperation and policy execution at the takeover moment, which causes abrupt robot-hand configuration changes, or "gesture jumps". We present Hand-in-the-Loop (HandITL), a seamless human-in-the-loop intervention method that blends human corrective intent with autonomous policy execution to avoid gesture jumps during bimanual dexterous manipulation. Compared with direct teleoperation takeover, HandITL reduces takeover jitter by 99.8% and preserves robust post-takeover manipulation, reducing grasp failures by 87.5% and mean completion time by 19.1%. We validate HandITL on tasks requiring bimanual coordination, tool use, and fine-grained long-horizon manipulation. When used to collect intervention data for policy refinement, HandITL yields policies that outperform those trained with standard teleoperation data by 19% on average across three long-horizon dexterous tasks.

Authors: Zhuohang Li, Liqun Huang, Wei Xu, Zhengming Zhu, Nie Lin
Categories: cs.RO, cs.LG, cs.RO
