---
title: >-
  Language Identification via Compositional Data Analysis: A Linear-Time
  Classifier Based on Log-Ratio Geometry
url: 'https://arxiv.org/abs/2607.15238v1'
source: arXiv
source_type: arxiv
language: en
authors:
  - Paul-Andrei Pogăcean
  - Sanda-Maria Avram
categories:
  - cs.CL
  - cs.CL
published: '2026-07-16T17:35:23Z'
fetched_at: '2026-07-17T23:02:11.587Z'
---
Language identification is commonly addressed using either neural architectures or statistical n-gram models. Neural approaches typically require substantial computational resources, whereas classical frequency-based methods offer efficient linear-time performance, but rely on distance metrics that are not always appropriate for compositional data. This work models character and bigram frequency distributions as compositional vectors constrained to the simplex and mapped via the centered log-ratio (CLR) transformation bijectively onto the $(D-1)$-dimensional zero-sum subspace of $\mathbb{R}^D$, where Euclidean distances correspond to Aitchison distances. A pipeline is proposed, combining CLR-transformed unigram and bigram features with Laplace smoothing to address sparsity. The method is evaluated on six languages. Experimental results show that the proposed approach achieves robust accuracy across different text lengths, with strong performance for longer sequences. These findings indicate that compositional representations provide a deterministic and computationally efficient alternative for language identification, particularly in settings where interpretability and low resource consumption are essential.

Authors: Paul-Andrei Pogăcean, Sanda-Maria Avram
Categories: cs.CL, cs.CL
