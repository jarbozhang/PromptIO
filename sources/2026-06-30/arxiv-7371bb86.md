---
title: >-
  Vision-Default, Prior-Override: Causal Mechanisms of Perception-Knowledge
  Conflict in Vision-Language Models
url: 'https://arxiv.org/abs/2606.28273v1'
source: arXiv
source_type: arxiv
language: en
authors:
  - Niclas Lietzow
  - Danielle Bitterman
  - Carsten Eickhoff
  - William Rudman
  - Michal Golovanevsky
categories:
  - cs.CL
  - cs.CL
published: '2026-06-26T17:16:04Z'
fetched_at: '2026-06-29T23:02:47.153Z'
---
Vision-language models must reconcile visual evidence with memorized world knowledge when the two conflict. How they resolve this conflict shapes the reliability of multimodal systems, yet prior work characterizes it behaviorally without a component-level causal account. We combine activation patching across three granularities (residual stream, attention heads, and MLP sublayers) with model-component ablation studies and mechanistic analysis. Across three VLM families, we find that visual grounding emerges by default, whereas prior grounding depends on a small set of causally necessary attention heads (2.5-4.8%) concentrated in the second half of the network. These heads enable answers from stored world knowledge (e.g., "red" for a strawberry) despite conflicting visual input. Ablating them flips predictions from knowledge-grounded to visually grounded answers in 68-96% of cases under prior-knowledge prompts, but changes only 0.8-7.5% of visually grounded predictions, establishing an asymmetric causal structure. The identified heads decompose into routing heads, which modulate information flow, and writing heads, which directly project answer tokens into the residual stream. This structure is consistent across model families and scales, revealing a sparse causal circuit underlying perception-knowledge conflict in VLMs.

Authors: Niclas Lietzow, Danielle Bitterman, Carsten Eickhoff, William Rudman, Michal Golovanevsky
Categories: cs.CL, cs.CL
