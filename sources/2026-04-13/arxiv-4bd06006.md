---
title: >-
  Sim-to-Real Transfer for Muscle-Actuated Robots via Generalized Actuator
  Networks
url: 'https://arxiv.org/abs/2604.09487v1'
source: arXiv
source_type: arxiv
language: en
authors:
  - Jan Schneider
  - Mridul Mahajan
  - Le Chen
  - Simon Guist
  - Bernhard Schölkopf
categories:
  - cs.RO
  - cs.LG
  - cs.RO
published: '2026-04-10T16:52:54Z'
fetched_at: '2026-04-13T08:33:54.777Z'
---
Tendon drives paired with soft muscle actuation enable faster and safer robots while potentially accelerating skill acquisition. Still, these systems are rarely used in practice due to inherent nonlinearities, friction, and hysteresis, which complicate modeling and control. So far, these challenges have hindered policy transfer from simulation to real systems. To bridge this gap, we propose a sim-to-real pipeline that learns a neural network model of this complex actuation and leverages established rigid body simulation for the arm dynamics and interactions with the environment. Our method, called Generalized Actuator Network (GeAN), enables actuation model identification across a wide range of robots by learning directly from joint position trajectories rather than requiring torque sensors. Using GeAN on PAMY2, a tendon-driven robot powered by pneumatic artificial muscles, we successfully deploy precise goal-reaching and dynamic ball-in-a-cup policies trained entirely in simulation. To the best of our knowledge, this result constitutes the first successful sim-to-real transfer for a four-degrees-of-freedom muscle-actuated robot arm.

Authors: Jan Schneider, Mridul Mahajan, Le Chen, Simon Guist, Bernhard Schölkopf
Categories: cs.RO, cs.LG, cs.RO
