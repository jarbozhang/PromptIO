---
title: 'Select to Think: Unlocking SLM Potential with Local Sufficiency'
url: 'https://arxiv.org/abs/2604.26940v1'
source: arXiv
source_type: arxiv
language: en
authors:
  - Wenxuan Ye
  - Yangyang Zhang
  - Xueli An
  - Georg Carle
  - Yunpu Ma
categories:
  - cs.CL
  - cs.CL
published: '2026-04-29T17:51:39Z'
fetched_at: '2026-04-30T08:51:20.277Z'
---
Small language models (SLMs) offer computational efficiency for scalable deployment, yet they often fall short of the reasoning power exhibited by their larger counterparts (LLMs). To mitigate this gap, current approaches invoke an LLM to generate tokens at points of reasoning divergence, but these external calls introduce substantial latency and costs. Alternatively, standard distillation is often hindered by the capacity limitation, as SLMs struggle to accurately mimic the LLM's complex generative distribution. We address this dilemma by identifying local sufficiency: at divergence points, the LLM's preferred token consistently resides within the SLM's top-K next-token predictions, even when failing to emerge as the SLM top-1 choice. We therefore propose SELECT TO THINK (S2T), which reframes the LLM's role from open-ended generation to selection among the SLM's proposals, simplifying the supervision signal to discrete candidate rankings. Leveraging this, we introduce S2T-LOCAL, which distills the selection logic into the SLM, empowering it to perform autonomous re-ranking without inference-time LLM dependency. Empirically, we demonstrate that a 1.5B SLM's top-8 candidates capture the 32B LLM's choice with 95% hit rate. Translating this potential into performance, S2T-LOCAL improves greedy decoding by 24.1% on average across benchmarks, effectively matching the efficacy of 8-path self-consistency while operating with single-trajectory efficiency.

Authors: Wenxuan Ye, Yangyang Zhang, Xueli An, Georg Carle, Yunpu Ma
Categories: cs.CL, cs.CL
