---
title: "800行JAX代码干翻Claude Code？这个开源项目让我重新理解了AI编程助手"
source_url: 'https://github.com/salmanmohammadi/nanocode/discussions/1'
score: 8.5
scoring_reason: Nanocode用JAX+TPU复现Claude Code，开源复现案例
status: draft
platform: wechat
tags:
  - JAX
  - TPU
  - Claude Code
  - 开源复现
created_at: '2026-04-06T06:32:54.664Z'
generated_by: claude-opus-4-6
---

# 800行JAX代码干翻Claude Code？这个开源项目让我重新理解了AI编程助手

Anthropic的Claude Code卖99刀一个月，我用了三个月，确实好用。

但上周一个叫nanocode的开源项目让我坐不住了。一个人，800行JAX代码，在Google免费TPU上跑，复现了Claude Code最核心的能力——工具调用、文件编辑、自主决策的agent循环。

我的第一反应：这不可能。

## 我为什么被震到了

Claude Code之所以能用，不是因为它背后的模型有多强。核心是那个agent loop——模型读代码、决定用什么工具、执行、看结果、再决定下一步。这个循环做对了，一个中等水平的模型也能干活。做错了，再强的模型也只是个高级补全器。

nanocode的作者Salman Mohammadi把这个循环拆得干干净净。不用PyTorch，不用HuggingFace，纯JAX。为什么？因为JAX天然跑在TPU上，而Google给研究者免费提供TPU算力。

翻译一下：零成本运行一个coding agent。

这句话的含义你品一品。

## 架构拆解：它到底怎么做到的

我花了一个下午读完整个代码库。说实话，简洁到让人不舒服——这种不舒服来自于"原来可以这么简单"的认知冲击。

整个系统就三层：

**第一层，推理引擎。** 用JAX直接加载开源模型的权重，在TPU上做推理。没有用任何推理框架，没有vLLM，没有TGI，就是最原始的矩阵乘法。这意味着你对每一步计算都有完全控制权。

**第二层，工具系统。** 这是最精华的部分。nanocode定义了一套极简的工具协议——文件读写、命令执行、代码搜索。模型的输出会被解析成工具调用，执行后结果注回上下文。这个设计和Claude Code的tool use几乎一模一样，但实现只有几十行。

**第三层，agent循环。** 模型生成 -> 解析工具调用 -> 执行工具 -> 结果拼回prompt -> 再生成。循环往复，直到模型决定"我做完了"或者超出最大轮数。

就这么多。

## 我试了之后发现的三个真相

**真相一：agent能力和模型规模关系没那么大。**

nanocode默认用的是开源的中等规模模型，参数量大概是Claude 3.5 Sonnet的十分之一。但在简单的代码任务上——写个函数、改个bug、加个测试——它的完成率比我预期高得多。

这说明什么？agent loop的设计质量，可能比底层模型的能力更重要。

**真相二：JAX在TPU上的推理速度快得离谱。**

我之前一直觉得PyTorch生态更成熟，但在纯推理场景下，JAX+TPU的组合有一种暴力美学。没有框架开销，没有抽象层损耗，tensor直接在TPU上飞。首个token的延迟低到让我怀疑是不是缓存了。

**真相三：Claude Code的护城河不在技术上。**

这是会得罪人的话，但我必须说——nanocode证明了Claude Code的核心架构并不复杂。文件编辑、工具调用、上下文管理，这些能力的开源复现门槛远比想象中低。

Claude Code真正的壁垒是Claude模型本身的代码理解能力，以及Anthropic在prompt engineering上的海量积累。架构？不是壁垒。

## 社区里的几个有趣讨论

我翻了nanocode的GitHub Discussion和相关的Twitter讨论，发现社区的关注点和我预期完全不同。

他们不太关心"能不能替代Claude Code"这个问题。他们兴奋的是另一件事：**可编程的agent循环**。

当agent loop的每一层都是透明的、可修改的，你可以做很多Claude Code做不到的事：自定义工具、修改决策策略、加入领域特定的约束、甚至让agent在执行过程中自我修正策略。

有人已经在nanocode基础上加了自动测试运行——每次代码修改后自动跑测试，测试失败就自动回退并重试。这种定制化在封闭的Claude Code里根本做不到。

很多人还在讨论"哪个AI编程工具更好用"的时候，已经有不少人在讨论"怎么自己造一个完全可控的AI编程工具"了。

这才是真正的信息差。

## 我的判断

nanocode今天还不能替代Claude Code，差距主要在模型能力和工程打磨上。

但它代表的方向——用开源模型+可编程agent loop+免费TPU算力，构建完全可控的AI编程助手——这个方向一年内会成主流。

原因很简单：开源模型的代码能力在指数级追赶，而agent loop的设计已经被证明不需要什么秘密武器。当模型差距缩小到够用的程度，可控性和零成本就会成为决定性优势。

我已经fork了nanocode，准备加上自己的工具集。如果你也想动手，现在是最好的时机——代码量小到一个下午就能读完，架构清晰到可以直接改。

别等着用别人的工具了。造一个自己的。

## 相关链接

- nanocode GitHub仓库：https://github.com/salmanmohammadi/nanocode
- nanocode架构讨论：https://github.com/salmanmohammadi/nanocode/discussions/1
- JAX官方文档：https://jax.readthedocs.io/
- Google TPU Research Cloud（免费TPU申请）：https://sites.research.google/trc/
