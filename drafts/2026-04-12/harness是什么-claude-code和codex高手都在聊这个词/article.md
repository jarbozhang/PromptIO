# Harness 是什么？为什么 Claude Code 和 Codex 的高手都在聊这个词

上周我把一个老项目交给 Claude Code 重构，跑了半小时，改出一堆不符合项目规范的代码。我当时第一反应是"模型不行"。

然后我加了一个 60 行的 CLAUDE.md 文件，重新跑。

同一个模型，同一个任务，输出质量直接翻了一个档次。

这让我意识到一个问题，我一直在优化 prompt，但从没认真想过 prompt 之外的那些东西。而最近社区里有个词正好在描述这件事，叫 Harness。

## Harness 到底在说什么

先说一个公式，简单到不需要解释。

```
coding agent = AI model + harness
```

模型负责生成文本。Harness 决定这些文本能碰什么、不能碰什么、碰完之后怎么验证。

你可以把它想象成骑马的缰绳。马的能力（模型）很重要，但没有缰绳，马跑到哪儿去你完全控制不了。Harness 就是让 AI Agent 从"随机乱跑"变成"按路线走"的那套东西。

具体来说，Harness 包含这些配置面。

**CLAUDE.md / AGENTS.md**，放在代码库根目录的 markdown 文件，Agent 每次启动都会读。告诉它项目的规范、禁忌、偏好。HumanLayer 团队的 CLAUDE.md 只有 60 行，他们的经验是少即是多。

**Skills**，按需加载的指令包。Agent 平时不知道这些内容的存在，只有在特定场景触发时才会把对应的 skill 文件注入上下文。这就是所谓的"渐进式披露"，避免一开始就把 Agent 的注意力淹没。

**Hooks**，生命周期钩子。类型检查没过就不让提交，构建失败就自动回滚。这些不是靠 prompt 实现的，而是 harness 层面的硬约束。

**子代理 (Sub-agents)**，最狠的一招。把大任务拆成小任务，每个子代理在独立的上下文窗口里跑。Chroma 团队的研究已经证实，模型在越长的上下文中表现越差。子代理就是在做"上下文隔离"。

## 为什么突然火了

说实话我也不确定"突然"是不是准确的描述。Agent 这个概念去年就人尽皆知了，但大多数人（包括我）的注意力一直放在模型能力上。

转折点可能是 LangChain 的那个数据，仅改变 harness 配置就把编码 Agent 的性能从 52.8% 提到了 66.5%。模型没换，prompt 也没大改，就是加了更好的工具编排、错误恢复和验证循环。

接近 14 个百分点的提升，不来自更强的模型，而来自更好的"缰绳"。

这个数据传开之后，社区的认知发生了一个微妙的转变，大家开始意识到"调模型"和"调 harness"是两个独立的优化维度。而后者长期被忽视。

Viv Trivedy 给这个实践起了名字叫 Harness Engineering。Mitchell Hashimoto（HashiCorp 创始人）的理念更直白，每当 Agent 犯错，花时间工程化一个方案让它永远不会以同样的方式再犯。不是调 prompt，是改系统。

## 实操上到底该怎么做

我自己摸索下来，最有用的经验是反过来的，不要提前设计理想配置。

从零开始跑，Agent 犯了什么错，就针对那个错加一条规则。这比花一下午写一个"完美的 CLAUDE.md"有效得多。

几个具体的做法。

**CLAUDE.md 控制在 60 行以内。** ETH Zurich 有个研究发现，人工精心编写的配置文件只带来约 4% 的提升，而自动生成的配置反而会损害性能。少写，写准，比堆量强。

**用 Skills 做渐进式披露。** 不要把所有指令都塞进 CLAUDE.md。把特定场景的知识做成 skill 文件，只在需要时加载。你想想看，一个上下文窗口就那么大，塞满了"以防万一"的指令，真正关键的信息反而被稀释了。

**子代理做上下文隔离。** 跑长任务时，主代理的上下文窗口会不断膨胀，中间的噪音越积越多。把独立的子任务派给子代理，完成后只把结果交回来。父线程保持干净。

**反压 (Back-pressure) 机制必须有。** 类型检查、单元测试、lint，这些不是开发者的事，是 harness 的事。让 Agent 自己验证自己的输出，验证不过就重来。这一步和最终输出质量的相关性比你想象的强。

坦率讲，这些做法单独看都不新鲜。但 Harness Engineering 的价值在于把它们框定成了一个系统性的实践，而不是零散的技巧。

## 我的判断

我认为 Harness Engineering 会在半年内成为 AI 工程师的基本功，就像 Docker 之于后端工程师那样，不是可选项，是前提条件。

可能有人觉得这不就是"写好配置文件"吗？是，也不是。写好配置文件是其中一环，但更核心的变化是思维方式，当 Agent 表现不好时，你的第一反应不再是"换个更强的模型"或"改改 prompt"，而是"我的 harness 哪里漏了"。

这个思维转变很重要。因为模型能力的提升你控制不了，prompt 的优化有天花板，但 harness 是一个你完全可以工程化迭代的系统。

当然了，我自己也还在摸索。我目前的 CLAUDE.md 大概 40 行，skills 有十几个，hooks 还没怎么用。可能有些想法还不成熟，但方向我很确定。

## 下一步

最近有两本公开的 PDF 在社区里传得很广，《Harness Engineering: Claude Code 设计指南》和《Claude Code 和 Codex 的 Harness 设计哲学》。如果你想系统了解这个领域，这两本是目前最好的起点。

不过我更建议的做法是，现在就打开你项目里的 CLAUDE.md（没有就新建一个），写上 3 条你最希望 Agent 遵守的规则，然后跑一遍看效果。

别追求完美，从 Agent 的第一次犯错开始迭代。

这才是 harness engineering 的正确打开方式。

## 相关链接

- [Skill Issue: Harness Engineering for Coding Agents](https://www.humanlayer.dev/blog/skill-issue-harness-engineering-for-coding-agents) - HumanLayer 博客，目前最全面的 harness engineering 入门文章
- [What Is Harness Engineering? Complete Guide (2026)](https://www.nxcode.io/resources/news/what-is-harness-engineering-complete-guide-2026) - NxCode 的完整指南
- [Claude Code 官方文档](https://code.claude.com/docs/en/how-claude-code-works) - 理解 CLAUDE.md 和 skills 的工作原理
- [claude-code-harness GitHub 仓库](https://github.com/Chachamaru127/claude-code-harness) - 一个开源的 Claude Code harness 实现

<!-- REACH: 7/10 | 品牌✓ 利益点✓ 可操作✓ -->
