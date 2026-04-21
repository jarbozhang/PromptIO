# n8n 冲到 18.4 万星，我用它替掉了 Zapier 和半个 Dify

先说结论。上周我把公司内部三条自动化流程，全部从 Zapier 搬到了 n8n。月账单从 79 美元归零，流程反而更复杂了，还顺手接进了本地 Ollama。

这玩意儿在 GitHub 上已经 184891 颗星，超过 Vue、超过 Django，排进全球 TypeScript 项目前列。但在中文世界，它的知名度甚至比不上 Dify 和 Coze。

这就是我今天想聊的事。

## 这玩意儿到底是什么

n8n 读作"n-eight-n"，node eight node，名字本身就是一个工程师笑话。

定位一句话，可视化工作流自动化平台，自带 AI 原生能力。你可以把它想成一个开源自托管版的 Zapier，但是又能跑 LangChain Agent，还能写 JavaScript 和 Python。

三个关键词，可视化、自托管、AI 节点。

可视化指的是你在浏览器里拖拖拽拽就能连起一条流程，左边一个 Gmail 触发器，中间接一个 OpenAI 节点让 Claude 读邮件分类，右边把分类结果写进 Notion 数据库。整个过程不用写一行代码。

自托管才是真正的杀招。Docker 一条命令起服务，数据全在自己机器上。对接公司内网、处理敏感数据、调私有 API，这些 Zapier 根本做不了的事，n8n 开箱即用。

AI 节点这块我后面单独拆。

## 它凭什么跟 Zapier 打

Zapier 这些年的问题大家心知肚明，贵，而且越来越贵。

Zapier 的 Starter 套餐 19.99 美元一个月，只给 750 次任务。做个稍微复杂点的 RAG 流水线，一天就烧完。

n8n 云版 Starter 是 20 欧元一个月，2500 次执行。单看价格差不多，但 n8n 的计费单位是"执行"，一条流程跑一次算一次，不管中间过了多少步。Zapier 是每一步都算钱。

算下来同样的工作量，n8n 大概便宜 5 到 10 倍。

这还只是云版。n8n 自托管完全免费，license 叫 fair-code，源码可见、可以自用、可以改，只是不让你拿去做 SaaS 卖钱。对绝大多数团队来说，这跟开源没区别。

我是真的觉得，Zapier 的商业模式撑不了多久。

## 它跟 Dify、Coze 又是什么关系

这是我觉得最容易被混淆的地方。

Dify 和 Coze 是 AI 优先，工作流只是它们的一个子功能。你打开 Dify，第一眼看到的是"创建应用"、"知识库"、"Agent"，AI 是主角。

n8n 是工作流优先，AI 节点是它 500 多个节点里的一类。你打开 n8n，第一眼看到的是触发器、HTTP 请求、数据库、邮件、Slack。

一个更直观的对比。

如果你要做一个"客户问答机器人"，挂在公司网站上，Dify 十分钟搞定，因为它就是为这个场景设计的。n8n 也能做，但你得自己搭前端、自己管会话状态。

反过来，如果你要做"每天早上 9 点爬 50 个网站、过 GPT-4 总结、按优先级排序、发到企业微信、同步到飞书文档、有异常自动开 Jira 工单"，这种十几个系统串起来的事，Dify 根本不是为这个设计的，n8n 才是主场。

坦率讲，我的判断是，Dify 和 Coze 是"AI 应用搭建平台"，n8n 是"企业自动化中枢"，它们在某些场景会撞车，但根本上不是同一类产品。

再往下掰一层。

个人用户、想搭一个 AI 对话应用，选 Coze（国内免备案，有字节流量入口）。

中小企业、想做内部 AI 客服或知识库，选 Dify（开源，中文文档好，AI 体验成熟）。

技术团队、要做跨系统自动化、有内网数据、想接自家 LLM，选 n8n（工作流能力深、节点多、能跑私有模型）。

不是谁比谁强，是解决的问题不一样。

## AI 节点到底能接到什么程度

我一开始以为 n8n 的 AI 就是加了个 OpenAI 节点。打开 advanced-ai 文档后惊了一下。

LLM 提供方这一层，OpenAI、Anthropic、Gemini、Mistral、Groq、Azure OpenAI、Cohere、AWS Bedrock、Perplexity，全都有官方节点。本地 Ollama 也在列，跑 Llama 3 或 Qwen 不用自己搓 HTTP。

Agent 这一层更夸张，内置六种，Conversational、ReAct、OpenAI Functions、Plan and Execute、SQL Agent、Tools Agent，都是 LangChain 那套经典模式。

向量库接了 Pinecone、Qdrant、Weaviate、Milvus、Chroma、PGVector、Supabase、MongoDB Atlas，做 RAG 够用。

说到底，n8n 把 LangChain 的能力用可视化节点封装了一遍。你不用写 Python、不用处理 chain 的拼装，拖一下就能跑一个带工具调用的 Agent。

## 一个最小示例，我自己跑的

流程名称，"读 RSS、用 Claude 打分、筛出 7 分以上的发飞书"。

触发器，Schedule Trigger，每天早 8 点跑一次。

第一个节点，RSS Feed Read，塞进 10 个 AI 科技博客的 feed 地址。

第二个节点，Basic LLM Chain，模型选 Anthropic Chat Model (Claude 3.5 Sonnet)，prompt 就是"根据标题和摘要，从 novelty、practicality、depth 三个维度打 1-10 分，返回 JSON"。

第三个节点，IF，condition 设成 score > 7。

第四个节点，Lark (飞书) Send Message，把筛出来的条目格式化成富文本丢进群里。

连起来一共 4 个节点，零代码。我自己搭完用了 22 分钟，其中 10 分钟花在了找飞书机器人 webhook 上。

这条流程如果用 Python 写，至少 200 行，还得处理 feed 解析、重试、速率限制、错误兜底。n8n 里这些全是节点自带的。

## 社区的真实反馈

GitHub Issues 翻下来，最集中的吐槽有两条。

一，学习曲线陡。数据在节点之间怎么传、怎么用 expression 引用上一步输出，这套心智模型需要花几天熟悉。表达式语法是 `{{ $json.fieldName }}`，对没写过代码的人不算友好。

二，调试体验一般。流程复杂以后，哪个节点挂了得一个个点开看 execution log，没有断点、没有单步。

HackerNews 上有个高赞评论说得很到位，n8n is Zapier for people who know what an API is。如果你连 JSON 和 HTTP 是什么都没概念，n8n 上手会比 Zapier 难。

中文社区这边，即刻有几个开发者在分享 n8n + 本地 Ollama 的组合，核心痛点是"不想给 OpenAI 交 API 费，还不想把公司数据传出去"。这个场景在中国太有共鸣了。

知乎上有个回答讲得扎心，"Dify 是给产品经理的，n8n 是给运维工程师的，Coze 是给个人创作者的"。粗暴，但方向没错。

## 我的判断

我认为 n8n 在中国会慢慢热起来，但不会像 Dify 那样爆。

原因也直接。n8n 的核心优势是"对接一切"，500 个节点里有 400 个是海外 SaaS。Salesforce、HubSpot、Slack、Notion、Airtable，这些中国团队用得比较少。国内版的企业微信、钉钉、飞书、金蝶、用友、钉钉宜搭，n8n 支持得一般，很多得靠 HTTP 请求节点自己搓。

但这也是机会。任何一个愿意为 n8n 贡献中国本地化节点的人，都能拿到这个社区的话语权。184k 星的项目，中文贡献者的比例现在低得可怜。

还有一个更狠的判断。LLM 时代，工作流自动化和 AI 应用开发的边界会彻底消失。今天你用 Dify 搭一个 Agent，明天你发现这个 Agent 要去调 20 个外部系统，你会发现 Dify 不够用，得上 n8n。反过来，你用 n8n 做自动化，越做越复杂，会发现需要一个 Agent 来做决策，n8n 自己就能装下。

谁的节点多、谁的可扩展性强、谁的自托管体验好，谁就会吃下这块市场。

n8n 现在领先半个身位。

## 你现在能做什么

如果你只想试一下，访问 n8n.io 开个云版免费账号，14 天试用，够你跑完一个完整的 AI 流程。

如果你想自托管，一条命令，`docker run -it --rm -p 5678:5678 n8nio/n8n`，浏览器打开 localhost:5678 就能用。

如果你不知道该搭什么，去 n8n.io/workflows 翻模板库，8500 多个模板，挑一个最像你需求的，导入、改改、跑起来。

上个月我还在纠结 Zapier 账单，这个月我已经把三条自动化搬到 n8n 上了。

开源的好处是，你永远不用求着别人改价格。

---

## 相关链接

- GitHub 仓库: https://github.com/n8n-io/n8n
- 官网: https://n8n.io/
- AI 文档: https://docs.n8n.io/advanced-ai/
- 模板库: https://n8n.io/workflows/
- 自托管镜像: `docker run -it --rm -p 5678:5678 n8nio/n8n`

---
相关实体:: n8n
相关主题:: 工作流自动化 | AI集成

<!-- REACH: 7/10 | 品牌△ 利益点✓ 可操作✓ -->
