---
title: When Do Multi-Agent Systems Help? An Information Bottleneck Perspective
url: 'https://arxiv.org/abs/2607.16133v1'
source: arXiv
source_type: arxiv
language: en
authors:
  - Wendi Yu
  - Lianhao Zhou
  - Xiangjue Dong
  - Sai Sudarshan Barath
  - Declan Staunton
categories:
  - cs.LG
  - cs.AI
  - cs.LG
published: '2026-07-17T17:13:44Z'
fetched_at: '2026-07-20T23:02:10.417Z'
---
LLM powered multi-agent systems (MAS) have emerged as a promising paradigm for complex tasks. However, their advantages over single-agent systems (SAS) remain unclear, with performance varying inconsistently across settings. Here, we provide an information bottleneck perspective on elucidating the differences between MAS and SAS. Specifically, our key observation is that a SAS accumulates its full reasoning trace in one shared context, while a MAS uses isolated local contexts connected by bounded relay messages. We show that, under infinite relay bandwidth, any SAS can be simulated by a MAS that transmits the full upstream context. Thus, the nontrivial advantage of MAS arises under bounded relays, where compression introduces a fundamental trade-off: reducing redundant context can improve efficiency, but may also incur loss of task-relevant information. We formalize this trade-off as an information bottleneck controlled by an effective parameter $β$, which captures how the balance shifts with model capability, and shows that MAS gains arise when context reduction outweighs relay information loss. We conduct 18 controlled experiments across five benchmarks and three model scales to validate our theoretical studies. We observe that MAS consistently helps when relays are near-sufficient, especially for weaker models. In contrast, MAS gains shrink or reverse when relays incur information loss, especially for stronger models that can already extract useful information from redunda

Authors: Wendi Yu, Lianhao Zhou, Xiangjue Dong, Sai Sudarshan Barath, Declan Staunton
Categories: cs.LG, cs.AI, cs.LG
