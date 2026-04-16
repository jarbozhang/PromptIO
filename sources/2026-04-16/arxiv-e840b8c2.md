---
title: 'TIP: Token Importance in On-Policy Distillation'
url: 'https://arxiv.org/abs/2604.14084v1'
source: arXiv
source_type: arxiv
language: en
authors:
  - Yuanda Xu
  - Hejian Sang
  - Zhengze Zhou
  - Ran He
  - Zhipeng Wang
categories:
  - cs.LG
  - cs.AI
  - cs.LG
published: '2026-04-15T16:58:24Z'
fetched_at: '2026-04-16T06:07:35.557Z'
---
On-policy knowledge distillation (OPD) trains a student on its own rollouts under token-level supervision from a teacher. Not all token positions matter equally, but existing views of token importance are incomplete. We ask a direct question: which tokens carry the most useful learning signal in OPD? Our answer is that informative tokens come from two regions: positions with high student entropy, and positions with low student entropy plus high teacher--student divergence, where the student is overconfident and wrong. Empirically, student entropy is a strong first-order proxy: retaining $50\%$ of tokens with entropy-based sampling matches or exceeds all-token training while reducing peak memory by up to $47\%$. But entropy alone misses a second important region. When we isolate low-entropy, high-divergence tokens, training on fewer than $10\%$ of all tokens nearly matches full-token baselines, showing that overconfident tokens carry dense corrective signal despite being nearly invisible to entropy-only rules. We organize these findings with TIP (Token Importance in on-Policy distillation), a two-axis taxonomy over student entropy and teacher--student divergence, and give a theoretical explanation for why entropy is useful yet structurally incomplete. This view motivates type-aware token selection rules that combine uncertainty and disagreement. We validate this picture across three teacher--student pairs spanning Qwen3, Llama, and Qwen2.5 on MATH-500 and AIME 2024/2025, and o

Authors: Yuanda Xu, Hejian Sang, Zhengze Zhou, Ran He, Zhipeng Wang
Categories: cs.LG, cs.AI, cs.LG
