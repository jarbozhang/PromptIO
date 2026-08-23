---
title: Hermes Agent 更新后，联网读取为什么值得重新试一次
status: draft
date: '2026-07-07'
source: manual
source_url: https://github.com/NousResearch/hermes-agent
angle: 从新版能力切入，讲清楚网页读取、上下文分页和成本控制对长资料分析的影响。读者可以用一个公开网页任务测试它是否适合自己的资料整理、调研和代码查阅流程。
voice: first-person
content_lane: version-update
content_archetype: version_brief
diversity_note: recent_entity_saturation,recent_title_pattern_saturation
reach: 9
tags:
  - Hermes Agent
  - 联网读取
  - AI Agent
  - 版本更新
  - 资料整理
llm:
  provider: codex
  model: ''
platforms:
  wechat: primary
  xhs: primary
  x: blocked
xhs_title: Hermes Agent 更新后，联网读取为什么值得重新试一次
wechat_title: ''
cover:
  status: skipped
recent_similarity: 0.055
reach_note: NousResearch/Hermes 属重点生态，且读者可以直接打开 GitHub 项目试用。
selection_reason: Hermes Agent 是 openclaw/NousResearch 生态重点项目，GitHub fact 源质量高，适合做成一次新版本能力解读。
---

# Hermes Agent 更新后，联网读取为什么值得重新试一次

我以前对 agent 联网读取的耐心很短。不是因为它不会抓网页，而是长资料一进来，最常见的结果只有两种，截掉关键段，或者先让模型总结一遍再把摘要交回来。

这次 Hermes Agent v0.18.0 让我想重试的点，正好卡在这里。它把 `web_extract` 改成不再做 LLM 摘要，而是返回清理后的网页内容，超过字符预算时保留头尾，把全文存到本地缓存，再告诉 agent 用 `read_file` 分页读中间省略部分。

如果你经常拿公开网页、官方文档、长 release note、代码仓库说明做资料整理，这个变化比看起来重要。它不是多加一个搜索入口，而是让 agent 有机会按证据读完一份长材料，而不是拿一段压缩摘要开始编工作流。

## 把长网页从一次吞完改成分段读取

旧问题很简单，长网页太容易被压扁。以前的读取链路一旦提前摘要，模型后面再怎么追问，拿到的也只是二手材料。适合快速问答，不适合做版本解读、代码查阅、长文对照。

v0.18.0 的 release 明确写到，`web_extract` 走了 truncate-and-store，不再用 LLM summarization。代码里能看到默认每页给模型的字符预算是 15000，页面超过预算时会展示大约 75% 的开头和 25% 的结尾，全文写进 `cache/web`，并在返回内容里给出读取省略部分的 `read_file` offset 和 limit。

这个设计很工程化。头尾让 agent 快速建立材料结构，缓存文件让它后续按页补证据。对长资料分析来说，差别不是阅读体验，而是引用链条有没有继续往下追的路。

## 看它有没有把证据读全

Hermes 这版另一个相关变化，是完成判断更强调 evidence。release 里写到 `/goal` 有 completion contracts，coding work 会记录 verification evidence，agent 结束任务时不只靠自己声称完成。

放到网页读取场景，我关心的不是它会不会说得很顺，而是它会不会在答案里暴露证据边界。比如一份长 release note，它应该能说明哪些结论来自头部材料，哪些结论来自分页读取的中段，哪些还需要打开 PR 或文档继续核对。

我的判断是，Hermes 这次真正值得看的不是更会聊天，而是把 agent 从“快速给个答案”往“知道自己读了多少”推了一步。做调研、资料整理、代码文档查阅时，这一步比文风更重要。

## 把成本花在关键段落上

长资料分析最怕两种浪费。一种是把整页塞进主模型上下文，另一种是每次都重新让模型总结同一页。

新链路把成本拆开了。网页提取返回清理文本，超长内容只把头尾放进当前上下文，中间内容存文件，需要时再分页读。release 里还提到 post-turn self-improvement fork 现在使用 auxiliary model、context digest 和 adaptive cadence，目标是降低自我改进循环的成本。

我不会把它理解成免费或者一定更便宜。更准确的说法是，Hermes 在把“什么必须进上下文”和“什么可以留在缓存里等需要再读”拆开。这对 agent 应用有启发，长资料不是越早塞满越好，关键是保留可回读的原文入口。

## 哪些人适合现在验证

这版适合三类人重新看 Hermes。

| 你在做什么 | 该验证什么 |
| --- | --- |
| 整理长文和官方文档 | `web_extract` 是否能保留关键段，并能分页补读 |
| 做技术调研或版本解读 | 答案里有没有清楚区分已读证据和推断 |
| 查代码仓库说明和 release | 长页面被截断后，agent 是否会主动读取省略部分 |

不适合的人也很明确。如果你只需要短网页问答，或者已经有稳定的抓取和知识库流程，Hermes 这次更新不会立刻改变你的日常。它的价值更偏 agent 工作流，不是单次搜索替代品。

## 用一个公开网页任务做升级判断

我会用一个公开网页任务来测，而不是上来接自己的资料库。选一篇长 release note，要求 Hermes 做三件事，找出新版本解决的旧问题，列出新增能力，标出每条判断来自哪一段材料。

验收点也很朴素。它有没有发现网页被截断，有没有按 footer 去读中间部分，有没有把没有读到的内容当成事实写死。如果这三点过了，再把它放进资料整理、调研和代码查阅流程里才有意义。

Hermes Agent 仓库现在的公开信息很密，GitHub 显示它是 Python 项目，已有 210k stars，v0.18.0 release 在 2026 年 7 月 1 日发布。热度不是理由，值得重试的理由是，新版终于把联网读取、上下文分页和成本控制放到同一条工作链路里了。

## 相关链接

- [Hermes Agent GitHub 仓库](https://github.com/NousResearch/hermes-agent)
- [Hermes Agent v0.18.0 release](https://github.com/NousResearch/hermes-agent/releases/tag/v2026.7.1)
- [Hermes Agent 官方文档](https://hermes-agent.nousresearch.com/docs)

<!-- REACH: 8/10 | 品牌✓ 利益点✓ 可操作✓ -->
