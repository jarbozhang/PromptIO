# Datawhale hello-agents 一夜涨 1197 星，国产《从零开始构建智能体》把 agent 拆给普通人看

刷 GitHub Trending Python 榜的时候，一个全中文 README 的仓库蹦到第一屏，hello-agents，今天 +1197 星，作者 datawhalechina。

这是我跟过的第三个上海外榜单的 Datawhale 项目，self-llm 是 4 月底另一波，llm-cookbook 更早。全中文，从零讲智能体。

读完目录我决定写一篇上手指南，因为它解决的是一个我自己踩过的问题，国内开发者想入门 agent，搜出来要么是 LangChain 官方文档（英文+概念抽象），要么是 Microsoft 的 AI Agents for Beginners 12 课（英文+海外生态），要么就是一堆"我用 Coze 做了一个 XX"的视频教程。从零讲清楚 agent 原理 + 又能动手跑代码 + 又是中文 + 又免费的，过去几乎没有。

## 这本书到底教什么

仓库内容是一本完整的开源书《从零开始构建智能体》，共 16 章，分五个部分。

**第一部分基础**，三章，初识智能体、智能体发展史、大语言模型基础。给"听过 agent 但说不清和 chatbot 区别"的读者准备的，包含 LLM 调用和 prompt 基础。

**第二部分实践**，四章，是核心。先讲智能体经典范式（ReAct、Plan-and-Execute），然后用三种路径再实现一遍，低代码平台（Coze/Dify/n8n）、主流框架（AutoGen/AgentScope/LangGraph）、自研框架（叫 HelloAgents，基于 OpenAI 兼容 API，已经发到 V1.0.0）。

我觉得这一部分的安排很聪明。同一个 agent，用三种工具栈各做一遍，读者能直接感知到"框架到底帮你省了什么"。低代码看清楚一个 agent 由哪些部件拼起来，主流框架看抽象的代价，自研看到底层逻辑长什么样。

**第三部分进阶**，五章，记忆与检索、上下文工程、通信协议（MCP、A2A、ANP 三个都讲）、Agentic-RL、性能评估。MCP 和 A2A 这种最近一年才稳定下来的东西能进教程，说明作者在跟。

**第四部分案例**，三章，智能旅行助手、自动化深度研究、赛博小镇。

**第五部分毕业设计**，留一个完整多智能体应用让读者自己动手。

## 跟 Microsoft、LangChain 官方教程各自适合什么人

这三个其实面向不同人群，没有谁吊打谁的问题。

Microsoft 的 AI Agents for Beginners 强项是课程化结构，每一课配 notebook 和视频，适合英文 OK 又能用海外 API 的人。

LangChain 官方教程文档密度极高、版本迭代快、概念套娃（chain、agent、tool、runnable、graph 一层套一层），适合"已经知道自己要做什么、来查 API 怎么用"的人。

hello-agents 走的是第三条路，原理优先 + 多框架横向 + 中文叙事 + 国内 API 友好。它推荐的 LLM 调用方式是 OpenAI 兼容接口，国内开发者用 DeepSeek、智谱 GLM、Kimi、通义千问任何一家都能直接对上。

如果你是大学生或者 AI 工程方向转岗，从 hello-agents 进会顺。

## 跑这本书需要什么

Python 基础是必须的，会写函数、会装包、会读 traceback。LLM 概念了解就行，知道什么是 token、什么是 system prompt、调过 API 一次。作者明确说"无需具备深厚的算法或模型训练背景"。

不需要 GPU，整本书的实践都是调外部 LLM API，本地不跑模型。

API 成本，国内开发者用 DeepSeek 或者智谱 GLM 跑完全套大概几块到十几块人民币，agent 类教程的 token 消耗主要在迭代调试。

## 我打算怎么用它

我自己会按这个顺序，先把第二部分四章用 DeepSeek 跑一遍，重点对比同一个 ReAct agent 在 Coze、LangGraph、HelloAgents 三种实现下的差异，写一份代码对照笔记。然后跳到第三部分的通信协议章节，把 MCP 和 A2A 那块单独读。第四部分的赛博小镇我会留到最后，因为多 agent 模拟更接近研究项目，不是入门必学。

第一部分如果你已经写过 LLM 调用代码可以跳过，但我建议至少扫一眼"智能体发展史"那章，里面有从专家系统到 ReAct 到 Agentic-RL 的整条脉络，对建立判断框架有用。

教程作者还在 issue 区接受反馈和勘误，配套视频在陆续放出，PDF 已经开源带水印免费下载。许可证 CC BY-NC-SA 4.0，非商用可以随便用、商用不行。

## 我的判断

国产开源教程能上 GitHub Trending Python 榜单全球第一档，单日 +1197 星，是中文 AI 教育资源的一次结构性补位。Datawhale 这条线已经不是单点，self-llm 教 LLM 微调、llm-cookbook 教 LLM 应用、hello-agents 教 agent 原理与构建，三本书拼起来覆盖了从模型到应用到智能体的完整学习路径，全中文、全免费、全可跑。

国内开发者过去入门 AI 工程，要么靠拼凑英文资料、要么靠付费课程、要么在公司项目里硬学。现在多了一个"系统性学习曲线"的选项。

如果你在带新人或者自己刚转 AI 方向，把 hello-agents 加到学习清单里是这周性价比最高的动作。

## 相关链接

- 仓库主页 https://github.com/datawhalechina/hello-agents
- Datawhale self-llm https://github.com/datawhalechina/self-llm
- Datawhale llm-cookbook https://github.com/datawhalechina/llm-cookbook

---

本文不涉及境外软件访问教程，所有实操步骤均基于国内可合法访问的服务。

<!-- REACH (xhs): 8/10 | 品牌✓ 利益点✓ 可操作✓ -->
