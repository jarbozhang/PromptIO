---
title: >-
  ABSeeker: Training Long-Horizon Search Agents via Answer-Backtracked Credit
  Assignment
url: 'https://arxiv.org/abs/2608.05102v1'
source: arXiv
source_type: arxiv
language: en
authors:
  - Yijun Lu
  - Rui Ye
  - Jiajun Wang
  - Yuwen Du
  - Tian Jin
categories:
  - cs.AI
  - cs.AI
published: '2026-08-05T17:41:31Z'
fetched_at: '2026-08-06T11:02:48.674Z'
---
Long-horizon search agents must make multiple sequential actions (steps) to search, retrieve, verify, and integrate evidence to reach a final answer. However, existing methods for training these agents typically treat all steps within a trajectory uniformly during both supervised fine-tuning (SFT) and reinforcement learning (RL), failing to distinguish useful actions from erroneous or redundant ones. In this paper, we propose Answer-Backtracked Credit Assignment (ABC), a fine-grained credit assignment framework for training long-horizon search agents by converting sparse trajectory-level outcomes into dense step-level supervision that rewards useful actions (even in failed trajectories) while suppressing erroneous or redundant actions. Specifically, given a potentially obscure query and its corresponding ground-truth answer, ABC first performs Answer-Backtracked Clue Recovery, which traces back from the answer to recover intermediate clues required to solve the question. It then applies Clue-Anchored Step Scoring to evaluate each search step against these clues, converting sparse binary outcome supervision into dense step-level rewards. Based on these rewards, we develop ABC-SFT, which reweights the loss of each turn, and ABC-GRPO, which uses the step-level scores as rewards in GRPO. Building on this framework, we train ABSeeker based on Qwen3.5-4B with only 8.5k examples. ABSeeker achieves 37.3% on BrowseComp and 39.1% on BrowseComp-ZH. With context management, the scores fu

Authors: Yijun Lu, Rui Ye, Jiajun Wang, Yuwen Du, Tian Jin
Categories: cs.AI, cs.AI
