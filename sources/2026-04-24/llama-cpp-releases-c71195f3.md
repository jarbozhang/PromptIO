---
title: b8911
url: 'https://github.com/ggml-org/llama.cpp/releases/tag/b8911'
source: llama.cpp Releases
source_type: rss
language: en
published: '2026-04-24T01:21:40.000Z'
fetched_at: '2026-04-24T03:00:13.432Z'
---
hexagon: add support for basic and extended Op profiling  (#22269)
hexagon: restore HTP_OPMASK_QUEUE
hexagon: honor OPMASK_SKIP_COMPUTE in hmx-matmul
hex-prof: restore op profiling
hex-prof: enable PMU
hexagon: simplify and improve op-queuing with full profiling support
Add separate profile descriptors.
hexagon: remove opsync and rename opmask into opstage
opsync is no longer needed since the profiler is fully async now.
hexagon: refactor opbatch queue handling
hexagon: add iface hooks for enabling profiler from the host
Also move all the PMU setup stuff out of the hex-utils since it's not inteded for normal use.
hexagon: make profiler mode configurable
On older devices getting PMU counters is expensive so it's now optional.
hexagon: add support for setting profiler pmu events from env
hexagon: simplify profiler output (no need to print buffs, etc)
hexagon: simplify pmu counter formating
hexagon: add a simple profile post-proc tool
hex-prof: add support for reading logs from stdin
hexagon: document GGML_HEXAGON_PROFILE
hex-prof: update default width for dims field
hex-prof: fix linter warnings and errors
Update ggml/src/ggml-hexagon/htp/htp-ops.h
Co-authored-by: Sigbjørn Skjæret sigbjorn.skjaeret@scala.com
Update scripts/snapdragon/ggml-hexagon-profile.py
Co-authored-by: Sigbjørn Skjæret sigbjorn.skjaeret@scala.com
Co-authored-by: Trivikram Reddy tamarnat@qti.qualcomm.com
sigbjorn.skjaeret@scala.com
macOS/iOS:
macOS Apple Silicon (arm64)
macOS Apple Silicon (arm64, KleidiAI enabled)
macOS Intel (x64)
iOS XCFramework
Linux:
Ubuntu x64 (CPU)
Ubuntu arm64 (CPU)
Ubuntu s390x (CPU)
Ubuntu x64 (Vulkan)
Ubuntu arm64 (Vulkan)
Ubuntu x64 (ROCm 7.2)
Ubuntu x64 (OpenVINO)
Ubuntu x64 (SYCL FP32)
Ubuntu x64 (SYCL FP16)
Android:
Android arm64 (CPU)
Windows:
Windows x64 (CPU)
Windows arm64 (CPU)
Windows x64 (CUDA 12) - CUDA 12.4 DLLs
Windows x64 (CUDA 13) - CUDA 13.1 DLLs
Windows x64 (Vulkan)
Windows x64 (SYCL)
Windows x64 (HIP)
openEuler:
openEuler x86 (310p)
openEuler x86 (910b,
