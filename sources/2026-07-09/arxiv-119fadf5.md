---
title: >-
  Pitwall: Faithful Natural-Language Race-Strategy Briefings from a Calibrated
  Real-Time Monte Carlo Engine
url: 'https://arxiv.org/abs/2607.06495v1'
source: arXiv
source_type: arxiv
language: en
authors:
  - Juan S. Santillana
categories:
  - cs.CL
  - cs.AI
  - cs.LG
  - stat.AP
  - cs.CL
published: '2026-07-07T16:55:39Z'
fetched_at: '2026-07-08T23:03:06.348Z'
---
Live sports commentary is grounded generation under a deadline: statements concern real, named athletes, the grounding state changes every few seconds, and no reference text exists at generation time. We present Pitwall, a production system that generates natural-language Formula 1 strategy briefings in English, Spanish, and Portuguese, treating faithfulness as an architectural property rather than an aspiration: every published sentence is decomposed into typed factual claims (positions, gaps, tyres, pace, overtakes, race control) and each claim is verified against the probabilistic race state that prompted it. The same verifier gates the fine-tuning data: of 3,045 model-written targets, only the 81.9% whose every claim is state-supported are retained, the rest falling back to a provably faithful template, so the generator never sees an ungrounded target. Verification is meaningful because of the grounding substrate: a vectorized Monte Carlo engine (N=2,000 per-lap race continuations) calibrated on 126 races (2018-2024) and validated on fully held-out 2025-2026 seasons (winner-in-top-3 90.3% over 155 backtests; held-out Brier 0.0745). A recurring finding spans both halves of the system: virtues trade off and must be gated separately. In simulation, calibration-optimal is not decision-optimal; in generation, fine-tuning on richer targets buys vividness that collapses into hallucination when the grounding state is sparse -- a failure a four-base replication traces to base-mode

Authors: Juan S. Santillana
Categories: cs.CL, cs.AI, cs.LG, stat.AP, cs.CL
