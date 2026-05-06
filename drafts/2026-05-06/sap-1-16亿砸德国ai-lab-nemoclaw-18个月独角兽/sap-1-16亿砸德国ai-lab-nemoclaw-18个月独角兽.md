# SAP 11.6 亿砸 18 个月的德国 AI lab，顺手把 openclaw 关在了 ERP 门外

5 月 5 日 TechCrunch 一条新闻把欧洲 AI 圈炸了一次。

SAP 宣布收购德国 Freiburg 的 Prior Labs，几乎全现金交割，三位创始人到手现金超过 5 亿美元，外加未来四年再追加 10 亿欧元（约 11.6 亿美元）投资。Prior Labs 成立才 18 个月，2025 年 2 月才完成 900 万欧元第一轮融资。

这是一家做"表格基础模型"的公司，旗舰开源模型 TabPFN 下载量过 300 万次，处理对象不是文本不是图像，是数据库里那种行列结构化数据。SAP 的客户每天面对的就是这种数据。

按融资节奏算，这家公司 18 个月内估值翻了不止 100 倍。整个欧洲 AI 圈最近一次出现这种节奏的本土并购，要追到 Mistral。

但真正值得讲的不是估值，是收购公告同一天 SAP 顺手做的另一个动作。

## SAP 押的不是模型，是"什么 agent 能进我家 ERP"

SAP 是全球最大的 ERP 厂商，财富 500 强里有 78% 的公司在用它。Joule 是 SAP 从 2023 年开始押的 AI 助手，最初定位是"让你用自然语言问 ERP"，但一直不温不火。

这次和 Prior Labs 收购同步，SAP 公布了 Joule 的新底层，**Nvidia Agent Toolkit**。这套 toolkit 就是 Nvidia 企业级 agent 框架 NemoClaw 的基础。

注意 NemoClaw 这个名字。它不是 Prior Labs 做的，也不是 SAP 做的，是 Nvidia 自家的企业 agent 平台，定位上是对标 openclaw 生态的那条 OpenClaw 主线。

TechCrunch 原文有一句话被很多中文转载漏掉了，"SAP is also prohibiting customers' agents use to a select few like Nvidia's NemoClaw"。翻成人话，SAP 通过 API 政策只放行少数几个"自己背书"的 agent 框架进入客户的 ERP 系统，NemoClaw 在白名单里，OpenClaw 被关在门外。

这就是为什么这场收购远比"SAP 又买了个 AI 公司"重要。SAP 等于在欧洲企业 ERP 这个口子上，**和 Nvidia 联手画了一道生态围墙**，把开源 agent 路线挡在外面。Prior Labs 的 11.6 亿是表面上的钱，"谁能在 SAP 客户的 ERP 上跑 agent"才是这次交易真正的标的。

## Prior Labs 凭什么值这个价

回到技术本身。

TabPFN 是一种叫"先验数据网络"（Prior-Data Fitted Network）的玩法。传统机器学习处理表格数据要先训练，TabPFN 是预训练好的，给一张陌生的表，它直接做分类和回归推理，不需要微调。Frank Hutter 这一系是德国 AutoML 老牌团队，论文 2022 年就上了 Nature 子刊。

对 SAP 来说，这个能力放进 ERP 里就是降维打击。客户的销售表、库存表、应收账款表，过去要数据科学家写脚本、训模型、调参数。TabPFN 直接吃表给答案，链路从周缩到秒。

11.6 亿换"未来 10 年 ERP 里所有表格智能由我家定义"，从 SAP 的角度算账其实不贵。

## 国内 ERP 这边的反射弧

SAP 在中国市场份额并不算高，但姿态会被用友、金蝶、浪潮这些国产 ERP 同行盯着看。

我的判断分三层。

第一层，**收购溢价不会被复制**。用友、金蝶手里没有 11.6 亿现金去砸一个 18 个月的 AI lab，国内 ERP 厂商更可能走"自研 + 合作国产大模型"的路子。用友 BIP 已经接了通义千问，金蝶云苍穹接了 DeepSeek，但合作深度跟 SAP 自己买下整支团队完全是两回事。

第二层，**"agent 白名单"这个动作国内一定会学**。SAP 用 API 政策圈定哪些 agent 能进客户系统，这个套路对国产 ERP 极有吸引力，既能保护自家 Joule 类产品的竞争地位，又能跟某家国产大模型厂商绑定形成生态。豆包、通义、DeepSeek 接下来一两年大概率会出现在某家国产 ERP 的"独家 agent 合作伙伴"位置上。

第三层，**表格基础模型这个方向被严重低估**。国内做 LLM 的厂商把注意力都放在文本和多模态，但真正能在企业落地的 80% 是表格、报表、明细账。Prior Labs 这次卖出 11.6 亿是个信号，国内做表格 AI 的小团队这两年应该会被资本重新看一眼。

## openclaw 生态这边的处境

这条线对本号长期跟踪的 openclaw 生态来说不是好消息。

SAP + Nvidia 这次是企业级 agent 战场的第一道明显围墙。Nvidia 的 NemoClaw 拿到 SAP ERP 的独家入口，等于在"agent 进企业系统"这件事上抢到了一个非常稳的渠道。openclaw 主打的开放生态、社区驱动、模型可替换，这些优势在 ERP 这种重合规、重渠道的场景里被绕开了。

不过反过来想，企业 ERP 不是 openclaw 的主战场。clawhub、clawdbot、moltbot 这些走的是开发者和创作者市场，跟 SAP 客户基本不重叠。短期影响有限。

但这个信号要记住，**当一个 agent 框架开始和大客户做"独家入口"绑定时，其他框架就只能去抢剩下的市场**。Salesforce、Oracle、Workday 这些会不会跟进做类似的动作，是接下来半年值得盯的事。

如果 Salesforce 也搞一个"Einstein 独家 agent 框架"把 openclaw 关在门外，那这就不是个例，是新趋势。

## 我留意的下一步

11.6 亿这个数字会让 Prior Labs 的论文作者圈里其他几位德国 AutoML 研究者立刻被资本盯上。Frank Hutter 那一脉的 AutoGluon、auto-sklearn 团队还有几个分支，值得跟。

国内对应的方向，先看哪家国产 ERP 在 2026 年下半年公布"agent 生态白名单"。这一步谁先走，谁就拿到了"中国版 SAP-Nvidia"的位置。

留个开放问题，如果你是用友或金蝶的产品负责人，看到这个新闻第一反应是去找 DeepSeek 还是去找通义？欢迎留言。

## 相关链接

- TechCrunch 原文，https://techcrunch.com/2026/05/05/sap-bets-1-16b-on-18-month-old-german-ai-lab-and-says-yes-to-nemoclaw/
- Prior Labs TabPFN 开源仓库，https://github.com/PriorLabs/TabPFN
- Nvidia NemoClaw 介绍，https://developer.nvidia.com/nemo
- SAP Joule 官方介绍，https://www.sap.com/products/artificial-intelligence/ai-assistant.html

相关实体 [[sap|SAP]] [[nemoclaw|NemoClaw]] [[prior-labs|Prior Labs]] [[nvidia|Nvidia]] [[yongyou|用友]] [[kingdee|金蝶]]

相关主题 [[ai-mergers|AI 行业并购]] [[enterprise-ai|企业 AI]] [[chinese-enterprise|国内 ERP]]

<!-- REACH: 8/10 | 品牌✓ 利益点✓ 可操作✓ -->
<!-- xhs_pass: true -->
