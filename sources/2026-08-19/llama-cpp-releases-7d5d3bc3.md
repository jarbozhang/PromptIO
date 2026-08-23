---
title: v0.1.2
url: 'https://github.com/ggml-org/llama.cpp/releases/tag/v0.1.2'
source: llama.cpp Releases
source_type: rss
language: en
published: '2026-08-18T10:23:10.000Z'
fetched_at: '2026-08-19T11:02:39.985Z'
---
Note
Semantic versioning is still work in progress.
https://github.com/ggml-org/ggml/discussions/1579
Nightly build: b10485
Change log since v0.1.1
1511ce3 sync : ggml
da786dc ggml : bump version to 0.20.2 (ggml/1589)
27e345b build : fix xcframework + cmake clean-up (#27304)
8b86400 ci : create pre-release with change log and nightly link in make-release (#27302)
25ae3a9 CUDA: MMVQ nwarps=8 for bs=1 for dense models on DGX Spark (#26843)
01818e4 ui: enforce alphabetical enum member ordering (#27272)
0021a77 ui: Refactor Built-In Tools naming (Server/Browser) (#27271)
058df67 ci: more optimizations (#26983)
087f94d doc: document MCP stdio servers and CORS defaults in the server README [no release] [no ci] (#26847)
533b182 server: save processed mtmd chunks as placeholder (#27278)
ed1c3a2 mtmd: use sha256 for input hashing (#27274)
d8df12e vocab : support integer tokenizer scores (#27260)
b75ecd1 mtmd : skip thumbnail for non-tiled LFM2 images (#27246)
60eeeb6 cuda : skip UMA override for HIP builds (#27083)
39be55c vendor: move hash to vendor (#27262)
