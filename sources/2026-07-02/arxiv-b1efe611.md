---
title: 'Surrogate Fidelity: When Can Open LLMs Explain Closed Ones?'
url: 'https://arxiv.org/abs/2606.32008v1'
source: arXiv
source_type: arxiv
language: en
authors:
  - Philippe Chlenski
  - Zachariah Carmichael
  - Ayush Warikoo
  - Chia-Tse Shao
  - Yingxiao Ye
categories:
  - cs.LG
  - cs.LG
published: '2026-06-30T17:43:44Z'
fetched_at: '2026-07-01T23:03:14.709Z'
---
Mechanistic interpretability (MI) requires full access to model internals, yet the APIs for most widely deployed language models at best expose log-probabilities over output tokens. This creates a surrogate problem: when do measurements made on open models allow us to make claims about a closed model? We evaluate surrogate fidelity at the prediction, attribution, and representation levels. For binary classification tasks, log-odds provide an API-compatible scalar readout of the model's representation space, and leave-one-out attributions provide insight into model behavior. Across eleven models spanning four families (Llama, Qwen, GPT, and Gemini), we find that prediction fidelity substantially overstates attribution fidelity: models that agree on what the answer is often disagree on why. We document an access-validity inversion: white-box signals like attention patterns and perturbation magnitudes are highly stable across models but only weakly predictive of causal attributions, which black-box input ablations capture by design. Mechanistic insight does not automatically transfer to closed targets, and prediction-level agreement is insufficient to warrant such transfer. Code and results are available at https://github.com/facebookresearch/surrogate.

Authors: Philippe Chlenski, Zachariah Carmichael, Ayush Warikoo, Chia-Tse Shao, Yingxiao Ye
Categories: cs.LG, cs.LG
