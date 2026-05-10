# Anthropic 跟 SpaceX 签 50 亿美元/年算力大单，xAI 与 Anthropic 算力路径分流

5 月 6 日 Anthropic 在自家开发者大会官宣，跟 SpaceX 签了一份算力协议，拿下 Colossus 1 数据中心 300MW 以上的全部容量，折算 22 万张以上 NVIDIA GPU，一个月内全部上线。

Hacker News 当天 507 点 480 评论，Reddit r/ClaudeCode 第一条高赞评论问了一句很有意思的话，"Doesn't this mean SpaceX/grok over build for their demand?"

这事在官方稿里没人点破，但味道很冲。

## Colossus 1 是谁的

先把三家关系理清楚。

Colossus 1 是 xAI 在孟菲斯建的训练集群，原本跑 Grok。SpaceX 是 Musk 控股的另一家公司，跟 xAI 法律上独立、业务上经常被一起讨论，因为同一个老板、同一拨投资人、相互交叉持股。Anthropic 是 Claude 的开发商，跟前两家此前没有任何业务往来。

这次官宣里 Anthropic 把交易对手写成 SpaceX，不是 xAI。Musk 在 X 上的解释是，"I was ok leasing Colossus 1 to Anthropic, as SpaceXAI had already moved training to Colossus 2"。Simon Willison 5 月 7 日那篇 notes 直接把"SpaceX"和"xAI"写成 "SpaceXAI"。

翻译一下，xAI 早就把训练任务挪到更大的 Colossus 2（评论区估算大约 50 万张 Blackwell），腾出来的 Colossus 1 整套基础设施转手租给 Anthropic 做推理。SpaceX 出面签合同，实际上 Musk 把自家 AI 公司用旧的算力租给了另一家前沿模型公司。

## 50 亿美元/年这个数字怎么来的

Anthropic 官方稿没写金额，只列了一组对照，AWS 5GW、Google 5GW、Microsoft/NVIDIA Azure 300 亿美元、Fluidstack 500 亿美元、SpaceX 300MW。

50 亿美元/年是 Latent Space 在 [AINews] 5 月 7 日那篇里的估算，按 300MW 全年运行电费加 GPU 租赁费倒推。这数字不是合同价，是分析师推算的等效年化成本。

但数量级有意义。Microsoft 给 OpenAI 的算力承诺是 300 亿美元/年量级，AWS 给 Anthropic 的是 5GW 长协。50 亿美元/年单独看不算大单，但跟"用旧的、Anthropic 现金支付、SpaceX 还能再卖一遍"放一起看，性质就完全不同。

## Anthropic 为什么必须签

Dario 在开发者大会给的数字是 "usage grew ~80x unexpectedly"，按年化算就是 8000% ARR 增长。Reddit 上很多 Claude Code 用户能感知到的限速、Opus API 额度收紧、Pro 计划阶段性砍掉 Claude Code，原因都指向同一个，推理算力不够。

签完 SpaceX 当天 Anthropic 就把 Pro/Max/Team/Enterprise 的 Claude Code 5 小时窗口配额翻倍，撤销 Pro 和 Max 的高峰期降速，Opus API 额度上调。这不是营销动作，是供给侧约束一解除立刻把压抑的需求释放出来。

## 对国内开发者意味着什么

这是真正需要关心的部分。

阿里云、火山引擎、腾讯云这两年一直有个潜在选项，接入 Anthropic 模型给国内开发者提供合规通道。这条路在技术上从来不是问题，问题在 Anthropic 怎么部署它的算力。

签完 SpaceX 之后，Anthropic 把增量推理算力锁在了 Musk 的孟菲斯数据中心。这个数据中心因为天然气涡轮机供电、被环保组织起诉过，本身处在监管聚光灯下。Musk 个人对中国市场的态度（特斯拉除外）也跟微软、亚马逊不一样。

短期看，国内云厂商接 Anthropic 模型分发的可能性比上个月又低了一档。Anthropic 自己都在为推理产能挣扎，没有余力切出一块给中国市场。

中期看，国产替代是必修课。DeepSeek、Kimi、智谱在 coding agent 方向已经开始追，DeepSeek V3 在 OpenRouter 上的调用量过去三个月翻了几倍。国产模型不是替代品的问题，是必需品的问题。

## 我的判断

这桩交易最反直觉的地方在于，Musk 一边在打 OpenAI 的官司、一边在 X 上吐槽 Anthropic，一边把自家 AI 公司用过的旧算力租给 Anthropic。商业上完全合理，xAI 不需要的产能闲着也是闲着，Anthropic 是市场上少数付得起钱的客户。这件事说明的不是 Musk 和 Dario 和解了，是前沿大模型的算力瓶颈已经严重到能让两个公开互斥的 CEO 暂时绑在一起。

对国内开发者的实操意义有三条。

第一，别再期待 Anthropic 模型短期内通过主流云厂商进入国内合规市场，这条线在 5 月 6 日之后实质性变窄了。

第二，Claude Code 用户接下来几个月体验会明显回升，配额翻倍是真的，但这不改变长期定价权在 Anthropic 一边的事实。

第三，认真评估国产模型矩阵。DeepSeek V3、Kimi K2、GLM-4.5 在 coding 任务上的差距比一年前小得多，跟 OpenRouter 的国产模型路由结合起来，是当前最稳的路径。

Willison 在 notes 末尾写了一句，"Sounds like a new form of supply chain risk"。Musk 保留了"按自己标准随时收回算力"的权利，这对 Anthropic 是风险，对国内开发者反而是确认信号，依赖任何单一前沿模型都是风险，国产路径不是备胎，是主路。

## 相关链接

- Anthropic 官方公告，https://www.anthropic.com/news/higher-limits-spacex
- Latent Space [AINews] 详细分析，https://www.latent.space/p/ainews-anthropic-spacexais-300mw5byr
- Simon Willison 的 notes，https://simonwillison.net/2026/May/7/xai-anthropic/
- Hacker News 讨论，https://news.ycombinator.com/item?id=48037986

---

本文不涉及境外软件访问教程，所有实操步骤均基于国内可合法访问的服务。

<!-- REACH (xhs): 8/10 | 品牌✓ 利益点✓ 可操作✓ -->
