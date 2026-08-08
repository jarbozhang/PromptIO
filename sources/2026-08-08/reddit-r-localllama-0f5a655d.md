---
title: >-
  Qwen 35B-A3B MoE vs 27B dense in local coding tests: ~4× faster, much smaller
  quality gap than I expected
url: >-
  https://www.reddit.com/r/LocalLLaMA/comments/1vinr66/qwen_35ba3b_moe_vs_27b_dense_in_local_coding/
source: Reddit r/LocalLLaMA
source_type: rss
language: en
published: '2026-08-08T05:44:38.000Z'
fetched_at: '2026-08-08T11:01:01.044Z'
---
I compared Qwen 35B-A3B MoE against Qwen 27B dense on a series of local coding-maintenance tasks. On my R9700/llama.cpp setup, the MoE model generated about 3.9× faster (~116 vs ~30 tok/s), but the coding-quality difference was much smaller than I expected.
 Both usually handled ordinary bug fixes and multi-file changes correctly. As I made the tests progressively harder, the dense model did show an advantage—but mainly in implicit invariants, unusual edge cases, and consequences beyond the literal request, rather than basic correctness.
 Models
  
Qwen 3.6 35B-A3B — Q5_K_M (MoE)
 Qwen 3.6 27B BASE — Q4_K_XL (dense)
  
Hardware/runtime
  
Radeon AI PRO R9700 32 GB
 Ryzen 9 5950X
 llama.cpp, Vulkan, full GPU offload
 8K context for these coding tests
  
One early controlled parser-repair test is illustrative:
  
35B-A3B: ~116 tok/s, provisional score 7/10
 27B dense: ~30 tok/s, provisional score 7/10
  
That single result isn't my argument by itself. I subsequently moved through progressively harder multi-file tests involving imports, stable IDs, collision handling, data preservation, and eventually references that had to remain valid when IDs were remapped.
 My takeaway so far is deliberately narrow: on these tasks, the ~4× throughput difference was much larger than the practical coding-quality difference I observed.
 This is a small local experiment, not a universal claim about MoE vs dense architectures. The quantizations also differ, so I wouldn't pretend this is an academically controlled architecture comparison. But the results do make me skeptical of treating active parameter count as a straightforward proxy for practical capability.
 I have the original prompts, source fixtures, exact llama.cpp commands, raw terminal transcripts, and the progressively harder integration tests. I'll put more methodology and examples in a comment below if anyone wants to dig into the details.
    submitted by    /u/WSTangoDelta  
 [link]   [comments]
