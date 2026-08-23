---
title: 自托管资料库别只看聊天，Open Notebook v1.10 先把检索和重试做稳了
status: draft
date: '2026-06-20'
source: manual
source_url: https://github.com/lfnovo/open-notebook/releases/tag/v1.10.0
angle: >-
  避开“第二大脑”口号，写 v1.10.0 真正有用的工程细节：LaTeX、bulk context controls、failed source retry、搜索
  fallback、404/422、API timeout、数据库 migration 和安全补丁。落点是自建资料库验收表。
voice: first-person
reach: 8
tags:
  - Open Notebook
  - 自托管资料库
  - 知识库
  - RAG
  - Agent
llm:
  provider: codex
  model: ''
platforms:
  wechat: primary
  xhs: primary
  x: blocked
xhs_title: 自托管资料库别只看聊天，Open Notebook v1.10 先把检索和重试做稳了
wechat_title: ''
cover:
  status: skipped
reach_note: 自托管资料库场景明确，读者能用这份清单判断自己的知识库是否可靠。
selection_reason: 这是 06-18 新 release，来源为 GitHub release，能把工具文写得更具体而不是营销化。
---

# 自托管资料库别只看聊天，Open Notebook v1.10 先把检索和重试做稳了

自建资料库最容易让人兴奋的地方，是把一堆文档扔进去，然后开始问问题。

但我现在更关心另一件事，文档进不去怎么办，搜索坏了怎么办，上下文塞多了怎么办，升级后数据库能不能稳。

Open Notebook v1.10.0 这次更新，有用的部分不在“更像聊天产品”，而是一组很工程化的小修补。这组改动适合变成一张自建资料库验收表。

## 先验收资料能不能稳稳进去

看自托管 notebook，第一项不是界面漂不漂亮，而是 source 失败之后有没有恢复路径。

v1.10.0 里，失败的 source card 会出现更醒目的 `Retry processing` 按钮。更关键的是，ingest 失败的 source 会被标记成 `failed`，而不是带着 extraction error 被误存成 `completed`。

这点很小，但很要命。

如果一个资料库把失败文档标成完成，后面问答时你很难判断，是模型没答出来，还是资料根本没进去。对个人使用是困惑，对团队交付就是验收漏洞。

最小测试里可以故意丢一个容易失败的文件，看系统是否能明确显示失败状态，并允许重新处理。

## 把检索兜底当成核心能力

v1.10.0 修了一个搜索可靠性问题，text search 遇到 `search::highlight` position overflow 时，会 fallback 到 vector search。

这不是锦上添花。

资料库产品里，搜索失败最麻烦的不是报错，而是静默缺结果。用户以为资料里没有，实际只是检索链路断了。

对自托管资料库来说，我认为检索兜底至少要回答三件事。

- 文本搜索异常时，有没有替代路径
- 结果为空时，能不能区分“没命中”和“搜索失败”
- 搜索参数不合法时，API 会不会给出清楚错误

这次 release 里还补了 API correctness，缺失或删除的 source 返回 404，search limit 非正数返回 422。404 和 422 听起来不性感，但它们决定了前端、自动化脚本和 agent 调用时能不能正确恢复。

## 别让上下文控制变成手工活

Open Notebook v1.10.0 给 Sources 和 Notes 的 column headers 增加了 bulk chat-context actions。

Sources 可以批量选 `insights only`、`full content`、`exclude all`。Notes 可以批量 include 或 exclude all。

我喜欢这个方向，因为自建资料库真正用起来，问题往往不是“有没有上下文”，而是上下文太多、太杂、太难控。

比如你在一个 notebook 里放了原始文档、读书笔记、会议摘要和临时想法。问一个具体问题时，全部塞进聊天上下文并不一定更好。更稳的做法是，把 source 只开 insights，把少量 notes 放进去，再逐步放大范围。

可收藏的验收清单可以这么写。

- 适合谁，自建论文库、项目资料库、会议记录库、客户资料库的人
- 怎么做，先建一个小 notebook，只放 5 到 10 个 source
- 坑点，不要一上来 full content 全开，先确认回答是否引用了正确资料
- 下一步动作，分别测试 insights only、full content、exclude all 的回答差异
- 交付形态，把最终配置写进团队的资料导入规范

这类 bulk 控制看着像表格小功能，其实是资料库从玩具变成工作流的关键。

## 数学公式和真实内容生成别忽略

v1.10.0 的 Chat 支持通过 KaTeX 渲染 inline `$...$` 和 display `$$...$$` 数学公式。

如果你的资料库里有论文、课程笔记、技术文档，这个更新比普通聊天样式重要。公式不渲染时，读者会被一串符号打断，模型回答也更难被人工核对。

Podcast generation 这次也改成使用 notebook 的真实内容 `Notebook.get_context()`。我会把它理解成一个信号，围绕资料库做衍生内容时，必须回到当前 notebook 的上下文，而不是拿泛化内容硬生成。

这对 agent 应用也有启发。一个资料库 agent 不该只会“聊”，它需要明确知道自己正在用哪些 source、哪些 notes、哪一段上下文。

## 升级前先看运行和安全边界

这次更新还包含一组不太适合做标题、但很适合做升级检查的内容。

Security 里，Starlette 升到 1.2.1，FastAPI 升到 0.136.3，用于处理 CVE-2026-48710，也就是 BadHost。Runtime 里，Docker base image 改为 Debian trixie 加 Node.js 22.x，frontend API request timeout 可以通过 `NEXT_PUBLIC_API_TIMEOUT_MS` 配置，completed sources 不再继续轮询。

升级说明里还有 database migration 15，会在 credential table 上加入 flexible `config` object，并在 API startup 时自动应用。

这里最容易踩坑的是 migration。

自托管项目一旦连到真实资料和凭据表，升级就不能只看容器能不能启动。升级前应该做一次备份，再在测试环境确认 migration 自动应用、旧 credential 还能读、API startup 没有卡住。

如果你的资料库后面要接 agent，API timeout 也要单独测。超时太短，长文档处理容易断；超时太长，前端等待和重试逻辑会变得难判断。

## 用这张表检查自己的资料库

Open Notebook v1.10.0 的价值很明确：它不是一次“第二大脑”式更新，而是一次把资料库基础设施补稳的更新。

如果你正在选自建资料库，可以不用急着被聊天效果带跑。先按这张表验收。

- 导入失败是否有明确 failed 状态
- 失败 source 是否能直接 retry processing
- 文本搜索异常时是否有 vector search 兜底
- 删除或缺失 source 是否返回 404
- 非法 search limit 是否返回 422
- Sources 是否能批量切换 insights only、full content、exclude all
- Notes 是否能批量 include 或 exclude
- 数学公式是否能正常渲染
- API timeout 是否可配置
- 数据库 migration 是否能在启动时稳定应用
- 安全依赖是否跟进到 release 标注版本

我的下一步会很具体，拿一个小 notebook，放一篇带 LaTeX 的技术文档、一条故意失败的 source、几条 notes，然后只验收三件事，失败能不能重试，搜索有没有兜底，上下文能不能批量收放。

这三件事过了，再谈把它接进长期资料库。

## 相关链接

- Open Notebook v1.10.0 release，https://github.com/lfnovo/open-notebook/releases/tag/v1.10.0
- Open Notebook GitHub 仓库，https://github.com/lfnovo/open-notebook
