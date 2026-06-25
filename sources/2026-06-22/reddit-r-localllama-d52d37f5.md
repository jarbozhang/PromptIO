---
title: >-
  I forked ik_llama.cpp and added a "--numa mirror" mode to maximize performance
  on multi-socket CPU systems. Just sharing and looking for testers!
url: >-
  https://www.reddit.com/r/LocalLLaMA/comments/1ubw3mo/i_forked_ik_llamacpp_and_added_a_numa_mirror_mode/
source: Reddit r/LocalLLaMA
source_type: rss
language: en
published: '2026-06-21T17:37:23.000Z'
fetched_at: '2026-06-22T04:12:20.732Z'
---
GitHub: https://github.com/mikechambers84/ik_llama.cpp/tree/numa-mirror
 Be sure to checkout the numa-mirror branch.
 Sharing this for anyone else who's trying to use their multi-socket CPU systems for inference. I've been wanting a NUMA mirror mode for a long time, so I finally forked ik_llama.cpp and added it.
 ik_llama.cpp is a llama.cpp fork that adds major performance improvements for CPU inference, so it made sense to fork that here rather than baseline llama.cpp.
 For anyone who isn't aware of the problem this is meant to solve, it's that multi-socket machines have memory that's local to each socket. When a CPU accesses its own local memory, it's very fast. If a CPU has to remotely access memory that's non-local through a different socket, there's a huge performance penalty because it has to transfer the data through a bridge that's far, far slower than local memory.
 For most workloads, it matters very little and you probably won't notice. But since LLM inference performance is heavily bound to memory bandwidth, performance completely tanks if you try using multiple CPUs and they have to read large amounts of remote memory for each token.
 The usual answer for this just to use --numa isolate in llama.cpp, which pins model/context data to a single socket's CPU and memory, eliminating remote memory accesses but having multiple CPUs is no benefit here, all but one just sit idle.
 This fork adds --numa mirror which makes full duplicate copies of model weights and KV cache so that every CPU socket has a node-local copy. This allows you to actually use all of your CPU cores across all sockets to actually speed up inference instead of making it slower.
 The trade-off is obviously that you need more memory. If you have two CPU sockets, it needs to use twice the RAM.
 I'm hoping ikawrakow will accept it in a pull request. I'll try to submit one soon, but I'm hoping to have more people test in various hardware configurations beyond mine first.
 My benchmarks are showi
