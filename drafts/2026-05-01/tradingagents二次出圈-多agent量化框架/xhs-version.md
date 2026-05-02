# TradingAgents 一夜涨 2112 星，这次是 v0.2.4 接进了 DeepSeek 和 Qwen

4 月 30 日 GitHub Trending 上，TradingAgents 单日 +2112 星，半个月内第二次冲到首页。

第一次是 4 月中旬，靠一条年化截图飙到 5 万星。多 Agent 编排、看多看空辩论、风控否决，框架很漂亮，但跑的是模拟盘。按经验，这种项目第一波热度过完，star 曲线会慢慢衰减。

它没有，这次还涨得更猛。今天我把这条线追了一下。

## 4 月 25 日，v0.2.4 是分水岭

把 release 列表拉一遍，节奏一下子清楚了。v0.2.0 到 v0.2.3 月更，每次加一两个小功能。v0.2.4 是开源以来最重的一次更新，至少四件大事同时落地。

一是 Trader、Research Manager、Portfolio Manager 三个核心决策 Agent 全部改造成结构化输出，用 Pydantic 强约束返回类型。买入、增持、持有、减持、卖出五档评级在所有 provider 之间统一，不再依赖正则解析 markdown。

二是 LangGraph checkpoint resume，crash 之后能从断点续跑，state 落到 SQLite。半小时的多 Agent 决策跑到一半 OOM，以前只能从头再来。

三是把 per-agent 的 BM25 memory 换成持久化决策日志，每次决策落盘，下次带着历史上下文进来。作者的说法是消除"虚构记忆"。

四是新增四家 provider，DeepSeek、Qwen（阿里 DashScope）、GLM（智谱）、Azure OpenAI。第四件事，是这次涨星的真正发动机。

## 国产三家同天进 provider 列表

之前 TradingAgents 也能配 DeepSeek 和 Qwen，但是社区 PR 拼接的，配置散落在不同分支，不是官方一等公民。v0.2.4 把它们正式收编进主线，DeepSeek、Qwen、GLM 三家配置和 OpenAI 同一级，pip install 完直接选。

意味着什么呢，国内用户 clone 仓库、配一个 DeepSeek key，跑一个完整的多 Agent 决策流，全程不需要海外账号、不需要海外信用卡。

成本也跟着掉。v0.2.3 时代用 GPT-5.4 + Claude 4.6 全栈，单标的一个交易日 2 到 5 美元。换成 DeepSeek-V3.5 全链路，按 DeepSeek 官网定价，单标的成本 0.1 到 0.3 元人民币，差了一个半数量级。

这不是多了个功能，是这个项目对中国用户的可用门槛被砍掉一大段。

## 涨星曲线的反常

v0.2.4 是 4 月 25 日发的，之后五天 star 曲线慢慢加速，到 4 月 30 日单日 +2112，是项目历史第二大单日涨幅。

但这次没有对应的爆款推文。我翻了 X，没找到一条同时段的高互动单条把它带飞。issue 区是另一种证据，最近七天新开的 issue 里混进来一条标题是"snake game"、一条"traiding"拼错单词、还有一个空 issue。这是中文圈和小白用户涌入特征，平时写代码的人不会留这种东西。

5 月 2 日凌晨 issue #651 出来，标题"DeepSeek latest models (V4 Flash / Pro)"，把整个传播路径基本钉死，新增关注者相当一部分是冲着 DeepSeek 来的。

## 三件事可以现在做

我不打算给你"现在就跑"或者"再等等"的二元判断，这种判断在这个项目上没意义。但有几件事可以现在动手。

第一，4 月那波装过然后放下了，值得 git pull 重跑。从 v0.2.3 到 v0.2.4 不是小修小补，是把整套决策链路换了底层。结构化输出之后，agent 之间传递的信号噪声明显下降。

第二，把模型全换成国产组合再跑一遍。DeepSeek 当 Trader、Qwen-Max 当 Research Manager、GLM 当风控这种组合，理由是这三家训练数据里中文研报和 A 股新闻的密度比海外模型高。判断 A 股个股的 Agent，用见过更多 A 股语料的模型，逻辑上是合理的。

第三，看那份持久化决策日志。这是 v0.2.4 最被低估的改动。以前跑完一次决策 agent 记忆扔在内存里，下次启动归零。现在每次决策、反思都落盘，可以把它当一个长期投研助手养着，跑一个月之后回头看判断序列，对照真实行情，找出它在哪些场景系统性犯错。

这个用法，比直接让它替你下单要稳得多。

## 我的判断

第一次出圈靠社交媒体引爆，72 小时从 0 到 5 万星，热度衰减得也快。第二次出圈靠的是产品本身，一次扎实的版本更新、一次对真实用户痛点的回应（"我不想用海外 API"）、一次基础设施层的兼容（结构化输出 + 持久化记忆），就够撬动第二波。

第一波是流量逻辑，第二波是产品逻辑。

下一波 v0.2.5 会带什么，issue 区已经在替作者排队，DeepSeek V4 thinking mode 的支持 commit 5 月 1 日已经合进 main。

要追这条线的人现在就可以把仓库加 watch。

## 相关链接

- TradingAgents 仓库，https://github.com/TauricResearch/TradingAgents
- v0.2.4 release notes，https://github.com/TauricResearch/TradingAgents/releases/tag/v0.2.4
- DeepSeek API 文档（国内可直接调用），https://api-docs.deepseek.com/
- 通义千问 DashScope 控制台，https://dashscope.console.aliyun.com/
- 智谱 GLM 开放平台，https://open.bigmodel.cn/

---

本文为技术框架分享，不构成任何投资建议。量化策略历史回测不代表未来收益，实盘需自行承担风险。本文不涉及境外软件访问教程，所有实操步骤均基于国内可合法访问的服务。

<!-- REACH (xhs): 8/10 | 品牌✓ 利益点✓ 可操作✓ -->
