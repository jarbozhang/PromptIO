---
title: "Open Notebook v1.10.0：自托管资料库先把检索、重试和上下文做稳"
url: "https://github.com/lfnovo/open-notebook/releases/tag/v1.10.0"
source: "Curated official GitHub release summary"
source_type: curated
language: zh
published: "2026-06-18T10:46:42Z"
fetched_at: "2026-06-20T13:05:00+08:00"
---

Open Notebook 是一个开源自托管 notebook/资料库项目。官方仓库描述是：An Open Source implementation of Notebook LM with more flexibility and features。

v1.10.0 的重点并不是“聊天更炫”，而是把资料 ingest、搜索、上下文控制、错误恢复和安全补丁做稳。官方 release highlights 包括 LaTeX rendering in chat、per-type bulk chat-context controls、Turkish UI、security fix，以及 ingestion/search reliability fixes。

官方确认的变化：

- Security：Starlette 升到 1.2.1、FastAPI 升到 0.136.3，用于处理 CVE-2026-48710（BadHost）。
- Chat：支持通过 KaTeX 渲染 inline `$...$` 和 display `$$...$$` 数学公式。
- Context control：Sources 与 Notes 的 column headers 增加 bulk chat-context actions。sources 可选 insights only、full content、exclude all；notes 可 include / exclude all。
- Failed source recovery：失败 source card 出现更醒目的 Retry processing 按钮；ingest 失败的 source 会被标记为 `failed`，而不是带着 extraction error 被误存为 `completed`。
- Podcast generation：使用 notebook 的真实内容 `Notebook.get_context()`。
- Search reliability：text search 碰到 `search::highlight` position overflow 时会 fallback 到 vector search。
- API correctness：缺失或删除的 source 返回 404；search limit 非正数返回 422。
- Runtime：Docker base image 改为 Debian trixie + Node.js 22.x；frontend API request timeout 可用 `NEXT_PUBLIC_API_TIMEOUT_MS` 配置；completed sources 不再继续轮询。
- Upgrade note：新增 database migration 15，在 credential table 上加入 flexible `config` object，并在 API startup 时自动应用。

适合写作角度：私人资料库最容易被写成“第二大脑”口号，但真实可用性取决于失败重试、检索兜底、上下文开关、公式阅读、安全补丁和 API 错误码。读者可以拿这次更新当作自建知识库的验收表。
