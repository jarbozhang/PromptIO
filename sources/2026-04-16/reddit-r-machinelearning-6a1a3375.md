---
title: >-
  Why dynamically routing multi-timescale advantages in PPO causes policy
  collapse (and a simple decoupled fix) [R]
url: >-
  https://www.reddit.com/r/MachineLearning/comments/1smr52p/why_dynamically_routing_multitimescale_advantages/
source: Reddit r/MachineLearning
source_type: rss
language: en
published: '2026-04-16T02:47:32.000Z'
fetched_at: '2026-04-16T06:06:04.638Z'
---
Hi folks,
 I’m an undergrad doing some research on temporal credit assignment, and I recently ran into a frustrating issue. Trying to fuse multi-timescale advantages (like γ = 0.5, 0.9, 0.99, 0.999) inside an Actor-Critic architecture usually leads to irreversible policy collapse or really weird local optima.
 I spent some time diagnosing exactly why this happens, and it boils down to two main optimization pathologies:
  
Surrogate Objective Hacking: When the temporal attention mechanism is exposed to policy gradients, the optimizer just finds a shortcut. It manipulates the attention weights to minimize the PPO surrogate loss, actively ignoring the actual environment control.
 The Paradox of Temporal Uncertainty: If you try to fix the above by using a gradient-free method (like inverse-variance weighting), the router just locks onto the short-term horizons because their aleatoric uncertainty is inherently lower. In delayed-reward environments like LunarLander, the agent becomes so short-sighted that it just endlessly hovers in mid-air to hoard small shaping rewards, terrified of committing to a landing.
  
The Solution: Target Decoupling
 The fix I found is essentially "Representation over Routing." You keep the multi-timescale predictions on the Critic side (which forces the network to learn incredibly robust auxiliary representations), but you strictly isolate the Actor. The Actor only gets updated using the purest long-term advantage.
 Once decoupled, the agent stops hovering and learns a highly fuel-efficient, perfect landing, consistently breaking the 200-point threshold across multiple seeds without any hyperparameter hacking.
 I got tired of bloated RL codebases, so I wrote a strict 4-stage Minimal Reproducible Example (MRE) in pure PyTorch so you can see the agent crash, hover, and finally succeed in just a few minutes.
 Paper (arXiv): https://doi.org/10.48550/arXiv.2604.13517
 GitHub (MRE + GIFs): https://github.com/ben-dlwlrma/Representation-Over-Routing
 
