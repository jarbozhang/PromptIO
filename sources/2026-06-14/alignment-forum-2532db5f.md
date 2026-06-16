---
title: Tracing Eval-Awareness Emergence Through Training of OLMo 3
url: >-
  https://www.alignmentforum.org/posts/c2tqL9xPbttisAHtt/tracing-eval-awareness-emergence-through-training-of-olmo-3
source: Alignment Forum
source_type: rss
language: en
published: '2026-06-10T10:13:05.000Z'
fetched_at: '2026-06-14T14:01:49.503Z'
---
TL;DR
Recent work from Goodfire & UK AISI – Verbalized Eval Awareness Inflates Measured Safety – shows that newer open-weight models verbalize evaluation-awareness (VEA) more often, and that this inflates measured safety. Between OLMo-3-32B-Think and OLMo-3.1-32B-Think – identical base, SFT, DPO, and RL data, differing only in an additional ~3 weeks of the RLVR stage – VEA roughly doubles.
Because OLMo ships stepwise checkpoints across all training stages, we can attribute VEA growth to specific points in the pipeline. Measuring VEA across pretraining, the SFT→DPO→RLVR stages at various points on five safety benchmarks, we find:

VEA is essentially negligible during pretraining (~1%).
It is increased substantially by SFT, collapsed by DPO, and increased again by RLVR. The increase in SFT is likely driven by the SFT data containing VEA, particularly on safety prompts.
Eval-gaming behaviour (difference in refusals with or without VEA) roughly increases throughout RLVR (but with high variance).

Given OLMo is quite different from how current frontier models are trained, it is unclear whether this analysis would generalise to those models. However, as a somewhat natural setting in which to study evaluation awareness and eval-gaming emergence we think it could still produce interesting insights. We think investigating how and why RLVR in particular increases VEA and eval-gaming is the exciting next step.
These results are also relevant for efforts to produce model organisms of evaluation awareness and evaluation gaming. The fact that SFT increases VEA by training on VEA makes that finding less interesting, but the RLVR behaviour suggests eval-aware MOs may benefit from similar training if the aim is to induce more natural eval-gamin behaviour.
Motivation
Current studies of eval-awareness don't pin down which parts of post-training drive its increase. The recent Goodfire / UK AISI study (Verbalized Eval Awareness Inflates Measured Safety)  offers a useful lever: it report
