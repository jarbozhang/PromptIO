---
title: 'ExpRL: Exploratory RL for LLM Mid-Training'
url: 'https://arxiv.org/abs/2606.17024v1'
source: arXiv
source_type: arxiv
language: en
authors:
  - Violet Xiang
  - Amrith Setlur
  - Chase Blagden
  - Nick Haber
  - Aviral Kumar
categories:
  - cs.LG
  - cs.LG
published: '2026-06-15T17:50:44Z'
fetched_at: '2026-06-16T06:33:00.402Z'
---
Sparse reward reinforcement learning (RL) has become a standard tool for improving LLM reasoning, but its success depends critically on the coverage present in the base model. In practice, models are often primed for RL through \emph{mid-training} on curated reasoning traces that teach useful primitive skills such as decomposition, verification, or self-correction. Although effective, this strategy requires manually specifying what the model should learn, and it remains unclear whether such primitive coverage is enough for much harder problems, which require combining these skills into broader solution strategies. We study a more automated approach: \emph{RL-based mid-training} using large corpora of human-written question-answer data. Rather than treating reference solutions as targets to imitate, our method, ExpRL, uses them as \emph{reward scaffolds}: references are hidden from the policy and used only to construct problem-specific grading rubrics for judging on-policy reasoning traces. The policy samples from the original problem prompt, while an LLM judge compares the sampled reasoning trace against the reference solution and assigns outcome-level or process-level dense rewards. This lets ExpRL reinforce partial progress, useful intermediate reductions, and productive reasoning behaviors that sparse final-answer rewards often fail to upweight. On challenging math reasoning tasks, ExpRL yields stronger RL priming than SFT, sparse-reward GRPO, and self-distillation, and pr

Authors: Violet Xiang, Amrith Setlur, Chase Blagden, Nick Haber, Aviral Kumar
Categories: cs.LG, cs.LG
