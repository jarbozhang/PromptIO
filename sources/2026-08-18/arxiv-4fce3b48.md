---
title: 'GEO-Flag: Detecting and Measuring GEO-Optimized Web Content'
url: 'https://arxiv.org/abs/2608.16824v1'
source: arXiv
source_type: arxiv
language: en
authors:
  - Junjie Chu
  - Ye Leng
  - Mingjie Li
  - Yun Shen
  - Xinyue Shen
categories:
  - cs.LG
  - cs.CR
  - cs.IR
  - cs.LG
published: '2026-08-17T17:12:11Z'
fetched_at: '2026-08-18T11:04:07.087Z'
---
Generative Engine Optimization (GEO) modifies web content to increase its likelihood of being selected and cited by generative search engines. This can give strategically optimized pages visibility disproportionate to their authority or relevance and even make weak or false information appear well supported. Unlike conventional search, generative search synthesizes information into direct answers rather than presenting competing sources, which can further amplify these risks, as assessing source provenance and authority requires additional user interaction. Despite these concerns, systematic methods for detecting GEO-optimized webpages remain underexplored. We introduce \texttt{GEOFlagBench}, a benchmark of 3,200 webpages spanning 400 queries, four domains, and eight GEO optimizer families, and use it to systematically evaluate existing GEO detection methods. Although the strongest baseline achieves an aggregate F1 of 0.880, method-level and authorship-conditioned evaluations reveal substantial weaknesses and potential reliance on authorship-related shortcuts. We therefore propose \emph{Intervention-Paired Training} (IPT), which supervises detector responses to GEO interventions and non-GEO AI polishing; on ModernBERT, IPT improves F1 from 0.862 to 0.944 and worst-group accuracy from 0.725 to 0.883. We develop a GEO-gated Agent system for auditing the Source Tier and verifiability of Citation URLs in detected GEO pages. Finally, we deploy the complete pipeline on released Goo

Authors: Junjie Chu, Ye Leng, Mingjie Li, Yun Shen, Xinyue Shen
Categories: cs.LG, cs.CR, cs.IR, cs.LG
