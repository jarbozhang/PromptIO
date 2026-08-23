---
title: Efficient and Sound Probabilistic Verification for AI Agents
url: 'https://arxiv.org/abs/2606.20510v1'
source: arXiv
source_type: arxiv
language: en
authors:
  - Alaia Solko-Breslin
  - Pramod Kaushik Mudrakarta
  - Mihai Christodorescu
  - Somesh Jha
  - Krishnamurthy Dj Dvijotham
categories:
  - cs.CR
  - cs.AI
  - cs.CR
published: '2026-06-18T17:27:59Z'
fetched_at: '2026-06-19T14:36:30.217Z'
---
Securing AI agents that operate in complex digital environments has become a critical need, and runtime monitoring approaches that formulate and enforce policies expressed in a formal language like Datalog offer a promising solution. However, existing approaches are restricted to deterministic policies. In many practical applications of AI agents, there is a need to enforce security policies in the face of ambiguity, leading to probabilistic predicates or state transitions (for example, a declassifier or Personally Identifiable Information (PII) detector that has some failure probability on each invocation). Furthermore, in many such applications, one cannot easily make the independence assumptions necessary to invoke prior work on probabilistic inference in Datalog. We address this by introducing a sound and efficient framework for such verification based on distributionally robust optimization, computing sound upper bounds on the probability of policy violation regardless of possible correlations between predicates. On standard benchmarks for terminal and tool calling agents, we demonstrate that our approach outperforms prior art and improves the security-utility trade-off while ensuring rigorous bounds on the probability of policy violation.

Authors: Alaia Solko-Breslin, Pramod Kaushik Mudrakarta, Mihai Christodorescu, Somesh Jha, Krishnamurthy Dj Dvijotham
Categories: cs.CR, cs.AI, cs.CR
