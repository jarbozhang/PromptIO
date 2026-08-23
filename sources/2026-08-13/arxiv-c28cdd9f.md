---
title: >-
  DreamFly: Causal Memory and Receding-Horizon Diffusion Planning for Aerial
  Vision-Language Navigation
url: 'https://arxiv.org/abs/2608.12308v1'
source: arXiv
source_type: arxiv
language: en
authors:
  - Yan Deng
  - Fei Xu
categories:
  - cs.CV
  - cs.AI
  - cs.CV
published: '2026-08-12T17:54:33Z'
fetched_at: '2026-08-13T11:03:17.818Z'
---
Aerial vision-language navigation (VLN) requires an embodied agent to integrate visual evidence over time, plan future actions, and determine when it has reached a navigation goal under partial observability. Although recent VLA models offer a promising perception-to-action paradigm, adapting them to aerial navigation remains challenging due to limited historical context, short planning horizons, and unreliable implicit termination. To address these challenges, we propose DreamFly, a diffusion-based aerial VLN framework built on Dream-VLA. DreamFly introduces a causally aligned historical memory that augments the current visual representation using only observations preceding the current decision step, enabling temporal reasoning without future information leakage. We further formulate navigation as receding-horizon diffusion planning, where the policy predicts a $K$-step action chunk but executes only the first action before replanning. This plan-$K$, execute-one strategy uses future actions as auxiliary planning targets while preserving closed-loop visual feedback. Finally, LiteStop estimates the stop probability directly from action logits at the initial all-mask state, decoupling explicit termination from action generation. Experiments on the OpenFly benchmark demonstrate consistent improvements in seen and unseen environments. DreamFly achieves 32.04%/29.46% SR and 28.22%/23.54% SPL on the test-seen/test-unseen splits, respectively, outperforming all compared methods on 

Authors: Yan Deng, Fei Xu
Categories: cs.CV, cs.AI, cs.CV
