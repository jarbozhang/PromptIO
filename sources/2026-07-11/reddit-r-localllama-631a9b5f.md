---
title: '[Paper] Sparse Delta Memory: Scaling the State of Linear RNNs through Sparsity'
url: >-
  https://www.reddit.com/r/LocalLLaMA/comments/1usdn4c/paper_sparse_delta_memory_scaling_the_state_of/
source: Reddit r/LocalLLaMA
source_type: rss
language: en
published: '2026-07-10T04:45:16.000Z'
fetched_at: '2026-07-10T23:01:38.137Z'
---
Linear attention models allow a fixed state size and a fixed amount of compute per token. However, due to their limited state size, linear attention models fall behind in long-context recall compared to softmax-attention-based transformer architectures. Increasing the state size of linear attention improves recall performance but at the cost of higher FLOPs. In this work, we introduce Sparse Delta Memory (SDM), an architecture that scales the hidden state of gated linear RNNs to orders of magnitude higher capacity using a sparse addressing scheme. SDM extends the Gated DeltaNet architecture by replacing the dense key-value outer product with sparse reads and writes to a large explicit memory. We show that, under an isoFLOP constraint and with an identical number of parameters, a higher state memory capacity significantly improves performance on in-context learning and long-context retrieval tasks. Moreover, by learning the initial state of the SDM memory and therefore using it as a parametric memory, we show that the model further improves on a wide range of common-knowledge and reasoning tasks.
  
arXiv : https://arxiv.org/abs/2607.07386
 Full Paper : https://arxiv.org/pdf/2607.07386
 GitHub : https://github.com/facebookresearch/sparse-delta-memory
    submitted by    /u/pmttyji  
 [link]   [comments]
