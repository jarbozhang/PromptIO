---
title: >-
  HealthNLP_Retrievers at ArchEHR-QA 2026: Cascaded LLM Pipeline for Grounded
  Clinical Question Answering
url: 'https://arxiv.org/abs/2604.26880v1'
source: arXiv
source_type: arxiv
language: en
authors:
  - Md Biplob Hosen
  - Md Alomgeer Hussein
  - Md Akmol Masud
  - Omar Faruque
  - Tera L Reynolds
categories:
  - cs.CL
  - cs.LG
  - cs.CL
published: '2026-04-29T16:47:20Z'
fetched_at: '2026-04-30T08:51:20.279Z'
---
Patient portals now give individuals direct access to their electronic health records (EHRs), yet access alone does not ensure patients understand or act on the complex clinical information contained in these records. The ArchEHR-QA 2026 shared task addresses this challenge by focusing on grounded question answering over EHRs, and this paper presents the system developed by the HealthNLP_Retrievers team for this task. The proposed approach uses a multi-stage cascaded pipeline powered by the Gemini 2.5 Pro large language model to interpret patient-authored questions and retrieve relevant evidence from lengthy clinical notes. Our architecture comprises four integrated modules: (1) a few-shot query reformulation unit which summarizes verbose patient queries; (2) a heuristic-based evidence scorer which ranks clinical sentences to prioritize recall; (3) a grounded response generator which synthesizes professional-caliber answers restricted strictly to identified evidence; and (4) a high-precision many-to-many alignment framework which links generated answers to supporting clinical sentences. This cascaded approach achieved competitive results. Across the individual tracks, the system ranked 1st in question interpretation, 5th in answer generation, 7th in evidence identification, and 9th in answer-evidence alignment. These results show that integrating large language models within a structured multi-stage pipeline improves grounding, precision, and the professional quality of patie

Authors: Md Biplob Hosen, Md Alomgeer Hussein, Md Akmol Masud, Omar Faruque, Tera L Reynolds
Categories: cs.CL, cs.LG, cs.CL
