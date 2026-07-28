---
title: >-
  Denial of Deadline: Network-Driven Accuracy Collapse in Distributed Inference
  Pipelines
url: 'https://arxiv.org/abs/2607.24692v1'
source: arXiv
source_type: arxiv
language: en
authors:
  - Jhonatan Tavori
  - Gur-Eyal Sela
  - Ion Stoica
  - Gil Zussman
categories:
  - cs.NI
  - cs.AI
  - cs.CR
  - cs.DC
  - cs.NI
published: '2026-07-27T17:34:09Z'
fetched_at: '2026-07-28T11:02:16.572Z'
---
Inference systems increasingly combine a fast path that returns predictions within the application's latency deadline together with a higher-accuracy slow path that runs higher-compute methods on stronger, remote hardware, so its results can be returned on time and combined with the fast path predictions. Across several application domains, we abstract this inference architecture as a fast path, a slow path, and a coordination layer with two functions: a router that invokes the slow path and a merger that decides whether to incorporate its returned predictions. In this work, we show that this new coordination layer exposes a new attack surface: shaped workload attacks, e.g., Yo-Yo bursts, can exploit contention at shared resources along the slow path to push benign users' slow-path predictions past their latency deadlines. The merger then discards those predictions, while the fast path continues to return timely outputs. We refer to the resulting loss of slow-path accuracy benefits as accuracy collapse. We demonstrate accuracy collapse in a two-tier edge-cloud multi-object tracking pipeline in autonomous driving. In simulation, approximately 4,000 burst-shaped requests increase benign p99 latency from 92ms to 2s, nearly eliminating the benefit of the slow path's cloud inference, reducing object tracking quality by 7.0 HOTA points on average. We further find that accuracy degradation can significantly vary (2.0-18.7 HOTA points), depending on the video intervals that are targe

Authors: Jhonatan Tavori, Gur-Eyal Sela, Ion Stoica, Gil Zussman
Categories: cs.NI, cs.AI, cs.CR, cs.DC, cs.NI
