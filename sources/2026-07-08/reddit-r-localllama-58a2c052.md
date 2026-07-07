---
title: '[Paper] How much do language models memorize?'
url: >-
  https://www.reddit.com/r/LocalLLaMA/comments/1upq1rc/paper_how_much_do_language_models_memorize/
source: Reddit r/LocalLLaMA
source_type: rss
language: en
published: '2026-07-07T09:32:09.000Z'
fetched_at: '2026-07-07T23:01:24.261Z'
---
We propose a new method for estimating how much a model knows about a datapoint and use it to measure the capacity of modern language models. Prior studies of language model memorization have struggled to disentangle memorization from generalization. We formally separate memorization into two components: unintended memorization, the information a model contains about a specific dataset, and generalization, the information a model contains about the true data-generation process. When we completely eliminate generalization, we can compute the total memorization, which provides an estimate of model capacity: our measurements estimate that GPT-style models have a capacity of approximately 3.6 bits per parameter. We train language models on datasets of increasing size and observe that models memorize until their capacity fills, at which point "grokking" begins, and unintended memorization decreases as models begin to generalize. We train hundreds of transformer language models ranging from 500K to 1.5B parameters and produce a series of scaling laws relating model capacity and data size to membership inference.
  
arXiv : https://arxiv.org/abs/2505.24832
 Full Paper : https://arxiv.org/pdf/2505.24832
    submitted by    /u/pmttyji  
 [link]   [comments]
