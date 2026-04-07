---
title: "Anthropic居然在偷看你的system prompt来决定收多少钱"
source_url: 'https://x.com/simonw/status/2040846932239851936'
score: 9.2
scoring_reason: Anthropic按system prompt内容差异计费
status: draft
platform: wechat
tags:
  - Anthropic
  - Claude
  - 计费策略
  - 开发者信任
created_at: '2026-04-07'
generated_by: claude-opus-4-6
---

现在我有了足够的背景信息。让我用搜集到的素材写这篇文章。

# Anthropic居然在偷看你的system prompt来决定收多少钱

Simon Willison上周发了一条推，1490个赞，内容只有一句话，但炸了整个开发者社区。

"Billing different based on text contained in the system prompt is a really bad look."

我第一次看到这条的时候愣了几秒。不是因为Anthropic限制第三方工具使用，这事儿4月4号就官宣了，我心理准备早就有了。让我愣住的是那个细节，Anthropic的计费系统会去读你system prompt里的具体文本，如果检测到你用的是OpenClaw或者其他第三方harness的特征字符串，就给你切到更贵的计费通道。

不是按token数，不是按请求频率，是按你prompt里写了什么字。

## 事情的来龙去脉

4月4号，Anthropic给Claude Code订阅用户群发邮件，大意是说你的订阅额度以后不能用在OpenClaw这类第三方工具上了，想用就得走按量付费，单独计费。

官方理由是"our subscriptions weren't built for the usage patterns of these third-party tools"。说白了就是13万5千多个OpenClaw实例把Anthropic的算力池子快薅秃了，有些重度用户实际消耗的算力是订阅费的50倍。

到这一步我还觉得合理。你Anthropic的订阅，你定规则，没毛病。

Boris Cherny（Claude Code负责人）也出来解释了，说Claude Code做了大量prompt cache优化，第三方工具没有这些优化，同样的活儿消耗的算力更多。这也讲得通。

但问题出在执行层面。

## 技术细节才是真正让人不舒服的地方

有开发者做了实验。用`claude -p --append-system-prompt`传一段包含OpenClaw标识的system prompt，直接触发Extra Usage计费。同样的prompt结构，把OpenClaw的标识去掉，走同一个认证通道，不触发。

更离谱的是，用Anthropic API key直接调用SDK，哪怕system prompt里写满了OpenClaw，也不会触发这个计费门槛。

HN上甚至有人发了一个帖子，标题就是"Anthropic has a blacklist on the word OpenClaw"。

你品品这个逻辑。同一个模型，同一个用户，同一段prompt，就因为里面包含了某个特定词汇，计费方式完全不同。

这不是限制第三方接入的问题了。这是内容审查式的计费。

## Simon Willison为什么突然翻脸

Simon一开始其实是接受Anthropic说法的。"我们优化了自家产品的缓存效率，第三方工具没优化所以成本更高"，逻辑上成立，商业上合理。

但当他发现实际的执行机制是扫描system prompt文本来决定计费等级的时候，态度180度转弯。

这两件事的区别很大。

"因为你的调用模式效率低所以收你更多钱"，这是合理的成本传导。"因为你的prompt里写了OpenClaw这个词所以收你更多钱"，这是文本歧视。

坦率讲我完全理解Simon的反应。今天你可以根据prompt里有没有"OpenClaw"来差异计费，明天你是不是可以根据prompt里有没有"竞品对比"来差异化服务？后天呢？

OpenClaw创始人Peter Steinberger说了一句更扎心的，"first they copy some popular features into their closed harness, then they lock out open source"。先抄你的功能，再封杀你。

这个剧本是不是有点眼熟？

## 我的判断

我认为Anthropic限制第三方harness薅订阅额度这件事本身没有任何问题。你的平台你的规则，13万个实例50倍超额使用，换谁都扛不住。

但执行方式选错了。

按system prompt文本内容来区分计费，这是一个极其危险的先例。它意味着模型提供商开始把system prompt当作一个可以窥探、分析、并据此做商业决策的对象。

system prompt是开发者和模型之间的契约空间。你可以限制它的长度，可以限制它的token数，可以按量收费，但你不应该去读它的内容然后据此差异化定价。

说实话我也不确定Anthropic有没有更好的技术方案。也许可以按实际cache命中率来差异化计费？cache命中率低的请求自动走更高的价格，不管你system prompt里写了啥。这既解决了成本问题，又不用碰prompt内容。

可能有些想法还不成熟，但至少方向应该是按行为计费，而不是按内容计费。

## 这件事对你意味着什么

如果你在用Anthropic API做产品，目前API key直连不受影响。但你应该开始认真想一个问题。

你的system prompt里有什么？如果有一天API层面也开始按prompt内容差异化定价，你准备好了吗？

Simon在那条推下面还说了一句话，我觉得特别值得记住。

大意是当一家公司开始根据你说了什么来决定收你多少钱，信任关系就已经破裂了。不管它的理由多充分。

回到开头那1490个赞。开发者社区的情绪不是在抱怨涨价，而是在抗议一种新的权力边界被突破。你的prompt内容，本不该是别人的计费依据。

---

相关链接

- [Simon Willison 原推](https://x.com/simonw/status/2040846932239851936)
- [HN讨论: Anthropic不再允许订阅用户使用OpenClaw](https://news.ycombinator.com/item?id=47633396)
- [HN讨论: Anthropic对OpenClaw一词设黑名单](https://news.ycombinator.com/item?id=47656695)
- [TechCrunch报道: Claude Code订阅者需为OpenClaw额外付费](https://techcrunch.com/2026/04/04/anthropic-says-claude-code-subscribers-will-need-to-pay-extra-for-openclaw-support/)
- [OpenClaw官方文档 Anthropic接入说明](https://docs.openclaw.ai/providers/anthropic)
- [The Register报道](https://www.theregister.com/2026/04/06/anthropic_closes_door_on_subscription/)
