# 散户每天看不完几十份研报，我让 dexter 帮我跑了一天

昨晚刷 GitHub Trending 看到 dexter 单日涨了 409 星，点进去发现作者是 virattt，就是之前那个 58k 星的 ai-hedge-fund 的人。这哥们换了个赛道，从"AI 模拟对冲基金团队"切到了"AI 帮你写财报研究"。

我下班路上就把它跑起来了，写一下到底有用没用。

## dexter 不是交易机器人，是研究机器人

很多人看到"金融 agent"第一反应是量化交易。先把这个混淆掐掉。

5 月初我刚写过 TradingAgents 二次出圈，那是多 agent 模拟基金经理 / 分析师 / 风控员开会下单的框架。再早一点的 FinRL 是强化学习量化。dexter 跟它们都不是一回事。

dexter 干的活是研究。读财报、查同业数据、整理新闻，然后吐一份你能直接读的研究备忘录。它不下单、不模拟基金、不做风控。

作者自己的形容是"Think Claude Code, but built specifically for financial research"。意思是把 Claude Code 那套 plan-act-reflect 循环搬过来，工具集换成金融数据 API。架构上它就是基于 Anthropic 的 Claude Agent SDK 写的，TypeScript，bun 跑。

23.5k 星了，409 只是当天的增量。社区热度是真的。

## 我跑了什么

我手头三只票，茅台、宁德时代、特斯拉。茅台和宁德是 A 股，特斯拉是美股。先说结论，A 股部分基本跑不通，美股完全 OK。

dexter 默认接的是 financialdatasets.ai 这家 API（作者另一个项目顺便做的数据源），覆盖的是美股 SEC 财报。Polygon 那种 ticker 你给它"600519.SS"它会愣住，给"TSLA"才认。

我让它跑特斯拉 Q1 财报对比上一季度的 capex 变化，prompt 写得很糙，就一句"Compare TSLA Q1 2026 capex with Q4 2025, explain the delta"。它自己规划了三步，先 fetch 两季度的 cash flow statement，再 diff 关键科目，再去搜了几条新闻佐证。整个跑下来大概 90 秒，输出一份带数字带引用的备忘录。

数字我手工核了一下，跟 SEC 10-Q 上的对得上。这点比让 Claude / GPT 直接回答强太多，直接问大模型财报数字，它会编。

## 国内散户怎么用，必须改数据源

A 股那条路要自己接。dexter 的 tool 层是 TypeScript 函数，financialdatasets.ai 客户端写在 src/tools 下。我看了下结构，再写一个 tushare 或 akshare 的 client 不算难，就是把同样的接口（getIncomeStatement / getBalanceSheet / getCashflow）实现一遍。

最省事的路径是这样。

港美股直接用，把 OPENAI_API_KEY 换成 OpenRouter 的 key，BASE_URL 指过去，就能跑 Claude / Gemini / DeepSeek。financialdatasets.ai 注册免费额度够个人玩。

A 股自己改，clone 下来在 src/tools 加个 akshare 的 wrapper，akshare 是 Python 库，但有人做了 Node.js 端口，或者你起个 Python 微服务给它调。这步我还没动，今晚试试。

如果你只是想看效果，先用美股票跑两天，看输出格式合不合自己的胃口，再决定要不要改 A 股。

## 成本是个真问题

README 没写成本估算，我自己看了下账单，跑一份茅台级别的深度研究备忘录（5-8 步规划、每步 1-2 个工具调用），用 claude-sonnet-4.5 大概 0.4 美元。一天跑 10 个票就是 4 美元，一个月 120 美元。

这个数字比一份卖方研报订阅是便宜得多。但比纯让 ChatGPT 帮你看财报贵不少，因为它在反复读全文。

省钱路径有两个。一个是 OpenRouter 上挂 DeepSeek-V3，单价能压到十分之一。但 DeepSeek 走 agent loop 时工具调用稳定性不如 Claude，作者 README 里也提了"建议 Claude Sonnet 4.5"，我跑过几次确实有差距。另一个是把"每日跑一次全部清单"改成"只跑财报发布日 / 重要新闻日的票"，事件触发比时间触发省 70% 以上。

## 跟 ai-hedge-fund 是什么关系

virattt 的两个项目其实是一条线。ai-hedge-fund 是"模拟一群基金经理 / 分析师吵架做决策"，偏游戏 / 教学。dexter 是"我是散户我没时间，你帮我读"，偏工具。前者炫，后者实用。

我个人更看好 dexter 这条路。模拟基金团队的演示效果好，但你真要照它的输出下单是要赔钱的，多 agent 投票出来的"买入"信号没有任何 alpha 保证，大模型对历史数据有偏差。研究 agent 不一样，它的输出是"这家公司财报里 capex 同比 +30% 了，主要在德州工厂"，这是事实陈述，对错可以验证，散户拿来当起点，自己再判断。

## 我的判断

dexter 这种工具替代不了卖方研报。卖方研报的价值在分析师跟管理层的关系、在行业经验、在偏见，这些 agent 都没有。但它能替代你"早上花 1 小时刷 10 份 SEC filings 摘要"的体力活。

对独立量化和小型 PM 来说，自己接一个 dexter 跑过夜，第二天早上看 markdown 清单，比订阅 Bloomberg Terminal 那一档便宜两个量级。对纯散户，跑一份你常关注的票的财报摘要，看看输出长什么样，能不能改变你"刷雪球评论"的研究流程。这个事不用想，今晚就装。

行动建议三步。clone 仓库（链接在末尾），用 OpenRouter key 跑一个美股票，比如 TSLA / NVDA，看输出。觉得有用，再考虑接 akshare 改 A 股。觉得没用，就当看了一个 trending 项目演示。

下一篇打算把 akshare 接进去之后再回来汇报，看看跑茅台财报到底什么效果。

## 相关链接

- dexter 仓库，https://github.com/virattt/dexter
- ai-hedge-fund（同作者），https://github.com/virattt/ai-hedge-fund
- Claude Agent SDK 文档，https://docs.anthropic.com/en/api/agent-sdk
- Financial Datasets API，https://financialdatasets.ai
- akshare 文档（A 股数据），https://akshare.akfamily.xyz

---

实体 [[dexter|dexter]] [[virattt|virattt]] [[anthropic|Anthropic]] [[claude-code|Claude Code]]
主题 [[ai-finance|AI 金融]] [[agent-frameworks|Agent 框架]] [[ai-research|AI 研究]]

<!-- REACH: 7/10 | 品牌弱（dexter 新但 Claude Agent SDK 强）✓ 利益点（省研报订阅、开源免费）✓ 可操作（clone 即跑）✓ -->
<!-- xhs_pass: true -->
