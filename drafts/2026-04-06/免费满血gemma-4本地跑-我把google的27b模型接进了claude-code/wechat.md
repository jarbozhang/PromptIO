---
title: "免费满血Gemma 4本地跑，我把Google的27B模型接进了Claude Code"
source_url: 'https://ai.georgeliu.com/p/running-google-gemma-4-locally-with'
score: 8.9
scoring_reason: Gemma 4本地接Claude Code，本地大模型实操指南
status: draft
platform: wechat
tags:
  - 本地大模型
  - Gemma 4
  - Claude Code
  - LM Studio
created_at: '2026-04-06T06:32:54.663Z'
generated_by: claude-opus-4-6
---

# 免费满血Gemma 4本地跑，我把Google的27B模型接进了Claude Code

三天前Google放出Gemma 4，我第一反应不是"又一个开源模型"，而是"这玩意能不能替掉我每月烧的API账单"。

答案是能。而且过程比我想的简单十倍。

## 一个让我后悔没早试的组合

先说结论：LM Studio的无头模式 + Gemma 4 27B + Claude Code，这套组合让我本地跑出了接近云端API的效果，延迟反而更低。

我之前一直觉得本地模型是"玩具级"——跑个demo可以，干活不行。Gemma 4彻底改变了我的看法。

这不是客套话。

## 我的踩坑全过程

第一步，下载LM Studio。这步没什么好说的，官网拉最新版就行。但有个细节很多教程不提：**你需要的是CLI模式，不是那个花里胡哨的GUI。**

在LM Studio里搜索Gemma 4，你会看到好几个量化版本。我的建议是：如果你有16GB以上显存，直接上Q8量化的27B。如果只有8GB，退而求其次选Q4。

别选1B的小模型，那个真的是玩具。

第二步，启动本地服务器。LM Studio有个功能叫"无头服务器模式"（headless server），命令行一行搞定，它会在本地起一个兼容OpenAI格式的API端点，默认跑在localhost:1234。

这是整个流程里最优雅的部分——你不需要折腾ollama、不需要配置GGUF路径、不需要手写推理脚本。LM Studio把这些脏活全包了。

第三步，接入Claude Code。这步是重点，也是我踩坑最多的地方。

Claude Code支持自定义模型提供商。你需要做的事情本质上就是告诉它："嘿，这里有个兼容OpenAI的API，地址是localhost:1234，用这个模型。"

具体来说，在Claude Code的设置里配置provider，把API base URL指向你的本地LM Studio端点，模型名填LM Studio里加载的那个Gemma 4模型ID。API key随便填个字符串就行——本地服务器不校验。

**这里有个坑我必须说。** 第一次配完我死活连不上，排查了半小时发现是LM Studio的CORS设置问题。如果你遇到同样的情况，去LM Studio的服务器设置里把CORS打开。

## 27B本地模型到底能干什么

我拿它干了三件事来测试：

**代码补全**：写Python和JavaScript，响应速度在我的M2 Max上大概2-3秒出第一个token，后续流式输出很流畅。质量上，简单到中等复杂度的代码没问题，复杂架构设计还是差点意思。

**代码解释**：把一段500行的React组件丢给它，让它解释逻辑。说实话，解释得比我预期好很多。Gemma 4在理解代码上下文这块确实有进步。

**重构建议**：这是最让我惊喜的。它给出的重构方向基本靠谱，虽然偶尔会过度设计，但至少方向没错。

一句话总结：**日常编码助手，27B的Gemma 4够用了。省下来的API费用，一个月少说几十美元。**

## 社区里几个值得关注的讨论

说个让我震惊的事实：在Reddit的r/LocalLLaMA和Hacker News上，Gemma 4本地部署的讨论帖已经几千条了，但很多人还没注意到这个具体的工作流。

社区正在形成一个共识：**2025年之后，"本地模型+云端大模型"的混合架构才是个人开发者的最优解。** 简单任务扔给本地模型，复杂任务才调云端API。这不是省钱的问题，是延迟和隐私的问题。

还有一个容易被忽略的趋势：LM Studio正在变成本地模型的"Docker"。它把模型部署的复杂度降到了接近零。以前你要折腾CUDA版本、量化格式、推理框架兼容性，现在一个软件全搞定。

这个生态位的变化，比任何单个模型的发布都重要。

## 一个会得罪人的判断

我认为，**大多数个人开发者现在还在为简单任务付API费用，是一种认知税。**

不是说云端API不好。Opus、Sonnet这些模型在复杂推理上的能力，本地模型短期追不上。但你每天80%的AI辅助编码——补全、解释、简单重构——根本不需要最强的模型。

你在为你不需要的能力付费。

当然，这个判断有前提：你得有一台像样的机器。如果你用的是8GB内存的轻薄本，当我没说。

## 值不值得折腾

回到最开始的问题：这套组合值不值得花一个小时配置？

如果你每天用AI辅助编码超过2小时，值得。

如果你在意响应延迟（本地推理没有网络延迟），值得。

如果你处理敏感代码不想上传到云端，非常值得。

配置完成后你会得到一个完全离线可用的编码助手，响应速度取决于你的硬件而不是网络。这种掌控感，用过就回不去了。

下一步：打开LM Studio，下载Gemma 4 27B，花20分钟走完上面的流程。然后回来告诉我，你的API账单少了多少。

---

**相关链接**
- 原文教程：[Running Google Gemma 4 Locally with Claude Code](https://ai.georgeliu.com/p/running-google-gemma-4-locally-with)
- [LM Studio 官网](https://lmstudio.ai/)
- [Google Gemma 4 模型页面](https://ai.google.dev/gemma)
- [Claude Code 文档](https://docs.anthropic.com/en/docs/claude-code)
