---
title: Hermes Agent 新版本：把联网读取从烧 token 变成按需取证
status: draft
date: '2026-07-03'
source: manual
source_url: https://github.com/NousResearch/hermes-agent
angle: 从网页读取提速和成本下降切入，讲清楚 Agent 读网页为什么不能再整页塞进上下文，以及读者如何用 GitHub 仓库和版本记录验证能力变化、跑一个最小联网任务。
voice: first-person
content_lane: version-update
content_archetype: version_brief
diversity_note: >-
  title_pattern_repeat_in_batch,agent_like_daily_cap,recent_entity_saturation,recent_title_pattern_saturation
reach: 9
tags:
  - Hermes Agent
  - Agent
  - 网页读取
  - 版本更新
llm:
  provider: codex
  model: ''
platforms:
  wechat: primary
  xhs: primary
  x: blocked
xhs_title: Hermes Agent 新版本：把联网读取从烧 token 变成按需取证
wechat_title: ''
cover:
  status: skipped
recent_similarity: 0.045
reach_note: NousResearch/Hermes 属重点生态，版本变化明确，读者可以直接去仓库试用。
selection_reason: 这是当天最贴合 PromptIO 定位的 openclaw/NousResearch 生态题，既有品牌连续性，也能转成可操作的联网 Agent 使用指南。
---

# Hermes Agent 新版本：把联网读取从烧 token 变成按需取证

如果你正在做会读网页的 Agent，Hermes Agent v0.18.0 里我最想先看的，不是更大的模型阵容，而是 `web_extract` 这条小改动。

它处理的是一个特别现实的问题，Agent 读网页时，不能再把整页内容先丢给模型压缩一遍，然后再塞回上下文。页面一长，图一多，等待时间和 token 成本都会被放大。

这次更新给了一个更工程化的答案，短页面直接返回，长页面只给头尾窗口，把完整干净文本存进本地缓存，需要证据时再用 `read_file` 翻出来。

信息来自 GitHub 仓库、v0.18.0 release、PR #54843 和 #55207。我的建议也很简单，先别急着把它接进正式工作流，用一个最小联网任务验证它是不是真的适合你的 Agent。

## 别再把整页喂给模型

旧做法的问题不在于 Agent 不会读网页，而是读得太重。

PR #54843 里把原因写得很清楚，Firecrawl、Tavily、Exa、Parallel 这类提取后端已经会返回清理过的 markdown，但 Hermes 以前还会对超过 5k chars 的页面再跑一次辅助 LLM 总结。

这就多了一段串行的模型往返。网页抓取要等，模型总结也要等，大页面还可能被切块再合成。

对一个聊天 Agent 来说，这种慢不是单点慢，而是会传染到整条对话链。你只是想让它读一个文档页，它却先做了一次不一定必要的二次改写。

我认为这里的关键不是“省一点 token”，而是把网页读取从“提前总结”改成“按需取证”。Agent 应该先拿到足够判断的材料，只有缺证据时再去缓存里翻完整文本。

## 看版本记录里真正改动的地方

v0.18.0 的 release 名叫 The Judgment Release，发布日期是 2026 年 7 月 1 日。仓库页面显示 Hermes Agent 已经有 208k stars，最近一次 push 是 2026 年 7 月 2 日。

这版有很多大项，比如 MoA 变成可选择模型、`/goal` 增加完成契约、`/learn` 和 `/journey` 让自学习过程可见。但如果只看联网读取，我会盯住这几条。

| 旧问题 | 新版本动作 | 可验证线索 |
| --- | --- | --- |
| 大页面先跑辅助 LLM 总结 | 改成 truncate-and-store | PR #54843 |
| 默认超过 5k chars 就多一次模型往返 | 默认 15000 chars 以内直接返回 | `web.extract_char_limit` |
| 长页面中段被省略后不好找 | 返回头尾窗口，并给出完整文本路径和 `read_file` 调用方式 | `cache/web` |
| 多个 `@url` 引用串行展开 | 改成并发展开后按原顺序组装 | PR #55207 |
| 内联 base64 图片可能膨胀 token | base64 转占位符，真实图片链接保留 | PR #54843 |

PR 里的 live eval 给了很硬的数字。4 个 URL 从 176.6s 降到 15.1s，总体快 11.7 倍，大页面区间是 10 到 60 倍。

成本对比也很直观。同一组 4 页，在旧的辅助总结路径下按 Opus 4.x 估算是 2.80 美元，新路径是 0.12 美元，约 23 倍差距。

这不是魔法。它只是把不必要的模型调用拿掉了。

## 把最小联网任务压到两个页面

我会这样验证，不把它当完整评测，只看能力变化是否符合 release 和 PR 描述。

第一步，打开 Hermes Agent 仓库，看 release `v2026.7.1`。确认里面确实提到 `web_extract truncate-and-store` 和 concurrent `@` reference expansion。

第二步，打开 PR #54843。重点看三件事，是否删除辅助 LLM 总结路径，是否把完整文本写入 `cache/web`，是否给出 `read_file` 翻页方式。

第三步，打开 PR #55207。看多个 `@url` 引用是不是从串行 `await` 改成 `asyncio.gather`，以及 3 个 URL 引用从 0.60s 到约 0.20s 的 RED/GREEN 测试。

然后再跑一个最小任务。

在 Hermes 里启动带 web toolset 的会话，选一个短页面和一个长文档页。提示词可以写成这种形态，`读取 @url:https://example.com 和 @url:https://peps.python.org/pep-0008/，只回答每页一个事实，证据不够时用缓存全文继续查`。

你要看的不是回答多漂亮，而是工具轨迹里有没有出现 `web_extract`，长页面是否返回缓存路径，后续是否能通过 `read_file` 找回被省略的中段。

如果这三点成立，它对 Agent 应用的启发就很明确。网页读取不该追求一次性吃完整页，而该追求可恢复、可分页、可追证据。

## 判断自己要不要升级

适合优先验证的人有三类。

做研究助手的人，因为一次任务经常要读多篇文档、release、issue 和 PR。

做代码 Agent 的人，因为文档页、README、API reference 经常很长，旧路径会把上下文和等待时间一起拖重。

做团队交付的人，因为 v0.18.0 不只是网页读取提速，还把 gateway 的 scale-to-zero、drain coordination、后台 subagents、`/goal` 完成证据这些能力放到同一个版本窗口里。

不急着升级的人也有。如果你的 Agent 只读很短的页面，或者网页读取不是高频路径，这次收益不会那么明显。你更应该先看 release 里的验证能力和自学习能力，判断它是不是正好补你的短板。

我的判断是，Hermes 这次最有价值的地方，不是把 Agent 讲得更会思考，而是把“读到了什么、凭什么说完成、证据在哪里”这些工程细节往前推了一步。

对 Agent 产品来说，长期拼的不是一次回答多聪明，而是每一步都能回到证据。

## 相关链接

- [Hermes Agent GitHub 仓库](https://github.com/NousResearch/hermes-agent)
- [Hermes Agent v0.18.0 release](https://github.com/NousResearch/hermes-agent/releases/tag/v2026.7.1)
- [PR #54843 web_extract 改为 truncate-and-store](https://github.com/NousResearch/hermes-agent/pull/54843)
- [PR #55207 并发 URL 引用展开和稳健性修复](https://github.com/NousResearch/hermes-agent/pull/55207)
- [Hermes CLI 文档](https://hermes-agent.nousresearch.com/docs/user-guide/cli)

<!-- REACH: 8/10 | 品牌✓ 利益点✓ 可操作✓ -->
