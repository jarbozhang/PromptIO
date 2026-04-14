---
title: Anthropic封杀OpenClaw：200刀月费的用户，被当成了二等公民
source_url: >-
  https://www.theverge.com/ai-artificial-intelligence/907074/anthropic-openclaw-claude-subscription-ban
score: 7.5
scoring_reason: Anthropic封杀OpenClaw事件全梳理，对依赖Claude生态的开发者有直接影响
status: draft
platform: wechat
tags:
  - Anthropic
  - OpenClaw
  - 开发者生态
  - 平台策略
created_at: '2026-04-06T06:30:00.000Z'
generated_by: claude-opus-4-6
title_score: 8.5
title_alternatives:
  - title: Anthropic封杀OpenClaw：200刀月费的用户，被当成了二等公民
    score: 8.5
  - title: 付了200刀月费，Anthropic告诉我不能用第三方工具了
    score: 8.2
  - title: Anthropic禁用OpenClaw背后的真实算盘，不是技术问题是商业问题
    score: 7.8
gold_quote: 你以为你买的是算力，其实你买的是使用许可。
summary: 4月4日，Anthropic突然宣布Claude Code订阅用户不能再用OpenClaw等第三方工具消耗订阅额度。200刀月费的用户被告知"这些工具给我们系统造成了过大压力"。但社区很快指出，Claude Code自己的循环和自动化Agent同样吃额度，为什么只封第三方？答案可能不是技术问题。
---
# Anthropic封杀OpenClaw：200刀月费的用户，被当成了二等公民

4月4日下午3点，我收到了Anthropic的一封邮件。

内容很客气，但意思很不客气：从今天起，你的Claude Code订阅额度不能再用来跑OpenClaw了。想继续用？单独付费，按token计价。

我盯着这封邮件看了好几遍，确认自己没有理解错。

我每月付200美金的订阅费。现在你告诉我，我不能用我花钱买的额度跑我选择的工具？

## 事情的经过

先把时间线理清楚。

OpenClaw是目前最火的开源AI助手框架，GitHub上35万星。它可以接入各种大模型的API来工作，很多开发者选择用Claude的API来驱动它——因为Claude在编码任务上确实是最强的。

问题是，OpenClaw的使用模式和Claude Code不一样。它更"激进"——会频繁发起大量API调用，上下文窗口拉得很满。这意味着，同样一个订阅额度，跑OpenClaw消耗的速度远比用Claude Code原生功能快得多。

Anthropic的邮件里是这么说的："这些工具给我们的系统造成了过大的压力。算力是我们需要谨慎管理的资源，我们必须优先保障使用核心产品的用户。"

翻译成人话：你们用第三方工具把我们的额度薅得太快了，我们扛不住了。

作为补偿，Anthropic给了一个月订阅费等值的一次性积分，4月17日前可以兑换，外加预购token包的折扣。

## 社区炸了，但不是因为你想的原因

我原以为开发者会因为"又要多花钱"而愤怒。但翻了一圈Hacker News和Reddit的讨论，发现大家真正愤怒的点比这深刻得多。

核心质疑只有一个：**为什么只封第三方工具？**

Claude Code自己就有循环功能和自动化Agent。你可以让Claude Code在一个loop里不停地读文件、改代码、跑测试，一样能在半小时内把日额度干光。这个消耗模式和OpenClaw没有本质区别。

但Anthropic没有限制Claude Code原生功能的使用，只限制了第三方工具。

这就很耐人寻味了。

如果真的是"系统压力"问题，那应该限制总用量，而不是限制用量的来源。一个token就是一个token，不管它是从Claude Code发出去的还是从OpenClaw发出去的，对服务器的压力完全一样。

**这不是技术问题。这是商业问题。**

Anthropic的真实算盘可能是这样的：他们不希望自己变成一个纯粹的"算力供应商"，被第三方工具当成水管一样使用。他们希望开发者留在自己的生态里——用Claude Code，用Claude Desktop，用他们自己的产品。

这个逻辑我能理解，但手段让我不舒服。

## 一个会得罪人的判断

我说一句可能让Anthropic粉不高兴的话：**订阅制的本质是信任契约。Anthropic单方面修改这个契约的条款，伤害的是整个生态的信任基础。**

你花200美金买了一个月的使用额度。在购买的时候，没有任何条款说"只能用我们指定的工具"。现在用了几个月之后，突然告诉你规则变了。

这就像你办了一张健身房年卡，三个月后健身房告诉你：跑步机只能用我们自带的计步App，你用第三方App要另外收费。理由是"第三方App给我们的WiFi造成了压力"。

你信吗？

当然，Anthropic有权调整定价策略。他们的服务器，他们的成本，他们说了算。但从开发者的角度看，这种"先圈人后改规则"的做法，会让人对未来的任何承诺都打个问号。

收回来一点：Anthropic至少给了一次性补偿和过渡期，比某些直接砍功能的公司要体面。但问题不在补偿多少，在于这种单方面改规则的先例一旦开了，下次可能就是限制其他工具、或者直接缩减订阅额度了。

## 社区里几个值得关注的讨论

围绕这件事的讨论已经超越了Anthropic本身，上升到了一个更根本的问题：**AI公司的订阅模式到底在卖什么？**

传统SaaS的订阅模式很清楚——你付月费，获得功能和服务。但AI公司的订阅模式本质上是在卖算力，而算力的边际成本不是零。这意味着用得越多的用户，AI公司越亏钱。

Anthropic在邮件里自己说了："算力是我们需要谨慎管理的资源。"

翻译一下：我们的定价模型假设你不会真的把额度用完。你用完了，我们就亏了。

这就是AI订阅制的根本矛盾——公司希望你订阅但不要用太多，用户希望花了钱就要物尽其用。OpenClaw事件只是这个矛盾第一次大规模爆发。

Reddit上有人留了一句话让我印象很深：**"你以为你买的是算力，其实你买的是使用许可。"**

## 你现在该怎么办

如果你是Claude Code + OpenClaw的用户，有三个选择：

第一，继续用，但改成按token付费。算一笔账，如果你的月均消耗低于订阅价，按量计费反而更划算。

第二，迁移到其他模型。OpenClaw的最大优势就是模型无关，接GLM、接Gemini、接开源模型都行。Claude是最强的，但不是唯一的。

第三，等一等。社区的反弹声量很大，Anthropic有可能在细则上做调整。至少先把那个一次性积分在4月17日前兑掉。

不管选哪个，这件事给所有AI工具的重度用户上了一课：别把全部工作流绑死在一家公司的生态上。今天是OpenClaw被封，明天可能是你依赖的下一个工具。

在AI行业，唯一可靠的护城河是你自己的可迁移能力。

## 相关链接

- The Verge报道：https://www.theverge.com/ai-artificial-intelligence/907074/anthropic-openclaw-claude-subscription-ban
- TechCrunch报道：https://techcrunch.com/2026/04/04/anthropic-says-claude-code-subscribers-will-need-to-pay-extra-for-openclaw-support/
- HN讨论串：https://news.ycombinator.com/item?id=47633396
- OpenClaw官方仓库：https://github.com/openclaw/openclaw
