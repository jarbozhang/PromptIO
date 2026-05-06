# PayPal 自称重新成为技术公司，全面押注 AI 该信吗

PayPal Q1 财报电话会议上，CEO 喊出一句让人精神一振的话，PayPal 要"重新成为一家技术公司"。配套动作有三个，未来 2-3 年裁员 20%（4500 多人），AI 改造各条业务线带来 15 亿美元成本节省，把 Venmo 拆成独立业务段。股价在财报后跳水。

这话听上去耳熟，是因为 Dan Schulman 时代喊过同样的口号。一家成立 28 年的支付公司第二次说自己要变成技术公司，多少有点迟到的承认意味，承认这些年没跟上。

## "AI 转型"具体是什么

按 CEO 在电话会上的说法，AI 进 PayPal 分三层。

最底层是开发流程。原话是 "aggressively adopting AI in our development processes"，目的是提升开发者产能、缩短上线周期。这一层 PayPal 是落后于行业的，公司层面承认了，财报通稿里 "It's a startling admission from PayPal that it has yet to fully embrace AI in-house" 是 TechCrunch 的措辞，意思是 PayPal 内部至今没全面用上 AI 编程。

中间层是客服、运营、风控。这是大多数公司用 AI 砍成本的标准三件套，没什么新意。

最顶层是公司治理层面新成立的 "AI transformation and simplification" 团队，直接向 CEO 汇报，逐项重做关键流程。15 亿美元省下来，主要靠这层加裁员。

但电话会上没讲、技术圈早就在讨论的另一条线，才是 PayPal 真正的卡位。

## 真正值得关注的是 agent toolkit

PayPal 在 2025 年陆续上了三个东西，国内媒体几乎没怎么报。

第一个是 PayPal Agent Toolkit。开发者用 OpenAI Agents SDK 或者 Anthropic 的 Claude，调一个包就能让 agent 直接发起付款、创建发票、查交易、退款。

第二个是 PayPal Remote MCP Server。Claude 桌面端、Cursor 这些 MCP 客户端可以直接挂 PayPal 工具，agent 写一句"帮我给这个供应商付 800 美元"，模型自己走完授权和支付。

第三个是和 ChatGPT、Perplexity 这一类前端的 agentic commerce 协议，agent 在对话里直接结算，PayPal 在后端做支付清算。

这三个东西串起来看，PayPal 在抢的不是支付市场份额，是 agent 调用支付的默认路径。AI agent 早晚要替用户花钱，谁的 SDK 被先集成，谁就是下一代的"支付入口"。这一点 Stripe 一直在抢，PayPal 没声张地也在抢。

CEO 电话会上没把这条主线讲透，因为对华尔街分析师讲清这个故事比讲 15 亿成本节省难得多。但这才是 PayPal 还有故事可讲的根源。

## 国内同行对照

支付宝、微信支付、京东支付、银联，谁在做类似的事。

支付宝走得最远。2024 年起支小宝从客服 bot 一路升级到生活 agent，可以代订机票、查保单、跑医保，走的是 to C 个人助理路线。蚂蚁还在做百宝箱、AI 搜索等开发者侧的工具。但支付宝目前没有公开的 agent 支付 SDK 给第三方 LLM 应用调，开发者想让自己的 agent 调支付宝付钱，还是得走传统的支付接口加扫码。

微信支付的 AI 化几乎没在公开层面发力。微信整个生态对 LLM 的开放度本来就低，腾讯元宝是单独一条线，没有把支付能力以 agent 友好的方式开放出来。

京东支付和银联更沉默。

差距不是技术上的，是产品哲学上的。PayPal 把支付能力切片成 agent 可以调用的小工具，国内厂商还停在小程序时代的"开放平台"思路。两个时代的接入方式。

这件事对国内 fintech 从业者有什么启发。

一是 agent commerce 的 SDK 要尽早立项。哪怕只是把现有支付接口包成 OpenAI Function Calling 或 MCP 格式，让大模型应用能直接调，门槛并不高，但占位很关键。

二是 to C 的 agent 入口和 to B 的 agent SDK 是两件事，都要做。支付宝在 to C 那条线走在前面，但 to B 这条 PayPal 已经领先一截。

三是国内做 agentic commerce 还要解决一个 PayPal 没有的问题，监管。AI 自主代用户花钱，触发风控、洗钱合规、消费者保护一堆边界，这些东西国内会比海外更早撞墙。提前想清楚反而是机会。

## 独立开发者能怎么蹭

如果你做的是出海 SaaS、跨境电商工具、或者面向全球的 AI 应用，PayPal Agent Toolkit 现在就值得集成。

具体路径，去 GitHub 搜 paypal-agent-toolkit 仓库，跟着 README 把 PayPal 沙箱账号、API key 配好，用 Anthropic Claude SDK 或者 OpenAI Agents SDK 接进去。一个 demo 跑通的成本不到一晚上。

如果做的是国内市场的 AI 应用，等支付宝、微信支付正式开 agent SDK 的口子之前，可以先用支付宝的开放平台 API + 自己写一层 MCP 适配，把"创建订单、查订单状态、退款"这些原子操作包成 agent 可调用的工具。在国内你大概率是第一个这么做的。

## 我的判断

PayPal 这次"becoming a technology company again"在华尔街叙事层面是失败的，股价说明一切。但在产品层面，agent toolkit 这条线是真做对了。CEO 电话会没讲透的部分，比讲透的部分更值得跟。

国内 fintech 公司里，谁先把支付能力做成 agent 友好的 SDK 开放出来，谁就在下一轮 AI 应用爆发时占据接入位。这个窗口大概还有一年。

公众号读者里如果有在支付宝、微信支付、京东支付、银联这些公司做产品或开发的同行，留言聊聊，你们内部对 agentic commerce 的判断是什么。

## 相关链接

- TechCrunch 报道，[PayPal says it's 'becoming a technology company again' — that means AI](https://techcrunch.com/2026/05/05/paypal-says-its-becoming-a-technology-company-again-that-means-ai/)
- PayPal Agent Toolkit 文档，<https://developer.paypal.com/community/blog/introducing-paypals-agent-toolkit-and-mcp-server/>
- PayPal Agent Toolkit GitHub，<https://github.com/paypal/agent-toolkit>

Obsidian 关联，[[paypal|PayPal]] [[alipay|支付宝]] [[wechat-pay|微信支付]] [[openai|OpenAI]] [[anthropic|Anthropic]] [[ai-finance|AI 金融]] [[fintech|金融科技]] [[ai-product-experience|AI 产品体验]]

<!-- REACH: 7/10 | 品牌✓ 利益点✓ 可操作✓ -->
<!-- xhs_pass: true -->
