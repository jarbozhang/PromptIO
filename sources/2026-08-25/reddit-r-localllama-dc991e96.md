---
title: MobileMoE - a facebook Collection
url: >-
  https://www.reddit.com/r/LocalLLaMA/comments/1vxbpcc/mobilemoe_a_facebook_collection/
source: Reddit r/LocalLLaMA
source_type: rss
language: en
published: '2026-08-24T18:49:26.000Z'
fetched_at: '2026-08-25T11:00:49.197Z'
---
MobileMoE is a family of on-device Mixture-of-Experts (MoE) language models with sub-billion active parameters, designed to push the quality–efficiency Pareto frontier for on-device LLMs, including three model scales (S/M/L): 0.3B/0.5B/0.9B active parameters (1.3B/2.8B/5.3B total), with <3 GB INT4 weight footprints to fit in mobile DRAM. Each scale is released in three variants: a Base model (pre-training + mid-training), an SFT model (supervised fine-tuning), and a QAT model (quantization-aware training). You are currently in the MobileMoE-L-Base repository — the pre-trained 0.9B-active base model.
 Model: MobileMoE-L-Base (pre-trained + mid-trained)
 Active Parameters: 922M
 Total Parameters: 5.3B
 Layers: 32
 Model Dimension: 1280
 Attention Heads: 20
 KV Heads: 4 (GQA)
 Head Dimension: 64
 Routed Experts: 60 (fine-grained, FFN hidden dim 640 each)
 Active Experts per Token: 4 (top-k sigmoid routing, with normalization)
 Shared Expert: 1, always on (FFN hidden dim 2560)
 Vocabulary Size: 128,256
 Other Features: QK-Norm, tied input/output embeddings, RoPE (θ = 500,000)
 Input Modality: Text
 Output Modality: Text
 Languages: English
 Training Stages: Pre-training → mid-training
 Context Length: 8,192 tokens
 Precision: BF16
 Model Developer: Meta
 Model Release Date: Aug 2026
 License: MobileMoE is FAIR NC licensed
    submitted by    /u/jacek2023  
 [link]   [comments]
