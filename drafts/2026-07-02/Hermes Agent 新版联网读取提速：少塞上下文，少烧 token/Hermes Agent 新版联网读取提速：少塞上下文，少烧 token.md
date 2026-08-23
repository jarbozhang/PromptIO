---
title: Hermes Agent 新版联网读取提速：少塞上下文，少烧 token
status: draft
date: '2026-07-02'
source: manual
source_url: https://github.com/NousResearch/hermes-agent
angle: >-
  从“网页整页塞进上下文”的老问题切入，写 Hermes Agent 新版怎样把网页读取拆成更省时间、更省 token 的流程。读者关心的是：自己的 agent
  读文档、抓页面、做资料整理时，能不能用同样思路降低成本。
voice: first-person
content_lane: version-update
content_archetype: version_brief
diversity_note: recent_entity_saturation,recent_title_pattern_saturation
reach: 9
tags:
  - Hermes Agent
  - AI Agent
  - 联网读取
  - token成本
  - 版本更新
llm:
  provider: codex
  model: ''
platforms:
  wechat: primary
  xhs: primary
  x: blocked
xhs_title: Hermes Agent 新版联网读取提速：少塞上下文，少烧 token
wechat_title: ''
cover:
  status: skipped
recent_similarity: 0.042
reach_note: NousResearch/Hermes 是重点生态，提速和降成本有明确利益点，也能引导读者去 GitHub 验证和试用。
selection_reason: Hermes/openclaw 生态优先级高，且主题不是泛泛介绍 agent，而是围绕新版本解决网页读取慢、上下文浪费的问题，适合做版本解读。
---

# Hermes Agent 新版联网读取提速：少塞上下文，少烧 token

如果你在做会读文档、抓页面、整理资料的 agent，Hermes Agent 这条更新值得看。它不是又加了一个“联网搜索”按钮，而是把网页读取拆成了更细的动作。

我最关心的不是搜索结果多不多，而是模型少读多少废话。很多 agent 的老问题是，找到一个页面后就把整页正文往上下文里塞，标题、导航、页脚、相似链接一起进来，token 花掉了，答案还未必更稳。

Hermes 的新思路更像工程拆管线，搜索负责找候选，提取负责读正文，浏览负责复杂页面。每段都能选不同后端，agent 不必把“找到网页”和“读完网页”混成同一个动作。

## 把整页塞进去，成本会先失控

做资料整理时，最贵的往往不是模型输出，而是输入。一个普通页面里真正有用的可能只有几段，剩下是菜单、推荐、脚本噪声和重复段落。

如果 agent 每次都把页面当成完整材料，它会出现两个问题。它读得慢，因为上下文更长。它也更容易跑偏，因为无关内容和正文一起参与推理。

我判断这类联网 agent 后面都会走同一条路，先搜小结果，再按需提取，再把证据压成短上下文。Hermes 这次值得看，就在于它把这个流程做成了配置层能力，而不是靠 prompt 里反复提醒模型“别读太多”。

## 新版本把网页读取拆成三件事

Hermes 在 v0.13.0 release 里写到，web tools 现在可以按 capability 选择不同 backend，search、extract、browse 不再必须绑在一起。相关 PR #20061 也把 `web.search_backend` 和 `web.extract_backend` 拆出来，默认仍兼容原来的 `web.backend`。

我会把它理解成一张很实用的版本变化表。

| 老流程里的混合动作 | 新版本里的拆分方式 |
| --- | --- |
| 搜索和提取共用一个后端 | 搜索后端、提取后端可以分开配 |
| 搜到页面就假设能读全文 | 搜索、提取、浏览各自有能力边界 |
| 后端不匹配时容易报模糊错误 | search-only 后端会给出明确提示 |
| 想换供应商要改整套 web 配置 | 可以只替换某一段能力 |

这里的关键不是 SearXNG 这个名字本身。PR #20823 把 SearXNG 加成 native search-only backend，强调它负责搜索，不实现 `WebExtractProvider`。这让架构边界变清楚了，搜就是搜，读就是读。

## 少烧 token 的关键是能力边界

我喜欢这个改法，是因为它把一个常见误区挡在了工具层。很多人会让 agent 自己决定下一步，于是模型看到 URL 后就一路尝试读取，失败了再补救，过程里消耗上下文和调用次数。

Hermes 的 PR 里专门修了两个边界问题。SearXNG 作为 search-only 后端，如果被拿去做 `web_extract` 或 crawl，不再静默滑到别的错误分支，而是直接提示它只能搜索，不能提取页面内容。

这个细节很工程。它不直接承诺“省多少 token”，但它让 agent 少走错路。少走错路，才是联网读取里更稳定的省法。

同一批改动还补了测试，覆盖可用性检查、排序、HTTP 错误、缺少 URL、提取和爬取时的清晰错误。对要把 agent 放进日常工作流的人来说，这比一句“支持联网”更有价值。

## 哪些 agent 应该参考这套设计

如果你的 agent 只是偶尔查一个链接，这个更新可能没那么急。但下面几类场景，我会优先看这套拆分。

文档助手，先用搜索后端找官方页面，再用提取后端读正文，避免把整个站点导航塞进上下文。

资料整理，搜索阶段只保留标题、摘要和 URL，等主题收敛后再提取正文。

团队知识库，抓取入口和内容抽取分开，后面替换供应商或换成本模型时，不需要重写整条链路。

多 agent 研究任务，搜索可以并发，提取可以按相关性排序后再执行，主模型只接收压缩后的证据。

我认为这才是 agent 应用越来越像工程系统的地方。不是把模型换大一点就能解决成本，而是让模型少碰不该碰的材料。

## 从一个可验证任务开始

要跟进 Hermes，我不会先改复杂工作流。我会先拿一个小任务验证三件事，搜索能否稳定返回候选，提取是否只在需要时触发，最终给主模型的证据是否足够短。

公开资料里可以确认的入口是 GitHub 仓库、release notes 和相关 PR。落地时先在测试环境里看配置项和工具选择，不要把生产任务直接迁过去。

如果你自己在做 agent，最值得抄的也不是某个后端，而是这个顺序，先把“找资料”和“读资料”拆开，再决定哪一步该花 token。网页读取不是越全越好，越早把无关内容挡在上下文外，agent 越像一个能长期跑的系统。

## 相关链接

- [Hermes Agent GitHub 仓库](https://github.com/NousResearch/hermes-agent)
- [Hermes Agent v0.13.0 release](https://github.com/NousResearch/hermes-agent/releases/tag/v2026.5.7)
- [Hermes Agent v0.18.0 release](https://github.com/NousResearch/hermes-agent/releases/tag/v2026.7.1)
- [web 工具按能力拆分 PR #20061](https://github.com/NousResearch/hermes-agent/pull/20061)
- [SearXNG 搜索后端 PR #20823](https://github.com/NousResearch/hermes-agent/pull/20823)

<!-- REACH: 8/10 | 品牌✓ 利益点✓ 可操作✓ -->
