---
title: 'Beyond Red-Teaming: Formal Guarantees of LLM Guardrail Classifiers'
url: 'https://arxiv.org/abs/2605.10901v1'
source: arXiv
source_type: arxiv
language: en
authors:
  - Nikita Kezins
  - Urbas Ekka
  - Pascal Berrang
  - Luca Arnaboldi
categories:
  - cs.LG
  - cs.LG
published: '2026-05-11T17:41:38Z'
fetched_at: '2026-05-12T11:42:53.212Z'
---
Guardrail Classifiers defend production language models against harmful behavior, but although results seem promising in testing, they provide no formal guarantees. Providing formal guarantees for such models is hard because "harmful behavior" has no natural specification in a discrete input space: and the standard epsilon-ball properties used in other domains do not carry semantic meaning. We close this gap by shifting verification from the discrete input space to the classifier's pre-activation space, where we define a harmful region as a convex shape enclosing the representations of known harmful prompts. Because the sigmoid classification head is monotonic, certifying the worst-case point is sufficient to certify the entire region, yielding a closed-form soundness proof without approximation in O(d) time. To formally evaluate these classifiers, we propose two constructions of such regions: SVD-aligned hyper-rectangles, which yield exact SAT/UNSAT certificates, and Gaussian Mixture Models, which yield probabilistic certificates over semantically coherent clusters. Applying this framework to three author-trained Guardrail Classifiers on the toxicity domain, every hyper-rectangle configuration returns SAT, exposing verifiable safety holes across all classifiers, despite seemingly high empirical metrics. Probabilistic GMM certificates also expose a divergent structural stability in how these models represent harm. While GPT-2 and Llama-3.1-8B maintain robust coverage of 90% a

Authors: Nikita Kezins, Urbas Ekka, Pascal Berrang, Luca Arnaboldi
Categories: cs.LG, cs.LG
