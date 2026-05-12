# 从零学大模型，国内中文教程已经卷出四条路，今天上 trending 的《动手学大模型》该排第几

今早翻 GitHub Trending，看到一个项目单日 +422 stars，名字叫《动手学大模型 Dive into LLMs》，仓库 `Lordog/dive-into-llms`。

我点进去看了一眼，眼熟。这是上海交通大学张倬胜老师团队和新加坡国立大学合作做的中文教程，已经攒到 **37.6k stars**，不是新仓库，是今天突然又被算法推上来。

但点开 README 我有点意外。这教程的内容跟我以为的"动手搭一个大模型"不太一样，它 11 个章节里有 **5 章在讲安全攻防**（越狱、水印、隐写、模型安全、Agent 安全）。这跟最近爆火的 datawhale 那几个教程（self-llm、happy-llm、hello-agents）走的是完全不同的路线。

所以我干脆把现在国内能找到的几个主流中文大模型教程梳理一遍，给想从零开始学的中文读者一份**对照路线图**。你现在打开知乎、B 站搜"大模型入门"，大概率会被推荐这四个项目里的至少一个，但它们各自适合谁、绕过哪些坑、走完之后能干什么，没人讲清楚。

## 这四个教程是什么关系

先把家底交代清楚，这四个项目都是国内开源、中文、免费、有 GitHub 仓库、还在持续更新的大模型教程。各自的定位是，

**《动手学大模型 Dive into LLMs》**，上交大 + 新国立，37.6k stars，2025 年 6 月最近一次更新。11 章内容，前 4 章讲微调、提示工程、知识编辑、数学推理，后 7 章一半在讲安全（水印、越狱、隐写、Agent 安全、RLHF 对齐），一半讲多模态和 GUI Agent。是这四个里唯一**带学术安全研究底色**的。

**《self-llm 开源大模型食用指南》**，Datawhale，30.4k stars。定位很直白，"针对中国宝宝量身打造"，专讲怎么在 Linux 环境下部署、使用、微调 50+ 个开源模型。Qwen、ChatGLM、InternLM、DeepSeek、Llama、Gemma 全覆盖，还专门给昇腾 NPU 和 AMD GPU 开了专区。**是工程导向最强的**。

**《happy-llm 从零开始的大模型原理与实践教程》**，Datawhale，30.2k stars。第二章手把手实现 Transformer，第五章带你用 PyTorch 从零搭一个 LLaMA2 跑预训练 + SFT 全流程。**是唯一真的让你"从零搭一个"的**。

**《hello-agents》**，Datawhale，47.9k stars。这四个里 star 最高的。它不教大模型本身，专讲怎么基于大模型构建 Agent，覆盖 ReAct/Plan-and-Solve/Reflection 经典范式，AutoGen/LangGraph 框架，到 MCP/A2A 协议和 Agentic RL（SFT → GRPO）。**是最接近当下就业市场需求的**。

注意 Datawhale 这个社区，三个项目都是他们做的。这是国内最大的 AI 开源教程组织，质量基本能信。上交大的 dive-into-llms 是另一条线，学院派色彩更重。

## 对照路线图

我按你自己的起点划分一下，**完全零基础**、**有 Python 基础想入门 LLM**、**想往 Agent 方向走**，应该走哪条路。

### 完全零基础（甚至 Python 都不熟）

**别上来就读 happy-llm**。从零搭 Transformer 听起来浪漫，但你连 PyTorch 的 `nn.Linear` 都没用过，第二章注意力机制的代码会把你劝退。

你应该先做的事是这两步，

第一步，先去 self-llm 找一个国产小模型（比如 Qwen2.5-7B 或 InternLM-7B）的部署教程，照着指令跑通"装环境 → 下权重 → 起 API → 调一次接口"。这个过程你会被 conda、CUDA 版本、显存、HuggingFace 镜像折磨一遍，但跑通之后你就理解了"大模型"在工程上到底是个什么东西。它不是抽象概念，是一个躺在硬盘上的 14GB 文件 + 一个能加载它的 Python 进程。

第二步，再回头去 happy-llm 第一章读 NLP 基础和第二章 Transformer 架构。这时候你已经摸过模型了，看抽象概念的耐心会高很多。

绕开 dive-into-llms。它的章节起步就假设你懂 transformer、懂 RLHF 是什么、懂 prompt injection 攻击面，零基础读完会自我怀疑。

### 有 Python 基础、想入门 LLM 原理

**主路线，happy-llm 全本读完，平行参考 self-llm 做工程实践**。

happy-llm 的章节顺序是经过设计的，NLP 基础 → Transformer 架构 → 预训练模型 → 大模型原理 → 从零搭 LLaMA2 → Transformers 框架 → 应用（RAG/Agent）。读到第五章你会自己用 PyTorch 跑一遍预训练 + SFT，这件事的价值在于，**之后你看任何论文、任何新模型的发布，你都知道里面那个 "pre-training + SFT + RLHF" 三段式具体在干什么**。

self-llm 在这个阶段当作工具书用，每当 happy-llm 讲到某个国产模型（Qwen、ChatGLM），就去 self-llm 翻对应的微调教程跑一遍。两个项目合起来，理论 + 实战的闭环就有了。

dive-into-llms 在这个阶段也值得看，但只看第 1、2、8 章（微调与部署、提示学习与思维链、多模态模型）。后面的安全章节先跳过，那是研究方向，不是入门必经之路。

### 想往 Agent 方向走

**主路线，hello-agents 全本，dive-into-llms 第 9、10 章补 GUI Agent 视角**。

hello-agents 这个项目我得多说两句。它有个明确的立场，**"区别于 Dify/Coze 等流程驱动的软件工程类 Agent"**，专门讲 AI Native Agent，就是让大模型自己规划、自己决策、自己调工具的那种。这个立场我同意。如果你只想拖几个节点搭个工作流卖给企业客户，去看 Dify 文档就够了。但如果你想理解 OpenAI Operator、Anthropic Claude Agent、Google Astra 这些东西的底层是怎么工作的，hello-agents 是目前中文世界里最系统的一份。

它的章节安排也很合理，基础（ReAct/Plan-and-Solve/Reflection 三个经典范式）→ 实战（自己撸一个 Agent 框架，不依赖 LangChain）→ 高级（RAG、Memory、上下文工程、MCP/A2A 协议、Agentic RL）→ 综合案例（旅行助手、深度研究、赛博小镇）。

中间那个 MCP/A2A/ANP 协议章节尤其值得看。MCP 是 Anthropic 推的，A2A 是 Google 推的，ANP 是国内推的，2025 年下半年是 Agent 协议战的关键期，这章会帮你理清楚每个协议各自要解决什么问题。

dive-into-llms 的第 9 章 GUI Agent 和第 10 章 Agent 安全可以平行看，作为补充视角。GUI Agent 那块讲的是 Computer Use 这条路线，跟 hello-agents 那种通用 Agent 框架是两个方向。Agent 安全则会告诉你"prompt injection 不止是好玩的研究，是真实生产环境里会让你 Agent 被劫持的攻击面"。

### 想做大模型安全方向

唯一选择是 dive-into-llms。这是这四个项目里唯一深入讲安全的，第 3、5、6、7、10、11 章合起来就是一份大模型安全研究的入门 syllabus，从 prompt 注入、模型水印、越狱攻击、隐写、Agent 安全到 RLHF 对齐安全，覆盖面比英文世界里很多 survey 论文都广。上交大那个团队本身就是做这个方向的，资料的可信度有保证。

## 几个绕不开的坑

我自己跑过这几个教程，有些坑提前讲一下。

**HuggingFace 镜像问题**。四个教程都假设你能直接 `from transformers import AutoModel`，这一步在国内大概率超时。解决办法是用 hf-mirror.com 或 modelscope（魔搭社区）。self-llm 在这点上做得最好，几乎所有模型都给了 modelscope 的下载方式。

**显卡门槛被严重低估**。happy-llm 第五章"从零训练 LLaMA2"，文本里写着"亲手搭建"，但你要真训完一个能用的小模型，至少需要一张 24GB 显存的卡。如果你只有笔记本集显，建议把"训练"这一步降级成"读懂代码 + 加载预训练好的权重做推理"。学习目标达成度 80%，硬件成本归零。

**Agent 教程会用很多 API**。hello-agents 里大量例子调用 GPT-4 或 Claude，你需要有一个能用的 API key。国内能用的替代方案是，DeepSeek API（便宜，质量不输 GPT-4），或者本地起一个 Qwen2.5-32B（需要至少 24GB 显存），或者 OpenRouter 上薅免费模型额度。

**别在 dive-into-llms 上做 PR**。这教程是高校团队维护，PR review 慢，自学就好，不要把它当成开源社区贡献的入口。要 contribute 选 datawhale 的那三个，社区更活跃。

## 我的判断

这四个教程合起来构成了**中文 LLM 学习的事实标准**。

英文世界对应物是 Andrej Karpathy 的 nanoGPT 系列 + Sebastian Raschka 的 LLMs-from-scratch + Hugging Face 官方教程，三者加起来也就是这个量级。我们中文世界这几年是真的把这件事做起来了，而且做出了**国产模型生态适配**这个独特优势，self-llm 那种"针对中国宝宝"的写法在英文圈子里你找不到对等物。

下一个 12 个月想入门大模型，**最高效的路径不是去看英文 PDF，是这四个仓库**。它们用中文写，用国产模型举例，用国内能跑通的环境配置，质量已经追上甚至超过英文同类教程。

最后给一个具体的执行建议。如果你今天就想开始，**先 clone hello-agents 跑通第一个 ReAct demo**，半天时间。跑通之后你会有强烈的反馈，知道大模型 Agent 不是魔法，是 prompt 工程 + 工具调用 + 循环控制。这个起点比从 Transformer 数学公式开始友好得多。

剩下三个，看你的兴趣往哪条路走。

## 相关链接

- Dive into LLMs 仓库, https://github.com/Lordog/dive-into-llms
- self-llm 开源大模型食用指南, https://github.com/datawhalechina/self-llm
- happy-llm 大模型原理与实践教程, https://github.com/datawhalechina/happy-llm
- hello-agents 智能体系统教程, https://github.com/datawhalechina/hello-agents
- hf-mirror 国内镜像, https://hf-mirror.com
- ModelScope 魔搭社区, https://modelscope.cn

---
相关实体:: [[dive-into-llms|Dive into LLMs]] | [[self-llm|self-llm]] | [[happy-llm|happy-llm]] | [[hello-agents|hello-agents]] | [[datawhale|Datawhale]]
相关主题:: [[ai-education|AI+教育]] | [[chinese-ai|国产 AI]]

<!-- REACH: 8/10 | 品牌✗ 利益点✓ 可操作✓ -->
