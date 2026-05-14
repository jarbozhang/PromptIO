# Notion Developer Platform 把工作区开放给 AI agent 飞书钉钉怎么跟

5 月 13 日，Notion 上线 Developer Platform，把自家工作区开放成一个挂载 AI agent、外部数据源和自定义代码的运行底座。TechCrunch 那篇报道里有句话值得反复读，Notion 不再把自己定位成笔记或者文档软件，而是要做一个"agentic productivity workspace"。

翻译成中文就是，文档不再是终点，文档是 agent 的工作面板。

这事对国内做办公协同 SaaS 的飞书、钉钉、语雀、企业微信而言，是一份方向参考。

## Notion 这次具体放出了什么

Developer Platform 的核心动作分三层。

第一层，原生 agent 接入。第三方能把自己的 AI agent 直接挂进 Notion 工作区，不再是过去那种"右下角弹个聊天框"的外挂感，而是 agent 拥有读 page、写 page、调 database、触发 automation 的原生权限。

第二层，外部数据源 connector。把 Salesforce、Linear、GitHub 这类 SaaS 数据拉进 Notion 的检索范围，agent 在回答问题时能直接引用，不再让用户自己复制粘贴上下文。

第三层，自定义代码运行。开发者可以把 TypeScript 函数直接部署进 Notion，作为 agent 的可调用工具，相当于 Notion 内置了一个轻量 serverless 运行时。

Reddit 上 r/Notion 一位长期用户的评价很到位，Notion 想做的不是文档，是 knowledge-first 的工作操作系统。

## 这个判断为什么不是 PR 话术

过去两年所有云文档厂商都在做 AI 集成，路径基本相同，加一个侧边栏 chat，里面接模型，能总结当前页面、能续写段落。Notion 自己的 Notion AI 一开始也是这个形态。

但 agent 时代的产品形态正在变。Anthropic 5 月初刚推出 Managed Agents，OpenAI 把 GPT 改造成 agent 入口，Cursor、Devin、Claude Code 在各自垂类把"agent 帮你干活"做成标配。这些工具的共同点是，它们都需要一个**承载状态的工作面**。

文档天然是这个工作面。

Reddit r/AI_Agents 5 月 14 日有一条被讨论了 10 条的帖子，主题是要不要做一个开源的 CLI agent 编排层。提问者的原话是，随着 Notion Developer Platform 上线，他越来越觉得 agent 干真活，大部分会通过 CLI 完成，Notion 有 CLI、Salesforce 有 CLI、GitHub 有 CLI，但 agent 一旦开始跨工具用这些 CLI，就需要一个编排层。

这个观察揭示了 Notion 这次出招的深层逻辑。Notion 不只是开放 API，它是在抢占 agent 操作哪个工作面的卡位。

## 国内对手现在处在什么位置

飞书、钉钉、语雀、企业微信面对的是同一道选择题，但起跑姿态各不相同。

飞书的智能伙伴去年下半年开始升级，把 AI 嵌入文档、多维表格和会议。技术路径上飞书走的是"AI 助手 + 业务集成"，文档里能召唤 AI 做总结，多维表格里能跑字段级别的 AI 填充，会议里能自动整理纪要。这条路径偏"在每个产品形态里加 AI"，不是"把产品形态本身变成 agent 工作面"。

钉钉今年押注的是"AI 助理"和"AI 工作台"，把生成式 AI 包装成员工面前的统一入口。但钉钉的核心抽象还是消息和审批流，文档是辅助。让 agent 在钉钉里"原生干活"，需要打通消息、审批、文档、应用平台之间的状态，难度比 Notion 高。

语雀的姿态最干净，作为蚂蚁旗下的知识库产品，AI 集成主要是问答和搜索，没有公开的 agent 接入框架。语雀的优势是知识结构化做得扎实，但目前没有"开放工作区给第三方 agent"的迹象。

企业微信的 AI 集成更多绑定在腾讯文档和混元上，定位还是"通讯工具 + 应用接入"，文档是单独的产品线，agent 形态的工作面尚未出现。

横向对比下来，国内厂商在"AI 助手嵌入既有产品"这一层都做得不慢，"把工作区开放成 agent 运行底座"这件事上节奏不一样。

## 抄作业的难点不在技术

很多人第一反应会说，飞书或钉钉做一个类似 Developer Platform，不就是开放更多 API、加一个 agent runtime 吗。

技术上确实如此，但产品决策上是另一回事。

Notion 之所以能做这一步，是因为它本来就是"document is the application"的设计哲学。一个 Notion page 既是文档也是数据库也是看板，agent 进来后挂载点天然存在。

飞书、钉钉的产品哲学是另一套，IM + 审批 + 业务应用，文档是其中一个模块。要把工作区变成 agent 工作面，需要先解决"哪个模块作为 agent 的默认上下文"这个问题。是聊天记录吗，是审批流吗，还是文档。

这不是技术抽象问题，这是产品定位问题。一旦选错挂载点，agent 接进来会像在错的房间里干活。

另一个被低估的难点是**开发者生态**。Notion Developer Platform 能立住，前提是有足够多的第三方愿意做 Notion-first 的 agent。Notion 在欧美开发者中的渗透率本来就高，加上英文文档体系、Stripe 式的 DX 标准，这条护城河国内厂商一时半会儿补不上。

飞书的开放平台做了几年，第三方生态主要还是企业内部 ISV，独立开发者比例低。语雀几乎没有开放平台。钉钉的开放平台更多服务渠道伙伴，跟"独立开发者社区"是两个物种。

## 几个容易被忽略的视角

r/AI_Agents 的 CLI 编排层讨论里，提问者隐含了一个判断，agent 在多个 SaaS 之间干活时，工作面归属正在被重新洗牌。Notion 想做的是文档型工作面，但其他玩家会做项目型工作面（Linear）、代码型工作面（GitHub）、销售型工作面（Salesforce）。国内厂商如果不抢占其中至少一个，未来 agent 时代的卡位会很被动。

另一条 Anthropic Managed Agents 的讨论里有人提到，0.08 美元/小时的价格是诱饵，真正吃钱的是 egress 和工具调用频次。这反向印证了 Notion 这次的逻辑，Notion 不靠 agent 本身赚钱，靠承载 agent 的工作面收订阅费。这种"工作面收租"的模式对国内厂商是更稳定的护城河。

还有一条 r/AI_Agents 的实测帖结论是，agent 平台的留存关键不是模型能力，是工作流嵌入的深度。把 AI 装进对话框里，跟把 AI 接进文档 + 数据库 + 自动化的工作面，留存差距是数量级的。

## 我的判断

国内办公协同的下一步竞争，不会发生在"谁的 AI 助手更聪明"这一层，而会发生在"谁的工作区先变成 agent 默认目的地"这一层。

飞书的位置最有戏，因为它的文档 + 多维表格 + 应用引擎已经接近 Notion 的产品抽象，且有字节内部 AI 投入兜底。如果飞书在 2026 年下半年放出 AI 工作台级别的 Developer Platform，把多维表格和文档同时开放给第三方 agent，这场仗能跟得上。

钉钉的难点是产品哲学的转向成本高，但它有阿里云和通义的资源。短期看更可能走"AI 助理 + 钉钉应用平台"的路径，把 agent 包装进既有的 AI 助理形态。

语雀和企业微信短期内不会变成 agent 工作面，前者太轻，后者太重。

对独立开发者和小团队而言，更值得关注的反而是开源路线。Affine、AppFlowy 这些 Notion-like 开源项目，下一波竞争如果能率先做出"插上 AI agent 就能跑"的开放接口，反而可能跑出来一个非主流的 agent 工作面。这是国内开发者真正能下场参与的窗口。

Notion 这次出招的意义，不在于它做了什么，而在于它把"文档是 agent 工作面"这个判断公开化了。

## 相关链接

- TechCrunch 报道，https://techcrunch.com/2026/05/13/notion-just-turned-its-workspace-into-a-hub-for-ai-agents/
- Notion Developer Platform 官方介绍，https://www.notion.com/product/developer-platform
- 飞书开放平台，https://open.feishu.cn/
- 钉钉开放平台，https://open.dingtalk.com/
- Affine 开源仓库，https://github.com/toeverything/AFFiNE
- AppFlowy 开源仓库，https://github.com/AppFlowy-IO/AppFlowy

---

本文不涉及境外软件访问教程，所有实操步骤均基于国内可合法访问的服务。

<!-- REACH (xhs): 8/10 | 品牌✓ 利益点✓ 可操作✓ -->
