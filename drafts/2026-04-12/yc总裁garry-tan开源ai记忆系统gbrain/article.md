你有没有过这种感觉，跟 AI 聊了几百轮，它还是不认识你？

每次开新对话，从零开始介绍自己。你是谁、你在做什么、上次聊到哪了，全得重新说一遍。AI 模型越来越聪明，但它对你的了解，永远停在"第一次见面"。

YC 现任总裁 Garry Tan 上周把自己的解决方案开源了。不是一个概念验证，是他自己跑了很久的生产系统，管着 10000+ 个 Markdown 文件、3000+ 份人物档案、13 年的日历数据、280+ 份会议记录、300+ 条原创想法。MIT 协议，GitHub 上一周涨到快 5000 star。

这东西叫 GBrain。

## 它到底解决什么问题

先说清楚 GBrain 不是什么，它不是又一个 RAG 应用，不是笔记软件，也不是向量数据库的 wrapper。

它是一套让 AI Agent 拥有"长期记忆"的完整方案。核心逻辑很简单，用一个 Git 仓库存 Markdown 文件作为知识库，Agent 每次回答问题前先去查，每次对话结束后把新信息写回去。知识库越用越厚，Agent 越用越聪明。

关键词是"越用越聪明"。

大多数记忆方案是被动的，你存进去什么，它就知道什么。GBrain 不一样，Agent 会主动维护这个知识库。你开完一个会，它自动写一份会议页面，识别出里面提到的人和公司，更新对应的人物档案，补上交叉引用。你睡觉的时候，它跑一轮"梦境周期"，扫描所有对话，修复断掉的引用，合并重复实体。你早上醒来，知识库比昨天更完整。

坦率讲，这才是 AI Agent 该有的样子。

## 架构拆解，三层结构

GBrain 的架构分三层，我觉得这个设计挺优雅的。

**第一层是 Markdown 文件**，存在 Git 仓库里。人物档案、公司信息、会议记录、原创想法，每种信息有自己的目录，按 MECE 原则组织（互斥且完整覆盖）。每个页面分两半，上半部分是"编译后的真相"，永远保持最新，下半部分是时间线，只追加不修改。这个设计借鉴了 Karpathy 之前提的"LLM wiki"概念，但扩展到了完整的运营场景。

**第二层是数据库**，默认用 PGLite（一个基于 WASM 的嵌入式 Postgres），不需要装任何服务器，`gbrain init` 两秒钟就起来了。自带 pgvector 做向量搜索，支持混合检索（向量 + 关键词 + RRF 排序）。如果数据量大了，一行命令 `gbrain migrate --to supabase` 迁移到托管 Postgres。

**第三层是 Agent 技能包**。这是我觉得最有意思的部分。GBrain 不只是给你工具，还给你的 Agent 一本"操作手册"（GBRAIN_SKILLPACK.md），告诉它什么时候该读、什么时候该写、怎么做实体识别、怎么跑信息丰富流程。没有这本手册，Agent 有工具但没有章法。有了它，Agent 知道每条消息进来先查知识库，发现新实体就建档，有新信息就更新。

## 30 分钟跑起来

实际上手比我预期的简单。前置条件就一个，装 Bun（一个 JavaScript 运行时）。

三行命令搞定基础安装

```
bun add -g github:garrytan/gbrain
gbrain init
gbrain import ~/your-notes/
```

`gbrain init` 默认创建本地 PGLite 数据库，不需要任何账号和 API key，关键词搜索直接就能用。如果你想要向量搜索，加上 OpenAI 的 API key 做 embedding。想要 LLM 辅助的智能分块，再加 Anthropic 的 key。

GBrain 还提供了 MCP server 模式，可以直接接入 Claude Code、Cursor、Windsurf 这些工具。配置就几行 JSON。

有意思的是它的集成方案。GBrain 用"食谱"（recipe）的方式管理集成，每个食谱就是一个 Markdown 文件，Agent 读完自己就知道怎么装。支持电话录音转知识库（通过 Twilio + OpenAI Realtime）、Gmail 邮件自动归档、Google Calendar 同步、X 推文抓取。甚至有一个语音集成，打电话进来 AI 直接应答，它知道来电者是谁，能调出完整的上下文。

这个语音功能 Garry Tan 本人在演示视频里秀过，说实话看完有点"Her"那味了。

## 我的判断

我认为 GBrain 真正的价值不在技术实现，在理念。

过去三十年，个人知识管理一直有个死结，维护成本全压在人身上。Notion、Obsidian、Roam Research，工具越做越好，但大部分人用三个月就放弃了，因为"整理笔记"这件事本身就是负担。GBrain 的核心洞察是，LLM Agent 不会觉得无聊，不会忘记更新交叉引用，一次能改 50 个文件，维护成本接近零。

这个判断我觉得是对的。

但我也有顾虑。GBrain 目前要求"前沿模型"，README 里明确写了用 Claude Opus 4.6 和 GPT-5.4 Thinking 测试过，小模型大概率跑不起来。所以每天跑"梦境周期"、跑实体丰富流程，API 账单不会便宜。Garry Tan 管着 YC，这点钱对他来说是零头，但对普通开发者来说得算算账。

另外，3000+ 人物档案这种规模的个人知识库，对绝大多数人来说是用不到的。你大概率不需要管理 3000 个人的档案。但 GBrain 的架构是模块化的，你完全可以只用其中一部分，比如只管理会议记录和项目笔记。

我自己更看好的是它作为"Agent 记忆层"的参考架构。不管你用不用 GBrain 本身，Markdown + Git + 向量数据库 + Agent 主动维护这套思路，值得所有在做 AI Agent 的团队认真看看。

## 下一步

如果你现在就想试，最快的路径

1. 装 Bun，`curl -fsSL https://bun.sh/install | bash`
2. 装 GBrain，`bun add -g github:garrytan/gbrain`
3. `gbrain init` 起本地数据库
4. 把你现有的 Markdown 笔记丢进去，`gbrain import ~/notes/`
5. 试一下语义搜索，`gbrain query "我最近在关注什么"`

不需要 Agent，不需要 Supabase，不需要任何 API key，纯本地就能跑。

反正我觉得，AI Agent 的竞争已经不是模型能力的竞争了，是上下文的竞争。谁的 Agent 知道的多，谁就赢。GBrain 给了一个正经的答案。

## 相关链接

- GBrain GitHub 仓库 https://github.com/garrytan/gbrain
- Garry Tan 的语音演示 https://x.com/garrytan/status/2043022208512172263
- GBrain 技能包文档 https://github.com/garrytan/gbrain/blob/master/docs/GBRAIN_SKILLPACK.md
- GBrain 推荐目录结构 https://github.com/garrytan/gbrain/blob/master/docs/GBRAIN_RECOMMENDED_SCHEMA.md

<!-- REACH: 8/10 | 品牌✓ 利益点✓ 可操作✓ -->
