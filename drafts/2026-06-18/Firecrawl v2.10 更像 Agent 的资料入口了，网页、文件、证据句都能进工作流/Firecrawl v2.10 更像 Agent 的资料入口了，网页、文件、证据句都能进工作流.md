---
title: Firecrawl v2.10 更像 Agent 的资料入口了，网页、文件、证据句都能进工作流
status: draft
date: '2026-06-18'
source: manual
source_url: https://github.com/firecrawl/firecrawl/releases/tag/v2.10
angle: >-
  从 v2.10 的 parse、lockdown、question、highlights、video 和 search domain filters 切入，做一份 Agent
  网页资料入口选择清单。读者关心的是什么时候用 search，什么时候 scrape，什么时候 parse 本地文件，什么时候只要 evidence highlights。
voice: first-person
reach: 8
tags:
  - Firecrawl
  - Agent
  - 网页资料入口
  - 文档解析
  - 工作流
llm:
  provider: codex
  model: ''
platforms:
  wechat: primary
  xhs: primary
  x: blocked
xhs_title: Firecrawl v2.10 更像 Agent 的资料入口了，网页、文件、证据句都能进工作流
wechat_title: ''
cover:
  status: skipped
reach_note: Firecrawl GitHub 认知强，v2.10 release 有明确 API 变化，能落到写作、调研、RAG 和 Agent 数据入口。
selection_reason: 比 dry-run 的泛泛 Firecrawl 上手更具体，版本变化能支撑更有重点的文章。
---

# Firecrawl v2.10 更像 Agent 的资料入口了，网页、文件、证据句都能进工作流

我现在看 Agent 工具，第一眼已经不看它会不会调用模型，而是看它怎么拿资料。

很多工作流跑不稳，不是模型回答差，而是入口太乱。网页、PDF、表格、搜索结果、视频链接、证据句，各走一套处理链，最后上下文里塞了一堆半干净材料。

Firecrawl v2.10 这次值得看，是因为它把“资料入口”这件事拆细了。不是只做 scrape，而是让 search、scrape、parse、question、highlights、video 分别进入不同任务。

## 先判断你的 Agent 到底缺哪种资料

如果你只是想找一批候选页面，先用 search。

v2.10 的 search 加了 includeDomains 和 excludeDomains，适合把搜索范围收窄。比如只查官方文档、只排除不想要的站点、只给 Agent 一批可控来源。

如果你已经有明确 URL，再用 scrape。

scrape 负责把页面变成干净 Markdown 或结构化数据。v2.10 新增的 lockdown 参数更适合放进生产工作流，它会从 Firecrawl index 返回结果，并且有受控的 outbound 路径和默认零数据保留。

如果资料不在网页上，而是在本地文件里，就不要硬把文件传给网页抓取链路。v2.10 的 /parse 可以上传 PDF、DOCX、DOC、ODT、RTF、XLSX、XLS、HTML，单个文件最高 50 MB，返回 Markdown、JSON 或 summary。表格和阅读顺序会被保留。

这点对 Agent 很关键。文件不是网页，表格不是正文，阅读顺序错了，后面再强的推理也会歪。

## 把入口选型做成一张清单

我会把 Firecrawl v2.10 当成一个资料入口路由器，而不是单纯爬虫。

可收藏的选择清单如下。

- 需要发现资料，用 search，先用 includeDomains 或 excludeDomains 收窄来源
- 已经知道页面地址，用 scrape，把网页转成 Markdown 或结构化数据
- 需要更稳的生产链路，用 scrape 加 lockdown，降低不可控跳转和保留风险
- 手里是 PDF、Word、表格、HTML 文件，用 /parse，不要先转存成网页再处理
- 只想问页面一个问题，用 question format，让结果落到 data.question
- 需要证据句、代码块或表格行，用 highlights，不要让模型自己在长文里猜出处
- 页面包含可支持的视频资料，用 video format，拿签名下载链接，并注意 lockdown gating
- 需要模拟页面交互，再考虑 Interact，不要一开始就把简单抓取做成浏览器任务

这张表背后的判断很简单，越靠前越像检索，越靠后越像取证。

Agent 不是每次都需要整页内容。有时它只需要一句证据，有时只需要一个表格行，有时只需要确认某个页面能不能支撑回答。

## 证据句比整页 Markdown 更省上下文

v2.10 里我最看重 highlights。

它可以返回和 query 匹配的 exact sentences、code blocks、table rows，还能重建 Markdown 表格。这比“把整页塞给模型再总结”更适合做可解释 Agent。

比如你在做竞品资料库、政策条款检索、SDK 文档问答，整页内容经常太长。模型真正需要的是能支撑答案的句子和表格行。

question format 则适合更短的路径。你给 /scrape 一个自然语言问题，它把 grounded answer 放在 data.question 里。它不是替代完整 RAG，而是适合页面级的一次性问答。

我的判断是，question 适合“我只要答案”，highlights 适合“我要答案背后的证据”。

这两个不要混用。交付给用户看的内容，最好保留 highlights。只给内部节点做路由判断，question 就够轻。

## 本地文件别绕路，直接 parse

很多团队做资料库时有个老毛病，先想办法把 PDF、Word、表格转成网页，再走抓取流程。

v2.10 的 /parse 让这件事少绕一圈。它支持常见办公文档和 HTML 文件，目标是输出干净 Markdown、JSON 或 summary，并尽量保留表格和阅读顺序。

这里的坑也很明确。

不要看到 “summary” 就把它当最终知识库。summary 适合预览和分流，不适合做精确问答的唯一来源。

如果你的 Agent 要回答合同、报价表、产品规格、研究报告，优先保留 Markdown 或 JSON。summary 可以放在索引层，原文结构要留给证据层。

## 先跑一个资料入口最小任务

我不会一上来把 Firecrawl 接进所有工作流。

更稳的做法是选一个小任务，比如“从官方文档里找功能限制，并输出证据句”。这个任务刚好覆盖 search、scrape、highlights，也能看出你的 Agent 是否会乱引用。

可以按这个路径验证。

1. 用 search 找候选页面，并用 domain filters 限定来源
2. 对命中的 URL 调 scrape，必要时打开 lockdown
3. 用 highlights 抽取支撑答案的句子、代码块或表格行
4. 如果资料来自 PDF 或表格，改走 /parse
5. 只在内部判断节点使用 question，不把它当唯一证据
6. 把最终输出拆成答案、证据、来源链接三块

这个交付形态很适合 Agent 应用。用户看到的不是“我查到了”，而是“我查到了，并且这几句支撑这个结论”。

## 这里最容易踩坑

我认为 Firecrawl v2.10 的价值，不是多了几个 endpoint，而是把 Agent 资料入口从“全都抓下来”改成“按任务取材料”。

但坑也在这里。

如果你把 search 当 scrape 用，会得到一堆候选结果，却没有页面内容。如果你把 question 当 evidence 用，答案看起来很顺，但交付时缺少可复核材料。如果你把 parse 的 summary 当原文用，文件里的表格和细节会丢掉一部分价值。

另外，video format 能返回支持站点的签名下载链接，但这类能力要按官方支持范围和 lockdown gating 来设计，不适合假设所有视频页面都能稳定处理。

我的建议是，把 Firecrawl 放在 Agent 的资料入口层，而不是放在最后的回答层。入口层负责找、抓、解析、取证，回答层再把材料组织成用户能读的结果。

如果你正在做网页研究 Agent、文档问答、销售资料库、竞品监控或技术文档助手，v2.10 可以先从一个资料入口小链路开始试。不要急着做大而全，先让 Agent 每次回答都能带回可验证证据。

## 相关链接

- Firecrawl v2.10 GitHub Release，https://github.com/firecrawl/firecrawl/releases/tag/v2.10
- Firecrawl GitHub 仓库，https://github.com/firecrawl/firecrawl
- Firecrawl 官方文档，https://docs.firecrawl.dev
