---
title: >-
  A llama.cpp PR makes Q2_0 3.0–3.6x faster on x86 CPUs, 8B decode goes 2.39 →
  8.20 tok/s
url: >-
  https://www.reddit.com/r/LocalLLaMA/comments/1vhz989/a_llamacpp_pr_makes_q2_0_3036x_faster_on_x86_cpus/
source: Reddit r/LocalLLaMA
source_type: rss
language: en
published: '2026-08-07T12:27:41.000Z'
fetched_at: '2026-08-08T11:01:01.042Z'
---
I was going through the current llama.cpp CPU PRs and #26348 stood out because this isn't the usual +5% kernel optimization.
 It adds an x86 VNNI implementation for the Q2_0 × Q8_0 dot product, and the author's controlled CPU-only benchmarks show roughly 3–3.6x higher throughput across Bonsai models from 1.7B to 27B.
 Setup:
 - AMD EPYC 9645
 - 8 CPU cores
 - CPU only
 - GGML_NATIVE=ON
 - OpenMP enabled
 - BLAS disabled
 - -t 8 -ngl 0 -fa off
 - 3 runs after warmup
 - group-64 Q2_0 Bonsai GGUFs
 Results:
 1.7B
 pp512: 14.07 → 50.47 tok/s (3.59x)
 tg128: 10.22 → 33.28 tok/s (3.26x)
 4B
 pp512: 5.41 → 19.40 tok/s (3.59x)
 tg128: 4.45 → 13.36 tok/s (3.00x)
 8B
 pp512: 2.82 → 10.26 tok/s (3.64x)
 tg128: 2.39 → 8.20 tok/s (3.43x)
 27B
 pp128: 0.79 → 2.85 tok/s (3.59x)
 tg32: 0.72 → 2.37 tok/s (3.32x)
 The 27B baseline was apparently so slow that a pp128 pass took almost 3 minutes.
 What's actually changing is pretty small: the existing Q2_0 dot product gets a path using AVX-VNNI / AVX-512 VNNI instead of relying on the generic implementation.
 The reference Prism implementation this was adapted from also exposed an interesting issue on normal consumer Intel CPUs.
 On an i5-13400, Q2_0 was silently missing the fast path because 12th–14th gen Intel has AVX-VNNI but AVX-512 is fused off. Nothing tells the user this happened, it just looks like Q2_0 is extremely slow.
 Their controlled i5-13400 A/B:
 Ternary-Bonsai-8B Q2_0
 decode: 2.17 → 6.92 tok/s
 prompt eval: 2.7 → 8.6 tok/s
 Again, around 3.2x from using the VNNI path.
 There are some important caveats:
 - The upstream llama.cpp PR is still open, not merged
 - This is specifically about Q2_0, not a free 3x for Q4/Q5/etc
 - The main upstream benchmarks were on an EPYC using only 8 cores
 - The i5-13400 result comes from the Prism reference implementation, not the exact group-64 upstream PR
 - There is a tiny numerical difference from fused multiply-add behavior
 On correctness, the author reports 14,000 randomized compar
