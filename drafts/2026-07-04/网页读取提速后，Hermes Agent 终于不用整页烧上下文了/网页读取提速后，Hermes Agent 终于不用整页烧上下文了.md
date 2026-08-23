---
title: 网页读取提速后，Hermes Agent 终于不用整页烧上下文了
status: draft
date: '2026-07-04'
source: manual
source_url: https://github.com/NousResearch/hermes-agent
angle: 从新版本的网页读取链路切入，讲清楚为什么“干净内容直达 Agent”和“大页面按需分页”会影响真实使用成本。读者关心的是：以后做资料搜集、竞品分析、长文读取时，Agent 不再动不动塞爆上下文。
voice: first-person
content_lane: version-update
content_archetype: version_brief
diversity_note: >-
  title_pattern_repeat_in_batch,agent_like_daily_cap,developer_lane_daily_cap,recent_entity_saturation,recent_title_pattern_saturation
reach: 9
tags:
  - Hermes Agent
  - Agent
  - 网页读取
  - 版本更新
  - 上下文成本
llm:
  provider: codex
  model: ''
platforms:
  wechat: primary
  xhs: primary
  x: blocked
xhs_title: 网页读取提速后，Hermes Agent 终于不用整页烧上下文了
wechat_title: ''
cover:
  status: skipped
recent_similarity: 0.049
reach_note: Hermes/NousResearch 命中重点生态，且有明确提速、省成本和可上手验证路径。
selection_reason: 这是当天最贴合 openclaw/Hermes 生态的版本题，既有品牌识别，也有非常具体的用户收益：更快、更便宜、更适合长网页任务。
---

# 网页读取提速后，Hermes Agent 终于不用整页烧上下文了

如果你用 Agent 做资料搜集、竞品分析、长文阅读，这次 Hermes Agent v0.18.0 里最该看的不是大标题里的模型组合，而是 `web_extract` 的改法。

过去让 Agent 读网页，真正贵的常常不是搜索，而是把页面内容搬进上下文。一个文档页、百科页、代码 README，被摘要模型处理一遍，再塞回主对话，慢、贵，还容易把关键段落压没。

这次改动把路径调成了更工程化的一条路，干净内容直接给 Agent，大页面存起来，需要哪段再读哪段。我看这个更新，关心的是它把联网 Agent 从会浏览网页变成了更像会管理材料。

## 把旧链路里的隐形税找出来

PR #54843 说得很直接，几个提取后端本来已经返回去掉样板内容的 markdown，但 Hermes 过去还会在页面超过 5k 字符时跑辅助 LLM 做摘要。

这一步听起来聪明，放到 Agent 工作流里就会变成隐形税。网络请求之后再等模型往返，大页面还要分块、合成，资料搜集时每多几个 URL，等待和 token 成本都会叠上去。

更麻烦的是摘要不是读取。你让 Agent 看一篇长文，它看到的是压缩后的版本，不是原文的可追溯切片。做竞品对比、写技术调研、核对参数时，我更愿意让 Agent 少读几段原文，也不愿意让它读一个看似完整的二手摘要。

## 用分页材料替代整页灌入

v0.18.0 release 里把这项归在 Core Agent & Architecture。核心变化可以压成四行。

| 旧路径 | 新路径 |
| --- | --- |
| 页面超过阈值后交给辅助 LLM 摘要 | `web_extract` 直接返回干净 markdown |
| 大页面被压成一次性摘要 | 默认 15000 字符预算内整页返回，超出就返回头尾窗口 |
| 中间内容容易在摘要里丢失 | 全文写入 `cache/web`，footer 给出 `read_file` 调用 |
| 图片里的 base64 可能变成 token 炸弹 | base64 图片转成占位符，真实图片链接保留 |

这里的关键不是少一个模型调用，而是材料的控制权回到 Agent 手里。页面太大时，Agent 不必把整页塞进上下文，它会拿到开头、结尾和一个明确的读取入口。需要中间段，就用 `read_file` 按 offset 往下翻。

PR #55207 又补了一刀，原来 footer 里有一个 `offset=<line>` 占位符，模型得自己猜从哪一行开始读。现在会计算真实起始行，所以第一次分页更容易落在省略区间里。

## 看测算，不只看快这个词

PR #54843 里有一组 before/after eval，Firecrawl backend，4 个 URL。

| 页面 | 旧路径 | 新路径 | 提速 |
| --- | --- | --- | --- |
| example.com | 1.4s | 0.83s | 1.7x |
| Wikipedia Transformer | 82.9s | 7.9s | 10.6x |
| PEP 8 | 66.3s | 1.1s | 59.7x |
| cpython README | 26.0s | 5.3s | 4.9x |
| 合计 | 176.6s | 15.1s | 11.7x |

同一份 PR 还给了成本测算。旧路径按辅助摘要模型和抓取费用计算，4 个页面从 2.80 美元降到 0.12 美元，约 23x。这里不是说每个人都会得到同样账单，而是说明大页面上真正被删掉的是辅助 LLM 摘要成本。

PR #55207 的并发 `@url` 扩展也很实用。多个 URL 以前是串行等，现在用 `asyncio.gather` 并发展开，测试里 3 个 0.2s 的 URL reference 从 0.60s 变成约 0.20s。做一轮竞品资料时，这种小改动会直接影响体感。

## 把它放进资料任务里验证

我会优先把这次更新放进三类任务里看。

资料搜集。以前我会担心 Agent 一口气吃太多网页，把上下文挤满，后面真正要推理时反而没空间。现在大页面变成头尾预览加全文缓存，调研可以先扫，再按问题回读。

竞品分析。一个产品页面、文档页、更新日志，长度经常不均匀。新路径下，Agent 不必为了少数大页面拖慢整轮抓取，也不必把所有 URL 都压成摘要后再比较。

长文读取。文档、README、规范类页面最怕摘要丢边角信息。Hermes 现在保留全文路径，回答可恢复性比一次性摘要更适合技术任务。PR 的 eval 里，已返回内容或缓存全文可恢复答案达到 4/4。

## 判断自己该不该升级

如果你只是偶尔让 Agent 搜一个网页，这次更新的感知不会特别强。真正该看的人，是把 Hermes 放进持续工作流的人。

我的判断很简单，凡是任务里会出现多个 URL、长文档、反复核对原文，这次值得升到 v2026.7.1 后验证。不要一开始就跑复杂自动化，选一个固定任务，比如让 Hermes 读取 3 到 5 个产品文档，输出功能差异表，再让它回查其中一个细节所在段落。

验收点也不复杂。看它是否能在不撑爆上下文的情况下完成初读，是否能用 `read_file` 找回被省略的中间内容，是否能在多 URL 时明显少等。如果这三件事成立，联网 Agent 的成本曲线就变了。

我更喜欢这个更新的原因，是它没有把 Agent 做成更会摘要，而是让 Agent 更会取材。会取材的 Agent，才有机会在真实任务里跑得久。

## 相关链接

- Hermes Agent 仓库 [https://github.com/NousResearch/hermes-agent](https://github.com/NousResearch/hermes-agent)
- Hermes Agent v0.18.0 release [https://github.com/NousResearch/hermes-agent/releases/tag/v2026.7.1](https://github.com/NousResearch/hermes-agent/releases/tag/v2026.7.1)
- `web_extract` truncate-and-store PR [https://github.com/NousResearch/hermes-agent/pull/54843](https://github.com/NousResearch/hermes-agent/pull/54843)
- 并发 URL reference 和分页鲁棒性 PR [https://github.com/NousResearch/hermes-agent/pull/55207](https://github.com/NousResearch/hermes-agent/pull/55207)

<!-- REACH: 8/10 | 品牌✓ 利益点✓ 可操作✓ -->
