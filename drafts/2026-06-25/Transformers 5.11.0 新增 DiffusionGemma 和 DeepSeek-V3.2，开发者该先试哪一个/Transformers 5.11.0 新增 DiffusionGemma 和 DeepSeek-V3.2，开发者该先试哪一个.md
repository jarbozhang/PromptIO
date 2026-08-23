---
title: Transformers 5.11.0 新增 DiffusionGemma 和 DeepSeek-V3.2，开发者该先试哪一个
status: draft
date: '2026-06-25'
source: manual
source_url: https://github.com/huggingface/transformers/releases/tag/v5.11.0
angle: >-
  从新增模型能力切入，讲 DiffusionGemma 的生成路径和 DeepSeek-V3.2 的长上下文效率变化分别适合什么实验。读者关心的是今天就能用 Transformers
  跑一个最小验证，而不是只看模型新闻。
voice: first-person
content_lane: version-update
content_archetype: version_brief
diversity_note: title_pattern_repeat_in_batch,recent_entity_saturation,recent_title_pattern_saturation
reach: 8
tags:
  - Transformers
  - DiffusionGemma
  - DeepSeek-V3.2
  - 长上下文
  - 模型验证
llm:
  provider: codex
  model: ''
platforms:
  wechat: primary
  xhs: primary
  x: blocked
xhs_title: Transformers 5.11.0 新增 DiffusionGemma 和 DeepSeek-V3.2，开发者该先试哪一个
wechat_title: 新增模型先试谁，Transformers 5.11.0 的两个验证方向
cover:
  status: skipped
recent_similarity: 0.041
reach_note: Hugging Face、Transformers、DeepSeek 有品牌认知，新版本和模型实验有明确可操作入口。
selection_reason: 官方 release 可作事实主源，适合做成版本简报，并和 vLLM 形成部署侧与模型定义侧的互补。
---

# Transformers 5.11.0 新增 DiffusionGemma 和 DeepSeek-V3.2，开发者该先试哪一个

Transformers 5.11.0 这次新增模型，我最关心的不是名单变长，而是两个实验方向终于可以放在同一个工程入口里看。

一个是 DiffusionGemma，它把文本生成从逐 token 排队，推到按块迭代去噪的路径。另一个是 DeepSeek-V3.2-Exp，它把长上下文注意力成本压到可重新评估的位置。

如果你今天只想动一次手，不必同时追两个。先问自己，当前应用卡在生成等待，还是卡在长上下文成本。这个问题答清楚，Transformers 5.11.0 的验证顺序就出来了。

## 把旧瓶颈拆成两类实验

过去我看新增模型，容易陷进参数量、榜单、模型名的噪声里。v5.11.0 这次更适合按瓶颈来读。

| 新增方向 | release 里确认的变化 | 我会验证的对象 |
| --- | --- | --- |
| DiffusionGemma | encoder-decoder 架构，面向推理速度优化，推理时用 multi-canvas sampling 对整块 token 迭代去噪 | 短文本、多候选、对等待时间敏感的生成任务 |
| DeepSeek-V3.2-Exp | 引入 DeepSeek Sparse Attention，面向长上下文训练和推理效率 | 长文档、长会话、代码上下文这类输入很长的任务 |
| Kernels | KernelConfig 支持 n-to-1 module fusion 和参数转换，并补了若干 kernel 路径修复 | 维护自定义 kernel 或低精度推理路径的团队 |

传统 causal language model 的老问题，是文本生成需要按顺序一个 token 接一个 token 往前推。DiffusionGemma 的说明直指这个瓶颈，它不是只预测下一个 token，而是用 diffusion sampler 对一整块 token 反复去噪。

DeepSeek-V3.2-Exp 处理的是另一类痛点。长序列注意力成本原本会按平方级别抬升，DSA 的做法是只关注一部分被选中的历史 token，同时 release 里说基准表现几乎保持一致。

## 用 DiffusionGemma 验证生成路径

我会先把 DiffusionGemma 放到输出长度可控的任务里，而不是一上来挑战长篇生成。提示词改写、短回答、多草稿生成，这些场景更容易看出块式生成路径有没有实际价值。

最小验证只看三件事。

- 同一段输入下，模型能否在 Transformers 入口顺利加载并生成
- 输出长度固定后，等待时间是否比你当前路径更可接受
- 生成质量是否稳定到能进入你的任务链，而不是只看速度感

这里不要把 DiffusionGemma 当成又一个普通文本模型读。它真正值得看的地方，是 multi-canvas sampling 和 block-autoregressive 这一套路径，是否能绕开标准顺序生成里的等待瓶颈。

我的判断是，如果你的产品里有很多短生成请求，DiffusionGemma 比更大的通用模型更值得先试。因为它问的不是模型会不会写，而是生成路径能不能更快给出可用结果。

## 用 DeepSeek-V3.2 验证长上下文成本

DeepSeek-V3.2-Exp 更适合放进长上下文实验。release 里写得很清楚，它建立在 DeepSeek-V3.1-Terminus 之上，使用 685B 参数的 MoE backbone，并加入可训练、细粒度的 sparse attention。

我会把它放进长文档问答、代码库检索后生成、长会话记忆回放这类任务里。目标不是证明它更聪明，而是看 DSA 会不会改变吞长输入时的成本压力。

DeepSeek-V3.2 这条线还继续把 DSA 和 scalable reinforcement learning 放到一起，并在竞赛数学和编程竞赛基准上拿到金牌级结果。对应用开发者来说，这个信息的价值不是直接复制榜单，而是提醒你把长上下文效率和推理能力放在同一张测试表里看。

如果你的应用现在最大的问题是上下文越长越慢、越贵、越不稳定，我会优先看 DeepSeek-V3.2-Exp。它更接近工程里的长期问题。

## 别忽略 kernel 这一层

这次 release 还有一组不太适合做标题、但对工程团队很实用的 kernel 更新。KernelConfig API 扩展后，支持 n-to-1 module fusion 和参数转换，自定义 kernel 接入 Transformers module 的路径更简单。

另外，release 还提到 Mamba2 CUDA kernel 路径里的 dtype mismatch 修复，NemotronH 和 Zamba2 相关路径会受益。细粒度 fp8、fp4 Triton kernel 支持也在这次更新里出现。

如果你只是用 Transformers 跑模型，kernel 更新可以先放到后面。如果你维护的是推理服务、低精度路径或定制 kernel，这部分反而可能比新增模型更早影响排查成本。

## 按你的应用决定先试谁

我不会把这次更新理解成两个模型谁更强。它们像两张不同的试纸，分别测你系统里的两个瓶颈。

选 DiffusionGemma，当你的应用是短输出、高频请求、多候选生成，当前痛点是逐 token 等待太明显。

选 DeepSeek-V3.2-Exp，当你的应用依赖长上下文，输入经常堆到很长，注意力成本和推理稳定性已经变成工程问题。

先看 kernel 更新，当你已经在做低精度推理、自定义 kernel、Mamba2 或相关模型路径维护，模型新闻反而不是当前最紧的事。

我的建议很简单，别用完整评测开局。拿一条你已经在用的任务，固定输入、输出长度、失败样本和验收标准，只换 Transformers 5.11.0 支持的新入口。

DiffusionGemma 看生成路径，DeepSeek-V3.2-Exp 看长上下文成本。今天只选一个瓶颈动手，信息密度比同时追两个模型更高。

## 相关链接

- Transformers v5.11.0 Release, https://github.com/huggingface/transformers/releases/tag/v5.11.0
- DiffusionGemma 合入 PR, https://github.com/huggingface/transformers/pull/46540
- DeepSeek 3.2 Exp 合入 PR, https://github.com/huggingface/transformers/pull/41251
- release 页面内含 DiffusionGemma Documentation、DeepSeek-V3.2 Documentation 和 Paper 入口

<!-- REACH: 7/10 | 品牌✓ 利益点✓ 可操作✓ -->
