OpenAI 上个月干了件狠事，把 Sora 直接砍了，连带一笔 10 亿美元的迪士尼合作也没了。不是因为产品不行，是因为 Sora 每天烧掉 1500 万美元的推理费用，整个生命周期收入才 210 万美元。

一个月烧 4.5 亿，一辈子赚 210 万。这笔账谁都算得过来。

上周 The Verge 的 Decoder 播客做了一期深度分析，聊的就是这个问题，AI 公司正在面临一个"盈利悬崖"。几千亿美元砸进去了，利润还没影。Anthropic 和 OpenAI 的应对策略完全不同，但都指向同一个方向，赶紧上市。

## 数字有多离谱

先看 Anthropic。年化收入（ARR）刚刚突破 300 亿美元，比 2025 年底的 90 亿翻了三倍多。再看 OpenAI，2 月份的 ARR 是 250 亿美元，比去年底的 214 亿增长了 17%。

增速差距一目了然。

但收入高不代表赚钱。OpenAI 预计 2026 年亏损 140 亿美元，而且不是暂时的，他们预测 2028 年光算力支出就要 1210 亿美元，那一年亏损预计是 850 亿。盈利？要等到 2030 年。

Anthropic 情况稍好，预计 2028 或 2029 年盈亏平衡，2029 年利润目标 600 亿。但训练成本峰值也要 300 亿。

这些数字我第一次看到的时候愣了三秒。600 亿利润听起来很美，但前提是你得先活到那一天。

## 砍产品、改定价，都是为了一件事

为什么突然这么急？因为 AI Agent 把商业模型炸了。

传统的 chatbot 模式，用户问一句答一句，token 消耗可控。但 Agent 不一样，Claude Code、OpenAI Codex 这些工具会自主地连续调用模型、读写文件、执行代码，一次任务可能烧掉过去一整天的 token 量。

Anthropic 上周刚做了一个决定，不再允许 Claude Pro 和 Max 订阅用户通过 OpenClaw（一个开源 Agent 框架）白嫖算力。之前的情况是，200 美元一个月的 Max 订阅，有人拿去跑价值 1000 到 5000 美元的 Agent 任务。超过 13.5 万个 OpenClaw 实例在订阅套餐里运行，套餐价和实际成本差了五倍以上。

Boris Cherny，Anthropic 负责 Claude Code 的人，在 X 上说得很直白，订阅从来不是为这种持续自动化消耗设计的。

OpenAI 这边更激进。砍 Sora、放弃迪士尼、把精力全押在 Codex 上。一位 OpenAI 高管对记者说了一句话我觉得特别有意思，"我们不能因为 side quest 而错过这个时刻"。

Side quest。视频生成在 OpenAI 眼里已经是支线任务了。

## 两家公司，两条路

坦率讲，Anthropic 和 OpenAI 的策略分歧其实反映了它们完全不同的收入结构。

Anthropic 有 80% 的收入来自企业客户。Claude Code 单独就贡献了超过 25 亿美元的年化收入。这是一个 B2B 为主的生意，客户粘性强，ARPU 高，但增长上限取决于企业 IT 预算的天花板。

OpenAI 不一样。它有 ChatGPT 这个巨大的消费者入口，9 亿用户，但只有 5% 在付费。Codex 的周活跃用户从三个月前到现在涨了 5 倍，达到 200 万，月环比增长 70%。增长曲线很漂亮，但消费者业务的单位经济模型一直是个噩梦。

两家都在往 IPO 冲。Anthropic 正在和高盛、摩根大通谈判，目标是今年 10 月上市，融资 600 亿美元以上，估值可能到 4000-5000 亿。OpenAI 也瞄准了 2026 年底。两家都想抢先上市，因为机构投资者的资金池是有限的，先上的那个能拿到更好的配置。

## 我的判断

说实话我也不确定谁会赢，但有几件事我比较有把握。

Anthropic 目前的位置更健康。B2B 为主的收入结构意味着它不需要烧钱补贴消费者，Claude Code 的产品力让它在开发者市场有了真正的护城河。300 亿 ARR 里面有真金白银的企业合同，不是一群薅羊毛的免费用户。

OpenAI 的问题更大。9 亿用户、5% 付费率，这个数字在任何投资人看来都是双刃剑。你可以说"转化空间巨大"，也可以说"95% 的人觉得不值得付钱"。砍 Sora 是对的，但这说明它之前的资源分配出了问题。

我认为 Agent 时代会彻底重塑 AI 公司的定价模型。订阅制在 Agent 面前是不可持续的，因为 Agent 的计算消耗完全不可预测。Anthropic 强制 OpenClaw 用户转 API 计费，这不是"收割"，这是活下去的唯一办法。以后所有 AI 公司都会走向按用量计费，固定月费的好日子到头了。

可能有些想法还不成熟，但我觉得这一轮 IPO 潮的本质不是"AI 公司很值钱所以去上市"，而是"不上市就没钱继续亏了"。这是一个关键区别。投资人给的钱在烧完，二级市场是最后的弹药库。

谁先上、谁估值更高，这些都是表面文章。真正的问题是，2029 年之前，这两家公司到底能不能证明 AI 是一门可以盈利的生意。

如果不能，那今天所有的估值都是空中楼阁。

## 相关链接

- [The Verge Decoder 播客原文](https://www.theverge.com/podcast/909042/ai-monetization-cliff-anthropic-openai-profitable-ai-existential-moment)
- [Anthropic 超越 OpenAI 收入分析](https://www.the-ai-corner.com/p/anthropic-30b-arr-passed-openai-revenue-2026)
- [OpenAI IPO 时间线与估值](https://www.techi.com/openai-ipo/)
- [Anthropic Claude Code 定价调整详情](https://techcrunch.com/2026/04/04/anthropic-says-claude-code-subscribers-will-need-to-pay-extra-for-openclaw-support/)
- [OpenAI 关停 Sora 始末](https://techcrunch.com/2026/03/29/why-openai-really-shut-down-sora/)

---
相关实体:: [[openai|OpenAI]] | [[anthropic|Anthropic]] | [[claude-code|Claude Code]] | [[codex|Codex]]
相关主题:: [[ai-pricing|AI定价]]

<!-- REACH: 7/10 | 品牌✓ 利益点✗ 可操作✗ -->
