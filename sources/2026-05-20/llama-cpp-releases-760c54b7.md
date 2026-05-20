---
title: b9235
url: 'https://github.com/ggml-org/llama.cpp/releases/tag/b9235'
source: llama.cpp Releases
source_type: rss
language: en
published: '2026-05-20T03:06:16.000Z'
fetched_at: '2026-05-20T14:38:59.250Z'
---
llama : MTP clean-up (#23269)
llama : disable equal splits for recurrent memory with partial rollback
spec : re-enable p-min with MTP drafts
spec : re-enable ngram spec in combination with RS rollback
spec : fix ngram-map-* params
spec : fix acceptance logic in combined ngram + draft configs
graph : fix reuse for combined token + embd batches
spec : log parameters for each speculative implementation
add LOG_INF in each constructor with implementation type and parameters
extract device string logic into common_speculative_get_devices_str()
move 'adding speculative implementation' log from init into constructors
Assisted-by: llama.cpp:local pi
spec : extend --spec-default with ngram-map-k4v
Assisted-by: llama.cpp:local pi
minor : fix n_embd log
args : update draft.n_max == 3 + regen docs
spec : relax ngram-mod rejection thold to 0.25 @ 5 low
logs : improve
docs : update speculative decoding CLI argument documentation
Add missing draft model CPU scheduling and tensor override parameters
Update --spec-type to include all available types (excluding draft-eagle3 WIP)
Fix default values to match implementation (n_max=3, n_min=0, p_min=0.0)
Remove deprecated options (spec-draft-ctx-size, spec-draft-replace)
Add environment variables for new parameters
Assisted-by: llama.cpp:local pi
arg : step-back on adding k4v to the default spec config
cont : fix name
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
openEuler x86 (910b, ACL Graph)
openEuler aarch64 (310p)
openEuler aarch64
