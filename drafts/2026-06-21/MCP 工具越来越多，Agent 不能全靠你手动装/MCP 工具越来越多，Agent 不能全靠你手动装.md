---
title: MCP 工具越来越多，Agent 不能全靠你手动装
status: draft
date: '2026-06-21'
source: manual
source_url: https://huggingface.co/blog/agentic-resource-discovery-launch
angle: >-
  从“install-first, use-later”的问题切入，讲 ARD 为什么要把工具选择移到模型外面。重点写 ai-catalog.json、POST /search、publisher
  identity、representative queries、compliance attestations 和 Hugging Face Discover
  Tool，对应团队内部工具注册表怎么设计。
voice: first-person
reach: 8
tags:
  - MCP
  - Agent
  - Hugging Face
  - ARD
  - 工具注册表
llm:
  provider: codex
  model: ''
platforms:
  wechat: primary
  xhs: primary
  x: blocked
xhs_title: MCP 工具越来越多，Agent 不能全靠你手动装
wechat_title: ''
cover:
  status: skipped
reach_note: MCP 和 Agent 是热门入口，工具发现层解决真实扩展问题，适合收藏。
selection_reason: 官方博客信息密度高，是今天较新的 agent 基础设施题。
---

# MCP 工具越来越多，Agent 不能全靠你手动装

我最近看 Hugging Face 讲 ARD，第一反应不是又多了一个 agent 标准，而是团队工具注册表终于有了更像工程系统的做法。

MCP 工具越接越多，最痛的不是调用，而是选择。看完这套思路，你可以反推一套内部能力目录，而不是继续把 server URL 一个个塞进配置里。

ARD 想解决的问题叫 install-first, use-later。现在很多 agent 平台都是先装一批 MCP、Skills、A2A agent，真正跑任务时再让模型从这堆东西里挑。工具少时能忍，团队规模一上来，就会变成维护问题。

## 先把工具从配置文件里拿出来

过去接 MCP，常见做法是把 server URL 写进配置，或者让用户手动连接某个服务。这个方式适合每天都用的少数工具，不适合成百上千个临时能力。

另一个看似聪明的办法，是把所有工具描述都塞进模型上下文，让模型自己挑。Hugging Face 官方博客把这个问题说得很直接，上下文预算有限，而且很多工具描述太薄，模型很难稳定区分谁该被调用。

ARD 的关键动作，是把选择挪到模型外面。注册表先索引工具、技能和其他 agent，客户端用自然语言搜索，模型只拿搜索结果继续调用。

我认为这个转向很重要。agent 不应该靠记住全世界所有工具工作，它应该先问一个更像搜索引擎的东西，当前任务到底需要哪种能力。

## 给每个能力发一张可搜索的身份证

ARD 草案里有一个静态清单格式，叫 `ai-catalog.json`，发布方可以把它放在固定位置，让注册表抓取。它也定义了动态搜索入口 `POST /search`，用于实时返回排序后的能力。

如果你在公司内部做 MCP 或 agent 平台，我会把 `ai-catalog.json` 当成工具上架表，而不是文档附件。

可收藏的字段清单可以这样拆。

- 能力类型，Skill、MCP server、内部 API、A2A agent
- 发布方身份，团队、域名、代码仓库、负责人
- 代表性查询，用户会怎么描述这个需求
- 合规声明，数据权限、审计要求、可调用边界
- 运行入口，endpoint、transport、版本、运行状态
- 标签和返回类型，例如 `application/ai-skill`、`application/mcp-server+json`、`application/vnd.huggingface.space+json`

这里面我最看重两个字段，发布方身份和代表性查询。前者决定能不能信，后者决定能不能搜到。

很多团队的内部工具文档写得像接口说明，只有参数，没有用户意图。结果就是模型搜不到，或者搜到了也不敢用。代表性查询要写成真实任务语言，比如“把音频转成文字”“给数据集做标注质检”“生成一张产品图”，而不是只写服务名。

## 把 `POST /search` 做成正式入口

ARD 的动态注册表 API 不是一个漂亮目录页，而是 agent 可以调用的搜索接口。客户端把任务意图发给 `POST /search`，注册表返回排序结果，再由模型继续执行。

这对内部平台很实用。你不需要一开始做大而全的市场，也不需要让每个业务方理解 MCP 细节。先做一个内部 `POST /search`，让 agent 按自然语言找能力，就能把工具选择从 prompt 里剥出来。

一个最小版本可以只做三件事。

- 收录 10 个高频内部工具，补齐发布方身份和代表性查询
- 支持按查询文本、能力类型、标签过滤
- 返回前 5 个候选，并带上调用入口、权限说明和更新时间

这已经比“把所有工具描述贴进 system prompt”稳得多。工具增加时，你扩的是索引和治理，不是模型上下文。

## 先用 Hugging Face Discover Tool 看参考实现

Hugging Face Discover Tool 是 ARD 的参考实现。官方博客说，它把 Hub 上的 Skills、机器学习应用和 MCP servers 通过语义搜索包装成 ARD catalog entries。

它不是发明一套新 artifact，而是把已有的 Spaces、Agent Skills、MCP 标记和 agent-oriented metadata 包进 ARD 这层信封。请求不同媒体类型时，同一个 Space 可以作为 Skill、MCP server，或者原始 Space 元数据返回。

可验证入口也比较清楚。官方 CLI 里有 `hf discover search`，也可以直接请求 Hugging Face 的 `/search` 服务，还可以通过 MCP endpoint 搜索 catalog。

我会建议团队先把它当样板看，而不是急着照抄产品形态。真正该学的是它的分层，发现归发现，执行归执行，协议外壳归协议外壳。

## 这里最容易踩坑

我认为最容易出问题的，是把 ARD 理解成“工具越多越好”。这会把一个治理问题伪装成生态繁荣。

官方博客强调 ARD 不是 product，也不是 marketplace，而是不同公司都能独立实现的 shared standard。放到团队内部，这句话更该翻译成一句工程原则，先让能力可发现、可验证、可审计，再谈规模。

合规声明也不能写成装饰字段。一个 agent 找到工具之后，下一步可能会读数据、写数据、触发流程。如果注册表只告诉它“这个工具能做什么”，却不告诉它“谁发布的、能碰什么数据、是否需要审批”，那发现能力反而会放大风险。

我的判断是，ARD 有价值的地方不在新名词，而在它逼团队承认一件事，agent 平台需要一层工具治理系统，不能只靠手动安装和长 prompt。

## 从三个高频任务开始改

如果你现在维护的是一个 agent 平台，我会从三个高频任务切入。

挑一个每天都有人用的内部工具，给它补 `ai-catalog.json`。再挑一个容易误用的工具，补清楚发布方身份和合规声明。然后挑一个新工具，只允许通过 `POST /search` 被发现，看看 agent 拿到候选结果后能不能稳定调用。

交付形态不用复杂。一个静态 manifest，一层搜索 API，一个校验脚本，一个展示页，就能开始替代“人工把 MCP server 装进配置文件”的旧流程。

工具数量上来以后，agent 需要的不是更长的提示词，而是一个能查、能验、能被团队维护的能力目录。

## 相关链接

- Hugging Face 官方博客，https://huggingface.co/blog/agentic-resource-discovery-launch
- ARD 规范，https://agenticresourcediscovery.org/
- Hugging Face Discover Tool，https://github.com/huggingface/hf-discover
- Hugging Face CLI，https://github.com/huggingface/huggingface_hub
- Agent Skills on the Hub，https://huggingface.co/docs/hub/agents-skills
