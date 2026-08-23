---
title: Anthropic Python SDK 0.117 上线，MCP Tunnels、Dreaming 和凭据防泄漏怎么用
status: draft
date: '2026-07-27'
source: manual
source_url: https://github.com/anthropics/anthropic-sdk-python/releases/tag/v0.117.0
angle: 从升级前后的代码差异切入，解释 MCP Tunnels、Dreaming 支持和 SecretStr 修复分别解决什么问题，并给出升级、最小验证与异常日志检查路径。
voice: first-person
content_lane: version-update
content_archetype: version_brief
diversity_note: >-
  same_entity_in_batch,title_pattern_repeat_in_batch,developer_lane_daily_cap,recent_entity_saturation,recent_title_pattern_saturation
reach: 8
tags:
  - Anthropic
  - Python SDK
  - MCP Tunnels
  - Dreaming
  - 凭据安全
llm:
  provider: codex
  model: ''
platforms:
  wechat: primary
  xhs: primary
  x: blocked
xhs_title: Anthropic Python SDK 0.117 上线，MCP Tunnels、Dreaming 和凭据防泄漏怎么用
wechat_title: ''
cover:
  status: skipped
recent_similarity: 0.054
reach_note: Anthropic 品牌加上可直接升级验证的新 API 与安全修复，兼具认知度和可操作性。
selection_reason: 官方 release 同时覆盖新能力和凭据安全，适合做一篇信息密度高、读者升级后马上能验证的版本简报。
---

# Anthropic Python SDK 0.117 上线，MCP Tunnels、Dreaming 和凭据防泄漏怎么用

如果你的 Agent 已经接入 Anthropic Python SDK，这次 0.117.0 值得关注的不是普通文档更新，而是三条直接影响能力边界和运行安全的改动。

MCP Tunnels 和 Dreaming 获得 API 支持，原先需要等待 SDK 跟进或自行处理的调用，现在有了正式入口。凭据处理则换成 `SecretStr`，避免敏感材料留在异常回溯的局部变量里。

我更关心升级后的代码和日志会发生什么变化。下面按旧问题、版本变化、验证路径来拆，方便你判断现有 Agent 是否该升。

## 对照升级前后的三个缺口

0.117.0 的变化可以压成一张表。

| 升级前需要面对的问题 | 0.117.0 的变化 | 直接影响 |
| --- | --- | --- |
| SDK 尚未声明 Dreaming 支持 | API 增加 Dreaming 支持 | 可以沿官方 SDK 能力继续验证，不必自己猜请求结构 |
| SDK 尚未声明 MCP Tunnels 支持 | API 增加 MCP Tunnels 支持 | MCP 连接相关能力获得正式入口 |
| 凭据材料可能进入 traceback frame locals | 凭据改用 `SecretStr` 处理 | 异常诊断时减少敏感内容暴露在局部变量中的风险 |

这里要克制一点。release 只确认了功能支持与修复方向，没有提供足够信息证明具体参数、可用模型范围或完整运行效果。涉及 Dreaming 和 MCP Tunnels 的代码，应该以 0.117.0 对应的类型定义、字段说明和官方示例为准。

## 把新能力放回 Agent 场景

MCP Tunnels 最值得看的地方，是它继续把 MCP 连接能力往 SDK 层收拢。对需要连接工具和数据源的 Agent 来说，正式支持通常比自定义请求更容易维护，也更容易跟随后续字段变化。

Dreaming 的价值暂时不该靠名字发挥想象。当前 release 能确认的是 API 已加入支持，不能据此补出运行机制、效果或适用模型。我会把它当成一个新增的能力入口，等官方字段和示例明确后，再决定是否进入正式工作流。

`SecretStr` 修复则更具体。Agent 经常把异常、局部变量和调用链送进日志平台，如果凭据材料停留在 traceback frame locals，调试链路就可能扩大敏感信息的可见范围。0.117.0 针对的正是这个细节。

我的判断是，前两项扩展了能力，第三项降低了运维风险。已经在生产日志中处理异常的团队，即使暂时不用 Dreaming 或 MCP Tunnels，也有理由评估这次升级。

## 用一个隔离任务完成升级

不要直接替换主项目依赖。先在独立分支或测试环境固定版本。

```bash
python -m pip install "anthropic==0.117.0"
```

升级后保留三类对照信息。

1. 记录当前 SDK 版本和依赖锁文件变化。
2. 让现有最小请求跑通，确认基础调用没有回归。
3. 按 0.117.0 的官方类型与示例，分别构造一个 Dreaming 请求和一个 MCP Tunnels 场景。

验证目标不是一次接完整业务，而是确认新增字段能被当前代码识别、请求能进入预期调用链、失败时能留下可定位但不含凭据材料的日志。

## 把异常日志当成验收对象

这次升级有一项很容易被漏掉的验收工作，就是主动制造一次受控失败。

可以使用测试凭据或无效配置触发异常，再检查 traceback、结构化日志、错误上报平台和调试快照。重点看凭据原文是否出现在 frame locals、异常上下文或自定义日志字段里。

`SecretStr` 只解决 release 明确提到的 traceback frame locals 风险。应用自己打印请求对象、环境变量或认证配置，仍可能把敏感内容写进日志。SDK 修复不能替代应用侧的脱敏规则。

如果现有 Agent 正在使用 MCP、集中式日志或自动错误上报，我会优先完成这个最小验证，再决定是否合入主分支。升级的真正完成标准，不是依赖文件里的版本号变了，而是新入口可识别，旧调用无回归，异常现场也没有多带走凭据。

## 相关链接

- [Anthropic Python SDK 0.117.0 发布说明](https://github.com/anthropics/anthropic-sdk-python/releases/tag/v0.117.0)
- [0.116.0 到 0.117.0 完整变更](https://github.com/anthropics/anthropic-sdk-python/compare/v0.116.0...v0.117.0)

<!-- REACH: 8/10 | 品牌✓ 利益点✓ 可操作✓ -->
