---
title: vLLM 0.24.0 上手，DeepSeek V4 首 Token 再快 2%-4%，MiniMax M3 也能部署了
status: draft
date: '2026-07-11'
source: manual
source_url: https://github.com/vllm-project/vllm/releases/tag/v0.24.0
angle: >-
  面向已经使用或准备部署开源模型的团队，拆解 DeepSeek V4 的延迟优化、MiniMax M3
  支持和硬件适配变化，并给出升级前后的最小压测方法。读者可以直接判断这次升级能否降低等待时间和推理成本。
voice: first-person
content_lane: model-deployment
content_archetype: version_brief
diversity_note: recent_entity_saturation,recent_title_pattern_saturation
reach: 9
tags:
  - vLLM
  - DeepSeek V4
  - MiniMax M3
  - 开源模型部署
  - 推理优化
llm:
  provider: codex
  model: ''
platforms:
  wechat: primary
  xhs: primary
  x: blocked
xhs_title: vLLM 0.24.0 上手，DeepSeek V4 首 Token 再快 2%-4%，MiniMax M3 也能部署了
wechat_title: ''
cover:
  status: skipped
recent_similarity: 0.055
reach_note: DeepSeek 和 MiniMax 提供品牌认知，2%-4% 延迟改善是明确利益点，升级与压测都可立即执行。
selection_reason: 正式版本包含具体模型支持和可量化性能改进，不只是常规依赖更新，适合转化为部署团队可验证的升级决策。
---

# vLLM 0.24.0 上手，DeepSeek V4 首 Token 再快 2%-4%，MiniMax M3 也能部署了

如果团队正在运行或准备部署 DeepSeek V4，vLLM 0.24.0 最直接的价值，是继续缩短用户等待首个 Token 的时间。官方 release 给出的数据是，FlashInfer 稀疏索引缓存可改善 2%-4% 的首 Token 延迟（TTFT）。

MiniMax M3 也在这个版本进入支持范围，同时覆盖 BF16、FP8、MXFP4、稀疏 GQA 及多条 AMD/ROCm 优化路径。对准备评估新模型的团队来说，这比单纯增加一个模型名称更实在。

我会把 0.24.0 当成一次值得做版本对照的部署更新，但不会看到 2%-4% 就直接替换生产环境。下面把延迟、吞吐和硬件适配拆开，再给出一套不依赖新测试平台的最小压测方法。

## 把旧问题拆成三种等待

DeepSeek V4 在此前版本已经亮相，0.24.0 做的是一次更深入的优化。从变更项看，工作集中在稀疏索引缓存、预填充规划、低延迟 topK 内核和键值缓存（KV Cache）分配。

这些改动分别影响不同阶段。索引缓存靠近首 Token 等待，预填充规划影响端到端吞吐，topK 内核和连续的块级 KV 分配则继续压缩低延迟路径中的开销。它们不能被合并成一个笼统的模型更快。

MiniMax M3 面对的是另一类旧问题。此前缺少直接支持，这次不仅补上模型入口，还加入 BF16/FP8 索引器、MXFP4、FP8 稀疏 GQA，并修复了 MiniMax M2 的性能回退。

## 看懂 0.24.0 改动落在哪个指标

| 部署关注点 | 0.24.0 的变化 | 应观察的结果 |
| --- | --- | --- |
| DeepSeek V4 首 Token | FlashInfer 稀疏索引缓存 | TTFT 改善 2%-4% |
| DeepSeek V4 整体吞吐 | 预填充块规划优化 | 端到端吞吐提升 4% |
| 低延迟推理 | 集群协作 topK 内核、连续块级 KV 分配 | 需要在实际并发下验证 |
| MiniMax M3 部署 | 新增模型支持及多种精度路径 | 检查加载、显存和输出稳定性 |
| 硬件覆盖 | DeepSeek V4 支持 SM120，并增加 XPU 与 ROCm 的注意力和 MoE 路径 | 按设备与精度组合验证 |

AMD 路径里的变化更具体，包括 gfx950 上的 MXFP8 MoE 与线性算子、MI300X 上面向 BF16 权重的逐通道 FP8，以及 FP8 KV Cache 修复。使用这些设备的团队，比只跑成熟模型和既有硬件的团队更有理由尽早验证。

## 把百分比放回正确指标

我最想提醒的一点是，TTFT 改善 2%-4%，不等于生成阶段的每个 Token 都快 2%-4%。对于聊天、代码补全和 Agent 交互，首 Token 等待直接影响体感，应该重点看 TTFT 的中位数和高分位数。

端到端吞吐提升 4% 也不能直接写成推理成本下降 4%。账单能否减少，还取决于并发、设备利用率、请求长度和服务是否已经触及吞吐瓶颈。

MiniMax M3 获得支持，同样不代表所有设备与精度组合都能跳过验证。0.24.0 提供了更多可走的路径，生产可用性仍要由目标权重、目标硬件和真实请求共同确认。

## 用同一批请求做最小版本对照

我建议直接复用现有服务的请求回放脚本，不必为了这次升级搭一套复杂测试系统。

1. 固定模型权重、精度、硬件、并发、输入输出长度和采样参数，保存当前版本的基线。
2. 建立一套 0.24.0 对照环境，只改变 vLLM 版本，保留可回滚的旧镜像。
3. 完成相同预热后回放同一批请求，记录 TTFT 的中位数与高分位数、端到端吞吐、峰值显存、错误率和输出一致性。
4. DeepSeek V4 重点核对 TTFT 与吞吐，MiniMax M3 先确认模型加载和目标精度路径，再比较性能。

如果差异没有超出多轮运行的自然波动，就不该仅凭 release 中的百分比升级。若延迟或吞吐改善稳定出现，同时显存、错误率和输出没有回退，再进入小流量验证更稳妥。

## 按模型与硬件决定升级优先级

已经部署 DeepSeek V4，并且业务对首 Token 等待敏感的团队，适合优先验证。准备部署 MiniMax M3 的团队，0.24.0 则是明确的候选起点。

使用 SM120、XPU、gfx950 或 MI300X 的团队也值得关注，因为这次更新直接扩展或优化了相应路径。若当前服务不涉及这些模型和硬件，运行又足够稳定，没有必要只为版本号追更。

我的判断是，0.24.0 的重点不是某个孤立的 4%，而是 DeepSeek V4 从初步支持继续走向多硬件优化，同时 MiniMax M3 带着多种精度路径进入部署范围。

真正的升级理由应该出现在你的请求回放结果里。保留一组当前版本基线，把同一批请求交给 0.24.0，先看高分位 TTFT 和端到端吞吐，再决定它能否进入生产流量。

## 相关链接

- [vLLM v0.24.0 发布说明](https://github.com/vllm-project/vllm/releases/tag/v0.24.0)
- [vLLM GitHub 仓库](https://github.com/vllm-project/vllm)

<!-- REACH: 8/10 | 品牌✓ 利益点✓ 可操作✓ -->
