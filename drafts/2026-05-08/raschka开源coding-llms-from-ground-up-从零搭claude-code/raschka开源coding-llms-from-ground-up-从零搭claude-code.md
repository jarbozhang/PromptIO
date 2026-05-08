---
title: Raschka 把 Coding LLM 从零教到部署的完整课程开源了，国内程序员可以照着复刻 Claude Code
slug: raschka开源coding-llms-from-ground-up-从零搭claude-code
date: 2026-05-08
status: draft
voice: retro
reach: 8
---

# Raschka 把 Coding LLM 从零教到部署的完整课程开源了，国内程序员可以照着复刻 Claude Code

## 一、为什么你应该关注这件事

Sebastian Raschka 这周把 *Coding LLMs from the Ground Up: A Complete Course* 完整放出来了，对应的 GitHub 仓库 `rasbt/LLMs-from-scratch` 已经堆到 9.2 万 star、1.4 万 fork。这门课的定位很直白，用大约 15 个小时，把"一个能写代码、能跟你对话的 LLM"从 tokenizer 拆到指令微调，全部用 PyTorch 在普通笔记本上跑通。

为什么国内程序员要关注？因为过去两年我们用 Claude Code、Cursor、字节的 TRAE，每天都被一个黑盒包着，你知道它会改你的代码、会调工具、会规划任务，但你不知道它内部那一层 token 是怎么算 attention 的、为什么 instruction finetuning 之后它就突然"听话"了、RL 阶段又是怎么把它训成一个会用工具的 agent。Raschka 这门课配合他自己更早的 "Components of a Coding Agent" 那篇拆解（5 月 3 日的那篇文章），相当于把闭源 coding agent 拆成了两层，上层的工程结构和下层的模型内部机理，第一次都摆在了桌面上。

更现实的一点，今年公众号、知乎、B 站充斥着"30 分钟造一个 Claude Code"的标题党，多数都是套壳调 API。Raschka 这门课不一样，它是真正从字节级 tokenizer 一路写到 GRPO 的强化学习，跑完你能理解为什么 Anthropic 要花几十亿训这个模型，也能理解 DeepSeek、Qwen3、GLM 这些开源 coding 模型是从哪一层开始分化的。

## 二、课程结构，15 小时把一个 GPT 从零搭起来

WebFetch 拿到的是 7 章主线 + 5 个附录，再加上一组放在姊妹仓库 `Reasoning-from-scratch` 里的 bonus（DPO / GRPO）。我按国内开发者实际能用的角度，把它重新组成了五个学习段，每一段写清楚"跑完之后你具体多了什么能力"。

### 第一段，环境与数据（Ch1-Ch2，约 2 小时）

第 1 章只有 21 分钟，纯环境搭建，用 `uv pip` 装依赖。注意 Raschka 在课程里点名 Windows 某些版本会有装包问题，国内开发者建议直接 WSL 或 Mac，省心。

第 2 章约 1.5 小时，讲 tokenizer 和数据加载，byte-pair encoding 怎么把"你好世界"切成 token、训练数据如何按 context window 滑窗、PyTorch DataLoader 怎么 batch。这一段对国内开发者最大的价值是**理解中文 token 经济学**，为什么你用 GPT-4 中文输入贵一倍，为什么 Qwen 的中文 tokenizer 能省 30% token，跑完这章你会有第一手感觉。

可对照资源，Karpathy 的 `minbpe`（字节级 BPE 的极简实现）。Raschka 用的是 tiktoken，Karpathy 那个是教学版，两个一起看会更通透。

### 第二段，注意力与架构（Ch3-Ch4，约 4 小时）

第 3 章 2 小时 15 分，把 self-attention、causal attention、multi-head attention 一行一行写出来。这是整门课的灵魂章节，几乎所有"为什么 LLM 能这样"的问题，答案都在这一章的几十行 PyTorch 代码里。

第 4 章接着把 attention 拼成完整的 GPT 架构，embedding → N 层 transformer block → LayerNorm → 输出 head。Raschka 的代码风格非常克制，没有 HuggingFace 那种几百层抽象，最终的 GPTModel 类就是一个普通的 `nn.Module`。

跑完这两章，你就能改出一个**自己的小型 coding 模型**。比如把 context 改成 8K、把 head 数改成 12、把激活函数从 GELU 换成 SwiGLU，这些都是 DeepSeek-Coder 和 Qwen3-Coder 真实做过的修改，你会突然看懂他们 paper 里那些表格在比什么。

### 第三段，预训练（Ch5，约 2.5 小时）

第 5 章用 *The Verdict* 这部短篇小说做预训练数据，把训练循环、loss 计算、采样策略（temperature、top-k）全部走一遍。Raschka 还教你从 OpenAI 的 GPT-2 把权重 load 进自己的模型，这一步对国内开发者特别实用，你不用真的烧几万块显卡跑预训练，把 GPT-2 的预训练权重当作起点，后面所有微调实验都能在 MacBook 上 30 分钟跑完一轮。

附录 D（"Bells and Whistles"）补了 cosine 学习率、gradient clipping、warmup 这些训练 trick，对应到工业界，就是为什么 DeepSeek 训练日志里那些 LR schedule 看起来都是同一个套路。

### 第四段，微调（Ch6-Ch7 + 附录 E，约 4.5 小时）

第 6 章是分类微调（垃圾邮件分类）。看起来跟 coding 没关系，但它教的是**怎么把一个生成式 LLM 改成判别器**，这正是 reward model 的工作方式，第五段 RL 阶段会用到。

第 7 章是指令微调（instruction finetuning），这一章对理解 Claude Code 至关重要。Raschka 把 Alpaca 风格的指令数据集喂进 GPT-2，让它学会"听 prompt 干活"。跑完之后你会非常具体地知道，Claude 之所以能听懂"重构这个函数让它支持异步"，说到底就是这一步的扩大版。

附录 E 讲 LoRA。这是国内开发者最该精读的附录，你想在 4090 / M3 Max 上微调一个 7B coding 模型，几乎只能走 LoRA。Raschka 把 LoRA 的低秩分解从矩阵层面写清楚，再 plug 进自己的 GPT，整个过程不到 100 行代码。

### 第五段，对齐与推理（Bonus，DPO + GRPO，约 2 小时）

主仓库的第 7 章 bonus 给了 DPO（Direct Preference Optimization），姊妹仓库 `Reasoning-from-scratch` 给了 GRPO（DeepSeek-R1 用的那套强化学习）。这是 Raschka 课程里最贴近"造一个 Claude Code"的部分。

DPO 教你**怎么从偏好数据里训出一个会拒绝坏答案的模型**，这是所有 coding agent 不胡乱删你代码的底层机制。GRPO 教你**怎么用奖励信号训出推理能力**，DeepSeek-R1、Qwen3-Coder 那种"先想再写"的行为就来自这里。

跑完整个第五段，你已经具备了从零训一个 mini coding LLM 的全部底层认知。差的只剩工程化的 agent loop，这部分恰好是 5 月 3 日 Raschka 那篇 *Components of a Coding Agent* 的内容，用 Python 写一个能调工具、能读文件、能多轮规划的外层调度器。两篇一起，构成完整的"从 token 到 Claude Code"学习链。

## 三、社区声音

国内外社区对这套教材的态度高度一致，但侧重点很不一样。

英文社区（Reddit r/LocalLLaMA、r/MachineLearning）讨论最多的是 Raschka 的"教科书式克制"，没有 HuggingFace 抽象、没有 DeepSpeed 开关、没有 W&B 自动日志，每一个变量都是普通 PyTorch tensor，调试器单步进去看得清清楚楚。LocalLLaMA 上有人对比 Karpathy 的 nanoGPT 和 Raschka 这套，nanoGPT 像论文复现，Raschka 这套像本科课程，两者互补。

中文社区（知乎、B 站、即刻）的关注点偏实用，能不能在 4090 上跑完整训练？答案是除了第 5 章预训练大数据集需要更长时间，其他都行。M 系列 Mac 也基本能跑，Raschka 自己课程里特意强调"conventional laptops within a reasonable timeframe"。还有一波人在比对国产生态，字节 `deer-flow` 是 LangGraph 风格的 agent 框架，Nous Research 的 `NousCoder` 是开源 coding 模型，把这两个跟 Raschka 的课配在一起，国内开发者第一次有了完整的"模型层 + agent 层"自学路径。

唯一的负面声音来自一些工程派，他们觉得纯 PyTorch 写法在工业场景没意义，不如直接学 vLLM、SGLang 推理框架。这个批评是合理的，但学习路径上反过来，先有 Raschka 的认知打底，再去看推理框架的优化技巧（PagedAttention、Continuous Batching），你会知道每一项优化在打补丁补的是哪个数学问题。

## 四、我的判断

国内 AI 工程师有一个长期争论，闭源 API 时代，到底还要不要从零理解一个 LLM 的内部机理？

我的答案是，**Coding 方向的 AI 工程师必修，应用层 AI 工程师选修但强烈推荐。**

如果你正在做 coding agent、做 IDE 插件、做企业内的代码助手，那 Raschka 这门课就是你的护城河。原因很简单，调 API 的人永远在猜 prompt 怎么写效果好，理解模型内部的人才能判断"这个任务该上 RAG、该上 fine-tune、还是该上 RLHF"。我见过太多团队花半年调 prompt，最后发现问题其实是 tokenizer 把中文标识符切碎了，这种问题，跑过 Raschka 第 2 章的人 5 分钟就能定位。

如果你是应用层开发者（做 ToB 产品、做 Agent 工作流），不一定要全跑完，但**第 3 章 attention + 第 7 章 instruction finetuning 这两个章节强烈建议刷一遍**。前者让你理解 context window 为什么有上限、KV cache 为什么吃显存；后者让你理解为什么 system prompt 比 user prompt 权重高、为什么 few-shot example 顺序会影响输出。这是 prompt engineering 真正的天花板，不刷这两章你永远只能玄学调试。

至于"造一个比 Claude Code 强的"，别。Anthropic 在 RLHF 数据、安全对齐、工具调用细节上的积累，远不是一门 15 小时课程能复刻的。Raschka 自己在课程开头也说得很清楚，从零搭 LLM 的目的不是替代闭源 API，而是**理解你每天在用的东西到底是什么**。这一点我完全同意。

## 五、行动建议

今晚就动手，分三步，

1. `git clone https://github.com/rasbt/LLMs-from-scratch`，按附录 A 装好 PyTorch + uv 环境，跑通第 1 章。约 30 分钟。
2. 周末连刷第 2、3、4 章，把 tokenizer + attention + GPT 架构跑通。建议边跑边把每个 tensor 的 shape 注释在代码旁，3-4 小时能搞定。
3. 下周晚上每天一小时，刷完 5、6、7 章 + 附录 E (LoRA)。跑完后你已经能在 M3 Max 或 4090 上微调一个属于自己的 coding 模型。

配套阅读，5 月 3 日 Raschka 那篇 *Components of a Coding Agent*（拆 Claude Code 五大组件的 retro 文），跟这门课一起构成完整学习链。再加 Karpathy 的 nanoGPT 做对照，三者通读完，你对"一个 coding LLM 从训练到部署"的理解就接近一线团队水平了。

最后提醒一句，跑这门课的过程会让你对"AI 编程工具"祛魅。这未必是坏事，祛魅之后，你才能真正做出有差异化的产品，而不是又一个调 Claude API 的套壳。

---
相关实体:: [[sebastian-raschka|Sebastian Raschka]] | [[karpathy|Karpathy]] | [[anthropic|Anthropic]] | [[claude-code|Claude Code]] | [[bytedance|字节跳动]] | [[deer-flow|deer-flow]] | [[nous-research|Nous Research]]
相关主题:: [[ai-coding-tools|AI 编程工具]] | 方法论 | [[ai-education|AI 教育]]

<!-- REACH: 8/10 | 品牌✓ 利益点✓ 可操作✓ -->
