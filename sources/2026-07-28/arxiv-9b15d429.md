---
title: >-
  Eviction as Estimation: A Fixed-Lag Smoothing View of Test-Time Memory, and
  When Measuring Beats Accumulating
url: 'https://arxiv.org/abs/2607.24667v1'
source: arXiv
source_type: arxiv
language: en
authors:
  - Maruthi Vemula
  - Neeraj Praneeth Gajula
categories:
  - cs.AI
  - cs.AI
published: '2026-07-27T17:08:27Z'
fetched_at: '2026-07-28T11:02:16.573Z'
---
A language model with a bounded working memory must repeatedly decide which stored items to keep. Every deployed method decides the moment an item arrives, from the past (StreamingLLM, H2O) or from a guess about the future (SnapKV). We recast the choice as an estimation problem on a hidden signal, whether an item will be reused, placing existing methods on one axis, the commit lag $H$: online filters and learned predictors commit at $H=0$, while Belady's offline optimum sits where the whole future is known. The missing regime in between, fixed-lag smoothing, waits a bounded number of steps, observes which items a correct near-future prediction attended to, and only then commits. This measurement, demonstrated utility, turns Belady's unobservable future request into something we read off the model itself. We instantiate it as a training-free policy, RMM, a strict generalization of H2O that reduces to it exactly when the measurement is uniform. In controlled settings where reuse is endogenous and separated in time, demonstrated utility identifies used memory far better than accumulated attention, and a small bounded memory behaves like a much larger one. But on independent third-party benchmarks, run inside NVIDIA's KVPress harness against its own SnapKV, H2O, and StreamingLLM implementations, the advantage mostly disappears: RMM is on par with H2O for single-turn question answering and loses to both H2O and SnapKV in a streaming multi-turn setting. The cause is simple: on natu

Authors: Maruthi Vemula, Neeraj Praneeth Gajula
Categories: cs.AI, cs.AI
