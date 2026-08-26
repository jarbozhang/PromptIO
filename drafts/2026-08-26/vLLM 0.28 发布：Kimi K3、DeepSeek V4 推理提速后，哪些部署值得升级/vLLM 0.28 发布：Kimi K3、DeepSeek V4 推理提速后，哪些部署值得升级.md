---
title: vLLM 0.28 发布：Kimi K3、DeepSeek V4 推理提速后，哪些部署值得升级
status: draft
date: '2026-08-26'
source: manual
source_url: https://github.com/vllm-project/vllm/releases/tag/v0.28.0
angle: 从 Kimi K3 首令牌时间、显存节省和 DeepSeek V4 推理解码支持切入，帮助正在使用 vLLM 的读者判断升级收益、兼容范围和验证重点。
voice: analytical
content_lane: version-update
content_archetype: version_brief
diversity_note: recent_entity_saturation,recent_title_pattern_saturation
reach: 9
tags:
  - vLLM
  - Kimi K3
  - DeepSeek V4
  - 大模型部署
  - 推理优化
llm:
  provider: codex
  model: ''
platforms:
  wechat: primary
  xhs: primary
  x: blocked
xhs_title: vLLM 0.28 发布：Kimi K3、DeepSeek V4 推理提速后，哪些部署值得升级
wechat_title: ''
cover:
  status: skipped
recent_similarity: 0.045
reach_note: Kimi、DeepSeek 和 vLLM 具备品牌认知，版本升级带来明确性能收益，现有部署可立即验证。
selection_reason: 这是当天信息最完整的官方版本主源，既有可量化的性能变化，也覆盖 NVIDIA、AMD 等实际部署环境，适合形成高密度版本解读。
---

# vLLM 0.28 发布：Kimi K3、DeepSeek V4 推理提速后，哪些部署值得升级

如果你正在用 vLLM 部署 Kimi K3 或 DeepSeek V4，0.28 值得进入验证队列。它处理的不是零散模型适配，而是首令牌时间、单卡显存、推理解码和键值缓存卸载这些直接影响服务成本的问题。

Kimi K3 是这一版最明确的受益对象。官方给出的结果包括 DSpark 首令牌时间约改善 60%，部分通信内核获得 1.5 至 3 倍加速，可选的共享专家分片还能让每张 GPU 节省约 17 GiB 显存。

DeepSeek V4 的重点则是把稀疏 MLA 推到可用链路，覆盖普通解码、多 token 预测和 DSpark 推测解码。读完这份版本解读，你应该能判断现有部署是否命中收益，以及升级验证该盯住哪些指标。

## 判断旧部署卡在了哪里

此前部署超大 MoE 模型，问题往往不在模型能否加载，而在推理链路没有充分利用模型结构。

Kimi K3 的上下文处理、专家通信和解码内核如果各自留下开销，服务端看到的就是首个 token 等待时间偏长、并行扩展效率不理想，以及单卡显存余量过小。显存紧张还会限制批处理规模，间接压低吞吐。

DeepSeek V4 面临的是另一类完整性问题。稀疏 MLA 只有贯穿普通解码、多 token 预测和推测解码，才适合进入真实服务组合。只支持其中一段，工程团队仍要维护特殊分支或放弃部分加速能力。

## 看懂 Kimi K3 的三项有效变化

vLLM 0.28 为 Kimi K3 加入了解码上下文并行，也就是 Decode Context Parallel，并补上融合 FlashKDA 的解码与预填充内核。MegaMoE 获得 SiTU 激活支持，序列并行加入 GEMM-RS，通信侧还合并了 all-gather 操作。

这组更新可以分成三个部署结果。

| 变化 | 官方发布信息 | 部署侧应观察的结果 |
| --- | --- | --- |
| 自适应推测 token 预算 | DSpark 首令牌时间约改善 60% | 短请求与高并发下的 TTFT 分布 |
| 合并 all-gather | 内核层加速约 1.5 至 3 倍 | 多卡通信占比与扩展效率 |
| 可选共享专家分片 | 每张 GPU 约节省 17 GiB | 可用显存、批量上限与缓存余量 |

这些数字不能直接等同于整套服务的同比提升。1.5 至 3 倍描述的是内核层加速，17 GiB 也依赖启用对应分片方案。真正需要验证的是端到端延迟、吞吐和峰值显存是否同步改善。

Kimi K3 还可通过 V2 模型运行器在 ROCm 上运行。已经采用 AMD GPU 的团队因此多了一条明确的验证路径，但仍需按实际硬件和工作负载核对兼容性。

## 确认 DeepSeek V4 的可用链路

DeepSeek V4 在 0.28 中补齐了稀疏 MLA 的端到端支持，范围包括普通解码、多 token 预测和 DSpark 推测解码。对服务端而言，价值不只是多了一个算子，而是几种解码路径可以围绕同一套稀疏注意力能力工作。

这一版还加入 AMD Quark NVFP4 支持、reasoning effort 提示词与映射、稀疏 top-k 元数据内核优化，并缩小 eager CUDA graph 区域。ROCm 支持覆盖 gfx11 和 gfx950。

如果现有服务没有使用稀疏 MLA、MTP 或推测解码，升级收益可能没有标题里的数字那么明显。相反，正在维护 DeepSeek V4 特殊补丁，或计划在 AMD GPU 上验证该模型的团队，更适合尽快测试 0.28。

## 把升级判断落到验证矩阵

版本还推进了 DFlash2、DSpark 置信度调度验证，以及草稿模型自动启用异步调度。V2 模型运行器增加 E/P/D 解耦、权重卸载、多层 MTP 键值缓存、编码器 CUDA Graph、逐 token 池化和无注意力模型支持。

分层键值缓存也开始支持磁盘卸载、可插拔的第二层管理器、部分加载结果和分层指标。这些能力对超长上下文或显存受限部署有吸引力，但也会把磁盘延迟、缓存命中率和故障恢复带进验证范围。

适合立即验证 0.28 的部署主要有三类，Kimi K3 服务受 TTFT 或显存约束，DeepSeek V4 正在使用稀疏 MLA 与推测解码，或者团队需要 V2 运行器、ROCm 与分层缓存的新能力。

验证时保留当前版本作为基线，用同一批代表性请求比较 TTFT 的 P50 与 P99、输出吞吐、峰值显存、GPU 利用率和错误率。Kimi K3 还要分别开关共享专家分片，DeepSeek V4 则应拆开普通解码、MTP 和 DSpark 三条路径，避免平均值掩盖回退。

我的判断是，vLLM 0.28 更像一次面向特定模型和推理链路的集中兑现，而不是所有部署都该立刻切换的常规更新。命中 Kimi K3、DeepSeek V4、ROCm 或缓存卸载场景时，它的收益足够具体。没有命中这些条件，先完成兼容性与回归测试，再决定是否替换稳定版本。

## 相关链接

- [vLLM 0.28.0 发布说明](https://github.com/vllm-project/vllm/releases/tag/v0.28.0)

<!-- REACH: 7/10 | 品牌✓ 利益点✓ 可操作✓ -->
