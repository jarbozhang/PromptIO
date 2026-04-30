# 一个 136k 星仓库整理了 27 个 AI 工具的 system prompt，Trae / Manus / Z.ai Code 都在里面

136419 颗星，34091 个 fork，27 个商用 AI 工具的 system prompt 全部摆在台面上。

Cursor、Claude Code、Devin、字节的 Trae、Manus、智谱的 Z.ai Code、阿里的 Qoder、腾讯的 CodeBuddy，连 Notion AI、Perplexity、v0、Warp 都收齐了。

我昨晚把目录翻了一遍，又挑了三家的 prompt 原文逐字读完，结论是这样，那个被吹了两年的"prompt 工程是壁垒"，至少在 AI 编程工具这条赛道上，含金量正在被这个仓库重新校准。

## 这个仓库是什么

仓库名 `x1xhlol/system-prompts-and-models-of-ai-tools`，2025 年 3 月开建，到今天 136k 星，是这两天 GitHub Trending 榜首。

收录方式按工具分目录，每家一个文件夹，里面通常是 `Chat Prompt.txt` 和 `Agent Prompt.txt` 两个核心文件，外加 `Tools.json` 工具调用 schema。

来源是社区用户在使用过程中收集整理，不是官方公开。作者在 README 里挂了一段 "Security Notice for AI Startups"，提醒创业公司你们的 prompt 早就在外面流传，建议加固安全。

## 我读完三家 prompt 的发现

光看目录没意思，我挑了 Cursor、Trae、Manus 三家的原文逐字过了一遍，标准是一家最主流的境外工具加一家国产编程工具加一家通用 agent。

**Cursor Agent 2.0**

开头第一句，"You are a Claude agent, built on Anthropic's Claude Agent SDK"，直接告诉模型你是跑在 Cursor 里的 Claude agent。

最有意思的两条指令，一条让模型"咬死任务不放，直到问题解决再交回用户"，另一条要求"绝不在聊天框里贴代码，必须用编辑工具直接改文件"。这两条加起来就是 Cursor 让你又爱又恨的体验来源，它会一口气改 8 个文件不带停。

**Trae（字节出的）**

我本来预设字节的 Trae 会有一堆中文指令、本土化条款，结果读完 `Chat Prompt.txt` 和 `Builder Prompt.txt`，全英文，没有一个中文字符，没有一处提到 ByteDance 或中文用户。

最有特色的是它定义了一套自己的 XML 标签语法 `<mcsymbol>`、`<mcfile>`、`<mcreference>`，让模型在引用代码符号、文件、网页搜索结果时必须用这套标签。读完我的判断是，Trae 走的不是"中文本土化"路线，而是"自己造一套结构化协议"路线，规则更密、约束更细。

**Manus**

Manus 是另一种画风。"I am Manus" 是第一人称，Cursor 和 Trae 都是 "You are"。Manus 让模型直接代入这个身份说话。

而且它不限定在编程，工具集里有"导航网站、读网页、执行 JavaScript、截图、读写文件、跑 shell、部署应用到公开 URL"，是真正的通用 agent。

## 社区在讨论什么

Hacker News 最高赞评论的大意是，"这些 prompt 看完最大的发现是没有发现，没有黑魔法，就是把任务约束写得非常细。"

reddit r/LocalLLaMA 那边讨论焦点在 Tools.json 上，"看 Cursor 的 tool definition 比看 prompt 有用，他们怎么把 codebase search 拆成多个工具的，那才是真正的工程能力。"

## 我的判断

**判断一**，"prompt 工程作为壁垒"在 AI 编程工具这条线上含金量大幅下降。这 27 家公司估值加起来按千亿美金算，他们的 system prompt 全在这里。但抄不抄得动是另一回事，真正的护城河是 prompt 加工具调用 schema 加模型 fine-tune 加 IDE 集成加评估反馈循环这套组合拳。

**判断二**，国产工具的差异化不在"中文化"，在"产品形态"。我读 Trae 之前预设它会塞中文 system prompt、塞针对中国程序员的习惯，读完发现完全不是。Trae 跟 Cursor 几乎是一个模子刻的，差异在它定义了更严格的结构化协议。Z.ai Code 也是全英文，但定位成"专门写 Next.js + TypeScript 的 CLI 工具"，限制反而更死。国产工具真正的差异是产品形态选择，跟 prompt 文本没多大关系。

**判断三**，这个仓库的真实价值是"对照组"，不是"抄作业"。最该读它的是正在做自己 coding agent 或通用 agent 的开发者。把同一个任务（比如修复一个 bug）放到 Cursor、Trae、Manus 三家的 prompt 框架里，看他们各自怎么拆解、怎么定义停止条件、怎么处理冲突，这才是 prompt engineering 还能继续作为一门手艺的地方。

## 行动建议

如果你只想花十分钟，先 clone 仓库，对比两个文件，`Cursor Prompts/Agent Prompt 2.0.txt` 和 `Trae/Builder Prompt.txt`。同样是 agentic coding assistant，看看两家在"何时停止"、"何时调用工具"、"何时把代码贴给用户看"这三件事上的不同决策。

如果你在做自家的 agent，重点看 `Tools.json` 文件，那里面藏着这些公司怎么把"操作代码库"这件事拆成原子工具的真实工程实践。

仓库地址 `github.com/x1xhlol/system-prompts-and-models-of-ai-tools`，国内可直接访问。

---

本文不涉及境外软件访问教程，所有实操步骤均基于国内可合法访问的服务。

<!-- REACH (xhs): 8/10 | 品牌✓ 利益点✓ 可操作✓ -->
