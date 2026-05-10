---
相关实体:: [[anthropic|Anthropic]] | [[spacex|SpaceX]] | [[xai|xAI]] | [[elon-musk|Elon Musk]] | [[alibaba-cloud|阿里云]] | [[volcano-engine|火山引擎]]
相关主题:: [[ai-mergers|AI 行业并购]] | [[ai-hardware|AI 硬件]]

<!-- REACH: 9/10 | 品牌✓ 利益点✓ 可操作✗ -->
---

# Anthropic 跟 SpaceX 签 50 亿美元 / 年算力大单 300MW Colossus I，xAI 输给自己人

5 月 6 日，Anthropic 在自家开发者大会上官宣，跟 SpaceX 签了一份算力协议，拿下 Colossus 1 数据中心 300MW 以上的全部容量，折算 22 万张以上 NVIDIA GPU，一个月内全部上线。

Hacker News 当天 507 点 480 评论。Reddit r/ClaudeCode 那个帖子的第一条高赞评论是 "Doesn't this mean SpaceX/grok over build for their demand?"。

这是一个所有人都能闻出味道、但没人在官方稿里点破的问题。

## Colossus 1 是谁的

先把三家关系理清楚，因为后面所有判断都建立在这一层上。

Colossus 1 是 xAI 在孟菲斯建的训练集群，原本跑 Grok。SpaceX 是 Musk 控股的另一家公司，跟 xAI 法律上独立，业务上经常被一起讨论，因为同一个老板、同一拨投资人、相互之间有大量交叉持股。Anthropic 是 Claude 的开发商，跟前两家此前没有任何业务往来。

这次官宣里 Anthropic 把交易对手写成 SpaceX，不是 xAI。Musk 在 X 上的解释是，"I was ok leasing Colossus 1 to Anthropic, as SpaceXAI had already moved training to Colossus 2"。Simon Willison 5 月 7 日那篇 notes 直接把"SpaceX"和"xAI"当成一回事写成了 "SpaceXAI"。

翻译过来，就是 xAI 早就把训练任务挪到更大的 Colossus 2（评论区估算大约 50 万张 Blackwell），腾出来的 Colossus 1 整套基础设施转手租给 Anthropic 做推理。SpaceX 出面签合同，但实际上是 Musk 把自己 AI 公司用旧的算力卖给了对手。

## 5B/年这个数字怎么来的

Anthropic 官方稿里没写金额，只列了一组对照，AWS 5GW、Google 5GW、Microsoft/NVIDIA Azure 300 亿美元、Fluidstack 500 亿美元、SpaceX 300MW。

50 亿美元 / 年是 Latent Space 在 [AINews] 5 月 7 日那篇里给出的估算，按 300MW 全年运行的电费加 GPU 租赁费倒推。这数字不是合同价，是分析师推算的等效年化成本。

但这个数量级有意义。对比之下 Microsoft 给 OpenAI 的算力承诺是 300 亿美元 / 年量级，AWS 给 Anthropic 的是 5GW 长协。50 亿美元 / 年单独看不算大单，但跟"用旧的、Anthropic 现金支付、SpaceX 还能再卖一遍"放在一起看，性质就完全不同。

## Anthropic 为什么必须签

Dario 在开发者大会上给的数字是 "usage grew ~80x unexpectedly"，按年化算就是 8000% ARR 增长。Reddit r/Verdent 那个帖子的评价更直接，"They've been quietly lowering limits for months. Users noticed. The product felt dumber. Claude Code got pulled from Pro plans."

Claude Code 用户能感知到的限速、Opus API 的额度收紧、Pro 计划阶段性砍掉 Claude Code，全部是同一个原因，推理算力不够。

签完 SpaceX 之后，Anthropic 当天就把 Pro/Max/Team/Enterprise 的 Claude Code 5 小时窗口配额翻倍，撤销 Pro 和 Max 的高峰期降速，Opus API 额度上调。这不是营销动作，是供给侧约束一解除立刻把压抑的需求释放出来。

## 对国内云厂商那结果会怎样

这是国内读者真正需要关心的部分。

阿里云、火山引擎、腾讯云这两年在大模型 API 分发上一直有个潜在选项，能不能像 OpenRouter 那样接入 Anthropic 模型，给国内开发者提供合规通道。这条路在技术上从来不是问题，问题在 Anthropic 怎么部署它的算力。

Anthropic 此前的算力主要在 AWS（Trainium 长协）、Google（TPU）和 Azure（Microsoft 投资）。理论上只要 Anthropic 愿意，模型权重可以授权给任何区域的云合作方做推理部署，国内厂商接 Bedrock 中转也好、走单独私有部署也好，都有谈判空间。

签完 SpaceX 之后，逻辑变了。Anthropic 把增量推理算力锁在了 Musk 的孟菲斯数据中心。这个数据中心因为天然气涡轮机供电、被环保组织起诉过，本身就处在监管聚光灯下。Musk 个人对中国市场的态度（特斯拉除外）也跟微软、亚马逊不一样。

短期看，国内云厂商接 Anthropic 模型分发的可能性比上个月又低了一档。Anthropic 自己都在为推理产能挣扎，没有余力切出一块给一个监管不确定、政治敏感、还要分润的中国市场。

中期看，国内开发者用 Claude 的合规路径还是只剩两条。一是通过国际版的国内代理（合规风险长期存在），二是等国产替代追上来。DeepSeek、Kimi、智谱在 coding agent 方向已经开始追，OpenRouter 上 DeepSeek V3 调用量过去三个月翻了几倍。国产模型不是替代品的问题，是必需品的问题。

## 我的判断

这桩交易最反直觉的地方在于，Musk 一边在打 OpenAI 的官司、一边在 X 上吐槽 Anthropic，一边把自己 AI 公司用过的旧算力高价租给 Anthropic 续命。商业上完全合理，xAI 不需要的产能闲着也是闲着，Anthropic 是市场上少数付得起钱的客户。但这件事说明的不是 Musk 和 Dario 和解了，是前沿大模型公司的算力瓶颈已经严重到能让两个公开互斥的 CEO 暂时绑在一起。

我认为对国内的实操意义有三条。第一，别再期待 Anthropic 模型短期内通过任何主流云厂商进入国内合规市场，这条线在 5 月 6 日之后实质性变窄了。第二，Claude Code 用户接下来几个月体验会明显回升，配额翻倍是真的，但这不改变长期定价权在 Anthropic 一边的事实。第三，国内 coding agent 用户认真评估一下国产模型矩阵，DeepSeek V3、Kimi K2、GLM-4.5 在 coding 任务上的差距比一年前小得多，跟 OpenRouter 的国产模型路由结合起来，是当前最稳的路径。

Willison 在那篇 notes 末尾写了一句，"Sounds like a new form of supply chain risk"。Musk 保留了"按自己标准随时收回算力"的权利，这对 Anthropic 是风险，对国内开发者反而是确认信号，依赖任何单一前沿模型都是风险，国产路径不是备胎，是主路。

## 相关链接

- Anthropic 官方公告，https://www.anthropic.com/news/higher-limits-spacex
- Latent Space [AINews] 详细分析，https://www.latent.space/p/ainews-anthropic-spacexais-300mw5byr
- Simon Willison 的 notes，https://simonwillison.net/2026/May/7/xai-anthropic/
- Hacker News 讨论，https://news.ycombinator.com/item?id=48037986

<!-- REACH: 9/10 | 品牌✓ 利益点✓ 可操作✗ -->
<!-- xhs_pass: false, reasons: [标题包含"xAI 输给自己人"含拉踩意味, 涉及境外厂商深度分析] -->
