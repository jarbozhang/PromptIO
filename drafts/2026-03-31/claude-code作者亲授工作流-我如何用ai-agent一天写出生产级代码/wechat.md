---
title: Claude Code作者亲授工作流：我如何用AI Agent一天写出生产级代码
source_url: >-
  https://venturebeat.com/technology/the-creator-of-claude-code-just-revealed-his-workflow-and-developers-are
score: 9.4
scoring_reason: 顶级开发者的真实AI使用工作流比任何理论分析都更具参考价值，读者可以直接照搬这些思路来提升自己的AI编程效率。
status: draft
platform: wechat
tags:
  - Claude Code
  - AI编程
  - 工作流
  - 提示词工程
  - 开发者实操
created_at: '2026-03-31T16:59:55.073Z'
---
# Claude Code 作者亲授工作流：我如何用 AI Agent 一天写出生产级代码

如果你正在用 AI 辅助写代码，但每次生成的结果都需要花大量时间手动修修补补，那这套工作流会直接改变你使用 AI Agent 的方式。Anthropic 核心开发者最近公开了他日常使用 Claude Code 的真实开发流，没有任何理论包装，全是实操经验。

### 实操拆解：把 Agent 当实习生，而不是输出机

很多人的 AI 编程习惯是在对话框里扔一句需求，然后祈祷 AI 一次性输出完美代码。这位作者的做法完全不同，他的核心思路是：**建立上下文，分块推进，持续验证**。

在实际操作中，他不会上来就让 AI 写核心逻辑。第一步永远是让 Agent 去读现有的代码库。你可以直接在终端里使用 Claude Code 的 CLI 命令：

```bash
# 启动 Claude Code
claude

# 进入交互环境后，先喂上下文
> 仔细阅读 ./src 目录下的所有文件，理解这个项目的整体架构、目录划分和主要的技术栈，然后向我做一个总结
```

Agent 会安静地消化代码，然后给你一个结构化的架构总结。这相当于给新来的实习生发了份项目文档，让他先读懂再做。

理解完上下文后，他会把大需求拆解成小任务，一次只让 Agent 做一件事。比如要加个新功能，他的提示词（Prompt）长这样：

```text
> 只修改 user_auth.py 文件。在 UserAuth 类中添加一个使用双因素验证的登录方法。
> 
> 要求：
> 1. 遵循项目中已有的错误处理规范（参考 errors.py）
> 2. 复用现有的 database.py 连接池，不要新建数据库连接
> 3. 加上对应的单元测试，放在 tests/test_user_auth.py 里
> 
> 不要修改其他任何文件。
```

注意这里的关键点：**指定文件、给约束条件、明确边界**。这种带强限制的 Prompt，能大幅降低 Agent 产生幻觉或过度重构的概率。

### 踩坑与真实体验：别被流畅的演示骗了

在 HN 和 Reddit 的相关讨论中，最真实的反馈是：AI Agent 处理已有代码的重构和小功能添加非常强力，但面对从零开始的"绿地项目"（Greenfield project）时，很容易跑偏。

一位开发者分享了他在实际项目中的真实测试：在没有给足够上下文的情况下，让 Claude Code 写一个后端 API。Agent 迅速建好了一套非常漂亮的 RESTful 接口，但用的技术栈、目录结构和团队规范完全冲突。

**别被 Agent 丝滑的代码输出骗了，实际用起来你会发现：AI 最擅长的不是替你思考架构，而是替你完成你已经想清楚、只是懒得敲的脏活累活。**

根据社区的踩坑经验，不同场景下的效率表现差异极大：

| 任务类型 | 真实体验表现 | 适合交给 Agent 吗 |
|---|---|---|
| 单测编写 | 速度极快，能覆盖大部分边缘情况 | 非常适合 |
| 代码重构 / 迁移 | 只要上下文给够，跨文件改写很准 | 非常适合 |
| 排查复杂 Bug | 能快速定位模式匹配类问题，多模块联动偶发失效 | 谨慎尝试 |
| 全新业务架构 | 容易过度工程化，偏离产品核心诉求 | 不推荐 |

另外一个普遍的痛点是 Token 消耗。因为 Agent 需要反复读取大段代码来维持上下文，稍微大一点的仓库，一个稍微复杂的需求可能就会消耗掉几十万 Token，这在 API 计费下是一笔不小的开销。

### 我的判断

我认为，这套工作流对目前国内的 AI 工程师来说，最有价值的不是某个具体的提示词技巧，而是**从"一次性生成"到"迭代协作"的范式转变**。

把 Agent 当作一个记忆力超群但缺乏全局判断力的超级实习生。你不能指望实习生一次就把整个系统设计对，但如果你把任务拆细、边界划清，他的产出效率会远超你的预期。

如果你每天的工作涉及大量样板代码编写、旧代码重构、或者是补齐测试覆盖率，这套工作流绝对值得今天就开始尝试。如果你主要在做高层的系统架构设计，或者对业务逻辑的精准度要求极高（比如金融计费模块），那还是先把 AI 当作代码审查的辅助工具更稳妥。

对于国内的开发者，结合国内目前的 API 调用成本来看，我建议先用 Token 消耗更可控的轻量级模型（比如 DeepSeek Coder）来处理单文件级别的重构和单测生成，把最复杂的跨模块需求留给上下文窗口更大的旗舰模型。

### 动手指南

你可以花 30 分钟在本地环境跑通这个工作流：

1. 确保你本地安装了 Node.js (v18+)
2. 在终端执行安装命令：
```bash
npm install -g @anthropic-ai/claude-code
```
3. `cd` 进入你想要开发或修改的现有代码仓库目录
4. 输入 `claude` 启动交互式 Agent
5. 先不要提任何需求，让它阅读你的项目结构并总结
6. 挑一个你一直懒得写的小功能或待重构的函数，用上面提到的约束式 Prompt 交给它完成

**相关链接**
- Claude Code 官方文档与安装指南：https://docs.anthropic.com/en/docs/agents-and-tools/claude-code/overview
- VentureBeat 原文报道：https://venturebeat.com/technology/the-creator-of-claude-code-just-revealed-his-workflow-and-developers-are
- Anthropic 官方提示词工程指南：https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/overview
