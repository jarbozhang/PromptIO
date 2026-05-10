---
title: >-
  Why Global LLM Leaderboards Are Misleading: Small Portfolios for Heterogeneous
  Supervised ML
url: 'https://arxiv.org/abs/2605.06656v1'
source: arXiv
source_type: arxiv
language: en
authors:
  - Jai Moondra
  - Ayela Chughtai
  - Bhargavi Lanka
  - Swati Gupta
categories:
  - cs.LG
  - cs.DM
  - cs.ET
  - math.OC
  - cs.LG
published: '2026-05-07T17:57:58Z'
fetched_at: '2026-05-10T05:29:17.421Z'
---
Ranking LLMs via pairwise human feedback underpins current leaderboards for open-ended tasks, such as creative writing and problem-solving. We analyze ~89K comparisons in 116 languages from 52 LLMs from Arena, and show that the best-fit global Bradley-Terry (BT) ranking is misleading. Nearly 2/3 of the decisive votes cancel out, and even the top 50 models according to the global BT ranking are statistically indistinguishable (pairwise win probabilities are at most 0.53 within the top 50 models). We trace this failure to strong, structured heterogeneity of opinions across language, task, and time. Moreover, we find an important characteristic - *language* plays a key role. Grouping by language (and families) increases the agreement of votes massively, resulting in two orders of magnitude higher spread in the ELO scores (i.e., very consistent rankings). What appears as global noise is in fact a mixture of coherent but conflicting subpopulations. To address such heterogeneity in supervised machine learning, we introduce the framework of $(λ, ν)$-portfolios, which are small sets of models that achieve a prediction error at most $λ$, "covering" at least a $ν$ fraction of users. We formulate this as a variant of the set cover problem and provide guarantees using the VC dimension of the underlying set system. On the Arena data, our algorithms recover just 5 distinct BT rankings that cover over 96% of votes at a modest $λ$, compared to the 21% coverage by the global ranking. We also 

Authors: Jai Moondra, Ayela Chughtai, Bhargavi Lanka, Swati Gupta
Categories: cs.LG, cs.DM, cs.ET, math.OC, cs.LG
