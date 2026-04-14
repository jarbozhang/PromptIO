---
title: 每月200刀的Claude Code，被一只免费的"鹅"平替了？我跑了一个周末实测
source: https://venturebeat.com/infrastructure/claude-code-costs-up-to-usd200-a-month-goose-does-the-same-thing-for-free
score: 9.05
scoring_reason: Claude Code定价争议+免费开源平替，开发者高度关注，国内报道少
status: draft
platform: wechat
tags:
  - AI编程
  - 开源工具
  - Goose
  - Claude Code
created_at: '2026-04-05T08:20:00.000Z'
generated_by: claude-opus-4-6
title_score: 8.8
title_alternatives:
  - title: 每月200刀的Claude Code，被一只免费的"鹅"平替了？我跑了一个周末实测
    score: 8.8
  - title: Claude Code月烧200刀，我用Block开源的Goose白嫖了一个周末
    score: 8.5
  - title: 别再为AI编程工具交月租了，这只开源"鹅"让你在飞机上都能写代码
    score: 8.0
gold_quote: 真正的自由不是免费，是选择权。
summary: Claude Code每月200美金还经常额度打爆，而Jack Dorsey的Block公司开源了一只叫Goose的"鹅"——完全本地运行、零月费、支持任意模型。我拿副业项目实测了一个周末，发现本地模型智商确实不够用，但它的模型无关架构才是真正的杀手锏。
---
# 每月200刀的Claude Code，被一只免费的"鹅"平替了？我跑了一个周末实测

上月我写一个内部工具，单日就把Claude Code Max的额度打爆了。

不是因为我在摸鱼挂机。是正儿八经地重构代码，高强度用了大半天。然后弹窗告诉我：今日额度已用完，请明天再来。

200美金一个月的工具，连一个高强度工作日都撑不住。

Reddit上已经炸了。有人30分钟就把日额度干光，有人直接退订留言"对于真正的商业项目，这东西就是个笑话"。Anthropic说这个限制只影响不到5%的用户——但仔细想想，这5%恰恰是最依赖AI写代码的核心开发者。

精准打击付费最多、用得最深的那批人。这商业逻辑多少有点离谱。

然后我在硅谷工程师的圈子里看到了Goose。

## 一只开源的"鹅"

Goose是Block做的——就是Jack Dorsey那个以前叫Square的支付公司。GitHub上已经2.6万星，362个贡献者，发了102个版本。

这不是某个程序员周末写的玩具。这是一家市值几百亿美金的上市公司正式开源的工具。

它的核心卖点只有一句话：**完全跑在你自己的电脑上。**

代码不上传、没有请求次数限制、没有按Token收费的账单。Block的工程师Parth Sareen在直播里演示了在飞机上用Goose离线写代码。

用Claude Code的时候你敢想这个场景吗？

## 配置只需要三步

我花了不到30分钟就跑起来了。

第一步装Ollama——去官网下个安装包，终端里一行命令拉模型：`ollama run qwen2.5`。

第二步装Goose——从GitHub克隆下来编译，或者直接下预编译的二进制包。macOS、Windows、Linux全支持。

第三步配连接——打开Goose桌面端，设置里把Provider选成Ollama，API地址填`http://localhost:11434`。

搞定了。你的MacBook现在就是一个私有AI编程工作站。零月费。

## 真实体验：模型智商是硬伤

吹完了，说点真话。

我拿一个停了半个月的副业项目当小白鼠，用Goose + Qwen 2.5本地模型跑了一个周末。

**模型质量差距是断崖式的。**

跟Claude 4.5 Opus说"把这个页面改得现代一点"，它真的懂什么是"现代"——会用合理的间距、当下流行的配色方案、恰当的动效。本地小模型听到同样的话，给你整出一堆2015年Bootstrap风格的老古董。

这不是调参数能解决的问题。模型就是没见过足够多的"现代设计"。

**上下文窗口的鸿沟更致命。** Claude Sonnet 4.5有100万Token的上下文，你把整个项目喂给它，它能记住所有文件之间的关系。本地开源模型普遍只有4K到8K。我做跨文件重构时翻车了——改着改着它就忘了前面文件里定义的接口名。

这就好比让一个只能记住最近三句话的人帮你维护一个有几十个模块的项目。

**硬件门槛也不低。** 想跑稍微靠谱点的模型，至少32GB内存。16GB勉强能跑Qwen 2.5这种小个头，但风扇会起飞。

## 但这些都不是重点

看到这你可能觉得：那Goose不就是个阉割版Claude Code吗？

不是。关键在架构。

**Goose是模型无关的。**

它没有把你绑死在任何一个模型上。今天白嫖本地的Qwen，明天接智谱的GLM API，后天换OpenRouter走Claude的接口。它就是一个标准化的AI Agent工作流引擎，自带文件读写、命令执行、API调用，还完整支持MCP协议。

这意味着什么？

Moonshot的Kimi K2和智谱的GLM 4.5，在基准测试上已经逼近Claude Sonnet 4的水平了。你把这些国产模型的API接到Goose上——模型智商基本够用，每月开销可能只要Claude Code的十分之一，代码数据还留在国内，合规也不担心。

**这才是Goose真正可怕的地方。它把"该用哪个模型"的选择权还给了开发者。**

Claude Code的收费模式建立在一个假设上：我的模型最好，所以你必须用我的服务，按我定的价格付费。但当开源模型以肉眼可见的速度追平时，这个假设还能撑多久？

## 我的判断

我认为每月200美金的AI编程工具时代快到头了。

不是Anthropic的模型不行。Claude Opus确实是目前最强的编程模型，没有之一。但工具层的护城河挡不住开源社区。当最好的模型可以通过API接入任何工具时，单一公司对工具和模型的捆绑销售就失去了根基。

对于个人开发者和小团队，我的建议是这样的：

如果你在做重要的商业项目、需要最强模型质量、预算充足——继续用Claude Code，Opus的水平确实无可替代。

但如果你像我一样经常被额度卡脖子、在做副业项目、或者对数据隐私有要求——现在就装个Goose试试。接一个国产大模型的API，可能会让你重新思考"AI编程工具到底值多少钱"这个问题。

真正的自由不是免费。是你可以选择。

## 相关链接

- Goose官方仓库：https://github.com/block/goose
- Ollama官网：https://ollama.com/
- VentureBeat原文：https://venturebeat.com/infrastructure/claude-code-costs-up-to-usd200-a-month-goose-does-the-same-thing-for-free
- Claude Code定价争议分析：https://userjot.com/blog/claude-code-pricing-200-dollar-plan-worth-it
