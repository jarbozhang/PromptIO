---
title: Anthropic Python SDK 新增网页抓取：升级前先修掉这个异步计数坑
status: draft
date: '2026-07-13'
source: manual
source_url: https://github.com/anthropics/anthropic-sdk-python/releases/tag/v0.113.0
angle: 用 v0.113.0 的网页抓取与工具支持解释一次真实升级决策，并重点说明异步 count_tokens 修复会影响哪些调用，读者可据此检查版本和回归测试。
voice: analytical
content_lane: version-update
content_archetype: version_brief
diversity_note: recent_entity_saturation
reach: 8
tags:
  - Anthropic
  - Python SDK
  - 网页抓取
  - 异步调用
  - 版本升级
llm:
  provider: codex
  model: ''
platforms:
  wechat: primary
  xhs: primary
  x: blocked
xhs_title: Anthropic Python SDK 新增网页抓取：升级前先修掉这个异步计数坑
wechat_title: ''
cover:
  status: skipped
recent_similarity: 0.034
reach_note: Anthropic 品牌明确，网页抓取是直接利益点，Python 用户可以立即升级并验证异步调用。
selection_reason: 版本同时包含新能力和明确缺陷修复，比单纯发布新闻更有操作价值，适合做成紧凑的升级简报。
---

# Anthropic Python SDK 新增网页抓取：升级前先修掉这个异步计数坑

如果你的 Python 服务正在调用 Anthropic API，并用异步 token 计数做请求前检查，v0.113.0 值得尽快进入回归环境。

这次更新最醒目的变化是支持 20260318 版网页抓取和支持工具，但真正可能影响现有调用的，是异步 `count_tokens` 缺少 `output_format`、`output_config` 合并步骤的问题。

读完可以直接做一个升级判断，确认哪些调用受影响，以及回归测试究竟该盯返回数字，还是请求配置。

## 把升级决策拆成两条线

Anthropic Python SDK v0.113.0 发布于 2026 年 6 月 29 日，相比 v0.112.0 有四类变化。

| 变化 | 发布说明确认的内容 | 工程影响 |
| --- | --- | --- |
| 网页抓取 | 支持 20260318 web fetch | 需要网页内容的 Agent 可以开始验证 SDK 接入路径 |
| 支持工具 | 增加 support tools 支持 | 使用相关工具能力的请求需要重新检查参数和响应处理 |
| 异步计数 | 修复 `count_tokens` 缺少配置合并步骤 | 依赖异步计数与输出配置的调用应优先回归 |
| 用户配置 | token 计数接受 user profile ID | 使用该标识的计数流程可以验证新版兼容性 |

这四项不能用同一套验收标准。网页抓取是新增能力，异步计数则是现有路径的正确性修复，后者更容易被功能演示掩盖。

## 锁定异步计数的受影响范围

修复项明确指向异步 `count_tokens`，并且限定在 `output_format`、`output_config` 的合并步骤。由此可以把排查范围压得很小。

受影响概率较高的是同时满足两个条件的调用。

- 使用异步客户端执行 `count_tokens`
- 在计数请求中依赖 `output_format` 或 `output_config`

同步 `count_tokens` 和普通消息请求没有出现在这条修复说明里。没有使用这两个配置的异步计数，也不是该修复直接描述的对象。

发布说明没有展开具体故障表现，因此不宜预设它一定会抛错或返回某个错误数字。更可靠的回归方式，是检查配置经过合并后是否进入预期请求，而不是只比较升级前后的 token 数。

## 让网页抓取通过独立验收

v0.113.0 是发布记录中明确加入 20260318 web fetch 与 support tools 支持的版本。对需要读取网页内容的 Agent，这提供了一个清晰的 SDK 版本边界。

但 SDK 支持不等于现有 Agent 流程会自动适配。工具参数、调用结果和失败分支仍要在测试环境中单独验收，尤其不能用一次成功响应代替异常路径检查。

这里还有一个容易忽略的工程启发。网页抓取扩展了 Agent 能拿到的信息，token 计数则负责约束请求规模。两条路径使用的输出配置如果不一致，抓取能力可用，预算判断却可能失真。

## 把回归标准写成四个断言

这次升级不需要铺开一套通用测试清单，围绕版本变化留下四个明确断言即可。

1. 运行环境实际加载的是 v0.113.0，而不是锁文件或镜像中的旧版本。
2. 异步 `count_tokens` 携带输出配置时，请求构造包含预期的合并结果。
3. 网页抓取与支持工具分别覆盖成功和失败响应，错误能进入现有处理链路。
4. 使用 user profile ID 的项目，token 计数能够接受原有标识并返回可处理结果。

其中第二项最关键。它直接对应本次 bug fix，也能避免测试只看到接口正常返回，却漏掉配置没有按预期生效。

## 判断谁该优先升级

正在使用异步 token 计数并传入输出配置的项目，应该把 v0.113.0 视为修复版本，优先验证。

准备接入网页抓取或支持工具的 Agent 项目，也需要以该版本建立测试基线。只使用同步调用、且暂时不需要新工具能力的项目，可以按常规依赖升级节奏处理。

我的判断是，这个版本不该只被归类为一次功能更新。网页抓取决定 Agent 能取得什么信息，异步计数修复决定请求前的约束是否可信。升级是否成功，要看这两条链路能否各自通过验收。

最直接的动作，是在依赖清单中确认 Anthropic Python SDK 版本，再为带输出配置的异步 `count_tokens` 增加一条请求构造回归测试。

## 相关链接

- [v0.113.0 发布说明](https://github.com/anthropics/anthropic-sdk-python/releases/tag/v0.113.0)
- [v0.112.0 到 v0.113.0 完整变更](https://github.com/anthropics/anthropic-sdk-python/compare/v0.112.0...v0.113.0)

<!-- REACH: 8/10 | 品牌✓ 利益点✓ 可操作✓ -->
