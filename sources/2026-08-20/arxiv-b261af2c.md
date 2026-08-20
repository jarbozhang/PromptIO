---
title: Comment-level Topic Drift Analysis in the Reddit Corpus
url: 'https://arxiv.org/abs/2608.19133v1'
source: arXiv
source_type: arxiv
language: en
authors:
  - Steven Morse
  - Daniel Runfola
  - Trenton W. Ford
categories:
  - cs.CL
  - cs.CL
published: '2026-08-19T17:27:25Z'
fetched_at: '2026-08-20T11:02:39.303Z'
---
We present a novel application of embedding-based dynamic topic modeling techniques to detect and quantify topic drift at the comment level in a massive corpus. By leveraging pretrained language models to generate contextualized semantic embeddings for short text, we analyzed 12.7 billion Reddit comments spanning 2006 to 2022. Using unsupervised methods on these embeddings, we identify dynamically evolving topic clusters over time. Our primary contribution is a methodology for analysis of semantic drift and discourse evolution in the embedding space itself. We also demonstrate modifications to existing methods that enable this analysis at scale, and we propose and demonstrate a null model comparison test to filter spurious dynamics. Key findings suggest that politically and socially contentious topics exhibit significant directional drift in embedding space, with inter-topic distances changing systematically over time beyond what the null model can explain, whereas domains such as music and sports remain comparatively stable.

Authors: Steven Morse, Daniel Runfola, Trenton W. Ford
Categories: cs.CL, cs.CL
