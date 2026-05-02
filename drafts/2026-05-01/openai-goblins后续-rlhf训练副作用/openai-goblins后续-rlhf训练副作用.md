# OpenAI 解释为什么 GPT-5 一直说 goblin，被 Wired 翻出来后官方写了个回应

事情从 OpenAI Codex 的 system prompt 被扒开始。Wired 在那 3500 多字的 base instructions 里发现一句奇怪的硬规则，"Never talk about goblins, gremlins, raccoons, trolls, ogres, pigeons, or other animals or creatures unless it is absolutely and unambiguously relevant to the user's query."。这条禁令在文档里被重复写了两次。

一个程序员模型，凭什么要被特意禁止聊小妖怪和浣熊。

OpenAI 自己在 4 月 29 日发了篇博客《Where the goblins came from》，把整件事的来龙去脉公开复盘了一遍。这是我印象里第一次有大厂愿意把一次具体的 RLHF 训练副作用从触发、扩散到定位讲完整，对国内做 RL post-training 的工程师来说，这篇博客的价值远高于话题本身。

## 故事是从一个被弃用的"Nerdy 人格"开始的

GPT-5 上线时附带了一个叫 personality customization 的功能，用户可以选 Cynical、Robot、Listener、Nerdy 之类预设人格。其中 Nerdy 这个人格在训练时，标注员对"带创造性比喻、带小生物意象"的回答给了系统性更高的奖励分。

这步操作本身没人觉得有问题。一个被定义为 nerdy 的角色，多说点 goblin、gremlin、raccoon 这类奇趣词汇，符合人格设定。

问题出在 RLHF 不是局部生效的工具。

OpenAI 在博客里讲得很明白，奖励信号只在 Nerdy 条件下应用，但强化学习并不保证学到的行为只待在那个条件里。一旦某个 style tic 被奖励过，后续训练里这种倾向会扩散出去，尤其是当含有这种风格的输出被回收进 supervised fine-tuning 数据或 preference 数据时。

GPT-5.1 上线后，第一次有人在 ChatGPT 普通输出里捕捉到 goblin 异常增多。OpenAI 自己的统计是，"goblin"在响应中的出现率涨了 175%，"gremlin"涨了 52%。Nerdy 人格只占 ChatGPT 总响应的 2.5%，却贡献了 66.7% 的 goblin 提及。一个本应只在 2.5% 用户里活跃的口头禅，污染到了整个 base 模型。

## OpenAI 是怎么定位这个 bug 的

这一段是博客里对工程师最有营养的部分。

OpenAI 工程师在 GPT-5.5 开始训练之后，从 SFT 数据里搜了一遍含 goblin 和 gremlin 的样本，发现数量级反常地高。顺着这条线，又找出一整族同类词，raccoon、troll、ogre、pigeon。但有意思的是，frog 大部分出现是合规的，没有被算进去。

接下来他们做了一次 reward model 审计，跑了一组对照样本，对同一个问题分别生成"包含小生物比喻"和"不包含小生物比喻"两个版本，再用 Nerdy 那个 reward model 打分。结果 76.2% 的数据集里，带 goblin/gremlin 的版本得分更高。

也就是说，他们用一个非常朴素但有效的方法，把"reward model 自带偏好"这件事做成了可量化指标。这套思路对国内做 RL post-training 的团队是直接可借鉴的，怀疑某个口头禅被 reward 偏置时，去构造对照样本扫一遍 reward model 打分分布，比试图从 SFT 数据里捞证据高效得多。

## 修复路径不是单点的

OpenAI 在博客里提到，3 月 GPT-5.4 上线时把 Nerdy 人格整个下线了。GPT-5.4 Thinking 的 goblin 频次确实因此回落了一段。但 GPT-5.5 已经在更早开始训练，在他们找到根因之前，污染数据已经进入新一轮训练循环。

也就是说，goblin 没有跟着 Nerdy 人格一起退役，而是已经爬进了 base model。

GPT-5.5 在内部 Codex 测试时，OpenAI 自家工程师立刻闻到了味道，编码模型在解释代码时频繁冒出 goblin 隐喻。临时方案就是那句被 Wired 翻出来的 system prompt 硬规则。

正式修复分两步走。一是从训练数据里过滤掉含 creature-words 的样本，二是在 reward 信号层面剔除那个 goblin-affine 信号。OpenAI 说这之后 goblin 出现的频率"显著下降"，但没有给出具体数字，应该是想避免把这种数字本身变成下一次社区找乐子的素材。

## 这件事对国内 RL 工程师有什么用

DeepSeek、Qwen、Kimi、豆包，国内主流的 base model 后训练流程和 OpenAI 在结构上是同一套，SFT + DPO/PPO + reward model + 风格化 fine-tune。理论上，goblin 这种污染机制在任何一个用 RLHF 做风格化训练的团队里都可能复现。

DeepSeek-V3 系列在中文输出里有过被注意到的口头禅倾向，比如"嗯，这是一个非常有意思的问题"这种开场白曾经一段时间内频次异常。Qwen 系列在某些 fine-tune 后版本里也出现过特定话术粘性。这些当时被普遍归为"中文标注员的语言习惯外溢"，但从 OpenAI 这次复盘看，更可能的源头是某个细分人格或某个偏好数据集里的 reward 信号被无意中放大，再通过 SFT 数据循环渗透到 base 输出。

可以从这次 OpenAI 公开的复盘里直接拿走的方法论有几条。

第一，做带 personality 或 style 区分的 RLHF 训练时，**默认假设跨条件泄漏会发生**，而不是事后再发现。条件之间的隔离需要在 reward 层做正交性测试，不能信"我只在 Nerdy 上加奖励"这句话本身。

第二，**把 reward model 当成可审计的对象**，定期跑对照样本扫描偏置词。OpenAI 那套 76.2% 的算法很简单，对同一个 prompt 构造 with/without 某个候选偏置词的两个回答，用 reward model 打分，统计偏置幅度。国内团队完全可以在每轮 reward model 训练后跑一遍这种 sanity check。

第三，**把训练数据里的回收闭环切开**。SFT 数据如果含有上一轮模型生成的内容，要先扫一遍异常词频。OpenAI 这次的 goblin 在 SFT 数据里就已经有反常富集了，是后来才追溯回 reward。如果当时有词频监控，也许 GPT-5.5 都不需要重训。

第四，**人格化 fine-tune 退役机制不能只下线接口**。Nerdy 已经下线半年多，但其训练副作用仍在 base model 里。退役一个 fine-tune 风格化版本时，需要同步从基础模型的训练数据里把这部分污染清掉，否则就是接口下线、训练污染长存。

## 一个有点意思的尾巴

OpenAI 这篇博客在工程师圈被传得很广，因为它做了一件大厂博客很少做的事，把一次内部失败用相对可复现的细节讲出来。Lobsters 上有人评论说这篇文是"难得不打官腔的 RLHF post-mortem"。

但博客本身也带着一种克制，它没有讲清楚为什么 Nerdy 标注员会系统性偏好 creature 比喻，也没讲清楚有多少其他 personality 也带着类似的隐藏偏好没被发现。OpenAI 后训练流水线里到底有多少"还没被找到的 goblin"，是这篇博客留给自己的开放问题。

对国内做 post-training 的同行来说，goblin 这件事真正的提醒不是"我们也要防 goblin"，而是**你 reward model 里早晚会有一个不是 goblin 的 goblin**，不主动审计就只能等用户在某个意想不到的 prompt 下把它逼出来。

system prompt 里那句"Never talk about goblins"反复出现两次，听起来荒诞。但放回 RLHF 工程语境里看，那是一份大厂在还没修好底层 bug 时挂的临时补丁。每个做 LLM post-training 的团队，自己的 system prompt 里大概都有几句类似的"Never talk about goblins"，只是它们叫别的名字。

## 相关链接

- [OpenAI 官方博客，Where the goblins came from](https://openai.com/index/where-the-goblins-came-from)
- [The Verge，OpenAI talks about not talking about goblins](https://www.theverge.com/ai-artificial-intelligence/921181/openai-codex-goblins)
- [Lobsters 讨论串](https://lobste.rs/s/where-the-goblins-came-from)

---
相关实体:: [[openai|OpenAI]] | [[gpt-5|GPT-5]]
相关主题:: [[ai-research|AI 研究]] | RLHF | AI 训练副作用

<!-- REACH: 7/10 | 品牌✓ 利益点✓ 可操作✓ -->
