---
title: Hermes Agent 新版联网能力：把网页读快，把上下文省下来
status: draft
date: '2026-07-05'
source: manual
source_url: https://github.com/NousResearch/hermes-agent
angle: 从读网页这件事切入，讲清 Agent 为什么会被大页面、上下文和抓取链路拖慢。读者关心的是能不能在研究、选题和代码任务里少烧 token、少等结果，并从主仓库开始验证最小用法。
voice: first-person
content_lane: version-update
content_archetype: version_brief
diversity_note: title_pattern_repeat_in_batch,recent_entity_saturation,recent_title_pattern_saturation
reach: 9
tags:
  - Hermes Agent
  - Agent 联网
  - 网页提取
  - 上下文优化
llm:
  provider: codex
  model: ''
platforms:
  wechat: primary
  xhs: primary
  x: blocked
xhs_title: Hermes Agent 新版联网能力：把网页读快，把上下文省下来
wechat_title: ''
cover:
  status: skipped
recent_similarity: 0.062
reach_note: Hermes/NousResearch 有明确品牌识别，省上下文和提速是直接利益点，GitHub 主仓库可上手。
selection_reason: 它把 Agent 联网的真实瓶颈讲得具体：不是能不能打开网页，而是如何把网页变成可控、低成本、可分页读取的工作材料。
---

# Hermes Agent 新版联网能力：把网页读快，把上下文省下来

Agent 做研究任务，最容易慢在读网页。

不是模型不会总结，而是它经常被迫把一整页网页先塞进上下文，再让另一个模型压缩一遍。页面越长，等待越久，token 也越容易烧在搬运材料上。

Hermes Agent v0.18.0 里我最想看的，就是这次 `web_extract` 的改法。它不是给 Agent 又加一个炫技按钮，而是把读网页这条链路从“先让模型概括”改成了“能直接返回就直接返回，太长就截取加存档”。

## 让网页先别进模型肚子里

旧路径的问题很朴素。

Firecrawl、Tavily、Exa、Parallel 这类后端已经能返回清理过的 markdown，Hermes 旧的 `web_extract` 还会对超过 5k 字符的页面再跑一次辅助模型总结。也就是说，抓取已经结束，Agent 还要等一次模型往返。

这对选题、竞品研究、代码文档阅读都很伤。你只是想让 Agent 看几页资料，它却先把预算花在“把已经干净的网页再压一遍”上。

PR #54843 直接把这条路砍短了。小页面在默认 15000 字符预算内完整返回，大页面返回头尾窗口，完整清理文本写到 `cache/web`，并在结果里给出后续 `read_file` 的读取路径。

更关键的是，它没有自己造一个新爬虫，也没有改 `web_search`。网页后端还是原来的后端，变化发生在 Agent 核心工具层。

## 看版本变化，不只看加了什么

这次更新可以压成一张表。

| 旧问题 | v0.18.0 里的改法 | 对使用者的变化 |
|---|---|---|
| 大页面要再过一遍辅助模型 | `web_extract` 改成 truncate-and-store | 少等一次模型往返 |
| 页面内容太长容易挤上下文 | 默认 15000 字符内完整返回，超出后头尾截取 | 上下文先留给判断和推理 |
| 被截掉的中间内容难找回 | 全文存到 `cache/web`，返回读取路径 | 需要证据时再分页读取 |
| 多个 `@url` 引用串行等待 | `@` 引用改为并发展开 | 多链接研究不再一条条等 |
| 大文件缓存可能失控 | 后续 PR 把存储上限压到 2MB | 本地和远程后端都更稳 |

PR 里给的 live eval 很直接。4 个 URL 的总耗时从 176.6 秒降到 15.1 秒，整体 11.7 倍加速。大页面上给到 10 到 60 倍的区间。答案恢复质量保持 3/4，可找回性是 4/4。

成本测算也很刺眼。按 PR 里的旧辅助总结路径，4 页总成本从 2.80 美元降到 0.12 美元，约 23 倍差距。这个数字不是通用承诺，但它说明了一个方向，网页阅读不该默认调用模型做重复压缩。

## 多链接研究真正变顺了

我会把这次更新放到“研究型 Agent”的基础设施里看。

如果你让 Agent 一次读 5 个资料链接，旧链路很容易变成串行等待。PR #55207 处理的是这个痛点，多个 `@` 引用从 `for ref in refs await` 改成 `asyncio.gather` 并发展开，再按原顺序组回结果。

它给出的 RED/GREEN 测试是 3 个 `@url` 引用，每个 0.2 秒。串行约 0.60 秒，并发约 0.20 秒。

别小看这个改动。真正写 Agent 应用时，慢不是只来自模型输出，而是每一个“明明可以并发却串行”的工具调用都在叠延迟。

这对三个场景最有感。

研究任务里，Agent 可以同时展开多篇资料，再把上下文留给比较和判断。

选题任务里，网页正文、项目 README、release note 可以一起进来，不必每条链接等完再进入下一条。

代码任务里，库文档、issue、PR 说明可以分开抓取，最后只把证据路径和关键片段带进推理。

## Agent 应用别把模型当垃圾压缩机

我认为这次更新最有启发的地方，不是“快了多少倍”，而是它重新分配了模型该做的工作。

模型适合判断、取舍、合成答案。它不该默认承担网页清洗、长文本搬运、重复摘要这些低价值动作。

更好的 Agent 链路应该像 Hermes 这次这样，工具负责拿到干净材料，存储层负责保留全文，模型只在需要时读取证据。这样上下文窗口不是越大越敢浪费，而是每一段都知道为什么进来。

这也是很多 Agent 应用卡住的地方。开发者以为瓶颈是模型不够强，其实链路里有太多隐形等待，网页抓取、总结、上下文压缩、串行工具调用，每一步都在让结果变慢。

## 用主仓库验证一个最小任务

如果你想判断 Hermes 这次更新值不值得跟进，我不会一上来迁移完整工作流。

从主仓库 README 的 Quick Install 走最小路径就够了。安装后运行 `hermes` 进入交互，再用 `hermes update` 确认版本，用 `hermes doctor` 查环境状态。

验证任务可以很小。找 3 个公开文档链接，让它完成一个研究问题，例如“比较这几个项目的安装路径和限制”。重点观察三件事。

第一，长页面返回时有没有给出存档路径和后续读取方式。

第二，多链接引用是不是明显少了串行等待感。

第三，Agent 最后的回答有没有把上下文用于判断，而不是铺满网页转述。

如果你做的是选题、资料研究、代码文档阅读，这个版本值得从这里试。不要先看它有多少入口、多少平台、多少模型选项，先看它能不能把网页读快，把上下文省下来。

## 相关链接

- [Hermes Agent GitHub 仓库](https://github.com/NousResearch/hermes-agent)
- [Hermes Agent v0.18.0 release](https://github.com/NousResearch/hermes-agent/releases/tag/v2026.7.1)
- [PR #54843，web_extract truncate-and-store](https://github.com/NousResearch/hermes-agent/pull/54843)
- [PR #55207，并发引用展开和稳健性修复](https://github.com/NousResearch/hermes-agent/pull/55207)
- [Hermes Agent 文档](https://hermes-agent.nousresearch.com/docs)

<!-- REACH: 8/10 | 品牌✓ 利益点✓ 可操作✓ -->
