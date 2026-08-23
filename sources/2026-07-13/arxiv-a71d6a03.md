---
title: Super Weights in LLMs and the Failure of Selective Training
url: 'https://arxiv.org/abs/2607.08733v1'
source: arXiv
source_type: arxiv
language: en
authors:
  - Shreyas Subramanian
  - Adewale Akinfaderin
  - Akarsha Sehwag
categories:
  - cs.LG
  - cs.LG
published: '2026-07-09T17:35:00Z'
fetched_at: '2026-07-12T23:02:53.811Z'
---
Recent work identified Super Weights, individual parameters whose removal degrades model performance by orders of magnitude. We show that this degradation due to pruning Super Weights does not universally apply to all LLMs. Furthermore, if these parameters are so important, Super Weight-aware training should be effective. We show the opposite. Training Super Weights in isolation (100 to 8,192 parameters) drops accuracy to random-guessing levels on both OLMo-1B and OLMo-7B, and expanding to local neighborhoods of up to 36K parameters provides no improvement. The failure is specific to Super Weight coordinates: training an equal number of randomly chosen positions in the same down_proj layers instead improves over the baseline, so the collapse comes from targeting Super Weights, not from sparsity itself. Vanilla LoRA, updating every position in attention weight matrices through low-rank structure, succeeds with only 0.16% of parameters, and applying the same low-rank update to down_proj succeeds as well. A 10-seed ablation confirms that constraining LoRA updates at positions corresponding to Super Weight coordinates yields statistically indistinguishable results. These findings establish that parameter importance does not imply parameter trainability in isolation, and that effective fine-tuning relies on structured decompositions over entire layers rather than targeting individually important weights.

Authors: Shreyas Subramanian, Adewale Akinfaderin, Akarsha Sehwag
Categories: cs.LG, cs.LG
