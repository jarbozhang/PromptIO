---
title: >-
  [Paper] Automated Tensor Scheduling for Hybrid CPU-GPU LLM Inference on
  Consumer Devices
url: >-
  https://www.reddit.com/r/LocalLLaMA/comments/1v0vp9k/paper_automated_tensor_scheduling_for_hybrid/
source: Reddit r/LocalLLaMA
source_type: rss
language: en
published: '2026-07-19T16:54:44.000Z'
fetched_at: '2026-07-19T23:01:24.638Z'
---
Running large language models on consumer devices such as laptops and desktops is challenging because model weights often exceed GPU memory capacity, making offloading inference necessary to extend effective model capacity with CPU memory. Existing offloading systems, however, typically rely on coarse layer-level or expert-level scheduling, which overlooks substantial heterogeneity among tensors within the same layer and adapts poorly to changing hardware load conditions on such devices. This paper presents ATSInfer, a hybrid CPU-GPU inference system for consumer devices that performs offloading at tensor granularity. ATSInfer combines static tensor placement with load-aware dynamic transfer, and introduces asynchronous CPU-GPU coordination to efficiently schedule hardware storage, data movement, and computation across heterogeneous backends. We implement ATSInfer and evaluate it on representative consumer platforms using both dense and MoE models. Compared with existing systems, ATSInfer improves prefill throughput by up to 1.94× and decode throughput by up to 3.29×, while also increasing GPU utilization and making more effective use of PCIe bandwidth. These results show that ATSInfer can substantially improve the user experience of local LLM deployment on personal consumer devices.
  
arXiv : https://arxiv.org/abs/2607.10183
 Full Paper : https://arxiv.org/pdf/2607.10183
 I did search for sometime, but couldn't find GitHub repo for this(Probably not made public yet). I'll include GitHub repo link as soon as available online.
    submitted by    /u/pmttyji  
 [link]   [comments]
