# OpenAI 官方 Agent 框架一天冲 905 星，我试了半天，它打不赢 LangGraph 但杀死了 CrewAI

今天 GitHub trending 上，openai/openai-agents-python 一天涨了 905 颗星。

我先说结论，这东西不是来抢 LangGraph 饭碗的。它是来收 CrewAI 那批只会写"你是一个专业的产品经理"的 prompt 工程师的命。

如果你现在正在用 CrewAI 或者 AutoGen 搭多 Agent 流程，我建议你今晚就花 20 分钟跑一下这个框架。不是为了立刻迁移，是为了让自己知道，OpenAI 官方对"多 Agent 应该长什么样"是怎么想的。

## 它其实是 Swarm 的正式版

先把来历讲清楚。

去年 OpenAI 扔出过一个叫 Swarm 的实验项目，挂着"仅供学习"的标签，代码只有几百行。社区当时就炸了，一堆人拿着 Swarm 搭生产系统，官方反复强调"别用它上线"。

openai-agents-python 就是 Swarm 的正式版。同一批人，同一套哲学，去掉"实验"两个字，加上追踪、会话持久化、guardrails、沙盒执行。

官方自己的定位，"a lightweight, powerful framework for multi-agent workflows"。翻译过来，够用的轻框架。

核心就三个原语，Agent、Handoff、Guardrail。外加 Session 管对话历史，Tracing 管调试。五个概念，看完文档大概需要 30 分钟。

对比一下 LangGraph，光是"什么是 State、什么是 Node、什么是 Edge、什么是 Checkpoint"就能劝退一半人。

## 最短的那段 hello world

```python
from agents import Agent, Runner

agent = Agent(
    name="Assistant",
    instructions="You are a helpful assistant"
)
result = Runner.run_sync(agent, "Write a haiku about recursion")
print(result.final_output)
```

就这。四行代码一个能用的 Agent。

你对比一下 LangChain 里同样功能需要多少 import，就知道 OpenAI 对"开箱即用"是认真的。

装也简单，`pip install openai-agents`，默认只吃 openai 的 key。但官方明确说支持 100+ 其他 LLM，Anthropic、Gemini、DeepSeek、国内主流都能接。不强绑定 OpenAI API，这点比我预期的大方。

## Handoff 才是它真正的杀招

如果只是包一层 SDK，这框架不值 905 颗星。它真正有意思的地方是 Handoff。

什么是 Handoff。坦率讲，就是一个 Agent 把控制权"交接"给另一个 Agent。

在 LLM 眼里，Handoff 被编码成一个工具调用。比如你有个退款 Agent 叫 Refund Agent，主 Agent 的工具列表里会自动多出一个 `transfer_to_refund_agent` 的函数。模型决定要调用它，SDK 就切换上下文，把后续对话全权交给 Refund Agent。

我之前用 CrewAI 写过一个客服工作流，三个角色，分诊、退款、投诉。CrewAI 的做法是预设任务清单，Agent 按顺序执行。逻辑清晰，但一旦用户的真实诉求不按剧本来，整个链路就僵住了。

Handoff 的思路反过来，不预设流程，让模型自己判断现在该谁上。感觉上更像人类团队的协作，分诊员看一眼，"哦这是退款问题，转给老王"。

这也是为什么我说它会杀死 CrewAI。CrewAI 的角色-任务模型在 OpenAI SDK 的 Handoff 面前，显得太啰嗦了。你写 20 行角色定义的时间，我已经跑完了。

## Guardrail 是个坑，但也是我最喜欢的部分

Guardrail 就是输入输出校验层。听起来很无聊，实际用起来有个反直觉的设计。

它默认是**并行**执行的。什么意思，主 Agent 开始推理的同时，Guardrail 也在后台跑输入检查。如果 Guardrail 发现问题触发 tripwire，整个流程立刻中断。

我的判断是，这个设计是对"延迟敏感型"应用的妥协。传统做法是先校验再执行，安全但慢。OpenAI 的做法是乐观执行，出事立刻刹车，大部分时候你省下了校验的等待时间。

但这里有个坑我必须提醒，Handoff 走的是独立的管线，不会触发工具级别的 guardrail。也就是说，你如果给 Agent 套了工具调用的校验，当 Agent 决定 handoff 的时候，那段校验是不生效的。文档里有写，但写得很隐蔽。

我第一次踩到这个坑是因为给客服 Agent 加了"禁止讨论竞品"的 guardrail，结果 Agent handoff 到销售 Agent 后，那段校验就失效了，销售 Agent 开始滔滔不绝讨论竞争对手。排查了一个多小时才发现问题。

## 什么场景用，什么场景别用

说点得罪人的。

**该用的场景**，你的需求是"协调员路由到专家"这种结构。客服分诊、销售资格认证、文档处理流水线。这类场景 Handoff 的价值最大，几十行代码就能跑起来。

**该用的场景二**，你主要用 OpenAI 或兼容 OpenAI API 的模型。虽然框架宣称支持 100+ LLM，但对 OpenAI Responses API 的优化是明显的，Tracing 在 OpenAI 平台里能直接可视化，体验一条龙。

**别用的场景**，你需要复杂的状态管理和循环工作流。比如一个 Agent 要反复迭代、根据中间结果动态调整路径、涉及多个 checkpoint 的那种。去用 LangGraph，这才是它的主场。它的图模型虽然学习曲线陡，但表达能力和生产级特性（checkpointing、streaming、LangSmith 可观测性）都远超 OpenAI SDK。

**别用的场景二**，你团队已经深度绑定 LangChain 生态。那套工具链、那批 memory/retriever 集成，换到 OpenAI SDK 都得重写，迁移成本不值。

**别用的场景三**，你要做研究型的对话式多 Agent 辩论或群体决策。AutoGen 虽然已经进入 Microsoft 的维护模式（2026 年他们转向了 Microsoft Agent Framework），但在会话多 Agent 这个子领域还没有真正的替代品。

## 迁移决策

写到这里，我自己的判断是这样。

如果你正在用 CrewAI，我认为可以开始迁移。OpenAI SDK 的 Handoff 在灵活性和代码量上都压过 CrewAI 的角色模型，而且官方维护，生命周期稳。

如果你正在用 LangGraph，别动。它们不在同一个重量级。

如果你正在用 AutoGen，先别急着切，但新项目不要再起在 AutoGen 上。Microsoft 已经把重心转走了。

如果你还没选框架，那就从 OpenAI SDK 开始。不是因为它最强，是因为它最轻，跑通之后你能清楚知道自己真正需要什么。需求膨胀到它装不下，再换 LangGraph 也不迟。

## 最后一个问题

OpenAI 下一步的计划是 subagent 和 code mode，也就是让 Agent 跑在隔离的代码执行环境里。那结果会怎样，Agent 可以真正"写代码解决问题"，而不只是调用工具。

如果这个功能落地，Claude Code 的 Skill 体系和 OpenAI Agents 的 subagent 就正面撞上了。都是 agent 框架，都是沙盒执行，都是工具编排。

你赌哪边。评论区聊聊。

## 相关链接

- 项目仓库，https://github.com/openai/openai-agents-python
- 官方文档，https://openai.github.io/openai-agents-python/
- Handoffs 详解，https://openai.github.io/openai-agents-python/handoffs/
- Guardrails 详解，https://openai.github.io/openai-agents-python/guardrails/
- Quickstart 教程，https://openai.github.io/openai-agents-python/quickstart/

---
相关实体:: [[openai|OpenAI]]
相关主题:: [[agent-frameworks|Agent框架]]

<!-- REACH: 8/10 | 品牌✓ 利益点✓ 可操作✓ -->
