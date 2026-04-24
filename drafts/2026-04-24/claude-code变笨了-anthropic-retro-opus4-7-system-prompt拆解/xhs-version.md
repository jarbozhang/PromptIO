# Anthropic 刚发了一份 Claude Code 近期质量回顾，Simon 还顺手扒了 Opus 的 system prompt

过去两个月，Reddit、X、知乎、小红书里都能刷到一类帖子，大家对 Claude Code 最近的表现有各种反馈，说它容易失忆、重复提问、走神。

我自己的体感是 4 月初开始，挂着的老会话经常被 Claude 反复问同一个问题，像刚睡醒不知道上下文。当时以为是模型更新副作用。

4 月 24 日 Anthropic 发了一篇 retro，Simon Willison 第一时间做了转述。看完我愣了一下，原因不在模型，在 harness。

## Anthropic 到底说了什么

Anthropic 定位了三个独立 bug，最关键的那条是这样。

3 月 26 日他们上线了一个优化，闲置超过一小时的会话会把旧 thinking 清掉，恢复时减少延迟。本意没问题，省钱又省时间。

问题是一个 bug 让它每一轮都执行一次清理，而不是只清一次。于是 Claude 就变成了一个记性很差、反复找补的家伙。

Simon 长期同时开着十几个 Claude Code 会话，大半挂了几小时甚至过夜。重度用户正好被精准命中。我自己也差不多，一堆 tmux 窗口各挂一个项目，切过去就接着干。

## Simon 顺手做的那件事更值钱

Anthropic 写 retro 不稀奇，真正让我想写这篇的是 Simon 顺手做的另一件事。

他把 Anthropic 公开的 system prompt 文档喂给 Claude Code，拆成按模型和版本组织的目录结构，打上带时间戳的 git commit。仓库叫 simonw/research/extract-system-prompts。

这样 Anthropic 每一次 prompt 调整，都能用 git log、git diff 直接看。模型权重外人看不到，但 system prompt 是公开的，也是 Anthropic 最主要的行为控制手段之一。纳入版本控制，相当于从外面给模型装了一台心电图。

对国内独立开发者这个思路值钱。你自己调 DeepSeek、Kimi、通义或做 agent 产品也一样，哪一版 prompt 什么时候改的、效果怎么变，大多数人靠记忆和感觉。用 git 固化下来就能可复现、可 diff、可回滚。

## Opus 4.6 到 4.7 改了什么

Simon 做了 Opus 4.6（2 月 5 日）到 4.7（4 月 16 日）的 diff，挑几条我觉得有意思的。

一，"开发者平台"改名为 Claude Platform，PowerPoint、Chrome、Excel 进入自主工具组。

二，儿童安全指令放进单独 XML 标签，加了硬规则，一旦因此拒绝请求，同一会话后续所有请求都要极度谨慎。

三，对话风格不粘人了。用户想结束就结束，还多了一句，用户要的是现在就试一下，不是被先采访一轮。

四，工具调用指令改了。以前容易直接说"我没权限做 X"，现在要求先查一下是不是有相关工具只是处于 deferred 状态，对 agentic 场景非常关键。

五，去掉两条旧限制，不再禁止星号加动作，不再禁止 genuinely、honestly 这类口头禅。新模型自己就不这么说话了。

六，新增一段专门针对饮食紊乱的安全指令，禁止给出精确的营养、饮食、运动建议。

## 我的判断

模型公司改行为这件事，大部分不是重新训练，是改 system prompt 和改 harness。权重变一次成本极高，prompt 和 harness 每天都能动。

作为用户，遇到体验变化先别急着下结论，多半是服务端某个优化翻车了。

作为独立开发者，Simon 这套"拿 git 盯住外部可见模型行为"的方法论值得抄。你的 agent 产品要长期运行，上游一次静默改动都可能影响你的 pipeline，必须自己有观测。

国内模型基本不公开 system prompt，Anthropic 公开是对可解释性做的让步，也是给外部研究者的抓手。

## 下一步

把 Simon 那个仓库 clone 下来跑一遍 git log，看一眼你常用模型的 prompt 在过去半年里改了什么。然后问自己，你的 agent 产品对上游模型行为漂移有没有一套观测，没有的话这个周末正好补课。

国内用户想调用 Claude 相关能力，可以通过 OpenRouter 或官方 API 的企业合作通道使用，本文不展开。

---

本文不涉及境外软件访问教程，所有实操步骤均基于国内可合法访问的服务。

<!-- REACH (xhs): 7/10 | 品牌✓ 利益点✓ 可操作✓ -->
