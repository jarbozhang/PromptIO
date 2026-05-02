# TradingAgents 一夜涨 2112 星，二次出圈背后是 v0.2.4 接入了 DeepSeek 和 Qwen

4 月 30 日 GitHub Trending 上，TradingAgents 单日 +2112 星。

这是它今年第二次冲到首页。第一次是 4 月中旬，靠一条推文，年化 30.5% 的截图，从 0 飙到 5 万星。当时我们写过一篇，话讲完了，多 Agent 编排、看多看空辩论、风控否决，框架很漂亮，但跑的是模拟盘。

按经验，这种项目第一波热度过完，star 曲线会进入慢爬升的衰减区。它没有。半个月后，它又被推回 Trending 第二位。

今天这条线值得追一下，因为这次不是一条爆款推文带的。

## 4 月 25 日，v0.2.4 上线

把 release 列表拉一遍，节奏一下子清楚了。

v0.2.0 到 v0.2.3，从 2 月到 3 月底，节奏是月更，每次加点 LLM provider、加点输出格式。直到 v0.2.4，4 月 25 日发布，是这个项目自开源以来最重的一次更新。

我对着 changelog 数了一下，至少有四件大事同时落地。

一是把 Trader、Research Manager、Portfolio Manager 三个核心决策 Agent 全部改造成结构化输出（structured output），用 Pydantic schema 强约束返回类型，不再依赖正则解析 markdown。买入、增持、持有、减持、卖出，五档评级在所有 provider 之间统一。

二是 LangGraph checkpoint resume，crash 之后能从断点续跑，state 落到 SQLite。这个对真实跑长链路有实际意义，半小时的多 Agent 决策跑到一半 OOM，以前只能从头再来。

三是把 per-agent 的 BM25 memory 换成持久化决策日志，每次决策落盘，下次带着历史上下文进来。作者的说法是消除"虚构记忆"，之前的 BM25 检索经常拼出不存在的过往决策。

四是新增 provider，四家。DeepSeek、Qwen（阿里 DashScope）、GLM（智谱）、Azure OpenAI。

第四件事，是这次涨星的真正发动机。

## 国产三巨头同天进 provider 列表

4 月 21 日那篇文章里，我专门提了一段，说 TradingAgents 当时已经支持 DeepSeek 和 Qwen，但实际上是社区 PR 拼接的，配置散落在不同分支，并不是官方一等公民。

v0.2.4 把它们正式收编进主线。DeepSeek、Qwen、GLM 三家，配置变成和 OpenAI 同一级，pip install 完直接能选。

那结果会怎样。

一个上海或者深圳的散户，clone 仓库、配一个 DeepSeek key、跑一个完整的多 Agent 决策流，全过程不需要 OpenAI 账号、不需要海外信用卡、不需要任何境外服务。

成本同步下来。我把 v0.2.3 时代用 GPT-5.4 + Claude 4.6 的单标的开销估过，一个交易日 2 到 5 美元。换成 DeepSeek-V3.5 全链路，按现在 DeepSeek 的官网定价，单标的成本掉到 0.1 到 0.3 元人民币。差了一个半数量级。

这不是"功能多了一项"，是这个项目对中国用户的可用门槛被砍掉了一大段。

## 涨星曲线是怎么走的

v0.2.4 是 4 月 25 日发的，当天 commit log 一口气推了 7 个，包括 release tag。

之后五天，star 曲线慢慢加速。到 4 月 30 日单日 +2112，是这个项目历史第二大单日涨幅，仅次于 4 月中旬那条 Huanusa 推文带的一波。

但这次没有对应的爆款推文。我翻了 X，没找到一条同时段的高互动单条把它带飞。issue 区是另一种证据。最近七天新开的 issue 里，混进来一条标题是"snake game"、一条"traiding"拼错单词、一条只写了"TITLE SAYS IT ALL ..... IS THIS THE NEW CRAMER?"，还有一个空 issue。这是典型的中文圈和小白用户涌入特征，平时写代码 issue 的人不会留这种东西。

5 月 2 日凌晨，issue #651 出来，标题"DeepSeek latest models (V4 Flash / Pro)"，请求支持 DeepSeek 最新版本。这条 issue 把整个传播路径基本钉死，新增的关注者里，相当一部分是冲着 DeepSeek 来的。

## 读者该不该跟

我不打算给你一个"现在就跑"或者"再等等"的答案，这种二元判断在这个项目上没意义。

但有几件事可以现在就做。

第一，如果你 4 月那波装过一次然后放下了，值得 git pull 重跑。从 v0.2.3 到 v0.2.4 不是小修小补，是把整套决策链路换了底层。结构化输出之后，agent 之间传递的信号噪声明显下降，跑出来的辩论记录能直接读，不用再在 markdown 里挖关键句。

第二，把模型全换成国产组合再跑一遍。我手上还没跑完一个完整对照，但凭直觉，DeepSeek 当 Trader、Qwen-Max 当 Research Manager、GLM 当风控这种组合，应该比之前默认的 GPT-5.4 全栈更有意思。理由是这三家训练数据里中文研报和 A 股新闻的密度，比 OpenAI 高一个量级。一个判断 A 股个股的 Agent 系统，用见过更多 A 股语料的模型，逻辑上是合理的。

第三件事，看那份持久化决策日志。这是 v0.2.4 最被低估的一个改动。以前你跑完一次决策，agent 的记忆扔在内存里，下次启动一切归零。现在每次决策、每次反思都落盘，意味着你可以把它当一个长期投研助手养着，跑一个月之后回头看它的判断序列，对照真实行情，找出它在哪些场景系统性犯错。

这个用法，比直接让它替你下单要稳得多。

## 写在最后

二次涨星这件事，可以拿来当一个观察样本。

一个开源项目第一次出圈靠的是社交媒体引爆，一条好截图、一个大 V 转发，从 0 到 5 万星只需要 72 小时。但这种热度衰减得也快。

第二次出圈，靠的不是话题，是产品本身。一次扎实的版本更新，一次对真实用户痛点的回应（"我不想用 OpenAI"），一次基础设施层的兼容（结构化输出 + 持久化记忆），就够撬动第二波。

第一波是流量逻辑，第二波是产品逻辑。

下一次 v0.2.5 会带什么，issue 区已经在替作者排队，DeepSeek V4 thinking mode 的支持 commit 5 月 1 日已经合进 main。

要追这条线的人可以现在就把仓库加 watch，下一波涨星不会等太久。

## 相关链接

- TradingAgents 仓库，https://github.com/TauricResearch/TradingAgents
- v0.2.4 release notes，https://github.com/TauricResearch/TradingAgents/releases/tag/v0.2.4
- DeepSeek API 文档（国内可直接调用），https://api-docs.deepseek.com/
- 通义千问 DashScope 控制台，https://dashscope.console.aliyun.com/
- 智谱 GLM 开放平台，https://open.bigmodel.cn/

---
相关实体:: [[tradingagents|TradingAgents]] | [[tauric-research|TauricResearch]]
相关主题:: [[ai-finance|AI 金融]] | [[agent-frameworks|Agent 框架]] | 国产AI

<!-- REACH: 8/10 | 品牌✓ 利益点✓ 可操作✓ -->
