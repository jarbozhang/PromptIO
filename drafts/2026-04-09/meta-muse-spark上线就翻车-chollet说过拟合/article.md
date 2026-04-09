# Meta 花了几十亿搞出 Muse Spark，结果上线第一天就被 Chollet 拆台了

昨天 Meta 正式发布了 Muse Spark，这是 Zuckerberg 砸重金成立超级智能实验室 (Meta Superintelligence Labs) 之后的第一个模型。消息一出来我还挺期待的，毕竟 Meta 之前的 Llama 系列确实给开源社区带来了不少好东西。

然后 Chollet 发了一条推，1300 多个赞，直接把我拉回现实。

他说这个模型"overoptimized for public benchmark numbers at the detriment of everything else"，对公开 benchmark 过度优化，其他方面全部牺牲掉了。更狠的是后半句，他说"知道怎么评估模型、让评估结果和实际有用性挂钩，是 AI 实验室的核心能力，任何新实验室如果连这个都没搞明白，是不可能成功的"。

这话说得很重。Chollet 可不是随便什么人，ARC-AGI benchmark 的创造者，在模型评估这件事上可能是全世界最有发言权的人之一。他不是说 Muse Spark 不够强，他是在说 Meta 的新团队连最基本的模型评估方法论都没搞对。

## 到底发生了什么

先说背景。Meta Superintelligence Labs 是 Zuckerberg 今年花了巨资组建的新部门，目标直指 AGI。Muse Spark 是这个部门交出的第一份答卷，定位是"purpose-built for Meta's products"，会逐步接入 WhatsApp、Instagram、Facebook、Messenger 还有 Meta 的智能眼镜。

坦率讲，这个定位本身没问题。但问题出在宣传上。

Ethan Mollick（沃顿商学院教授，AI 领域最有影响力的测评者之一）第一时间试了 Muse Spark，他的评价分两个阶段。

第一阶段，看 benchmark 数据，他说"seems like a good model"，看着还不错，但"still trailing the current series of releases"，跟当前第一梯队还有差距。

然后他实际上手玩了一会儿。

评价变了。他说"really doesn't match the current Big Three models"，跟 OpenAI、Anthropic、Google 三巨头的模型完全不在一个级别。更有意思的是他的描述，他用了"weird"这个词，说这个模型语言风格很奇怪，语气不对，而且"a little loose with facts"，事实准确性有点飘。

你想想看，benchmark 跑分看着还行，实际用起来却是这种感觉。这不就是 Chollet 说的过拟合问题吗？

## 还有一个更大的问题

Mollick 提到了一个很多人忽略的点，我觉得这可能才是最关键的。

Muse Spark 不开源。

不是开源权重 (open weights)。这意味着你没法下载、没法微调、没法本地部署。Meta 之前在 AI 领域的核心价值，就是靠 Llama 系列的开源策略打出来的。多少创业公司、多少研究者是靠 Llama 起步的？现在新的超级智能实验室第一个产品就把这条路堵死了。

Mollick 原话说得很直白，"That was the main reason that Meta's models were so important. Without that, it is a lot harder to predict the value of Spark"。开源是 Meta 模型重要的根本原因，没了这个，Spark 的价值很难说。

Simon Willison 倒是给了一些不同角度。他深挖了 meta.ai 聊天界面里的工具能力，发现有个 Code Interpreter 和一个叫"container.visual_grounding"的功能挺有意思。说明 Meta 在产品集成层面确实花了心思，不只是把模型套个壳。

## 社区里的多种声音

整理一下目前社区的反应，基本分三派。

看衰派以 Chollet 为代表，认为这是一个典型的"刷榜"模型。benchmark 数字好看但实际体验拉胯，说明团队的评估方法论有根本性问题。这不是调调参数就能解决的事。

务实派以 Mollick 为代表，承认这是个"还行"的模型，但在当前竞争格局下"还行"等于没用。前沿模型的竞争已经白热化了，一个"还行"的闭源模型，凭什么让开发者从 GPT-4o 或 Claude 切过来？

探索派以 Simon Willison 为代表，对模型本身不做太多评判，但对 Meta 在产品工具层面的整合能力表示了兴趣。某种程度上，如果 Muse Spark 的战场不是通用模型竞赛而是 Meta 产品生态内的体验优化，那评判标准可能完全不同。

## 我的判断

我认为 Muse Spark 暴露的问题比大多数人意识到的要严重。

这不是"第一个版本嘛，慢慢迭代就好了"的问题。Chollet 的批评指向的是方法论层面，一个新团队如果从第一天起就不知道怎么正确评估自己的模型，那后续的迭代方向也大概率是歪的。你在错误的地图上跑得再快，也到不了正确的目的地。

可能有人会说，Meta 有钱有人有算力，时间会解决一切。我不这么看。OpenAI、Anthropic、Google 在评估方法论上已经积累了好几年的 know-how，这种能力不是砸钱就能买到的。

不过话说回来，如果 Meta 的真实意图只是让 Muse Spark 在自家产品里跑得够用，那外部评测者用通用模型的标准去衡量它，本身可能就不太公平。但问题是 Meta 自己在宣传时可没这么谦虚。

说实话我也不确定 Meta 到底想走哪条路。是真要跟 OpenAI 正面刚通用智能，还是只想做个够用的产品内嵌模型？如果是后者，闭源完全说得通。如果是前者，那 Chollet 的诊断就是个不太好的信号。

反正我觉得，一个花了几十亿组建的超级智能实验室，第一个模型就收到"你连评估模型都不会"的评价，这事儿值得认真对待。

下次 Meta 发新模型的时候，别急着看 benchmark 排行榜了，直接上手试。Chollet 已经给我们上了一课，跑分和实际体验之间的鸿沟，可能比你想象的大得多。

## 相关链接

- [Chollet 原推](https://x.com/fchollet/status/2042004767585751284)
- [Ethan Mollick 评测推文 1](https://x.com/emollick/status/2041924282964394085)
- [Ethan Mollick 评测推文 2](https://x.com/emollick/status/2042040840554451286)
- [The Verge 报道](https://www.theverge.com/tech/908769/meta-muse-spark-ai-model-launch-rollout)
- [Simon Willison 深度体验](https://simonwillison.net/2026/Apr/8/muse-spark/#atom-everything)
- [Meta AI 官网](https://www.meta.ai)
