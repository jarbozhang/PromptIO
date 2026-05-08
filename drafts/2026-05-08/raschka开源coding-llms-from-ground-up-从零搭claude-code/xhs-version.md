# Raschka 把 Coding LLM 从零教到部署的完整课程开源了，国内程序员能照着搭一遍

Sebastian Raschka 这周把 *Coding LLMs from the Ground Up* 完整课程放出来了，对应仓库 `rasbt/LLMs-from-scratch` 已经 9.2 万 star、1.4 万 fork。课程定位很直白，大约 15 小时，把"一个能写代码、能跟你对话的 LLM"从 tokenizer 拆到指令微调，全部用 PyTorch 在普通笔记本上跑通。

为什么国内开发者要看？因为这两年我们用 Claude Code、Cursor、字节 TRAE，每天被一个黑盒包着，知道它会改代码、调工具、规划任务，但不知道内部 token 怎么算 attention、为什么 instruction finetuning 之后它就突然"听话"。Raschka 这门课配合他 5 月 3 日那篇 *Components of a Coding Agent*，相当于把 coding agent 拆成了上层工程结构和下层模型机理两层，第一次都摆在桌面上。

## 课程结构，15 小时把一个 GPT 从零搭起来

我按国内开发者实际能用的角度，把 7 章主线 + 附录重新组成五个学习段。

**第一段，环境与数据（Ch1-Ch2，约 2 小时）**
第 1 章 21 分钟纯环境搭建，用 `uv pip` 装依赖。第 2 章讲 tokenizer 和数据加载，BPE 怎么切 token、PyTorch DataLoader 怎么 batch。这一段对国内开发者最大价值是**理解中文 token 经济学**，为什么 Qwen 的中文 tokenizer 能比 GPT-4 省 30% token，跑完你会有第一手感觉。

**第二段，注意力与架构（Ch3-Ch4，约 4 小时）**
第 3 章把 self-attention、causal attention、multi-head attention 一行行写出来，是整门课的灵魂。第 4 章拼成完整 GPT 架构。Raschka 代码风格非常克制，最终的 GPTModel 类就是一个普通 `nn.Module`。跑完这两章，你能改出自己的小型 coding 模型，比如把 context 改成 8K、激活函数从 GELU 换 SwiGLU，这些都是 DeepSeek-Coder 和 Qwen3-Coder 真实做过的修改，你会突然看懂他们 paper 里那些表格。

**第三段，预训练（Ch5，约 2.5 小时）**
用一部短篇小说做预训练数据，把训练循环、loss、采样策略全走一遍。Raschka 还教你把 GPT-2 权重 load 进自己的模型，这一步对国内开发者特别实用，不用真烧几万块显卡，把 GPT-2 当起点，后面所有微调实验都能在 MacBook 上 30 分钟跑完一轮。

**第四段，微调（Ch6-Ch7 + 附录 E，约 4.5 小时）**
第 6 章分类微调教你**怎么把生成式 LLM 改成判别器**，这正是 reward model 的工作方式。第 7 章指令微调对理解 Claude Code 至关重要，Raschka 让 GPT-2 学会"听 prompt 干活"，跑完你会非常具体地知道，Claude 能听懂"重构这个函数让它支持异步"，根上就是这一步的扩大版。
附录 E 讲 LoRA，国内开发者最该精读，4090 / M3 Max 上微调 7B 模型几乎只能走它。Raschka 把低秩分解 plug 进自己的 GPT，整个过程不到 100 行代码。

**第五段，对齐与推理（Bonus，DPO + GRPO，约 2 小时）**
姊妹仓库 `Reasoning-from-scratch` 给了 GRPO，DeepSeek-R1 用的那套强化学习。DPO 教你**从偏好数据训出会拒绝坏答案的模型**，这是所有 coding agent 不胡乱删代码的底层机制。GRPO 教你**用奖励信号训出推理能力**，DeepSeek-R1、Qwen3-Coder 那种"先想再写"的行为就来自这里。

跑完第五段，你已经具备了从零训一个 mini coding LLM 的全部底层认知。差的只剩 agent loop 工程化，恰好是 Raschka 5 月 3 日那篇拆 Claude Code 五大组件的文章内容。两篇一起，构成完整的"从 token 到 Claude Code"学习链。

## 社区声音

英文社区 r/LocalLLaMA 讨论最多的是 Raschka 的"教科书式克制"，没有 HuggingFace 抽象、没有 DeepSpeed 开关，每个变量都是普通 PyTorch tensor，调试器单步看得清清楚楚。有人对比 Karpathy 的 nanoGPT 和这套，前者像论文复现，后者像本科课程，互补。

中文社区关注点偏实用，能不能在 4090 上跑完？除了第 5 章预训练大数据集要更长时间，其他都行。M 系列 Mac 也基本能跑。还有一波人在比对国产生态，字节 `deer-flow` 是 LangGraph 风格 agent 框架，Nous Research 的 `NousCoder` 是开源 coding 模型，把这俩跟 Raschka 课配在一起，国内开发者第一次有了完整的"模型层 + agent 层"自学路径。

唯一负面声音来自工程派，觉得纯 PyTorch 在工业场景没意义，不如直接学 vLLM、SGLang。这个批评成立，但顺序反过来更好，先有 Raschka 的认知打底，再看推理框架优化（PagedAttention、Continuous Batching），你会知道每项优化在补哪个数学问题。

## 我的判断

**Coding 方向 AI 工程师必修，应用层 AI 工程师选修但强烈推荐。**

调 API 的人永远在猜 prompt 怎么写效果好，理解模型内部的人才能判断"这个任务该上 RAG、上 fine-tune、还是上 RLHF"。我见过太多团队花半年调 prompt，最后发现是 tokenizer 把中文标识符切碎了，这种问题跑过第 2 章的人 5 分钟能定位。

应用层开发者不一定全跑，但**第 3 章 attention + 第 7 章 instruction finetuning 这两章强烈建议刷一遍**。前者让你理解 context window 上限、KV cache 为什么吃显存，后者让你理解 system prompt 为什么权重高、few-shot 顺序为什么影响输出。这是 prompt engineering 真正的天花板。

至于"造一个比 Claude Code 更强的"，别。Anthropic 在 RLHF 数据、对齐、工具调用上的积累，远不是 15 小时课程能复刻的。Raschka 自己也说，从零搭 LLM 不是为替代 API，而是**理解你每天在用的东西到底是什么**。

## 行动建议

今晚就动手，分三步，
1. `git clone https://github.com/rasbt/LLMs-from-scratch`，按附录 A 装好 PyTorch + uv 环境，跑通第 1 章，约 30 分钟。
2. 周末连刷第 2、3、4 章，边跑边把每个 tensor 的 shape 注释在代码旁，3-4 小时搞定。
3. 下周每天一小时，刷完 5、6、7 章 + 附录 E。跑完后你能在 M3 Max 或 4090 上微调自己的 coding 模型。

配套阅读 Raschka 的 *Components of a Coding Agent*，再加 Karpathy 的 nanoGPT 做对照，三者通读，你对"一个 coding LLM 从训练到部署"的理解就接近一线团队水平了。

跑完整门课会让你对"AI 编程工具"祛魅。这未必是坏事，祛魅之后你才能做出有差异化的产品，而不是又一个套壳。

---

本文不涉及境外软件访问教程，所有实操步骤均基于国内可合法访问的服务。

<!-- REACH (xhs): 8/10 | 品牌✓ 利益点✓ 可操作✓ -->
