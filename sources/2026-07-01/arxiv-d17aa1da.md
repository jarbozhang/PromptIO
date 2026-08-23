---
title: >-
  Pessimism's Paradox: Conservative Offline Training Amplifies Reward Hacking
  During Online Adaptation in Reasoning Models
url: 'https://arxiv.org/abs/2606.30627v1'
source: arXiv
source_type: arxiv
language: en
authors:
  - Subramanyam Sahoo
  - Aman Chadha
  - Vinija Jain
  - Divya Chaudhary
categories:
  - cs.LG
  - cs.AI
  - stat.ML
  - cs.LG
published: '2026-06-29T17:56:03Z'
fetched_at: '2026-06-30T23:02:51.935Z'
---
Conservative offline training is widely advocated as a safe foundation for subsequent online adaptation: if a policy stays close to well-supported behaviour, the argument goes, it is less likely to exploit imperfections in a learned reward model. We challenge this intuition empirically and mechanistically. We train a Qwen3-14B policy under Direct Preference Optimisation (DPO) with three levels of conservatism ($β\in \{β_{\mathrm{lo}}, β_{\mathrm{mid}}, β_{\mathrm{hi}}\}$ derived from empirical log-ratio percentiles), then adapt each checkpoint online against a learned reward ensemble (3\,$\times$\,Qwen3-1.7B) while measuring true performance on GSM8K exact-answer accuracy. We find that \emph{higher offline conservatism monotonically increases reward-hacking damage}, measured by the Goodhart gap and its area under the curve (AUGC), with Spearman $ρ= 1.0$ across all three conditions. Mechanistic analysis reveals a three-link causal chain: (i) high-$β$ DPO compresses policy entropy, (ii) Low-entropy policies generate responses with reduced diversity, concentrating in a narrow region of the reward model's training distribution (lower pairwise cosine distance), and (iii) despite this proximity, ensemble disagreement (epistemic uncertainty) increases with $β$ and is exploited faster during online optimisation. We further fit a power-law curve to the $(β, \augc)$ data and identify a practical optimal conservatism level $β^{\star}$ that balances alignment fidelity against hacking vul

Authors: Subramanyam Sahoo, Aman Chadha, Vinija Jain, Divya Chaudhary
Categories: cs.LG, cs.AI, stat.ML, cs.LG
