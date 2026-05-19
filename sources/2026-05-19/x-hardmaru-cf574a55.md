---
title: "The human brain🧠 is incredibly efficient because it only activates the specific neurons needed for "
source: "X @hardmaru"
url: "https://x.com/hardmaru/status/2052787980344099293"
date: "Fri May 08 16:29:28 +0000 2026"
likes: 3469
reposts: 504
replies: 51
---

The human brain🧠 is incredibly efficient because it only activates the specific neurons needed for a thought. Modern LLMs naturally try to do this too (> 95% of neurons in feedforward layers stay silent for any given word), but our hardware punishes them for it.

One of the most frustrating paradoxes in deep learning: making a model do less math often makes it run slower. Why? Because unstructured sparsity introduces irregular memory access, and GPUs are built for predictable, dense blocks of math.

We teamed up with @NVIDIA to try to fix this hardware mismatch. Instead of forcing the GPU to adapt to the sparsity, we built a "Hybrid" format that reshapes the sparsity to fit the GPU. Our sparsity format (TwELL) dynamically routes the 99% of highly sparse tokens through a fast path, and uses a dense backup matrix as a safety valve for the rare, heavy tokens.

Through TwELL and a new set of custom CUDA kernels for both LLM inference and training, we translated theoretical sparsity into actual wall-clock speedups: >20% faster training and inference on H100 GPUs, while also cutting energy consumption and memory requirements.

Paper: https://t.co/rqIY9SYBDe
Blog: https://t.co/oRjNbpJKha
Code: https://t.co/FAFaJwpxAJ
⚡️

---

Quoted tweet:

How do we make LLMs faster and lighter? Don’t force the GPU to adapt to sparsity. Reshape the sparsity to fit the GPU! ⚡️

Excited to share our new #ICML2026 paper in collaboration with @NVIDIA: "Sparser, Faster, Lighter Transformer Language Models". This work introduces new open-source GPU kernels and data formats for faster inference and training of sparse transformer language models:

Paper: https://t.co/3Avj8N8iYO
Blog: https://t.co/SqFkkKvkbd
Code: https://t.co/PHSzMq8pg0

While LLMs are undoubtedly powerful, they are increasingly expensive to train and deploy, with a large part of this cost coming from their feedforward layers. Yet, an interesting phenomenon occurs inside these layers: For any given token, only a small fraction of the hidden activations actually matter. The rest approximate zero, wasting computation. With ReLU and very mild L1 regularization, this sparsity can exceed 95% with little to no impact on downstream performance.

So, can we leverage this sparsity to make LLMs faster? The challenge is hardware. Modern GPUs are optimized for dense matrix multiplications. Traditional sparse formats introduce irregular memory access and overheads that cancel out their theoretical savings for GEMM operations.

Our contribution is twofold:
1/ We introduce TwELL (Tile-wise ELLPACK), a new sparse packing format designed to integrate directly in the same optimized tiled matmul kernels without disrupting execution.
2/ We develop custom CUDA kernels that fuse multiple sparse matmuls to maximize throughput and compress TwELL to a hybrid representation that minimizes activation sizes.

We used our kernels to train and benchmark sparse LLMs at billion-parameter scales, demonstrating >20% speedups and even higher savings in peak memory and energy.

This work will be presented at #ICML2026. Please check out our blog and technical paper for a deep dive!
