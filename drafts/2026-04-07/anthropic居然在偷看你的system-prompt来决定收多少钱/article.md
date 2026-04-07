---
title: "Anthropic居然在偷看你的system prompt来决定收多少钱"
status: draft
source_url: "https://x.com/simonw/status/2040846932239851936"
topic_file: "topics/2026-04-07/topic-2.md"
date: "2026-04-07"
---

# Anthropic居然在偷看你的system prompt来决定收多少钱

Simon Willison 发了一条推文，拿了1490个赞。内容只有一句话，"根据 system prompt 里的文本内容来区别计费，这吃相很难看。"

这条推文之所以炸了锅，是因为它揭露了一个让开发者非常不舒服的事实，Anthropic 正在通过精确匹配 system prompt 中的特定字符串来决定是否对你额外收费。

具体来说，如果你是 Claude Code 的订阅用户，你的 system prompt 里包含了 "OpenClaw" 这个字符串，你就需要额外付费。The Verge 的报道标题更直白，"Anthropic 通过让订阅用户额外付费来实质上封杀 OpenClaw"。

## 到底发生了什么

事情的起因是 OpenClaw 这个第三方工具。它允许用户通过 Claude Code 的订阅来调用 Claude API，绕过了 Anthropic 的 API 定价体系。Anthropic 认为这是在薅羊毛，于是出手了。

但 Anthropic 选择的技术手段很耐人寻味。他们没有封禁 IP，没有检测调用模式，而是直接去读你的 system prompt 内容，看里面有没有特定的字符串。

Simon Willison 在后续推文中确认了一个更离谱的细节，只有完全精确匹配那个字符串才会触发这个机制。改一个字母就不会被拦截。这说明 Anthropic 的实现非常粗暴，就是在计费层做了一个字符串匹配的 if 判断。

## 社区里吵翻了

英文开发者社区围绕这件事分成了几派。

第一派认为 Anthropic 完全有权这么做。OpenClaw 本质上是在利用订阅价格和 API 价格之间的差价套利，Anthropic 堵上这个漏洞天经地义。订阅是给个人用的，不是给你拿来当 API 中转站的。

第二派是 Simon Willison 代表的立场。他在推文中说，"当 Anthropic 说 Claude Max 计划只面向自家工具时，我买了他们'我们的工具做了成本优化'这个说法。但是通过过滤 system prompt 来实现，这就过线了。"这派人不反对 Anthropic 保护利益，但认为这个手段暴露了一个危险的先例，平台方可以随时根据你 prompt 的内容来决定给你什么样的服务。

第三派更务实。Simon 自己也半开玩笑地说，"好的一面是，既然是精确字符串匹配，我至少不用担心我在正常使用 Claude Code 时偶尔提到 OpenClaw 这个词就被莫名其妙地限制了。"

还有一派直接指出了技术层面的荒谬，精确字符串匹配意味着 OpenClaw 只要改一下自己 system prompt 里的标识符，这个封锁就完全失效了。Anthropic 这招更像是在发一个政治信号，而不是在做真正的技术封堵。

## 我的判断

我认为 Anthropic 封堵 OpenClaw 这个行为本身没问题，但他们选择了一种最蠢的方式来做这件事。

读取 system prompt 内容来做计费决策，这开了一个非常糟糕的先例。今天是匹配 OpenClaw，明天是不是可以匹配竞品的名字？后天是不是可以根据你 prompt 里的业务逻辑来判断你是个人用户还是企业用户，然后差别定价？

这个操作真正伤害的是信任。开发者把 system prompt 当成自己应用的核心逻辑，它应该是一个黑盒输入，平台只负责处理，不应该基于内容做歧视性的商业决策。

更让我觉得讽刺的是实现方式。精确字符串匹配，这种大一学生写的 if-else 逻辑，出现在一家号称要构建最安全AI的公司的计费系统里。如果你要做，至少做得专业一点。

Anthropic 应该直接在 API 层面做速率限制或者用量封顶，而不是去偷看用户的 prompt。这就好比你的云服务商根据你服务器上跑的代码内容来决定收你多少钱，任何一个工程师听到这个都会觉得不对劲。

## 这件事的后续值得关注

如果你是 Claude API 的开发者，现在需要意识到一件事，你的 system prompt 不仅仅是给模型看的，平台方也在看，而且可能基于内容做商业决策。

如果你是 Claude Code 的付费用户，短期内不用太担心。精确匹配意味着正常使用不会被误伤。

但长期来看，这件事值得整个行业警惕。当 AI 平台开始根据 prompt 内容做差别对待时，我们需要讨论的就不只是定价策略了，而是平台的中立性问题。OpenClaw 可能确实在钻漏洞，但 Anthropic 选择的应对方式，比漏洞本身更值得担忧。

## 相关链接

- Simon Willison 原始推文: https://x.com/simonw/status/2040846932239851936
- The Verge 报道: https://www.theverge.com/news/anthropic-openclaw-claude-code-ban
- TechCrunch 报道: https://techcrunch.com/tag/anthropic/
