---
title: >-
  The Honest Quorum Problem: Epistemic Byzantine Fault Tolerance for Agentic
  Infrastructure
url: 'https://arxiv.org/abs/2607.16109v1'
source: arXiv
source_type: arxiv
language: en
authors:
  - Jun He
  - Deying Yu
categories:
  - cs.LG
  - cs.DC
  - cs.MA
  - cs.LG
published: '2026-07-17T16:43:00Z'
fetched_at: '2026-07-20T23:02:10.420Z'
---
State machine replication (SMR) and Byzantine fault-tolerant (BFT) consensus guarantee agreement despite a bounded number of arbitrary, colluding faulty participants. However, these guarantees rely on participants outside this set correctly executing the protocol's transition semantics. Agentic validators expose a weaker boundary: an authenticated, responsive, non-equivocating, and protocol-compliant reasoning participant may still endorse a semantically invalid transition due to reasoning errors. We call this failure mode an epistemic fault, and the collective phenomenon the Honest Quorum Problem (where "honest" means protocol-compliant, not semantically correct). Such a quorum can satisfy ordinary checks while forming a certificate for an invalid transition. Thus, agreement alone does not guarantee semantic validity or execution safety. Furthermore, because agentic validators often share model weights, training distributions, prompts, or toolchains, they are highly susceptible to correlated epistemic faults. We define Epistemic Byzantine Fault Tolerance (EBFT), a fault-tolerance model for agentic infrastructure and post-deterministic distributed systems. EBFT augments the conventional Byzantine fault bound with two separate, confidence-indexed quantities: $e_δ$ bounds coherent invalid endorsements outside the Byzantine set, and $u_ε$ bounds unusable validator support that degrades liveness. These quantities characterize semantic safety risk and liveness degradation independ

Authors: Jun He, Deying Yu
Categories: cs.LG, cs.DC, cs.MA, cs.LG
