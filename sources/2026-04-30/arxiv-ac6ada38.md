---
title: 'FaaSMoE: A Serverless Framework for Multi-Tenant Mixture-of-Experts Serving'
url: 'https://arxiv.org/abs/2604.26881v1'
source: arXiv
source_type: arxiv
language: en
authors:
  - Minghe Wang
  - Trever Schirmer
  - Mohammadreza Malekabbasi
  - David Bermbach
categories:
  - cs.DC
  - cs.LG
  - cs.DC
published: '2026-04-29T16:47:48Z'
fetched_at: '2026-04-30T08:51:20.279Z'
---
Mixture-of-Experts (MoE) models offer high capacity with efficient inference cost by activating a small subset of expert models per input. However, deploying MoE models requires all experts to reside in memory, creating a gap between the resource used by activated experts and the provisioned resources. This underutilization is further pronounced in multi-tenant scenarios. In this paper, we propose FaaSMoE, a multi-tenant MoE serving architecture built on Function-as-a-Service (FaaS) platforms. FaaSMoE decouples the control and execution planes of MoE by deploying experts as stateless FaaS functions, enabling on-demand and scale-to-zero expert invocation across tenants. FaaSMoE further supports configurable expert granularity within functions, trading off per-expert elasticity for reduced invocation overhead. We implement a prototype with an open-source edge-oriented FaaS platform and evaluate it using Qwen1.5-moe-2.7B under multi-tenant workloads. Compared to a full-model baseline, FaaSMoE uses less than one third of the resources, demonstrating a practical and resource-efficient path towards scalable MoE serving in a multi-tenant environment.

Authors: Minghe Wang, Trever Schirmer, Mohammadreza Malekabbasi, David Bermbach
Categories: cs.DC, cs.LG, cs.DC
