---
title: >-
  Learned Memory Attenuation in Sage-Husa Kalman Filters for Robust UAV State
  Estimation
url: 'https://arxiv.org/abs/2605.18704v1'
source: arXiv
source_type: arxiv
language: en
authors:
  - Kenan Majewski
  - Marcin Żugaj
categories:
  - eess.SP
  - cs.LG
  - eess.SP
published: '2026-05-18T17:38:13Z'
fetched_at: '2026-05-19T07:53:23.211Z'
---
Unmanned Aerial Vehicles in dynamic environments face telemetry outages, structural vibrations, and regime-dependent noise that invalidate the stationary covariance assumptions of classical Kalman filters. The Sage-Husa Kalman Filter (SHKF) estimates noise statistics online, but its reliance on a static, scalar forgetting factor forces a strict compromise between steady-state stability and transient responsiveness. We introduce the N-Deep Recurrent Sage-Husa Filter (NDR-SHKF), which replaces this scalar parameter with a vector-valued memory attenuation policy learned by a hierarchical recurrent network operating on whitened innovation sequences. A bifurcated architecture routes shallow recurrent states to capture instantaneous sensor anomalies and deep states to encode sustained dynamic trends, while an auxiliary reconstruction objective prevents feature collapse. The complete filter, including recursive covariance updates, is trained end-to-end via backpropagation through time to directly minimize state estimation error. Evaluations on topologically distinct chaotic attractors demonstrate cross-domain generalization, outperforming purely data-driven baselines that diverge under out-of-distribution dynamics. Furthermore, evaluations on recorded real-world UAV flight datasets validate the framework's practical viability, demonstrating its capacity to bridge transitions into proprioceptive dead reckoning and outperform classical adaptive estimators during sensor outages.

Authors: Kenan Majewski, Marcin Żugaj
Categories: eess.SP, cs.LG, eess.SP
