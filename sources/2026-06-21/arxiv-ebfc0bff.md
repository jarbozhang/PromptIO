---
title: >-
  Sovereign Execution Brokers: Enforcing Certificate-Bound Authority in Agentic
  Control Planes
url: 'https://arxiv.org/abs/2606.20520v1'
source: arXiv
source_type: arxiv
language: en
authors:
  - Jun He
  - Deying Yu
categories:
  - cs.CR
  - cs.AI
  - cs.DC
  - cs.LG
  - cs.CR
published: '2026-06-18T17:36:46Z'
fetched_at: '2026-06-21T03:19:27.898Z'
---
Autonomous agents are increasingly connected to cloud, deployment, and data-control workflows, but production mutation authority should not reside inside non-deterministic reasoning processes. Existing access-control mechanisms authorize identities, while assurance layers certify proposed actions; neither alone provides a mandatory enforcement point for certified authority at the moment of mutation. This paper introduces the Sovereign Execution Broker (SEB), a runtime enforcement boundary for certificate-bound agentic infrastructure. SEB consumes certificates issued by the Sovereign Assurance Boundary (SAB), verifies that the requested mutation matches the certified execution contract, checks validity windows, policy epochs, revocation epochs, and live-state drift, mints scoped execution identity, invokes infrastructure APIs, and records signed decision and outcome records. By separating proposal, admission, and execution, SEB turns certified authority into a short-lived, revocable, auditable runtime capability, provided that production mutation APIs reject non-broker identities. We present the SEB execution model, certificate and replay-verification predicates, scoped identity semantics, bypass-prevention deployment patterns, failure behavior, and a concrete prototype implementation. We evaluate the prototype on AWS and Kubernetes clusters, measuring latency overheads, revocation propagation, drift detection, and security under fault injection.

Authors: Jun He, Deying Yu
Categories: cs.CR, cs.AI, cs.DC, cs.LG, cs.CR
