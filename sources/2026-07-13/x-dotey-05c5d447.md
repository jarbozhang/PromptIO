---
title: >-
  很多人搞不清楚 ChatGPT、Codex、Work 什么差别，以及额度是独立的还是共享的，根据官方文档整理了一个简单的 Q & A。
  Q：Chat、Work、Codex，一句话说清区别？ Chat 回答问题，Work 帮你干活，Codex 帮你写代码。 Chat 就是你熟悉的
  ChatGPT，你问它答，快进快出。 Work 是一个能跨应用收集信息、然后交付
source: X @dotey
url: 'https://x.com/dotey/status/2075652538058109385'
date: 'Fri Jul 10 18:45:03 +0000 2026'
likes: 840
reposts: 187
replies: 63
source_type: x
language: zh
account_name: 宝玉
fetched_at: '2026-07-12T23:05:08.074Z'
---
很多人搞不清楚 ChatGPT、Codex、Work 什么差别，以及额度是独立的还是共享的，根据官方文档整理了一个简单的 Q & A。

Q：Chat、Work、Codex，一句话说清区别？

Chat 回答问题，Work 帮你干活，Codex 帮你写代码。

Chat 就是你熟悉的 ChatGPT，你问它答，快进快出。

Work 是一个能跨应用收集信息、然后交付完整成品的智能体（Agent），交付物是文档、表格、幻灯片、网页应用这些拿到手就能用的东西。

Codex 也是智能体，但它主要操作的是代码仓库，能读你的项目文件、改代码、跑测试、提交 PR。

打个比方：
Chat 是你问"番茄炒蛋怎么做"，它告诉你步骤。
Work 是你说"帮我准备一桌晚餐"，它自己去冰箱找食材、炒菜、摆盘。
Codex 是你说"这个菜谱 App 有 bug"，它打开代码自己修。

【来源：https://t.co/tqEoL3c3SD】

Q：Work 到底能做什么？跟直接在 Chat 里说“帮我写个报告”有什么不同？

在 Chat 里你说“帮我写个报告”，它给你一段文字，你自己复制粘贴到 Word 里排版。

Work 完全不同。你先把日常工具接进去，Slack、Gmail、Google Drive、SharePoint、Teams、日历、CRM、项目管理工具都行，OpenAI 叫它 plugins。接好之后告诉它你要什么结果，它会自己去这些应用里拉数据、整合信息、生成一份可以直接交付的成品。你在提示词里用 @ 加应用名就能指定它去哪儿找数据。

举个例子，Zapier 的企业营销负责人用 Work 搭了一个系统，每月审查数千条线索，追踪 CRM 和邮件中的客户触点，找出跟进断裂的地方，生成管理层周报。Virgin Atlantic 的数字产品负责人用它做竞品对标分析，让 ChatGPT 调研各家航空公司的服务水平，生成可供团队审查的数据集，把原本需要数周的分析缩短到几小时。

另一个区别是 Work 能长时间跟进。一个复杂项目，它可以跟好几个小时，自己拆步骤、自己推进。中间有拿不准的会来问你，你也可以随时调整方向、审批关键动作。

【来源：https://t.co/Kt5D057ZJn】

Q：Work 能定时跑任务？

能。这个功能叫 Scheduled Tasks（定时任务），可以设成一次性、定时重复、事件触发或持续监控。

比如你设一个任务：每天早上检查 Slack 和邮件里的新消息，整理成简报发给你。或者：每当有新的客户反馈进来，自动归类主题、整理成产品改进建议。这些都能在后台跑。它还能用桌面端的内置浏览器上网查信息，甚至通过 Computer Use 功能操作你电脑上的其他应用。

定时任务面向 Plus、Pro、Business 和 Enterprise 用户开放，各档计划的并发任务数量上限不同。任务不能每小时跑超过一次，长时间无人理会的任务可能会自动暂停。

【来源：https://t.co/Kt5D057ZJn https://t.co/QYcuIuhe0V】

Q：那 Codex 跟 Work 的区别到底在哪？

这两其实是同一套底层 Agent（Codex）和 UI，但是应用在不同的场景，配合不同的插件。读的东西不同，交付的东西也不同。

Work 读的是你的业务上下文，邮件、文档、聊天记录、日历，交付的是商务成品，幻灯片、电子表格、文档、网站。Codex 读的是你的代码仓库，交付的是代码变更，diff、测试结果、PR。

【来源：https://t.co/Kt5D057ZJn】

Q：Codex 每周有 500 万人用，为什么还要再出一个 Work？

OpenAI 在博文里提到，虽然 Codex 最初是为开发者设计的编程智能体，但已经有超过 100 万人在用它做软件开发以外的工作。Work 的推出，某种程度上是把这些非编程用途正式化了，给了它一个专门的界面和工作流，用 plugins 连接业务应用，输出文档和幻灯片而不是代码。

OpenAI 自己内部也在大量使用：销售团队用 Work 把一次客户探索对话在 24 小时内变成了定制 POC（概念验证），以前这个流程需要几周。财务团队用 Work 把月末结账和预测流程从几天压缩到几小时。

我觉得 Codex 这么做呢，目的是为了吸引办公人群，原本这些人看到 Codex 的名字会以为是写代码用的，但是改名呢又会影响原本的 Codex 用户，结果就搞成这样一套产品两个名字。

简单来说就是一套产品，两个名字，两种主要场景，同时吸引不同用户群。

【来源：https://t.co/tqEoL3c3SD https://t.co/p0DLI5Y430】

Q：我在哪儿能用这三个模式？

Chat 最简单，网页、手机、桌面端都有，所有平台通用。

Work 在网页和手机上已经开始上线（Pro、Enterprise、Edu 优先，Plus 和 Business 未来几天陆续开放）。桌面端也有，而且桌面端更强，能用本地文件，还有内置浏览器上网抓取信息。

Codex 只在桌面端能选。手机上不能直接用 Codex 模式，但可以通过 ChatGPT App 里的 Remote 标签远程查看桌面上正在跑的 Codex 任务。

一个要注意的点：网页/手机端的 Work 对话和桌面端的 Work 对话目前不互通，云端是云端，本地是本地。Chat 对话则可以跨网页和桌面端同步。

原来独立的 Codex App 已经合并进了新版 ChatGPT 桌面端。一个 App 里切换 Chat、Work、Codex 就行。开发者可以把 Codex 设为默认打开视图，App 图标也能换成 Codex 的 logo。原来的 ChatGPT 桌面端会更名为 ChatGPT Classic。

【来源：https://t.co/tqEoL3c3SD https://t.co/Kt5D057ZJn】

Q：Chat 聊天和 Work/Codex 的额度是共享的吗？

不共享。Chat 对话有自己独立的消息限额，图片生成和语音也各有各自的独立限额和重置周期。

Work 和 Codex 用的是另一个池子，OpenAI 叫它"智能体用量"（agentic usage）。帮助中心原文说：Codex、ChatGPT Work、ChatGPT for Excel 和 Workspace Agents 的用量从同一个智能体额度池中扣减。

所以你在 Chat 里聊天聊得再多，不会影响 Work 和 Codex 的额度。但 Work 和 Codex 之间会互相挤占。白天用 Work 跑了一堆复杂任务，晚上想用 Codex 写代码，可能会发现额度已经不多了。

【来源：https://t.co/p2DbCXqAtQ https://t.co/uD7Q9BKZ2o】

Q：要花多少钱？

Work 不是独立付费产品。它跟 Codex 共用同一个额度池，包含在你现有的 ChatGPT 订阅里。所有计划都能用，从免费到企业版，区别在于额度多少。

Free（免费）：能试用 Work 和 Codex，额度非常有限，试试味道可以。美国地区有广告。 

Go（$8/月）：额度比免费多约 10 倍，桌面端可有限地用 GPT-5.6 Terra 跑 Work 和 Codex。没有 Deep Research 和 Agent Mode。有广告。 

Plus（$20/月）：第一个去掉广告、功能完整的档位。包含 Deep Research（每月 10 次）、Codex、Agent Mode。三年没涨价，性价比最高。

Pro（$100 或 $200/月）：$100 档额度是 Plus 的 5 倍，$200 档是 20 倍。面向重度用户。 

Business（$20/月/人起，年付；月付 $25）：至少 2 人，多了 SSO 和合规控制，数据默认不用于训练。

Enterprise（定制报价）：150 人起。

额度计费从今年 4 月开始改成按 Token 消耗计算。用更强的模型或开 Fast 模式，消耗更多。Plus 和 Pro 用户额度用完后可以购买额外 credits 继续使用。

【来源：https://t.co/at716u8Sdn https://t.co/uD7Q9BKZ2o】

Q：GPT-5.6 的 Sol、Terra、Luna 是什么？我该用哪个？

这是 GPT-5.6 的三个子型号。

Sol 最强，适合复杂推理和高难度编程，也最贵（API 价格 $5/$30 每百万 Token 输入/输出）。
Terra 居中，日常工作默认选它（$2.50/$15）。
Luna 最快最便宜，对速度敏感或任务简单时用（$1/$6）。

Free 和 Go 用户只能用 Terra。

Plus 及以上可以三个都选，还能调节 effort 级别。

ultra effort 在 Work 中仅限 Pro 和 Enterprise 用户，在 Codex 中 Plus 及以上可用。

【来源：https://t.co/p0DLI5Y430 https://t.co/at716u8Sdn】

Q：Work 上线后，原来的 ChatGPT 还在吗？

在。Chat 模式就是原来的 ChatGPT，一切照旧。桌面端点"Quick chat"按钮就能开新对话，手机端在顶部下拉菜单选"Chat"。你可以完全无视 Work 和 Codex，继续像以前一样用。

【来源：https://t.co/tqEoL3c3SD】
