---
title: 'ArchAgent v2: A Case Study with the Data Prefetching Championship'
url: 'https://arxiv.org/abs/2608.09874v1'
source: arXiv
source_type: arxiv
language: en
authors:
  - Abraham Gonzalez
  - Raghav Gupta
  - Akanksha Jain
  - Hanna Alam
  - Alexander Novikov
categories:
  - cs.AI
  - cs.AR
  - cs.AI
published: '2026-08-10T17:28:05Z'
fetched_at: '2026-08-11T11:02:16.308Z'
---
Agentic artificial intelligence has shown great promise in automating algorithm design, but scaling similar techniques to computer microarchitecture discovery remains challenging due to vast search spaces, strict hardware budgets, and long simulation times. In this work, we present ArchAgent v2, a framework which scales automated microarchitecture search to multi-level data prefetching. While the original ArchAgent successfully discovered single-level cache replacement policies in competition settings, it does not scale to multi-level prefetching where the design space and degrees of freedom are larger. To overcome this, we introduce two new additions to ArchAgent: a cascaded evolutionary search that subdivides the design space by sequentially evolving and freezing prefetchers at individual cache levels, and a hardware-realizability feedback loop that embeds real-time size-estimation directly into the evolution process. Evaluated under identical rules of the 4th Data Prefetching Championship (DPC4), ArchAgent v2 automatically designs a three-level prefetcher that outperforms the winning hand-designed solution, further demonstrating automated agentic discovery as a useful tool for computer architects. Our discovered policy achieves a 3.8\% geometric mean IPC speedup over the baseline overall and a 0.3\% improvement over the prior champion, BertiGO. On low-bandwidth single-core configurations, our policy yields a 4.6\% performance speedup compared to only 2.6\% for BertiGO. How

Authors: Abraham Gonzalez, Raghav Gupta, Akanksha Jain, Hanna Alam, Alexander Novikov
Categories: cs.AI, cs.AR, cs.AI
