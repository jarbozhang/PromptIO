---
title: >-
  Designing Reward Signals for Portable Query Generation: A Case Study in
  Industrial Semantic Job Search
url: 'https://arxiv.org/abs/2606.27291v1'
source: arXiv
source_type: arxiv
language: en
authors:
  - Ping Liu
  - Qianqi Shen
  - Jianqiang Shen
  - Wenqiong Liu
  - Rajat Arora
categories:
  - cs.LG
  - cs.LG
published: '2026-06-25T17:09:12Z'
fetched_at: '2026-06-28T23:02:11.931Z'
---
Job-search platforms rely on low-bandwidth query interfaces that often fail to capture the high-dimensional complexity of candidate profiles. We present an end-to-end RLAIF (Reinforcement Learning from AI Feedback) framework to generate \emph{portable} job search queries, terms that abstract away seeker-specific identifiers while preserving generalizable qualifications. This task introduces a highly adversarial reward surface where policy optimization frequently exploits flaws in LLM-as-judge rubrics, resulting in degenerate verbatim-copying behaviors. We conducted comprehensive empirical experiments to isolate the impact of optimization mechanics against structured reward engineering. Our results demonstrate that for critic-free optimizers, performance is overwhelmingly dictated by robust reward shaping, rendering the specific choice of algorithm largely immaterial. While critic-free per-rollout baseline methods (RLOO and REINFORCE++) natively resist reward-hacking, the group-relative advantage normalization in GRPO appears uniquely sensitive to spurious reward signals, making it disproportionately susceptible to exploitation. We show that introducing a deterministic, rule-based reward floor to correct for rewards assigned to verbatim copying mitigates this failure mode, resulting in a substantial $+0.147$ quality improvement on a cross-family evaluation judge. Ultimately, we show that the training-time reward model inflates performance gains by $2.4\times$, confirming that 

Authors: Ping Liu, Qianqi Shen, Jianqiang Shen, Wenqiong Liu, Rajat Arora
Categories: cs.LG, cs.LG
