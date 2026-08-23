---
title: >-
  Does Runtime Topology Context Improve LLM-Generated Kubernetes Security
  Patches?
url: 'https://arxiv.org/abs/2607.25995v1'
source: arXiv
source_type: arxiv
language: en
authors:
  - Farooq Shaikh
categories:
  - cs.CR
  - cs.AI
  - cs.CR
published: '2026-07-28T17:12:12Z'
fetched_at: '2026-07-29T11:02:31.060Z'
---
Kubernetes is central to the cloud-native ecosystem, orchestrating containerised workloads. Recent work suggests that large language models (LLMs) can automate cluster security remediation, generating configuration patches from Kubernetes Security Posture Management (KSPM) findings without human authoring. Such systems, however, prompt the model with each finding in isolation from the live service call graph, assuming general hardening knowledge suffices. This assumption breaks down whenever a patch must preserve a runtime service dependency invisible to the model: an otherwise compliant fix then carries a destructive functional blast radius, crashing downstream callers or silently severing call edges across the cluster. Whether live cluster context improves patch correctness has not been measured under controlled conditions across multiple dependency classes. We introduce KuTIE (Kubernetes Topology Intelligence Engine), which builds a live cluster context from Istio call edges, Trivy KSPM findings, and the service-account bindings a workload reads, and conditions LLM patch generation on it. It is evaluated on VulnCare, a purpose-built 36-deployment, four-namespace healthcare cluster with 31 injectable findings across seven dependency classes, each labelled by topology dependence against cluster ground truth. Across 248 trials, topology context raises topology-dependent patch correctness from 11.1% to 78.0% ($Δ= 0.669$), a gap that holds for every model and for six of seven c

Authors: Farooq Shaikh
Categories: cs.CR, cs.AI, cs.CR
