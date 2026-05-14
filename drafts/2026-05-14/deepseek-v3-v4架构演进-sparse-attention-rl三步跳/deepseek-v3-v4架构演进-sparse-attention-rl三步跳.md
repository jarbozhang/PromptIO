# DeepSeek V3 → V4 架构演进 sparse attention RL 三步跳

5 月 14 日，DeepSeek V4 Flash 上线 OpenRouter，刚好跟 Sebastian Raschka 那篇复盘 V3 → V3.2 的长文形成接力。前后串起来看，DeepSeek 这一年其实是踩着三个台阶往前走的，每一步都在解决前一步留下的瓶颈，attention、MoE、RL 各动一刀。

把这三步讲清楚比追新闻有意义。后面国产开源模型大概率都得沿着这条路再走一遍。

## 第一步，MLA 把 KV cache 从天花板上拽下来

V3 留下来的核心遗产是 Multi-head Latent Attention，简称 MLA。

标准 Multi-Head Attention 的 KV cache 是显存大户，长 context 下基本是死锁。MLA 的做法是在 KV 进 cache 之前先压到一个低维潜空间，需要计算 attention 的时候再投影回去。多了一次矩阵乘法，但显存占用大幅下降。训练阶段连 query 也一起压，推理阶段只对 KV 做压缩。

这一刀的代价是引入额外的投影矩阵，工程上复杂度上升。但收益是同样的硬件能塞下更长的序列，单卡推理成本立刻降一档。后来 MiniMax、Kimi 的几代模型都在同一思路上做变体，MLA 算是 2024 到 2025 这一年国产模型最有外溢效应的架构发明。

不过 MLA 解决的只是常数项。序列长度 L 一旦冲到几十万，attention 的 O(L²) 复杂度依然顶在那里。这就是 V3.2 要继续动刀的地方。

## 第二步，V3.2 的 sparse attention，从 O(L²) 跳到 O(Lk)

V3.2-Exp 9 月发布，12 月 1 日 V3.2 正式版上线。这一代的核心是 DeepSeek Sparse Attention，简称 DSA。

DSA 的设计很干净。每个 query 不再跟全部 L 个 token 做 attention，而是先经过一个"lightning indexer"打分，打分公式是 ReLU 后的 scaled dot product。

```
I(t,s) = Σ w(t,j) · ReLU(q(t,j) · k(s))
```

然后选 top-k 个分数最高的 token，k = 2048，其余 mask 掉。复杂度从 O(L²) 降到 O(L·k)，k 是常数。

这跟传统 sliding window 或 fixed-pattern sparse 的区别在于，DSA 选的是"内容相关"的 token，不是位置邻近的 token。理论上对长距离依赖更友好。Raschka 在原文里给出的关键观察是，sparse attention 这条路从 NSA（Native Sparse Attention，2 月那篇）到 DSA 之间有清晰的传承，DeepSeek 把它从研究 prototype 真正烧进了 production-grade 旗舰模型。

RL 这一层 V3.2 也同步换血。R1 时代用的是 GRPO 加 RLVR（数学和代码这种 verifiable reward），V3.2 改成混合方案，推理任务保留 rule-based outcome reward，通用任务换成 generative reward model。新引入的 DeepSeekMath-V2 数据集和 reward 方法是这一档的关键支撑。

到 V3.2 为止，DeepSeek 把架构和训练流程都各推进了一档。但 1M context 还没真正解决，1.6T 参数那个量级也还没出现。这两个都是 V4 来填。

## 第三步，V4 系列把数字推到 1M context 5GB KV cache

5 月 14 日 V4 Flash 上 OpenRouter 之前，V4 / V4-Pro 在 4 月 24 日已经先放了预览版。社区抓的几个关键数字是这样的。

V4-Pro 1.6T 总参数，49B 激活参数，MIT 协议。注意力机制在 DSA 基础上进一步分层，社区拆解里有两个新名字，Compressed Sparse Attention (CSA) 和 Heavily Compressed Attention (HCA)。CSA 把每 m 个 token 压成一个 KV 条目，然后对每个 query 选 top-k 个 block；HCA 走更狠的压缩比，每 m′ 个 token 压成一个条目，m′ 远大于 m。两个机制混用，长 context 下的 KV cache 占用进一步坍缩。

最直观的数据来自 r/LocalLLaMA 的讨论。1M context 下 V4-Pro 推理 FLOPs 只需要 V3.2 的 27%，KV cache 只需要 V3.2 的 10%。有人把这翻译成更接地气的版本，1M 上下文 KV cache 大概 5GB，旗舰单卡基本能跑长序列推理。这是过去一年 KV cache 工程优化的总账。

r/LocalLLaMA 里 dark-light92 那条 70 赞的评论说得直白，"The graph seems to indicate that they can fit 1M context in about 5GB. That's the biggest takeaway." KPaleiro 接了一句，问"engram 哪去了"，他原本期待在 V4 里看到那个更激进的新架构，估计是预览版还没放，留给定档版本。

V4 这一档还有个隐藏更新没引起太多关注。模型卡里专门列出"Agent capabilities: optimized for mainstream AI agent frameworks (ClaudeCode, Openclaw, and Opencode)"。第一次有顶级开源基础模型在发布说明里点名 agent framework，这是 RL post-training 的训练目标已经下沉到 tool use 这一层的信号。

## 把三步串起来

把这三档放一条时间线上看，演进路径其实非常清晰。

V3 解决"显存装不下 KV"。MLA 把 KV 压到潜空间，常数项降一档。 
V3.2 解决"L² 复杂度顶不住长序列"。DSA 加 lightning indexer + top-k 选择，复杂度从 O(L²) 降到 O(L·k)。RL 同步从 RLVR 换成混合 reward。 
V4 解决"1M context 工程化"。CSA + HCA 分层压缩，加上 agent-oriented RL post-training，1M token 推理 FLOPs 降到 27%，KV cache 降到 10%。

每一档都是上一档没解决的瓶颈。每一档都不是单点优化，而是 attention、MoE 调度、RL 训练流程同时动。这种系统性演进在闭源模型里很难看到，因为厂商不会披露细节。DeepSeek 把架构透明化做到这个程度，对国产开源生态的辐射效应大于任何 benchmark 排名。

Raschka 原文的最后一段判断也值得留下，他说从 V3 到 V3.2，"the actual interesting parts are the attention mechanism and the RL pipeline, not the parameter count"。V4 这一档把这句话又验证了一次。1.6T 听起来唬人，但拆开看，真正撑住 1M context 的是 DSA + CSA + HCA 这条 sparse attention 流水线，不是参数堆叠。

## 社区怎么看

r/machinelearningnews 的爆料贴 33 赞，关键评论集中在两个点。一个是 1M context 在 5GB 显存内的极限值，24GB 或 48GB 显存的本地推理路径开始变得现实。另一个是模型卡里 agent framework 的点名，被解读成 DeepSeek 正在向"通用基础模型 + agent runtime 解耦"的方向收敛。

r/deeplearning 那条技术深读贴里的描述更准确，DSA 的核心是 "token-wise compression mechanism"。这跟 V3.2 论文里描述的 attention-level sparsity 不完全是一回事，V4 在 token 维度上又加了一层压缩。社区还没有完整的官方论文，目前的拆解都基于模型卡和早期 inference 测试，确定的论文细节可能要等定档版。

r/LocalLLaMA 主帖 144 赞 88 评论，讨论最热的其实不是架构本身，是"home server 该不该花跟跑车一样的钱"。Mass2018 那条 30 赞评论原话，"My mortgage is $3500, my car payment is $1000, and my DGX H100 payment..."。本地跑旗舰开源模型的硬件门槛正在从"完全不可能"变成"中产玩家的奢侈消费"。1M context 5GB KV cache 这个数字让这个门槛又下降了一档。

## 给想动手的人

V4 Flash 已经在 OpenRouter 上线，国内通过 OpenRouter 调用就能用，不需要任何境外环境。V3.2 在 DeepSeek 官方 API 和各家国内云平台都铺开了。

想理解 sparse attention 的工程细节，先读 NSA 论文（2 月那篇 Native Sparse Attention），再读 V3.2 技术报告。NSA 是研究原型，V3.2 是 production 化，对照读能看到一个 idea 从论文到旗舰模型的真实路径。

如果手上有 24GB 以上显存的本地机器，V3.2 的量化版可以跑起来试 DSA 的实际效果。V4 系列的本地推理目前还得等 vLLM 和 llama.cpp 适配，估计 5 月底到 6 月会铺开。

## 相关链接

- Sebastian Raschka 原文 https://magazine.sebastianraschka.com/p/technical-deepseek
- DeepSeek V4 Reddit 拆解 https://www.reddit.com/r/machinelearningnews/comments/1sumsja/
- r/LocalLLaMA 讨论串 https://www.reddit.com/r/LocalLLaMA/comments/1subuve/
- DSA 技术深读 https://www.reddit.com/r/deeplearning/comments/1sv0obo/

---
相关实体:: [[deepseek|DeepSeek]] | [[sebastian-raschka|Sebastian Raschka]]
相关主题:: [[llm-architecture|LLM 架构]] | [[chinese-ai|国产 AI]]

<!-- REACH: 7/10 | 品牌✓ 利益点✓ 可操作✓ -->
