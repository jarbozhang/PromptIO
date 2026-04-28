---
title: >-
  Beyond coauthorship: semantic structure and phantom collaborators in
  transportation research, 1967--2025
url: 'https://arxiv.org/abs/2604.23699v1'
source: arXiv
source_type: arxiv
language: en
authors:
  - Seongjin Choi
categories:
  - cs.DL
  - cs.LG
  - cs.DL
published: '2026-04-26T13:26:42Z'
fetched_at: '2026-04-28T02:04:33.990Z'
---
We present a semantic-structural atlas of transportation research built from 120{,}323 papers across 34 peer-reviewed journals published between 1967 and 2025, roughly an order of magnitude larger than and a decade beyond Sun and Rahwan's~(2017) coauthorship study. We use OpenAlex and Crossref as open, CC0-licensed data sources, resolve author identity through OpenAlex author IDs, ORCID records, and manual alias resolution, and embed every paper with SPECTER2 with Arora-style whitening concatenated with concept TF--IDF and venue linear-discriminant projections. On this substrate we report three findings. First, Leiden on the author-level semantic k-nearest-neighbor graph yields 23 topic communities that agree only weakly with the 172 coauthor communities (normalized mutual information $0.23$), opening room for a predictive layer that neither source encodes alone. Second, a multiplex Leiden partition combining both edge types recovers 181 communities and localizes where collaboration and topic structure decouple. Third -- the paper's core methodological contribution -- we define \emph{phantom collaborators}, pairs of authors who are top-$K$ semantic neighbors yet $\geq 3$ hops apart in the coauthor graph, and show via a temporal hold-out (training cutoff 2019) that phantom pairs become real coauthors in 2020--2025 at a rate $16$ to $33$ times above random, popularity-weighted, and same-venue baselines, with a $68$-fold monotone gradient between the highest- and lowest-similari

Authors: Seongjin Choi
Categories: cs.DL, cs.LG, cs.DL
