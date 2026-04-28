---
title: Impact of Age Specialized Models for Hypoglycemia Classification
url: 'https://arxiv.org/abs/2604.23732v1'
source: arXiv
source_type: arxiv
language: en
authors:
  - Beyza Cinar
  - Maria Maleshkova
categories:
  - cs.LG
  - cs.AI
  - cs.HC
  - cs.LG
published: '2026-04-26T14:20:10Z'
fetched_at: '2026-04-28T02:04:33.984Z'
---
Disease progression varies with age and is influenced by underlying genetic, biochemical, and hormonal etiologies, suggesting the need for tailored monitoring, care, and medication beyond standard clinical guidelines. Specifically, in autoimmune diseases like type 1 diabetes (T1D), where patients depend on exogenous insulin to compensate for insulin deficiency, medication dosing and the physiological response reflected in vital signs can differ. Insulin therapy can lead to hypoglycemia, a dangerous condition characterized by decreased blood glucose levels ($\leq$70). This risk can be mitigated through improved diabetes management supported by data analytics. Notably, leveraging data from continuous glucose monitoring (CGM) devices, hypoglycemia onset can be predicted. However, while glucose variability, auto-antibody levels, and hypoglycemia occurrence differ across age groups, hypoglycemia classification most often only relies on population-based models specialized in specific age ranges. In this work, we classify hypoglycemia 0, 5-15, 20-45, and 50-120 minutes before onset using DiaData, a large CGM dataset of patients with T1D ranging from children to seniors. In particular, we investigate: 1) the generalizability of a population-based model including all age groups, 2) the impact of age-segmented models trained separately per age group, and 3) the effect of model individualization through transfer learning. The results show that a global population-based model yields simi

Authors: Beyza Cinar, Maria Maleshkova
Categories: cs.LG, cs.AI, cs.HC, cs.LG
