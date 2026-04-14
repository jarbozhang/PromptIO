# Anthropic发布Glasswing用AI找漏洞，但主动封印了最强模型

一个AI模型，独立发现了FFmpeg里藏了16年的漏洞。这个漏洞，自动化工具跑了500万次都没测出来。

然后Anthropic说，这个模型太危险了，我们不卖。

上周Anthropic发布了Project Glasswing，一个用AI找软件安全漏洞的计划。核心武器是他们的新模型Claude Mythos Preview。这个模型在CyberGym基准测试上拿到了83.1%的漏洞复现率，而当前最强的Claude Opus 4.6只有66.6%。

但真正让我停下来想了想的，不是这些数字。

是Anthropic的选择，做出了一个可能史上最反直觉的商业决策，告诉全世界"我们的产品很危险，所以我们不卖给你"。

## Mythos到底发现了什么

先说具体成果。Mythos在几个关键开源项目里独立发现了数千个高危零日漏洞。

OpenBSD里有一个存在了27年的远程崩溃漏洞。27年。Linux内核里有多个可以链式利用实现提权的漏洞。还有上面提到的FFmpeg那个16年老洞，500万次自动化测试都没抓到。

所有这些漏洞都已经报告给了维护者并完成修补。

Anthropic还玩了一手加密哈希，把未公开的漏洞细节做了密码学承诺，90天内会在补丁部署完成后公开全部发现。这招挺聪明的，既证明了自己不是在吹牛，又给了维护者修复的时间窗口。

## 12家巨头站台，1亿美元投入

Glasswing不是Anthropic一家在玩。AWS、Apple、Google、Microsoft、NVIDIA、CrowdStrike、Cisco、Broadcom、JPMorganChase、Linux基金会、Palo Alto Networks，加上Anthropic自己，12家创始合作伙伴。另外还有超过40个维护关键基础设施的组织拿到了访问权限。

Anthropic承诺了1亿美元的模型使用额度，外加400万美元直接捐赠，其中250万给了Alpha-Omega和OpenSSF，150万给了Apache软件基金会。

这个阵容说明一件事，大公司们私底下对AI带来的网络安全风险是认真的。Ethan Mollick在推特上说得很直白，"无论公开还是私下，Mythos在很多大型机构里都被严肃对待，这些机构里都是聪明人，他们宁愿不用担心新的网络安全风险。"

## 社区炸了锅

但社区的反应远没有这么统一。

一派观点认为这是营销炒作。逻辑很简单，你告诉我你的产品很危险所以不卖给我？这不就是在制造稀缺感吗？TechCrunch直接发了一篇文章质疑，标题就是"Anthropic限制Mythos发布，是为了保护互联网，还是保护Anthropic？"

另一派则认真得多。Mollick的回应值得完整引用，"我不确定'我们的产品很危险，我们需要通知政府'，是批评者们认为的那种面向企业的销售话术。"

坦率讲，这句话说到了点子上。

你想想看，哪个To B销售会对客户说"我们的东西太危险了政府都得管"？这不是饥饿营销，这是自断一臂。如果Anthropic真的只想赚钱，把Mythos开放API定个高价不就行了？

但事情没那么简单。就在Glasswing发布的同一周，Anthropic封禁了OpenClaw项目创建者Peter Steinberger的Claude访问权限。时间点恰好在Claude对OpenClaw用户调整定价之后。这让"Anthropic在AI安全问题上的诚意到底有几分"这个问题变得更加微妙。

## 我的判断

我认为Anthropic在这件事上大概率是真诚的，但这种真诚本身也是一种竞争策略。

这不矛盾。

Anthropic的定位从第一天起就是"负责任的AI公司"。封印Mythos完美符合这个品牌叙事。他们可以同时真心认为这个模型有风险，又清楚地知道这种克制会为他们赢得监管层和企业客户的信任。

真正值得关注的不是Anthropic的动机，而是一个更大的问题。当AI模型的攻击能力开始超过防御工具，整个软件安全的游戏规则都会变。

Mythos在CyberGym上83.1%的漏洞复现率意味着什么？意味着大量现有的安全扫描工具可能已经不够用了。一个能找到27年老洞的AI，也能被用来武器化。Anthropic选择了把它关在笼子里，但下一个训练出类似能力的公司呢？

说实话我也不确定答案。但有一件事是清楚的，AI安全不再是一个可以慢慢讨论的话题了，Mythos已经把这个时间窗口压缩到了"现在"。

## 如果你是安全研究员

Anthropic开放了一个Cyber Verification Program，安全专业人员可以申请Mythos的访问权限。如果你在做安全相关的工作，这可能是目前能接触到的最强漏洞挖掘工具。

一个开放性的问题留给大家，如果AI发现漏洞的速度远超人类修复的速度，我们的整个漏洞披露机制是不是也得重新设计？

## 相关链接

- Project Glasswing官方页面: https://www.anthropic.com/glasswing
- Anthropic官方推文: https://x.com/AnthropicAI/status/2041578392852517128
- Ethan Mollick评论: https://x.com/emollick/status/2043516250081407422

---
相关实体:: [[anthropic|Anthropic]] | [[emollick|Ethan Mollick]]
相关主题:: [[supply-chain-security|供应链安全]]

<!-- REACH: 7/10 | 品牌✓ 利益点✓ 可操作✗ -->
