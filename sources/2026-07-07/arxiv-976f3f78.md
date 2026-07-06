---
title: Distributed Attacks in Persistent-State AI Control
url: 'https://arxiv.org/abs/2607.02514v1'
source: arXiv
source_type: arxiv
language: en
authors:
  - Josh Hills
  - Ida Caspary
  - Asa Cooper Stickland
categories:
  - cs.AI
  - cs.AI
published: '2026-07-02T17:59:56Z'
fetched_at: '2026-07-06T23:02:22.281Z'
---
As AI coding agents become more autonomous, they increasingly ship code iteratively, with the codebase persisting across sessions. This persistence creates a new attack surface: a misaligned or prompt-injected agent can distribute attacks across pull requests (PRs) and time its payload for the PR with the best natural cover. To study the resulting dynamics, we introduce Iterative VibeCoding, a setting for AI control, the study of safely deploying capable but potentially untrusted AI. In Iterative VibeCoding, a coding agent builds software over a sequence of PRs in a persistent codebase while pursuing a covert side task. Our benchmark includes two task families: CLI tools and Flask web services, across 20 total task variations. We use Claude Sonnet 4.5 as the attack agent and GPT-4o as the monitor. We compare gradual attacks, which distribute the side task across PRs, against non-gradual attacks concentrated in a single PR. No single monitor is robust to both: which strategy evades best (success while evading the monitor) depends on the monitor type, so a defender cannot close off both gradual and non-gradual attacks with any one monitor. High evasion (&gt;= 65%) generalizes across model attack agent backends (Sonnet 4.5, Gemini 3.1 Pro, Kimi K2.5), confirming this is a property of the persistent-state attack surface rather than a single model's capability. Evasion also remains high across state-of-the-art monitor models and the gap between gradual and non-gradual evasion wide

Authors: Josh Hills, Ida Caspary, Asa Cooper Stickland
Categories: cs.AI, cs.AI
