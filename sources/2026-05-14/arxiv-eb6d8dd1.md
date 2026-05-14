---
title: What is Learnable in Valiant's Theory of the Learnable?
url: 'https://arxiv.org/abs/2605.13840v1'
source: arXiv
source_type: arxiv
language: en
authors:
  - Steve Hanneke
  - Anay Mehrotra
  - Grigoris Velegkas
  - Manolis Zampetakis
categories:
  - stat.ML
  - cs.DS
  - cs.LG
  - math.ST
  - stat.CO
  - stat.ML
published: '2026-05-13T17:58:46Z'
fetched_at: '2026-05-14T12:15:41.545Z'
---
Valiant's 1984 paper is widely credited with introducing the PAC learning model, but it, in fact, introduced a different model: unlike PAC learning, the learner receives only positives, may issue membership queries, and must output a hypothesis with no false positives. Prior work characterized variants, including the case without queries. We revisit Valiant's original model and ask: *Which classes are learnable in it?* For every finite domain, including Valiant's Boolean-hypercube setting, we show that a class is learnable if and only if every realizable positive sample can be certified by a poly-size adaptive query-compression scheme. This is a new variant of sample compression where the learner certifies samples via a short interaction with the membership oracle. Our characterization shows that learnability in Valiant's model is strictly sandwiched between learnability in the PAC model and the variant of Valiant's model without membership queries. This is one of the rare cases where introducing membership queries changes the set of learnable classes, and not just the sample or computational complexity. Next, we study the natural extension of the model to arbitrary domains. While we do not obtain an exact characterization, our techniques readily generalize and show that the same strict sandwiching persists. Finally, we show that $d$-dimensional halfspaces, which are not learnable without queries, are learnable with queries: we give a $\mathrm{poly}(d) \tilde{O}(1/ε)$ sample 

Authors: Steve Hanneke, Anay Mehrotra, Grigoris Velegkas, Manolis Zampetakis
Categories: stat.ML, cs.DS, cs.LG, math.ST, stat.CO, stat.ML
