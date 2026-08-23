---
title: vLLM 0.25.0 默认启用 Model Runner V2，升级前该重跑哪些压测
status: draft
date: '2026-07-14'
source: manual
source_url: https://github.com/vllm-project/vllm/releases/tag/v0.25.0
angle: >-
  围绕 Model Runner V2 成为默认路径、PagedAttention 被移除以及 Transformers
  后端提速，解释现有服务可能受影响的环节，并用吞吐、首字延迟、显存和输出一致性完成升级对照。
voice: analytical
content_lane: model-deployment
content_archetype: version_brief
diversity_note: recent_entity_saturation,recent_title_pattern_saturation
reach: 8
tags:
  - vLLM
  - 模型部署
  - 推理优化
  - 性能压测
  - Model Runner V2
llm:
  provider: codex
  model: ''
platforms:
  wechat: primary
  xhs: primary
  x: blocked
xhs_title: vLLM 0.25.0 默认启用 Model Runner V2，升级前该重跑哪些压测
wechat_title: ''
cover:
  status: skipped
recent_similarity: 0.045
reach_note: vLLM 有明确品牌认知，避免升级回归是直接利益点，维护者可以立即在预发布环境重跑压测。
selection_reason: 这是会改变默认执行路径的实质更新，不是普通补丁。正在维护推理服务的团队需要尽快确认性能收益和兼容风险。
---

# vLLM 0.25.0 默认启用 Model Runner V2，升级前该重跑哪些压测

如果你的 vLLM 服务承载稠密模型，0.25.0 不应按普通补丁版本处理。Model Runner V2 已成为默认执行路径，即使接口和启动参数没变，模型实际经过的执行链也可能变了。

真正需要重新确认的，是吞吐、首字延迟、显存峰值和输出一致性。旧版本运行正常，不能直接证明新路径能在同一负载下保持原有表现。

升级前最有效的动作，是让当前生产版本与 0.25.0 跑同一组代表性请求，把四项指标放进一张对照表，再决定是否放量。

## 把升级当作执行路径迁移

0.25.0 有三项变化会直接改写旧基线。

| 版本变化 | 发布说明确认的内容 | 需要观察的环节 |
| --- | --- | --- |
| Model Runner V2 转为默认 | 所有稠密模型默认进入 MRv2 | CUDA Graph、缓存行为、并发吞吐和延迟尾部 |
| PagedAttention 被移除 | 旧版注意力实现已经删除 | 依赖旧实现的配置、补丁和回退方案 |
| Transformers 后端提速 | 官方称其性能已追平原生 vLLM 后端 | 自定义模型、不同输入长度和并发形态 |

PagedAttention 被移除，不宜被简单理解成某种显存机制整体消失。发布说明能够确认的是旧注意力实现已删除，V1 与 MRv2 后端成为标准路径，因此不能再把旧实现当作 0.25.0 内部的备用退路。

我的判断是，这次升级的风险不在新接口难学，而在旧服务可能无声切换执行路径。能启动只是兼容性的第一关，不是性能验收。

## 分清哪些能力已经进入主路径

MRv2 新增了 EVS、实时嵌入、Mamba 混合模型的前缀缓存、多模态前缀双向注意力，以及可配合完整 CUDA Graph 的动态推测解码。

Transformers 建模后端还加入 FP8 MoE 支持，并修复 CUDA Graph 与嵌入缩放相关问题。GPTBigCode、Starcoder2 和 RoBERTa 也迁移到了这条后端路径。

这些能力并非每个服务都会用到。更实际的判断方式，是看现有流量是否经过对应模型、缓存、嵌入或推测解码路径，再为命中的路径补专项用例。

## 用四项指标重建升级基线

不要直接把发布说明里的性能结论当作上线结论。硬件、模型、量化方式、输入输出长度和并发必须保持一致，差异才有解释价值。

| 指标 | 固定条件 | 对照方式 |
| --- | --- | --- |
| 吞吐 | 模型、精度、量化、请求长度分布和 GPU 拓扑 | 分并发记录 requests/s 与 output tokens/s |
| 首字延迟 | 预热方式、缓存状态和目标并发 | 比较 p50、p95、p99 TTFT |
| 显存 | 最大序列长度、批处理和缓存配置 | 记录启动、预热、稳态与峰值占用 |
| 输出一致性 | 固定语料、采样参数、随机种子和解析器 | 比较文本、结束原因及结构化输出差异 |

输出一致性不能只看最终文字。若服务依赖工具调用或推理解析，还要检查结构化字段，因为 0.25.0 同时引入了统一的 Streaming Parser Engine，并新增或迁移了多种解析器。

验收阈值应来自现有服务等级目标，而不是临时挑一个看起来合理的百分比。没有旧版本基线时，任何提升或回退都缺少可靠参照。

## 按服务形态安排验证顺序

运行稠密模型的服务优先级最高，因为默认 runner 已经改变。依赖旧注意力实现或内部补丁的服务同样需要优先处理，相关代码可能失去落点。

使用 Transformers 后端承载自定义模型的团队，可以重点验证官方提到的性能提升是否覆盖自己的模型形状。Mamba 混合模型、多模态前缀、实时嵌入和动态推测解码，则应按实际启用能力补专项回归。

回退方案要保留当前生产版本的部署产物、启动配置和模型快照。旧实现已经删除后，可靠的回退发生在版本层，而不是寄希望于 0.25.0 中切回原路径。

把同一批代表性流量分别跑在两个版本上，填完四项指标再放量。升级是否成功，应该由对照结果决定，而不是由服务能否启动决定。

## 相关链接

- [vLLM 0.25.0 发布说明](https://github.com/vllm-project/vllm/releases/tag/v0.25.0)
- [Model Runner V2 默认路径变更](https://github.com/vllm-project/vllm/pull/44443)
- [PagedAttention 移除变更](https://github.com/vllm-project/vllm/pull/47361)
- [Transformers 后端性能变更](https://github.com/vllm-project/vllm/pull/47187)

<!-- REACH: 8/10 | 品牌✓ 利益点✓ 可操作✓ -->
