---
title: b10052
url: 'https://github.com/ggml-org/llama.cpp/releases/tag/b10052'
source: llama.cpp Releases
source_type: rss
language: en
published: '2026-07-16T21:25:04.000Z'
fetched_at: '2026-07-17T23:01:56.064Z'
---
hexagon: L2 cache handling rework (dirty bit tracking with lazy flushing) and more MUL_MAT updates (#25762)
hex-mm: fix artificial limit in the solver that restricted number of act-prep threads
hex-mm: fix warning
hex-prof: do not apply --top to the timeline report
hmx-mm: add suport for tiled act-processing to better distribute hvx work
hex-l2: add tracing for l2flush events
workqueue: redo the legacy workpool api to match hmx-queue and dma-queue
hmx-mm: fix f32 activation buffer alignmnet for nhvx=5,6,7
hex-work: minor cleanup for work-queue apis
hex-work: further cleanup of the work-queue api
hex-l2: optimize l2flushes at the opbatch level
hex-work: remove unused mask
hex-work: no need to drop hvx ctx in the work-queue
hex-work: add explicit wakeup/suspend and make threads spin
hex-bufs: mark any non-weight tensor as compute
hex-dma: dma-queue support for alias queues and cached dma
hex-l2: track tensor aliases and delay or skip flushes as much as possible
hex-l2: simplify tensor alias handling
hex-l2: handle overlapping views as a circular list of aliases
hex-tens: add flags helper
hex-l2: add helper for marking tensors clearn/dirty
hex-l2: mark binary and rope outputs as l2-clean and keep the rest as is for now
hex-l2: proper support for handling all tensor overlap scenarios
hex-trace: instrument matmul init code and cleanup trace checks
hex-thread: introduce dedicated main thread with explicit stack and priority
hex-l2: track dirty state as bitmap and introduce threaded flush
hex-trace: remove redundant checks for ctx != null
hex-l2: allocate entire context as one buffer and l2fetch it after big flushes
hex-l2: disable tensor clearing in binary and rope for now seems to cause issues with fusion
hmx-mm: update act proc to use fastdivs and fix DMA overflow
hmx-mm: make MUL_MAT_ID kernels robust to multi-chunk cases (start_row>0)
hex-queue: remove obsolete queue interfaces and flush hmx-queue at the end of the op-batch
hex-queue: dont use early wakeup for small o
