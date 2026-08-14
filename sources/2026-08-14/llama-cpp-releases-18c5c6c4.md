---
title: b10419
url: 'https://github.com/ggml-org/llama.cpp/releases/tag/b10419'
source: llama.cpp Releases
source_type: rss
language: en
published: '2026-08-13T22:13:09.000Z'
fetched_at: '2026-08-14T11:02:19.881Z'
---
OpenVINO: Qwen3.5, memory optimization, and test-recurrent-state-rollback (#26952)
OpenVINO backend: 1) enable gpt-oss moe on OV bk; 2) enable mxfp4 support
OpenVINO backend: disable TOPK_MOE op test
OpenVINO Backend: Add op FILL support
OpenVINO backend: enable set rows with multi dims
fix the name missmatch in setrow + view
OpenVINO backend: enable op GGML_UNARY_OP_SIGMOID
OpenVINO Backend: enable SQR & SQRT
OpenVINO backend: 1) ensure unique node names for OpenVINO; 2) add org_src to recorde the src ggml tensor for OpenVINO dynamic shape infer
OpenVINO backend: enable fallback for openVINO to CPU backend
OpenVINO backend: fix accurace issue in gemma3n arch test
fix mpt failed case
OpenVINO backend: clean nodeinfo
OpenVINO Backend: enable zero-size copy for view
add concat ssm_conv in compute_dynamic_dim
enable qwen35
Fix after rebase
remove logging
OpenVINO backend: disable EXP with FP32, which failed in op test. Root reason: the backend test initializes unary op inputs over a wide range, [-150, 150]. For FP32, exp(x) overflows around x ~= 88.7, so this test can randomly generate values right in or beyond the overflow region
OpenVINO backend: fix CPY op test failed issue
OpenVINO backend: fix GATED_DELTA_NET op test failed issue
handle in-place op, handle qwen35 dynamic clearing of cache in cgraph
handle qwen35 dynamic clearing of cache correctly
Enable qwen35 dense multi seq
Fix qwen35 9b gqa
Fix after rebase
Disable SOLVE_TRI
openvino: fix NEOX RoPE accuracy on GPU stateful (mixed-rank Multiply)
In stateful mode the NEOX RoPE branch fed rank-3 data ([S, n_heads,
Phi-3-mini-Q4_K_M, wiki.test perplexity, GPU stateful:
OpenVINO backend: 1) remove the unique name in llama.cpp; 2) add new ov name in ov bk; 3) fix issue in arch test & op test with latest code update
OpenVINO Backenb: remove changes in llama.cpp
Doc change (use x64 Native Tools Command Prompt for VS)
Cleaner sentence
Co-authored-by: Copilot Autofix powered by AI 175728472+Copilot@users.noreply.github.
