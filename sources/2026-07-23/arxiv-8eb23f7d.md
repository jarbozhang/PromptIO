---
title: >-
  Train the Model, Not the Reader: Decodability Supervision for Verifiable
  Activation Explanations
url: 'https://arxiv.org/abs/2607.20379v1'
source: arXiv
source_type: arxiv
language: en
authors:
  - Hiskias Dingeto
categories:
  - cs.AI
  - cs.CL
  - cs.AI
published: '2026-07-22T17:10:23Z'
fetched_at: '2026-07-23T11:02:10.166Z'
---
Natural-language autoencoders score explanations of hidden activations by reconstruction: an explanation is deemed faithful if the activation can be regenerated from it. The test is structurally insensitive to individual false claims: if flipping a claim does not change the reconstruction, the claim is never penalized. We show the test is passed in two ways, neither faithful. On a released Qwen-2.5-7B verbalizer, explanations reconstruct well above chance while ~2% of specific claims are reconstruction-dependent, so the score tracks gist, not specific facts. Under exact synthetic ground truth, the standard recipe develops co-adapted private codes (false wording the reconstruction depends on) in 5/5 runs, and fixes that leave the target model unchanged do not help. We contribute two audit protocols, the grounded-vs-true cross and the evaluator swap, and RECAP (Readable Encodings via Co-trained Auxiliary Predictors): linear heads trained alongside the target model to keep designated content decodable. On RECAP-trained sandbox models, fresh verbalizers state the designated content truly and the codes vanish, at a +0.001-nat cost. This replicates on a pretrained Pythia-160M: the content becomes reliably probe-decodable, though a fresh verbalizer conveys it only in part (truth 0.44-0.46 vs a near-zero control). For interpretability, high reconstruction does not certify individual claims. For AI safety, RECAP makes designated internal content independently checkable against probes 

Authors: Hiskias Dingeto
Categories: cs.AI, cs.CL, cs.AI
