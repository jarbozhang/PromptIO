---
title: 我同时开了100个Claude写代码，半小时后它们自己合并了一个PR
source_url: 'https://imbue.com/product/mngr_part_2/'
score: 9.0
scoring_reason: 多Agent并行编排一手实战经验，国内几乎无人讨论工程细节
status: draft
platform: wechat
tags:
  - 多智能体
  - 自动化测试
  - Claude
  - 工程实践
created_at: '2026-04-06T02:00:00.000Z'
generated_by: claude-opus-4-6
title_score: 9.2
title_alternatives:
  - title: 我同时开了100个Claude写代码，半小时后它们自己合并了一个PR
    score: 9.2
  - title: 100个AI Agent同时改Bug是什么体验？Imbue的实战复盘让我重新理解了软件开发
    score: 8.5
  - title: 别再单线程用AI了，这家公司同时跑100个Claude，成本和教训全公开
    score: 8.3
gold_quote: 多Agent编排的核心不是让AI更聪明，是让它们更像一个团队。
summary: 让100个Claude同时写代码听起来像科幻片，但Imbue团队真这么干了——用一个叫mngr的开源工具把测试任务拆给100多个Agent并行处理，最后由一个"整合Agent"把所有人的代码合成一个PR。他们踩的坑和总结的MapReduce模式，可能是目前多Agent工程实践最有价值的一手经验。
---
# 我同时开了100个Claude写代码，半小时后它们自己合并了一个PR

你有没有想过，如果能同时开100个Claude，让它们各自干活，最后自动把代码合到一起，会发生什么？

我一直以为这是个纯技术幻想。直到上周看到Imbue团队的实战复盘。

他们真这么干了。100多个Claude Agent并行跑测试，每个Agent独立修Bug、写新测试、改文档，最后由一个"整合者Agent"把所有人的代码变更合成一个可以直接review的PR。

不是PPT，不是概念验证。是在他们自己的产品`mngr`上，每天实际运行的生产级工作流。

这篇复盘里的工程细节，是我目前见过关于多Agent编排最有料的一手经验。

## 架构极其简单：就是个MapReduce

先说让我意外的地方——整个架构没有任何花哨的框架。

本质上就是一个MapReduce：

1. 收集所有测试用例（用`pytest --collect-only`）
2. 每个测试分配一个Agent去处理（Map）
3. 一个整合Agent把所有变更合并成一个PR（Reduce）

就这么简单。没有用LangGraph，没有用CrewAI，没有用任何所谓的"多Agent框架"。

他们用的是自家开源工具`mngr`的四个基础命令：`create`创建Agent，`list`查看状态，`pull`拉取结果，`stop`关闭Agent。整个编排逻辑就是用这四个命令组合出来的。

这让我想到一个在软件工程里反复被验证的道理：**好的基础原语，比好的框架更有价值。** `mngr`不提供MapReduce框架，它提供Map和Reduce的积木块，你自己拼。

## 最难的部分：100个Agent的代码怎么合？

并行启动100个Agent不难。难的是这100个Agent各自改了代码之后，怎么合并成一个不冲突的整体？

Imbue的方案让我眼前一亮。

他们要求每个测试Agent把自己的commit分成两类：**实现修复**（改产品代码）和**非实现变更**（改测试代码、改文档）。

整合Agent拿到所有结果后：
- 非实现变更直接全部合并——这些通常没有冲突
- 实现修复按重要性排序，保持独立commit，一个个合进一条线性分支，沿途解决冲突

最终输出一个单一PR。reviewer可以直接看：非实现部分通常可以一键合入，实现部分逐个commit审查，不想要的直接revert。

这个设计精妙在哪？它把"100个Agent的混乱输出"变成了"一个人类可以轻松review的线性历史"。不是让人去理解100个Agent各自干了什么，而是让整合Agent替人做了最痛苦的那部分工作。

## 一个被严重忽略的能力：能缩回来

Imbue的工程师描述了一个我从没在其他多Agent文章里看到的开发流程。

他一开始在本地机器上跑10个Agent，用Git worktree做隔离。迭代调试prompt、观察Agent行为、调整编排逻辑。本地开发体验很丝滑——Agent秒启动，想看某个Agent在干嘛，一个`tmux attach`就进去了。

调到满意后，想扩展到100个Agent。怎么办？只改一个参数：从`mngr create foo`改成`mngr create foo@.modal`，Agent就跑到了Modal的远程沙箱上。后续的`list`、`pull`、`stop`操作完全一样。

这里最关键的insight不是"能扩上去"，而是**能缩回来**。

他随时可以切回本地跑10个Agent调试。不需要拆远程环境，不需要mock，不需要维护两套配置。上行和下行的路径完全对称。

在国内做技术选型时，我们天天在说"可扩展性"，但几乎没人关心"可收缩性"。一个需要100台服务器才能跑的pipeline，调试成本高到不可接受。**能从10个Agent到100个Agent无缝切换，又能随时缩回10个本地调试——这才是真正的工程可用性。**

## Agent写不好测试怎么办？

Imbue坦诚地说，Agent在第一遍生成端到端测试时，质量通常不行。

原因很现实：端到端测试本身就很难写。Arrange阶段要平衡隔离性和真实性，Act阶段要在忠于原始命令和适配测试场景之间取舍，Assert阶段要避免断言太死导致脆弱。

这些tension对人也一样。

但他们的处理方式很聪明：**不要求Agent一次写对。** Agent先生成一版测试，然后每个Agent在自己的沙箱里反复运行、debug、修复。如果实在搞不定，Agent会输出一个"blocked"状态，标注原因，跳过。

他们甚至发现了一个意外的收益：当Agent生成了错误的测试用例时，通常意味着产品的接口设计或文档有问题。这个信号反过来推动了产品本身的改进。

**Agent写不好的测试 = 人也大概率会写错的测试 = 产品本身的问题。**

这个思路转变比任何技术方案都重要。

## 对我们的启发

国内AI圈谈多Agent，要么是拿LangGraph画个流程图就说自己搞了多Agent系统，要么是在辩论Autogen和CrewAI哪个好用。

Imbue的实践给了一个完全不同的答案：

不需要什么多Agent框架。你需要的是几个好用的基础命令——创建Agent、查看状态、拉取结果、关闭Agent——然后用最朴素的编排逻辑把它们组合起来。

框架会过时，但`create → map → reduce → merge`这个模式不会。

如果你也在折腾多Agent协作，我的建议是：先在本地跑3个Agent跑通整个流程，再考虑扩展到30个、300个。别一上来就设计分布式架构。

mngr是开源的，GitHub上就能找到。值得花个周末跑跑看。

## 相关链接

- Imbue mngr开源仓库：https://github.com/imbue-ai/mngr
- 原文博客：https://imbue.com/product/mngr_part_2/
- 前篇（mngr介绍）：https://imbue.com/product/mngr/
