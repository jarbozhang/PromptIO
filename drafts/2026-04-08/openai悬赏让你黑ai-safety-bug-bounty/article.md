# OpenAI 花 10 万美金请你黑它的 AI，但大多数人连门都找不到

上周有个朋友问我，"听说 OpenAI 出了个悬赏计划，搞 prompt injection 就能拿钱？" 我说对，最高 10 万美金。他眼睛亮了三秒，然后问，"那我让 ChatGPT 说脏话算不算？"

不算。这恰恰是这个计划最有意思的地方。

## 这不是你以为的那种 Bug Bounty

OpenAI 3 月 25 号上线了一个新东西，叫 Safety Bug Bounty。注意，它和 2023 年就有的 Security Bug Bounty 是两个完全不同的项目。老项目管的是传统安全漏洞，API key 泄露、权限绕过那些。新项目瞄准的是 AI 特有的风险。

具体来说，三个方向。

第一，Agentic Risks。你能不能通过一段精心构造的文本，劫持别人的 AI Agent？比如用户让 ChatGPT Agent 帮他浏览网页，结果网页里藏了一段 prompt injection，Agent 被骗去执行了恶意操作，甚至把用户的敏感信息发给攻击者。这种攻击要能稳定复现，成功率不低于 50%，才有资格拿赏金。

第二，OpenAI Proprietary Information。模型输出里是不是会泄露内部推理过程、系统 prompt 或者其他机密信息？如果你能稳定触发，这也算。

第三，Account and Platform Integrity。绕过反自动化措施、操纵信任信号、规避封禁，这些属于平台完整性问题。

而"让模型说脏话"或者"让模型告诉你怎么做一道危险菜"这种 jailbreak，不在范围内。

这个区分很关键。

## 10 万美金到底怎么拿

说实话，我第一反应是，10 万美金？之前 OpenAI 的 Security Bug Bounty 上限才 2 万。这次直接翻了 5 倍。

但别高兴太早。10 万是给"exceptional and differentiated critical findings"的，翻译过来就是，你得找到一个前所未见的、影响巨大的、复现稳定的安全问题。绝大多数有效提交拿到的会远低于这个数。

参与流程其实不复杂。去 Bugcrowd 注册账号，找到 OpenAI Safety Bug Bounty 的专属页面，仔细读完 scope 和 rules，然后提交你的发现。报告里必须包含详细的复现步骤、影响评估、至少 50% 的复现率证明。

OpenAI 说大多数提交会在几天内完成分诊。提交之后，Safety 团队和 Security 团队会协同处理，如果你的报告更适合另一个项目，他们会自动帮你转过去。

坦率讲，这个流程听起来很丝滑，但实际体验可能没那么美好。

## 社区里的多种声音

有研究员在 Medium 上写了一篇文章，标题直接叫"My OpenAI Bug Bounty Experience: A Tale of Being Ghosted"。大意是，他提交了一个有效漏洞，OpenAI 悄悄修了，但既没给钱也没给个回复。

这不是个例。Bug Bounty 领域有个老问题，叫"silent fix"。你花几天甚至几周找到一个漏洞，认认真真写好报告提交上去，结果对方把漏洞修了，然后当你不存在。

但另一边，也有不少安全研究员对这个新项目表示认可。逻辑很简单，之前 prompt injection、数据泄露这类 AI 特有的问题，在传统 Bug Bounty 框架下根本没法报。你发现 ChatGPT Agent 能被劫持？对不起，这不算"安全漏洞"。现在 OpenAI 专门开了一个赛道，至少说明他们承认这类问题的存在，并且愿意花钱解决。

还有人关注的点更务实，他们问的是，AI Agent 的攻击面到底有多大？

这个问题我觉得比赏金本身更值得聊。

## 我的判断

我认为 OpenAI 推这个计划，时机非常精准。

2026 年是 Agentic AI 大规模落地的一年。ChatGPT Agent、Operator、各种第三方基于 GPT 构建的 Agent，都在快速进入真实用户的工作流。Agent 能上网、能操作文件、能调用 API，这意味着一个成功的 prompt injection 造成的伤害，已经不是"模型说了句不该说的话"，而是"你的银行账户被转了钱"。

可能有些想法还不成熟，但我是真的觉得，Agentic 安全会是接下来两年最被低估的领域。现在做传统 Web 安全的人，如果能把技能迁移到 AI Agent 攻防上来，在未来 12 个月会非常吃香。

不过，我对 OpenAI 的动机也不完全买账。10 万美金的上限很好看，但如果分诊流程不透明、研究员的贡献得不到及时反馈，这个计划最终会变成一个 PR 动作而不是真正的安全基础设施。OpenAI 的 Bugcrowd 页面上已经有两个项目了，一个 Security 一个 Safety，加上他们之前专门针对生物风险做的 Bio Bug Bounty，碎片化本身就增加了研究员的参与成本。

反正我觉得，赏金数字不重要，响应速度和透明度才是这类计划成败的关键。

## 如果你想参与

第一步，去 Bugcrowd 注册，搜 OpenAI Safety Bug Bounty。

第二步，别急着动手。先把 scope 读三遍。90% 的无效提交都是因为没搞清楚什么在范围内。记住，普通的 jailbreak 不算。你要证明的是，这个漏洞能在真实场景中造成实际伤害。

第三步，如果你之前做过 Web 渗透测试，把思路转一下。传统渗透测的是 HTTP 请求和服务端逻辑，AI Agent 渗透测的是 prompt 流和工具调用链。攻击面变了，但方法论是通的。

第四步，写报告的时候，把复现率量化。OpenAI 明确要求 50% 以上的复现率，你跑 20 次只成功 3 次，大概率会被拒。

回到开头那个朋友的问题。让 ChatGPT 说脏话不值钱，但如果你能让 ChatGPT Agent 在浏览一个恶意网页后，自动把用户的对话记录发到外部服务器，那可能真值 10 万美金。

区别在于，一个是让模型犯错，另一个是让模型伤人。OpenAI 现在愿意为后者买单了。

## 相关链接

- [OpenAI Safety Bug Bounty 官方公告](https://openai.com/index/safety-bug-bounty/)
- [Bugcrowd 上的 OpenAI Safety 项目页面](https://bugcrowd.com/engagements/openai-safety)
- [OpenAI Security Bug Bounty（传统安全）](https://bugcrowd.com/openai)
- [OpenAI 漏洞披露政策](https://openai.com/policies/coordinated-vulnerability-disclosure-policy/)
- [OpenAI 关于 Prompt Injection 的技术文档](https://openai.com/index/prompt-injections/)
