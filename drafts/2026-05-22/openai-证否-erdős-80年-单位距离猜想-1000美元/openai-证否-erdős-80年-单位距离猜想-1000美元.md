# OpenAI 新模型证否 80 年 Erdős 单位距离猜想 算力成本不到 1000 美元

Erdős 在 1946 年提了一个问题，全世界数学家追了 80 年没人能给出比"方格网"更好的构造。这一周，OpenAI 拿出一个通用推理模型，跑了不到 32 小时，烧掉的算力按 API 价格估算不到 1000 美元，吐出大约 125 页推理过程，把这个猜想直接证否了。

Noga Alon、Melanie Wood、Thomas Bloom 三位活跃在第一线的数学家公开背书，承认这次的构造是真的、是新的、不在已有文献里。

这不是一台为数学定制的系统，是一个被当作通用 reasoning model 来用的模型。

## 单位距离问题到底在问什么

平面上撒 n 个点。任意两个点之间如果距离恰好等于 1，就连一条边。问，最多能连出多少条这样的"单位距离边"？

Erdős 1946 年给了一个下界构造，方法很直观，把点放在一个 √n × √n 的整数方格上，然后调整一下单位。算出来的下界大约是 n × exp(c·log n / log log n) 这种级别。80 年里，这个下界没人能改进。

更关键的是，几代数学家普遍相信，最优构造长得"应该就是方格"那样。教科书里讲到这个问题，都会说"目前最佳下界由 Erdős 的格点构造给出"。

OpenAI 这次的模型，找出来一个完全不基于方格的构造。它的渐近行为比方格构造更好。你想想看，过去 80 年大家以为是天花板的东西，其实只是地板。

这就是为什么 Timothy Gowers 在评论里说，这是"第一个真正清晰的、AI 解决了一道知名公开数学问题的例子"。

## 这个模型是怎么解出来的

外界推测用的是 GPT 5.6 一类的通用推理模型，OpenAI 没把它当成"数学专用引擎"来定位。

它的工作方式更接近一个有耐心的研究生，给定问题描述，自己设计搜索空间，自己写候选构造，自己验证，自己写下一轮的优化方向。125 页的推理记录里能看到这种来回。

这一点跟 DeepMind 走的路子明显不同。AlphaGeometry、AlphaProof 都是把 LLM 当作策略生成器，搭配 Lean 这种形式化证明器做 ground truth 验证，说到底是定制系统。这次 OpenAI 用的是裸模型加长链推理，没有外挂证明器。

代价是结果是"disproof"，不是"proof"。

证否一个存在性陈述只需要一个反例。OpenAI 自己也坦率讲了，如果是反过来证一个新定理，含金量会更高。但即便如此，构造出一个 80 年没人想到的新族构造，已经是一个 qualitatively beyond 之前 olympiad 级别的成绩。

Noga Alon 把它定性为"一个真正的数学发现"。Thomas Bloom 把它收进了他维护的 Erdős Problems 数据库，并且更新了状态。

## 1000 美元这个数字为什么是关键

讲这件事的时候很多人会先盯着"通用模型也能做数学"。我觉得算力价签这一栏更值得拿出来单独说。

1000 美元和 32 小时这两个数字摆在一起，意思是，今天一个独立研究者，用 OpenAI 公开 API，理论上有能力复现一次同等量级的尝试。

不是 100 万美元的 TPU 集群，不是只有 DeepMind 内部能跑的私有 infra。是一个数学博士生，自己掏腰包，跑一次。

这跟当年 AlphaFold 出来时是两种感觉。AlphaFold 让蛋白质结构预测变成了一个 API 调用，但训练它的成本和 infra 是封闭的。这次 OpenAI 这个用法，更像是把"做开放性数学研究"本身变成了一种可购买的算力商品。

七个月前，Kevin Weil 在 X 上吹过一次"GPT-5 解决了 10 个未解 Erdős 问题"，被 Thomas Bloom 当场打脸，说那些"解"早就在已有文献里。这次三位数学家亲自背书，是这场叙事的转折。AI 做数学的可信度，从 demo 阶段走到了"成果可入库"阶段。

## 国内的 AI for science 该接什么招

国内目前公开的"数学专项"工作，大多还停留在 olympiad benchmark 上刷分。DeepSeek 在 GRPO 训练后数学题刷过高分，智谱、通义都做过 IMO 风格的小专项。但这些工作的指向是"模型能不能解题"，不是"模型能不能做研究"。

这次 OpenAI 这一刀划下来，赛道其实变了。

下一个值得做的事情，是把通用大模型当作 research assistant 去验证，不是再去刷 MATH 或者 AIME 的分数。具体方向我看到三个值得跟的口子。

一个是开源社区把这次 OpenAI 的推理记录拆解，复现一遍构造的搜索过程，看是不是用 DeepSeek V3.5、Qwen3-Max 这种国产开源模型也能在 1000 美元预算内复现出来。如果能复现，国产模型在长链推理上就有了一个非常硬的对外品牌点。

第二个是国内高校的应用数学组，挑一个自己领域里"中等开放度"的猜想，用通用模型跑一遍。不是 Erdős 这种级别的，是那种"几十年没人专门追但应该有反例"的问题。这种实验做出来一两个就足够发期刊。

第三个是 Lean / Mathlib 中文社区，可以开始组织把这类 LLM 找到的构造翻译成形式化证明。OpenAI 这次没用 Lean，但把"非形式化的 reasoning trace"翻译成"形式化的 Lean 证明"，本身就是一个非常清晰的、可以做出来的开源工程。

## 你现在可以做的事

如果只是想看热闹，OpenAI 官方 blog 那一篇值得读，链接在下面。Thomas Bloom 维护的 Erdős Problems 网站也更新了，可以看权威记录。

如果你是做 AI for math、AI for science 方向的工程师或研究者，重点是去找那 125 页的推理记录。能不能拆出可复用的"构造搜索 prompt 套路"，比看新闻有价值得多。

如果你是国产模型团队的产品或者 RL 工程师，问题就更具体，你们的模型在 32 小时 long-horizon reasoning 这个轴上，离 GPT 5.6 还有多远，差在哪一步。这个差距如果不去量，半年后会变成一道护城河。

80 年的天花板这一周被掀掉了。下一次掀掉的会不会是中国团队？

## 相关链接

- OpenAI 官方 blog，https://openai.com/index/model-disproves-discrete-geometry-conjecture
- TechCrunch 报道，https://techcrunch.com/2026/05/20/openai-claims-it-solved-an-80-year-old-math-problem-for-real-this-time/
- Latent Space AINews 当日整理，https://www.latent.space/p/ainews-openai-gpt-next-disproves
- Thomas Bloom 的 Erdős Problems 数据库，https://www.erdosproblems.com

---
相关实体:: [[openai|OpenAI]] | [[erdős|Erdős]]
相关主题:: [[ai-for-science|AI for Science]] | [[ai-research|AI 研究]] | [[ai-pricing|AI 定价]]

<!-- REACH: 9/10 | 品牌✓ 利益点✓ 可操作✓ -->
