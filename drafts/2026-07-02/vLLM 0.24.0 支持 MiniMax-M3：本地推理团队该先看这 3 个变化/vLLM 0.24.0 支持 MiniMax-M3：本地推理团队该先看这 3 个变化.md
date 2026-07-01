---
title: vLLM 0.24.0 支持 MiniMax-M3：本地推理团队该先看这 3 个变化
status: draft
date: '2026-07-02'
source: manual
source_url: https://github.com/vllm-project/vllm/releases/tag/v0.24.0
angle: 围绕 MiniMax-M3、新一轮 DeepSeek-V4 优化和 AMD/ROCm 调优，写给正在做模型服务、压吞吐和成本的读者。读者关心的是升级后哪些模型、后端和硬件路径值得重新测试。
voice: first-person
content_lane: model-deployment
content_archetype: version_brief
diversity_note: recent_entity_saturation,recent_title_pattern_saturation
reach: 8
tags:
  - vLLM
  - 模型部署
  - 本地推理
  - MiniMax-M3
  - DeepSeek-V4
  - ROCm
llm:
  provider: codex
  model: ''
platforms:
  wechat: primary
  xhs: primary
  x: blocked
xhs_title: vLLM 0.24.0 支持 MiniMax-M3：本地推理团队该先看这 3 个变化
wechat_title: 本地推理团队该重测 vLLM 0.24.0 的 3 条路径
cover:
  status: skipped
recent_similarity: 0.062
reach_note: vLLM、MiniMax、DeepSeek 都有认知度，升级动作明确，读者可以直接检查 release 并安排压测。
selection_reason: 这是信息量充足的 A 级 release，覆盖模型部署和成本效率，适合做版本解读，不与 agent 选题挤在一起。
---

# vLLM 0.24.0 支持 MiniMax-M3：本地推理团队该先看这 3 个变化

如果你负责模型服务，vLLM 0.24.0 不是一个只看版本号的更新。它把三条线同时往前推，MiniMax-M3 进入支持列表，DeepSeek-V4 又补了一轮低延迟优化，AMD/ROCm 路径也拿到了更细的 FP8 和 MoE 调优。

我最关心的不是 571 commits、256 contributors、77 位新贡献者这些热闹数字，而是升级后哪些压测项要重新排队。线上推理成本通常卡在吞吐、首 token 延迟、显存和硬件适配四个地方，这版刚好都碰到了。

我的处理方式很直接，把 v0.24.0 当成一张回归测试优先级表。负责本地推理、多模型网关、Agent 后端服务的团队，不要只问能不能启动，要问哪条模型和硬件路径值得重新测。

## 把 MiniMax-M3 放进候选服务池

MiniMax-M3 是这版最醒目的新增支持。Release 里没有只写一句 added support，而是跟着一串后续补丁，BF16/FP8 indexer via MSA、MXFP4 support、FP8 sparse GQA 都在同一组变化里出现。

这对推理团队很关键。模型能加载只是第一层，真正影响成本的是低精度路径、稀疏注意力、KV Cache 和硬件后端能不能一起稳定工作。

我会把 MiniMax-M3 的验证拆成三个问题。

- BF16、FP8、MXFP4 路径是否覆盖你的主力 batch 和上下文长度
- FP8 sparse GQA 是否改变 prefill 和 decode 阶段的瓶颈
- MiniMax-M2 的 perf regression 修复后，旧服务基准是否也要重跑

这里的重点不是追一个新名字，而是 vLLM 已经把 MiniMax 系列放进更完整的服务化优化链路里。对正在做模型候选池的人，这比单点支持更值得看。

## 重测 DeepSeek-V4 的首 token 和吞吐账

DeepSeek-V4 在 v0.24.0 里不是第一次出现，重点是第二轮成熟化。Release 给了两个直接数字，FlashInfer sparse index cache 对 TTFT 提供 2-4% 改善，prefill chunk-planning 对端到端吞吐提供 4% 改善。

我会优先看这张变化表。

| 变化 | 应该重测的指标 |
| --- | --- |
| FlashInfer sparse index cache | 首 token 延迟 |
| prefill chunk-planning optimization | 端到端吞吐 |
| cluster-cooperative topK kernel | 低延迟请求 |
| contiguous per-block KV allocations | KV Cache 分配稳定性 |
| TEP=16 for block-FP8 shared expert | MoE 共享专家路径 |
| native DSA indexer decode for next_n > 2 on SM100 | speculative decode 相关场景 |

DeepSeek-V4 还在 SM120 上启用，并补了 XPU 和 ROCm 的 attention/MoE paths。我的判断是，如果你已经把 DeepSeek-V4 放进服务候选，v0.24.0 值得触发一轮新 benchmark，尤其是 TTFT、prefill、MoE 和低延迟请求。

## 给 AMD/ROCm 单独开一轮硬件验证

这版对 AMD/ROCm 的信号很强。MiniMax-M3 相关 highlight 里点名了 gfx950 上的 mxfp8 MoE/linear、MI300X 上 bf16 weights 的 fp8_per_channel、FP8 KV-cache fix、packed-modules mapping。

DeepSeek-V4 这边也新增了 ROCm attention/MoE paths。对硬件混合团队来说，release 不是在讲一个模型，而是在提醒你别把旧后端的 benchmark 当成新版本答案。

如果你手里有 MI300X 或正在评估 ROCm 服务路径，我会把它从兼容性验证提升到成本验证。看它能不能在你自己的上下文长度、batch 形态和 MoE workload 下，拿到更稳定的吞吐和显存表现。

## 把服务链路一起看，不要只盯模型加载

v0.24.0 还有一批不那么适合做标题、但会影响交付的变化。Model Runner V2 现在默认支持 quantized models，GraniteMoE 默认启用，Qwen + DeepSeek-V2 MoE 完成迁移，还加入 DFlash speculative decoding 和更准确的 FP32 Gumbel sampling。

Streaming Parser Engine 也很值得放进 Agent 服务视角看。它统一 tool-call 和 reasoning parsing，并给 Qwen3、MiniMax-M2、GLM-4.7/5.1/5.2、Nemotron V3 增加 parser。

Rust frontend 继续补服务侧能力，包括 API-key authentication、CORS、/tokenize 和 /detokenize。DiffusionGemma 则新增 CPU path，并给 diffusion decoders 加 structured-output guardrails。WideEP 和 DeepEP v2 进入 expert parallelism 这条线，也补了鲁棒性修复。

所以我不会把 v0.24.0 只看成模型支持列表。它更像一次服务链路升级，runner、parser、frontend、expert parallelism 都在往生产形态靠。

## 决定谁该验证这版

我会按团队状态分三类处理。

| 你现在的状态 | v0.24.0 动作 |
| --- | --- |
| 正在评估 MiniMax-M3 | 建测试分支，重点跑 BF16、FP8、MXFP4、sparse GQA |
| 已经在测 DeepSeek-V4 | 重跑 TTFT、prefill、端到端吞吐、MoE 相关 benchmark |
| 正在走 AMD/ROCm 路径 | 单独验证 MI300X、gfx950、FP8 KV Cache、attention/MoE paths |
| 只维护稳定旧服务 | 先读 release 和对应 PR，把 MRv2、parser、Rust frontend 变化列入兼容性检查 |

我认为这次最有价值的不是某一个模型名字，而是 vLLM 把模型支持、低精度、稀疏路径、硬件后端和前端服务一起推进。对压吞吐和成本的团队，这类更新比新模型公告更值得排进排期。

落地动作可以很小，把现有 benchmark 拆成三组，MiniMax-M3 新模型验证，DeepSeek-V4 延迟和吞吐复测，AMD/ROCm 硬件路径复测。跑完这三组，再决定是否升级服务镜像。

## 相关链接

- [vLLM v0.24.0 Release Notes](https://github.com/vllm-project/vllm/releases/tag/v0.24.0)
- [vLLM GitHub 仓库](https://github.com/vllm-project/vllm)
- [MiniMax-M3 support PR #45381](https://github.com/vllm-project/vllm/pull/45381)
- [DeepSeek-V4 FlashInfer sparse index cache PR #45863](https://github.com/vllm-project/vllm/pull/45863)

<!-- REACH: 7/10 | 品牌✓ 利益点✓ 可操作✓ -->
