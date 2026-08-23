---
title: >-
  [Paper] xHC: Expanded Hyper-Connections - Scale Residual Streams Wider · Push
  Model Intelligence Further
url: >-
  https://www.reddit.com/r/LocalLLaMA/comments/1v1evsq/paper_xhc_expanded_hyperconnections_scale/
source: Reddit r/LocalLLaMA
source_type: rss
language: en
published: '2026-07-20T07:47:42.000Z'
fetched_at: '2026-07-20T23:00:57.695Z'
---
Hyper-Connections (HC) expand the residual stream of Transformers into N parallel streams, providing a form of memory scaling beyond model width and depth. Manifold-Constrained HC (mHC) stabilizes this formulation at scale. The large gains from N{=}1 to N{=}4 suggest residual-stream expansion as a promising scaling axis. However, existing HC-family methods typically stop at N{=}4. Our experiments reveal why: scaling mHC beyond this point yields diminishing performance gains and rapidly increasing training cost. We attribute this limitation to two bottlenecks: insufficient write-back information for an expanding number of streams and residual-mixing generation whose cost scales cubically with N. To address both bottlenecks, we propose xHC (Expanded Hyper-Connections), the first HC-family method to achieve meaningful expansion beyond N{=}4. xHC combines temporal feature augmentation for richer write-back with a sparse residual-stream architecture that updates only k=4 of the N=16 streams while retaining dense access to the full residual state. Across 18B and 28B MoE models, xHC delivers strong and consistent downstream improvements. On an 18B MoE model, xHC improves the average downstream score by 4.0 points over mHC, while adding only modest training FLOPs over the vanilla baseline. Scaling-law experiments show that the vanilla and mHC require 1.50times and 1.19times the compute of xHC, respectively, to reach the same loss. Practical large-N training also requires controlling memory traffic from the expanded residual state. We therefore introduce xHC-Flash, which reduces the per-sublayer memory traffic from 73.5C to 40C, comparable to the 34C required by mHC at N{=}4, while retaining the gains of full xHC. Together, xHC and xHC-Flash make large-N residual-stream expansion effective and practical for LLM pre-training.
  
arXiv : https://arxiv.org/abs/2607.14530
 Full Paper : https://arxiv.org/pdf/2607.14530
 GitHub : https://github.com/aHapBean/xHC
    submitted by   
