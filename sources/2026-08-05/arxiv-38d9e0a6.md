---
title: >-
  Agogic: Performance-Timed Music Tokens for LLM-Native Text-to-Symbolic-Music
  Generation
url: 'https://arxiv.org/abs/2608.03999v1'
source: arXiv
source_type: arxiv
language: en
authors:
  - Junhao Chen
  - Mingjin Chen
  - Jingjia Mao
  - Lin Chen
  - Saining Zhang
categories:
  - cs.SD
  - cs.CL
  - cs.SD
published: '2026-08-04T17:56:49Z'
fetched_at: '2026-08-05T11:02:38.582Z'
---
Text-to-music language models begin with a choice usually made by default: how to tokenize music. Normally entangled with backbone, data, and recipe, its effect has never been measured in isolation. We fix pretrained Qwen3.5 (0.8B-27B), data, budget, and decoding, and swap only the representation across seven tokenizations, anchoring texture metrics to each representation's model-free ceiling. The ordering is clean and surprising: representation, not model size, is the binding variable for distributional fidelity. Scaling the backbone 34x barely moves Frechet Music Distance (FMD), whereas switching representation halves it. PMT, a performance-resolution stream we release (10 ms timing, per-note velocity, multi-track texture; 609 symbols), reaches FMD 159 at 0.8B against 272-286 for beat grids (1.7-1.8x lower, up to 2.8x elsewhere; non-overlapping bootstrap CIs), so a 0.8B performance-resolution model beats a 27B beat grid. It reappears on a 26M from-scratch backbone and a second performance-resolution tokenizer: a property of the class, not one lucky vocabulary. Nor is it a finer-lattice artifact: snapping PMT's onsets to the beat grids' resolution still leaves it 67-129 FMD ahead of both (n=500). The effect is distributional; whether it is audible is a separate question, left open by our probe, with a human study pre-registered. Native caption adherence is weak but separable: a lightweight decode-time constraint doubles instrument-F1 (.28 to .60) and Correct-Key (.16 to .35)

Authors: Junhao Chen, Mingjin Chen, Jingjia Mao, Lin Chen, Saining Zhang
Categories: cs.SD, cs.CL, cs.SD
