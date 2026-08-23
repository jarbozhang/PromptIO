---
title: 'The Low Frequency Trap: Video Language Models Fail at Simple Event Bookkeeping'
url: 'https://arxiv.org/abs/2608.06361v1'
source: arXiv
source_type: arxiv
language: en
authors:
  - Sarvesh Baskar
  - Zikui Cai
  - Shayan Shabihi
  - Anirudh Satheesh
  - Muhammad R. Islam
categories:
  - cs.AI
  - cs.AI
published: '2026-08-06T17:57:06Z'
fetched_at: '2026-08-08T11:02:02.904Z'
---
Real-world video benchmarks provide broad coverage, but their fixed clips entangle event count, rate, duration, and visual complexity, making failure modes hard to isolate. While existing programmatic benchmarks offer better control, they score only the final answer rather than auditing reported events against executable ground truth. To bridge this gap, we introduce trace-grounded parametric profiling for event counting in three controlled video tasks: bouncing-ball wall contacts, visual blinks, and categorical state transitions. Across 2,190 videos, we vary event count N and frequency F while holding rendering fixed. Each video includes an executable event trace for capability-surface estimation and timestamp-level evaluation. Our results reveal a staged temporal failure. At an 80% reliability threshold, Gemini 3.6 Flash reliably counts persistent state transitions up to 12 events at 0.5 and 1.0 Hz, yet demonstrates no reliable positive-count region for transient blinking events. Thus, event representation dictates whether a model initially accesses evidence -- a limitation that compounds as count and frequency increase. In the high-count, high-frequency regime, only 0.2% of final counts are correct and the model recovers just 18.1% of true events. To test if visual access is the primary bottleneck, we increase sampling rate. Although this boosts Bounce Ball accuracy from 19.6% to 29.3%, the reported sequence agrees with ground truth only 3.7% of the time. Extra frames can 

Authors: Sarvesh Baskar, Zikui Cai, Shayan Shabihi, Anirudh Satheesh, Muhammad R. Islam
Categories: cs.AI, cs.AI
