---
title: 'LoKA: Low-precision Kernel Applications for Recommendation Models At Scale'
url: 'https://arxiv.org/abs/2605.10886v1'
source: arXiv
source_type: arxiv
language: en
authors:
  - Liang Luo
  - Yinbin Ma
  - Quanyu Zhu
  - Vasiliy Kuznetsov
  - Yuxin Chen
categories:
  - cs.LG
  - cs.AI
  - cs.LG
published: '2026-05-11T17:32:29Z'
fetched_at: '2026-05-12T11:42:53.243Z'
---
Recent GPU generations deliver significantly higher FLOPs using lower-precision arithmetic, such as FP8. While successfully applied to large language models (LLMs), its adoption in large recommendation models (LRMs) has been limited. This is because LRMs are numerically sensitive, dominated by small matrix multiplications (GEMMs) followed by normalization, and trained in communication-intensive environments. Applying FP8 directly to LRMs often degrades model quality and prolongs training time. These challenges are inherent to LRM workloads and cannot be resolved merely by introducing better FP8 kernels. Instead, a system-model co-design approach is needed to successfully integrate FP8. We present LoKA (Low-precision Kernel Applications), a framework that makes FP8 practical for LRMs through three principles: profile under realistic distributions to know where low precision is safe, co-design model components with hardware to expand where it is safe, and orchestrate across kernel libraries to maximize the gains. Concretely, LoKA Probe is a statistically grounded, online benchmarking method that learns activation and weight statistics, and quantifies per-layer errors. This process pinpoints safe and unsafe, fast and slow sites for FP8 adoption. LoKA Mods is a set of reusable model adaptations that improve both numerical stability and execution efficiency with FP8. LoKA Dispatch is a runtime that leverages the statistical insights from LoKA Probe to select the fastest FP8 kernel

Authors: Liang Luo, Yinbin Ma, Quanyu Zhu, Vasiliy Kuznetsov, Yuxin Chen
Categories: cs.LG, cs.AI, cs.LG
