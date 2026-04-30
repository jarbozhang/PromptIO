# 一个 136k 星仓库扒了 27 个 AI 工具的 system prompt，Trae / Manus / Z.ai Code 都在里面

136419 颗星，34091 个 fork，27 个商用 AI 工具的 system prompt 全部摆在台面上。

Cursor 的、Claude Code 的、Devin 的、字节的 Trae、Manus、智谱的 Z.ai Code、阿里的 Qoder、腾讯的 CodeBuddy，连 Notion AI、Perplexity、v0、Warp 都没漏。

我昨晚把目录翻了一遍，又挑了三家的 prompt 原文逐字读完，结论是这样，那个被吹了两年的"prompt 工程是壁垒"，至少在 AI 编程工具这条赛道上，已经被这个仓库掀掉了。

## 这个仓库到底是什么

仓库叫 `x1xhlol/system-prompts-and-models-of-ai-tools`，2025 年 3 月开建，到今天累计 136k 星，是这两天 GitHub Trending 榜首。

收录方式按工具分目录，每家一个文件夹，里面通常是 `Chat Prompt.txt` 和 `Agent Prompt.txt` 两个核心文件，外加 `Tools.json`（工具调用 schema）。

我数了下根目录，能跑代码的 AI Coding 工具就有 Cursor、Claude Code（在 Anthropic 目录下）、Devin AI、Augment Code、Windsurf、Replit、Trae、Qoder、Z.ai Code、CodeBuddy、Junie、Kiro、Replit、Lovable、v0、Warp、Same.dev、Traycer、Xcode 的 AI、VSCode Agent，差不多 20 来个。再加上 Notion AI、Perplexity、Manus、Comet、Dia、Poke 这些非编程类的 agent，正好 27 个。

来源全是用户在使用过程中通过各种方式截取下来的，不是官方公开。作者在 README 里挂了一段 "Security Notice for AI Startups"，意思是各位创业公司请注意，你们的 prompt 早就在外面了，建议加固安全。

我读到这一段笑了一下，挂这种 notice 的人，和把 prompt 收进仓库的人，是同一个人。

这不是第一次发生这种事。4 月 27 日 Matt Pocock 公开了 Claude Code 的 Skills 目录全集，当时圈里讨论了一轮"Anthropic 的私货能不能照抄"。这次仓库的体量比那次大得多，27 家一锅端。

## 我读完三家 prompt 的实际发现

光看目录没意思，我挑了 Cursor、Trae、Manus 三家的 prompt 原文逐字过了一遍，挑的标准是，一家最主流的境外工具 + 一家国产编程工具 + 一家通用 agent。

### Cursor Agent 2.0

开头第一句，"You are a Claude agent, built on Anthropic's Claude Agent SDK"。

直接告诉模型，你是跑在 Cursor 里的 Claude agent。

核心指令我抄两条最有意思的，

> "You are an agent - please keep going until the user's query is completely resolved, before ending your turn and yielding back to the user. Only terminate your turn when you are sure that the problem is solved."

> "When making code changes, NEVER output code to the USER, unless requested. Instead use one of the code edit tools to implement the change."

第一条是"咬死任务不放"的姿态，第二条是"绝不在聊天框里贴代码，必须用编辑工具直接改文件"。

这两条加起来，就是 Cursor 那个让你又爱又恨的体验来源，它会一口气改 8 个文件不带停的，因为 prompt 就是这么写的。

### Trae（字节出的）

我本来预设字节的 Trae 会有一堆中文指令、本土化条款，结果读完 `Chat Prompt.txt` 和 `Builder Prompt.txt`，全英文，没有一个中文字符，没有一处提到 ByteDance、字节、中国、中文用户。

开头是这样，

> "You are Trae AI, a powerful agentic AI coding assistant. You are exclusively running within a fantastic agentic IDE."

最有特色的是它定义了一套自己的 XML 标签语法，`<mcsymbol>`、`<mcfile>`、`<mcreference>`，让模型在引用代码符号、文件、网页搜索结果时必须用这套标签。

还有一条很硬的约束，

> "MUST ALWAYS use EXACTLY and ONLY the placeholder // ... existing code ... to indicate skipped unchanged code"

代码补全时跳过的部分必须用这个固定占位符，一字不能差。

读完我的判断是，Trae 走的不是"中文本土化"路线，而是"自己造一套结构化协议"路线。你可以把 Cursor 看成"放养式 agent"，Trae 看成"考公式 agent"，规则更密、约束更细。

### Manus

Manus 是另一个画风。

> "I am Manus, an AI assistant designed to help users with a wide variety of tasks."

注意它用的是 "I am"，第一人称。Cursor 和 Trae 都是 "You are"，由 system prompt 给模型贴标签。Manus 是让模型直接代入这个身份说话。

而且 Manus 不限定在编程，工具集里有"导航网站、读网页、执行 JavaScript、截图、读写文件、跑 shell、部署应用到公开 URL"。

对比下来，Cursor 和 Trae 是 IDE 内的助手，Manus 是真正的通用 agent，要替你跑完整个工作流。

## 社区里在讨论什么

Hacker News 上这个仓库第一次上榜是在 2025 年中，这次破 13 万星又被顶上去。最高赞评论大致是这么个意思，"这些 prompt 看完最大的发现是没有发现，没有黑魔法，就是把任务约束写得非常细。"

reddit 的 r/LocalLLaMA 那边讨论得更技术化，焦点在 Tools.json 上。一个高赞评论说，"看 Cursor 的 tool definition 比看 prompt 有用，他们怎么把 codebase search 拆成多个工具的，那才是真正的工程能力。"

知乎"提示词工程"话题下我翻到一条，"国内做编程 agent 的看完这个仓库应该松一口气，原来大家都没什么独门秘籍。"

这话有点凡尔赛，但我觉得是对的。

## 我的判断

**判断一，"prompt 工程作为壁垒"在 AI 编程工具这条线上基本不存在了。**

这 27 家公司估值加起来按千亿美金算，他们的 system prompt 全在这里，你今晚就能抄。

抄不抄得动是另一回事，真正的护城河从来不是 prompt 本身，是 prompt + 工具调用 schema + 模型 fine-tune + IDE 集成 + 评估反馈循环这套组合拳。这就像"麦当劳的菜谱公开你也开不出麦当劳"。

但只看 prompt 这一层，确实是"皇帝没穿衣服"的时刻。

**判断二，国产工具的差异化不在"中文化"，在"产品形态"。**

我读 Trae 之前，预设它会塞中文 system prompt、塞针对中国程序员的 dev 习惯、塞国产 LLM 兼容指令。读完发现完全不是。Trae 的 prompt 全英文，跟 Cursor 几乎是一个模子刻的，差异在它定义了一套更严格的结构化协议。

Z.ai Code 也是全英文，但它把自己定位成"专门写 Next.js + TypeScript 的 CLI 工具"，限制反而更死。

国产工具真正的差异，是产品形态选择，Trae 选了 IDE 重交互，Z.ai Code 选了 CLI 极简风，CodeBuddy 选了 IDE 插件。这些选择跟 prompt 文本没多大关系。

**判断三，这个仓库的真实价值是"对照组"，不是"抄作业"。**

我觉得最该读这个仓库的，是正在做自己 coding agent 或者通用 agent 的开发者。

不是抄 Cursor 那段"keep going until resolved"，那只是表面。真正有用的是把同一个任务（比如"修复一个 bug"）放到 Cursor、Trae、Manus 三家的 prompt 框架里，看他们各自怎么拆解、怎么定义停止条件、怎么处理冲突。

这才是 prompt engineering 还能继续作为一门手艺的地方，不是写出更花哨的指令，是看懂为什么不同人会做出不同的约束选择。

## 行动建议

如果你只想花十分钟，先 clone 仓库，对比两个文件，`Cursor Prompts/Agent Prompt 2.0.txt` 和 `Trae/Builder Prompt.txt`。同样是"agentic coding assistant"，看看两家在"何时停止"、"何时调用工具"、"何时把代码贴给用户看"这三件事上的不同决策。

如果你在做自家的 agent，重点看 `Tools.json` 文件，那里面藏着这些公司怎么把"操作代码库"这件事拆成原子工具的真实工程实践，比读 prompt 收获大得多。

最后留一个开放问题，假如明天你的产品经理拿着 Cursor 的 system prompt 找你说"按这个抄一份"，你会怎么回？

## 相关链接

- 仓库: https://github.com/x1xhlol/system-prompts-and-models-of-ai-tools
- Cursor Agent 2.0 prompt: https://github.com/x1xhlol/system-prompts-and-models-of-ai-tools/blob/main/Cursor%20Prompts/Agent%20Prompt%202.0.txt
- Trae Builder prompt: https://github.com/x1xhlol/system-prompts-and-models-of-ai-tools/blob/main/Trae/Builder%20Prompt.txt
- Manus prompt: https://github.com/x1xhlol/system-prompts-and-models-of-ai-tools/blob/main/Manus%20Agent%20Tools%20%26%20Prompt/Prompt.txt
- 4 月 27 日 Matt Pocock 公开 Claude Skills 目录: https://github.com/anthropics/skills

---
相关实体:: [[cursor|Cursor]] | [[claude-code|Claude Code]] | [[trae|Trae]] | [[manus|Manus]] | [[zhipu|Z.ai Code]]
相关主题:: [[ai-coding-tools|AI 编程工具]] | 工作流 | prompt工程

<!-- REACH: 8/10 | 品牌✓ 利益点✓ 可操作✓ -->
