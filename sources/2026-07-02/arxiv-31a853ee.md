---
title: >-
  Reinforcement Learning with Metacognitive Feedback Elicits Faithful
  Uncertainty Expression in LLMs
url: 'https://arxiv.org/abs/2606.32032v1'
source: arXiv
source_type: arxiv
language: en
authors:
  - Gabrielle Kaili-May Liu
  - Avi Caciularu
  - Gal Yona
  - Idan Szpektor
  - Arman Cohan
categories:
  - cs.CL
  - cs.AI
  - cs.CL
published: '2026-06-30T17:56:01Z'
fetched_at: '2026-07-01T23:03:14.689Z'
---
Metacognition is a critical component of intelligence that describes the ability to monitor and regulate one's own cognitive processes. Yet LLMs exhibit systemic deficiencies in key metacognitive faculties: they hallucinate with high confidence, fail to recognize knowledge boundaries, and misrepresent their internal uncertainty--undermining trustworthiness and reliability. Since monitoring task performance and adapting behavior accordingly are central to metacognition, we posit that models capable of accurately judging their own performance are better positioned to improve it. We operationalize this idea via two novel mechanisms: reinforcement learning with metacognitive feedback (RLMF), a paradigm to refine completion rankings during preference optimization based on the quality of a model's self-judgments of performance, and metacognitive data selection, which uses similar self-judgments to identify high-value training examples, outperforming naive active learning. We apply these innovations to the problem of faithful calibration (FC), a task that is itself fundamentally metacognitive: the goal is to align expressed with intrinsic uncertainty, difficult even for frontier LLMs. We adopt a two-stage, decoupled approach, first using these methods to calibrate the faithfulness of models' self-reported confidence scores, then mapping to natural, context-adaptable linguistic uncertainty via targeted output editing. Extensive experiments show RLMF achieves generalizable, state-of-t

Authors: Gabrielle Kaili-May Liu, Avi Caciularu, Gal Yona, Idan Szpektor, Arman Cohan
Categories: cs.CL, cs.AI, cs.CL
