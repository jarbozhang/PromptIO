---
title: >-
  Large Language Model-Driven Small-Capitalization Trading: Integrating
  Financial News Sentiment, Macroeconomic Indicators, and Technical Signals
url: 'https://arxiv.org/abs/2608.12283v1'
source: arXiv
source_type: arxiv
language: en
authors:
  - Alireza Kargarzadeh
  - Nariman Khaledian
  - Navid Parvini
  - Arman Khaledian
categories:
  - q-fin.PM
  - cs.CL
  - q-fin.PM
published: '2026-08-12T17:28:03Z'
fetched_at: '2026-08-13T11:03:17.820Z'
---
Large language models can extract richer signals from financial news than fixed sentiment lexicons, and recent work has explored feeding such signals into portfolio construction. We study an uncertainty-aware construction that feeds model-predicted risk -- decomposed into aleatoric and epistemic components -- directly into the covariance matrix of portfolio allocators, rather than treating portfolio risk as fixed or adjusting only expected returns. We evaluate the pipeline on Russell 2000 equities under three stock-selection regimes: a pure-alpha trigger that isolates abnormal stock moves not explained by macro indicators, a pure-beta trigger that captures macro-indicator moves before the stock itself fires, and a beta trigger in which both channels agree. Across the full holding-period grid, the separated pure-alpha and pure-beta legs usually dominate the beta intersection on Sharpe and return. Two horizons are especially informative. At one day, pure beta can work under low and moderate transaction costs because it captures immediate lead-lag spillovers from liquid macro and sector indicators into exposed small-cap stocks, but this advantage disappears at 100 bps when turnover and microstructure noise dominate. At 40 days, pure beta works for a different reason: slower macro repricing overtakes the firm-specific pure-alpha channel. The strongest conservative row is pure beta with GPT-4o mini sentiment, a Student-t target, a 40-day holding period, and risk parity allocation,

Authors: Alireza Kargarzadeh, Nariman Khaledian, Navid Parvini, Arman Khaledian
Categories: q-fin.PM, cs.CL, q-fin.PM
