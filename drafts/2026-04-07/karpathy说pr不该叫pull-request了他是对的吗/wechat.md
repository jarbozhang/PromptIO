---
title: "Karpathy说PR不该叫Pull Request了，他是对的吗？"
source_url: 'https://x.com/karpathy/status/2040473058834878662'
score: 8
scoring_reason: Agent时代PR含义变化
status: draft
platform: wechat
tags:
  - Karpathy
  - Agent
  - 开源协作
  - 开发范式
created_at: '2026-04-07'
generated_by: claude-opus-4-6
---

好的 boss，已读完写作规范。这是一篇"现象解读型"文章，我来写。

# Karpathy说PR不该叫Pull Request了，他是对的吗？

上周Karpathy发了条推，1055个赞，说的不是什么新模型新论文，而是一个概念替换，PR应该从Pull Request变成Prompt Request。

我盯着这条推看了很久。

不是因为这个梗有多精妙，而是因为我前两天刚拒绝了一个开源项目的PR，理由是"代码能跑但完全看不出思路"。提交者很委屈，说他花了一整个周末。我也很委屈，因为我花了两小时review，最后发现他想解决的问题用三行配置就能搞定。

Karpathy转述的是Peter Steinberger的观点，这位是知名iOS开发者。原话很直接，"His agents are perfectly capable of implementing most ideas, so there is no need to take your idea, expand it into a vibe coded mess using free tier ChatGPT and send that as a PR."

翻译一下，别把你的想法用免费版ChatGPT搞成一坨vibe coding的烂摊子然后甩过来了。

## 问题不在代码质量，在沟通效率

你想想看，传统的PR流程是什么？我有个想法，我写代码实现它，我提交PR，维护者review代码，来回讨论，合并或者拒绝。

这个流程的隐含假设是，代码是稀缺资源。写代码很贵，所以贡献者写好了代码递过来，维护者应该感激。

但2026年的现实是什么？Claude Code、Cursor这些工具已经把"把想法变成代码"这一步的成本打到了接近零。

成本结构变了，流程就该跟着变。

现在的痛点早就不是"没人写代码"，而是"太多人写了质量参差不齐的代码"。我维护的一个小工具库，每个月能收到十几个PR，其中至少一半一看就是LLM生成的，变量命名风格跟项目完全不搭，测试覆盖率为零，commit message写的是"fix bug"。

review这些PR花的时间，比我自己重写还多。

## Karpathy的idea file才是真正的线索

其实Prompt Request这个梗只是表面。真正值得关注的是Karpathy几乎同期发的另一条推，24804个赞，他公开了自己的"idea file"。

这个东西的逻辑是，我不写代码了，我写想法。想法足够清晰，agent就能实现。

坦率讲，我一开始觉得这有点装。你是Karpathy啊，你当然可以只写想法，你的想法本身就值钱。普通开发者的想法值什么？

但我后来想了想，发现这个逻辑其实不取决于你是不是Karpathy。

它取决于一个更根本的问题，在agent时代，开源协作的最小单位到底是什么？

## 从"代码单位"到"意图单位"

我自己最近在用Claude Code的subagent跑并行任务，十个agent同时生成文章，每个agent拿到的不是代码模板，是一段描述意图的prompt。效果比我手写模板好得多。

原因很简单。代码是实现的快照，意图是问题的本质。你给agent一段代码让它改，它只能在你的实现框架里打补丁。你给它一段清晰的意图描述，它能从零开始选最优方案。

这跟PR的逻辑是一样的。你提交一个600行的diff，维护者得先理解你的实现路径，再判断这个路径对不对，再看代码质量行不行。三层认知负担。

你提交一个Prompt Request，用自然语言描述"我想让这个库支持流式输出，因为当前的批量模式在处理大文件时会OOM，我试过的方案是X但有Y问题"。维护者只需要判断一件事，这个需求该不该做。代码让agent去写。

一层认知负担。

## 但我不完全同意

说实话我也不确定这个判断是不是太极端了。

Prompt Request的前提是agent能写出符合项目规范的代码。现实是，就算是Claude Opus，你不给它足够的上下文，它写出来的代码也是"能跑但不对味"。每个项目都有自己的implicit knowledge，命名习惯、架构决策、历史包袱，这些东西很难在一个prompt里说清楚。

所以我认为更准确的说法不是"PR变成Prompt Request"，而是PR变成了两层。

第一层是Intent Review，这才是人该做的事。看需求合不合理，看方向对不对。

第二层是Code Review，这一步越来越多可以交给agent。让CI里跑一个agent来检查代码风格、测试覆盖率、安全隐患。人只看agent标记出来的问题。

Peter Steinberger和Karpathy看到的是终态。但从现在到终态之间，还有一个过渡期。这个过渡期里，最有价值的技能不是写代码，也不是写prompt，是把意图描述得足够精确，精确到agent能一次性输出合格的实现。

这个技能，可能比写代码本身更难。

## 所以呢

如果你在维护开源项目，现在就可以在CONTRIBUTING.md里加一句，欢迎提交Issue描述你的需求和场景，不需要附带实现代码。你的想法比你的代码更有价值。

如果你是贡献者，下次想给一个项目提PR之前，先问自己一个问题，我要贡献的到底是我的想法，还是我让ChatGPT写的代码？

如果答案是后者，一个写得好的Issue可能比一个写得烂的PR有用十倍。

Karpathy的idea file拿了24804个赞。你的idea file在哪？

## 相关链接

- Karpathy原推（PR应变成Prompt Request）：https://x.com/karpathy/status/2040473058834878662
- Peter Steinberger（原始观点来源）：https://x.com/steipete
- Karpathy idea file推文：https://x.com/karpathy
