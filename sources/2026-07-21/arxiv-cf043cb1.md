---
title: >-
  PRISA: Proactive Infrastructure LiDAR Framework for Intersection Safety
  Assessment
url: 'https://arxiv.org/abs/2607.16156v1'
source: arXiv
source_type: arxiv
language: en
authors:
  - Tam Bang
  - Hussam Abubakr
  - Emiliano de la Garza Villarreal
  - Truc Phuong Nguyen
  - Austin Harris
categories:
  - cs.LG
  - eess.SY
  - cs.LG
published: '2026-07-17T17:35:23Z'
fetched_at: '2026-07-20T23:02:10.416Z'
---
Urban intersections are among the most hazardous locations in road networks, posing significant risks to vehicles and vulnerable road users (VRUs) such as pedestrians and cyclists. The complexity of multi-agent interactions demands continuous, real-time monitoring systems capable of anticipating conflicts before they escalate into crashes. We present PRISA, a modular infrastructure LiDAR framework leveraging privacy-preserving, low-light-robust roadside sensors for long-term traffic observation and real-time risk detection at the edge. The framework comprises two core components: a sensing and perception layer and a plug-and-play risk assessment module. The latter automatically curates site-specific training data from accumulated perception outputs to train a trajectory prediction model without manual annotation. It then deploys the trained model for continuous motion forecasting and dual surrogate safety evaluation, using Time-to-Collision (TTC) for longitudinal conflicts and Predicted Post-Encroachment Time (PPET) for crossing and VRU-involved interactions. PRISA is evaluated on the public R-LiViT dataset and deployed on an NVIDIA Jetson AGX Thor at a live signalized intersection in Chattanooga, Tennessee. PPET-based assessment operates at 194~ms end-to-end latency over a 2.4-second predictive horizon, with TTC-based detection and perception remaining within real-time constraints, demonstrating practical feasibility for proactive multi-agent intersection safety monitoring.

Authors: Tam Bang, Hussam Abubakr, Emiliano de la Garza Villarreal, Truc Phuong Nguyen, Austin Harris
Categories: cs.LG, eess.SY, cs.LG
