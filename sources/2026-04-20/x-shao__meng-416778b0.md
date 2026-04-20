---
title: "Skill-writer 是 @sentry 开源的一个具有高度工程化水准的 Meta-Skill，它不负责直接完成用户的业务任务，而是为 AI Agent 提供一套标准化、可复现的 Skill 编写"
source: "X @shao__meng"
url: "https://x.com/shao__meng/status/2045843744801603894"
date: "Sun Apr 19 12:35:33 +0000 2026"
likes: 135
reposts: 25
replies: 7
---

Skill-writer 是 @sentry 开源的一个具有高度工程化水准的 Meta-Skill，它不负责直接完成用户的业务任务，而是为 AI Agent 提供一套标准化、可复现的 Skill 编写工作流。

Skill-writer 是 Sentry Skills 生态的“Skills 工厂”：它自身遵循严格的来源追踪、深度把关和验证机制，确保其他 Skills 的创建过程可重复、可审计、高一致性。仓库文档中多次强调 “Use sentry-skills:skill-writer as the canonical skill for creating and updating skills”，将其作为唯一权威入口。
开源地址：
https://t.co/pQ195z3jLp

# 七步工作流：从需求到交付的闭环
Skill-writer 定义了一个严谨的 7 步闭环流程，每一步都有明确的输入、输出和「硬停止规则」。

Step 1: 目标与路径解析
首先区分操作类型（create、update、synthesize、iterate），并将 Skill 归类为五种标准类型之一：
· workflow-process：可重复操作、CI/任务编排
· integration-documentation：库/框架集成、SDK 使用
· security-review：漏洞发现与修复
· skill-authoring：创建或评估其他 Skills
· generic：通用型
这一步的关键在于「最小路径原则」——根据请求形状选择必需的路径组合，避免过度执行。例如，仅更新现有 Skill 的措辞时，不需要执行完整的合成阶段 。

Step 2: 合成（Synthesis）
这是 Skill-writer 最具深度的环节。它要求 Agent 在动笔编写前，先最大化输入覆盖度，减少盲区。核心动作包括：
1. 多源收集：Agent Skills 规范、仓库内现有 Skills、上游实现、领域文档、仓库约定（如 AGENTS.md）
2. 来源评分：为每个来源标注信任层级（canonical、secondary、untrusted）、置信度和使用限制
3. 覆盖扩展：针对核心行为、边缘情况、负例（false-positive 控制）、修复模式、版本差异进行多轮检索
4. 深度门控（Depth Gates）：这是强制性的质量关卡，未通过则不允许进入编写阶段

深度门控的要求非常具体，例如对于 integration-documentation 类 Skill，必须确保：
· 包含 references/api-surface.md、references/common-use-cases.md、references/troubleshooting-workarounds.md
· common-use-cases.md 至少包含 6 个具体的下游用例
· troubleshooting-workarounds.md 至少包含 8 个问题/修复条目

Step 3: 迭代（Iteration）
当任务是基于结果或示例改进 Skill 时，优先执行此步骤。它要求：
· 捕获并匿名化示例（标注 positive/negative、true-positive/false-positive 等标签）
· 在工作集和留出集（holdout set）上重放评估
· 记录行为增量（behavior deltas），确保正负样本都朝预期方向变化

Step 4: 编写与更新（Authoring）
进入实际的 SKILL.md 编写阶段。规范要求：
· 祈使语气：使用命令式语句（如 "Read the diff and identify changes"），而非描述性语言
· 描述即触发器（Description as Trigger）：description 字段必须包含用户实际会说的自然语言触发短语，采用第三人称（如 "Use when asked to 'create a skill'..."）
· 避免重复：不重复 CLAUDE.md 或 AGENTS.md 中已有的仓库约定，而是引用它们
· 可移植路径：使用相对路径（references/...、scripts/...），禁止硬编码主机特定的绝对路径

Step 5: 描述优化
专门优化 description 的质量，减少误触发（false positives）和漏触发（false negatives）。要求构建 should-trigger 和 should-not-trigger 查询集进行验证 。

Step 6: 评估（Evaluation）
默认采用轻量级定性评估，对比修改前后的行为差异。对于集成文档和 Skill 编写类，需包含深度评分表（API 覆盖、已知问题覆盖、用例覆盖、缺口处理质量）。只有在用户要求或高风险场景下，才执行定量基准测试 。

Step 7: 注册与验证
将 Skill 注册到仓库的规范位置，并运行快速验证。同样受深度门控约束，拒绝浅层输出 。

# 设计哲学：工程化 Agent 指令
Skill-writer 不仅是一个工作流模板，更蕴含了一套关于「如何有效编写 Agent 指令」的方法论。

1. 自由度匹配（Degrees of Freedom）
根据任务的脆弱性（Fragility）调整指令的约束强度：
· 高脆弱性（如提交信息格式、API 输出模式）：使用精确步骤和固定格式
· 中脆弱性（如代码审查优先级）：提供指导原则 + 示例
· 低脆弱性（如「解释这段代码」）：仅提供目标和约束
这避免了过度约束浪费上下文，或约束不足导致结果不一致。

2. 渐进式加载与决策表
对于条件复杂的任务，使用决策表（Decision Table）引导 Agent 按需加载：
| Detected Language | Read |
|------------------|------|
| Python           | `references/python.md` |
| JavaScript       | `references/javascript.md` |
这防止了「无条件加载所有参考文件」的反模式，后者会迅速耗尽上下文窗口 。

3. 工作流模式库
Skill-writer 提炼了多种可复用的工作流结构：
· 顺序工作流：带检查清单的多步骤流程
· 条件工作流：基于输入特征的分支处理
· 反馈循环（Feedback Loops）：验证-修复-重试循环，适用于代码生成、文档编辑等质量敏感任务
· 计划-验证-执行（Plan-Validate-Execute）：先生成计划文件，验证通过后再执行，适用于批量操作和破坏性变更

4. 输出模式标准化
针对不同类型的输出需求，提供了模板模式、示例模式、决策表模式和结构化数据模式，确保 Skill 的输出可被下游工具可靠消费 。
