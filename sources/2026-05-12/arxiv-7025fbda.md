---
title: Equivariant Reinforcement Learning for Clifford Quantum Circuit Synthesis
url: 'https://arxiv.org/abs/2605.10910v1'
source: arXiv
source_type: arxiv
language: en
authors:
  - Richie Yeung
  - Aleks Kissinger
  - Rob Cornish
categories:
  - quant-ph
  - cs.LG
  - quant-ph
published: '2026-05-11T17:49:28Z'
fetched_at: '2026-05-12T11:42:53.211Z'
---
We consider the problem of synthesizing Clifford quantum circuits for devices with all-to-all qubit connectivity. We approach this task as a reinforcement learning problem in which an agent learns to discover a sequence of elementary Clifford gates that reduces a given symplectic matrix representation of a Clifford circuit to the identity. This formulation permits a simple learning curriculum based on random walks from the identity. We introduce a novel neural network architecture that is equivariant to qubit relabelings of the symplectic matrix representation, and which is size-agnostic, allowing a single learned policy to be applied across different qubit counts without circuit splicing or network reparameterization. On six-qubit Clifford circuits, the largest regime for which optimal references are available, our agent finds circuits within one two-qubit gate of optimality in milliseconds per instance, and finds optimal circuits in 99.2% of instances within seconds per instance. After continued training on ten-qubit instances, the agent scales to unseen Clifford tableaus with up to thirty qubits, including targets generated from circuits with over a thousand Clifford gates, where it achieves lower average two-qubit gate counts than Qiskit's Aaronson-Gottesman and greedy Clifford synthesizers.

Authors: Richie Yeung, Aleks Kissinger, Rob Cornish
Categories: quant-ph, cs.LG, quant-ph
