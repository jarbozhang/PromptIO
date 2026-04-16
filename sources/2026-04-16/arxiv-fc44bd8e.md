---
title: >-
  $π$-Play: Multi-Agent Self-Play via Privileged Self-Distillation without
  External Data
url: 'https://arxiv.org/abs/2604.14054v1'
source: arXiv
source_type: arxiv
language: en
authors:
  - Yaocheng Zhang
  - Yuanheng Zhu
  - Wenyue Chong
  - Songjun Tu
  - Qichao Zhang
categories:
  - cs.LG
  - cs.CL
  - cs.LG
published: '2026-04-15T16:34:39Z'
fetched_at: '2026-04-16T06:07:35.560Z'
---
Deep search agents have emerged as a promising paradigm for addressing complex information-seeking tasks, but their training remains challenging due to sparse rewards, weak credit assignment, and limited labeled data. Self-play offers a scalable route to reduce data dependence, but conventional self-play optimizes students only through sparse outcome rewards, leading to low learning efficiency. In this work, we observe that self-play naturally produces a question construction path (QCP) during task generation, an intermediate artifact that captures the reverse solution process. This reveals a new source of privileged information for self-distillation: self-play can itself provide high-quality privileged context for the teacher model in a low-cost and scalable manner, without relying on human feedback or curated privileged information. Leveraging this insight, we propose Privileged Information Self-Play ($π$-Play), a multi-agent self-evolution framework. In $π$-Play, an examiner generates tasks together with their QCPs, and a teacher model leverages QCP as privileged context to densely supervise a student via self-distillation. This design transforms conventional sparse-reward self-play into a dense-feedback self-evolution loop. Extensive experiments show that data-free $π$-Play surpasses fully supervised search agents and improves evolutionary efficiency by 2-3$\times$ over conventional self-play.

Authors: Yaocheng Zhang, Yuanheng Zhu, Wenyue Chong, Songjun Tu, Qichao Zhang
Categories: cs.LG, cs.CL, cs.LG
