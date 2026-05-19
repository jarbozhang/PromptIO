---
title: Learning Normal Representations for Blood Biomarkers
url: 'https://arxiv.org/abs/2605.18701v1'
source: arXiv
source_type: arxiv
language: en
authors:
  - Aashna P. Shah
  - Michelle M. Li
  - Yash Lal
  - Seffi Cohen
  - Liat F. Antwarg
categories:
  - cs.LG
  - q-bio.QM
  - cs.LG
published: '2026-05-18T17:37:05Z'
fetched_at: '2026-05-19T07:53:23.212Z'
---
Blood-based biomarkers underpin clinical diagnosis and management, yet their interpretation relies largely on fixed population reference intervals that ignore stable, intra-patient variability. As such, population-based interpretation can mask meaningful deviation from an individual's baseline, risking delayed disease detection. To remedy this, there have been increasing efforts to personalize blood biomarker interpretation using individual testing histories. However, these methods may overfit to sparse data, inflating false-positive rates and unnecessary follow-up, and can also unwittingly include unrecognized or subclinical disease. Here, we leverage nearly 2 billion longitudinal laboratory measurements from over 1.6 million individuals across North America, the Middle East, and East Asia, to show that while laboratory values are highly individual, purely personalized intervals routinely overfit, classifying up to 68% of measurements as abnormal, without corresponding associations with adverse clinical outcomes. We then introduce NORMA, a conditional transformer-based framework that generates reference intervals by conditioning on both a patient's history and population-level data about "normal" variation. NORMA-derived intervals achieve higher precision for predicting outcomes, including mortality, acute kidney injury, and chronic disease. These findings caution against over-personalization in laboratory medicine and demonstrate that anchoring individual trajectories to po

Authors: Aashna P. Shah, Michelle M. Li, Yash Lal, Seffi Cohen, Liat F. Antwarg
Categories: cs.LG, q-bio.QM, cs.LG
