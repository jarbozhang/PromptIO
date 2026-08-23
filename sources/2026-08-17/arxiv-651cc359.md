---
title: 'Marionette: Predicting World States, Rendering Geometry, Painting Appearance'
url: 'https://arxiv.org/abs/2608.14530v1'
source: arXiv
source_type: arxiv
language: en
authors:
  - Zian Meng
  - Zhen Li
  - Chuanhao Li
  - Qiang Li
  - Kaipeng Zhang
categories:
  - cs.CV
  - cs.AI
  - cs.CV
published: '2026-08-14T17:48:16Z'
fetched_at: '2026-08-17T11:03:44.072Z'
---
Interactive game world models typically autoregress visual observations directly in pixel or latent space, forcing structured properties such as pose, geometry, and occlusion to be implicitly maintained by the same generative sequence. Over long horizons, errors in these latent world properties accumulate, making consistency and controllability fragile. We explicitly model the evolving world state, delegate exact geometric computation to a fixed, zero-parameter renderer, and leave the neural model to synthesize appearance. We instantiate this idea as Marionette, a world model for interactive games with articulated characters. First, a two-stage autoregressive dynamics model predicts an explicit and interpretable 276-dimensional 3D world state comprising multi-entity articulated skeletons, metric root trajectories, and rotations. Second, a zero-parameter graphics bridge converts the predicted state into pose-control videos, computing world-space geometry and occlusion in closed form. Third, a control-conditioned video-diffusion observation model synthesizes photorealistic RGB observations from the resulting structured controls. Our experiments establish two properties of Marionette. First, the predicted world state is directly controllable. Forcing a mismatched action stream changes root-aligned joint error by 31% across 48 held-out segments. Second, long-horizon behaviour is determined in the state, and can be repaired there. Left free, the two generated characters drift to 2

Authors: Zian Meng, Zhen Li, Chuanhao Li, Qiang Li, Kaipeng Zhang
Categories: cs.CV, cs.AI, cs.CV
