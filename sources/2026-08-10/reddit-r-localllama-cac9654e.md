---
title: >-
  Two flags took the official Ling-3.0-flash INT4 from 20.8 to 38.7 tok/s on one
  DGX Spark
url: >-
  https://www.reddit.com/r/LocalLLaMA/comments/1vjttcc/two_flags_took_the_official_ling30flash_int4_from/
source: Reddit r/LocalLLaMA
source_type: rss
language: en
published: '2026-08-09T16:10:23.000Z'
fetched_at: '2026-08-10T11:01:36.121Z'
---
The official INT4 does load on a single DGX Spark. The naive config just leaves most of its speed on the floor, 20.8 tok/s. Two changes take it to 38.7.
 Quick context on where this comes from: I work on Ling at inclusionAI, and none of these numbers are mine. sudoingX on X ran all of it on his own Spark and published the recipe. Reposting here with his permission.
 Drop --enforce-eager so cudagraphs actually run.
 Turn on MTP spec decode. The draft layer already ships inside the checkpoint:
 --speculative-config '{"method": "bailing_hybrid_v3_mtp", "num_speculative_tokens": 1}'
 Wired that way the official INT4 lands past the community GGUF most people default to on this box, 38.7 vs 35.2, and it serves the full 256K context window on the same machine.
 The warning matters more than the speed. Stock vLLM has no V3 support. It runs this through the wrong attention path, it does not error, and it hands you fluent output that reads fine until it doesn't. You need the fork, inclusionAI/vllm-ling-v3, branch ling_3_0.
 His repo has the serve scripts, a watchdog for the cold-start shard freeze, the bench method, and a FINDINGS.md with every wall written up:
 https://github.com/sudoingX/dgx-spark-ling
 One caveat from his own testing: the INT4 is the sprint pick, fastest under roughly 30K of context, while the community Q5 GGUF degrades more gracefully on long-context marathons. If you own a Spark and your numbers disagree with his, I'd rather see that here than not.
    submitted by    /u/AcanthisittaOk1699  
 [link]   [comments]
