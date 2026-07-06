---
title: 部署 DeepSeek-V4 和 MiniMax-M3，要不要升 vLLM 0.24.0
status: draft
date: '2026-07-07'
source: manual
source_url: https://github.com/vllm-project/vllm/releases/tag/v0.24.0
angle: 把 release 里的 DeepSeek-V4 优化、MiniMax-M3 支持和 AMD/ROCm 调优拆成升级决策表。读者能据此判断自己的服务是否需要升级、回归测试哪些路径。
voice: analytical
content_lane: model-deployment
content_archetype: decision_memo
diversity_note: >-
  title_pattern_repeat_in_batch,developer_lane_daily_cap,recent_entity_saturation,recent_title_pattern_saturation
reach: 8
tags:
  - vLLM
  - 模型部署
  - DeepSeek-V4
  - MiniMax-M3
  - ROCm
  - 推理服务
llm:
  provider: codex
  model: ''
platforms:
  wechat: primary
  xhs: primary
  x: blocked
xhs_title: 部署 DeepSeek-V4 和 MiniMax-M3，要不要升 vLLM 0.24.0
wechat_title: ''
cover:
  status: skipped
recent_similarity: 0.062
reach_note: vLLM、DeepSeek、MiniMax 都有明确品牌，升级部署是直接动作。
selection_reason: 这是高质量官方版本源，覆盖模型部署读者最关心的性能、兼容和升级取舍。
---

# 部署 DeepSeek-V4 和 MiniMax-M3，要不要升 vLLM 0.24.0

正在维护推理服务的人，看到 vLLM 0.24.0 不该只问新版本出了什么。更该问，自己的流量是不是刚好踩在 DeepSeek-V4、MiniMax-M3、ROCm 这些路径上。

这次 release 有 571 个 commit，来自 256 位贡献者，其中 77 位是新贡献者。规模很大，但它的价值不是平均分给所有人，而是集中给几类部署者。

更合适的读法是把它当成一份升级备忘录。你要判断的不是 vLLM 0.24.0 值不值得关注，而是你的服务是不是已经到了该排灰度的那一类。

## 把升级问题缩成一个生产决策

如果服务里没有 DeepSeek-V4，没有 MiniMax-M3，也没有 ROCm 或 XPU 路径，v0.24.0 不一定要马上追。这个版本的强信号，集中在新模型支持、DeepSeek-V4 优化和硬件后端调优。

DeepSeek-V4 这边，release 明确写了 FlashInfer sparse index cache 带来 2 到 4% TTFT 改善，prefill chunk-planning 带来 4% E2E throughput 改善。还有 cluster-cooperative topK kernel、contiguous per-block KV allocations、block-FP8 shared expert、SM100 上 `next_n > 2` 的 native DSA indexer decode。

这些不像宣传数字，更像生产服务的局部瓶颈表。已经卡在首 token、长 prompt prefill、低延迟 decode 或 KV-cache 的团队，才会真正吃到这类改动。

## 用三条路径判断自己是否被命中

| 判断维度 | v0.24.0 给出的信号 | 升级判断 |
| --- | --- | --- |
| 模型路径 | MiniMax-M3 新增支持，DeepSeek-V4 继续优化 | 正在接这两个模型，优先灰度 |
| 性能路径 | TTFT、prefill、topK、KV allocation、shared expert 都有改动 | 压测要覆盖首 token、长输入、低延迟解码 |
| 硬件路径 | SM100、SM120、XPU、ROCm、MI300X、gfx950 都有相关改动 | 硬件越接近这些路径，越不能只跑通用回归 |

MiniMax-M3 不是只加了一个 model class。release 里跟着 BF16/FP8 indexer via MSA、MXFP4 support、FP8 sparse GQA，以及多处 AMD/ROCm 调优。

对部署者来说，这句话的翻译很直接。能启动不够，量化组合、KV-cache、packed-modules mapping、MoE 或 linear kernel 都要进测试矩阵。

## 回归测试盯住真实流量路径

DeepSeek-V4 的回归，不要只看平均吞吐。v0.24.0 改到的路径，刚好覆盖推理服务最容易抖的几个位置。

首 token 要看 TTFT 的中位数和尾部。长 prompt 要看 prefill 的排队波动和 E2E throughput。低延迟 decode 要看 topK 相关路径。KV-cache 和 FP8 组合要看显存波动、cache 行为和异常回退。

MiniMax-M3 更像一次新模型接入回归。BF16、FP8、MXFP4、FP8 sparse GQA 哪些进入你的配置组合，压测矩阵就跟着扩大，不要用一条默认配置代表全部场景。

ROCm 用户还要看设备选择变化。vLLM 0.24.0 提到它不再内部设置 `CUDA_VISIBLE_DEVICES`，而是提供新的 `device_ids` 参数，ROCm 上也开始了 `CUDA_VISIBLE_DEVICES` 的弃用窗口。只要启动脚本、调度层、容器模板依赖这个变量，这次升级就不是纯性能更新。

## 分清该排期的人和该观望的人

适合排期的人很明确。

正在跑 DeepSeek-V4，并且瓶颈在 TTFT、prefill、低延迟 decode、KV-cache 或 FP8 shared expert。准备接 MiniMax-M3，并且需要认真验证 BF16、FP8、MXFP4、FP8 sparse GQA。使用 AMD ROCm、MI300X、gfx950，或者同时维护 XPU 路径。

还有一类是大规模推理团队。v0.24.0 里还有 Model Runner V2 量化模型默认支持、DFlash speculative decoding、DeepEP v2、Rust frontend 的 API-key authentication、CORS、tokenize 和 detokenize 等变化。入口、调度、解析、分布式路径都在动，适合用更完整的灰度窗口看。

可以观望的人也很明确。

主要跑稳定旧模型，近期不接 DeepSeek-V4 或 MiniMax-M3。服务瓶颈在业务编排、网络、队列或上游调用，而不是推理核心。没有性能基线，无法判断百分之几的变化是真收益还是测量误差。

## 我的选择是定向升级，不做全量直推

如果是生产服务，我会把 vLLM 0.24.0 当成定向升级版本，而不是常规补丁版本。DeepSeek-V4、MiniMax-M3、ROCm 和 XPU 被命中，就排灰度。没被命中，就等依赖链和回归窗口更稳。

DeepSeek-V4 先选一条代表性流量，固定模型、prompt 长度分布、并发和硬件，比较旧版本与 v0.24.0 的 TTFT、E2E throughput、显存波动和错误率。MiniMax-M3 不从大流量开始，先把量化组合和生成质量跑完整。ROCm 机器单独做启动脚本回归，特别检查 `device_ids` 迁移。

vLLM 0.24.0 的价值，不在于所有服务都该立即升级。它更像一张定位图，告诉你哪些模型、哪些硬件、哪些瓶颈正在被项目重点处理。部署者最该做的，是把这张图和自己的线上路径对齐。

## 相关链接

- [vLLM v0.24.0 Release Notes](https://github.com/vllm-project/vllm/releases/tag/v0.24.0)
- [MiniMax-M3 support PR](https://github.com/vllm-project/vllm/pull/45381)
- [DeepSeek-V4 FlashInfer sparse index cache PR](https://github.com/vllm-project/vllm/pull/45863)
- [vLLM device_ids change PR](https://github.com/vllm-project/vllm/pull/45026)

<!-- REACH: 6/10 | 品牌✓ 利益点✓ 可操作✓ -->
