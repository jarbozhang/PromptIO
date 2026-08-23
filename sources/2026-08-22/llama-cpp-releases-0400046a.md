---
title: v0.2.0
url: 'https://github.com/ggml-org/llama.cpp/releases/tag/v0.2.0'
source: llama.cpp Releases
source_type: rss
language: en
published: '2026-08-22T06:54:09.000Z'
fetched_at: '2026-08-22T11:02:20.204Z'
---
Overview
This version marks the beginning of consistent semantic versioning for llama.cpp. The main goal is to make the job of downstream projects and users simpler when deciding which version of llama.cpp/ggml to distribute and use. The new version tags of the format vX.Y.Z will mark "stable" versions of llama.cpp. The usual b[NUM] tags remain as before - created on almost every commit to the master branch. The b tags can be considered as "nightly" or "dev" versions with the latest functionality available, though these could be more unstable.
To summarize:
tag vX.Y.Z - stable, slower release cadence, recommended for downstream distribution and casual users
tag b[NUM] - bleeding edge, faster release cadence, recommended for developers and technical users
More info: dist : releases and versioning of ggml-org projects
Assets
Nightly build: b10566
Web UI: the nightly-tag.txt asset contains the tag of the corresponding nightly release
Changelog since v0.1.2
bb4caa7 llama.cpp : bump version to 0.2.0 (#27498)
c4b0225 scripts : add release.sh for release preparation (#27497)
5de25a7 sync : ggml
01ff204 ggml : bump version to 0.21.0 (ggml/1597)
353b32d ci : remove duplicate flag (#27488)
7a0e42f Revert "sycl : add Q2_K reordered MMVQ and ESIMD kernels (#26336)" (#27486)
5b6ddc9 ui: Settings navigation cleanup (#27241)
e467c2f ci : add nightly-tag.txt to make-release (#27485)
1719747 ci : release clean-up (#27477)
62b2269 kleidiai : add SME2 F32 GEMV kernel support (#26891)
ff14356 sycl : add Q2_K reordered MMVQ and ESIMD kernels (#26336)
5fff128 test : make the FA V-is-view-of-K case a test case parameter (#27394)
9e89a19 sycl : Add Q5_K ESIMD kernel (#26376)
cd26896 opencl: keep the vocab-scale K-quant lm_head on the CPU for Adreno A7X (compiler issue workaround) (#26440)
1cb3f5e sycl: Update gate logic for Alchemist GPUs regarding OneDNN features. (#26635)
6602dd3 sycl: fix multiple warnings in compiling sycl backend  (#26713)
9e96cf7 sycl : fix load model with mlock issu
