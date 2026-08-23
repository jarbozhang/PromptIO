---
title: '[Paper] Statistically-Lossless Quantization of Large Language Models'
url: >-
  https://www.reddit.com/r/LocalLLaMA/comments/1v5j35f/paper_statisticallylossless_quantization_of_large/
source: Reddit r/LocalLLaMA
source_type: rss
language: en
published: '2026-07-24T18:06:36.000Z'
fetched_at: '2026-07-25T11:01:40.184Z'
---
Model quantization has become essential for efficient large language model deployment, yet existing approaches involve clear trade-offs: methods such as GPTQ and AWQ achieve practical compression but are lossy, while lossless techniques preserve fidelity but typically do not accelerate inference. This paper explores the middle ground of statistically-lossless compression through three complementary notions of losslessness for quantized LLMs. First, task-lossless compression preserves zero-shot benchmark accuracy within natural sampling variance and remains achievable at aggressive bitwidths. Second, we formalize the stricter notion of distribution-lossless compression, requiring the quantized model's next-token distribution to be practically indistinguishable from the original, and propose the Expected Acceptance Rate (EAR), the maximum token-agreement probability under optimal coupling, as a directly interpretable fidelity metric (for example, EAR >= 0.99 indicates 99% agreement). Third, we prove a gamma-squared variance law showing that symmetric quantization inflates noise variance by gamma squared relative to asymmetric quantization, making asymmetry necessary for distribution-lossless fidelity but not for task-level preservation. Using SLQ, a layer-wise non-uniform method with asymmetric quantization and wide bitwidth search, we achieve task-lossless compression at well below 4 bits per parameter (as low as 3.3 bits depending on the model), distribution-lossless compression at 5 to 6 bits per parameter on average, and inference speedups of 1.7 to 3.6x relative to FP16 with optimized kernels.
  
 arXiv : https://arxiv.org/abs/2605.02404
 Full Paper : https://arxiv.org/pdf/2605.02404
 GitHub : https://github.com/IST-DASLab/SLQ (Code coming soon)
  
Note : This is 2 Months old Paper & Repo. Sharing this as RedHat AI tweeted this sometime back.
 In Full Paper, I found llama.cpp & GG few times.
  
From the accuracy/compression perspective, existing approaches can be
