# Google I/O 2026 八条线一起开火 Gemini 3.5 Flash 不再做聊天机器人改做 agents

Google 这一次想用一场 I/O 把 OpenAI 和 Anthropic 一起圈起来打。

往年 I/O 喜欢挑一两个大招重点说，今年的姿态完全不一样。Gemini 3.5 Flash、Spark、Antigravity 2.0、AI Studio 的 Android 生成、Universal Cart、Genie 街景、Gmail 语音 agent、Search 大改，八条产品线同一天上台。Sundar 站在台上的两个小时，平均每 15 分钟就要换一个产品方向。这种"全面铺货"的密度，过去三年只在苹果 WWDC 上见过。

TechCrunch 的总结一句话说得很准，Google 在赌"下一波 AI 不是聊天机器人，是 agents"。Gemini 3.5 Flash 被定位成"最强 coding 和 agentic 模型"，能"自动完成复杂任务，从零开始写软件"。这话翻译过来，Google 自己也承认上一代 Gemini 在聊天对话框里跟 ChatGPT 拼是没胜算的，干脆换战场。

下面把这八条线一次过一遍，再说哪几条对中国读者真能动手。

**Gemini 3.5 Flash**，Google 自己默认模型，从今天起 Gemini app 和 Search 的 AI Mode 全换成它。Simon Willison 的标题写得直白，"更贵了，但 Google 打算用它做所有事"。意思是 Google 不再追求"足够便宜"，而是追求"足够强到可以替代专用模型"。中国读者能对照的是 OpenRouter 上的 API 调用，国内通过中转商也能接到。

**Gemini 3.5 Pro**，下个月发，参数没披露，定位是 Flash 的上位版。这条线对国内开发者意义不大，Pro 一般用不起。

**Spark**，Latent Space 的描述是"background agents"，常驻后台的 agent，接管 Gmail、Calendar、Docs 这些 Google 自家应用。这个直接对标 OpenAI 的 ChatGPT Agent 和 Anthropic 的 Claude Computer Use，但走的是"我已经有你的数据"这条路。国内读者用不到 Gmail，但可以观察国产产品什么时候跟进，飞书 + 豆包、钉钉 + 通义已经在做类似事情。

**Antigravity 2.0**，Google 的 coding agent 平台升级，从单文件生成升级到全项目生成 + 部署。这条直接打 Cursor 和 Claude Code。中国读者最关心的就是这一条，因为 AI Studio 本身国内不能直接访问，但 Antigravity 的能力会下放到 Gemini API。

**AI Studio 的 Android 生成**，自然语言描述 → 直接生成可运行的 Android app。Demo 里演示了"写一个记账 app"几分钟出 APK。这是对 v0、Bolt、Lovable 那一拨 web app 生成器的反击，Google 选择从 Android 切。

**Universal Cart**，Search 直接接管购物流程，比价 + 下单 + 支付一条龙。在 Amazon、Walmart 之上加了一层 agent。中国电商生态完全不一样，对应物是淘宝问问、京东智能购物助手，这条线只能当参照。

**Genie 街景**，Google Maps 的 3D 街景接入生成式 AI，街景里的物体可交互，可以"走进"一家店看菜单。这条更像是技术 demo，落地周期长。

**Gmail 语音 agent**，打开 Gmail 说一句"帮我把昨天那封会议邮件回了，约下周二下午三点"，agent 自己写完发出去。这是 Spark 的具体应用之一，单独拎出来强调说明 Google 觉得这是日常入口。国内读者能对照的是网易邮箱 + 灵犀、QQ 邮箱 + 元宝，目前还没做到这个程度。

**Search 大改**，AI Mode 从可选变默认，全量替换传统的"十条蓝链"。这条对全球 SEO 行业是大新闻，对中国读者影响有限，百度、夸克的 AI 搜索早就这样做了。

八条线过完，挑出真正能动手的。

第一条是 Gemini 3.5 Flash 的 API 调用。国内开发者通过 OpenRouter 或者支持 Gemini 的国内中转商（如 oneapi 自建、几家公开的中转服务）可以直接接到，价格虽然 Simon Willison 说"更贵了"，但相比 Claude Sonnet 还是有性价比。可以拿来跑长上下文摘要、代码生成、agent 主循环这三类任务。

第二条是 Antigravity 2.0 的能力下放。Google 历来把 AI Studio 上的能力同步到 Gemini API，估计两周内就能在 API 里调到全项目生成。如果你在做 coding agent，这是必须跟踪的更新点。Hermes、openclaw 这类开源 agent 框架可以拿 Antigravity 的接口对照设计。

第三条是 AI Studio 的 Android 生成，**虽然 AI Studio 网页端国内不直接访问，但底层能力一旦放到 Gemini API**，国产 IDE 工具可以包装一层做"自然语言生成 APK"的产品。这是个明确的开发者机会。

其他五条，街景、Universal Cart、Gmail 语音、Search 大改、Gemini 3.5 Pro，对中国读者目前只是新闻，不是行动指南。

Google 这次密集铺货背后的真意，是想把 Gemini 从一个"模型"变成一个"OS 层"。Spark 接管邮件日历、Antigravity 接管代码、Universal Cart 接管购物、Gmail 语音接管沟通，每一个产品线都在抢占用户的某一个日常任务入口。Sundar 在主题演讲里反复说的是"agents that act for you"，潜台词是"以后你不再打开 app，agent 替你打开"。

这个判断对国产 AI 生态的影响其实挺直接。豆包、Kimi、通义、智谱，过去两年都还停留在"做更好的聊天对话框"。Google 这次的姿态是直接跳过聊天对话框，去抢应用层。如果国产模型还停留在"对话能力对齐 GPT-4"这个层面，下一轮就会被 Google 拉开身位。好消息是国内有飞书、钉钉、企业微信这种垂直生态，agent 能直接嵌入工作流，这是 Google 在中国市场天然没有的优势。

国产替代方面，目前最接近 Spark 那种"background agent"思路的，是字节跳动的扣子（Coze）和阿里的通义灵码。前者偏个人助手，后者偏编程助手，都还在"用户主动调用"的阶段，没到 Spark 那种"自动接管"的阶段。

行动建议三条。

一，开通一个支持 Gemini 3.5 Flash 的国内 API 中转，把它接到自己手头的 agent 项目里，跑两个周末看看 coding 和长上下文表现。二，关注 Antigravity 2.0 的 API 文档发布，一旦下放就第一时间对照 Cursor 和 Claude Code 跑同一个项目，看差异。三，盯一盯国产 IDE，VSCode 国产分支、CodeFuse、灵码这些，看谁先跟进"自然语言生成完整 app"的能力。

Google 这次 I/O 像一次饱和攻击，密度大到让人来不及消化。两个月后回头看，大概率只有三四条线真正活下来，其他几条会安静地从主页消失。但赌"agent 而不是 chatbot"的方向，这一次基本是定了。

相关链接

- TechCrunch 报道，https://techcrunch.com/2026/05/19/with-gemini-3-5-flash-google-bets-its-next-ai-wave-on-agents-not-chatbots/
- The Verge 13 条总结，https://www.theverge.com/tech/933415/google-io-2026-biggest-announcements-ai-gemini
- Latent Space AINews，https://www.latent.space/p/ainews-google-io-2026-gemini-35-flash
- Simon Willison 笔记，https://simonwillison.net/2026/May/19/gemini-35-flash/

---
相关实体:: [[google|Google]] | [[gemini|Gemini]] | [[gemini-3-5-flash|Gemini 3.5 Flash]]
相关主题:: [[ai-product|AI 产品]] | [[agent-frameworks|Agent 框架]] | [[ai-coding-tools|AI 编程工具]]

<!-- REACH: 10/10 | 品牌✓ 利益点✓ 可操作✓ -->
