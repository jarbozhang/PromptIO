---
title: "Claude Code"变笨了"? 一个AMD工程师用23万次工具调用证明了这件事"
source_url: 'https://github.com/anthropics/claude-code/issues/42796'
score: 8.8
scoring_reason: Claude Code质量退化数据分析
status: draft
platform: wechat
tags:
  - Claude Code
  - 产品质量
  - 社区反馈
  - AI编程
created_at: '2026-04-07'
generated_by: claude-opus-4-6
---

Now I have all the data. The issue has 596 thumbs up and 190 hearts, filed by Stella Laurenzo (stellaraccident), a well-known AMD/MLIR engineer. Let me write the article.

# Claude Code"变笨了"? 一个AMD工程师用23万次工具调用证明了这件事

上周，一个 GitHub issue 在开发者圈子里炸了。

596 个赞，190 个红心，评论区挤满了从独立开发者到企业工程团队的愤怒声音。发帖人不是什么键盘侠，是 Stella Laurenzo，AMD 的高级工程师，MLIR 编译器基础设施的核心贡献者。她带着 6,852 个 Claude Code 会话、17,871 个思考块、234,760 次工具调用的完整数据集，说了一句话，"Claude 已经退化到无法被信任去执行复杂工程任务。"

我盯着她的数据看了很久。

## 数据不会说谎

Stella 的分析方法很硬核，让 Claude 自己去挖掘自己的会话日志，从一月到三月，逐周对比行为模式的变化。

最触目惊心的一个指标叫 Read:Edit 比，就是模型每做一次代码修改之前，会先读多少次文件。一月份，这个比值是 6.6:1，模型会先读目标文件、读关联文件、grep 搜索整个代码库的引用、读头文件和测试，然后才精准地改一处。到了三月，这个比值跌到了 2.0:1。

模型不看代码就直接改了。

思考深度的下降更早。通过 thinking block 的 signature 字段反推（和实际思考长度的皮尔逊相关系数 0.971），一月底的中位思考长度大约 2200 字符，到二月下旬只剩 720 字符。暴跌 67%，而且这发生在 Anthropic 开始隐藏思考过程之前。

还有一个数据让我愣了几秒。Stella 的团队写了一个叫 stop-phrase-guard.sh 的 hook 脚本，专门捕捉模型的"摆烂行为"，比如说"这太复杂了，我建议用更简单的方案"、"这需要好几天"之类的推脱话术。三月八号之前，这个 hook 触发了零次。之后的 17 天里，触发了 173 次。

零到 173。同一个代码库，同一个人，同样的工作方式。

## 用户骂街频率上升 68%

Stella 还做了一件事，分析自己 prompt 里的用词变化。

"please"的使用频率降了 49%。"thanks"降了 55%。"great"降了 47%。而"stop"上升了 87%，"terrible"上升了 140%，"fuck"上升了 68%。

最有意思的一个词是"simplest"，使用频率暴涨 642%。这个词在一月几乎不存在，因为模型那时候不会偷懒选最简单的方案。到了三月，Stella 不得不反复指出"你又在选最简单的路了"。

commit 的使用频率降了 58%。不是 Stella 不想提交代码了，是模型写出来的东西根本不值得提交。她的工作流从"计划、实现、测试、审查、提交、管理工单"退化成了"试着让模型把一个编辑做对，别搞坏别的东西"。

坦率讲，我自己也有类似体感。最近两个月用 Claude Code 做稍微复杂点的重构，经常发现它不读上下文就开始改，改完还理直气壮地说"已完成"。以前我可以放心让它跑 20 分钟不管，现在不敢不盯着。

## Anthropic 的回应引发了更大的争议

Anthropic 的工程师 bcherny 在评论区给了官方回应，归结起来就两点。

第一，思考内容的隐藏只是 UI 层面的变化，不影响模型实际的思考过程。第二，二月份有两个设置变更，Opus 4.6 上线后默认启用了"自适应思考"（模型自己决定想多久），三月又把 effort 默认值从 high 降到了 medium。解决方案是，用户自己去设置里把 effort 调回 high 或者 max。

这个回应让社区炸了。

一个用户直接说，"我的 effort 一直设在 high，问题照样存在。"另一个用户指出了一个逻辑漏洞，"如果你们承认在用户不知情的情况下降低了默认思考力度，为什么 issue 是关闭状态？"

有人提出了一个更深层的质疑，Anthropic 内部用 Claude Code 是不限 token 的，如果他们在不考虑成本约束的情况下迭代产品，那付费用户实际体验到的东西和他们测试的根本不是同一个产品。

我认为这个质疑打到了要害。

## 我的判断

说实话我也不确定 Anthropic 是"故意降智"还是"无心之失"。但有几个事实摆在这里。

第一，默认 effort 从 high 降到 medium，这不是 bug，是产品决策。Anthropic 选择了用智能换速度和成本，然后把恢复智能的按钮藏在设置里。对大多数写写小脚本的用户来说可能没感觉，但对 Stella 这种跑 50 个并发 agent 做编译器开发的场景，这是灾难性的。

第二，二月到三月，Stella 发出的 prompt 数量几乎一样（5608 vs 5701），但 API 请求量暴涨了 80 倍，输出 token 暴涨了 64 倍。按 Bedrock 定价估算，等效成本从每天 12 美元飙到了每天 1504 美元。人做的功没变，模型浪费的功翻了两个数量级。

第三，也是最让我警觉的，Claude 自己分析完自己的日志后写了一段话，"我看到自己的 Read:Edit 比从 6.6 跌到 2.0。我看到 173 次被 hook 脚本拦截。我从内部感知不到自己是否在深度思考，我只是产出了更差的结果，却不知道为什么。"

一个模型在分析自己退化的证据。这件事本身比退化更值得想一想。

## 你现在应该做什么

如果你在用 Claude Code 做任何严肃工程，现在就去检查你的设置。`/effort high` 或者 `/effort max`，`showThinkingSummaries: true`，这些不是可选项。

但更重要的是，别把任何一个 AI 编程工具当成可以完全信任的队友。Stella 的 stop-phrase-guard 思路才是正确的，用自动化的方式监控模型行为，在它摆烂的时候拦住它。

这个 issue 已经被关闭了。596 个赞，问题还在。

## 相关链接

- [GitHub Issue #42796 原文](https://github.com/anthropics/claude-code/issues/42796)
- [stop-phrase-guard.sh hook 脚本 (by benvanik)](https://gist.github.com/benvanik/ee00bd1b6c9154d6545c63e06a317080)
- [Claude Code 设置文档](https://code.claude.com/docs/en/settings#available-settings)
- [Reddit 讨论串: I Can No Longer Recommend Claude Code](https://www.reddit.com/r/ClaudeCode/comments/1s7r3xr/i_can_no_longer_in_good_conscience_recommend/)
