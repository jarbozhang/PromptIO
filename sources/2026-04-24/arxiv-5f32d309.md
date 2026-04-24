---
title: The Sample Complexity of Multicalibration
url: 'https://arxiv.org/abs/2604.21923v1'
source: arXiv
source_type: arxiv
language: en
authors:
  - Natalie Collina
  - Jiuyao Lu
  - Georgy Noarov
  - Aaron Roth
categories:
  - cs.LG
  - math.ST
  - stat.ML
  - cs.LG
published: '2026-04-23T17:59:01Z'
fetched_at: '2026-04-24T03:00:18.071Z'
---
We study the minimax sample complexity of multicalibration in the batch setting. A learner observes $n$ i.i.d. samples from an unknown distribution and must output a (possibly randomized) predictor whose population multicalibration error, measured by Expected Calibration Error (ECE), is at most $\varepsilon$ with respect to a given family of groups. For every fixed $κ&gt; 0$, in the regime $|G|\le \varepsilon^{-κ}$, we prove that $\widetildeΘ(\varepsilon^{-3})$ samples are necessary and sufficient, up to polylogarithmic factors. The lower bound holds even for randomized predictors, and the upper bound is realized by a randomized predictor obtained via an online-to-batch reduction. This separates the sample complexity of multicalibration from that of marginal calibration, which scales as $\widetildeΘ(\varepsilon^{-2})$, and shows that mean-ECE multicalibration is as difficult in the batch setting as it is in the online setting, in contrast to marginal calibration which is strictly more difficult in the online setting. In contrast we observe that for $κ= 0$, the sample complexity of multicalibration remains $\widetildeΘ(\varepsilon^{-2})$ exhibiting a sharp threshold phenomenon. More generally, we establish matching upper and lower bounds, up to polylogarithmic factors, for a weighted $L_p$ multicalibration metric for all $1 \le p \le 2$, with optimal exponent $3/p$. We also extend the lower-bound template to a regular class of elicitable properties, and combine it with the onl

Authors: Natalie Collina, Jiuyao Lu, Georgy Noarov, Aaron Roth
Categories: cs.LG, math.ST, stat.ML, cs.LG
