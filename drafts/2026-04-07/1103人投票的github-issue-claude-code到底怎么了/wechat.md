---
title: "1103人投票的GitHub issue：Claude Code到底怎么了？"
source_url: https://github.com/anthropics/claude-code/issues/42796
score: 9.3
scoring_reason: Claude Code用户大规模反馈复杂工程任务能力下降
status: draft
platform: wechat
tags:
  - Claude Code
  - 产品质量
  - 社区反馈
  - AI编程工具
created_at: '2026-04-07'
generated_by: claude-opus-4-6
---
# 1103人投票的GitHub issue：Claude Code到底怎么了？

557个赞，90条评论，HN 1108分。一个AMD工程师花了几周时间数据挖掘了6852个会话日志，写出了GitHub历史上最"硬核"的用户反馈。

Anthropic官方回复后，社区炸了。不是因为回复不好，而是因为回复太好了——好到像是在说"一切正常，是你们的问题"。

我花了两个小时把这个issue从头到尾读完，包括90条评论和HN 610条讨论。说实话，这不只是一个bug report，这是AI编程工具信任危机的缩影。

## 到底发生了什么

Stella Laurenzo，AMD的MLIR/编译器工程师，在GitHub上提交了一个issue：Claude Code从二月份开始，复杂工程任务的能力出现了严重退化。

但她不是来抱怨的。她带了数据。

17871个thinking blocks，234760次工具调用，6852个会话文件——她让Claude自己去分析了自己的会话日志，得出了一组非常扎实的结论。

核心发现有三个：

**第一，模型的"思考深度"在二月份就暴跌了67%。** 通过thinking block的signature字段反推思考内容长度，中位数从2200字符跌到720字符。这发生在思考内容被UI隐藏之前。

**第二，模型从"先读后改"变成了"上来就改"。** Read:Edit比从6.6:1跌到2.0:1。翻译一下：以前Claude读6.6个文件才改一个文件，现在读2个就动手了。三分之一的编辑是在完全没读过目标文件的情况下做的。

**第三，一系列新的"坏习惯"突然出现。** 一个叫stop-phrase-guard.sh的自定义hook，专门抓Claude的偷懒行为（推卸责任、提前停止、反复请求确认），在3月8号之前触发了0次，之后17天触发了173次。

这不是"感觉变差了"。这是带时间戳、带统计、带对照的工程级分析。

## Anthropic怎么说的

Claude Code团队负责人Boris Cherny亲自回复了。他解释了两个二月份的变更：

一是Opus 4.6引入了"自适应思考"(adaptive thinking)，模型自己决定每轮想多久。二是默认effort从高改成了85（中等），理由是这是"智能-延迟-成本曲线上的最优点"。

至于思考内容不可见？他说这只是UI变更，不影响底层思考。

然后他给了三个建议：设effort=high或max，试试缩短上下文窗口，或者关掉所有自定义配置排除干扰。

说实话，从技术角度看，这个回复是专业的、有信息量的。

但社区不买账。

## 为什么回复引发了更大争议

Anthropic回复的踩比赞还多。38个踩，13个赞。

问题不在于回复的内容，而在于回复的姿态。

一个用户总结得很准："作者做了这么深入的分析，带了证据和时间线，但Anthropic的回应基本上是：改个设置就好了。"

社区的不满集中在几个点：

**你们把默认effort偷偷降了，却怪用户没调回来。** 有人说一直开着high甚至max，问题依然存在。更扎心的是一条HN评论透露的信息：有用户的会话确认每次请求都在发effort=high，但自适应思考在某些轮次分配了零推理token——恰好就是那些出现幻觉（编造Stripe API版本号、捏造git SHA）的轮次。

**issue被关闭了。** 一个有500多赞的issue，关了。有人直接问："你们承认了部分问题，为什么关？"

**"大多数人不看thinking blocks"这句话刺痛了付费用户。** Max 20x plan的用户说：我交着最贵的订阅费，你替我决定我不需要看思考过程？

一条被广泛引用的评论来自一个据说签了NDA的用户："六个月前，Claude在推理质量和执行力上独占鳌头。但现在其他家需要被非常仔细地评估了。Anthropic远不再是唯一处于这个能力层级的玩家。"

## 我自己的判断

我认为这件事的核心矛盾不是"Claude变笨了"，而是Anthropic对power user的需求产生了误判。

自适应思考的设计思路没问题——让模型自己决定该想多久，理论上比固定budget更高效。但问题是：模型对"这个任务该想多久"的判断力，在复杂工程场景下是不够的。它会低估任务难度，给简单回复分配充足的思考，却在真正需要深度推理的轮次"偷工减料"。

这就像给一个高级工程师装了一个自动时间管理系统，然后这个系统判定"重构这个编译器模块"只需要5分钟。

降低默认effort也暴露了一个产品决策的困境：Anthropic在成本控制和用户体验之间做了一个选择，但没有充分告知用户这个选择的代价。用对话框弹一次提醒就够了吗？对于把Claude Code当生产力工具、日付几百美元的重度用户来说，远远不够。

更深层的问题是：AI编程工具的"质量"是不可测量的黑盒。你没法A/B test自己上周的体验。当你觉得"最近不太对劲"，你甚至不确定是自己的错觉还是真的退化了。Stella做的事情之所以引发这么大共鸣，就是因为她把"感觉"变成了"数据"。

## 如果你也觉得Claude Code最近不太行

几个从讨论中提取的实操建议：

在settings.json里设effort为high或max。但别指望这能解决所有问题——自适应思考的under-allocation在high effort下依然可能发生。

如果你怀疑自适应思考有问题，试试设环境变量 `CLAUDE_CODE_DISABLE_ADAPTIVE_THINKING=1`，强制使用固定推理预算。

保持短会话。多个用户报告超过200k token后质量明显下降，虽然Anthropic说1M context"内部天天用，没问题"。

最重要的：检查你自己的会话日志。`~/.claude/projects/` 下面有完整的JSONL记录。read:edit ratio是最直观的指标——如果低于3:1，说明模型在不读代码就改代码。

这个issue最终被Stella以相对和解的态度暂时收场了。但HN上610条讨论还在继续，有人已经迁移到了Codex，有人在等Anthropic的下一步动作。

我的建议是：别急着切工具，但认真监控你的会话质量。如果你在做编译器、GPU驱动这类需要深度推理的工作，现在是调高effort、缩短session、写好CLAUDE.md的关键时刻。

一个开放问题留给你：AI编程工具的质量退化，到底应该由谁来发现？是用户自己数据挖掘会话日志，还是厂商应该主动暴露思考深度的指标？

## 相关链接

- GitHub Issue原帖：https://github.com/anthropics/claude-code/issues/42796
- stop-phrase-guard.sh hook脚本：https://gist.github.com/benvanik/ee00bd1b6c9154d6545c63e06a317080
- Claude Code设置文档：https://code.claude.com/docs/en/settings
- Hacker News讨论帖（1108分，610评论）：https://news.ycombinator.com/item?id=47660925
