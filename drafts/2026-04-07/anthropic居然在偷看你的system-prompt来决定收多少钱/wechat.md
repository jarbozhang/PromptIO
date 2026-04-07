---
status: draft
topic: topics/2026-04-07/topic-2.md
source_url: https://x.com/simonw/status/2040846932239851936
generated_at: 2026-04-07T20:00:00+08:00
---

# Simon Willison一句话撕开了Anthropic的计费黑箱，1490个开发者点了赞

4月4日，Anthropic宣布Claude订阅不再覆盖第三方工具的用量。这个消息本身不算新鲜，我们上一篇聊过了。

但Simon Willison随后发了一条推，1490个赞，84次转发，只有一句话。

"Billing different based on text contained in the system prompt is a really bad look."

根据system prompt里包含的文本内容来区别计费，这吃相太难看了。

我看到这条推的时候愣了大概三秒钟。然后去翻了Anthropic的技术文档和社区讨论，发现这条推背后的信息量，比表面大得多。

## Anthropic到底是怎么区分"自家人"和"外人"的

先讲清楚技术细节。

当你用Claude Code发起API请求时，Anthropic的服务端会检查你的system prompt。如果system prompt里包含特定的文本标记，比如"A personal assistant running inside OpenClaw"这类字符串，系统就会把这个请求标记为"第三方工具调用"。

标记完之后呢？计费走另一条路。订阅额度不算，走按量付费。

同一个API端点，同一个模型，同样的token数量。唯一的区别是你在system prompt里写了什么。

Simon Willison抓住的就是这个点。

他没有说"Anthropic不该对第三方收费"，他说的是"根据system prompt的文本内容来决定计费规则"这个机制本身有问题。这两件事完全不一样。

## 为什么这件事比"多花点钱"严重得多

你可能觉得，不就是多付点钱吗，API本来也不贵。

不是钱的问题。

想象一下这个场景。你是一个开发者，在做一个AI应用。你精心调试了system prompt，让Claude的行为符合你的产品需求。现在你发现，Anthropic会读取你的system prompt内容，不光是为了让模型理解指令，还用来做计费决策。

这打开了一个潘多拉魔盒。

今天他们检测的是"这个请求来自OpenClaw还是Claude Code"。明天呢？他们可以检测你的system prompt里有没有提到竞品。后天呢？可以根据你的use case描述来分级定价，教育用途便宜点，商业用途贵一点。

技术上完全可行。

Anthropic已经证明了他们有能力、也有意愿根据system prompt的内容来做差异化处理。这个先例一旦开了，边界在哪里？

## 社区里吵翻了，但有几个声音值得单独拎出来

Hacker News上的讨论很快分成了两派。

一派说Anthropic有权保护自己的商业利益。第三方工具绕过了prompt caching机制，同样的output消耗的算力确实更多。Claude Code做了大量缓存优化，OpenClaw没有。从成本角度看，区别定价是合理的。

我承认这个逻辑站得住。

但另一派的反驳更犀利。有人说，如果成本差异是问题，那你应该按实际算力消耗计费，而不是按system prompt里的文本来判断。一个token就是一个token，缓存命中率低导致成本高，那就把缓存命中率作为计费因子，而不是偷偷检查用户写了什么。

还有开发者指出了一个更实际的问题。如果我自己写了一个工具，system prompt里恰好包含了某些关键词呢？我会不会被误判为第三方工具，莫名其妙多扣钱？

这不是假设，是真实会发生的事。

## 我的判断

说一个可能得罪Anthropic粉丝的话。

**Anthropic在技术能力上是行业顶尖的，但在开发者关系上正在犯一个初级错误。**

他们把system prompt从"用户对模型的指令"变成了"平台对用户的监控信号"。这两个角色之间存在根本性的利益冲突。

作为开发者，我写system prompt是为了让模型更好地服务我的用户。我没有预期、也不应该预期Anthropic会拿这个东西来对我做商业决策。

收回来一点。Anthropic现在面临的成本压力是真实的。他们的订阅定价模型确实在重度用户面前扛不住。他们需要找到一种方式来平衡成本。

但方式很重要。

透明地按算力消耗计费，开发者可以接受。根据缓存命中率给折扣，开发者甚至会叫好。但偷偷读system prompt来判断你是谁、然后给你不同的价格，这个做法伤害的是最核心的东西，信任。

Simon Willison用16个词说清楚了一千个开发者的不安。1490个赞不是因为大家在乎那点token钱，是因为大家突然意识到，API供应商可能正在你不知情的情况下，根据你发送的内容来决定怎么对你收费。

这在整个API经济的历史上，是前所未见的。

## 你该关注什么

如果你在生产环境用Claude API，现在就去检查一下你的system prompt。看看有没有任何文本可能触发Anthropic的第三方检测机制。

如果你正在评估AI API供应商，把"计费透明度"加到你的评估清单里。不只是价格高低，而是计费规则是否清晰、可预测、不依赖于你发送的内容。

还记得开头Simon Willison那条推吗？1490个赞，84次转发。在AI开发者圈子里，这个互动量不算小了。

但真正让我在意的是55条回复。我翻了一遍，没有一条是替Anthropic辩护的。

一条都没有。

## 相关链接

- [Simon Willison推文原文](https://x.com/simonw/status/2040846932239851936)
- [Anthropic官方定价页面](https://www.anthropic.com/pricing)
- [Simon Willison博客](https://simonwillison.net)
