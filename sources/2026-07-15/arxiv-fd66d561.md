---
title: Relaxing Faithfulness with Intervention-Only Causal Discovery
url: 'https://arxiv.org/abs/2607.11816v1'
source: arXiv
source_type: arxiv
language: en
authors:
  - Bijan Mazaheri
  - Jiaqi Zhang
  - Caroline Uhler
categories:
  - cs.LG
  - stat.ML
  - cs.LG
published: '2026-07-13T17:12:12Z'
fetched_at: '2026-07-14T23:03:22.243Z'
---
Causal discovery algorithms learn a network that describes the causal dependencies among random variables. A common workflow involves first utilizing conditional independence properties on observational data to determine partially directed causal relationships, then applying interventions to orient the unknown causal directions. A critical assumption for the first step is faithfulness: a requirement that causally linked variables exhibit statistical dependence. Many natural systems include buffering and stabilizing pathways that cancel out to achieve systemic robustness. This cancellation of pathways violates faithfulness, leading causal discovery algorithms to incorrectly remove causal dependencies. In this paper, we argue that hard interventions contain information about the presence/absence of causal linkage that is overlooked in the first stage of structure discovery. We show that a mild assumption -- called intervention-immediacy faithfulness -- that allows cancellations, is sufficient to nonparametrically identify causal structures with hard interventions. These results position interventions as the primary carriers of information about causal structure, which should take precedence over conditional independence testing. To flip the paradigm, we also specify equivalence classes when the identification criteria are not met due to limitations in the scope of interventions.

Authors: Bijan Mazaheri, Jiaqi Zhang, Caroline Uhler
Categories: cs.LG, stat.ML, cs.LG
