---
title: 'How Kimi K3 Engineered Its Way to the Frontier [R]'
url: >-
  https://www.reddit.com/r/MachineLearning/comments/1vaysjf/how_kimi_k3_engineered_its_way_to_the_frontier_r/
source: Reddit r/MachineLearning
source_type: rss
language: en
published: '2026-07-30T16:37:50.000Z'
fetched_at: '2026-07-31T11:01:00.269Z'
---
Kimi K3 by Moonshot reached the frontier as an open-weight model. Artificial Analysis ranks it fourth of 580 models, behind only Claude Opus 5, Fable 5, and GPT-5.6 Sol. Moonshot released more than the weights.
 I sat down to read the 47-page technical report and walk through the released code. Three things stood out.
  
Kimi Delta Attention replaces the KV cache in 69 of the 93 layers with one 128x128 matrix per head. A 1M-token context takes 27.2 GiB instead of 104.6.
 Quantile Balancing keeps 896 experts per layer evenly loaded. DeepSeek-V3's fixed-step bias nudging breaks at that expert count, so K3 computes the bias directly from one batch's router score margins.
 AgentENV, the Firecracker microVM runtime behind the RL training, created 51 million sandboxes with 133 ms checkpoints and 49 ms resumes, so a trajectory pauses for free while the model thinks.
  
Full walkthrough: https://codepointer.substack.com/p/how-kimi-k3-engineered-its-way-to
    submitted by    /u/noninertialframe96  
 [link]   [comments]
