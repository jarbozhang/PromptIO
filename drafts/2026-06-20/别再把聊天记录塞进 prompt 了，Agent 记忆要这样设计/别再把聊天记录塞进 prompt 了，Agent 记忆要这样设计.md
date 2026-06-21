---
title: 别再把聊天记录塞进 prompt 了，Agent 记忆要这样设计
status: draft
date: '2026-06-20'
source: manual
source_url: https://www.elastic.co/search-labs/blog/agent-memory-elasticsearch
angle: >-
  从 1M context 仍然不是 memory system 切入，把 Elasticsearch 的三类记忆、hybrid
  retrieval、RRF、reranker、supersession、decay、DLS 隔离和 0.89 R@10 翻译成工程检查清单。
voice: retro
reach: 8
tags:
  - Agent
  - 长期记忆
  - Elasticsearch
  - RAG
  - 工程架构
llm:
  provider: codex
  model: ''
platforms:
  wechat: primary
  xhs: primary
  x: blocked
xhs_title: 别再把聊天记录塞进 prompt 了，Agent 记忆要这样设计
wechat_title: ''
cover:
  status: skipped
reach_note: Agent memory、RAG 和 Elasticsearch 都有可操作价值，适合收藏型技术笔记。
selection_reason: 补一篇方法论深度，帮助今天的文章不只停留在版本新闻。
---

# 别再把聊天记录塞进 prompt 了，Agent 记忆要这样设计

1M context window 很诱人，但它解决的是一次推理里能看多少东西，不是一个 Agent 能不能长期记住你。

Elastic 这篇 Agent memory on Elasticsearch 最值得看的地方，是把长期记忆拆成一套工程系统：能持久化，能多租户隔离，能处理事实变更，还能留下审计轨迹。

如果你正在做客服 Agent、运维 Agent、个人助手、团队知识助手，这篇适合当架构体检表。先别急着问上下文窗口还能不能再变大，先问你的记忆层有没有办法回答这些问题：记什么，怎么找，旧事实怎么退场，用户之间怎么隔离。

## 把上下文窗口当草稿纸

Elastic 的核心判断很明确，1M context window 是 scratchpad，不是 memory system。

context window 适合一次 inference 的 active reasoning space。它像临时桌面，模型这次推理要用到的材料可以摊开，但这张桌子本身不负责长期保存、跨会话增长、按用户隔离和处理多年后的事实冲突。

长期记忆要解决的是另一类问题。

一次 session 结束后，信息还在。下个月用户回来，Agent 还能按内容、时间和用户把相关事实找出来。更关键的是，当旧事实和新事实冲突时，系统不是把旧记录粗暴覆盖，而是知道谁替代了谁。

这就是为什么“把更多历史塞进 prompt”只能撑一段时间。它会越来越贵，也越来越难控，还没有天然的审计和权限边界。

## 记忆先分成三种再入库

Elastic 的方案把 Agent 记忆分成三类，这个拆法很适合落到数据库设计里。

- episodic memory，事件记忆，记录用户经历过什么，例如上次尝试过什么修复、发生在什么时间
- semantic memory，语义记忆，记录稳定事实，例如用户偏好、设备信息、长期约束
- procedural memory，流程记忆，记录步骤和 playbooks，例如某类问题应该按什么流程处理

这个分类的价值在于，不同记忆不该用同一种生命周期。

事件记忆常常需要时间线。稳定事实需要去重、确认和更新。流程记忆更像可复用操作手册，可能被多个任务触发，也可能随着团队规范变化被新版本替代。

如果所有内容都混在一个向量库里，短期看实现快，后面很容易变成一团语义相似但无法治理的文本片段。

## 把召回做成融合而不是押注向量

Elastic 在检索层用了 hybrid retrieval，关键词、向量召回、RRF 融合，再接 cross-encoder reranker。

这条链路其实是在承认一个现实，长期记忆不是只有“语义相近”一种找法。

用户可能问一个具体错误码，关键词更稳。用户可能换一种说法描述旧偏好，向量召回更有用。多路召回之后，RRF 负责把不同排序结果融合，再用 reranker 做精排，降低把相似但不该用的记忆塞回上下文的概率。

官方摘要里给了一个 QA-style eval，168 个问题上 R@10 平均 0.89，并且 zero cross-tenant leaks。这个数字不能直接等同于你的业务效果，但它说明这套架构至少把召回质量和租户隔离放在了同一张工程考卷上。

## 处理旧事实时保留替代关系

长期记忆最容易踩坑的地方，不是写入难，而是旧事实怎么退出。

Elastic 的做法是 supersession。矛盾更新不直接删除旧事实，新事实会 supersede 旧事实，同时保留 audit trail。

这对 Agent 很关键。因为很多业务里，旧事实不是垃圾，它是历史。

用户以前用设备 A，现在换成设备 B。团队以前按流程 X 处理，现在改成流程 Y。系统如果只保留最新状态，Agent 可能能答当前问题，却解释不了为什么某个决定发生过变化。

同时，旧事实会 decay，经常被触达的事实不容易下沉。这个机制比“按时间统一过期”更细。长期没被用到的信息会慢慢远离召回前排，但高频稳定事实还会留下来。

这里的判断很简单，长期记忆不要只设计 create 和 retrieve。决定质量的是 update、supersede、decay 和 audit。

## 多用户记忆先做隔离再谈智能

多租户部署里，Elastic 强调 per-user DLS isolation，也就是 document-level security。每个用户的记忆必须对其他用户不可见。

这一步不是锦上添花。记忆层一旦接入 Agent，它会被频繁检索、拼回上下文，再影响输出。如果隔离做错，问题不只是“搜错了一条数据”，模型还可能把别人的长期事实当成当前用户背景。

文章还提醒，不要把这层拆成 vector store、keyword engine、audit layer、separate auth service 四套东西。拆开当然也能做，但故障面、round trips 和一致性成本都会上去。

对早期团队来说，这里有一个很实用的判断。

如果你的 Agent 只给自己用，先用最小记忆层验证价值。如果准备面向多个用户，权限隔离和审计轨迹要和召回质量同级，不要等到上线后再补。

## 可以按这张清单检查你的记忆层

把 Elastic 这篇文章翻译成工程体检表，大概是这样。

- 记忆分类，是否区分事件、稳定事实和流程，而不是全部塞进同一个 collection
- 召回融合，是否同时考虑关键词、向量、RRF 和 reranker，而不是只押注 embedding
- 事实过期，是否有 decay 机制，而不是只按创建时间删除
- 矛盾处理，是否用 supersession 保留新旧事实关系，而不是直接覆盖
- 审计轨迹，是否能回答某条记忆从哪里来、什么时候被替代
- 租户隔离，是否有 DLS 这类文档级边界，避免用户记忆串线
- Agent 可访问性，是否能通过工具层或 MCP 这类接口，让 Agent 在合适时机读写记忆

这张清单比“上下文窗口够不够大”更接近真实问题。

一个能长期工作的 Agent，不需要每次都把全部历史重新读一遍。它要在需要的时候拿到正确的几条记忆，并且知道这些记忆的时效、来源和权限边界。

## 用一个重复任务验证长期记忆

如果要把这套思路落地，不建议从全量个人知识库开始。

更小的验证路径是选一个重复任务，例如 bug triage、客户问题跟进、设备故障排查，先让 Agent 只记三类信息。

它记一次具体处理经历，作为 episodic memory。它记用户或系统的稳定约束，作为 semantic memory。它记一套处理步骤，作为 procedural memory。

然后用下一次相似任务测试三件事。

它有没有召回上次的关键事件。它有没有避开已经过期或被替代的事实。它有没有把别人的记忆混进来。

这比做一个大而全的“记忆中枢”更容易暴露问题。长期记忆不是越多越好，能被治理、能被检索、能被隔离，才有资格进入 Agent 的工作流。

相关链接

- Elastic 官方文章，Agent memory on Elasticsearch，https://www.elastic.co/search-labs/blog/agent-memory-elasticsearch
- Elasticsearch 文档入口，https://www.elastic.co/guide/en/elasticsearch/reference/current/index.html
- Elastic Search Labs，https://www.elastic.co/search-labs
