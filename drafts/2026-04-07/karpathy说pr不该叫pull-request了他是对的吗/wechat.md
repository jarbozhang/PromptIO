---
status: draft
topic: topics/2026-04-07/topic-8.md
source_url: https://x.com/karpathy/status/2040473058834878662
generated_at: 2026-04-07T20:00:00+08:00
---

# Karpathy说PR应该改名叫Prompt Request，1055个人点了赞

三天前Karpathy转了一条推，底下炸了。Peter Steinberger（PSPDFKit创始人，iOS圈老炮）跟他说，PR不应该再叫Pull Request了，应该叫**Prompt Request**。

1055个赞，49个转发。英文开发者圈已经在认真讨论这件事了。

## 到底发生了什么

Steinberger的原话很直白。他的Agent已经能搞定大部分实现工作了，所以他不需要你把想法变成代码再提PR。你只要把想法描述清楚，发一个prompt过来，让Agent去实现就行。

而现在他收到的PR是什么样的？大量用免费版ChatGPT vibe coding出来的代码，质量一塌糊涂。

Karpathy显然深有同感，直接转发表态。

这不是一个段子。这是一个信号。

## 你可能没意识到的事

英文开发者社区正在经历一场静悄悄的分裂。

一边是**会写prompt的人**。他们用Claude Code、Cursor、Copilot Workspace这些工具，把需求描述得精确到边界条件，Agent输出的代码质量比大多数人手写的还好。

另一边是**只会vibe code的人**。打开ChatGPT免费版，把报错信息复制粘贴进去，把生成的代码原封不动提交PR。不看diff，不跑测试，不理解自己提交了什么。

Steinberger作为开源项目维护者，每天要review后者提交的垃圾PR。他烦了。

这才是Prompt Request这个概念真正的含义。不是"用AI写代码"这么简单。是**协作方式的接口变了**。以前你给我代码，我review代码。现在你给我意图，Agent帮你实现，我review意图+实现。

中文社区几乎没人在讨论这个转变。大家还在争论"AI会不会取代程序员"，英文圈已经在重新定义程序员之间怎么协作了。

## 我的判断

说一个可能得罪人的话。

**未来两年，不会写高质量prompt的开发者，连给开源项目贡献代码的资格都没有。**

太极端了？我收回一半。但方向不会错。

想想看，如果Steinberger的项目真的开始接受Prompt Request而不是Pull Request，会发生什么？贡献的门槛不是降低了，是变了。你不需要会写Swift，但你需要能把一个feature描述得足够精确，让Agent生成的代码能通过CI、通过review。

这对很多人反而更难。

写代码是一种技能，描述清楚你想要什么是另一种技能。大多数人两样都不太行，但至少写代码可以靠Stack Overflow抄。描述意图？没得抄。

GitHub的下一个大功能更新，我赌一定跟这个方向有关。可能是PR描述栏直接集成Agent，可能是一种新的contribution格式。Copilot Workspace已经在试水了。

## 你现在可以做什么

如果你是开源项目维护者，从今天开始在CONTRIBUTING.md里加一句话。告诉贡献者，与其花三小时写一个半成品PR，不如花三十分钟写一个清晰的issue描述你想解决什么问题、边界条件是什么、预期行为是什么。

如果你是想给开源项目贡献的开发者，练习一件事。打开Claude Code或者Cursor，不要自己写代码。把你的想法写成一段prompt，让Agent实现，然后review Agent的输出。这个过程训练的不是你的编码能力，是你的**需求表达能力**。

Karpathy点赞的东西，通常六个月后就变成行业共识。上次是vibe coding，这次是Prompt Request。

六个月后回来看这篇文章，看我说得对不对。


相关链接

- [Karpathy原推](https://x.com/karpathy/status/2040473058834878662)
- [Peter Steinberger](https://x.com/steipete) - PSPDFKit创始人，Prompt Request概念提出者
- [GitHub Copilot Workspace](https://githubnext.com/projects/copilot-workspace) - GitHub正在试验的AI原生协作工具
