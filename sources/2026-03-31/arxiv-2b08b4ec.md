---
title: 'See it to Place it: Evolving Macro Placements with Vision-Language Models'
url: 'https://arxiv.org/abs/2603.28733v1'
source: arXiv
source_type: arxiv
language: en
authors:
  - Ikechukwu Uchendu
  - Swati Goel
  - Karly Hou
  - Ebrahim Songhori
  - Kuang-Huei Lee
categories:
  - cs.LG
  - cs.LG
published: '2026-03-30T17:47:34Z'
fetched_at: '2026-03-31T04:42:13.118Z'
---
We propose using Vision-Language Models (VLMs) for macro placement in chip floorplanning, a complex optimization task that has recently shown promising advancements through machine learning methods. Because human designers rely heavily on spatial reasoning to arrange components on the chip canvas, we hypothesize that VLMs with strong visual reasoning abilities can effectively complement existing learning-based approaches. We introduce VeoPlace (Visual Evolutionary Optimization Placement), a novel framework that uses a VLM, without any fine-tuning, to guide the actions of a base placer by constraining them to subregions of the chip canvas. The VLM proposals are iteratively optimized through an evolutionary search strategy with respect to resulting placement quality. On open-source benchmarks, VeoPlace outperforms the best prior learning-based approach on 9 of 10 benchmarks with peak wirelength reductions exceeding 32%. We further demonstrate that VeoPlace generalizes to analytical placers, improving DREAMPlace performance on all 8 evaluated benchmarks with gains up to 4.3%. Our approach opens new possibilities for electronic design automation tools that leverage foundation models to solve complex physical design problems.

Authors: Ikechukwu Uchendu, Swati Goel, Karly Hou, Ebrahim Songhori, Kuang-Huei Lee
Categories: cs.LG, cs.LG
