---
title: >-
  The Unfireable Safety Kernel: Execution-Time AI Alignment for AI Agents and
  Other Escapable AI Systems
url: 'https://arxiv.org/abs/2606.26057v1'
source: arXiv
source_type: arxiv
language: en
authors:
  - Seth Dobrin
  - Łukasz Chmiel
categories:
  - cs.AI
  - cs.CR
  - cs.LG
  - cs.AI
published: '2026-06-24T17:32:27Z'
fetched_at: '2026-06-25T07:41:52.275Z'
---
AI agents are granted access to tools, APIs, and other infrastructure, making them active principals in those systems. The dominant approach places controls inside the agent's own runtime: system prompts, output filters, and guardrail libraries. Any control in the agent's address space is reachable by inputs that influence it; this generalizes to any AI system with sufficient reach into its own runtime, a class we term escapable AI systems. We identify four properties that an authorization mechanism must satisfy for architectural control rather than for cooperative requests: process separation, pre-action enforcement on a structurally only path, fail-closed at both the request and system levels, and externalized signed evidence verifiable outside the controlled system's trust boundary. We position this layer as execution-time AI alignment, complementing training-time alignment (RLHF, Constitutional AI) and inference-time alignment. We present the Unfireable Safety Kernel, a Rust reference implementation realizing all four. Its fail-closed invariant is machine-checked at two levels: an SMT theorem (Z3) and an exhaustive bounded-model-checking proof of the production decision function (Kani, 4/4 harnesses). A Python-to-Rust migration was gated on byte-equivalence (1000/1000 fixtures; 17/17 adversarial classes). We evaluate the kernel governing a live, escapable AI system, a deterministic, self-improving world model, against an escape-seeking adversary driving its real self-modi

Authors: Seth Dobrin, Łukasz Chmiel
Categories: cs.AI, cs.CR, cs.LG, cs.AI
