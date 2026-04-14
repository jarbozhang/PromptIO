昨天 Meta 搞了个大新闻，发布了重组 AI 部门后的第一个模型 Muse Spark。扎克伯格砸了几十亿美元搞出来的"Meta 超级智能实验室"，交出的第一份答卷。结果上线还没到 24 小时，ARC-AGI 测试的创始人 François Chollet 就发了条推，直接给判了"令人失望"。

1353 个赞，71 次转发。社区的态度很明确。

Chollet 的原话是这样的，Muse Spark "对公开 benchmark 数字过度优化，其他方面全面牺牲"。他还补了一刀，说"知道怎么评估模型、让评估结果和实际有用性挂钩，这是 AI 实验室的核心能力，任何新实验室如果不先搞明白这一点，不太可能成功。"

这话有多狠呢？他没说模型不行，他说的是 Meta 的 AI 团队连"怎么评估自己的模型"都没搞对。

## Benchmark 过拟合，老问题了

坦率讲，Chollet 说的这个问题在业内已经是公开的秘密了。模型在公开 benchmark 上刷高分，拿出去一用就拉胯，这种事过去两年发生了太多次。但从 ARC-AGI 测试的创始人嘴里说出来，分量完全不一样。

ARC-AGI 这个测试之所以被业内重视，就是因为它专门设计来防止过拟合。Chollet 等于是用自己最擅长的领域告诉大家，Meta 连这个最基本的坑都没绕过去。

## 不止 Chollet 一个人不看好

沃顿商学院的 Ethan Mollick 也上手试了。他的评价更细致，但结论差不多。

第一条推说的是，"看起来是个还行的模型，但还是落后于当前这一轮发布的产品。" 然后他点了一个关键问题，Muse Spark 不是开源权重。

这一点我认为是整件事里最被低估的信号。

你想想看，过去 Meta 在 AI 领域的存在感靠什么？靠 LLaMA 系列的开源。整个开源 AI 生态有一大半是建立在 Meta 模型上的。现在 Muse Spark 突然走闭源路线，Mollick 的判断是，"没有开源权重，很难预测 Spark 的价值在哪里。"

后来 Mollick 又发了一条，说亲自玩了一圈之后感觉"还行，但真的不匹配当前三巨头的水平。" 还提到模型有点"怪"，语言和语气有些奇怪，事实准确性也有点松。

"有点怪"这个评价，说真的比"不行"还让人担心。"不行"可以优化，"怪"说明底层训练就有问题。

## 社区里的多种声音

也不是所有人都在唱衰。Simon Willison 深入研究了 meta.ai 聊天界面里的工具，发现了一些有意思的东西，包括 Code Interpreter 和一个叫"container.visual_grounding"的功能。作为一个基础设施层面的产品，Muse Spark 塞进 WhatsApp、Instagram、Facebook、Messenger 和 Meta 眼镜里，覆盖几十亿用户，这本身就是其他 AI 公司做不到的分发能力。

The Verge 的报道也提到，Meta 把 Muse Spark 定位为"为 Meta 产品量身定制"的模型，走的是 Google Gemini 深度集成自家产品的路线。

所以这里有一个很有意思的分裂，做模型的人觉得它不行，做产品的人觉得它够用了。

## 我的判断

我认为 Meta 这次犯了一个战略性错误。

不是说 Muse Spark 本身有多差。一个"还行"的模型塞进十几亿人的社交产品里，商业上完全说得通。但 Meta 在 AI 领域最大的护城河从来不是产品分发，而是开源生态带来的开发者心智。

LLaMA 系列让无数开发者、创业公司、研究机构都在 Meta 的模型上构建东西。这种生态位一旦让出去，再拿回来就难了。现在 Muse Spark 走闭源，等于主动放弃了这个优势，去跟 OpenAI 和 Google 在闭源赛道上硬拼。

可能有些想法还不成熟，但我是真的觉得，Meta 如果把那几十亿花在做一个碾压级的开源模型上，对整个行业和对 Meta 自己的价值都会大得多。

而 Chollet 指出的 benchmark 过拟合问题，说明这个团队在方法论上还没有找到北。你可以容忍一个模型暂时不如竞品，但你不能容忍团队连"怎么衡量自己模型好不好"都没搞明白。

这是最让人不安的地方。

## 接下来看什么

如果你想自己判断 Muse Spark 到底怎么样，现在可以直接去 meta.ai 上试。不需要等，美国地区已经上线了。

但我更建议关注的是，Meta 接下来会不会放出开源版本。如果 Muse Spark 最终还是走了开源路线，那今天的争议只是一个新产品线的正常起步噪音。如果始终闭源，那 Meta 在 AI 领域的角色就要被彻底重新定义了。

一个花了几十亿建起来的 AI 实验室，第一天就被自己最该避开的坑绊了一跤。后面的路怎么走，比这个模型本身更值得盯着看。

## 相关链接

- Chollet 的评价推文 https://x.com/fchollet/status/2042004767585751284
- Ethan Mollick 的测试反馈 https://x.com/emollick/status/2042040840554451286
- The Verge 报道 https://www.theverge.com/tech/908769/meta-muse-spark-ai-model-launch-rollout
- Simon Willison 的深入分析 https://simonwillison.net/2026/Apr/8/muse-spark/
- Meta AI 聊天界面 https://meta.ai

---
相关实体:: [[meta|Meta]] | [[chollet|François Chollet]] | [[emollick|Ethan Mollick]] | [[simon-willison|Simon Willison]]
相关主题:: [[agent-frameworks|Agent框架]]

<!-- REACH: 7/10 | 品牌✓ 利益点✗ 可操作✓ -->
