---
title: Target Policy Optimization
url: 'https://arxiv.org/abs/2604.06159v1'
source: arXiv
source_type: arxiv
language: en
authors:
  - Jean Kaddour
categories:
  - cs.LG
  - cs.LG
published: '2026-04-07T17:55:59Z'
fetched_at: '2026-04-08T02:58:13.562Z'
---
In RL, given a prompt, we sample a group of completions from a model and score them. Two questions follow: which completions should gain probability mass, and how should the parameters move to realize that change? Standard policy-gradient methods answer both at once, so the update can overshoot or undershoot depending on the learning rate, clipping, and other optimizer choices. We introduce \emph{Target Policy Optimization} (TPO), which separates the two questions. Given scored completions, TPO constructs a target distribution $q_i \propto p_i^{\,\mathrm{old}} \exp(u_i)$ and fits the policy to it by cross-entropy. The loss gradient on sampled-completion logits is $p^θ- q$, which vanishes once the policy matches the target. On tabular bandits, transformer sequence tasks, and billion-parameter LLM RLVR, TPO matches PG, PPO, GRPO, and DG on easy tasks and substantially outperforms them under sparse reward. Code is available at https://github.com/JeanKaddour/tpo.

Authors: Jean Kaddour
Categories: cs.LG, cs.LG
