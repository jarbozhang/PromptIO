---
title: README_EN.md · openpangu/openPangu-2.0-Flash at main
url: >-
  https://www.reddit.com/r/LocalLLaMA/comments/1ukhu5g/readme_enmd_openpanguopenpangu20flash_at_main/
source: Reddit r/LocalLLaMA
source_type: rss
language: en
published: '2026-07-01T10:27:32.000Z'
fetched_at: '2026-07-01T23:02:00.947Z'
---
1. Introduction
 openPangu-2.0-Flash is an MoE model trained on Ascend. The model has 92B total parameters and 6B activated parameters. Its context length is 512k. The total pretraining data contains 34T tokens. During Post-training, openPangu-2.0-Flash is trained through unified SFT with slow and fast thinking capability, multiple specialist RL traning, on-policy distillation combining multiple RL specialists.
 2. Architecture
 openPangu-2.0-Flash brings several major architectural improvements:
  
Efficient attention: The model retains MLA for efficient inference and combines DSA and SWA in a 1:2 layer ratio. SWA layers handle local-window modeling, while DSA layers capture sparse global context. This design lowers compute, memory footprint, and memory access costs for long-context inference while preserving accuracy.
 Residual topology: The conventional residual path is replaced with a 4-stream mHC design, improving representation diversity and generalization.
 Multi-token prediction (MTP): The model uses three MTP heads to draft 3 additional tokens per step, enabling faster inference through self-speculative decoding.
 Optimizer: Training uses the Muon optimizer for faster convergence.
  
   submitted by    /u/jacek2023  
 [link]   [comments]
