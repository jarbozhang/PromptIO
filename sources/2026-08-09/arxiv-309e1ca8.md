---
title: Optimal Rates for Learning with Monotone Adversaries
url: 'https://arxiv.org/abs/2608.06337v1'
source: arXiv
source_type: arxiv
language: en
authors:
  - Anay Mehrotra
categories:
  - stat.ML
  - cs.DS
  - cs.LG
  - math.ST
  - stat.ML
published: '2026-08-06T17:45:32Z'
fetched_at: '2026-08-09T11:02:09.599Z'
---
A monotone adversary observes an i.i.d. labeled sample and appends a finite number of further examples of its choice, every one of them labeled correctly by the target hypothesis. The learner sees a uniform shuffle of the combined sample and is scored on the original distribution. Every example is correctly labeled, but the insertions depend on the clean sample, so the combined sample is not exchangeable. Larsen, Pabbaraju, and Shetty, who introduced this model, showed that empirical risk minimization attains expected error $O((d/n)\log(n/d))$ for classes of VC dimension $d$, and that every known optimal learner can be pushed away from the $Θ(d/n)$ rate, optimal for PAC learning. They asked whether the extra logarithm is an artifact of those particular algorithms or an inherent consequence of the lack of exchangeability. We show that this additional cost is inherent beyond VC dimension one. In the worst case over classes of VC dimension $d$ and over known finite insertion budgets, the minimax expected error is $Θ(1/n)$ at $d=1$ and $Θ((d/n)\log(n/d))$ for $d\geq 2$. The same rates hold with Littlestone dimension $d_{\mathrm L}$ in place of $d$, so the clean online-to-batch rate $O(d_{\mathrm L}/n)$ is unattainable as well. Thus, somewhat counterintuitively, adding correctly labeled examples can make learning harder by a logarithmic factor, even for classes that admit finite mistake bounds in online learning. The dimension-one upper bound is achieved by a simple improper learn

Authors: Anay Mehrotra
Categories: stat.ML, cs.DS, cs.LG, math.ST, stat.ML
